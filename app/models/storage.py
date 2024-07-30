from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Storage(db.Model):
    __tablename__ = 'storages'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    storage_type = db.Column(db.String(50), nullable=False)
    capacity = db.Column(db.String(50), nullable=False)
    read_speed = db.Column(db.Integer, nullable=True)
    write_speed = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    product = db.relationship('Product', back_populates='storage', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'storage_type': self.storage_type,
            'capacity': self.capacity,
            'read_speed': self.read_speed,
            'write_speed': self.write_speed,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
