from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Length, NumberRange

class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(message='Product name is required'), Length(max=50, message='Name cannot be longer than 50 characters.')])
    description = TextAreaField('Description', validators=[DataRequired(message='Product description is required.'), Length(max=1500, message='Description cannot be longer than 1500 characters.')])
    price = DecimalField('Price', validators=[DataRequired(message='Product price is required'), NumberRange(min=0, message='Price must be a positive number')])
    stock_quantity = IntegerField('Stock Quantity', validators=[DataRequired(message='Stock quantity is required.'), NumberRange(min=0, message='Stock quantity must be a positive number')])
    category_id = IntegerField('Category', validators=[DataRequired(message='Category is required')])