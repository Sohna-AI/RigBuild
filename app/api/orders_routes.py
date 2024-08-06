from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, ShoppingCart, Order, OrderItem
from datetime import datetime

order_routes = Blueprint('orders', __name__)

@order_routes.route('/', methods=['GET'])
@login_required
def get_orders():
    """
    Retrieves past orders of the authenticated user
    """
    orders = Order.query.filter_by(user_id = current_user.id).all()
    return {'orders': [order.to_dict() for order in orders]}


@order_routes.route('/<int:order_id>', methods=['GET'])
@login_required
def get_order(order_id):
    """
    Retrieves details of a specific order
    """
    order = Order.query.get_or_404(order_id)
    if order.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403
    return order.to_dict()


@order_routes.route('/<int:order_id>/reorder', methods=['POST'])
@login_required
def reorder(order_id):
    """
    Reorders a past order by id
    """
    order = Order.query.get_or_404(order_id)
    if order.user_id != current_user.id: return {'error': 'unauthorized'}, 403
    
    new_order = Order(
        user_id = current_user.id,
        status = 'completed',
        created_at = datetime.now()
    )
    db.session.add(new_order)
    db.session.commit()
    
    for item in order.items:
        new_order_item = OrderItem(
            order_id = new_order.id,
            product_id = item.product_id,
            quantity = item.quantity,
            price = item.price
        )
        db.session.add(new_order_item)
    db.session.commit()
    return new_order.to_dict()


@order_routes.route('/checkout', methods=['POST'])
@login_required
def checkout():
    """
    Performs a transaction to complete the purchase
    """
    cart_items = ShoppingCart.query.filter_by(user_id = current_user.id).all()
    if not cart_items:
        return {'error': 'No items in the cart'}
    
    new_order = Order(
        user_id = current_user.id,
        status = 'completed',
        created_at = datetime.now()
    )
    db.session.add(new_order)
    db.session.commit()
    
    for item in cart_items:
        new_order_item = OrderItem(
            order_id = new_order.id,
            product_id = item.product_id,
            quantity = item.quantity,
            price = item.product.price
        )
        db.session.add(new_order_item)
        db.session.delete(item)
    db.session.commit()
    return new_order.to_dict()