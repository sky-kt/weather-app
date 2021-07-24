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
  const getCoordinates = async (city, country, state) => {
    // console.log('city', city)
    // console.log('country', country)
    // console.log('state', state)
    let coordLink
    if (country === 'US') {
      coordLink = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=daab30e51d1d719de2096678f035d4bf`
    } else {
      coordLink = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=daab30e51d1d719de2096678f035d4bf`
    }
    try {
      const coordPromise = await fetch(coordLink, { mode: 'cors' })
      const coordJSON = await coordPromise.json()
      return new Promise((resolve, reject) => resolve(coordJSON))
    } catch (err) {
      return new Promise((resolve, reject) => reject(err))
    }
  }
  return { getWeather, getCoordinates }
})()

export { apis }
