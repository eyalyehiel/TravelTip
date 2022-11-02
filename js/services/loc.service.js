export const locService = {
    getLocs,
    addLoc,
    deleteLoc
}

import { storageService } from "./storage.service.js"

const STORAGE_KEY = 'locsDB'

const locs = storageService.load(STORAGE_KEY) || []

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLoc(pos, name) {
    console.log('saving to locs');
    const { lat, lng } = pos
    const newLoc = {
        name,
        lat,
        lng
    }
    locs.unshift(newLoc)
    storageService.save(STORAGE_KEY, locs)
}

function deleteLoc(name){
    locIdx = locs.findIndex(loc => loc.name === name)
    locs.splice(locIdx,1)
    storageService.save(STORAGE_KEY,locs)
}
