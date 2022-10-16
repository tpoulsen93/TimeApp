import { makeStyles } from "@mui/styles"
import { Employee } from "../../../../types"
import { formatDate } from "../../helpers/common"

const useStyles = makeStyles({
  tile: {
    height: `${10}vh`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
})

const TileContent = (props: { day: number, month: number, year: number, selectedEmployee: Employee | null }) => {
  const { day, month, year, selectedEmployee } = props

  const classes = useStyles()

  const hours = selectedEmployee?.hours.get(formatDate(day, month+1, year)) ?? 0

  return (
    <div className={classes.tile}>
      {hours > 0 ? `${hours} hours` : ""}
    </div>
  )
}

export default TileContent
