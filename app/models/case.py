from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Case(db.Model):
    __tablename__ = 'cases'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    form_factor = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(50), nullable=True)
    features = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    product = db.relationship('Product', back_populates='case', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'form_factor': self.form_factor,
            'color': self.color,
            'features': self.features,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
