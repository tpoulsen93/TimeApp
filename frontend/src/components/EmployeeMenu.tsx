import { action } from "mobx"
import { makeStyles } from "@mui/styles"
import { observer } from "mobx-react-lite"
import { ChangeEvent, MouseEvent, useCallback, useState } from "react"
import { Box, Button, ClickAwayListener, Popover, TextField } from "@mui/material"
import { useStores } from ".."
import { convertDateToString } from "../helpers/common"

const useStyles = makeStyles({
  box: {
    backgroundColor: "white",
    margin: 12,
    alignItems: "center",
    display: "flex"
  },
})

const EmployeeMenu = () => {
  const { appStore, domainStore } = useStores()
  const { setSelectedDate, setOptionsAnchorEl, optionsAnchorEl, selectedDate, selectedEmployee } = appStore
  const { submitHours } = domainStore

  const [hours, setHours] = useState<string>("")
  const classes = useStyles()

  const closeOptions = action(() => {
    setSelectedDate(null)
    setOptionsAnchorEl(null)
  })

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setHours(e.target.value)
  }, [])

  const handleSubmit = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
    if (!selectedEmployee) return
    closeOptions()

    const response = await submitHours(selectedEmployee.id, convertDateToString(selectedDate!), parseFloat(hours))
    alert(response)
    setHours("")
  }, [closeOptions, hours, selectedDate, selectedEmployee, submitHours])

  return (
    <Popover
      open={optionsAnchorEl !== null}
      anchorEl={optionsAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center"}}
    >
      <ClickAwayListener onClickAway={closeOptions}>
        <Box className={classes.box} component="form">
          <TextField
            sx={{ marginRight: "6px" }}
            variant="outlined"
            color="primary"
            label="Submit Hours"
            onChange={handleChange}
          />
          <Button
            sx={{ flex: 1 }}
            color="secondary"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </ClickAwayListener>
    </Popover>
  )
}

export default observer(EmployeeMenu)
