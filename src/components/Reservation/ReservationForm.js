import React, { useState, useCallback, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveIcon from '@material-ui/icons/Remove';




import ReservationService from "../../services/reservation/reservation"
import JeuService from '../../services/jeu/jeu'
import {JeuExposeForm} from '../jeuExpose/jeuExposeForm'
import JeuExposeService from '../../services/jeuExpose/jeuExpose'
import ZoneService from '../../services/zone/zone'
import ParticipantService from '../../services/participant/participant'
import compare from '../../utils/compare.js'






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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 390,
        maxWidth: 390,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function ReservationForm({fetchReservations}) {

    const classes = useStyles();

    // Un jeu exposé
    const [state, setState] = useState({
        estAmene: true,
        estRecu: false,
        estARenvoye: false,
        aEteRenvoye: false,
        estPlace: false,
      })
    const [idReservation, setIdReservation] = useState(2)
    const [idJeu, setIdJeu] = useState(1)
    const [quantiteExpose, setQuantiteExpose] = useState(null)
    const [quantiteDonation, setQuantiteDonation] = useState(null)
    const [quantiteTombola, setQuantiteTombola] = useState(null)
    const [zone, setZone] = useState(1)

    // Liste de jeux, zones et partcipant
    const [jeux, setJeux] = useState([])
    const [jeuxAdded, setJeuxAdded] = useState([])
    const [zones, setZones] = useState([])
    const [participants, setParticipants] = useState([])

    // Etats du form
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [ajouterJeu, setAjouterJeu] = useState(false)

    // Une reservation
    const [dateReservation, setDateReservation] = useState("")
    const [prix, setPrix] = useState(0)
    const [remise, setRemise] = useState(0)
    const [factureEnvoye, setFactureEnvoye] = useState(false)
    const [participant, setParticipant] = useState("")
    const dateModification = new Date()
    const festival = 1
    const participantReservation = 1

    // Les handle
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (event) => {
        setJeuxAdded(event.target.value);
      };

    const handleClose = () => {
        setOpen(false);
        setError(null);
        setLoading(false);
        setDateReservation("");
        setPrix(0)
        setRemise(0);
        setFactureEnvoye(false);
    };

    // Récupérer les jeux
    const fetchData = useCallback(() => {
        JeuService.findAll().then(
            response => {
                setJeux(response)
            },
            error => {
                setError(error.response)
            }
        )
        ZoneService.getZones().then(
            response => {
                setZones(response.data)
            },
            error => {
                setError(error.response)
            }
        )
        ParticipantService.findAll()
            .then(data => {
                console.log(data)
                setLoading(false)
                data.sort(compare)
                setParticipants(data)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    })
    useEffect(fetchData, [])
    
    // Ajout d'une réservation
    const  addReservation = () => {
        setError(null)
        setLoading(true)
        ReservationService.create(dateReservation,prix,remise,factureEnvoye,festival,participantReservation, dateModification).then(
            (res) => {
                setIdReservation(res.idReservation)
                //fetchReservations()
                //handleClose()
            },
            error => {
                console.log(error)
                setError(error.response.data.message)
            }
        )
        setLoading(false)
    }
    const addJeuExpose = () => {
        setError(null)
        setLoading(true)
        console.log("idReservation :" + idReservation)
        JeuExposeService.create(idReservation,idJeu,quantiteExpose,quantiteDonation,quantiteTombola,state.estAmene,state.estRecu,state.estARenvoye,state.aEteRenvoye,state.estPlace,zone).then(
            () => {
                // fetchJeuxExposes()
                
            },
            error => {
                console.log(error)
                setError(error.response.data.message)
            }
        )
        setLoading(false)
    }


    const handleSubmit = async function(e) {
        e.preventDefault();
        await addReservation(dateReservation,prix,remise,factureEnvoye,festival,participantReservation,dateModification)
        addJeuExpose()
        console.log("idReservation :" + idReservation + " idJeu :" +idJeu+ " idZone : "+ zone) 
        

    }
    const handleSwitch = (event) => {
        setFactureEnvoye(event.target.checked);
      };
      const handleSwitchJeu = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
      const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
      };


    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Ajouter une réservation
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                        Ajouter une réservation
                    </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    fullWidth
                                    label="Participant"
                                    onChange={(e) => setParticipant(e.target.value)}
                                    >
                                     {
                                        participants.map((participant) => (
                                        <MenuItem key={participant.idParticipant} value={participant.idParticipant}>
                                          {participant.nomParticipant}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="datetime-local"
                                        label="Next appointment"
                                        type="date"
                                        required
                                        fullWidth
                                        defaultValue="2017-05-24T"
                                        label="Date de réservation"
                                        className={classes.textField}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        autoFocus
                                        onChange={(e) => setDateReservation(e.target.value)}
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="prix"
                                        label="Prix (€)"
                                        name="prix"
                                        onChange={(e) => setPrix(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="remise"
                                        label="Remise (€)"
                                        id="remise"
                                        onChange={(e) => setRemise(e.target.value)}
                                    />
{/* <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Les jeux</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={jeuxAdded}
          fullWidth
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {jeux.map((jeu) => (
            <MenuItem key={jeu.nomJeu} value={jeu.nomJeu} >
              {jeu.nomJeu}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <FormGroup row>
                                    <FormControlLabel                                     
                                        control={
                                          <Switch
                                            checked={factureEnvoye}
                                            onChange={handleSwitch}
                                            name="checkedB"
                                            color="primary"       
                                          />
                                        }
                                        label="Facture envoyé ?"
                                    />
                                    </FormGroup>
                                </Grid>
                                {/* //////////// */}
                                {ajouterJeu && (<div><Grid container justify="center">
                                <Typography component="h7" variant="h6">Ajouter un jeu à la réservation</Typography>
                                </Grid>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    fullWidth
                                    label="Jeu"
                                    onChange={(e) => setIdJeu(e.target.value)}
                                    >
                                     {
                                        jeux.map((jeu) => (
                                        <MenuItem key={jeu.idJeu} value={jeu.idJeu}>
                                          {jeu.nomJeu}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    fullWidth
                                    label="Zone"
                                    onChange={(e) => setZone(e.target.value)}
                                    >
                                     {
                                        zones.map((zone) => (
                                        <MenuItem key={zone.idZone} value={zone.idZone}>
                                          {zone.nomZone}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                </Grid>
                                
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
                                            checked={state.estAmene}
                                            onChange={handleSwitchJeu}
                                            name="estAmene"
                                            color="primary"       
                                          />
                                        }
                                        label="Amené par l'exposant ?"
                                    />
                                    <FormControlLabel                                     
                                        control={
                                          <Switch
                                            checked={state.estRecu}
                                            onChange={handleSwitchJeu}
                                            name="estRecu"
                                            color="primary"       
                                          />
                                        }
                                        label="Jeu reçu ?"
                                    />
                                    <FormControlLabel                                     
                                        control={
                                          <Switch
                                            checked={state.estARenvoye}
                                            onChange={handleSwitchJeu}
                                            name="estARenvoye"
                                            color="primary"       
                                          />
                                        }
                                        label="Jeu à renvoyé ?"
                                    />
                                    <FormControlLabel                                     
                                        control={
                                          <Switch
                                            checked={state.aEteRenvoye}
                                            onChange={handleSwitchJeu}
                                            name="aEteRenvoye"
                                            color="primary"       
                                          />
                                        }
                                        label="Jeu a été renvoyé ?"
                                    />
                                    <FormControlLabel                                     
                                        control={
                                          <Switch
                                            checked={state.estPlace}
                                            onChange={handleSwitchJeu}
                                            name="estPlace"
                                            color="primary"       
                                          />
                                        }
                                        label="Jeu placé sur le plan ?"
                                    />
                                    </FormGroup>
                                </Grid> 
                            </Grid> </div>)}

                                <Grid container justify="center">
                                    <Grid item>
                                     <Tooltip title="Ajouter un jeu" aria-label="add" placement="top-end">
                                        <Fab color="primary">
                                       <AddIcon onClick={()=>setAjouterJeu(!ajouterJeu)} />
                                        </Fab>
                                    </Tooltip>
                                    </Grid>
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
                </Container>
            </Dialog>
        </div>
    );

}