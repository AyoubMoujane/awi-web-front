import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Alert, AlertTitle } from '@material-ui/lab';
import 'date-fns';
import { format } from 'date-fns'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'

import { fetchFestivals } from "../../redux/actions/festival/festivalActions"
import FestivalService from "../../services/festival/festival"

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export function FestivalForm() {

  const dispatch = useDispatch()

  const classes = useStyles();

  const [nom, setNom] = useState('Festival du Jeu Montpellier')
  const [selectedDate, setSelectedDate] = useState(Date.now);
  const [estCourant, setEstCourant] = useState(false)
  const [nbTableEntree, setNbTableEntree] = useState('')
  const [nbTableAccueil, setNbTableAccueil] = useState('')
  const [nbTableBuvette, setNbTableBuvette] = useState('')
  const [prixTableEntree, setPrixTableEntree] = useState('')
  const [prixTableAccueil, setPrixTableAccueil] = useState('')
  const [prixTableBuvette, setPrixTableBuvette] = useState('')
  const [prixM2Entree, setPrixM2Entree] = useState('')
  const [prixM2Accueil, setPrixM2Accueil] = useState('')
  const [prixM2Buvette, setPrixM2Buvette] = useState('')

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = React.useState(false);




  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNom('Festival du Jeu Montpellier')
    setSelectedDate(Date.now)
    setEstCourant(false)
    setNbTableEntree('')
    setNbTableAccueil('')
    setNbTableBuvette('')
    setPrixTableEntree('')
    setPrixTableAccueil('')
    setPrixTableBuvette('')
    setPrixM2Entree('')
    setPrixM2Accueil('')
    setPrixM2Buvette('')
    setError(null)

  };

  const addFestival = (festival) => {
    setError(null)
    setLoading(true)

    FestivalService.setFestival(
      festival
    ).then(
      () => {
        dispatch(fetchFestivals())
        handleClose()
      },
      error => {
        console.log(error)
        setError(error.response.data.message)
      }
    )

    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null)
    setLoading(true)

    const data = {
      nomFestival: nom,
      dateFestival: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null,
      estCourant: estCourant,
      nbTableEntree: nbTableEntree,
      nbTableAccueil: nbTableAccueil,
      nbTableBuvette: nbTableBuvette,
      prixTableEntree: prixTableEntree,
      prixTableAccueil: prixTableAccueil,
      prixTableBuvette: prixTableBuvette,
      prixM2Entree: prixM2Entree,
      prixM2Accueil: prixM2Accueil,
      prixM2Buvette: prixM2Buvette
    }

    addFestival(data)

  }

  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Tooltip title="Add" aria-label="add" placement="top-end">
            <Fab color="primary">
              <AddIcon onClick={handleClickOpen} />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Créer un Festival</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour créer un festival, veuillez renseigner les champs ci-dessous
          </DialogContentText>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField id="standard-required" label="Nom du Festival" value={nom} onChange={(e) => setNom(e.target.value)} required />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date"
                  format="yyyy-MM-dd"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <br />
            <br />
            <br />
            <div>
              <TextField id="standard-basic" label="Tables Espace Entrée" onChange={(e) => setNbTableEntree(e.target.value)} />
              <TextField
                label="Prix Unitaire"
                id="standard-start-adornment"
                InputProps={{
                  endAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
                onChange={(e) => setPrixTableEntree(e.target.value)}
              />
            </div>
            <div>
              <TextField id="standard-basic" label="Tables Espace Accueil" onChange={(e) => setNbTableAccueil(e.target.value)} />
              <TextField
                label="Prix Unitaire"
                id="standard-start-adornment"
                InputProps={{
                  endAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
                onChange={(e) => setPrixTableAccueil(e.target.value)}
              />
            </div>
            <div>
              <TextField id="standard-basic" label="Tables Espace Buvette" onChange={(e) => setNbTableBuvette(e.target.value)} />
              <TextField
                label="Prix Unitaire"
                id="standard-start-adornment"
                InputProps={{
                  endAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
                onChange={(e) => setPrixTableBuvette(e.target.value)}
              />
            </div>
            <br />
            <br />
            <br />
            <div>
              <TextField
                label="Prix du m2 Entrée"
                id="standard-start-adornment"
                InputProps={{
                  endAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
                onChange={(e) => setPrixM2Entree(e.target.value)}
              />
              <TextField
                label="Prix du m2 Accueil"
                id="standard-start-adornment"
                InputProps={{
                  endAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
                onChange={(e) => setPrixM2Accueil(e.target.value)}
              />
              <TextField
                label="Prix du m2 Buvette"
                id="standard-start-adornment"
                InputProps={{
                  endAdornment: <InputAdornment position="start">€</InputAdornment>,
                }}
                onChange={(e) => setPrixM2Buvette(e.target.value)}
              />
            </div>
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{error}</strong>
              </Alert>
            )}
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Annuler
              </Button>
              <Button onClick={handleSubmit} disabled={loading} color="primary">
                Enregistrer
              </Button>
            </DialogActions>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
