import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { InputAdornment, Input, Paper, Grid, Avatar, Button  } from '@material-ui/core';
import GamepadIcon from '@material-ui/icons/Gamepad';
import { useHistory } from 'react-router-dom'






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

  const typeJeu = [
    {
      value: 'Famille',
      label: 'Famille',
    },
    {
      value: 'Arcade',
      label: 'Arcade',
    }
  ];
  const editeurs = ['Bla','Bli', 'Blo'] 
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  paperStyle : {padding :20,height:'70vh',width:280, margin:"20px auto"}
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
  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(nom, nbMin, nbMax, age,prototype, type , editeur)
    if (nom && editeur) {
      fetch('http://localhost:8080/api/jeux', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          "nomJeu": nom,
          "nbJoueurMin": nbMin,
          "nbJoueurMax": nbMin,
          "age" : age,
          "duree": duree,
          "consigne": consigne,
          "prototype": prototype,
          "type": 1,
          "editeur": 1
  })
      }).then(() => history.push('/'))
    } 
  }

  const  paperStyle = {padding :20,height:'125vh',width:280, margin:"20px auto"}
  const btnstyle={margin:'8px 0'}
  

  return (
    <div>
    <Grid>
    <Paper  elevation = {10}  style = {paperStyle}>
    <Grid align='center'>
                     <Avatar><GamepadIcon/></Avatar>
                    <h2>Ajouter un jeu</h2>
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
          <TextField
          id="standard-select-currency"
          select
          label="Prototype"
          onChange={(e) => setPrototype(e.target.value)}
        >
          {bool.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency"
          select
          label="Type de jeu"
          onChange={(e) => setType(e.target.value)}
        >
          {typeJeu.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency"
          select
          label="Editeur"
          onChange={(e) => setEditeur(e.target.value)}
        >
          {editeurs.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
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
