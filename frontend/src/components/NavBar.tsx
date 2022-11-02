import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu, Person } from '@mui/icons-material';
import { useContext } from 'react';
import { StoreContext } from '..';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';

const NavBar = observer(() => {
  const { appStore } = useContext(StoreContext)
  const { selectedEmployee, setEmployeeDrawerIsOpen } = appStore

  const currentEmployee = selectedEmployee === null
    ? <Person sx={{ color: "white" }} />
    : selectedEmployee.fullName

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
})

export default NavBar
