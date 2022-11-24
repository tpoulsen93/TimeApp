import { action } from "mobx"
import { Snackbar } from "@mui/material"
import { observer } from "mobx-react-lite"
import { useStores } from ".."

const SubmissionSnackbar = () => {
  const { appStore } = useStores()
  const { snackbarMessage, snackbarIsOpen, setSnackbarIsOpen } = appStore

  return (
    <Snackbar
      open={snackbarIsOpen}
      autoHideDuration={6000}
      onClose={action(() => setSnackbarIsOpen(false))}
      message={snackbarMessage}
    />
  )
}

export default observer(SubmissionSnackbar)
