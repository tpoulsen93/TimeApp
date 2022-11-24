import { PoolClient } from "pg";
import { getMonthStart, getNextMonthStart } from "./common"
import { Employee, HourRow } from "../types"
import axios from "axios"

const fetchEmployees = async (client: PoolClient): Promise<Employee[]> => {
  const response = await client.query('SELECT * FROM employees')
  const employees = response.rows
    .filter((row) => row.first_name !== "admin")
    .map((row) => {
      return {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        phone: row.phone,
        email: row.email,
        supervisorID: row.supervisorID,
      } as Employee
    })

  return employees
}

const getHoursByMonth = async (client: PoolClient, month: number, year: number) => {
  const response = await client.query(
    `SELECT id, date, time as hours FROM payroll
    WHERE date >= '${getMonthStart(month, year)}'AND date < '${getNextMonthStart(month, year)}'`
  )

  return response.rows as HourRow[]
}

const submitHoursToTimeBot = async (id: number, date: string, hours: number) => {
  console.log(`submitting hours -> { id: ${id}, date: ${date}, hours: ${hours}}`)
  const response = await axios.get("https://pcc-time-bot.herokuapp.com/submitHours", { params: { id, date, hours } })
  const message = String(response.data)

  if (message.includes("Submitted") || message.includes("Updated"))
    return { message, result: true }

  return { message, result: false }
}

export { fetchEmployees, getHoursByMonth, submitHoursToTimeBot }
