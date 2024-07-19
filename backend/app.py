from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_apscheduler import APScheduler
import json, atexit, time
from config.mqtt_config import create_mqtt_client, publish_solicitud_datos

db = SQLAlchemy()
scheduler = APScheduler()
sensor_data = {}
data_published = False

def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.config.Config')
    db.init_app(app)

    if not scheduler.running:
        scheduler.init_app(app)
        scheduler.start()
        print("Scheduler iniciado y ejecutándose.")

    scheduler.add_job(id='ScheduledTask', func=lambda: publish_and_subscribe(app), trigger='interval', minutes=25)

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

def save_data(app):
    global data_published
    with app.app_context():
        from controllers.monitoreoControl import MonitoreoControl
        monitoreoControl = MonitoreoControl()
        for _, data in sensor_data.items():
            try:
                id_monitoreo = monitoreoControl.guardar_monitoreo(data)
                print(f"Monitoreo guardado con id: {id_monitoreo}")
            except Exception as e:
                print(f"Error al guardar monitoreo: {e}")
        sensor_data.clear()
        data_published = True 

def on_message(_, __, msg, app):
    if not data_published:
        try:
            data = json.loads(msg.payload.decode())
            sensor_enlace = msg.topic
            with app.app_context():
                from controllers.monitoreoControl import MonitoreoControl
                monitoreoControl = MonitoreoControl()
                if sensor_enlace in monitoreoControl.obtener_enlaces():
                    sensor_data[sensor_enlace] = data
                    print(f"Datos recibidos de {sensor_enlace}: {data}")
                else:
                    print(f"Datos ignorados de sensor inactivo: {sensor_enlace}")
        except Exception as e:
            print(f"Error: {e}")

def publish_and_subscribe(app):
    global data_published
    if data_published: 
        return

    client = create_mqtt_client()
    if client is None:
        print("Error al crear el cliente MQTT.")
        return

    client.on_message = lambda client, userdata, msg: on_message(client, userdata, msg, app)
    
    retry_count = 0
    while not client.connected_flag and retry_count < 5:
        print("Esperando conexión...")
        time.sleep(2)
        retry_count += 1

    if not client.connected_flag:
        print("No se pudo conectar al Broker MQTT.")
        client.loop_stop()
        return

    client.loop_start()
    publish_solicitud_datos(client)
    with app.app_context():
        from controllers.monitoreoControl import MonitoreoControl
        monitoreoControl = MonitoreoControl()
        topicos = monitoreoControl.obtener_enlaces()
    for topico in topicos:
        client.subscribe(topico)
        print(f"Suscrito a {topico}")

    save_data(app)
    client.loop_stop()

def shutdown_scheduler():
    if scheduler.running:
        scheduler.shutdown()

atexit.register(shutdown_scheduler)