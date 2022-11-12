import axios from "axios"
import { Employee, HourRow, MonthInfo } from "../../../types"
import { capitalizeWord } from "../helpers/common"

const fetchEmployees = async (): Promise<Employee[]> => {
  console.log("fetchEmployees()")
  const response = await axios.get("/api/employees")
  const employees: Employee[] = response.data
  employees.forEach((employee) => {
    employee.fullName = capitalizeWord(employee.firstName) + " " + capitalizeWord(employee.lastName)
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

export { fetchEmployees, fetchHoursByMonth }
