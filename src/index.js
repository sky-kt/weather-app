const makeApiRequests = async () => {
  try {
    // make API request to forecast weather (7 days)
    const lat = 37.3229978; const lon = -122.0321823
    const locationLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=imperial&appid=daab30e51d1d719de2096678f035d4bf`
    const locationPromise = await fetch(locationLink, { mode: 'cors' })
    const locationJSON = locationPromise.json()
    // act upon data
    locationJSON.then((data) => {
      console.log(data)
    })
    // once returned, act on promise
  } catch (err) {
    alert(err)
  }
}

makeApiRequests()
