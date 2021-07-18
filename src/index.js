const makeApiRequests = async () => {
  try {
    const lat = 37.3229978; const lon = -122.0321823

    // make API request to forecast weather (7 days)
    const locationLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=imperial&appid=daab30e51d1d719de2096678f035d4bf`
    const locationPromise = await fetch(locationLink, { mode: 'cors' })
    const locationJSON = locationPromise.json()

    // act upon data
    locationJSON.then((data) => {
      console.log(data)
      findExtremes(data)
    })
  } catch (err) {
    alert(err)
  }
}

const findExtremes = (data) => {
  const weekArray = data.daily
  console.log(weekArray)
  const organizedArray = []
  for (const day in weekArray) {
    organizedArray.push({
      day,
      dayTemp: weekArray[day].temp.day,
      nightTemp: weekArray[day].temp.night,
      weatherVag: weekArray[day].weather[0].main,
      weatherDes: weekArray[day].weather[0].description
    })
  }
  console.log(organizedArray)
}

makeApiRequests()
