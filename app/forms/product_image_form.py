from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_s3 import ALLOWED_EXTENSIONS

class ProductImageForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(message='Image is required'), FileAllowed(list(ALLOWED_EXTENSIONS))])
