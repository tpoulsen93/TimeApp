
import { Divider, Drawer, List, ListItem, ListItemButton, Toolbar } from "@mui/material"
import { useContext } from "react"
import { ReducerContext } from "../App"
import { capitalizeWord } from "../helpers/common"
import { ReducerActions } from "../state/stateReducer"
import theme from "../theme"

const EmployeesDrawer = () => {
  const { state, dispatcher } = useContext(ReducerContext)

  return (
    <Drawer
      anchor="left"
      open={state.openEmployeeDrawer}
      onClose={() => dispatcher(
        { type: ReducerActions.ToggleEmployeeDrawer, payload: false}
      )}
      sx={{ width: 300 }}
    >
      <Toolbar sx={{ backgroundColor: theme.palette.primary.main, fontSize: 18, justifyContent: "center" }}>
        Employees
      </Toolbar>
      <Divider variant="middle" />
      <List sx={{ backgroundColor: theme.palette.primary.main }}>
        {state.employees.length > 0 && (
          state.employees.map((employee) =>
            <ListItem key={employee.id} sx={{ color: "white" }}>
              <ListItemButton>
                {capitalizeWord(employee.firstName) + " " + capitalizeWord(employee.lastName)}
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  )
}

export default EmployeesDrawer
