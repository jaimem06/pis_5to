from flask import Flask
import pymysql
from flask_apscheduler import APScheduler
from flask_sqlalchemy import SQLAlchemy

pymysql.install_as_MySQLdb()
import MySQLdb

db = SQLAlchemy()
scheduler = APScheduler()

class Config:
    SCHEDULER_API_ENABLED = True


def create_app():
    app = Flask(__name__, instance_relative_config=False)
    #TODO
    app.config.from_object('config.config.Config')
    db.init_app(app)

    scheduler.init_app(app)
    scheduler.start()

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

        def scheduleTask():
            print("Tarea programada")

        scheduler.add_job(id='job1', func=scheduleTask, trigger='interval', seconds=5)
        #db.drop_all()
    return app