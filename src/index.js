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

const retrieveWeatherInfo = async (lat, lon) => {
  await apis.getWeather(lat, lon)
    .then((value) => {
      findExtremes(value)
    })
    .catch((err) => {
      console.error(err)
    })
}
// retrieveWeatherInfo(37.3229978, -122.0321823)
retrieveWeatherInfo(37.323, -122.032)

const retrieveCoordInfo = async (city, country, state = 'none') => {
  await apis.getCoordinates(city, country, state)
    .then((value) => {
      retrieveWeatherInfo(value[0].lat, value[0].lon)
    })
    .catch((err) => {
      console.error(err)
    })
}

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

const searchContainer = document.getElementById('searchContainer')
const searchInput = document.getElementById('searchInput')
searchContainer.addEventListener('submit', (event) => {
  const locationArr = searchInput.value.split(', ')
  if (locationArr.length === 3) {
    retrieveCoordInfo(locationArr[0], locationArr[2], locationArr[1])
  } else {
    retrieveCoordInfo(locationArr[0], locationArr[2])
  }
  event.preventDefault()
})
