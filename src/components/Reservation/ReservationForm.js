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





import ReservationService from "../../services/reservation/reservation"
import JeuService from '../../services/jeu/jeu'
import {JeuExposeForm} from '../jeuExpose/jeuExposeForm'


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

    const [jeux, setJeux] = useState([])
    const [jeuxAdded, setJeuxAdded] = useState([])
    const [open, setOpen] = useState(false);

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dateReservation, setDateReservation] = useState("")
    const [prix, setPrix] = useState(0)
    const [remise, setRemise] = useState(0)
    const [factureEnvoye, setFactureEnvoye] = useState(false)
    const dateModification = new Date()
    const festival = 17
    const participantReservation = 24

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

    const fetchJeux = useCallback(() => {
        JeuService.findAll().then(
            response => {
                setJeux(response)
            },
            error => {
                setError(error.response)
            }
        )
    })
    useEffect(fetchJeux, [])
    

    const addReservation = (reservation) => {
        setError(null)
        setLoading(true)
        ReservationService.create(dateReservation,prix,remise,factureEnvoye,festival,participantReservation, dateModification).then(
            () => {
                fetchReservations()
                handleClose()
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
        addReservation(dateReservation,prix,remise,factureEnvoye,festival,participantReservation,dateModification)

    }
    const handleSwitch = (event) => {
        setFactureEnvoye(event.target.checked);
      };
      const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        //setPersonName(value);
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
<FormControl className={classes.formControl}>
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
      </FormControl>
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
                                <JeuExposeForm></JeuExposeForm>
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