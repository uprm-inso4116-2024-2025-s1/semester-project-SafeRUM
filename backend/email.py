from threading import Thread

from app import mail
from config import Config
from flask import current_app
from flask_mail import Message


def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)


def send_email(subject, sender, recipients, text_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    Thread(
        target=send_async_email, args=(current_app._get_current_object(), msg)
    ).start()


def send_verification_email(user, token):
    verification_url = current_app.url_for("verify", token=token)
    subject = "[SafeRUM] Verify Your Email Address"
    recipients = [user.email]
    body = f"Hi {user.first_name}, please click the following link to verify your email: {verification_url}"

    send_email(
        subject=subject,
        sender=Config.MAIL_DEFAULT_SENDER,
        recipients=recipients,
        text_body=body,
    )
