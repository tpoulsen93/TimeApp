
type Employee = {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  supervisorID: number
  fullName: string
  hours: Map<string, number> // Map<date, hours>
}

type HourRow = {
  date: string
  hours: number
  id: number
}

type MonthInfo = {
  month: number
  year: number
}

export type { Employee, HourRow, MonthInfo }
