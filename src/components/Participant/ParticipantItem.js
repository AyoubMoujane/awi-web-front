import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress';

import ParticipantService from "../../services/participant/participant"


export default function ParticipantItem(props) {
    const { idParticipant, nomParticipant, editeurSeulement } = props.data
    const [loading, setLoading] = useState(false)


    const updateParticipant = (participant) => {

    }

    const handleDelete = (participant) => {
        setLoading(true)
        ParticipantService.delete(idParticipant)
            .then((data) => {
                console.log("data")
                // Successfully deleted participant
                setLoading(false)
                // var filteredParticipants = participants.filter((item) => {
                //     return item !== participant
                // })
                // console.log(filteredParticipants)
                // setParticipants(filteredParticipants)
            })
            .catch(err => {
                console.log("error")
                // Error while attempting delete
                setLoading(false)
            })
    }

    return (
        loading ? <CircularProgress /> : (
            <ListItem key={idParticipant}>
                <ListItemAvatar>
                    <Avatar>
                        {editeurSeulement ? <MenuBookIcon /> : <PersonIcon />}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={nomParticipant} />
                <ListItemText primary="Editeur seulement" />
                <CheckBox checked={editeurSeulement} onChange={updateParticipant} />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(idParticipant)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    )
}
