import axios from "axios"
import { Employee, HourRow, HoursSubmissionResult, MonthInfo } from "../../../types"

const fetchEmployees = async (): Promise<Employee[]> => {
  console.log("fetchEmployees()")
  const response = await axios.get("/api/employees")
  const employees: Employee[] = response.data
  employees.forEach((employee) => {
    employee.hours = new Map<string, number>()
  })
  return employees
}

const fetchHoursByMonth = async (monthInfo: MonthInfo): Promise<HourRow[]> => {
  console.log(`fetchHoursByMonth(${monthInfo.month}/${monthInfo.year})`)
  const response = await axios.get("/api/employees/hours/month", { params: monthInfo })
  const hours: HourRow[] = response?.data
  return hours
}

const submitDayHours = async (id: number, date: string, hours: number): Promise<HoursSubmissionResult> => {
  console.log(`submitHours(id: ${id}, date: ${date}, hours: ${hours})`)
  const response = await axios.get("api/employees/time/submission", { params: { id, date, hours } })
  return response.data
}

export { fetchEmployees, fetchHoursByMonth, submitDayHours }
