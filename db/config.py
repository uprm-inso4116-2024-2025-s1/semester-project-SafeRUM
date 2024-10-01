#TODO: Add real database credentials
db_config = {
    "DB_NAME" : 'placeholder',
    "DB_USER" : 'placeholder',
    "DB_PASSWORD" : '12345',
    "DB_HOST" : 'localhost',
    "DB_PORT" : '5432'
}

class Config:
    SQLALCHEMY_DATABASE_URI = f'postgresql://{db_config["DB_USER"]}:{db_config["DB_PASSWORD"]}@{db_config["DB_HOST"]}/{db_config["DB_NAME"]}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False