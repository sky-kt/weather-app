const makeApiRequests = async () => {
  try {
    // make API request to forecast London weather
    const locationLink = 'http://api.openweathermap.org/data/2.5/forecast/?q=Cupertino&units=imperial&appid=daab30e51d1d719de2096678f035d4bf'
    // wait for all APIs to come back
    const locationPromise = await Promise.all([fetch(locationLink, { mode: 'cors' })])
    const locationJson = locationPromise[0].json()

    // finally view forecast
    locationJson.then((finalPromise) => {
      // console.log(finalPromise)
      const rawArrays = finalPromise.list
      const organizedArrays = []
      for (const info in rawArrays) {
        // A) Time array must have values.
        // B) The times have to be the same.
        if (organizedArrays[0] && rawArrays[info].dt_txt.slice(0, 10) === organizedArrays[organizedArrays.length - 1][0].dt_txt.slice(0, 10)) {
          organizedArrays[organizedArrays.length - 1].push(rawArrays[info])
        } else {
          organizedArrays.push([rawArrays[info]])
        }
      }
      console.log('organizedArrays', organizedArrays)
      averageInfo(organizedArrays)
    })
  } catch (err) {
    alert(err)
  }
}

const averageInfo = (dayArrays) => {
  console.log('averaging info now...')
}

makeApiRequests()
