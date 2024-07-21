from models.monitoreo import Monitoreo
from models.mota import Mota
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError
import pandas as pd
import numpy as np
import uuid
from statsmodels.tsa.arima.model import ARIMA
from app import db
class MonitoreoControl:

    # Método para listar monitoreos
    def listar(self):
        monitoreos = db.session.query(Monitoreo, Mota.tipo).join(Mota, Monitoreo.mota_id == Mota.id).all()
        resultado = {
            "Agua": [],
            "Aire": []
        }
        for monitoreo, tipo in monitoreos:
            dato_con_fecha_hora = {
                "dato": monitoreo.dato,
                "fecha": monitoreo.fecha.strftime('%Y-%m-%d'),
                "hora": monitoreo.hora.strftime('%H:%M:%S')
            }
            if tipo == tipo.AGUA:
                resultado["Agua"].append(dato_con_fecha_hora)
            elif tipo == tipo.AIRE:
                resultado["Aire"].append(dato_con_fecha_hora)
        return resultado

    # Método para guardar monitoreo
    def guardar_monitoreo(self, data):
            try:
                # Verificar si ya existe un monitoreo con la misma fecha, hora y dato
                existe_monitoreo = Monitoreo.query.filter_by(
                    fecha=datetime.now().date(),
                    hora=datetime.now().time(),
                    dato=data['dato']
                ).first()
    
                # Si ya existe un monitoreo, no guardar uno nuevo
                if existe_monitoreo:
                    print("Ya existe un monitoreo con la misma fecha, hora y dato.")
                    return None
    
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
            except SQLAlchemyError as e:
                print(f"Error al guardar el monitoreo: {e}")
                db.session.rollback()
                return None

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
        
    # Método para obtener los enlaces
    def obtener_enlaces(self):
        motas_activas = Mota.query.filter_by(estado=True).all()
        return [mota.enlace for mota in motas_activas if mota.enlace]