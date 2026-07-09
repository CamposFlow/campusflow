import { useState, useEffect, useCallback } from "react"
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls, useMap } from '@/components/ui/map'
import 'maplibre-gl/dist/maplibre-gl.css'
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, Clock, Navigation, Download, MapPin } from "lucide-react"

const mockIncidents = [
    { id: 1, studentName: "Adaeze Nwosu", studentId: "FUT/SET/21/0002", category: "Suspicious Activity", description: "Suspicious person following me", latitude: 5.3850, longitude: 7.0036, timestamp: "2 mins ago", isResolved: false },
    { id: 2, studentName: "Ngozi Okonkwo", studentId: "FUT/SET/21/0004", category: "Fight", description: "Fight at female hostel", latitude: 5.3862, longitude: 7.0041, timestamp: "18 mins ago", isResolved: false },
    { id: 3, studentName: "Emeka Eze", studentId: "FUT/SET/21/0003", category: "Theft", description: "Theft at Block C", latitude: 5.3844, longitude: 7.0029, timestamp: "1 hr ago", isResolved: true },
    { id: 4, studentName: "Tunde Bakare", studentId: "FUT/SET/21/0005", category: "Medical", description: "Medical emergency near library", latitude: 5.3871, longitude: 7.0055, timestamp: "3 hrs ago", isResolved: true },
]

const filters = ["All", "Active", "Resolved"]

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

