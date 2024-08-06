from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, SelectField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    stock_quantity = IntegerField('Stock Quantity', validators=[DataRequired()])
    category_name = SelectField('Category', choices=[('GPU', 'GPU'), ('CPU', 'CPU'), ('Memory (Ram)', 'Memory (Ram)'), ('Storage', 'Storage'), ('Motherboard', 'Motherboard'), ('Cooling', 'Cooling'), ('Case', 'Case'), ('Monitor', 'Monitor')], validators=[DataRequired()])