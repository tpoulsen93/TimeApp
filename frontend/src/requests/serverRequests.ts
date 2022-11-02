import axios from "axios"
import { Employee, HourRow } from "../../../types"
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

const fetchEmployeesHoursByMonth = async (month: number, year: number): Promise<HourRow[]> => {
  console.log("fetchEmployeesHoursByMonth()")
  const response = await axios.get("/api/employees/hours/month", { params: { month: month, year: year } })
  const hours: HourRow[] = response?.data
  return hours
}

export { fetchEmployees, fetchEmployeesHoursByMonth }
