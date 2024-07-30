from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Monitor(db.Model):
    __tablename__ = 'monitors'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    screen_size = db.Column(db.String(50), nullable=False)
    resolution = db.Column(db.String(50), nullable=True)
    refresh_rate = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    product = db.relationship('Product', back_populates='monitor', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'screen_size': self.screen_size,
            'resolution': self.resolution,
            'refresh_rate': self.refresh_rate,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

