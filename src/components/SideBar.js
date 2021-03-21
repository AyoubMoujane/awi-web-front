import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GamepadIcon from '@material-ui/icons/Gamepad';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import CategoryIcon from '@material-ui/icons/Category';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AuthService from "../services/authentification/auth";
import { getRoutes } from '../routes'
import { MyRoute } from './MyRoute/MyRoute'
import { NotFound } from '../views/NotFound/NotFound'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));



export function SideBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(function () {
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>

        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="white"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Button ><Link to={"/participants"}>Suivi des éditeurs</Link></Button>
            <Button ><Link to={"/"}>Réservations</Link></Button>
            <Button ><Link to={"/"}>Liste des jeux</Link></Button>
            <Button ><Link to={"/"}>Facturation</Link></Button>
            <Button ><Link to={"/"}>Zones du festival</Link></Button>
            {currentUser ? (
              <div>
                <Button color="inherit"><a href="/" onClick={AuthService.logout}>LogOut</a></Button>
              </div>


            ) : (
              <div>
                <Button color="inherit"><Link to={"/login"}>LogIn</Link></Button>
                <Button color="inherit"><Link to={"/register"}>SignUp</Link></Button>

              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Festivals', 'Organisateurs'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <StorefrontIcon /> : <PeopleAltIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Jeux', 'Editeurs', 'Contacts', 'Type de jeux'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{[<GamepadIcon />, <BorderColorIcon />, <PermContactCalendarIcon />, <CategoryIcon />][index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div />
          <Switch>
            {
              getRoutes().map((route, index) => {
                return <MyRoute exact {...route} key={index} />
              })
            }
            <Route component={NotFound} />
          </Switch>
        </main>

      </Router>
    </div>
  );
}
