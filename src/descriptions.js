const descriptions = (() => {
  const infoContainer = document.getElementById('infoContainer')
  const create = (extremeArray) => {
    console.log('creating')
    for (let item = 0; item < extremeArray.length - 1; item++) {
      const weatherDescription = extremeArray[item].weatherVag
      let weatherIcon

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
      Array.from(infoContainer.children)[item].appendChild(weatherIcon)
    }
  }
  return { create }
})()

export { descriptions }
