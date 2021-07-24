import { descriptions } from './descriptions.js'
import { date } from './date.js'
import { apis } from './apis.js'

const findExtremes = (data) => {
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
  descriptions.create(organizedArray)
}

(async () => {
  await apis.getWeather(37.3229978, -122.0321823)
    .then((value) => {
      console.log(value)
      findExtremes(value)
    })
    .catch((err) => {
      console.error(err)
    })
})()

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
  console.log(searchInput.value)
  event.preventDefault()
})
