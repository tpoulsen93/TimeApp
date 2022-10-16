
import { Divider, Drawer, List, ListItem, ListItemButton, Toolbar } from "@mui/material"
import React, { useContext } from "react"
import { ReducerActions } from "../state/stateReducer"
import { ReducerContext } from "../App"
import theme from "../theme"
import { Employee } from "../../../types"

const EmployeesDrawer = (props: { employees: { [id: number]: Employee }, isOpen: boolean }) => {
  const { employees, isOpen } = props
  const { dispatcher } = useContext(ReducerContext)

  const selectEmployee = (employee: Employee) => {
    dispatcher({ type: ReducerActions.SetSelectedEmployee, payload: employee })
  }

  const deselectEmployee = () => {
    dispatcher({ type: ReducerActions.SetSelectedEmployee, payload: null })
  }

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => dispatcher(
        { type: ReducerActions.ToggleEmployeeDrawer, payload: false}
      )}
    >
      <Toolbar sx={{ backgroundColor: theme.palette.primary.main, fontSize: 18, justifyContent: "center", color: "white" }}>
        Employees
      </Toolbar>
      <Divider variant="middle" />
      <List sx={{ backgroundColor: theme.palette.primary.main }}>
        <ListItem>
          <ListItemButton onClick={deselectEmployee} sx={{ color: "white" }}>
            None
          </ListItemButton>
        </ListItem>
        {Object.values(employees)
          .sort((e1, e2) => e1.lastName.localeCompare(e2.lastName))
          .map((employee) =>
            <ListItem key={employee.id} sx={{ color: "white" }}>
              <ListItemButton onClick={() => selectEmployee(employee)}>
                {employee.fullName}
              </ListItemButton>
            </ListItem>
        )}
      </List>
    </Drawer>
  )
}

export default EmployeesDrawer
