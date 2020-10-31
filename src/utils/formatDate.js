export default value => {
  if (!value) return ''

  const [year, month, day] = value.split(' ')[0].split('-')

  if (typeof value === 'string') {
    const date = new Date(year, month - 1, day)

    return date.toLocaleDateString('pt-BR')
  }

  return new Date(value).toLocaleDateString('pt-BR')
}
