import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ZoneDetail from './ZoneDetail'
import ZoneService from "../../services/Zone/Zone"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function ZoneList() {
  const classes = useStyles();
  const [zones, setZones] = useState([])

  const fetch = () => {
    ZoneService.findAll()
        .then(data => {
            setZones(data)          
        })
        .catch(err => {
            console.log(err)
        })
    }
    useEffect(fetch, []);
  

  return (
    <div className={classes.root}>
      
      <Grid container spacing={2}>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Liste des zones
          </Typography>
          <div className={classes.demo}>
            <List>
              {
                zones.map((z) => { return <ZoneDetail zone = {z}></ZoneDetail>})
              }
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
