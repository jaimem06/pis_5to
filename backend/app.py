from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import atexit
import json
import threading
from config.mqtt_config import create_mqtt_client, publish_solicitud_datos

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.config.Config')
    db.init_app(app)

    def save_data(data):
        with app.app_context():
            from controllers.monitoreoControl import MonitoreoControl
            monitoreoControl = MonitoreoControl()
            try:
                id_monitoreo = monitoreoControl.guardar_monitoreo(data)
                print(f"Monitoreo guardado con id: {id_monitoreo}")
            except Exception as e:
                print(f"Error al guardar monitoreo: {e}")

    def on_message(client, userdata, msg):
        try:
            data = json.loads(msg.payload.decode())
            save_data(data)
        except Exception as e:
            print(f"Error: {e}")

    client = create_mqtt_client()
    client.on_message = on_message

    def publish_and_subscribe():
        publish_solicitud_datos()
        client.subscribe("sensor/agua")

    publish_and_subscribe()

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

    return app

def shutdown_scheduler():
    pass

atexit.register(shutdown_scheduler)