# Tabla intermedia entre persona y mota
from app import db

# Tabla de asociación
personas_motas = db.Table('personas_motas',
    db.Column('persona_id', db.Integer, db.ForeignKey('persona.id'), primary_key=True),
    db.Column('mota_id', db.Integer, db.ForeignKey('mota.id'), primary_key=True)
)