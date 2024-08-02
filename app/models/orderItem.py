from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    
    order = db.relationship('Order', back_populates='order_items')
    product = db.relationship('Product', back_populates='order_items')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'order': self.order.to_dict(),
            'product_id': self.product_id,
            'product': self.product.to_dict(),
            'product': self.product,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }