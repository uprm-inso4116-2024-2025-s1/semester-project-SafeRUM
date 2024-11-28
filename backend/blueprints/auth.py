# blueprints/auth.py

from flask import Blueprint, current_app, jsonify, request
from flask_autodoc.autodoc import Autodoc
from models import db, User

auth_bp = Blueprint("auth", __name__)
auto = Autodoc()


@auth_bp.before_app_first_request
def init_autodoc():
    auto.init_app(current_app)  # Attach to the current app inside the context


# TODO: Validate @upr.edu email address & email format
def is_valid_email(email):
    return email


# TODO: Validate password strength
def is_valid_password(password):
    return password


@auto.doc()
# Create a new user account
@auth_bp.route("/register", methods=["POST"])
def register():
    """Create a new user."""

    data = request.get_json()

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    phone_number = data.get("phone_number")
    password = data.get("password")
    password_confirmation = data.get("password_confirmation")
    firebase_jwt = data.get("firebase_jwt")

    # No empty fields
    if not all(
        [
            first_name,
            last_name,
            email,
            phone_number,
            password,
            password_confirmation,
            firebase_jwt,
        ]
    ):
        return jsonify({"error": "All fields are required"}), 400

    # Password confirmation
    if password != password_confirmation:
        return jsonify({"error": "Passwords do not match"}), 400

    # Email format & @upr.edu domain
    if not is_valid_email(email):
        return jsonify({"error": "Invalid email address"}), 400

    # Password strength
    if not is_valid_password(password):
        return jsonify({"error": "Password must be at least 8 characters long"}), 400

    # BUG: SQLAlchemy Integrity Error (duplicate users_email_unique key)
    if User.query.filter_by(email=email).first():
        jsonify({"error": "Email is already registered"}), 400

    # Create new user
    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone_number=phone_number,
    )

    # TODO: Hash password
    new_user.set_password(password)

    # Commit changes (new user) to DB
    db.session.add(new_user)
    db.session.commit()

    # TODO: Create EmailVerificationToken with uuid4 for user

    # Return a confirmation message
    return (
        jsonify(
            {
                "message": "User registered successfully",
                "user": {
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email,
                },
            }
        ),
        201,
    )


@auth_bp.route("/docs")
def documentation():
    return auto.html()


# TODO: User login and session opening
# TODO: Check if user email is verified before login
def login():
    pass


# TODO: User logout and session closing
def logout():
    pass
