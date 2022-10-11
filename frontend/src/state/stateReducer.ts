
import { Employee } from "../../../types"
import { AppState } from "./state"

type Action = {
  type: ReducerActions,
  payload: any
}

enum ReducerActions {
  SetSelectedEmployee = "SetSelectedEmployee",
  SetEmployees = "SetEmployees",
  ToggleEmployeeDrawer = "ToggleEmployeesDrawer",
  // AddEmployeesHours = "AddEmployeesHours",
}

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ReducerActions.SetSelectedEmployee:
      const employee: Employee = action.payload
      return {
        ...state,
        selectedEmployee: employee
      }

    case ReducerActions.SetEmployees:
      const employees: Employee[] = action.payload
      employees.forEach((employee) => employee.hours = new Map<string, number>())
      return {
        ...state,
        employees: employees
      }

    // case ReducerActions.AddEmployeesHours:
    //   const hours: HourRow[] = action.payload
    //   hours.forEach((row: HourRow) =>
    //     state?.employees.find((employee) => employee.id === row.id).hours.set(row.date, row.hours)
    //   )

    case ReducerActions.ToggleEmployeeDrawer:
      return {
        ...state,
        openEmployeeDrawer: !state.openEmployeeDrawer
      }

    default:
      return state
  }
}

export type { Action }
export { reducer, ReducerActions }
