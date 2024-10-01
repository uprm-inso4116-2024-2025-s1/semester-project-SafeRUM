from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import mapped_column

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = mapped_column(Integer, primary_key=True)
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
    
    def map(self):
        return {
            'id' : self.id,
            'first_name' : self.first_name,
            'last_name' : self.last_name,
            'email' : self.email,
            'phone_number' : self.phone_number,
            'password_hash' : self.password_hash,
            'namebigint' : self.namebigint,
            'profile_phote_url' : self.profile_photo_url,
            'trust_level' : self.trust_level,
            'account_locked' : self.account_locked,
            'created_at' : self.created_at
        }


class Admin(db.Model):
    __tablename__ = 'admins'

    id = mapped_column(Integer, primary_key=True)
    user_id = mapped_column(ForeignKey("users.id"))
    role = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())  # Auto timestamp

    def map(self):
        return {
            'id' : self.id,
            'user_id' : self.user_id,
            'role' : self.role,
            'created_at' : self.created_at
        }


class Report(db.Model):
    __tablename__ = 'reports'

    id = mapped_column(Integer, primary_key=True)
    creator_id = mapped_column(ForeignKey("users.id"))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float(53), nullable=False)
    longitude = db.Column(db.Float(53), nullable=False)
    status = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())  # Auto timestamp

    def map(self):
        return {
            'id' : self.id,
            'creator_id' : self.creator_id,
            'title' : self.title,
            'description' : self.description,
            'category' : self.category,
            'location' : self.location,
            'latitude' : self.latitude,
            'longitude' : self.longitude,
            'status' : self.status,
            'created_at' : self.created_at
        }


class Alert(db.Model):
    __tablename__ = 'alerts'

    id = mapped_column(Integer, primary_key=True)
    admin_id = mapped_column(ForeignKey("admins.id"))
    alert_type = db.Column(db.String(255), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float(53), nullable=False)
    longitude = db.Column(db.Float(53), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())  # Auto timestamp

    def map(self):
        return {
            'id' : self.id,
            'admin_id' : self.admin_id,
            'alert_type' : self.alert_type,
            'message' : self.message,
            'location' : self.location,
            'latitude' : self.latitude,
            'longitude' : self.longitude,
            'created_at' : self.created_at
        }

