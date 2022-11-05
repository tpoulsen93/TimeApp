import { makeStyles } from "@mui/styles"
import { Calendar } from "react-calendar"
import { useCallback, useContext } from "react"
import TileContent from "./TileContent"
import { StoreContext } from "../.."
import theme from "../../theme"
import { observer } from "mobx-react-lite"
import { action } from "mobx"
import { getMonthInfo, getPreviousMonthInfo } from "../../helpers/common"

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
  const { domainStore } = useContext(StoreContext)
  const { fetchHoursByMonth, setCurrentMonth } = domainStore

  const classes = useStyles()

  const handleActivateStartDateChange = action(
    ({ activeStartDate }: { activeStartDate: Date }) => {
      const monthInfo = getMonthInfo(activeStartDate.getMonth() + 1, activeStartDate.getFullYear())
      const previousMonthInfo = getPreviousMonthInfo(monthInfo)
      setCurrentMonth(monthInfo)

      if (!domainStore.monthAlreadyFetched(monthInfo))
        fetchHoursByMonth(monthInfo)
      if (!domainStore.monthAlreadyFetched(previousMonthInfo))
        fetchHoursByMonth(previousMonthInfo)
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
