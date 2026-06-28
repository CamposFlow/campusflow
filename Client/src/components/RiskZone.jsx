import {MapContainer, TileLayer, CircleMarker, Popup, ZoomControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import '../App.css'
export const RiskZoneMap = () => {

    const [riskZones] = useState([
        { lat: 5.392691, long: 6.986264, location_text: "FUTO Market", count: 4 },
        { lat: 5.394500, long: 6.987800, location_text: "FUTO Back Gate", count: 6 },
        { lat: 5.391200, long: 6.985000, location_text: "Hostel C Junction", count: 3 },
    ]);

    return (
        <div className="rounded-3xl overflow-hidden border border-slate-500 shadow-sm">
            <MapContainer
                center={[5.392691, 6.986264]}
                zoom={15}
                style={{ height: 'clamp(280px, 50vh, 450px)', width: '100%' }}
                zoomControl={false}
            >
                <ZoomControl position="bottomright" />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
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
                            <div className="min-w-[180px]">
                                <div className="font-semibold text-sm mb-1">
                                    {zone.location_text}
                                </div>
                                <span
                                    className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full text-white mt-1"
                                    style={{ background: zone.count >= 5 ? '#dc2626' : '#f59e0b' }}
                                >
                                    {zone.count} reports · last 30 days
                                </span>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>

            <div className="flex items-center gap-4 mt-3 mb-3 text-xs text-slate-500 px-2">
               <span className="text-slate-700 font-medium uppercase"> Info :</span>
              <div className="bg-amber-100 p-2 rounded-xl">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"/> 3–4 reports</span>
              </div>
               <div className="bg-red-100 p-2 rounded-xl"> <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"/> 5+ reports</span></div>
            </div>
        </div>
    );
};