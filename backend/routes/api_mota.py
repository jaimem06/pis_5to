from flask import Blueprint, jsonify, make_response, request
from controllers.motaControl import MotaControl
from controllers.utils.errors import Errors
from flask_expects_json import expects_json

api_mota = Blueprint("api_mota", __name__)

motaC = MotaControl()
# declaracion de esquema para validacion de datos mota
schema_mota = {
    "type": "object",
    "properties": {
        "tipo": {'type': 'string'},
        'latitud': {'type': 'number'},
        'longitud': {'type': 'number'},    
        'ip_sensor': {'type': 'string'}
        ,'estado': {'type': 'boolean'}
    },
    "required": ["tipo", "latitud", "longitud", "ip_sensor", "estado"],

}


# api para mota
@api_mota.route("/mota")
def listar():
    return make_response(
        jsonify({"msg": "OK","code": 200,"datos": ([i.serialize for i in motaC.listar()]),}),
        200,
    )

@api_mota.route("/mota/activos")
def listarEstado(estado=True):
    return make_response(
        jsonify(
            {"msg": "OK","code": 200,"datos": ([i.serialize for i in motaC.listar_por_estado(estado)]),}),
        200,
    )

@api_mota.route("/mota/inactivos")
def listarInactivo(estado=False):
    return make_response(
        jsonify(
            {"msg": "OK","code": 200,"datos": ([i.serialize for i in motaC.listar_por_estado(estado)]),}),
        200,
    )


# api para guardar mota
@api_mota.route("/mota/guardar", methods=["POST"])
@expects_json(schema_mota)
def guardar():
    # data en json
    data = request.json
    id = motaC.guardar(data)
    if id >= 0:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "data": {"tag": "Mota guardada"}}),
            200,
        )
    else:
        return make_response(
            jsonify({"msg": "Error","code": 400,"data": {"tag": "No se pudo guardar mota"}}),
            400,
        )


# API para buscar mota por external_id
@api_mota.route("/mota/<external_id>", methods=["GET"])
def listar_external_id(external_id):
    mota = motaC.obtener_mota_external_id(external_id)

    if mota:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "datos": mota.serialize}), 200
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "Error",
                    "code": 404,
                    "datos": {"error": "mota no encontrada"},
                }
            ),
            404,
        )


# api para modificar mota
@api_mota.route("/mota/modificar/<external>", methods=["POST"])
@expects_json(schema_mota)
# modificar mota
def modificar(external):

    data = request.json
    mota = motaC.modificar(data, external)

    if mota:
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
                    "datos": {"error": Errors.error[str(mota)]},
                }
            ),
            400,
        )
