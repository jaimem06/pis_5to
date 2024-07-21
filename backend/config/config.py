from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))

load_dotenv(path.join(basedir, '.env'))

class Config:
    # Configuración GENERAL
    FLASK_APP = environ.get('FLASK_APP')
    FLASK_ENV = environ.get('FLASK_ENV')
    # Configuracion de BDD
    user = environ.get('MYSQL_USER')
    password = environ.get('MYSQL_PASSWORD')
    host = environ.get('MYSQL_HOST')
    db = environ.get('MYSQL_DATABASE')
    port = environ.get('MYSQL_PORT')
    ssl_ca = environ.get('MYSQL_SSL_CA')

    # Configuración para Token
    SECRET_KEY = environ.get('SECRET_KEY')

    # CONFIGURACION DE LA SQLAlchemy
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{user}:{password}@{host}:{port}/{db}?ssl_ca={ssl_ca}"
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_RECORD_QUERIES = True
    SQLALCHEMY_TRACK_MODIFICATIONS = 'enable'

    # Configuración de HiveMQ
    HIVEMQ_SERVER = environ.get('HIVEMQ_SERVER')
    HIVEMQ_PORT = environ.get('HIVEMQ_PORT')
    HIVEMQ_USER = environ.get('HIVEMQ_USER')
    HIVEMQ_PASSWORD = environ.get('HIVEMQ_PASSWORD')
    HIVEMQ_SSL_CA = environ.get('HIVEMQ_SSL_CA')
    # Contraseña para solicitar datos al servidor MQTT
    SOLICITAR_DATOS_MSG = environ.get('PASS_DATOSMQTT')
    TOPICO_SOLICITAR_DATOS = environ.get('TOPICO_SOLICITAR_DATOS')