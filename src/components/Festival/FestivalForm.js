import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { InputAdornment, Input, Paper, Grid, Avatar, Button } from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { DatePicker } from '../Ui/DatePicker'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    paperStyle: { padding: 20, height: '70vh', width: 380, margin: "20px auto" }
  },
}));

export function FestivalForm() {

  const classes = useStyles();
  const [date, setDate] = useState('')
  const [nbTableEntree, setNbTableEntree] = useState('')
  const [nbTableAccueil, setNbTableAccueil] = useState('')
  const [nbTableBuvette, setNbTableBuvette] = useState('')
  const [prixTableEntree, setPrixTableEntree] = useState('')
  const [prixTableAccueil, setPrixTableAccueil] = useState('')
  const [prixTableBuvette, setPrixTableBuvette] = useState('')
  const [prixM2Entree, setPrixM2Entree] = useState('')
  const [prixM2Accueil, setPrixM2Accueil] = useState('')
  const [prixM2Buvette, setPrixM2Buvette] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const paperStyle = { padding: 20, height: '125vh', width: 480, margin: "20px auto" }
  const btnstyle = { margin: '8px 0' }


  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar><AccessibilityNewIcon /></Avatar>
            <h2>Créer un festival</h2>
          </Grid>
          <form className={classes.root} noValidate autoComplete="off" >
            <DatePicker/>
            <TextField id="standard-basic" label="Nom du festival" onChange={(e) => (e.target.value)} />

          </form>
        </Paper>
      </Grid>
    </div>
  );
}
