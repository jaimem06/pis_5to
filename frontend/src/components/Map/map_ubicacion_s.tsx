"use client";
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
    zoom: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ zoom }) => {
    const defaultPosition: [number, number] = [-4.0307289470706875, -79.19963225249968];

    return (
        <MapContainer center={defaultPosition} zoom={zoom} style={{ height: '475px', width: '100%', borderRadius: "20px", border: "4px solid #020d1a" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
};

export default MapComponent;