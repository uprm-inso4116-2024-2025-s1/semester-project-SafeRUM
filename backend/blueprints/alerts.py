# blueprints/alerts.py

from backend import Blueprint, request, jsonify
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


@alerts_bp.route('/<int:alert_id>', methods=['GET'])
def get_alert(alert_id):
    """ Get an alert (by its id). """

    alert = db.session.query(Alert).filter_by(id=alert_id).first()

    if alert:
        return jsonify(alert.map())
    return jsonify({"error": "Alert not found"}), 404


@alerts_bp.route('/<int:alert_id>', methods=['PUT'])
def update_alert(alert_id):
    """ Update an alert (by its id). """

    data = request.get_json()

    admin_id = data.get('admin_id')
    alert_type = data.get('alert_type')
    message = data.get('message')
    location = data.get('location')
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    alert = db.session.query(Alert).filter_by(id=alert_id).first()

    if alert:
        if admin_id:
            alert.admin_id = admin_id
        if alert_type:
            alert.alert_type = alert_type
        if message:
            alert.message = message
        if location:
            alert.location = location
        if latitude:
            alert.latitude = latitude
        if longitude:
            alert.longitude = longitude

        db.session.commit()
        return jsonify({"message": f"Alert {alert_id} updated successfully"}), 200
    
    return jsonify({"message": f"Alert {alert_id} not found"}), 200


@alerts_bp.route('/<int:alert_id>', methods=['DELETE'])
def delete_alert(alert_id):
    """ Delete an alert (by its id). """

    alert = db.session.query(Alert).filter_by(id=alert_id).first()

    if alert:
        db.session.delete(alert)
        db.session.commit()
        return jsonify({"message": f"Alert {alert_id} deleted successfully"}), 200
    
    return jsonify({"message": f"Alert {alert_id} not found"}), 200


