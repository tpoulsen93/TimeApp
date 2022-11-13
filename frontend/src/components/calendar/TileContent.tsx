import { useContext } from "react"
import { makeStyles } from "@mui/styles"
import { observer } from "mobx-react-lite"
import { Typography } from "@mui/material"
import { formatDate } from "../../helpers/common"
import { StoreContext } from "../.."

const useStyles = makeStyles({
  tile: {
    height: `${8}vh`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
  },
})

const TileContent = (props: { day: number, month: number, year: number }) => {
  const { day, month, year } = props

  const { appStore, domainStore } = useContext(StoreContext)
  const { employees } = domainStore
  const { selectedEmployee } = appStore

  const classes = useStyles()

  const hours = selectedEmployee
    ? selectedEmployee.hours.get(formatDate(day, month+1, year)) ?? 0
    : Object.values(employees).reduce(
        (sum, employee) => sum + (employee.hours.get(formatDate(day, month+1, year)) ?? 0),
        0
      )

  return (
    <div className={classes.tile}>
      <Typography>{hours > 0 ? `${hours.toString().slice(0, 5)} hours` : ""}</Typography>
    </div>
  )
}

export default observer(TileContent)
