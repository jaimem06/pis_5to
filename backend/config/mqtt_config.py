import paho.mqtt.client as mqtt
import json

def on_connect(client, userdata, flags, rc):
    print("Conectado con el código de resultado " + str(rc))
    client.subscribe("sensor/agua") 

def create_mqtt_client():
    client = mqtt.Client()
    client.on_connect = on_connect

    try:
        client.connect("192.168.1.4", 1883, 60)
        client.loop_start()
    except Exception as e:
        print(f"Error al conectar: {e}")

    return client

def publish_solicitud_datos():
    client = mqtt.Client()
    try:
        client.connect("192.168.1.4", 1883, 60)
        client.publish("solicitud/datos", "solicitar_datos")
        client.disconnect()
    except Exception as e:
        print(f"Error al publicar solicitud de datos: {e}")