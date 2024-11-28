from uuid import uuid4

from flask import Blueprint, current_app, jsonify, request
from flask_autodoc.autodoc import Autodoc
from models import db, EmailVerificationToken, User

verify_bp = Blueprint("verify", __name__)
auto = Autodoc()


@verify_bp.before_app_first_request
def init_autodoc():
    auto.init_app(current_app)  # Attach to the current app inside the context


@auto.doc()
@verify_bp.route("verify/<token>")
def verify_email(token: uuid4):
    verification_token = EmailVerificationToken.query.filter_by(token=token).first()

    if not verification_token or not verification_token.is_valid():
        return jsonify({"error": "Invalid or expired token"}), 400

    # Mark the user as verified
    user = User.query.get(verification_token.user_id)
    user.is_verified = True

    # Remove the token after verification
    db.session.delete(verification_token)
    db.session.commit()

    return jsonify({"message": "Email verified successfully."}), 200


@verify_bp.route("/docs")
def documentation():
    return auto.html()
