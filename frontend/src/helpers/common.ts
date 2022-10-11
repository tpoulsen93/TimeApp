
const capitalizeWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1)

const formatDate = (day: number, month: number, year: number): string =>
  year.toString() + "-" + month.toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0')

export { capitalizeWord, formatDate }
