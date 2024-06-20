from app import db
from models.monitoreo import Monitoreo
from models.mota import Mota
from datetime import datetime
import pandas as pd
import numpy as np
import uuid

class MonitoreoControl:

    # Método para listar monitoreo
    def listar(self):
        return Monitoreo.query.all()
    
    # Método para guardar monitoreo
    def guardar_monitoreo(self, data):
        monitoreo = Monitoreo()
        monitoreo.external_id = str(uuid.uuid4())
        monitoreo.dato = data['dato']
        monitoreo.fecha = datetime.now().date()  
        monitoreo.hora = datetime.now().time()  
        monitoreo.estado = data['estado']
        if data['sensor'] == "Agua":
            monitoreo.mota_id = 1
        elif data['sensor'] == "Aire":
            monitoreo.mota_id = 2
        
        db.session.add(monitoreo)
        db.session.commit()
        return monitoreo.id

    # Método para obtener un monitoreo por external_id
    def obtener_monitoreo_external_id(self, external):
        return Monitoreo.query.filter_by(external_id=external).first()

    # Método para modificar un monitoreo por external_id
    def modificar_monitoreo(self, data, external):
        monitoreo = Monitoreo.query.filter_by(external_id=external).first()

        if monitoreo:
            monitoreo.dato = data['dato']
            monitoreo.fecha = datetime.now().date()  
            monitoreo.hora = datetime.now().time()  
            monitoreo.estado = data['estado']

            db.session.merge(monitoreo)
            db.session.commit()

            return monitoreo.id
        else:
            return -1
        
    def obtener_datos_historicos_agua(self):
        mota_agua = Mota.query.filter_by(tipo='Agua').first()
        if mota_agua:
            monitoreos_agua = Monitoreo.query.filter_by(mota_id=mota_agua.id).order_by(Monitoreo.fecha).all()
            return monitoreos_agua
        else:
            return []  # Devolver una lista vacía si no se encuentra ninguna Mota de Agua

    def obtener_datos_historicos_aire(self):
        mota_aire = Mota.query.filter_by(tipo='Aire').first()
        if mota_aire:
            monitoreos_aire = Monitoreo.query.filter_by(mota_id=mota_aire.id).order_by(Monitoreo.fecha).all()
            return monitoreos_aire
        else:
            return []  # Devolver una lista vacía si no se encuentra ninguna Mota de Aire

    def preparar_datos_para_proyeccion(self, monitoreos):
        timestamps = [monitoreo.fecha for monitoreo in monitoreos]
        datos = [monitoreo.dato for monitoreo in monitoreos]

        df = pd.DataFrame({'Fecha': timestamps, 'Dato': datos})
        df['Fecha'] = pd.to_datetime(df['Fecha'])
        df.set_index('Fecha', inplace=True)

        return df

    def arima(self, df):
        # Implementación simplificada de ARIMA(1,1,1) 
        def difference(dataset, interval=1):
            diff = []
            for i in range(interval, len(dataset)):
                value = dataset[i] - dataset[i - interval]
                diff.append(value)
            return np.array(diff)

        def inverse_difference(history, yhat, interval=1):
            return yhat + history[-interval]

        def forecast_arima(history, arima_order):
            p, d, q = arima_order
            differenced = difference(history, d)
            model = ARIMAModel(differenced, order=(p, q))
            model.fit()
            yhat = model.predict()
            return inverse_difference(history, yhat, d)

        class ARIMAModel:
            def __init__(self, data, order):
                self.data = data
                self.p, self.q = order
                self.ar_params = np.random.rand(self.p)
                self.ma_params = np.random.rand(self.q)
                self.residuals = np.zeros(len(data))

            def fit(self):
                # Método de ajuste simplificado
                pass

            def predict(self):
                # Método de predicción simplificado
                return self.data[-1]  

        # Ajustar y proyectar
        history = list(df['Dato'])
        arima_order = (1, 1, 1)  # (p,d,q)
        projections = []
        for _ in range(730):  # Proyectar 730 días (2 años)
            yhat = forecast_arima(history, arima_order)
            projections.append(yhat)
            history.append(yhat)
        return np.array(projections, dtype=np.float64)
