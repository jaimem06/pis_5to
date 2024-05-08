from models.persona import Persona
from models.cuenta import Cuenta
from app import db
import uuid


class PersonaControl:

    # Metodo para listar personas
    def listar(self):
        return Persona.query.all()
    
    # Metodo para guardar persona
    def guardar(self, data):
        persona = Persona()
        persona.apellido = data['apellido']
        persona.nombre = data['nombre']
        persona.external_id = uuid.uuid4()

        db.session.add(persona)
        db.session.commit()
        return persona.id


    # Metodo para obtener una persona por external_id
    def obtener_persona_external_id(self, external):
        return Persona.query.filter_by(external_id=external).first()
    
    # Metodo para modificar_persona una persona por external_id
    def modificar_persona(self, data, external):
        # 1. Obtener Persona
        persona = Persona.query.filter_by(external_id=external).first()

       # 2. Validar existe persona
        if persona:
            # 3. Actualizar atributos de persona
            persona.nombre = data['nombre']
            persona.apellido = data['apellido']
            persona.external_id = uuid.uuid4()
            # 4. Update
            db.session.merge(persona)
            db.session.commit()

            return persona.id
        else:
            return -1
