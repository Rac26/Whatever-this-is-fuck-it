const apiKey = 'e9b12bc1606a17d9a654e1adcd2b8da1'
const kekeke = document.getElementById('lalala')
const sampleCity = document.getElementById('city').value
const kikiki = document.getElementById('lelele')

//displays this shitty async function when contents are loaded
document.addEventListener('DOMContentLoaded', async e => {
    
    e.preventDefault()

    if(sampleCity) {
        try {
            const weatherData = await getWeatherData('weather', sampleCity)
            displayWeatherInfos(weatherData)
            predictionsInfo(sampleCity)
        } catch (error) {
            console.error(error)
        }
    }
    
})

//getting the datas for the forecast
async function predictionsInfo(city) {
    const forecastData = await getWeatherData('forecast', city)

    const timeTaken = '12:00:00'
    const todayDate = new Date().toISOString().split('T')[0]

    forecastData.list.forEach(forecastWeather => {
        if (forecastWeather.dt_txt.includes(timeTaken) && !forecastWeather.dt_txt.includes(todayDate)) {
            updateForecastWeather(forecastWeather)
        }
    })

}

//displays the datas na kinuha sa taas nito 
function updateForecastWeather(forecastWeather) {
    console.log(forecastWeather)

    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = forecastWeather

    const dateTaken = new Date(date)
    const format = {
        day: '2-digit',
        month: 'short'
    }

    const dateResult = dateTaken.toLocaleDateString('en-US', format)

    const forecastItems = `<p id="lelele">${getWeatherEmoji(id)}</p><p id="lelele">${dateResult}</p><p id="lelele">${Math.round(temp)}&deg;F</p>`

    kikiki.insertAdjacentHTML('beforeend', forecastItems)

}

// fetching the weather data from api using city name 
async function getWeatherData(endpoint ,city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}`

    const res = await fetch(apiUrl)

    console.log(res)

    if(!res.ok) {
        throw new Error("Couldn't fetch weather data.")
    }

    return await res.json()

}

// displays the weather info
function displayWeatherInfos(data) {

    const {
        name: country,
        main: { temp },
        weather: [{ id, description }],
        wind: {speed}
    } = data

    let currDate = new Date()
    const displayDate = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }

    currDate = currDate.toLocaleDateString('en-GB', displayDate)

    kekeke.innerHTML = `${currDate}`

}

// displays the weather emoji based on the id that's in the weather datas we fetched
function getWeatherEmoji(weatherId) {
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "Yahhhhh thunderStoRm owemjii"
            break;
        case (weatherId >= 300 && weatherId < 500):
            return "Yahhh it's drizzling myGaHd"
            break;
        case (weatherId >= 500 && weatherId < 600):
            return "Do you wanna build a SnOwMan??"
            break;
        case (weatherId >= 600 && weatherId < 701):
            return "Atmosphere daw nakasulat eh"
            break;
        case (weatherId === 800):
            return "Clear motherFather"
            break;
        case (weatherId >= 801 && weatherId < 810):
            return "cloudy"
            break;
        default:
            return "Dahek is that weather?"
            break;
    }
}