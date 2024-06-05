from models.persona import Persona
from models.cuenta import Cuenta
from controllers.utils.errors import Errors
from app import db
import jwt
from datetime import datetime, timedelta, timezone
from flask import current_app

class LoginControl:
    
    def inicio_sesion(self, data):
        cuentaA = Cuenta.query.filter_by(correo = data.get('correo')).first()
        if cuentaA:
            # TODO encriptar
            if cuentaA.clave == data["clave"]:
                token = jwt.encode(
                    {
                        "external": cuentaA.external_id,
                        "expiracion": (datetime.now(timezone.utc) + timedelta(minutes=60)).isoformat()
                    }, 
                    key = current_app.config["SECRET_KEY"],
                    algorithm="HS512"
                )
                cuenta = Cuenta()
                cuenta.copy_data(cuentaA)
                persona = cuentaA.getPersona(cuentaA.id_persona)
                info = {
                    "token": token,
                    "user": persona.apellido + " " + persona.nombre
                }
                return info
            else:
                return -10
        else:
            return -10