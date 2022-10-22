
import { useCallback, useContext } from "react"
import { makeStyles } from "@mui/styles"
import { Calendar } from "react-calendar"
import { ReducerContext } from "../../App"
import { getEmployeesHoursByMonth } from "../../requests/serverRequestManager"
import { AppState } from "../../state/state"
import { ReducerActions } from "../../state/stateReducer"
import theme from "../../theme"
import TileContent from "./TileContent"

const useStyles = makeStyles({
  calendar: {
    color: theme.palette.primary.main,
    width: "90%",
    marginTop: "24px",
  },
  tiles: {
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.action.active,
    color: theme.palette.text.primary,
  }
})

const TimeCalendar = (props: { state: AppState }) => {
  const { state } = props
  const { dispatcher } = useContext(ReducerContext)
  const classes = useStyles()

  const handleActivateStartDateChange = useCallback(async ({ activeStartDate }: { activeStartDate: Date }) => {
    const month = activeStartDate.getMonth() + 1
    const year = activeStartDate.getFullYear()
    const hours = await getEmployeesHoursByMonth(month, year)
    dispatcher({ type: ReducerActions.AddEmployeesHours, payload: hours })
  }, [dispatcher])

  const tileContent = useCallback(({ date }: { date: Date }) =>
    <TileContent
      day={date.getDate()}
      month={date.getMonth()}
      year={date.getFullYear()}
      employees={state.employees}
      selectedEmployee={state.selectedEmployee}
    />, [state.employees, state.selectedEmployee])

  return (
    <Calendar
      view="month"
      className={classes.calendar}
      onActiveStartDateChange={handleActivateStartDateChange}
      tileClassName={classes.tiles}
      tileContent={tileContent}
    />
  )
}

export default TimeCalendar
