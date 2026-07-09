const FUTO_LANDMARKS = [
    { name: "FUTO Market", lat: 5.392691, lng: 6.986264, radius: 0.15 },
    { name: "FUTO Back Gate", lat: 5.394500, lng: 6.987800, radius: 0.15 },
    { name: "Hostel C Junction", lat: 5.391200, lng: 6.985000, radius: 0.15 },
    { name: "SEET Building", lat: 5.3876, lng: 6.9986, radius: 0.1 },
    { name: "Library Complex", lat: 5.3862, lng: 6.9971, radius: 0.1 },
    { name: "Senate Building", lat: 5.3855, lng: 6.9960, radius: 0.1 },

]

const haversineKm = (lat1, lng1, lat2, lng2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const findNearestLandmark = (lat, lng) => {
    let closest = null
    let closestDist = Infinity
    for (const landmark of FUTO_LANDMARKS) {
        const dist = haversineKm(lat, lng, landmark.lat, landmark.lng)
        if (dist <= landmark.radius && dist < closestDist) {
            closest = landmark.name
            closestDist = dist
        }
    }
    return closest
}

export const reverseGeocode = async (lat, lng) => {
    const landmark = findNearestLandmark(lat, lng)
    if (landmark) return landmark

    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            {
                headers: {
                    'Accept-Language': 'en',
                    'User-Agent': 'CampusFlow/1.0'
                }
            }
        )
        const data = await res.json()

        const { road, suburb, city, town, village, state } = data.address
        const area = suburb || town || village || city || state || ''
        const street = road || ''

        return street && area
            ? `${street}, ${area}`
            : data.display_name?.split(',').slice(0, 2).join(',') || 'Unknown location'

    } catch (err) {
        console.error('Reverse geocode failed:', err)
        return 'Location unavailable'
    }
}