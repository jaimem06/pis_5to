import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  lat: number;
  lng: number;
  zoom: number;
  onMapClick?: (lat: number, lng: number) => void;
}

// New component for handling map events
const MapEvents: React.FC<{ onMapClick?: (lat: number, lng: number) => void }> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (onMapClick) {
        onMapClick(lat, lng);
      }
    },
  });

  return null; // This component does not render anything itself
};

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, zoom, onMapClick }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />  
      <Marker position={[lat, lng]}>
        <Popup>
          Un marcador en la posición seleccionada.
        </Popup>
      </Marker>
      {/* Render the MapEvents component inside MapContainer */}
      <MapEvents onMapClick={onMapClick} />
    </MapContainer>
  );
};

export default MapComponent;