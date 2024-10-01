# blueprints/users.py

from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from models import db, User

users_bp = Blueprint('users', __name__)

#TODO: Validate @upr.edu email address & email format
def is_valid_email(email):
    return email

#TODO: Validate password strength
def is_valid_password(password):
    return password

#TODO: Validate phone number format
def is_valid_phone_number(phone_number):
    return phone_number

@users_bp.route('/new', methods=['POST'])
def create_user():
    """ Create a new user. """

    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')
    password_confirmation = data.get('password_confirmation')
    
    # No empty fields
    if not all([first_name, last_name, email, phone_number, password, password_confirmation]):
        return jsonify({"error": "All fields are required"}), 400
    
    # Password confirmation
    if password != password_confirmation:
        return jsonify({"error" : "Passwords do not match"}), 400

    # Email format & @upr.edu domain
    if not is_valid_email(email):
        return jsonify({"error" : "Invalid email address"}), 400
    
    # Password strength
    if not is_valid_password(password):
        return jsonify({"error": "Password must be at least 8 characters long"}), 400
    
    if not is_valid_phone_number(phone_number):
        return jsonify({"error": "Phone number must follow the following format: XXX-XXX-XXXX"}), 400
    
    # BUG: SQLAlchemy Integrity Error (duplicate users_email_unique key)

    try:
        # Create new user
        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number
        )

        new_user.set_password(password)

        # Commit changes (new user) to DB
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User registered successfully", 
                    "user" : {
                                "first_name" : first_name, 
                                "last_name" : last_name, 
                                "email": email,
                                "phone_number": phone_number
                            }}), 201

    except IntegrityError as e:
        db.session.rollback()   # rollback failed transaction (adding a new user)
        return jsonify({'error': "An error occurred while adding the user."}), 400


@users_bp.route('/all', methods=['GET'])
def get_users():
    """ ADMIN-EXCLUSIVE: Get all users. """

    users = db.session.query(User).all()
    result = []
    for user in users:
        result.append(user.map())
    return result

@users_bp.route('/profile/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """ Get a specific user (by their id). """
    user = db.session.query(User).filter_by(id=user_id).first()

    if user:
        return jsonify(user.map())
    return jsonify({"error": "User not found"}), 404


@users_bp.route('/profile/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """" Update a specific user (by their id). """
    
    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')
    password_confirmation = data.get('password_confirmation')

    user = db.session.query(User).filter_by(id=user_id).first()

    if user:
        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name
        if email:
            user.email = email
        if phone_number:
            user.phone_number = phone_number
        if password:
            if not password_confirmation or password != password_confirmation:
                return jsonify({"error" : "Passwords do not match"}), 400
            else:
                user.set_password(password)
    
        db.session.commit()
        return jsonify({"message": f"User {user_id} updated successfully"}), 200
    
    return jsonify({"message": f"User {user_id} not found"}), 200


@users_bp.route('/delete/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """ Delete a user's account. """

    user = db.session.query(User).filter_by(id=user_id).first()

    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": f"User {user_id} deleted successfully"}), 200
    
    return jsonify({"message": f"User {user_id} not found"}), 200