from flask import Blueprint, jsonify, make_response, request
from controllers.historialControl import HistorialControl
from flask_expects_json import expects_json
from controllers.utils.errors import Errors
api_historial = Blueprint("api_historial", __name__)

historialC = HistorialControl()

# Declaración de esquema para validación de datos de historial
schema_historial = {
    "type": "object",
    "properties": {
        "dato": {"type": "number"},
        "fecha": {"type": "string", "format": "date"},
        "hora": {"type": "string", "format": "time"},
        "estado": {"type": "boolean"}
    },
    "required": ["dato", "fecha", "hora", "estado"]
}

# API para listar historiales
@api_historial.route("/historial")
def listar():
    return make_response(
        jsonify(
            {
                "msg": "OK",
                "code": 200,
                "datos": ([i.serialize for i in historialC.listar()]),
            }
        ),
        200,
    )

# API para guardar historial
@api_historial.route("/historial/guardar", methods=["POST"])
@expects_json(schema_historial)
def guardar_historial():
    data = request.json
    id = historialC.guardar(data)

    if id >= 0:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "data": {"tag": "Historial guardado"}}),
            200,
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "ERROR",
                    "code": 400,
                    "data": {"tag": "No se pudo guardar historial"},
                }
            ),
            400,
        )

# API para mostrar historial por external_id
@api_historial.route("/historial/<external_id>", methods=["GET"])
def listar_external_id(external_id):
    historial = historialC.obtener_historial_external_id(external_id)

    if historial:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "datos": historial.serialize}), 200
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "Error",
                    "code": 404,
                    "datos": {"error": "Historial no encontrado"},
                }
            ),
            404,
        )

# API para modificar historial
@api_historial.route("/historial/modificar/<external>", methods=["POST"])
@expects_json(schema_historial)
def modificar(external):
    data = request.json
    historial = historialC.modificar_historial(data, external)

    if historial:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "data": {"tag": "Datos modificados"}}),
            200,
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "ERROR",
                    "code": 400,
                    "datos": {"error": Errors.error[str(historial)]},
                }
            ),
            400,
        )
