from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import pymysql

pymysql.install_as_MySQLdb()
import MySQLdb

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    #TODO
    app.config.from_object('config.config.Config')
    db.init_app(app)

    with app.app_context():
        from routes. api import api
        app.register_blueprint(api)
        # Creacion de las tablas
        db.create_all()
        # db.drop_all()
    return app