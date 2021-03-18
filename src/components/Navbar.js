import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AuthService from "../services/authentification/auth";
import { getRoutes } from '../routes'
import { MyRoute } from './MyRoute/MyRoute'
import { NotFound } from '../views/NotFound/NotFound'


import clsx from 'clsx';











const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function NavBar(props) {
  const user = AuthService.getCurrentUser()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <div className={classes.root}>
    <Router>
      <AppBar position="static" color = "transparent" className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
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
          <Button ><Link to={"/home"}>Suivi des éditeurs</Link></Button>
          <Button ><Link to={"/home"}>Réservations</Link></Button>
          <Button ><Link to={"/home"}>Liste des jeux</Link></Button>
          <Button ><Link to={"/home"}>Facturation</Link></Button>
          <Button ><Link to={"/home"}>Zones du festival</Link></Button>
          {user ? (
            <div>
            <Button color="inherit"><a href="/" onClick={AuthService.logout}>LogOut</a></Button>
            </div>
          
          
          ) : (
            <div>
            <Button color="inherit"><Link to={"/login"}>LogIn</Link></Button>
            <Button color="inherit"><Link to={"/register"}>SignIn</Link></Button>
            
            </div>
            )}
        </Toolbar>
      </AppBar>
      <Switch>
              {
                getRoutes().map((route, index) => {
                  return <MyRoute exact {...route} key={index} />
                })
              }
              <Route component={NotFound} />
      </Switch>
      </Router>
      
    </div>
  );
}
