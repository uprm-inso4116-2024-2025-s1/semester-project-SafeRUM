# blueprints/alerts.py

from flask import Blueprint, request, jsonify
from sqlalchemy import select
from models import db, Alert

alerts_bp = Blueprint('alerts', __name__)

@alerts_bp.route('/new', methods=['POST'])
def create_alert():
    """ Create a new alert. """

    data = request.get_json()

    admin_id = data.get('admin_id')
    alert_type = data.get('alert_type')
    message = data.get('message')
    location = data.get('location')
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    new_alert = Alert(
        admin_id=admin_id,
        alert_type=alert_type,
        message=message,
        location=location,
        latitude=latitude,
        longitude=longitude
    )

    db.session.add(new_alert)
    db.session.commit()

    return jsonify({"message" : "Alert created successfully",
                    "alert_id" : new_alert.id}), 201

@alerts_bp.route('/all', methods=['GET'])
def get_alerts():
    """ Get all alerts. """

    alerts = db.session.query(Alert).all()
    result = []
    for alert in alerts:
        result.append(alert.map())
    return result


