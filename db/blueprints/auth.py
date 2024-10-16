# blueprints/auth.py

from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from sqlalchemy import text
from models import db, User

auth_bp = Blueprint('auth', __name__)

#TODO: Validate @upr.edu email address & email format
def is_valid_email(email):
    return email

#TODO: Validate password strength
def is_valid_password(password):
    return password

# Create a new user account
@auth_bp.route('/register', methods=['POST'])
def register():
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
        

#TODO: User login and session opening
def login():
    pass


#TODO: User logout and session closing
def logout():
    pass

