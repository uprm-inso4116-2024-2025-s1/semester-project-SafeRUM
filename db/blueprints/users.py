# blueprints/users.py

from flask import Blueprint, request, jsonify
from sqlalchemy import select
from models import db, User

users_bp = Blueprint('users', __name__)


#TODO: User profile management viewing
@users_bp.route('/profile/<int:user_id>', methods=['GET'])
def profile(user_id):
    """ Get a specific user (by their id). """
    user = db.session.query(User).filter_by(id=user_id).first()

    if user:
        return jsonify(user.map())
    return jsonify({"error": "User not found"}), 404


#TODO: User profile updating
def update():
    """" Update a specific user (by their id). """
    pass


def get_users():
    """ ADMIN-EXCLUSIVE: Get all users. """
    pass


def delete_user():
    """ Delete a user's account. """
    pass