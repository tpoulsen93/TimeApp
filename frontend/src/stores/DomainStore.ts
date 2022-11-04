import { makeAutoObservable } from "mobx";
import { fetchEmployees, fetchEmployeesHoursByMonth } from "../requests/serverRequests";
import { Employee, HourRow, MonthInfo } from "../../../types";
import { RootStore } from "./RootStore";

export class DomainStore {
  root: RootStore
  employees: { [id: number]: Employee }
  monthsFetched: MonthInfo[]

  constructor(root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
    this.root = root
    this.employees = {}
    this.monthsFetched = []

    this.initialize()
  }

  async initialize() {
    await this.initializeEmployees()
  }

  addEmployeeHours(hours: HourRow[]) {
    hours.forEach((row) =>
      this.employees[row.id].hours.set(row.date.slice(0, 10), row.hours))
  }

  addEmployee(employee: Employee) {
    this.employees[employee.id] = employee
  }

  addMonthFetched(month: number, year: number) {
    this.monthsFetched.push({ month: month, year: year })
  }

  monthAlreadyFetched(month: number, year: number): boolean {
    return this.monthsFetched.some((mi) => mi.month === month && mi.year === year)
  }

  private async initializeEmployees() {
    // fetch the employees
    const employees = await fetchEmployees()
    employees.forEach((employee) => this.addEmployee(employee))

    // fetch the hours and add them
    const today = new Date()
    const thisMonth = today.getMonth() + 1
    const thisYear = today.getFullYear()
    const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1
    const lastMonthsYear = thisMonth === 1 ? thisYear - 1 : thisYear

    this.addEmployeeHours(await fetchEmployeesHoursByMonth(thisMonth, thisYear))
    this.addMonthFetched(thisMonth, thisYear)

    // let the calendar render as soon as we have the current month
    this.root.appStore.setCalendarIsLoading(false)

    this.addEmployeeHours(await fetchEmployeesHoursByMonth(lastMonth, lastMonthsYear))
    this.addMonthFetched(lastMonth, lastMonthsYear)

  }
}
