from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class ShoppingCart(db.Model):
    __tablename__ = 'shopping_carts'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    user = db.relationship('User', back_populates='shopping_carts')
    cart_items = db.relationship('CartItem', back_populates='shopping_cart')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'products': [cartItem.to_dict() for cartItem in self.cart_items],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }