import { descriptions } from './descriptions.js'
import { date } from './date.js'
import { apis } from './apis.js'

let sortedWeatherArray

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

  sortedWeatherArray = organizedArray
  return organizedArray
}

const retrieveWeatherNow = async (city, country, state) => {
  try {
    const value = await apis.getWeatherNow(city, country, state)
    return value.main.temp
  } catch (err) {
    Promise.reject(err)
  }
}

const retrieveWeatherInfo = async (lat, lon) => {
  try {
    const rawWeather = await apis.getWeather(lat, lon)
    return rawWeather
  } catch (err) {
    Promise.reject(err)
  }
}

const retrieveCoordInfo = async (city, country, state) => {
  try {
    const value = await apis.getCoordinates(city, country, state)
    return [value[0].lat, value[0].lon]
  } catch (err) {
    Promise.reject(err)
  }
}

const updateScreen = async (city, country, state) => {
  try {
    const coords = await retrieveCoordInfo(city, country, state)
    const rawWeather = await retrieveWeatherInfo(coords[0], coords[1])
    const organizedArray = await findExtremes(rawWeather)
    const weatherNow = await retrieveWeatherNow(city, country, state)

    descriptions.updateToday(weatherNow, city, country, state)
    descriptions.remove('infoContainer')
    descriptions.create(organizedArray)
  } catch (err) {
    console.error('err', err)
  }
}

// activate indivInfos
(() => {
  const indivInfos = document.querySelectorAll('.indivInfo')
  indivInfos.forEach(indivInfo => {
    const arrowDown = document.createElement('i')
    arrowDown.classList.add('arrow-down')
    indivInfo.addEventListener('mouseover', () => {
      indivInfo.appendChild(arrowDown)
      const idx = Array.from(indivInfo.parentNode.children).indexOf(indivInfo)
      const weatherDes = sortedWeatherArray[idx].weatherDes

      descriptions.remove('expandedContainer')
      descriptions.updateExpanded(weatherDes)
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
    const locationArr = searchInput.value.split('/')
    const termAmt = locationArr.length
    if (termAmt === 3 || termAmt === 2) {
      if (termAmt === 3) {
        updateScreen(locationArr[0], locationArr[2], locationArr[1])
      } else {
        updateScreen(locationArr[0], locationArr[1])
      }
      searchInput.value = ''
    } else {
      if (termAmt > 3) {
        searchInput.setCustomValidity('3 inputs max.')
      } else {
        searchInput.setCustomValidity('2 inputs min.')
      }
    }
  })
})()

updateScreen('London', 'GB')
