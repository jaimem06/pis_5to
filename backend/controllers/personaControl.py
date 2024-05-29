from models.persona import Persona
from models.cuenta import Cuenta
from app import db
import uuid
import hashlib


class PersonaControl:

    # Metodo para listar personas
    def listar(self):
        return Persona.query.all()

    # Metodo para guardar persona
    def guardar(self, data):
        c = Cuenta.query.filter_by(correo=data["correo"]).first()
        if c:
            return -1
        else:
            persona = Persona()
            persona.apellido = data["apellido"]
            persona.nombre = data["nombre"]
            persona.external_id = uuid.uuid4()
            db.session.add(persona)
            db.session.commit()
            cuenta = Cuenta()
            cuenta.correo = data["correo"]
            cuenta.clave = hashlib.sha256(data["clave"].encode()).hexdigest()
            cuenta.external_id = uuid.uuid4()
            db.session.add(cuenta)
            db.session.commit()
            return cuenta.id

    # Metodo para obtener una persona por external_id
    def obtener_persona_external_id(self, external):
        return Persona.query.filter_by(external_id=external).first()

    # Metodo para modificar_persona una persona por external_id
    def modificar_persona(self, data, external):
        # 1. Obtener Persona y Cuenta
        persona = Persona.query.filter_by(external_id=external).first()
        c = Cuenta.query.filter_by(correo=data["correo"]).first()

        # 2. Validar si existe persona y cuenta
        if persona and c:
            # 3. Actualizar atributos de persona y cuenta
            persona.nombre = data["nombre"]
            persona.apellido = data["apellido"]
            persona.external_id = uuid.uuid4()
            # 4. Actualizar en la base de datos
            db.session.merge(persona)
            db.session.commit()

            c.external_id = uuid.uuid4()
            c.correo = data["correo"]
            c.clave = hashlib.sha256(data["clave"].encode()).hexdigest()
            c.id_persona = persona.id

            db.session.merge(c)
            db.session.commit()

            # 5. Retornar id de persona
            return persona.id
        else:
            return -1

    # Metodo para actualizar estado de cuenta de persona
    def actualizar_estado(self, external):
        persona = Persona.query.filter_by(external_id=external).first()
        if persona:
            c = Cuenta.query.filter_by(id_persona=persona.id).first()
            if c:
                if c.estado == True:
                    c.estado = False
                    estado = "DESACTIVADA"
                else:
                    c.estado = True
                    estado = "ACTIVADA"
                db.session.merge(c)
                db.session.commit()
                return c.id, estado
            else:
                return -2, None
        else:
            return -1, None
