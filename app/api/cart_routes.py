from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, Product, ProductImage, Category, Review, ShoppingCart, CartItem
from app.forms.product_form import ProductForm
from app.forms.product_image_form import ProductImageForm
from app.forms.review_form import ReviewForm
from app.api.aws_s3 import upload_file_to_s3, get_unique_filename

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/', methods=['GET'])
@login_required
def get_cart():
    """
    Get current user's shopping cart
    """
    shopping_cart = ShoppingCart.query.filter_by(user_id=current_user.id).first()
    return {'cart': shopping_cart.to_dict()}

@cart_routes.route('/items', methods=['POST'])
@login_required
def add_item_to_cart():
    """
    Add a product to the shopping cart
    """
    product_id = request.json.get('product_id')
    quantity = request.json.get('quantity')
    
    product = Product.query.get(product_id)
    if not product:
        return {'error': 'Product not found'}, 404
    
    shopping_cart = ShoppingCart.query.filter_by(user_id=current_user.id).first()
    if not shopping_cart:
        shopping_cart = ShoppingCart(user_id=current_user.id)
        db.session.add(shopping_cart)
        db.session.commit()
    
    cart_item = CartItem.query.filter_by(cart_id=shopping_cart.id, product_id=product_id).first()
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id=shopping_cart.id, product_id=product_id, quantity=quantity)
        db.session.add(cart_item)
    
    db.session.commit()
    return cart_item.to_dict(), 201

@cart_routes.route('/items/<int:cart_item_id>', methods=['PUT'])
@login_required
def edit_cart_item(cart_item_id):
    """
    Edit the quantity of a cart item
    """
    quantity = request.json.get('quantity')
    if not quantity:
        return {'error': 'Quantity is required'}, 400
    
    cart_item = CartItem.query.get(cart_item_id)
    if not cart_item:
        return {'error': 'Cart item not found'}, 404
    
    if cart_item.shopping_cart.user_id != current_user.id: return {'error': 'Unauthorized'}, 403
    
    cart_item.quantity = quantity
    db.session.commit()
    return cart_item.to_dict()

@cart_routes.route('/items/<int:cart_item_id>', methods=['DELETE'])
@login_required
def delete_cart_item(cart_item_id):
    """
    Delete a cart item
    """
    cart_item = CartItem.query.get_or_404(cart_item_id)
    db.session.delete(cart_item)
    db.session.commit()
    return {'message': 'Cart item deleted successfully'}