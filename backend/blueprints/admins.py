# blueprints/admins.py

from flask import Blueprint, current_app, jsonify, request
from flask_autodoc.autodoc import Autodoc
from models import Admin, db

admins_bp = Blueprint("admins", __name__)
auto = Autodoc()


@admins_bp.before_app_first_request
def init_autodoc():
    auto.init_app(current_app)  # Attach to the current app inside the context


@auto.doc()
@admins_bp.route("/new", methods=["POST"])
def create_admin():
    """Create a new admin."""

    data = request.get_json()

    user_id = data.get("user_id")
    role = data.get("role")

    new_admin = Admin(
        user_id=user_id,
        role=role,
    )

    db.session.add(new_admin)
    db.session.commit()

    return (
        jsonify({"message": "Admin created successfully", "admin_id": new_admin.id}),
        201,
    )


@auto.doc()
@admins_bp.route("/all", methods=["GET"])
def get_admins():
    """Get all admins."""

    admins = db.session.query(Admin).all()
    result = []
    for admin in admins:
        result.append(admin.map())
    return result


@auto.doc()
@admins_bp.route("/<int:admin_id>", methods=["GET"])
def get_admin(admin_id):
    """Get an admin (by their id)."""

    admin = db.session.query(Admin).filter_by(id=admin_id).first()

    if admin:
        return jsonify(admin.map())
    return jsonify({"error": "Admin not found"}), 404


@auto.doc()
@admins_bp.route("/<int:admin_id>", methods=["PUT"])
def update_admin(admin_id):
    """Update an admin (by their id)."""

    data = request.get_json()

    role = data.get("role")

    admin = db.session.query(Admin).filter_by(id=admin_id).first()

    if admin:
        if role:
            admin.role = role

        db.session.commit()
        return jsonify({"message": f"Admin {admin_id} updated successfully"}), 200

    return jsonify({"message": f"Admin {admin_id} not found"}), 200


@auto.doc()
@admins_bp.route("/<int:admin_id>", methods=["DELETE"])
def delete_admin(admin_id):
    """Delete an admin (by their id)."""

    admin = db.session.query(Admin).filter_by(id=admin_id).first()

    if admin:
        db.session.delete(admin)
        db.session.commit()
        return jsonify({"message": f"Admin {admin_id} deleted successfully"}), 200

    return jsonify({"message": f"Admin {admin_id} not found"}), 200


@admins_bp.route("/docs")
def documentation():
    return auto.html()
