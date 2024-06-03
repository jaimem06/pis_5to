from models.mota import Mota
from controllers.utils.errors import Errors
from cryptography.fernet import Fernet
from app import db
import uuid


class MotaControl:
    clave = Fernet.generate_key()
    cifrador= Fernet(clave)

    # Metodo para listar motas
    def listar(self):
        return Mota.query.all()
    
    def listar_por_tipo(self,tipo):
        return Mota.query.filter_by(tipo=tipo).all()
    
    def listar_por_estado(self,estado):
        return Mota.query.filter_by(estado=estado).all()
    
    # Metodo para guardar mota
    def guardar(self, data):
        mota = Mota()
        mota.external_id = uuid.uuid4()
        mota.tipo = data.get('tipo')
        mota.latitud = data.get ('latitud')
        mota.longitud = data.get('longitud')
        mota.ip_sensor = data.get('ip_sensor')
        mota.estado = data.get('estado')
        validacion_ip = self.validar_ip(mota.ip_sensor)
        if validacion_ip != True:
            return validacion_ip
        mota.ip_sensor = self.cifrador.encrypt(mota.ip_sensor.encode())
        db.session.add(mota)
        db.session.commit()
        return mota.id
    
    def validar_ip(self, ip_sensor):
        mota = Mota.query.filter_by(ip_sensor=ip_sensor).first()
        if mota:
            return -3 
        try:
            separar_ip = ip_sensor.split('.')
            if len(separar_ip) != 4:  
                return -4
            for i in separar_ip:
                if int(i) < 0 or int(i) > 255:
                    return -4  
            return True  
        except Exception :
            return Errors[-4]  # Si ocurre una excepción, retorna False


    def modificar(self,data,external):
        mota = self.obtener_mota_external_id(external)
        if mota:
            mota.external_id = uuid.uuid4()
            mota.tipo = data.get('tipo')
            mota.latitud = data.get ('latitud')
            mota.longitud = data.get('longitud')
            mota.ip_sensor = data.get('ip_sensor')
            validacion_ip = self.validar_ip(mota.ip_sensor)
            if validacion_ip != True:
                return validacion_ip
            mota.ip_sensor = self.cifrador.encrypt(mota.ip_sensor.encode())
            mota.estado = data.get('estado')
            db.session.merge(mota)
            db.session.commit()
            return mota
        else:
            return -1
        
    def desactivar(self,external):
        mota = Mota.query.filter_by(external_id=external).first()
        if mota:
            mota.estado = False
            db.session.merge(mota)
            db.session.commit()
            return mota
        else:
            return -1
        
    def activar(self,external):
        mota = Mota.query.filter_by(external_id=external).first()
        if mota:
            mota.estado = True
            db.session.merge(mota)
            db.session.commit()
            return mota
        else:
            return -1
        
    def obtener_mota_external_id(self, external):
        return Mota.query.filter_by(external_id=external).first()



                
        
