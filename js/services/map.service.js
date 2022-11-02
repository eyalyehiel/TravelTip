export const mapService = {
    initMap,
    addMarker,
    panTo,
}

import { locService } from './loc.service.js'



// Var that is used throughout this Module (not global)
var gMap
function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })


            console.log('Map!', gMap)
            // Create the initial InfoWindow.
            let infoWindow = new google.maps.InfoWindow();

            gMap.addListener("click", (mapsMouseEvent) => {
                infoWindow.close();
                // Create a new InfoWindow.
                const { lat, lng } = JSON.parse(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2))
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                infoWindow.setContent(`
                <h1>Add this new location?</h1>
                <form onsubmit="onAddLoc(event, this, ${lat}, ${lng})">
                    <label for="name"><h3>Name this place:</h3></label>
                    <input class="search-input" type="text">
                    <button class="search-btn">Add</button>
                </form> 
                `)
                infoWindow.open(gMap);

            })


        })


}

// Configure the click listener.

function addMarker() {
    const image = {
        url: '../icons/marker.png',
    };
    var marker = new google.maps.Marker({
        position: gMap.center,
        map: gMap,
        title: 'Hello World!',
        icon: image
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDJ5CRpSy0V14lOUli9vStS6lCjaSStmNU' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}