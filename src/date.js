const date = (() => {
  console.log('finding datestuffs')

  const futureDate = (idx) => {
    // find current date
    const today = new Date()
    const tomorrow = new Date(today)
    const newDayNumber = tomorrow.getDate() + idx
    tomorrow.setDate(newDayNumber)

    // find current day name
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDayNumber = dayNames[tomorrow.getDay()]
    return [currentDayNumber, `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}`]
  }

  return { futureDate }
})()

export { date }
