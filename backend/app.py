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
        from routes.api import api
        from routes.api_persona import api_persona
        from routes.api_mota import api_mota
        from routes.api_monitoreo import api_monitoreo
        from routes.api_login import api_login
        from routes.api_validarToken import api_validarToken
        
        app.register_blueprint(api_persona)
        app.register_blueprint(api)
        app.register_blueprint(api_mota)
        app.register_blueprint(api_monitoreo)
        app.register_blueprint(api_login)
        app.register_blueprint(api_validarToken)
        # Creacion de las tablas
        db.create_all()
        #db.drop_all()
    return app