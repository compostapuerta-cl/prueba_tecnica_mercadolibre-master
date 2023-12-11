export function getAuthor () {
  const author = {
    name: process.env.NAME,
    lastname: process.env.LAST_NAME
  }

  return author
}

export function getDecimals (number, decimalSeparator) {
  if (Math.floor(number) === number) return '00'

  return String(number.toString().split(decimalSeparator)[1])
}
