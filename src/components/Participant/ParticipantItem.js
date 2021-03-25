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
import FormControlLabel from '@material-ui/core/FormControlLabel';


import ParticipantService from "../../services/participant/participant"


export default function ParticipantItem(props) {
    const [participant, setParticipant] = useState(props.data)
    const [isLoading, setIsLoading] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)


    const handleCheckBox = () => {
        console.log("handlecheckbox")
        let updatedParticipant = {
            ...participant,
            editeurSeulement: !participant.editeurSeulement
        }

        handleUpdate(updatedParticipant)
    }

    const handleDelete = () => {
        setIsLoading(true)
        ParticipantService.delete(participant.idParticipant)
            .then((data) => {
                console.log("data")
                // Successfully deleted participant
                setIsRemoved(true)
                setIsLoading(false)
            })
            .catch(err => {
                console.log("error")
                // Error while attempting delete
                setIsLoading(false)
            })
    }

    const handleUpdate = (updatedParticipant) => {
        setIsLoading(true)
        ParticipantService.update(updatedParticipant)
            .then((data) => {
                // Successfully updated participant
                console.log("success")
                setParticipant(updatedParticipant)
                setIsLoading(false)
            })
            .catch(err => {
                // Error while attempting update
                console.log("error")
                setIsLoading(false)
            })
    }

    return (
        isLoading ? <CircularProgress /> : (
            <ListItem key={participant.idParticipant} disabled={isRemoved}>
                <ListItemAvatar>
                    <Avatar>
                        {participant.editeurSeulement ? <MenuBookIcon /> : <PersonIcon />}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={participant.nomParticipant} />
                <ListItemText primary="Editeur seulement" />
                <FormControlLabel control={
                    <CheckBox checked={participant.editeurSeulement} onChange={handleCheckBox} />
                }>
                </FormControlLabel>
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(participant.idParticipant)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    )
}
