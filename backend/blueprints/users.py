# blueprints/users.py

from flask import Blueprint, request, jsonify
from models import db, User

users_bp = Blueprint("users", __name__)


@users_bp.route("/profile/<int:user_id>", methods=["GET"])
def profile(user_id):
    """Get a specific user (by their id)."""
    user = db.session.query(User).filter_by(id=user_id).first()

    if user:
        return jsonify(user.map())
    return jsonify({"error": "User not found"}), 404


@users_bp.route("/profile/<int:user_id>", methods=["PUT"])
def update(user_id):
    """ " Update a specific user (by their id)."""

    data = request.get_json()

    first_name = data.get("first_name")
    last_name = data.get("last_name")
    email = data.get("email")
    phone_number = data.get("phone_number")
    password = data.get("password")
    password_confirmation = data.get("password_confirmation")

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
                return jsonify({"error": "Passwords do not match"}), 400
            else:
                user.set_password(password)

        db.session.commit()
        return jsonify({"message": f"User {user_id} updated successfully"}), 200

    return jsonify({"message": f"User {user_id} not found"}), 200


@users_bp.route("/all", methods=["GET"])
def get_users():
    """ADMIN-EXCLUSIVE: Get all users."""

    users = db.session.query(User).all()
    result = []
    for user in users:
        result.append(user.map())
    return result


@users_bp.route("/delete/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    """Delete a user's account."""

    user = db.session.query(User).filter_by(id=user_id).first()

    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": f"User {user_id} deleted successfully"}), 200

    return jsonify({"message": f"User {user_id} not found"}), 200
