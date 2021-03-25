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

import UserService from '../../services/user/user'

export function Organisator({ organisator, fetchOrganisators }) {

    console.log(organisator)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setLoading(true)
        UserService.deleteOrganisator(organisator).then(
            () => {
                fetchOrganisators()
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
                        primary={organisator.username}
                        secondary={organisator.email}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                            <DeleteIcon />
                        </IconButton>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{` Voulez vous vraiment supprimer l'oganisateur ${organisator.username} ?`}</DialogTitle>
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