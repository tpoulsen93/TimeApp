import { makeAutoObservable } from "mobx";
import { fetchEmployees } from "../requests/serverRequests";
import { getCurrentMonthInfo, getPreviousMonthInfo } from "../helpers/common";
import { Employee, HourRow, MonthInfo } from "../../../types";
import { RootStore } from "./RootStore";
import axios from "axios";

export class DomainStore {
  root: RootStore
  employees: { [id: number]: Employee }
  monthsFetched: MonthInfo[]
  currentMonth: MonthInfo

  constructor(root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
    this.root = root
    this.employees = {}
    this.monthsFetched = []
    this.currentMonth = {} as MonthInfo


    this.initialize()
  }

  addEmployee(employee: Employee) {
    this.employees[employee.id] = employee
  }

  addMonthFetched(month: MonthInfo) {
    this.monthsFetched.push(month)
  }

  setCurrentMonth(month: MonthInfo) {
    this.currentMonth = month
  }

  monthAlreadyFetched(monthInfo: MonthInfo): boolean {
    const { month, year } = monthInfo
    return this.monthsFetched.some((mi) => mi.month === month && mi.year === year)
  }

  *fetchHoursByMonth(monthInfo: MonthInfo): any {
    if (!this.monthAlreadyFetched(monthInfo)) {
      this.addMonthFetched(monthInfo)
      const { month, year } = monthInfo
      console.log(`fetchEmployeesHoursByMonth(${month}/${year})`)

      const response = yield axios.get("/api/employees/hours/month", { params: monthInfo })
      const hours: HourRow[] = response?.data
      hours.forEach((row) =>
      this.employees[row.id].hours.set(row.date.slice(0, 10), row.hours))
    }
  }

  private *initialize(): any {
    this.currentMonth = getCurrentMonthInfo()

    // fetch the employees
    const employees: Employee[] = yield fetchEmployees()
    employees.forEach((employee) => this.addEmployee(employee))

    // fetch the hours and add them
    const currentMonth = getCurrentMonthInfo()
    yield this.fetchHoursByMonth(currentMonth)
    this.addMonthFetched(currentMonth)

    const lastMonth = getPreviousMonthInfo(currentMonth)
    yield this.fetchHoursByMonth(lastMonth)
    this.addMonthFetched(lastMonth)

    this.root.appStore.setCalendarIsLoading(false)
  }
}
