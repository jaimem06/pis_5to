from app import db
from datetime import datetime

class Historial(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    external_id = db.Column(db.VARCHAR(60))
    dato = db.Column(db.Float)
    fecha = db.Column(db.Date)
    hora = db.Column(db.Time)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    estado = db.Column(db.Boolean)
    # Relación uno a muchos con Mota
    mota_id = db.Column(db.Integer, db.ForeignKey('mota.id'))
    motas = db.relationship('Mota', back_populates='historial')

    @property
    def serialize(self):
        return {
            'id': self.id,
            'external_id': self.external_id,
            'dato': self.dato,
            'fecha': self.fecha,
            'hora': self.hora,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'estado': self.estado
        }
