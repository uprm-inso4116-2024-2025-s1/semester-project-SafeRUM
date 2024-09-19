# blueprints/auth.py
from flask import Blueprint, request, jsonify
from models import db, User

auth_bp = Blueprint('auth', __name__)

#TODO: Validate @upr.edu email address
def is_valid_email(email):
    return email

#TODO: Validate password strength
def is_valid_password(password):
    return password

# Create a new user account
@auth_bp.route('/register', methods=['POST'])
def register():

    data = request.get_json()

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')
    password_confirmation = data.get('password_confirmation')

    # Validate non-empty fields
    if not all([first_name, last_name, email, phone_number, password, password_confirmation]):
        return jsonify({"error": "All fields are required"}), 400
    
    # Password confirmation
    if password != password_confirmation:
        return jsonify({"error" : "Passwords do not match"}), 400

    # Email verification
    if not is_valid_email(email):
        return jsonify({"error" : "Invalid email address"}), 400
    
    if not is_valid_password(password):
        return jsonify({"error": "Password must be at least 8 characters long"}), 400
    
    if User.query.filter_by(email=email).first():
        jsonify({"error": "Email is already registered"}), 400


    # Create a new user instance
    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone_number=phone_number
    )

    new_user.set_password(password)
    
    # Add to the database
    db.session.add(new_user)
    db.session.commit()

    # Return a JSON response
    return jsonify({"message": "User registered successfully", "user" : {
        "first_name" : first_name, 
        "last_name" : last_name, 
        "email": email
    }}), 201



