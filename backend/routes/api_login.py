from flask import Blueprint, jsonify, make_response, request
from controllers.loginControl import LoginControl
from flask_expects_json import expects_json
from controllers.utils.errors import Errors
from flask_expects_json import expects_json

api_login = Blueprint("api_login", __name__)

loginC = LoginControl()

schema_sesion = {
    "type": "object",
    'properties': {
        "correo": {"type": "string"},
        "clave": {"type": "string"},
    },
    'required': ["correo", "clave"]
}

# API para iniciar sesion
@api_login.route("/login", methods=['POST'])
@expects_json(schema_sesion)
def session():
    data = request.json
    id = loginC.inicio_sesion(data)
    print("el id es: "+ str(id))

    if type(id) == int:
        return make_response(
            jsonify({"msg" : "ERROR", "code" : 400, "datos" :{"error" : Errors.error.get(str(id))}}), 
            400
        )
    else:
        return make_response(
            jsonify({"msg": "OK", "code": 200, "datos": id}),
            200
        )