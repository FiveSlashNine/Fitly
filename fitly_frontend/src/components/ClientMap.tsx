// src/components/ClientMap.tsx
"use client"; 

import React, { useEffect, useState } from 'react'; // Import useState
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const DefaultIcon = L.icon({
  iconUrl: '/marker-icon.png', 
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/marker-shadow.png',
  shadowSize: [41, 41]
});


if (typeof window !== 'undefined') { 
  L.Marker.prototype.options.icon = DefaultIcon;
}


//ΤΥΠΟΣ ΓΙΑ ΤΙΣ ΠΟΛΕΙΣ
interface City {
  name: string;
  position: [number, number];
}


interface ClientMapProps {
  cities: City[];
  onCitySelect: (cityName: string) => void;
}

const ClientMap: React.FC<ClientMapProps> = ({ cities, onCitySelect }) => {
  const [isMounted, setIsMounted] = useState(false);

 
  useEffect(() => {
    setIsMounted(true);
    
  }, []); 

  //ΣΥΝΤΕΤΑΓΜΕΝΕΣ ΓΙΑ ΚΕΝΤΡΑΡΙΣΜΑ ΣΤΗΝ ΕΛΛΑΔΑ
  const defaultCenter: [number, number] = [39.0742, 23.6833];
  const defaultZoom = 6;

  if (!isMounted) {
    return null; 
  }

  return (
    <MapContainer
      center={defaultCenter}
      zoom={defaultZoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <Marker
          key={city.name}
          position={city.position}
          eventHandlers={{
            click: () => onCitySelect(city.name),
          }}
        >
          <Popup>
            <span className="font-medium">{city.name}</span>
            <br />
            <button
              className="mt-2 text-sm text-emerald-700 hover:text-emerald-800"
              onClick={() => onCitySelect(city.name)}
            >
              Επιλογή
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ClientMap;