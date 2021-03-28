import React, { useState, useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import JeuExposeService from '../../services/jeuExpose/jeuExpose'


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
   
}));



export function JeuExposeForm({fetchJeuxExposes}) {

    const classes = useStyles();

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [idReservation, setIdReservation] = useState("")
    const [idJeu, setIdJeu] = useState(0)
    const [quantiteExpose, setQuantiteExpose] = useState(0)
    const [quantiteDonation, setQuantiteDonation] = useState(0)
    const [quantiteTombola, setQuantiteTombola] = useState(false)
    const [estAmene, setEstAmene] = useState(false)
    const [estRecu, setEstRecu] = useState(false)
    const [estARenvoye, setEstARenvoye] = useState(false)
    const [aEteRenvoye, setAEteRenvoye] = useState(false)
    const [estPlace, setEstPlace] = useState(false)
    const [zone, setZone] = useState('')

    const festival = 17
    const participantReservation = 24    

    const addJeuExpose = (jeu) => {
        setError(null)
        setLoading(true)
        JeuExposeService.create(idReservation,idJeu,quantiteExpose,quantiteDonation,quantiteTombola,estAmene,estRecu,estARenvoye,aEteRenvoye,estPlace,zone).then(
            () => {
                fetchJeuxExposes()
                // handleClose()
            },
            error => {
                console.log(error)
                setError(error.response.data.message)
            }
        )
        setLoading(false)
    }


    const handleSubmit = function (e) {
        e.preventDefault();
        console.log(idReservation,idJeu,quantiteExpose,quantiteDonation,quantiteTombola,estAmene,estRecu,estARenvoye,aEteRenvoye,estPlace,zone)

    }
    const handleSwitch = (event) => {
        setEstAmene(event.target.checked);
      };


    return (
        <div>
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Quantité exposée"
                                        required
                                        fullWidth
                                        defaultValue= {1}
                                        label="Quantité exposée"
                                        fullWidth
                                        autoFocus
                                        onChange={(e) => setQuantiteExpose(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="Quantité Donation"
                                        label="Quantité Donation"
                                        name="Quantité Donation"
                                        onChange={(e) => setQuantiteDonation(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="Quantité Tombola"
                                        label="Quantité Tombola"
                                        id="quantiteTombola"
                                        onChange={(e) => setQuantiteTombola(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup row>
                                    <FormControlLabel                                     
                                        control={
                                          <Switch
                                            checked={estAmene}
                                            onChange={handleSwitch}
                                            name="estAmene"
                                            color="primary"       
                                          />
                                        }
                                        label="Amené par l'exposant ?"
                                    />
                                    <FormControlLabel                                     
                                        control={
                                          <Switch
                                            checked={estRecu}
                                            onChange={handleSwitch}
                                            name="estRecu"
                                            color="primary"       
                                          />
                                        }
                                        label="Jeu reçu ?"
                                    />
                                    <FormControlLabel                                     
                                        control={
                                          <Switch
                                            checked={estARenvoye}
                                            onChange={handleSwitch}
                                            name="estARenvoye"
                                            color="primary"       
                                          />
                                        }
                                        label="Jeu à renvoyé ?"
                                    />
                                    <FormControlLabel                                     
                                        control={
                                          <Switch
                                            checked={aEteRenvoye}
                                            onChange={handleSwitch}
                                            name="aEteRenvoye"
                                            color="primary"       
                                          />
                                        }
                                        label="Jeu a été renvoyé ?"
                                    />
                                    <FormControlLabel                                     
                                        control={
                                          <Switch
                                            checked={estPlace}
                                            onChange={handleSwitch}
                                            name="estPlace"
                                            color="primary"       
                                          />
                                        }
                                        label="Jeu placé sur le plan ?"
                                    />
                                    </FormGroup>
                                </Grid>
                            </Grid>
                            <br/>
                            <Box>
                                {error && (
                                    <Alert severity="error">{error}</Alert>
                                )}
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                            >
                                Enregistrer
                        </Button>
                        </form>
        </div>
    );

}