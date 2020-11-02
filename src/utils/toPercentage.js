export default value => {
  if (!value) {
    return ''
  }

  return (value * 100).toFixed(2).replace('.', ',')
}
