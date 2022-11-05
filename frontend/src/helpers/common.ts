import { MonthInfo } from "../../../types"

const getMonthInfo = (month: number, year: number): MonthInfo => ({ month, year })

const getCurrentMonthInfo = (): MonthInfo => {
  const today = new Date()
  return { month: today.getMonth() + 1, year: today.getFullYear() }
}

const getPreviousMonthInfo = (monthInfo: MonthInfo): MonthInfo => {
  const { month, year } = monthInfo
  const previousMonth = month === 1 ? 12 : month - 1
  const previousMonthsYear = month === 1 ? year - 1 : year
  return { month: previousMonth, year: previousMonthsYear }
}

const capitalizeWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1)

const formatDate = (day: number, month: number, year: number): string =>
  year.toString() + "-" + month.toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0')

export { capitalizeWord, getCurrentMonthInfo, getMonthInfo, getPreviousMonthInfo, formatDate }
