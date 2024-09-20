# blueprints/auth.py
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


# @app.route('/reports', methods=['GET'])
# def get_reports():
#     conn = connect_db()
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM reports;")
#     rows = cur.fetchall()
#     cur.close()
#     conn.close()
#     return jsonify(rows)

# @app.route('/reports/<int:report_id>', methods=['GET'])
# def get_report(report_id):
#     conn = connect_db()
#     cur = conn.cursor()
#     cur.execute("SELECT * FROM reports WHERE id = %s;", (report_id,))
#     row = cur.fetchone()
#     cur.close()
#     conn.close()
#     if row:
#         return jsonify(row)
#     else:
#         return jsonify({"error": "Report not found"}), 404

# @app.route('/reports/<int:report_id>', methods=['PUT'])
# def update_report(report_id):
#     data = request.json
#     conn = connect_db()
#     cur = conn.cursor()
#     cur.execute(
#         """
#         UPDATE reports SET title = %s, description = %s, category = %s, location = %s, latitude = %s, longitude = %s, status = %s
#         WHERE id = %s;
#         """,
#         (data['title'], data['description'], data['category'], data['location'], 
#          data['latitude'], data['longitude'], data['status'], report_id)
#     )
#     conn.commit()
#     cur.close()
#     conn.close()
#     return jsonify({"message": "Report updated successfully"}), 200

# @app.route('/reports/<int:report_id>', methods=['DELETE'])
# def delete_report(report_id):
#     conn = connect_db()
#     cur = conn.cursor()
#     cur.execute("DELETE FROM reports WHERE id = %s;", (report_id,))
#     conn.commit()
#     cur.close()
#     conn.close()
#     return jsonify({"message": "Report deleted successfully"}), 200


