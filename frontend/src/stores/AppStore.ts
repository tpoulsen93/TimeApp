
import { makeAutoObservable } from "mobx";
import { Employee } from "../../../types";
import { RootStore } from "./RootStore";

export class AppStore {
  root: RootStore
  calendarIsLoading: boolean
  employeeDrawerIsOpen: boolean
  optionsAnchorEl: HTMLButtonElement | null
  selectedDate: Date | null
  selectedEmployee: Employee | null

  constructor(root: RootStore) {
    makeAutoObservable(this, { root: false }, { autoBind: true })
    this.root = root
    this.calendarIsLoading = true
    this.employeeDrawerIsOpen = false
    this.optionsAnchorEl = null
    this.selectedDate = null
    this.selectedEmployee = null
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

  setOptionsAnchorEl(element: HTMLButtonElement | null) {
    this.optionsAnchorEl = element
  }

  setSelectedDate(date: Date | null) {
    this.selectedDate = date
  }
}
