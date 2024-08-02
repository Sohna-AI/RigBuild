from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Product, ProductImage, Category, Review, Wishlist
from app.forms.product_form import ProductForm
from app.forms.product_image_form import ProductImageForm
from app.forms.review_form import ReviewForm
from app.api.aws_s3 import upload_file_to_s3, get_unique_filename

wishlist_routes = Blueprint('wishlist', __name__)

@wishlist_routes.route('/', methods=['GET'])
@login_required
def get_favorites():
    """
    Get all favorite products for the authenticated user
    """
    products = Wishlist.query.filter_by(Wishlist.user_id==current_user.id).all()
    return {'wishlist': [product.to_dict() for product in products]}