import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import CircularProgress from '@material-ui/core/CircularProgress';

import ParticipantService from "../../services/participant/participant"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

export default function ParticipantList() {

    // const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [participants, setParticipants] = useState([])

    const classes = useStyles();
    const [dense] = useState(false);

    useEffect(() => {
        fetchParticipants()
    });

    const fetchParticipants = () => {
        setLoading(true)
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
    }

    function compare(a, b) {
        if (a.nomParticipant < b.nomParticipant) {
            return -1;
        }
        if (a.nomParticipant > b.nomParticipant) {
            return 1;
        }
        return 0;
    }

    const handleDelete = (participant) => {

        ParticipantService.delete(participant.idParticipant)
            .then((data) => {
                // Successfully deleted participant
                setLoading(false)
                var filteredParticipants = participants.filter((item) => {
                    return item !== participant
                })
                console.log(filteredParticipants)
                setParticipants(filteredParticipants)
            })
            .catch(err => {
                // Error while attempting delete
                setLoading(false)
            })
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography variant="h6" className={classes.title}>
                Éditeurs et exposants
            </Typography>
            <RefreshIcon onClick={fetchParticipants} />
            <List dense={dense}>
                <div className={classes.demo}>
                    {
                        loading ? <CircularProgress /> :
                            participants.map((participant) => (
                                <ListItem key={participant.idParticipant}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            {participant.editeurSeulement ? <MenuBookIcon /> : <PersonIcon />}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={participant.nomParticipant} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" >
                                            <DeleteIcon onClick={() => handleDelete(participant)} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                    }
                </div>
            </List>
        </div>
    )
}