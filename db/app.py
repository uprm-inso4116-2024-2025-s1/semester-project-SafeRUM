from flask import Flask
from models import db
from config import Config

from blueprints.auth import auth_bp
from blueprints.reports import reports_bp
from blueprints.alerts import alerts_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(reports_bp, url_prefix='/reports')
    app.register_blueprint(alerts_bp, url_prefix='/alerts')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
