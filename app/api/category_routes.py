from flask import Blueprint
from flask_login import login_required
from app.models import Category, Product

category_routes = Blueprint('categories', __name__)

@category_routes.route('/')
def categories():
    """
    Query for a list of categories
    """
    categories = Category.query.all()
    return {'categories': [category.to_dict() for category in categories]}

@category_routes.route('/<int:category_id>/products')
def products_in_category(category_id):
    """
    Query for a list of products in specific category
    """
    category = Category.query.get_or_404(category_id)
    products = Product.query.filter_by(category_id=category.id).all()
    return {'products': [product.to_dict() for product in products]}