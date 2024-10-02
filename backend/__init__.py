from flask_mail import Mail
from backend import Flask
from models import db
from config import Config

from blueprints.auth import auth_bp
from blueprints.reports import reports_bp
from blueprints.alerts import alerts_bp
from blueprints.users import users_bp
from blueprints.admins import admins_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(reports_bp, url_prefix="/reports")
    app.register_blueprint(alerts_bp, url_prefix="/alerts")
    app.register_blueprint(users_bp, url_prefix="/user")
    app.register_blueprint(admins_bp, url_prefix="/admin")

    return app
