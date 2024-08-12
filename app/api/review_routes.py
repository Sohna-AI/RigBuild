from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Product, ProductImage, Category, Review
from app.forms.product_form import ProductForm
from app.forms.product_image_form import ProductImageForm
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def edit_review(review_id):
    """
    Edit a review by specific id
    """
    review = Review.query.get_or_404(review_id)
    if review.user_id != current_user.id: return {'error': 'Unauthorized'}, 403
    
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review.rating = form.data['rating']
        review.review = form.data['review']
        review.update_at = datetime.now()
        
        db.session.commit()
        return review.to_dict()
    return form.errors, 400

@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    """
    Delete a review by specific id
    """
    review = Review.query.get_or_404(review_id)
    if review.user_id != current_user.id: return {'error': 'Unauthorized'}, 403
    
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Review deleted successfully'}