import paho.mqtt.client as mqtt
import ssl
from config.config import Config
import time

def on_connect(client, _, __, rc):
    if rc == 0:
        print("Conectado al Broker.")
        client.connected_flag = True
    else:
        print(f"Conexión fallida, código de resultado: {rc}")
        client.connected_flag = False

def create_mqtt_client():
    client = mqtt.Client()
    client.username_pw_set(Config.HIVEMQ_USER, Config.HIVEMQ_PASSWORD)
    
    try:
        client.tls_set(ca_certs=Config.HIVEMQ_SSL_CA, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLS)
        client.on_connect = on_connect
        client.connected_flag = False
        client.connect(Config.HIVEMQ_SERVER, int(Config.HIVEMQ_PORT), 60)
        client.loop_start()
    except Exception as e:
        print(f"Error al configurar TLS o conectar: {e}")
        return None

    retry_count = 0
    while not client.connected_flag and retry_count < 5:
        print("Esperando conexión...")
        time.sleep(2)
        retry_count += 1

    if not client.connected_flag:
        print("No se pudo conectar al Broker MQTT.")
        client.loop_stop()
        return None

    return client

def publish_solicitud_datos(client):
    if client and client.connected_flag:
        result, _ = client.publish("solicitud/datos", Config.SOLICITAR_DATOS_MSG)
        if result == mqtt.MQTT_ERR_SUCCESS:
            print("DATOS SOLICITADOS EXITOSAMENTE.")
        else:
            print(f"Error al publicar mensaje: {result}")
    else:
        print("Cliente MQTT no está conectado.")