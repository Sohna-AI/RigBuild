from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('shopping_carts.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    
    shopping_cart = db.relationship('ShoppingCart', back_populates='cart_items')
    product = db.relationship('Product', back_populates='cart_items')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'product': self.product.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }