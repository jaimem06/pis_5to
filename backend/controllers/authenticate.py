from flask import request, jsonify, make_response, current_app
from flask_sqlalchemy import SQLAlchemy
from controllers.utils.errors import Errors
import uuid # for public id
import jwt
from datetime import datetime, timedelta
from functools import wraps
from models.cuenta import Cuenta

def token_required(f):
    @wraps(f)
    # Es un componente para validar el token
    def decored(*args, **kwargs):
        token = None
        if 'X-Access-Tokens' in request.headers:
            token = request.headers['X-Access-Tokens']
        if not token:
            return make_response(
                jsonify({"msg": "ERROR", "code": 401, "datos":{"error":Errors.error["-8"]}}),
                401
            )
        try:
            data = jwt.decode(token, algorithms="HS512", key=current_app.config['SECRET_KEY'])
            user = Cuenta.query.filter_by(external_id = data['external']).first()
            if not user:
                return make_response(
                    jsonify({"msg": "ERROR", "code": 401, "datos":{"error":Errors.error["-9"]}}),
                    401
                )
        except:
            return make_response(
                    jsonify({"msg": "ERROR", "code": 401, "datos":{"error":Errors.error["-9"]}}),
                    401
            )
        return f(*args, **kwargs)
    return decored