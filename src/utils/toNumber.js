export default value => {
  if (!value) return ''

  return value.replace(/\D/g, '')
}
