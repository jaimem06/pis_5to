from app import db
import uuid
from models.tipoMota import TipoMota
from models.personas_motas import personas_motas

class Mota(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.VARCHAR(60), default=str(uuid.uuid4()))
    tipo = db.Column(db.Enum(TipoMota),nullable=False)
    latitud = db.Column(db.Float)
    longitud = db.Column(db.Float)
    ip_sensor = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
    estado = db.Column(db.Boolean, default=True)
    # Relación muchos a uno con Historial
    historial = db.relationship('Historial')
    # Muchos a muchos con Persona
    persona = db.relationship('Persona', secondary=personas_motas, back_populates='mota')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'external_id': self.external_id,
            'tipo': self.tipo.serialize if self.tipo else None,
            'latitud': self.latitud,
            'longitud': self.longitud,
            'ip_sensor': self.ip_sensor,
            'estado': self.estado
        }
    
    def get_id(self):
        return self.id
    
    def copy(self):
        return Mota(
            external_id=self.external_id,
            tipo=self.tipo,
            latitud=self.latitud,
            longitud=self.longitud,
            ip_sensor=self.ip_sensor,
            estado=self.estado
        )

   