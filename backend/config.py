# TODO: Add real database credentials
db_config = {
    "DB_NAME": "placeholder",
    "DB_USER": "placeholder",
    "DB_PASSWORD": "12345",
    "DB_HOST": "localhost",
    "DB_PORT": "5432",
}

mail_config = {"MAIL_PASSWORD": "W3A4ESAVEROOM"}  # TODO: Add GMail API app password


class Config:
    # SQLAlchemy variables
    SQLALCHEMY_DATABASE_URI = f'postgresql://{db_config["DB_USER"]}:{db_config["DB_PASSWORD"]}@{db_config["DB_HOST"]}/{db_config["DB_NAME"]}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask Mail variables
    MAIL_SERVER = "smtp.gmail.com"
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = "saferum@gmail.com"
    MAIL_PASSWORD = mail_config["MAIL_PASSWORD"]
    MAIL_DEFAULT_SENDER = "saferum@example.com"
