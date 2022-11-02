export const weatherService = {
    get: getWeather
}


// getWeather(31.9291392,34.8291072)
function getWeather(lat, lng) {
    console.log('XXX');
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6cfb3cecf9de72cd7632bab0819f1b9a`)
        .then(res => res.json())
        .then(res => {
            console.log('res',res)
            return {
                name: res.name,
                country: res.sys.country,
                temp: res.main.feels_like,
            }
        })

}