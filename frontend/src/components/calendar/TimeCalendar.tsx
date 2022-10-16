
import { makeStyles } from "@mui/styles"
import { Calendar } from "react-calendar"
// import { Calendar } from "react-calendar"
import { AppState } from "../../state/state"
import theme from "../../theme"
import TileContent from "./TileContent"

const primary = theme.palette.primary.main
const secondary = theme.palette.secondary.main
const active = theme.palette.action.active
const text = theme.palette.text.primary

const useStyles = makeStyles({
  calendar: {
    color: text,
    width: "90%",
    margin: "24px",
  },
  tiles: {
    backgroundColor: secondary,
    borderColor: active,
    color: text,
  }
})

const TimeCalendar = (props: { state: AppState }) => {
  const { state } = props

  const classes = useStyles()

  return (
      <Calendar
        view="month"
        className={classes.calendar}
        tileClassName={classes.tiles}
        tileContent={({ date }) =>
          <TileContent
            day={date.getDate()}
            month={date.getMonth()}
            year={date.getFullYear()}
            selectedEmployee={state.selectedEmployee}
          />
        }
      />
  )
}

export default TimeCalendar
