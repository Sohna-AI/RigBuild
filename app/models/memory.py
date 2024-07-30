from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Memory(db.Model):
    __tablename__ = 'memories'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    capacity = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=True)
    speed = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    product = db.relationship('Product', back_populates='memory', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'capacity': self.capacity,
            'type': self.type,
            'speed': self.speed,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

