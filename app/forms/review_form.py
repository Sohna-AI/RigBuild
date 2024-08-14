from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[DataRequired(message='Star rating is required')])
    review = TextAreaField('Review', validators=[DataRequired(message='Review text is required'), Length(max=1500, message='Review text cannot be more than 1500 characters')])