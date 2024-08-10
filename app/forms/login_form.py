from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def validate_email_and_user_exists(form, field):
    email = field.data
    email_validator = Email(message='Valid email is required')
    email_validator(form, field)
    
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(message='Email is required'), validate_email_and_user_exists])
    password = StringField('password', validators=[DataRequired(message='Password is required'), password_matches ])