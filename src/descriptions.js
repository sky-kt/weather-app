const descriptions = (() => {
  const indivInfos = document.querySelectorAll('.indivInfo')
  const infoContainer = document.getElementById('infoContainer')
  const expandedContainer = document.getElementById('expandedContainer')

  const cityTitle = document.getElementById('cityTitle')
  const weatherTitle = document.getElementById('weatherTitle')

  const removeAllChildren = (parent) => {
    while (parent.lastChild) {
      parent.removeChild(parent.lastChild)
    }
  }

  const updateToday = (temp, city, country, state = 'none') => {
    removeAllChildren(cityTitle)
    removeAllChildren(weatherTitle)

    city = city.charAt(0).toUpperCase() + city.slice(1)
    country = country.toUpperCase()
    state = state.toUpperCase()

    if (country === 'US') {
      cityTitle.appendChild(document.createTextNode(`${city}, ${state}`))
    } else {
      cityTitle.appendChild(document.createTextNode(`${city}, ${country}`))
    }
    weatherTitle.appendChild(document.createTextNode(`${temp} F°`))
  }

  const updateExpanded = (weatherDes) => {
    const sentenceDescription = weatherDes.charAt(0).toUpperCase() + weatherDes.slice(1)
    expandedContainer.appendChild(document.createTextNode(sentenceDescription))
  }

  const remove = (target) => {
    if (target === 'infoContainer') {
      indivInfos.forEach((indivInfo) => {
        removeAllChildren(indivInfo)
      })
    } else if (target === 'expandedContainer') {
      removeAllChildren(expandedContainer)
    }
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
          if (weatherDes === 'light rain') {
            weatherIcon.classList.add('wi', 'wi-showers')
          } else {
            weatherIcon.classList.add('wi', 'wi-rain')
          }
          break
        case 'Clear':
          weatherIcon.classList.add('wi', 'wi-day-sunny')
          break
        case 'Clouds':
          if (weatherDes === 'broken clouds') {
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
  return { updateToday, updateExpanded, create, remove }
})()

export { descriptions }
