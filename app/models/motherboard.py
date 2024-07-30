from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Motherboard(db.Model):
    __tablename__ = 'motherboards'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    chipset = db.Column(db.String(50), nullable=True)
    form_factor = db.Column(db.String(50), nullable=True)
    socket_type = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    product = db.relationship('Product', back_populates='motherboard', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'chipset': self.chipset,
            'form_factor': self.form_factor,
            'socket_type': self.socket_type,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
