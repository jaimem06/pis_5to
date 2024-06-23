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
        "nombre": {
            "type": "string",
            "pattern": "^[a-zA-Z ]+$",
        },
        "apellido": {
            "type": "string",
            "pattern": "^[a-zA-Z ]+$",
        },
        "correo": {
            "type": "string",
            "pattern": r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
        },
        "clave": {
            "type": "string",
            "pattern": r"^(?=.*[0-9])(?=.*[!@#~=+?$%^&*])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d!@#~=+?$%^&*]{8,20}$",
            "minLength": 8,
            "maxLength": 20,
        },
    },
    "required": ["nombre", "apellido", "correo", "clave"],
}

schema_modificar = {
    "type": "object",
    "properties": {
        "nombre": {
            "type": "string",
            "pattern": "^[a-zA-Z ]+$",
        },
        "apellido": {
            "type": "string",
            "pattern": "^[a-zA-Z ]+$",
        },
        "correo": {
            "type": "string",
            "pattern": r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
        },
    },
    "required": ["nombre", "apellido", "correo"],
}


# declaracion de esquema para validacion de credenciales
schema_credenciales = {
    "type": "object",
    "properties": {
        "correo": {
            "type": "string",
            "pattern": r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
        },
        "nuevo_correo": {
            "type": "string",
            "pattern": r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$",
        },
        "clave": {
            "type": "string",
            "pattern": r"^(?=.*[0-9])(?=.*[!@#~=+?$%^&*])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d!@#~=+?$%^&*]{8,20}$",
            "minLength": 8,
            "maxLength": 20,
        },
        "nueva_clave": {
            "type": "string",
            "pattern": r"^(?=.*[0-9])(?=.*[!@#~=+?$%^&*])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d!@#~=+?$%^&*]{8,20}$",
            "minLength": 8,
            "maxLength": 20,
        },
        "confirmar_clave": {
            "type": "string",
            "pattern": r"^(?=.*[0-9])(?=.*[!@#~=+?$%^&*])(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d!@#~=+?$%^&*]{8,20}$",
            "minLength": 8,
            "maxLength": 20,
        },
    },
    
    "required": ["correo", "clave", "nueva_clave", "nuevo_correo", "confirmar_clave"]
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
                    "datos": {"error": "No se puede guardar persona, "+str(Errors.error[str(id)])},
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
@expects_json(schema_modificar)
# modificar persona
def modificar(external):

    data = request.json
    persona = personaC.modificar_persona(data, external)

    if persona >=0:
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

# api para modificar credenciales
@api_persona.route("/persona/modificar-credenciales/<external>", methods=["POST"])
@expects_json(schema_credenciales)
def modificar_credenciales(external):
    data = request.json
    persona = personaC.modificar_credenciales(data, external)

    if persona >=0:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "data": {"tag": "Credenciales modificadas"}}),
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
@api_persona.route("/persona/actualizar-estado/<external>", methods=["GET"])
def actualizar_estado(external):
    persona, estado = personaC.actualizar_estado(external)

    if persona >=0:
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
