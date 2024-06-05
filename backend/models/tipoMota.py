from enum import Enum

class TipoMota(Enum):
    AIRE = 'Aire'
    AGUA = 'Agua'
    
    @property
    def serialize(self):
        return self.name