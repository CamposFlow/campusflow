import { useState, useEffect, useCallback } from 'react'
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls, useMap } from '@/components/ui/map'
import 'maplibre-gl/dist/maplibre-gl.css'
import api from "@/api/axios.js"

const MAP_STYLES = {
    light: "https://tiles.openfreemap.org/styles/bright",
    dark: "https://tiles.openfreemap.org/styles/bright"
}

const FUTO_FALLBACK = [6.986264, 5.392691]

const getSeverity = (count) => {
    if (count >= 5) return { level: 'high', color: '#dc2626', bg: 'bg-red-100', text: 'text-red-700', label: 'High Risk' }
    return { level: 'moderate', color: '#f59e0b', bg: 'bg-amber-100', text: 'text-amber-700', label: 'Moderate Risk' }
}

const clusterIncidents = (incidents) => {
    const groups = {}
    incidents.forEach((inc) => {
        const lat = parseFloat(inc.latitude)
        const lng = parseFloat(inc.longitude)
        if (isNaN(lat) || isNaN(lng)) return
        const key = `${lat.toFixed(3)}_${lng.toFixed(3)}`
        if (!groups[key]) {
            groups[key] = { lat, lng, location_text: inc.location_text || "Unnamed area", count: 0 }
        }
        groups[key].count += 1
    })
    return Object.values(groups)
}

const Toggle3DButton = ({ is3D, onToggle }) => (
    <button
        onClick={onToggle}
        className={`absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all duration-200 ${
            is3D ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-gray-200'
        }`}
    >
        <span>⛰</span>
        {is3D ? '3D On' : '3D View'}
    </button>
)

const MapController = ({ is3D }) => {
    const { map } = useMap()

    useEffect(() => {
        if (!map) return
        map.easeTo({ pitch: is3D ? 60 : 0, bearing: is3D ? -20 : 0, duration: 800 })

        const addBuildings = () => {
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
                    map.addSource('openfreemap-3d', { url: 'https://tiles.openfreemap.org/planet', type: 'vector' })
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
                            0, '#e2e8f0', 50, '#93c5fd', 200, '#2563EB'
                        ],
                        'fill-extrusion-height': ['get', 'render_height'],
                        'fill-extrusion-base': ['get', 'render_min_height'],
                        'fill-extrusion-opacity': 0.8,
                    },
                }, labelLayerId)
            } else if (!is3D && map.getLayer('3d-buildings')) {
                map.removeLayer('3d-buildings')
            }
        }

        if (map.isStyleLoaded()) addBuildings()
        else map.once('load', addBuildings)
    }, [map, is3D])

    return null
}

// Centers on the user's location once it's available, on initial load only
const InitialCenterController = ({ coords }) => {
    const { map } = useMap()
    const [hasCentered, setHasCentered] = useState(false)

    useEffect(() => {
        if (!map || !coords || hasCentered) return
        map.flyTo({ center: coords, zoom: 16, duration: 1200 })
        setHasCentered(true)
    }, [map, coords, hasCentered])

    return null
}

// Fits the map to all zones matching the clicked severity level
const SeverityFocusController = ({ zones, focusLevel }) => {
    const { map } = useMap()

    useEffect(() => {
        if (!map || !focusLevel) return
        const matching = zones.filter(z => getSeverity(z.count).level === focusLevel)
        if (matching.length === 0) return

        if (matching.length === 1) {
            map.flyTo({ center: [matching[0].lng, matching[0].lat], zoom: 17, duration: 1000 })
        } else {
            const lngs = matching.map(z => z.lng)
            const lats = matching.map(z => z.lat)
            map.fitBounds(
                [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
                { padding: 60, duration: 1000, maxZoom: 17 }
            )
        }
    }, [map, zones, focusLevel])

    return null
}

export const RiskZoneMap = () => {
    const [is3D, setIs3D] = useState(false)
    const [activeZone, setActiveZone] = useState(null)
    const [riskZones, setRiskZones] = useState([])
    const [loading, setLoading] = useState(true)
    const [userCoords, setUserCoords] = useState(null)
    const [focusLevel, setFocusLevel] = useState(null) // 'moderate' | 'high' | null

    const fetchRiskZones = useCallback(() => {
        api.get('/admin/incidents')
            .then(res => setRiskZones(clusterIncidents(res.data.database || [])))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        fetchRiskZones()
        const interval = setInterval(fetchRiskZones, 15000)
        return () => clearInterval(interval)
    }, [fetchRiskZones])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setUserCoords([pos.coords.longitude, pos.coords.latitude]),
            () => setUserCoords(FUTO_FALLBACK)
        )
    }, [])

    const handleLegendClick = (level) => {
        setFocusLevel((prev) => (prev === level ? null : level)) // click again to clear focus
    }

    return (
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
            <div style={{ height: 'clamp(280px, 50vh, 450px)', width: '100%' }}>
                <Map
                    center={userCoords || FUTO_FALLBACK}
                    zoom={15}
                    pitch={is3D ? 60 : 0}
                    bearing={is3D ? -20 : 0}
                    styles={MAP_STYLES}
                >
                    <MapControls position="bottom-right" />
                    <MapController is3D={is3D} />
                    <InitialCenterController coords={userCoords} />
                    <SeverityFocusController zones={riskZones} focusLevel={focusLevel} />

                    {riskZones.map((zone, i) => {
                        const severity = getSeverity(zone.count)
                        const dimmed = focusLevel && severity.level !== focusLevel
                        return (
                            <MapMarker
                                key={i}
                                longitude={zone.lng}
                                latitude={zone.lat}
                                onClick={() => setActiveZone(zone)}
                            >
                                <MarkerContent>
                                    <div
                                        className="rounded-full border-2 border-white shadow-lg cursor-pointer transition-opacity duration-300"
                                        style={{
                                            backgroundColor: severity.color,
                                            width: `${Math.min(12 + zone.count * 4, 32)}px`,
                                            height: `${Math.min(12 + zone.count * 4, 32)}px`,
                                            opacity: dimmed ? 0.25 : 1,
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

            <div className="flex items-center gap-4 mt-3 mb-3 text-xs text-slate-500 px-3">
                <span className="text-slate-700 font-medium uppercase">Info:</span>
                <button
                    onClick={() => handleLegendClick('moderate')}
                    className={`p-2 rounded-xl transition-all ${focusLevel === 'moderate' ? 'bg-amber-200 ring-2 ring-amber-400' : 'bg-amber-100 hover:bg-amber-200'}`}
                >
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                        3–4 reports
                    </span>
                </button>
                <button
                    onClick={() => handleLegendClick('high')}
                    className={`p-2 rounded-xl transition-all ${focusLevel === 'high' ? 'bg-red-200 ring-2 ring-red-400' : 'bg-red-100 hover:bg-red-200'}`}
                >
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                        5+ reports
                    </span>
                </button>
            </div>

            {!loading && riskZones.length === 0 && (
                <div className="text-center py-6 text-gray-400 text-sm">No incident reports yet</div>
            )}
        </div>
    )
}