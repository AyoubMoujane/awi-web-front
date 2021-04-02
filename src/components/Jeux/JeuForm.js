import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { InputAdornment, Input, Paper, Grid, Avatar, Button } from '@material-ui/core';
import GamepadIcon from '@material-ui/icons/Gamepad';
import JeuService from "../../services/jeu/jeu"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const bool = [
  {
    value: 'true',
    label: 'Oui',
  },
  {
    value: 'false',
    label: 'Non',
  }
];



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    paperStyle: { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  },
}));

export default function JeuForm() {

  const classes = useStyles();
  const [nom, setNom] = useState('')
  const [nbMin, setNbMin] = useState(1)
  const [nbMax, setNbMax] = useState(1)
  const [age, setAge] = useState(4)
  const [duree, setDuree] = useState(30)
  const [prototype, setPrototype] = useState(false)
  const [type, setType] = useState('')
  const [editeur, setEditeur] = useState(null)
  const [consigne, setConsigne] = useState('')
  const [editeurs, setEditeurs] = useState([])
  const [jeuTypes, setJeuTypes] = useState([])
  const handleChange = (event) => {
    setPrototype(event.target.value);
  };

const fetch = () => {
  JeuService.getEditeurs()
      .then(data => {
          setEditeurs(data)          
      })
      .catch(err => {
          console.log(err)
      })
      JeuService.getJeuType()
      .then(data => {
          setJeuTypes(data)        
      })
      .catch(err => {
          console.log(err)
      })
  }
  useEffect(fetch, []);


  const handleSubmit = (e) => {
    JeuService.createJeu(nom,nbMin,nbMax,age,duree,consigne,prototype,type,editeur)
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err.message)
    })

  }

  const paperStyle = { padding: 20, height: '100vh', width: 500, margin: "20px auto" }
  const btnstyle = { margin: '8px 0' }


  return (
    <div>
    <Grid>
    <Paper  elevation = {5}  style = {paperStyle}>
    <Grid align='center'>
                     <Avatar><GamepadIcon/></Avatar>
                    <h2>Jeu</h2>
                </Grid>
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField id="standard-basic" label="Nom du jeu" onChange={(e) => setNom(e.target.value)} />
      <TextField
          id="standard-number"
          label="Nombre de joueur min"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setNbMin(e.target.value)}
        />
        <TextField
          id="standard-number"
          label="Nombre de joueur max"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setNbMax(e.target.value)}
        />
        <TextField
          id="standard-number"
          label="Age"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setAge(e.target.value)}
        />
        <Input
            id="standard-adornment-weight"
            label="Durée"
            endAdornment={<InputAdornment position="end">Minutes</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            onChange={(e) => setDuree(e.target.value)}
          />
        <FormControl component="fieldset">
      <FormLabel component="legend">Avant-Première ?</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={prototype} onChange={handleChange}>
        <FormControlLabel value="true" control={<Radio />} label="Oui" />
        <FormControlLabel value="false" control={<Radio />} label="Non" />
        
      </RadioGroup>
    </FormControl>
        <TextField
          id="standard-select-currency"
          select
          label="Type de jeu"
          onChange={(e) => setType(e.target.value)}
        >
          {
            jeuTypes.map((jeu) => (
            <MenuItem key={jeu.idTypeJeu} value={jeu.idTypeJeu}>
              {jeu.nomType}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency"
          select
          label="Editeur"
          onChange={(e) => setEditeur(e.target.value)}
        >
          {editeurs.map((edit) => (
            <MenuItem key={edit.idParticipant} value={edit.idParticipant}>
              {edit.nomParticipant}
            </MenuItem>
          ))}
        </TextField>
        <TextField 
          id="standard-basic"
          label="Consignes" 
          multiline
          rows = {3}
          onChange={(e) => setConsigne(e.target.value)} />
        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Ajouter</Button>

          </form>
        </Paper>
      </Grid>
    </div>
  );
}
