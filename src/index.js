import { descriptions } from './descriptions.js'
import { date } from './date.js'
import { apis } from './apis.js'

const findExtremes = async (data) => {
  const weekArray = data.daily
  const organizedArray = []

  for (const day in weekArray) {
    const dayArray = date.futureDate(parseInt(day))
    organizedArray.push({
      dayName: dayArray[0],
      dateNumber: dayArray[1],
      dayTemp: weekArray[day].temp.day,
      nightTemp: weekArray[day].temp.night,
      weatherVag: weekArray[day].weather[0].main,
      weatherDes: weekArray[day].weather[0].description
    })
  }
  console.log(organizedArray)
  descriptions.remove()
  descriptions.create(organizedArray)
}

const retrieveWeatherNow = async (city, country, state = 'none') => {
  await apis.getWeatherNow(city, country, state)
    .then((value) => {
      const temp = value.main.temp
      descriptions.updateToday(temp, city, country, state)
    })
    .catch((err) => {
      console.error(err)
    })
}

const retrieveWeatherInfo = async (lat, lon) => {
  try {
    const rawWeather = await apis.getWeather(lat, lon)
    return rawWeather
  } catch (err) {
    console.error(err)
  }
}

const retrieveCoordInfo = async (city, country, state = 'none') => {
  try {
    const value = await apis.getCoordinates(city, country, state)
    return [value[0].lat, value[0].lon]
  } catch (err) {
    console.error(err)
  }
}

const updateScreen = async (city, country, state = 'none') => {
  try {
    const coords = await retrieveCoordInfo(city, country, state)
    try {
      const rawWeather = await retrieveWeatherInfo(coords[0], coords[1])
      try {
        await findExtremes(rawWeather)
      } catch (err) {
        console.err(err)
      }
    } catch (err) {
      console.err(err)
    }
  } catch (err) {
    console.err(err)
  }
  await retrieveWeatherNow(city, country, state)
}

// activate indivInfos
(() => {
  const indivInfos = document.querySelectorAll('.indivInfo')
  indivInfos.forEach(indivInfo => {
    const arrowDown = document.createElement('i')
    arrowDown.classList.add('arrow-down')
    indivInfo.addEventListener('mouseover', () => {
      indivInfo.appendChild(arrowDown)
    })
    indivInfo.addEventListener('mouseout', () => {
      indivInfo.removeChild(arrowDown)
    })
  })
})();

// activate search (what to do on submit)
(() => {
  const searchContainer = document.getElementById('searchContainer')
  const searchInput = document.getElementById('searchInput')
  searchContainer.addEventListener('submit', (event) => {
    event.preventDefault()
    const locationArr = searchInput.value.split(', ')
    if (locationArr.length === 3) {
      updateScreen(locationArr[0], locationArr[2], locationArr[1])
    } else {
      updateScreen(locationArr[0], locationArr[1])
    }
    searchInput.value = ''
  })
})()

updateScreen('London', 'GB')
