import { Employee, MonthInfo } from "../../../types"

const capitalizeWord = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1)

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

const formatDate = (day: number, month: number, year: number): string =>
year.toString() + "-" + month.toString().padStart(2, '0') + "-" + day.toString().padStart(2, '0')

const monthsAreTheSame = (m1: MonthInfo, m2: MonthInfo): boolean => {
  return m1.month === m2.month && m1.year === m2.year
}

const getFullName = (employee: Employee) => `${capitalizeWord(employee.firstName)} ${capitalizeWord(employee.lastName)}`

export {
  capitalizeWord,
  getCurrentMonthInfo,
  getMonthInfo,
  getPreviousMonthInfo,
  formatDate,
  monthsAreTheSame,
  getFullName
}
