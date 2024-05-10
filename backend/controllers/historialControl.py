from app import db
from models.historial import Historial
from datetime import datetime
import uuid

class HistorialControl:

    # Método para listar historiales
    def listar(self):
        return Historial.query.all()

    # Método para guardar historial
    def guardar(self, data):
        historial = Historial()
        historial.external_id = str(uuid.uuid4())
        historial.dato = data['dato']
        historial.fecha = data['fecha']
        historial.hora = data['hora']
        historial.estado = data['estado']

        db.session.add(historial)
        db.session.commit()
        return historial.id

    # Método para obtener un historial por external_id
    def obtener_historial_external_id(self, external):
        return Historial.query.filter_by(external_id=external).first()

    # Método para modificar un historial por external_id
    def modificar_historial(self, data, external):
        historial = Historial.query.filter_by(external_id=external).first()

        if historial:
            historial.dato = data['dato']
            historial.fecha = data['fecha']
            historial.hora = data['hora']
            historial.estado = data['estado']

            db.session.merge(historial)
            db.session.commit()

            return historial.id
        else:
            return -1
