from models.monitoreo import Monitoreo
from models.mota import Mota
from datetime import datetime
import pandas as pd
import numpy as np
import uuid
from statsmodels.tsa.arima.model import ARIMA
from app import db
class MonitoreoControl:

    # Método modificado para listar monitoreos de agua y aire basado en mota_id
    def listar(self):
        monitoreos = Monitoreo.query.all()
        datos_agua = [monitoreo.dato for monitoreo in monitoreos if monitoreo.mota_id == 1]
        datos_aire = [monitoreo.dato for monitoreo in monitoreos if monitoreo.mota_id == 2]

        resultado = {
            "agua": datos_agua if datos_agua else "No hay datos de monitoreo de agua.",
            "aire": datos_aire if datos_aire else "No hay datos de monitoreo de aire."
        }
        return resultado

    # Método para guardar monitoreo
    def guardar_monitoreo(self, data):
        monitoreo = Monitoreo(
            external_id=str(uuid.uuid4()),
            dato=data['dato'],
            fecha=datetime.now().date(),
            hora=datetime.now().time(),
            estado=data['estado'],
            mota_id=1 if data['sensor'] == "Agua" else 2
        )
        
        db.session.add(monitoreo)
        db.session.commit()
        return monitoreo.id

    # Método para obtener un monitoreo por external_id
    def obtener_monitoreo_external_id(self, external):
        return Monitoreo.query.filter_by(external_id=external).first()

    # Método para obtener datos históricos de agua
    def obtener_datos_historicos_agua(self):
        mota_agua = Mota.query.filter_by(tipo='Agua').first()
        if mota_agua:
            return Monitoreo.query.filter_by(mota_id=mota_agua.id).order_by(Monitoreo.fecha).all()
        else:
            return []

    # Método para obtener datos históricos de aire
    def obtener_datos_historicos_aire(self):
        mota_aire = Mota.query.filter_by(tipo='Aire').first()
        if mota_aire:
            return Monitoreo.query.filter_by(mota_id=mota_aire.id).order_by(Monitoreo.fecha).all()
        else:
            return []

    # Método para preparar datos para proyección
    def preparar_datos_para_proyeccion(self, monitoreos):
        if not monitoreos:
            return pd.DataFrame()  # Retorna un DataFrame vacío si no hay datos

        timestamps = [monitoreo.fecha for monitoreo in monitoreos]
        datos = [monitoreo.dato for monitoreo in monitoreos]

        df = pd.DataFrame({'Fecha': timestamps, 'Dato': datos})
        df['Fecha'] = pd.to_datetime(df['Fecha'])
        df.set_index('Fecha', inplace=True)

        return df

    # Método para calcular proyección usando ARIMA
    def arima(self, df, steps):
        if df.empty:
            print("El DataFrame está vacío.")
            return None

        try:
            model = ARIMA(df['Dato'], order=(1, 1, 1))
            model_fit = model.fit()
            forecast = model_fit.forecast(steps=steps)
            return forecast
        except Exception as e:
            print("Error al calcular la proyección ARIMA:", e)
            return None