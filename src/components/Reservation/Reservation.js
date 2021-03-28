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

import ReservationService from '../../services/reservation/reservation'

export function Reservation({ reservation, fetchReservations }) {

    console.log(reservation)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleEdit = () => {
        setEdit(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        primary={reservation.dateReservation}
                        secondary={reservation.prix}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={handleEdit}>
                            <EditIcon />
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
                    </ListItemSecondaryAction>
                </ListItem>
            </Box>
        </div>
    )
}