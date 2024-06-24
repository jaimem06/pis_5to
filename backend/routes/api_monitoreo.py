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


# API para listar monitoreoes
@api_monitoreo.route("/monitoreo")
def listar():
    return make_response(
        jsonify({"msg": "OK","code": 200,"datos": ([i.serialize for i in monitoreoC.listar()]),}),
        200,
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
@api_monitoreo.route("/monitoreo/proyeccion", methods=["GET"])
def obtener_proyeccion():
    # Obtener el parámetro de steps de la consulta
    steps = request.args.get('steps', default=3, type=int)  # Por defecto 20 pasos si no se especifica
    
    # Obtener datos históricos de agua
    monitoreos_agua = monitoreoC.obtener_datos_historicos_agua()
    
    # Obtener datos históricos de aire
    monitoreos_aire = monitoreoC.obtener_datos_historicos_aire()
    
    # Verificar si se encontraron datos de agua
    if monitoreos_agua:
        # Preparar datos para proyección
        df_agua = monitoreoC.preparar_datos_para_proyeccion(monitoreos_agua)
        # Calcular proyección usando el método ARIMA 
        proyeccion_agua = monitoreoC.arima(df_agua, steps)
    else:
        proyeccion_agua = None
    
    # Verificar si se encontraron datos de aire
    if monitoreos_aire:
        # Preparar datos para proyección
        df_aire = monitoreoC.preparar_datos_para_proyeccion(monitoreos_aire)
        # Calcular proyección usando el método ARIMA 
        proyeccion_aire = monitoreoC.arima(df_aire, steps)
    else:
        proyeccion_aire = None
    
    response_data = {
        "msg": "OK",
        "code": 200,
        "proyecciones": {}
    }
    
    if proyeccion_agua is not None:
        response_data["proyecciones"]["agua"] = [round(val, 6) for val in proyeccion_agua]
    else:
        response_data["proyecciones"]["agua"] = "No hay datos de monitoreo de agua."
    
    if proyeccion_aire is not None:
        response_data["proyecciones"]["aire"] = [round(val, 6) for val in proyeccion_aire]
    else:
        response_data["proyecciones"]["aire"] = "No hay datos de monitoreo de aire."

    return make_response(jsonify(response_data), 200)