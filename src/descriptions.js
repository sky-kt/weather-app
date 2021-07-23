const descriptions = (() => {
  const create = (extremeArray) => {
    console.log('creating')
    for (const item in extremeArray) {
      console.log(item)
    }
  }
  return { create }
})()

export { descriptions }