// Draws a route line from OSRM's public routing API — replaces leaflet-routing-machine
const RouteLayer = ({ from, to }) => {
    const { map } = useMap()
    const [routeGeoJSON, setRouteGeoJSON] = useState(null)

    useEffect(() => {
        if (!from || !to) {
            setRouteGeoJSON(null)
            return
        }
        const fetchRoute = async () => {
            try {
                const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`
                const res = await fetch(url)
                const data = await res.json()
                if (data.routes?.[0]) {
                    setRouteGeoJSON({ type: 'Feature', geometry: data.routes[0].geometry })
                } else {
                    // fallback: straight line, so something always shows even if OSRM has no route
                    setRouteGeoJSON({
                        type: 'Feature',
                        geometry: { type: 'LineString', coordinates: [[from[1], from[0]], [to[1], to[0]]] },
                    })
                }
            } catch (err) {
                console.error('Route fetch failed, falling back to straight line:', err)
                setRouteGeoJSON({
                    type: 'Feature',
                    geometry: { type: 'LineString', coordinates: [[from[1], from[0]], [to[1], to[0]]] },
                })
            }
        }
        fetchRoute()
    }, [from, to])

    useEffect(() => {
        if (!map || !routeGeoJSON) return

        const drawRoute = () => {
            if (map.getSource('route-line')) {
                map.getSource('route-line').setData(routeGeoJSON)
            } else {
                map.addSource('route-line', { type: 'geojson', data: routeGeoJSON })
                map.addLayer({
                    id: 'route-line',
                    type: 'line',
                    source: 'route-line',
                    layout: { 'line-join': 'round', 'line-cap': 'round' },
                    paint: { 'line-color': '#3B82F6', 'line-width': 4, 'line-opacity': 0.8 },
                })
            }
        }

        if (map.isStyleLoaded()) drawRoute()
        else map.once('load', drawRoute)

        return () => {
            if (map.getLayer?.('route-line')) map.removeLayer('route-line')
            if (map.getSource?.('route-line')) map.removeSource('route-line')
        }
    }, [map, routeGeoJSON])

    return null
}

const FlyToController = ({ coords }) => {
    const { map } = useMap()
    useEffect(() => {
        if (map && coords) map.flyTo({ center: [coords[1], coords[0]], zoom: 16, duration: 1500 })
    }, [map, coords])
    return null
}

const AdminSecurity = () => {
    const [activeFilter, setActiveFilter] = useState("All")
    const [selectedIncident, setSelectedIncident] = useState(null)
    const [incidents, setIncidents] = useState(mockIncidents)
    const [userLocation, setUserLocation] = useState(null)
    const [is3D, setIs3D] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
            () => setUserLocation([5.3850, 7.0036])
        )
    }, [])

    const filtered = incidents.filter((inc) => {
        if (activeFilter === "Active") return !inc.isResolved
        if (activeFilter === "Resolved") return inc.isResolved
        return true
    })

    const handleResolve = (id) => {
        setIncidents((prev) => prev.map((inc) => inc.id === id ? { ...inc, isResolved: true } : inc))
        if (selectedIncident?.id === id) setSelectedIncident((prev) => ({ ...prev, isResolved: true }))
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Security</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Live incident monitoring</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    {incidents.filter((i) => !i.isResolved).length} Active incidents
                </div>
            </div>

            <div className="flex items-center gap-2">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            activeFilter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="md:grid-cols-2 gap-8">
                <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
                    <AnimatePresence>
                        {filtered.map((inc, index) => (
                            <motion.div
                                key={inc.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedIncident(inc)}
                                className={`bg-white border rounded-xl p-4 cursor-pointer transition-all ${
                                    selectedIncident?.id === inc.id ? "border-blue-500 shadow-md shadow-blue-100" : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${inc.isResolved ? "bg-emerald-50" : "bg-red-50"}`}>
                                            {inc.isResolved ? <CheckCircle size={15} className="text-emerald-500" /> : <AlertTriangle size={15} className="text-red-500" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{inc.studentName}</p>
                                            <p className="text-xs text-gray-400">{inc.studentId} · {inc.category}</p>
                                            <p className="text-xs text-gray-600 mt-1">{inc.description}</p>
                                            <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
                                                <Clock size={11} /> {inc.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${inc.isResolved ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                                        {inc.isResolved ? "Resolved" : "Active"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedIncident(inc) }}
                                        className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-700"
                                    >
                                        <Navigation size={12} /> Navigate
                                    </button>
                                    {!inc.isResolved && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleResolve(inc.id) }}
                                            className="flex items-center gap-1 text-xs text-emerald-600 font-medium hover:text-emerald-700 ml-auto"
                                        >
                                            <CheckCircle size={12} /> Mark Resolved
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-gray-400 text-sm">No incidents found</div>
                    )}
                </div>

                <div
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden relative mt-4"
                    style={{ height: 'clamp(280px, 50vh, 520px)', width: '100%' }}
                >
                    <Map
                        center={[7.0036, 5.3850]}
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

                        {filtered.map((inc) => (
                            <MapMarker key={inc.id} longitude={inc.longitude} latitude={inc.latitude} onClick={() => setSelectedIncident(inc)}>
                                <MarkerContent>
                                    <MapPin
                                        size={28}
                                        className="cursor-pointer drop-shadow-md"
                                        fill={inc.isResolved ? '#10b981' : '#dc2626'}
                                        color="white"
                                        strokeWidth={1.5}
                                    />
                                </MarkerContent>

                                {selectedIncident?.id === inc.id && (
                                    <MarkerPopup onClose={() => setSelectedIncident(null)}>
                                        <div className="text-xs min-w-[160px] p-1">
                                            <p className="font-semibold">{inc.studentName}</p>
                                            <p className="text-gray-500">{inc.description}</p>
                                            <p className="text-gray-400 mt-1">{inc.timestamp}</p>
                                        </div>
                                    </MarkerPopup>
                                )}
                            </MapMarker>
                        ))}

                        {selectedIncident && (
                            <>
                                <FlyToController coords={[selectedIncident.latitude, selectedIncident.longitude]} />
                                {userLocation && (
                                    <RouteLayer from={userLocation} to={[selectedIncident.latitude, selectedIncident.longitude]} />
                                )}
                            </>
                        )}
                    </Map>

                    <Toggle3DButton is3D={is3D} onToggle={() => setIs3D(v => !v)} />
                </div>
            </div>
        </div>
    )
}

export default AdminSecurity