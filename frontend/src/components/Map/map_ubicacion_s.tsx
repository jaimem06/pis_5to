import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { get_ubicacion_motas } from '@/hooks/Service_mota';
import Cookies from 'js-cookie';
import aguaMarker from '/public/images/map_icons/agua_marker.png';
import aireMarker from '/public/images/map_icons/aire_marker.png';

interface MapComponentProps {
    zoom: number;
}
interface Sensor {
    lat: number;
    lng: number;
    name: string;
}

const aguaIcon = new L.Icon({
    iconUrl: aguaMarker.src,
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const aireIcon = new L.Icon({
    iconUrl: aireMarker.src,
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapComponent: React.FC<MapComponentProps> = ({ zoom }) => {
    const defaultPosition: [number, number] = [-4.030728947070, -79.19963225];
    const [sensors, setSensors] = useState<Sensor[]>([]);

    useEffect(() => {
        const fetchSensors = async () => {
            const token = Cookies.get('token');
            if (token) {
                const response = await get_ubicacion_motas(token);
                if (response.code === 200 && Array.isArray(response.datos)) {
                    const formattedSensors = response.datos.map(sensor => ({
                        lat: sensor.latitud,
                        lng: sensor.longitud,
                        name: sensor.tipo
                    }));
                    setSensors(formattedSensors);
                }
            }
        };

        fetchSensors();
    }, []);

    return (
        <MapContainer center={defaultPosition} zoom={zoom} style={{ height: '475px', width: '100%', borderRadius: "20px", border: "4px solid #020d1a" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {sensors.map((sensor, index) => (
                <Marker
                    key={index}
                    position={[sensor.lat, sensor.lng]}
                    icon={sensor.name === 'AGUA' ? aguaIcon : aireIcon}
                >
                    <Popup>{sensor.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;