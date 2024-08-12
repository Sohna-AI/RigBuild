from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Review(db.Model):
    __tablename__ = 'reviews'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    user = db.relationship('User', back_populates='reviews')
    product = db.relationship('Product', back_populates='reviews')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'product_id': self.product_id,
            'rating': self.rating,
            'review': self.review,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }