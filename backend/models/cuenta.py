from app import db
import uuid
from datetime import datetime

class Cuenta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    correo = db.Column(db.String(100), unique=True)
    clave = db.Column(db.String(250))
    estado = db.Column(db.Boolean, default=True)
    external_id = db.Column(db.VARCHAR(60), default=str(uuid.uuid4()))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    id_persona = db.Column(
        db.Integer, db.ForeignKey("persona.id"), nullable=False, unique=True
    )

    def getPersona(self, id_p):
        from models.persona import Persona
        return Persona.query.filter_by(id = id_p).first()

    def copy_data(self, cuenta):
        self.correo = cuenta.correo
        self.clave = cuenta.clave
        self.estado = cuenta.estado
        self.external_id = str(uuid.uuid4())
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.id_persona = cuenta.id_persona
        return self

    @property
    def serialize(self):
        return {
            "correo": self.correo,
            "clave": self.clave,
            "estado": self.estado,
            "external_id": self.external_id,
        }
