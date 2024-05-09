from app import db
import uuid
from models.tipoMota import TipoMota

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

    @property
    def serialize(self):
        return {
            'id': self.id,
            'external_id': self.external_id,
            'tipo': self.tipo.serialize if self.tipo else None,
            'latitud': self.latitud,
            'longitud': self.longitud,
            'ip_sensor': self.ip_sensor,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'estado': self.estado
        }

   