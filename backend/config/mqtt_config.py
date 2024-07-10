import paho.mqtt.client as mqtt
import ssl
from config.config import Config

# Credenciales y configuración del servidor HiveMQ Cloud
mqtt_server = Config.HIVEMQ_SERVER
mqtt_port = Config.HIVEMQ_PORT
mqtt_user = Config.HIVEMQ_USER
mqtt_pass = Config.HIVEMQ_PASSWORD

def on_connect(client, userdata, flags, rc):
    print(f"Conectado al Broker, código de resultado: {rc}.")
    client.subscribe("sensor/agua")

def create_mqtt_client():
    client = mqtt.Client()

    # Credenciales de autenticación
    client.username_pw_set(mqtt_user, mqtt_pass)

    # CERTIFICADO TLS/SSL
    try:
        port_int = int(mqtt_port)
        client.tls_set(ca_certs=Config.HIVEMQ_SSL_CA, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLS)
        client.on_connect = on_connect
        client.connect(mqtt_server, port_int, 60)
        client.loop_start()
    except ValueError:
        print("El puerto MQTT debe ser un número entero.")
        return None
    except Exception as e:
        print(f"Error al configurar TLS o conectar: {e}")
        return None

    return client

def publish_solicitud_datos():
    client = create_mqtt_client()
    if not client:
        return
    try:
        result, mid = client.publish("solicitud/datos", "solicitar_datos")
        if result == mqtt.MQTT_ERR_SUCCESS:
            print("Mensaje 'solicitar_datos' publicado exitosamente.")
        else:
            print(f"Error al publicar mensaje: {result}")
        client.loop_stop()
        client.disconnect()
    except ValueError:
        print("El puerto MQTT debe ser un número entero.")
    except Exception as e:
        print(f"Error al publicar solicitud de datos: {e}")

publish_solicitud_datos()