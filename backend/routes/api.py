from flask import Blueprint, jsonify, make_response, request
from models import mota
from models import tipoMota

# Aqui importacion de los modelos de las tablas

api = Blueprint('api', __name__)
@api.route("/")
def home ():
    return make_response(
        jsonify({"msg": "OK", "code": 200}),
        200
    )
