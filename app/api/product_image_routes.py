from flask import Blueprint, request
from datetime import datetime
from flask_login import login_required, current_user
from app.models import db, Product, ProductImage, Category
from app.forms.product_form import ProductForm
from app.forms.product_image_form import ProductImageForm
from app.api.aws_s3 import upload_file_to_s3, get_unique_filename, remove_file_from_s3

product_image_routes = Blueprint('product-images', __name__)

@product_image_routes.route('/', methods=['GET'])
def get_all_product_images():
    """
    Query to return all product images in list
    """
    product_images = ProductImage.query.all()
    return {'productImages': [product_image.to_dict() for product_image in product_images]}

@product_image_routes.route('/<int:product_image_id>', methods=['PUT'])
@login_required
def edit_product_image(product_image_id):
    """
    Edit a product image by id
    """
    product_image = ProductImage.query.get_or_404(product_image_id)
    
    if product_image.product.user_id != current_user.id: return {'error': 'Unauthorized'}, 403
    
    form = ProductImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data['image']
        image.filename = get_unique_filename(image.filename)
        remove = remove_file_from_s3(product_image.image_url)
        if remove:
            upload = upload_file_to_s3(image)
        
            if 'url' not in upload: return upload, 400
        
            product_image.image_url = upload['url']
            product_image.update_at = datetime.now()
            db.session.commit()
            return {'url': product_image.image_url}
    return form.errors, 400

@product_image_routes.route('<int:product_image_id>', methods=['DELETE'])
@login_required
def delete_product_image(product_image_id):
    """
    Delete product image by id
    """
    product_image = ProductImage.query.get_or_404(product_image_id)
    
    if product_image.product.user_id != current_user.id: return {'error': 'Unauthorized'}, 403
    
    remove = remove_file_from_s3(product_image.image_url)
    if remove:
        db.session.delete(product_image)
        db.session.commit()
        return {'message': 'Product image deleted successfully'}
    return {'error': 'Product image could not be deleted'}, 400