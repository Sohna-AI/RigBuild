from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Product(db.Model):
    __tablename__ = 'products'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1500), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    stock_quantity = db.Column(db.Integer, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    user = db.relationship('User', back_populates='products')
    product_images = db.relationship('ProductImage', back_populates='product', cascade='all, delete-orphan')
    category = db.relationship('Category', back_populates='product')
    order_items = db.relationship('OrderItem', back_populates='product')
    cart_items = db.relationship('CartItem', back_populates='product')
    reviews = db.relationship('Review', back_populates='product')
    wishlist = db.relationship('Wishlist', back_populates='products')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'stock_quantity': self.stock_quantity,
            'category_id': self.category_id,
            'user_id': self.user_id,
            'reviews': [review.to_dict() for review in self.reviews],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }