import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix marker icon
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


export default function MapView() {
  const [issPosition, setIssPosition] = useState<[number, number]>([0, 0]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchISS(); // initial fetch
    const interval = setInterval(fetchISS, 15000); 
    return () => clearInterval(interval);
  }, []);

  const fetchISS = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/iss');
      const data = await res.json();
      console.log("Manual refresh:", data); // Optional
      setIssPosition([data.latitude, data.longitude]);
      setLastUpdated(new Date(data.lastUpdated));
    } catch (error) {
      console.error('Error fetching ISS location:', error);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <MapContainer
        center={issPosition}
        zoom={3}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={issPosition} icon={defaultIcon}>
          <Popup>ISS is here!</Popup>
        </Marker>
      </MapContainer>
  
    

<div
  style={{
    position: 'absolute',
    bottom: 10,
    left: 10,
    background: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    zIndex: 1000, 
  }}
>
  {lastUpdated && (
    <p style={{ margin: 0 }}>Last updated: {lastUpdated.toLocaleTimeString()}</p>
  )}
  <button onClick={fetchISS} style={{ marginTop: '4px' }}>
    Refresh
  </button>
</div>

    </div>
  );
}  