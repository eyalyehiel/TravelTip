export const locService = {
    getLocs,
    saveToLocs
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function saveToLocs(pos) {
    const { lat, lng } = pos
    const newLoc = {
        name: 'Nice place for a zula',
        lat,
        lng
    }
    locs.unshift(newLoc)
}


