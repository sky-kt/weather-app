const descriptions = (() => {
  const infoContainer = document.getElementById('infoContainer')
  const create = (extremeArray) => {
    console.log('creating')
    for (let item = 0; item < extremeArray.length - 1; item++) {
      // access variables from array
      const indivInfo = Array.from(infoContainer.children)[item]
      const weatherDescription = extremeArray[item].weatherVag
      const dayTemp = Math.round(extremeArray[item].dayTemp)
      const nightTemp = Math.round(extremeArray[item].nightTemp)
      let weatherIcon

      // find correct icons
      switch (weatherDescription) {
        case 'Clear':
          weatherIcon = document.createElement('i')
          weatherIcon.classList.add('wi', 'wi-day-sunny')
          break
        case 'Clouds':
          weatherIcon = document.createElement('i')
          weatherIcon.classList.add('wi', 'wi-day-cloudy')
          break
        default:
          break
      }
      const tempDiv = document.createElement('div')
      tempDiv.classList.add('tempDiv')
      tempDiv.appendChild(document.createTextNode(`${dayTemp}/${nightTemp}`))

      indivInfo.appendChild(document.createTextNode('sus'))
      indivInfo.appendChild(weatherIcon)
      indivInfo.appendChild(tempDiv)
      console.log(indivInfo)
    }
  }
  return { create }
})()

export { descriptions }
