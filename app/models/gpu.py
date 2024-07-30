from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class GPU(db.Model):
    __tablename__ = 'gpus'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    memory = db.Column(db.String(50), nullable=True)
    core_count = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    product = db.relationship('Product', back_populates='gpu', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'memory': self.memory,
            'core_count': self.core_count,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
