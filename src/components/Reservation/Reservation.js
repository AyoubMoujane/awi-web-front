import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from "../Ui/DatePicker"
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles, makeStyles } from '@material-ui/core/styles';



import ReservationService from '../../services/reservation/reservation'



const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
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
    }
});


export function Reservation({ reservation, fetchReservations }) {

    console.log(reservation)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [edit, setEdit] = useState(false);

    const [dateReservation, setDateReservation] = useState()
    const [prix, setPrix] = useState()
    const [remise, setRemise] = useState()
    const [factureEnvoye, setFactureEnvoye] = useState()
    const [jeuExpose, setJeuExpose] = useState()


    const dateModification = new Date()

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleEdit = () => {
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenEdit(false)
    };

    const handleDelete = () => {
        setLoading(true)
        ReservationService.delete(reservation.idReservation).then(
            () => {
                fetchReservations()
                handleClose()
            },
            error => {
                setError(error.response.data.message)
            }
        )
        setLoading(false)

    }
    const handleDateChange = (date) => {
        setDateReservation(date);
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true)


        ReservationService.update(reservation.idReservation,dateReservation,prix,remise,factureEnvoye,reservation.festival,reservation.participantReservation,dateModification
        ).then(
            () => {
                handleClose()
            }
        )

        setLoading(false)

    }


    return (
        <div>
            <Box component="span">
                <ListItem disabled={loading}>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={reservation.Participant.nomParticipant}
                    />
                    <ListItemText
                        primary={reservation.idReservation}
                    />
                    <ListItemText
                        primary={reservation.dateReservation}
                    />
                    <ListItemText
                        primary={reservation.prix}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={handleEdit}>
                            <EditIcon  />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                            <DeleteIcon />
                        </IconButton>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{` Voulez vous vraiment supprimer la reservation ${reservation.dateReservation} ?`}</DialogTitle>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">
                                    Annuler
                                </Button>
                                <Button onClick={handleDelete} color="primary">
                                    Confirmer
                                </Button>
                            </DialogActions>
                        </Dialog>
 {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
                        <Dialog open={openEdit} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title"><TextField id="standard-full-width" label="Id de la reservation" fullWidth value={reservation.idReservation} /></DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <DatePicker date={reservation.dateReservation} defaultValue={reservation.dateReservation} onChange={handleDateChange} label="date" />
                                </DialogContentText>
                                <Grid container spacing={3}>

                                    <Grid container item xs={12} spacing={3}>
                                        <Grid item xs={4}>
                                            <TextField label="Prix" variant="outlined" defaultValue={reservation.prix} onChange={(e) => setPrix(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField label="Remise Table Entree" variant="outlined" defaultValue={reservation.remise} onChange={(e) => setRemise(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField label="Facture envoyé ?" variant="outlined" defaultValue={reservation.factureEnvoyé} onChange={(e) => setFactureEnvoye(e.target.value)} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Annuler
                    </Button>
                                <Button onClick={handleSubmit} color="primary" disabled={loading}>
                                    Modifier
                    </Button>
                            </DialogActions>
                        </Dialog>

 {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}

                    </ListItemSecondaryAction>
                </ListItem>
            </Box>
        </div>
    )
}