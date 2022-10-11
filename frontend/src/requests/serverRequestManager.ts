
import axios from "axios"
import { Employee, HourRow } from "../../../types"
import { capitalizeWord } from "../helpers/common"

const getEmployees = async (): Promise<Employee[]> => {
  console.log("getEmployees()")
  const response = await axios.get("/api/employees")
  const employees: Employee[] = response.data
  employees.forEach((employee) => {
    employee.fullName = capitalizeWord(employee.firstName) + " " + capitalizeWord(employee.lastName)
    employee.hours = new Map<string, number>()
  })
  return employees
}

const getEmployeesHoursByMonth = async (month: number, year: number): Promise<HourRow[]> => {
  console.log("getEmployeesHoursByMonth()")
  const response = await axios.get("/api/employees/hours/month", { params: { month: month, year: year } })
  const hours: HourRow[] = response?.data
  return hours
}

export { getEmployees, getEmployeesHoursByMonth }
