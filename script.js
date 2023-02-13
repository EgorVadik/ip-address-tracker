API_KEY = 'at_S9yWs6jCeSnu9yfzUamWPgFgUxByG'

const icon = L.icon({
    iconUrl: './images/icon-location.svg',
})

const map = L.map('map', {
    center: [34.04915, -118.09462],
    zoom: 20,
})
L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
).addTo(map)

const marker = L.marker([34.04915, -118.09462], { icon }).addTo(map)

function searchAddress() {
    const address = document.getElementById('input')
    const arrow = document.getElementById('arrow')
    arrow.classList.add('animate-spin')
    fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${address.value}`
    )
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data.code) {
                alert('Invalid Input')
            } else {
                document.getElementById('ip').innerText = data.ip
                document.getElementById(
                    'location'
                ).innerText = `${data.location.region}, ${data.location.country}`
                document.getElementById(
                    'timezone'
                ).innerText = `UTC ${data.location.timezone}`
                document.getElementById('isp').innerText = data.isp

                map.panTo([data.location.lat, data.location.lng])
                marker.setLatLng([data.location.lat, data.location.lng])
            }
            address.value = ''
        })
        .catch((err) => {
            alert(err.message)
        })
        .finally(() => {
            arrow.classList.remove('animate-spin')
        })
}
