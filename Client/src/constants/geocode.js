export const reverseGeocode = async (lat, lng) => {
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