const apis = (() => {
  const getWeather = async (lat, lon) => {
    const locationLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=imperial&appid=daab30e51d1d719de2096678f035d4bf`
    try {
      const locationPromise = await fetch(locationLink, { mode: 'cors' })
      const locationJSON = await locationPromise.json()
      return new Promise((resolve, reject) => resolve(locationJSON))
    } catch (err) {
      return new Promise((resolve, reject) => reject(err))
    }
  }
  return { getWeather }
})()

export { apis }
