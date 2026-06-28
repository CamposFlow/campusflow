import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import api from '@/api/axios.js';

export const RiskZoneMap = () => {
    const [riskZones, setRiskZones] = useState([]);

    // useEffect(() => {
    //     api.get('/api/incidents/risk-zones')
    //         .then((res) => setRiskZones(res.data.riskZones))
    //         .catch((err) => console.error(err));
    // }, []);

    return (
        <MapContainer
            center={[5.392691 , 6.986264 ]} // adjust to your campus's actual coordinates
            zoom={15}
            style={{ height: '500px', width: '100%', borderRadius: '1rem' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            {riskZones.map((zone, i) => (
                <CircleMarker
                    key={i}
                    center={[zone.lat, zone.long]}
                    radius={Math.min(8 + zone.count * 3, 30)}
                    pathOptions={{
                        color: zone.count >= 5 ? '#dc2626' : '#f59e0b',
                        fillColor: zone.count >= 5 ? '#dc2626' : '#f59e0b',
                        fillOpacity: 0.4,
                    }}
                >
                    <Popup>
                        <strong>{zone.location_text}</strong><br/>
                        {zone.count} reports in the last 30 days
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
};