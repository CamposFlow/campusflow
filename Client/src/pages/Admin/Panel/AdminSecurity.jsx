import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from 'leaflet'
import 'leaflet-routing-machine'
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, Clock, Navigation } from "lucide-react"

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

const activeIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

const resolvedIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

const mockIncidents = [
    { id: 1, studentName: "Adaeze Nwosu", studentId: "FUT/SET/21/0002", description: "Suspicious person following me", latitude: 5.3850, longitude: 7.0036, timestamp: "2 mins ago", isResolved: false },
    { id: 2, studentName: "Ngozi Okonkwo", studentId: "FUT/SET/21/0004", description: "Fight at female hostel", latitude: 5.3862, longitude: 7.0041, timestamp: "18 mins ago", isResolved: false },
    { id: 3, studentName: "Emeka Eze", studentId: "FUT/SET/21/0003", description: "Theft at Block C", latitude: 5.3844, longitude: 7.0029, timestamp: "1 hr ago", isResolved: true },
    { id: 4, studentName: "Tunde Bakare", studentId: "FUT/SET/21/0005", description: "Medical emergency near library", latitude: 5.3871, longitude: 7.0055, timestamp: "3 hrs ago", isResolved: true },
]

// Routing component
const RoutingControl = ({ from, to }) => {
    const map = useMap()

    useEffect(() => {
        if (!from || !to) return

        const control = L.Routing.control({
            waypoints: [
                L.latLng(from[0], from[1]),
                L.latLng(to[0], to[1]),
            ],
            routeWhileDragging: false,
            show: false,
            addWaypoints: false,
            lineOptions: {
                styles: [{ color: "#3B82F6", weight: 4, opacity: 0.8 }],
            },
            createMarker: () => null,
        }).addTo(map)

        return () => map.removeControl(control)
    }, [from, to, map])

    return null
}

// Fly to location
const FlyTo = ({ coords }) => {
    const map = useMap()
    useEffect(() => {
        if (coords) map.flyTo(coords, 16, { duration: 1.5 })
    }, [coords, map])
    return null
}

const filters = ["All", "Active", "Resolved"]

const AdminSecurity = () => {
    const [activeFilter, setActiveFilter] = useState("All")
    const [selectedIncident, setSelectedIncident] = useState(null)
    const [incidents, setIncidents] = useState(mockIncidents)
    const [userLocation, setUserLocation] = useState(null)

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
        setIncidents((prev) =>
            prev.map((inc) => inc.id === id ? { ...inc, isResolved: true } : inc)
        )
        if (selectedIncident?.id === id) {
            setSelectedIncident((prev) => ({ ...prev, isResolved: true }))
        }
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
                            activeFilter === f
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Incident Feed */}
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
                                    selectedIncident?.id === inc.id
                                    ? "border-blue-500 shadow-md shadow-blue-100"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            inc.isResolved ? "bg-emerald-50" : "bg-red-50"
                                        }`}>
                                            {inc.isResolved
                                                ? <CheckCircle size={15} className="text-emerald-500" />
                                                : <AlertTriangle size={15} className="text-red-500" />
                                            }
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{inc.studentName}</p>
                                            <p className="text-xs text-gray-400">{inc.studentId}</p>
                                            <p className="text-xs text-gray-600 mt-1">{inc.description}</p>
                                            <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-400">
                                                <Clock size={11} />
                                                {inc.timestamp}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                                        inc.isResolved
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-red-50 text-red-500"
                                    }`}>
                    {inc.isResolved ? "Resolved" : "Active"}
                  </span>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedIncident(inc)
                                        }}
                                        className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:text-blue-700"
                                    >
                                        <Navigation size={12} /> Navigate
                                    </button>
                                    {!inc.isResolved && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleResolve(inc.id)
                                            }}
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
                        <div className="text-center py-12 text-gray-400 text-sm">
                            No incidents found
                        </div>
                    )}
                </div>

                {/* Map */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden h-[520px]">
                    <MapContainer
                        center={[5.3850, 7.0036]}
                        zoom={15}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />

                        {filtered.map((inc) => (
                            <Marker
                                key={inc.id}
                                position={[inc.latitude, inc.longitude]}
                                icon={inc.isResolved ? resolvedIcon : activeIcon}
                            >
                                <Popup>
                                    <div className="text-xs">
                                        <p className="font-semibold">{inc.studentName}</p>
                                        <p className="text-gray-500">{inc.description}</p>
                                        <p className="text-gray-400 mt-1">{inc.timestamp}</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                        {selectedIncident && (
                            <>
                                <FlyTo coords={[selectedIncident.latitude, selectedIncident.longitude]} />
                                {userLocation && (
                                    <RoutingControl
                                        from={userLocation}
                                        to={[selectedIncident.latitude, selectedIncident.longitude]}
                                    />
                                )}
                            </>
                        )}

                    </MapContainer>
                </div>

            </div>
        </div>
    )
}

export default AdminSecurity;