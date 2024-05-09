from models.mota import Mota
from app import db
import uuid


class MotaControl:

    # Metodo para listar personas
    def listar(self):
        return Mota.query.all()
    
    def listar_por_tipo(self,tipo):
        return Mota.query.filter_by(tipo=tipo).all()
    
    def listar_por_estado(self,estado):
        return Mota.query.filter_by(estado=estado).all()
    

    
    

    
    
    
    # Metodo para guardar persona
    def guardar(self, data):
        mota = Mota()
        mota.external_id = str(uuid.uuid4())
        mota.tipo = data['tipo']
        mota.latitud = data['latitud']
        mota.longitud = data['longitud']
        mota.ip_sensor = data['ip_sensor']
        mota.estado = data['estado']
        db.session.add(mota)
        db.session.commit()
        return mota.id
   

    def modificar(self,data,external):
        mota = self.obtener_mota_external_id(external)
        if mota:
            mota.tipo = data['tipo']	
            mota.latitud = data['latitud']
            mota.longitud = data['longitud']
            mota.ip_sensor = data['ip_sensor']
            mota.estado = data['estado']
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



                
        