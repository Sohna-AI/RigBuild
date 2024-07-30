from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Cooling(db.Model):
    __tablename__ = 'coolings'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    fan_size = db.Column(db.String(50), nullable=True)
    rgb = db.Column(db.Boolean, nullable=True)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    product = db.relationship('Product', back_populates='cooling', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'fan_size': self.fan_size,
            'rgb': self.rgb,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
