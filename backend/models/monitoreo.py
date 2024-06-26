from app import db
from datetime import datetime

class Monitoreo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.VARCHAR(60))
    dato = db.Column(db.Float)
    fecha = db.Column(db.Date)
    hora = db.Column(db.Time)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    estado = db.Column(db.Boolean)
    mota_id = db.Column(db.Integer, db.ForeignKey('mota.id'))

    @property
    def serialize(self):
        return {
            'id': self.id,
            'external_id': self.external_id,
            'dato': self.dato,
            'fecha': self.fecha.isoformat(),
            'hora': self.hora.strftime('%H:%M:%S'),
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'estado': self.estado
        }