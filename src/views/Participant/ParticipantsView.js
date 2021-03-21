import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DeleteIcon from '@material-ui/icons/Delete';

import ParticipantService from "../../services/participant/participant"

import ParticipantItem from "../../components/Participant/ParticipantItem"
import ParticipantForm from "../../components/Participant/ParticipantForm"

import participant from "../../services/participant/participant";

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

export function ParticipantsView() {

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingParticipantUpdate, setLoadingParticipantUpdate] = useState(false)

    const [participants, setParticipants] = useState([])

    const classes = useStyles();
    const [dense, setDense] = React.useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'nomParticipant', headerName: 'Nom', width: 130 },
        { field: 'editeurSeulement', headerName: 'Éditeur seulement', width: 130 }
    ];

    useEffect(() => {
        fetchParticipants()
    }, []);

    const fakeParticipants = [
        {
            id: 1,
            nomParticipant: "Ankama",
            editeurSeulement: 0
        }, {
            id: 2,
            nomParticipant: "Asmodee",
            editeurSeulement: 0
        }, {
            id: 3,
            nomParticipant: "Gigamic",
            editeurSeulement: 1
        }
    ]

    const fetchParticipants = () => {
        setLoading(true)
        ParticipantService.findAll()
            .then(data => {
                console.log(data)
                setLoading(false)
                setParticipants(data)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const addParticipant = () => {
        setLoadingParticipantUpdate(true)
    }

    const handleDelete = (participant) => {
        ParticipantService.delete(participant.idParticipant)
            .then((data) => {
                // Successfully deleted participant
                console.log(data)
                setLoading(false)
                var filteredParticipants = participants.filter((item) => {
                    return item != participant
                })
                console.log(filteredParticipants)
                setParticipants(filteredParticipants)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <ParticipantForm />
            <Typography variant="h6" className={classes.title}>
                Éditeurs et exposants
            </Typography>
            <List dense={dense}>
                <div className={classes.demo}>
                    {
                        loading ? <p>Loading...</p> :
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