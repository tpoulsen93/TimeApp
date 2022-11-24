type Employee = {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  supervisorID: number
  hours: Map<string, number> // Map<date, hours>
}

type HourRow = {
  date: string
  hours: number
  id: number
}

type HoursSubmissionResult = {
  message: string
  result: boolean
}

type MonthInfo = {
  month: number
  year: number
}

export type { Employee, HourRow, HoursSubmissionResult, MonthInfo }
