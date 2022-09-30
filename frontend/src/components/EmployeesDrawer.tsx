
import { Drawer, Toolbar } from "@mui/material"
import { useContext } from "react"
import { ReducerContext } from "../App"
import { ReducerActions } from "../state/stateReducer"

const EmployeesDrawer = () => {
  const { state, dispatcher } = useContext(ReducerContext)

  return (
    <Drawer
      anchor="left"
      open={state.openEmployeeDrawer}
      onClose={() => dispatcher(
        { type: ReducerActions.ToggleEmployeeDrawer, payload: false}
      )}
      sx={{ width: 240 }}
    >
      <Toolbar>

      </Toolbar>
    </Drawer>
  )
}

export default EmployeesDrawer
