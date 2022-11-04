import { makeStyles } from "@mui/styles"
import { Calendar } from "react-calendar"
import { useCallback, useContext } from "react"
import { fetchEmployeesHoursByMonth } from "../../requests/serverRequests"
import TileContent from "./TileContent"
import { StoreContext } from "../.."
import theme from "../../theme"
import { observer } from "mobx-react-lite"
import { action } from "mobx"

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

const TimeCalendar = () => {
  const { appStore, domainStore } = useContext(StoreContext)
  const { addEmployeeHours, addMonthFetched } = domainStore
  const { setCurrentMonth } = appStore

  const classes = useStyles()

  const handleActivateStartDateChange = action(
    async ({ activeStartDate }: { activeStartDate: Date }) => {
      const month = activeStartDate.getMonth() + 1
      const year = activeStartDate.getFullYear()
      setCurrentMonth(month, year)

      if (!domainStore.monthAlreadyFetched(month, year)) {
        const hours = await fetchEmployeesHoursByMonth(month, year)
        if (hours) {
          addMonthFetched(month, year)
          addEmployeeHours(hours)
        }
      }
    }
  )

  const tileContent = useCallback(({ date }: { date: Date }) =>
    <TileContent
      day={date.getDate()}
      month={date.getMonth()}
      year={date.getFullYear()}
    />, [])

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

export default observer(TimeCalendar)
