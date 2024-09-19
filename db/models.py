from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(225), unique=True, nullable=False)
    phone_number = db.Column(db.String(12), unique=True, nullable=False)
    password_hash = db.Column(db.String(225), nullable=False, default='placeholder')  #TODO: Store hashed password
    namebigint = db.Column(db.String(225), nullable=False, default='placeholder')   #TODO: Replace placeholder namebigint
    profile_photo_url = db.Column(db.String(225), nullable=False, default='placeholder')    #TODO: Replace placeholder pfp
    trust_level = db.Column(db.Float(53), nullable=False, default=0)
    account_locked = db.Column(db.Boolean, nullable=False, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())  # Auto timestamp


    # TODO: Password hashing for secure storage
    def set_password(self, password):
        return password
    
    # TODO: Check input password with stored password (login event)
    def check_password(self, password):
        return password
