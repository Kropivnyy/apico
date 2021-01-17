export const getUserShortName = (name) => {
  if (!name) return
  const splitted = name.split(' ')
  return splitted.length > 1
    ? handleMultiWords(splitted.slice(0, 2))
    : handleOneWord(name)
}
const handleMultiWords = (array) => {
  return array
    .map((elem) => elem[0])
    .join('')
    .toUpperCase()
}
const handleOneWord = (name) => {
  return name.slice(0, 2)
}
