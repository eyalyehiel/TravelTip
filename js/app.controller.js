import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = renderLocs
window.onGetUserPos = onGetUserPos
window.onSaveLoc = onSaveLoc

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function renderLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            let strHtmls = locs.map(({ name, lat, lng }) => {
                return `<div class="loc">
                <div>
                <h4 class="loc-name">${name}</h4>
                <p><span class="lat">${lat.toFixed(3)}</span> : <span class="lng">${lng.toFixed(3)}</span></p>
                </div>
                <button type="button" onclick="onPanTo('${lat}','${lng}')">Go</button>
                <button type="button" onclick="onDeleteLoc('${name}')">Delete</button>
            </div>`
            })
            document.querySelector('.locations').innerHTML = strHtmls.join('')
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo(lat,lng) {
    console.log('Panning the Map')
    mapService.panTo(+lat || 35.6895, +lng || 139.6917)
}


function onDeleteLoc(name){
    deleteLoc(name)

}
function onSaveLoc(ev, elForm, lat, lng) {
    ev.preventDefault()
    const name = elForm.querySelector('input').value
    locService.addLoc({ lat, lng }, name)
}


