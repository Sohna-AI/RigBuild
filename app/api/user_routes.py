from flask import Blueprint, request
from flask_login import login_required, current_user
from datetime import datetime
from app.models import db, User, Address
from app.forms.address_form import AddressForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/addresses', methods=['GET'])
@login_required
def user_addresses():
    """
    Query to get all user's addresses
    """
    addresses = Address.query.filter_by(user_id=current_user.id).all()
    return {'addresses': [address.to_dict() for address in addresses]}

@user_routes.route('/addresses', methods=['POST'])
@login_required
def add_user_address():
    """
    Adds a new address for the authenticated user
    """
    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_address = Address(
            user_id=current_user.id,
            street=form.data['street'],
            city=form.data['city'],
            state=form.data['state'],
            postal_code=form.data['postal_code'],
            country=form.data['country']
        )
        db.session.add(new_address)
        db.session.commit()
        return new_address.to_dict(), 201
    return form.errors, 400

@user_routes.route('/addresses/<int:address_id>', methods=['PUT'])
@login_required
def edit_user_address(address_id):
    """
    Edits the authenticated user's address
    """
    address = Address.query.get_or_404(address_id)
    if address.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403
    
    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        address.street = form.data['street']
        address.city = form.data['city']
        address.state = form.data['state']
        address.postal_code = form.data['postal_code']
        address.country = form.data['country']
        address.updated_at = datetime.now()
        
        db.session.commit()
        return address.to_dict()
    return form.errors, 400

@user_routes.route('/addresses/<int:address_id>', methods=['DELETE'])
@login_required
def delete_user_address(address_id):
    """
    Deletes an address of the authenticated user
    """
    address = Address.query.get_or_404(address_id)
    if address.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403
    
    db.session.delete(address)
    db.session.commit()
    return {'message': 'Address deleted successfully'}