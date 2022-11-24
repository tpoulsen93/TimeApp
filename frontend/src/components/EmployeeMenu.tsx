import { action } from "mobx"
import { makeStyles } from "@mui/styles"
import { observer } from "mobx-react-lite"
import { ChangeEvent, MouseEvent, useCallback, useState } from "react"
import { Box, Button, ClickAwayListener, Popover, TextField } from "@mui/material"
import { convertDateToString, getFullName } from "../helpers/common"
import { useStores } from ".."

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
  const { optionsAnchorEl, selectedDate, selectedEmployee, setSnackbarMessage, setSnackbarIsOpen, setSelectedDate, setOptionsAnchorEl } = appStore
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

  const handleSubmit = action(async (e: MouseEvent<HTMLButtonElement>) => {
    if (!selectedEmployee) return
    closeOptions()

    const date = convertDateToString(selectedDate!)
    setSnackbarMessage(`Submitting ${hours} hours for ${getFullName(selectedEmployee)} on ${date}`)
    setSnackbarIsOpen(true)

    const response = await submitHours(selectedEmployee.id, date, parseFloat(hours))
    setSnackbarMessage(response)
    setSnackbarIsOpen(true)

    setHours("")
  })

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
