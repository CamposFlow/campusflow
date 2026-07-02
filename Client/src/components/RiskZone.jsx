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

    useEffect(() => {
        if (!map) return

        // animate camera
        map.easeTo({
            pitch: is3D ? 60 : 0,
            bearing: is3D ? -20 : 0,
            duration: 800,
        })


        if (is3D && !map.getLayer('3d-buildings')) {
            const layers = map.getStyle().layers
            let labelLayerId
            for (let i = 0; i < layers.length; i++) {
                if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                    labelLayerId = layers[i].id
                    break
                }
            }

            if (!map.getSource('openfreemap-3d')) {
                map.addSource('openfreemap-3d', {
                    url: 'https://tiles.openfreemap.org/planet',
                    type: 'vector',
                })
            }

            map.addLayer({
                id: '3d-buildings',
                source: 'openfreemap-3d',
                'source-layer': 'building',
                type: 'fill-extrusion',
                minzoom: 15,
                filter: ['!=', ['get', 'hide_3d'], true],
                paint: {
                    'fill-extrusion-color': [
                        'interpolate', ['linear'], ['get', 'render_height'],
                        0, '#e2e8f0',
                        50, '#93c5fd',
                        200, '#2563EB'
                    ],
                    'fill-extrusion-height': ['get', 'render_height'],
                    'fill-extrusion-base': ['get', 'render_min_height'],
                    'fill-extrusion-opacity': 0.8,
                },
            }, labelLayerId)

        } else if (!is3D && map.getLayer('3d-buildings')) {
            map.removeLayer('3d-buildings')
        }

    }, [map, is3D])

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
            light: "https://tiles.openfreemap.org/styles/bright",
            dark: "https://tiles.openfreemap.org/styles/bright"
        }}
    >
                <MapControls position="bottom-right" />
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