import { action } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Menu, Person } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useStores } from '..';
import { getFullName } from '../helpers/common';

const NavBar = () => {
  const { appStore } = useStores()
  const { selectedEmployee, setEmployeeDrawerIsOpen } = appStore

  const currentEmployee = selectedEmployee === null
    ? <Person sx={{ color: "white" }} />
    : getFullName(selectedEmployee)

  const handleClick = action(() => setEmployeeDrawerIsOpen(true))

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ marginRight: 4 }}
            onClick={handleClick}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TP Time App
          </Typography>
          <Button color="inherit" sx={{ display: "flex", justifySelf: "flex-end" }}>
            {currentEmployee}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default observer(NavBar)
