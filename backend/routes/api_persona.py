from flask import Blueprint, jsonify, make_response, request
from controllers.personaControl import PersonaControl
from controllers.utils.errors import Errors
from flask_expects_json import expects_json

api_persona = Blueprint("api_persona", __name__)

personaC = PersonaControl()
# declaracion de esquema para validacion de datos Persona
schema_persona = {
    "type": "object",
    "properties": {
        "nombre": {"type": "string", "pattern": "^[a-zA-Z ]+$"},
        "apellido": {"type": "string", "pattern": "^[a-zA-Z ]+$"},
        "correo": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
            "errorMessage": "Correo invalido debe tener formato: ejemplo@gmail.com",
        },
        "clave": {
            "type": "string",
            "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
            "errorMessage": "La clave debe tener al menos 8 caracteres, una letra mayuscula, una letra minuscula, un numero y un caracter especial",
        },
    },
    "required": ["nombre", "apellido", "correo", "clave"],
    "errorMessage": {
        "required": {
            "nombre": "El nombre es obligatorio.",
            "apellido": "El apellido es obligatorio.",
            "correo": "El correo es obligatorio.",
            "clave": "La clave es obligatoria.",
        }
    },
}


# api para persona
@api_persona.route("/persona")
def listar():
    return make_response(
        jsonify(
            {
                "msg": "OK",
                "code": 200,
                "datos": ([i.serialize for i in personaC.listar()]),
            }
        ),
        200,
    )


# api para guardar persona
@api_persona.route("/persona/guardar", methods=["POST"])
@expects_json(schema_persona)
# guardar persona
def guardar_persona():
    # data en json
    data = request.json
    id = personaC.guardar(data)

    if id >= 0:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "data": {"tag": "Persona guardada"}}),
            200,
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "ERROR",
                    "code": 400,
                    "data": {"tag": "No se pudo guardar persona"},
                }
            ),
            400,
        )


# API para mostrar persona por external_id
@api_persona.route("/persona/<external_id>", methods=["GET"])
def listar_external_id(external_id):
    persona = personaC.obtener_persona_external_id(external_id)

    if persona:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "datos": persona.serialize}), 200
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "Error",
                    "code": 404,
                    "datos": {"error": "Persona no encontrada"},
                }
            ),
            404,
        )


# api para modificar PERSONA
@api_persona.route("/persona/modificar/<external>", methods=["POST"])
@expects_json(schema_persona)
# modificar persona
def modificar(external):

    data = request.json
    persona = personaC.modificar_persona(data, external)

    if persona:
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
                    "datos": {"error": Errors.error[str(persona)]},
                }
            ),
            400,
        )


# api para actualizar estado de cuenta persona
@api_persona.route("/persona/actualizar-estado/<external>", methods=["POST"])
def actualizar_estado(external):
    persona, estado = personaC.actualizar_estado(external)

    if persona:
        return make_response(
            jsonify(
                {"msg": "OK", "code": 200, "data": {"tag": "Cuenta " + str(estado)}}
            ),
            200,
        )
    else:
        return make_response(
            jsonify(
                {
                    "msg": "ERROR",
                    "code": 400,
                    "datos": {"error": Errors.error[str(persona)]},
                }
            ),
            400,
        )
