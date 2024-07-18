from flask import Blueprint, jsonify, make_response, request
from controllers.monitoreoControl import MonitoreoControl
from flask_expects_json import expects_json
from controllers.utils.errors import Errors
api_monitoreo = Blueprint("api_monitoreo", __name__)

monitoreoC = MonitoreoControl()


schema_guardar_monitoreo = {
    "type": "object",
    "properties": {
        "dato": {"type": "number"},
        "fecha": {"type": "string", "format": "date"},
        "hora": {"type": "string", "format": "time"},
        "estado": {"type": "boolean"},
        "sensor": {"type": "string", "enum": ["Agua", "Aire"]}
    },
    "required": ["dato", "fecha", "hora", "estado", "sensor"]
}


# API para listar monitoreos
@api_monitoreo.route("/monitoreo")
def listar():
    resultado = monitoreoC.listar()
    return make_response(
        jsonify({"msg": "OK","code": 200, "datos": resultado}), 200,
    )

# API para guardar monitoreo
@api_monitoreo.route("/monitoreo/guardar", methods=["POST"])
@expects_json(schema_guardar_monitoreo)
def guardar_monitoreo():
    data = request.json
    id = monitoreoC.guardar_monitoreo(data)

    if id >= 0:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "data": {"tag": "Monitoreo guardado"}}),
            200,
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "ERROR",
                    "code": 400,
                    "data": {"tag": "No se pudo guardar monitoreo"},
                }
            ),
            400,
        )

# API para mostrar monitoreo por external_id
@api_monitoreo.route("/monitoreo/<external_id>", methods=["GET"])
def listar_external_id(external_id):
    monitoreo = monitoreoC.obtener_monitoreo_external_id(external_id)

    if monitoreo:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "datos": monitoreo.serialize}), 200
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "Error",
                    "code": 404,
                    "datos": {"error": "Monitoreo no encontrado"},
                }
            ),
            404,
        )


# API para obtener la proyección ARIMA
@api_monitoreo.route("/monitoreo/proyeccion/<dias>", methods=["GET"])
def obtener_proyeccion(dias):
    print(dias)
    steps = request.args.get('steps', int(dias), type=int)
    
    monitoreos_agua = monitoreoC.obtener_datos_historicos_agua()
    monitoreos_aire = monitoreoC.obtener_datos_historicos_aire()

    df_agua = monitoreoC.preparar_datos_para_proyeccion(monitoreos_agua) if monitoreos_agua else None
    df_aire = monitoreoC.preparar_datos_para_proyeccion(monitoreos_aire) if monitoreos_aire else None

    proyeccion_agua = monitoreoC.arima(df_agua, steps) if df_agua is not None else None
    proyeccion_aire = monitoreoC.arima(df_aire, steps) if df_aire is not None else None

    response_data = {
        "msg": "OK",
        "code": 200,
        "proyecciones": {
            "agua": [round(val, 6) for val in proyeccion_agua] if proyeccion_agua is not None else "No hay datos de monitoreo de agua.",
            "aire": [round(val, 6) for val in proyeccion_aire] if proyeccion_aire is not None else "No hay datos de monitoreo de aire."
        }
    }
    return make_response(jsonify(response_data), 200)