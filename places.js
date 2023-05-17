var icons = {}

icons.commonProperties = {
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
}

icons.heart = L.icon({
    iconUrl: '/images/heart-icon.svg',
    ...icons.commonProperties,
    iconSize: [50, 100],
})

icons.lock = L.icon({
    iconUrl: '/images/padlock-icon.svg',
    ...icons.commonProperties,
})

var map = L.map('map').setView([-17.7710951, 30.9678471], 14);



L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Caleb's house
L.marker([-17.758461, 31.005786], { icon: icons.heart })
    .addTo(map)

// Althea's house

L.marker([-17.7910951, 30.9678471], { icon: icons.heart })
    .addTo(map)

const goToPlace = (lat, lng, idx) => {
    map.setView([lat, lng], 18)
    L.marker([lat, lng], { icon: icons.lock })
        .addTo(map)
        .on('click', () => {
            renderImages(idx, places)
        })
}

places.forEach((place, idx) => {
    document.getElementById("cards").innerHTML += `
    <div class="card" onclick="goToPlace(${place.location[0]}, ${place.location[1]}, ${idx})">
        <div class="card-header">
            <div class="card-title">${place.name}</div>
            <div class="card-subtitle">${place.date}</div>  
        </div>
        <div class="card-body">
            <div class="card-img"><img src="${place.photos[0]}" alt="photo" /></div>
            <div class="card-text">${place.description}</div>
        </div>
    </div>
    `
})