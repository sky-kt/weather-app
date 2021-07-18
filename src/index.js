const makeApiRequests = async () => {
  // make API request to forecast London weather
  const testingLink = 'http://api.openweathermap.org/data/2.5/forecast/?q=Cupertino&units=imperial&appid=daab30e51d1d719de2096678f035d4bf'
  // wait for all APIs to come back
  const linkArray = await Promise.all([fetch(testingLink, { mode: 'cors' })])
  const testingJson = linkArray[0].json()
  // finally view forecast
  testingJson.then((finalPromise) => {
    console.log(finalPromise)
  })
}

makeApiRequests()
