from flask import Flask
from flask_apscheduler import APScheduler
from flask_sqlalchemy import SQLAlchemy
from config.mqtt_config import create_mqtt_client

db = SQLAlchemy()
scheduler = APScheduler()

def scheduleTask():
    create_mqtt_client()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.config.Config')
    db.init_app(app)

    scheduler.init_app(app)
    scheduler.start()

    scheduler.add_job(id='ScheduledTask', func=scheduleTask, trigger='interval', seconds=30)

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

        db.create_all()
        #db.drop_all()
        
    return app