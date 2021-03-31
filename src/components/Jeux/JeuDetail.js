import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import JeuService from '../../services/jeu/jeu'
import { useState, useEffect } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { InputAdornment, Input, Paper, Grid, Avatar, Button } from '@material-ui/core';
import GamepadIcon from '@material-ui/icons/Gamepad';

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
const editeurs = ['Bla', 'Bli', 'Blo']

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function JeuDetail(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      paperStyle: { padding: 20, height: '200vh', width: 500, margin: "20px auto" }
    },
  }));

  const [isLoading, setIsLoading] = useState(true)
  const [jeu, setJeu] = useState(null)

  const classes = useStyles();
  const fetchJeu = () => {
    console.log(props.match.params.id)
    JeuService.get(props.match.params.id)
      .then(data => {
        setJeu(data)
        setIsLoading(false)

      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
  }
  useEffect(fetchJeu, []);

  const [nomJeu, setNom] = useState('')
  const [nbJoueurMin, setNbJoueurMin] = useState(1)
  const [nbJoueurMax, setNbJoueurMax] = useState(1)
  const [age, setAge] = useState(4)
  const [duree, setDuree] = useState(30)
  const [prototype, setPrototype] = useState(false)
  const [type, setType] = useState('')
  const [editeur, setEditeur] = useState(null)
  const [consigne, setConsigne] = useState('')
  const paperStyle = { padding: 20, height: '100vh', width: 500, margin: "20px auto" }
  const btnstyle = { margin: '8px 0' }


  const handleSubmit = (e) => {
    JeuService.update(jeu.idJeu, nomJeu, nbJoueurMin, nbJoueurMax, age, duree, consigne, prototype, 1, 1)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err.message)
      })

  }

  return (
    <div>
      {isLoading && <Grid alignItems='center' ><CircularProgress /></Grid>}
      {jeu &&
        <div>

          <Grid>
            <Paper elevation={10} style={paperStyle}>
              <Grid align='center'>
                <Avatar><GamepadIcon /></Avatar>
                <h2>Jeu</h2>
              </Grid>
              <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Nom du jeu" onChange={(e) => setNom(e.target.value)} defaultValue={jeu.nomJeu} />
                <TextField
                  id="standard-number"
                  label="Nombre de joueur min"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setNbJoueurMin(e.target.value)}
                  defaultValue={jeu.nbJoueurMin}
                />
                <TextField
                  id="standard-number"
                  label="Nombre de joueur max"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setNbJoueurMax(e.target.value)}
                  defaultValue={jeu.nbJoueurMax}
                />
                <TextField
                  id="standard-number"
                  label="Age"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setAge(e.target.value)}
                  defaultValue={jeu.age}
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
                  defaultValue={jeu.duree}
                />
                <TextField
                  id="standard-select-currency"
                  select
                  label="Prototype"
                  onChange={(e) => setPrototype(e.target.value)}
                  defaultValue={jeu.prototype}
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
                  defaultValue={jeu.type}
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
                  defaultValue={jeu.editeur}
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
                  rows={3}
                  onChange={(e) => setConsigne(e.target.value)}
                  defaultValue={jeu.consigne} />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Modifier</Button>
                <Button color='primary' variant="contained" style={btnstyle} fullWidth onClick={() => JeuService.delete(jeu.idJeu)}>Supprimer</Button>
              </form>
            </Paper>
          </Grid>
        </div>
      }
    </div>
  );
}
