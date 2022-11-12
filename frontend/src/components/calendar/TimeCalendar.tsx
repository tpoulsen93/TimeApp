import { makeStyles } from "@mui/styles"
import { Calendar } from "react-calendar"
import { useCallback, useContext, MouseEvent } from "react"
import TileContent from "./TileContent"
import { StoreContext } from "../.."
import theme from "../../theme"
import { observer } from "mobx-react-lite"
import { action } from "mobx"
import { getMonthInfo, getPreviousMonthInfo } from "../../helpers/common"
import { Box, CircularProgress } from "@mui/material"

const useStyles = makeStyles({
  calendar: {
    color: theme.palette.primary.main,
    width: "90%",
    marginTop: "24px",
  },
  tiles: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.action.active,
    color: theme.palette.text.primary,
  }
})

const TimeCalendar = () => {
  const { domainStore, appStore } = useContext(StoreContext)
  const { fetchMonthsHours, setCurrentMonth } = domainStore
  const { calendarIsLoading, setSelectedDate, setOptionsAnchorEl } = appStore

  const classes = useStyles()

  const handleActivateStartDateChange = action(
    ({ activeStartDate }: { activeStartDate: Date }) => {
      const monthInfo = getMonthInfo(activeStartDate.getMonth() + 1, activeStartDate.getFullYear())
      const previousMonthInfo = getPreviousMonthInfo(monthInfo)
      setCurrentMonth(monthInfo)

      if (!domainStore.monthAlreadyFetched(monthInfo))
        fetchMonthsHours(monthInfo)
      if (!domainStore.monthAlreadyFetched(previousMonthInfo))
        fetchMonthsHours(previousMonthInfo)
    }
  )

  const handleClickDay = action((date: Date, event: MouseEvent<HTMLButtonElement>) => {
    setSelectedDate(date)
    setOptionsAnchorEl(event.currentTarget)
  })

  const tileContent = useCallback(({ date }: { date: Date }) =>
    <TileContent
      day={date.getDate()}
      month={date.getMonth()}
      year={date.getFullYear()}
    />, [])

  return (calendarIsLoading)
    ? <CircularProgress color="info" size={100} thickness={2} sx={{ marginTop: 30 }}/>
    : <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Calendar
          view="month"
          className={classes.calendar}
          onActiveStartDateChange={handleActivateStartDateChange}
          onClickDay={handleClickDay}
          tileClassName={classes.tiles}
          tileContent={tileContent}
        />
      </Box>
}

export default observer(TimeCalendar)
