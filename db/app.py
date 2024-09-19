from flask import Flask
from models import db
from config import Config
from blueprints.auth import auth_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

# DB_NAME = "safe-rum-db-dev-dummy"
# DB_USER = "postgres"
# DB_PASSWORD = "postgres"
# DB_HOST = "localhost"
# DB_PORT = "5432"

# def connect_db():
#     conn = psycopg2.connect(
#         dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT
#     )
#     return conn

# @app.route('/reports', methods=['POST'])
# def create_report():
#     data = request.json
#     conn = connect_db()
#     cur = conn.cursor()
#     cur.execute(
#         """
#         INSERT INTO reports (creator_id, title, description, category, location, latitude, longitude, status)
#         VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
#         RETURNING id;
#         """, 
#         (data['creator_id'], data['title'], data['description'], data['category'], data['location'], 
#          data['latitude'], data['longitude'], data.get('status', 'Pending'))
#     )
#     new_report_id = cur.fetchone()[0]
#     conn.commit()
#     cur.close()
#     conn.close()
#     return jsonify({"id": new_report_id}), 201

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

# if __name__ == '__main__':
#     app.run(debug=True)
