import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'date-fns';
import { format } from 'date-fns'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { makeStyles } from '@material-ui/core/styles';
// import { DatePicker } from '../Ui/DatePicker'
import UserService from "../../services/user/user"

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export function FestivalForm() {

  const classes = useStyles();

  const [nom, setNom] = useState('Festival du Jeu Montpellier')
  const [selectedDate, setSelectedDate] = useState(Date.now);
  const [estCourant, setEstCourant] = useState(true)
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
    setEstCourant(true)
    setNbTableEntree('')
    setNbTableAccueil('')
    setNbTableBuvette('')
    setPrixTableEntree('')
    setPrixTableAccueil('')
    setPrixTableBuvette('')
    setPrixM2Entree('')
    setPrixM2Accueil('')
    setPrixM2Buvette('')

  };

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

    console.log(data)

    UserService.setFestival(
      data.nomFestival,
      data.dateFestival,
      data.estCourant,
      data.nbTableEntree,
      data.nbTableAccueil,
      data.nbTableBuvette,
      data.prixTableEntree,
      data.prixTableAccueil,
      data.prixTableBuvette,
      data.prixM2Entree,
      data.prixM2Accueil,
      data.prixM2Buvette
    ).then(
      () => {
        handleClose()
      },
      error => {
        setError(error.response.data.message)
      }
    )

    console.log("ee")
    setLoading(false)

  }

  return (
    <div>
      <AddBoxIcon onClick={handleClickOpen} />
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
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </div>
            )}
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Annuler
              </Button>
              <Button onClick={handleSubmit} disable={loading} color="primary">
                Enregistrer
              </Button>
            </DialogActions>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
