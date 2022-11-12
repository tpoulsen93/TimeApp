import { MonthInfo } from "types"

const getMonthStart = (month: number, year: number): string =>
  year + "-" + month.toString().padStart(2, '0') + "-01"

const getNextMonthStart = (month: number, year: number): string =>
  getMonthStart(month === 12 ? 1 : month + 1 , month === 12 ? year + 1 : year)

const getMonthInfoString = (month: number, year: number) =>
  `${month}/${year}`

export { getMonthStart, getNextMonthStart, getMonthInfoString }
