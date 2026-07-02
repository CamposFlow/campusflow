import {useState, useCallback, useEffect} from 'react'
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls, useMap } from '@/components/ui/map'
import 'maplibre-gl/dist/maplibre-gl.css'

const riskZones = [
    { lat: 5.392691, lng: 6.986264, location_text: "FUTO Market", count: 4 },
    { lat: 5.394500, lng: 6.987800, location_text: "FUTO Back Gate", count: 6 },
    { lat: 5.391200, lng: 6.985000, location_text: "Hostel C Junction", count: 3 },
]

const getSeverity = (count) => {
    if (count >= 5) return { color: '#dc2626', bg: 'bg-red-100', text: 'text-red-700', label: 'High Risk' }
    return { color: '#f59e0b', bg: 'bg-amber-100', text: 'text-amber-700', label: 'Moderate Risk' }
}

const Toggle3DButton = ({ is3D, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className={`absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all duration-200 ${
                is3D
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 border border-gray-200'
            }`}
        >
            <span>⛰</span>
            {is3D ? '3D On' : '3D View'}
        </button>
    )
}

const MapController = ({ is3D }) => {
    const { map } = useMap()

    const animate = useCallback(() => {
        if (!map) return
        map.easeTo({
            pitch: is3D ? 60 : 0,
            bearing: is3D ? -20 : 0,
            duration: 800,
            easing: (t) => t * (2 - t)
        })
    }, [map, is3D])

    useEffect(() => {
        animate()
    }, [animate]);
    return null
}
export const RiskZoneMap = () => {
    const [is3D, setIs3D] = useState(false)
    const [activeZone, setActiveZone] = useState(null)

    return (
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
<div   style={{ height: 'clamp(280px, 50vh, 450px)', width: '100%' }}>


    <Map
        center={[6.986264, 5.392691]}
        zoom={15}
        pitch={0}
        bearing={0}
        styles={{
            light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
            dark: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        }}
    >
                <MapControls />
                <MapController is3D={is3D} />

                {riskZones.map((zone, i) => {
                    const severity = getSeverity(zone.count)
                    return (
                        <MapMarker
                            key={i}
                            longitude={zone.lng}
                            latitude={zone.lat}
                            onClick={() => setActiveZone(zone)}
                        >
                            <MarkerContent>
                                <div
                                    className="w-5 h-5 rounded-full border-2 border-white shadow-lg cursor-pointer"
                                    style={{
                                        backgroundColor: severity.color,
                                        width: `${Math.min(12 + zone.count * 4, 32)}px`,
                                        height: `${Math.min(12 + zone.count * 4, 32)}px`,
                                    }}
                                />
                            </MarkerContent>

                            {activeZone?.location_text === zone.location_text && (
                                <MarkerPopup onClose={() => setActiveZone(null)}>
                                    <div className="min-w-[180px] p-1">
                                        <p className="font-semibold text-sm text-slate-800 mb-2">
                                            {zone.location_text}
                                        </p>
                                        <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${severity.bg} ${severity.text}`}>
                                            {zone.count} reports · {severity.label}
                                        </span>
                                    </div>
                                </MarkerPopup>
                            )}
                        </MapMarker>
                    )
                })}
            </Map>
</div>
            {/* 3D toggle — overlays the map */}
            <div className="absolute top-3 left-3 z-10">
                <Toggle3DButton is3D={is3D} onToggle={() => setIs3D(v => !v)} />
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 mb-3 text-xs text-slate-500 px-3">
                <span className="text-slate-700 font-medium uppercase">Info:</span>
                <div className="bg-amber-100 p-2 rounded-xl">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                        3–4 reports
                    </span>
                </div>
                <div className="bg-red-100 p-2 rounded-xl">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                        5+ reports
                    </span>
                </div>
            </div>
        </div>
    )
}