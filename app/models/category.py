from .db import db, environment, SCHEMA
from sqlalchemy.sql import func

class Category(db.Model):
    __tablename__ = 'categories'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(1500))
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    products = db.relationship('Product', back_populates='category')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'products': [product.to_dict() for product in self.products],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }