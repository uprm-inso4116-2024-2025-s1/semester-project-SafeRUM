# blueprints/reports.py

from flask import Blueprint, request, jsonify
from models import db, Report

reports_bp = Blueprint('reports', __name__)

@reports_bp.route('/new', methods=['POST'])
def create_report():
    """ Create a new report. """

    data = request.get_json()

    creator_id = data.get('creator_id')
    title = data.get('title')
    description = data.get('description')
    category = data.get('category')
    location = data.get('location')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    status = data.get('status')

    new_report = Report(
        creator_id=creator_id,
        title=title,
        description=description,
        category=category,
        location=location,
        latitude=latitude,
        longitude=longitude,
        status=status
    )

    db.session.add(new_report)
    db.session.commit()

    return jsonify({"message" : "Report created successfully",
                    "report_id" : new_report.id}), 201


@reports_bp.route('/all', methods=['GET'])
def get_reports():
    """ Get all reports. """

    reports = db.session.query(Report).all()
    result = []
    for report in reports:
        result.append(report.map())
    return result
    

@reports_bp.route('/<int:report_id>', methods=['GET'])
def get_report(report_id):
    """ Get a report (by its id). """

    report = db.session.query(Report).filter_by(id=report_id).first()

    if report:
        return jsonify(report.map())
    return jsonify({"error": "Report not found"}), 404


@reports_bp.route('/<int:report_id>', methods=['PUT'])
def update_report(report_id):
    """ Update a report (by its id). """
    
    data = request.get_json()

    title = data.get('title')
    description = data.get('description')
    category = data.get('category')
    location = data.get('location')
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    status = data.get('status')

    report = db.session.query(Report).filter_by(id=report_id).first()

    if report:
        if title:
            report.title = title
        if description:
            report.description = description
        if category:
            report.category = category
        if location:
            report.location = location
        if latitude:
            report.latitude = latitude
        if longitude:
            report.longitude = longitude
        if status:
            report.status = status
    
        db.session.commit()
        return jsonify({"message": f"Report {report_id} updated successfully"}), 200
    
    return jsonify({"message": f"Report {report_id} not found"}), 200


@reports_bp.route('/<int:report_id>', methods=['DELETE'])
def delete_report(report_id):
    """ Delete a report (by its id) """

    report = db.session.query(Report).filter_by(id=report_id).first()

    if report:
        db.session.delete(report)
        db.session.commit()
        return jsonify({"message": f"Report {report_id} deleted successfully"}), 200
    
    return jsonify({"message": f"Report {report_id} not found"}), 200

