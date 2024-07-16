from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_apscheduler import APScheduler
import atexit
import json
from config.mqtt_config import create_mqtt_client, publish_solicitud_datos

db = SQLAlchemy()
scheduler = APScheduler()

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.config.Config')
    db.init_app(app)

    if not scheduler.running:
        scheduler.init_app(app)
        scheduler.start()
        print("Scheduler iniciado y ejecutándose.")

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
    if client is not None:
        client.on_message = on_message
    else:
        print("No se pudo crear el cliente MQTT.")

    def publish_and_subscribe():
        publish_solicitud_datos()
        client.subscribe("sensor/agua")

    scheduler.add_job(id='ScheduledTask', func=publish_and_subscribe, trigger='interval', minutes=1)

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

def shutdown_scheduler():
    if scheduler.running:
        scheduler.shutdown()

atexit.register(shutdown_scheduler)