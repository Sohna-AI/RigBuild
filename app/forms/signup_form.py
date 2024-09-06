from flask_wtf import FlaskForm
from wtforms import StringField, EmailField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'Username', validators=[DataRequired(message='Username is required'), username_exists, Length(max=40, message='Username cannot be more than 40 characters')])
    first_name = StringField('First Name', validators=[DataRequired(message='First name is required'), Length(max=50, message='First name cannot be more than 50 characters')])
    last_name = StringField('Last Name', validators=[DataRequired('Last name is required'), Length(max=50, message='Last name cannot be more than 50 characters')])
    email = EmailField('Email', validators=[DataRequired(message='Email is required'), user_exists, Email(message='Valid email is required')])
    password = StringField('Password', validators=[DataRequired(message='Password is required'), Length(min=6, message='Password has to be at least 6 characters')])
