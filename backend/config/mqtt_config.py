import paho.mqtt.client as mqtt
import time

def on_connect(client, userdata, flags, rc, properties=None):
    client.subscribe("sensor/agua")

def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload.decode()))

def create_mqtt_client():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message

    try:
        client.connect("localhost", 1883, 60)
        client.loop_start()
        time.sleep(10) 
        client.loop_stop()
        client.disconnect()
    except Exception as e:
        print(f"Error al conectar: {e}")

    return client