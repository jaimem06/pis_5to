from app import db
import uuid
from datetime import datetime
from models.cuenta import Cuenta
from models.personas_motas import personas_motas
import copy

class Persona(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.VARCHAR(60), default=str(uuid.uuid4()))
    nombre = db.Column(db.String(100))
    apellido = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    # Relación uno a uno con cuenta
    #uselist = False sirve para especificar que una persona solo se relaciona con un objeto cuenta
    cuenta = db.relationship("Cuenta", backref="persona", uselist=False)
    mota = db.relationship('Mota', secondary=personas_motas, back_populates='persona', lazy=True)
    @property
    def serialize(self):
        return {
            "external_id": self.external_id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "cuenta": self.cuenta.serialize if self.cuenta else "No tiene cuenta",
        }

    def copy(self):
        nueva_persona = copy.deepcopy(self)
        return nueva_persona
