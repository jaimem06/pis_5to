from models.mota import Mota
from models.tipoMota import TipoMota
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
    
    def listar_tipos(self):
        return [e.value for e in TipoMota]
    
    
    def listar_por_estado(self,estado):
        return Mota.query.filter_by(estado=estado).all()
    
    # Metodo para guardar mota
    def guardar(self, data):
        ip_existente = Mota.query.filter_by(ip_sensor=data.get('ip_sensor')).first()
        if ip_existente:
            return -3  
        mota = Mota()
        mota.external_id = uuid.uuid4()
        mota.tipo = data.get('tipo')
        mota.latitud = data.get('latitud')
        mota.longitud = data.get('longitud')
        mota.ip_sensor = data.get('ip_sensor')
        mota.estado = data.get('estado')
        validacion_ip = self.validar_ip(mota.ip_sensor)
        if validacion_ip != True:
            return validacion_ip
        db.session.add(mota)
        db.session.commit()
        return mota.id
    
    def validar_ip(self, ip):
        mota = Mota.query.filter_by(ip_sensor = ip).first()
        if mota:
            return -3 
        try:
            separar_ip = ip.split('.')
            if len(separar_ip) != 4:  
                return -4
            for i in separar_ip:
                if int(i) < 0 or int(i) > 255:
                    return -4  
            return True  
        except Exception :
            return Errors[-4]  # Si ocurre una excepción, retorna False


    def modificar(self, data, external):
        mota = self.obtener_mota_external_id(external)
        if mota:
            nueva_ip = data.get('ip_sensor')
            if nueva_ip and nueva_ip != mota.ip_sensor:
                # Verificar si la nueva IP ya existe en otra mota
                ip_existente = Mota.query.filter(Mota.ip_sensor == nueva_ip, Mota.external_id != external).first()
                if ip_existente:
                    return -15  # La nueva IP ya está asignada a otra mota
                validacion_ip = self.validar_ip(nueva_ip)
                if validacion_ip != True:
                    return validacion_ip
                mota.ip_sensor = nueva_ip
            mota.tipo = data.get('tipo', mota.tipo)
            mota.latitud = data.get('latitud', mota.latitud)
            mota.longitud = data.get('longitud', mota.longitud)
            mota.estado = data.get('estado', mota.estado)
            db.session.merge(mota)
            db.session.commit()
            return mota.id
        
    def desactivar(self,external):
        mota = Mota.query.filter_by(external_id=external).first()
        if mota:
            mota.estado = False
            db.session.merge(mota)
            db.session.commit()
            return mota
        else:
            return -6
        
    def activar(self,external):
        mota = Mota.query.filter_by(external_id=external).first()
        if mota:
            mota.estado = True
            db.session.merge(mota)
            db.session.commit()
            return mota
        else:
            return -7
        
    def obtener_mota_external_id(self, external):
        return Mota.query.filter_by(external_id=external).first()



                
        
