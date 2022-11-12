import { action } from "mobx"
import { useContext } from "react"
import { observer } from "mobx-react-lite"
import { Divider, Drawer, List, ListItem, ListItemButton, Toolbar } from "@mui/material"
import { StoreContext } from ".."
import theme from "../theme"

const EmployeesDrawer = () => {
  const { appStore, domainStore } = useContext(StoreContext)
  const { employeeDrawerIsOpen, setSelectedEmployee, setEmployeeDrawerIsOpen } = appStore
  const { employees } = domainStore

  const closeEmployeeDrawer = action(() => setEmployeeDrawerIsOpen(false))
  const deselectEmployee = action(() => setSelectedEmployee(null))

  return (
    <Drawer
      anchor="left"
      open={employeeDrawerIsOpen}
      onClose={closeEmployeeDrawer}
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
              <ListItemButton onClick={action(() => setSelectedEmployee(employee))}>
                {employee.fullName}
              </ListItemButton>
            </ListItem>
        )}
      </List>
    </Drawer>
  )
}

export default observer(EmployeesDrawer)
