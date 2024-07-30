from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class CPU(db.Model):
    __tablename__ = 'cpus'
    
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    core_count = db.Column(db.Integer, nullable=False)
    core_clock = db.Column(db.Numeric(5, 2), nullable=False)
    boost_clock = db.Column(db.Numeric(5, 2), nullable=True)
    tdp = db.Column(db.Integer, nullable=False) 
    graphics = db.Column(db.String(255), nullable=True)
    smt = db.Column(db.Boolean, nullable=False) 
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    product = db.relationship('Product', back_populates='cpu', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'core_count': self.core_count,
            'core_clock': self.core_clock,
            'boost_clock': self.boost_clock,
            'tdp': self.tdp,
            'graphics': self.graphics,
            'smt': self.smt
        }
