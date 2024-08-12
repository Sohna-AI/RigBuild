from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Product, ProductImage, Category, Review, Wishlist
from app.forms.product_form import ProductForm
from app.forms.product_image_form import ProductImageForm
from app.forms.review_form import ReviewForm
from app.api.aws_s3 import upload_file_to_s3, get_unique_filename

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def all_products():
    """
    Query for a list of all products
    """
    products = Product.query.all()
    return {'products': [product.to_dict() for product in products]}

@product_routes.route('/<int:product_id>')
def product_details(product_id):
    """
    Retrieves all details of a product
    """
    product = Product.query.get_or_404(product_id)
    return product.to_dict()

@product_routes.route('/current', methods=['GET'])
@login_required
def user_products():
    """
    Query for a list of all user listed products
    """
    products = Product.query.filter_by(user_id=current_user.id)
    return {'products': [product.to_dict() for product in products]}

@product_routes.route('/', methods=['POST'])
@login_required
def add_product():
    """
    Add a new product for the authenticated user
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # category = Category.query.filter_by(name=form.category_name.data).first()
        
        new_product = Product(
            name=form.data['name'],
            description=form.data['description'],
            price=form.data['price'],
            stock_quantity=form.data['stock_quantity'],
            category_id=form.data['category_id'],
            user_id=current_user.id
        )
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    return form.errors, 400

@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product(product_id):
    """
    Edit a question by product id
    """
    product = Product.query.get_or_404(product_id)
    
    if product.user_id != current_user.id: return {'error': 'Unauthorized'}, 403
    
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product.name = form.data['name']
        product.description = form.data['description']
        product.price = form.data['price']
        product.stock_quantity = form.data['stock_quantity']
        product.category_id = form.data['category_id']
        product.updated_at = datetime.now()
        
        db.session.commit()
        return product.to_dict()
    return form.errors, 400

@product_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    """
    Delete a product by product id
    """
    product = Product.query.get_or_404(product_id)
    
    if product.user_id != current_user.id: return {'error': 'Unauthorized'}, 403
    
    db.session.delete(product)
    db.session.commit()
    return {'message': 'Product delete successfully'}


#* ProductImage related Product routes ------------------------------------------------------------------

@product_routes.route('/<int:product_id>/product-images', methods=['GET'])
def get_product_images_for_product(product_id):
    """
    Get all product images for a specfic product by id
    """
    product_images = ProductImage.query.filter(ProductImage.product_id == product_id).all()
    return {'product_images': [product_image.to_dict() for product_image in product_images]}

@product_routes.route('<int:product_id>/product-images', methods=['POST'])
@login_required
def create_product_image_for_product(product_id):
    """
    Upload a product image for product by id
    """
    form = ProductImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)
        
        if "url" not in upload: return upload, 400
        
        url = upload['url']
        new_image = ProductImage(product_id=product_id, image_url=url)
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    return form.errors, 400


#* Reviews related Product routes ------------------------------------------------------------------

@product_routes.route('/<int:product_id>/reviews', methods=['GET'])
def get_all_reviews_for_product(product_id):
    """
    Get all reviews for a specific product
    """
    reviews = Review.query.filter_by(product_id=product_id).all()
    return {'reviews': [review.to_dict() for review in reviews]}

@product_routes.route('/<int:product_id>/reviews', methods=['POST'])
@login_required
def create_review(product_id):
    """
    Create a review for specific product by id
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        
        existing_review = Review.query.filter_by(user_id=current_user.id, product_id=product_id).first()
        
        if existing_review: return {'error': 'You have already reviewed this product'}, 400
        
        new_review = Review(
            user_id=current_user.id,
            product_id=product_id,
            rating=form.data['rating'],
            review=form.data['review']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return form.errors, 400


#* Wishlist related Product routes ------------------------------------------------------------------

@product_routes.route('/<int:product_id>/wishlist', methods=['POST'])
@login_required
def add_product_to_wishlist(product_id):
    """
    Add a product to user's wishlist
    """
    wishlist = Wishlist.query.filter_by(user_id = current_user.id, product_id = product_id).first()
    if wishlist:
        return {'error': {'message': 'Product already saved'}}, 400
    
    new_wishlist = Wishlist(user_id = current_user.id, product_id = product_id)
    db.session.add(new_wishlist)
    db.session.commit()
    return {'message': 'Product added to wishlist successfully'}

@product_routes.route('/<int:product_id>/wishlist', methods=['DELETE'])
@login_required
def remove_product_from_wishlist(product_id):
    """
    Remove a product from user's wishlist
    """
    wishlist = Wishlist.query.filter_by(user_id = current_user.id, product_id = product_id).first()
    if wishlist:
        return {'error': 'Product not found'}, 404
    db.session.delete(wishlist)
    db.session.commit()
    return {'message': 'Product removed from wishlist successfully'}