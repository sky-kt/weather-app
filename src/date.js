const date = (() => {
  console.log('finding datestuffs')

  const today = () => {
    const today = new Date()
    const todayDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
    console.log(todayDate)
  }

  const appendDates = () => {

  }

  return { today }
})()

export { date }
