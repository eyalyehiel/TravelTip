export const locService = {
    getLocs,
    addLoc
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


