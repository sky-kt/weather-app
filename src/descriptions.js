const descriptions = (() => {
  const infoContainer = document.getElementById('infoContainer')
  const remove = () => {
    document.querySelectorAll('.indivInfo').forEach((indivInfo) => {
      while (indivInfo.lastChild) {
        indivInfo.removeChild(indivInfo.lastChild)
      }
    })
  }

  const create = (extremeArray) => {
    for (let item = 0; item < extremeArray.length - 1; item++) {
      // access variables from array

      const indivInfo = Array.from(infoContainer.children)[item]
      const dateNumber = extremeArray[item].dateNumber
      const weatherVag = extremeArray[item].weatherVag
      const weatherDes = extremeArray[item].weatherDes

      const dayTemp = Math.round(extremeArray[item].dayTemp)
      const nightTemp = Math.round(extremeArray[item].nightTemp)
      let weatherIcon = document.createElement('i')

      // find correct icons
      switch (weatherVag) {
        case 'Thunderstorm':
          weatherIcon.classList.add('wi', 'wi-thunderstorm')
          break
        case 'Drizzle':
          weatherIcon.classList.add('wi', 'wi-showers')
          break
        case 'Rain':
          weatherIcon.classList.add('wi', 'wi-rain')
          break
        case 'Clear':
          weatherIcon.classList.add('wi', 'wi-day-sunny')
          break
        case 'Clouds':
          if (weatherDes === 'scattered clouds') {
            weatherIcon.classList.add('wi', 'wi-cloudy')
          } else {
            weatherIcon.classList.add('wi', 'wi-day-cloudy')
          }
          break
        case 'Mist':
          weatherIcon.classList.add('wi', 'wi-sprinkle')
          break
        case 'Smoke':
          weatherIcon.classList.add('wi', 'wi-smoke')
          break
        case 'Haze':
          weatherIcon.classList.add('wi', 'wi-day-haze')
          break
        case 'Dust':
          weatherIcon.classList.add('wi', 'wi-dust')
          break
        case 'Fog':
          weatherIcon.classList.add('wi', 'wi-fog')
          break
        case 'Sand':
          weatherIcon.classList.add('wi', 'wi-sandstorm')
          break
        case 'Ash':
          weatherIcon.classList.add('wi', 'wi-sandstorm')
          break
        case 'Tornado':
          weatherIcon.classList.add('wi', 'wi-tornado')
          break
        default:
          weatherIcon = document.createElement('i')
          weatherIcon.classList.add('wi', 'wi-na')
          break
      }
      const tempDiv = document.createElement('div')
      tempDiv.classList.add('tempDiv')
      tempDiv.appendChild(document.createTextNode(`${dayTemp}/${nightTemp}`))

      indivInfo.appendChild(document.createTextNode(dateNumber))
      indivInfo.appendChild(weatherIcon)
      indivInfo.appendChild(tempDiv)
    }
  }
  return { create, remove }
})()

export { descriptions }
