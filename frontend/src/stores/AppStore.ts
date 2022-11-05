
import { makeAutoObservable } from "mobx";
import { Employee } from "../../../types";
import { RootStore } from "./RootStore";

export class AppStore {
  root: RootStore
  employeeDrawerIsOpen: boolean
  selectedEmployee: Employee | null
  calendarIsLoading: boolean

  constructor(root: RootStore) {
    makeAutoObservable(this, {}, { autoBind: true })
    this.root = root
    this.employeeDrawerIsOpen = false
    this.selectedEmployee = null
    this.calendarIsLoading = true

    this.initialize()
  }

  setEmployeeDrawerIsOpen(isOpen: boolean) {
    this.employeeDrawerIsOpen = isOpen
  }

  setSelectedEmployee(employee: Employee | null) {
    this.selectedEmployee = employee
  }

  setCalendarIsLoading(isLoading: boolean) {
    this.calendarIsLoading = isLoading
  }

  private initialize() {}
}
