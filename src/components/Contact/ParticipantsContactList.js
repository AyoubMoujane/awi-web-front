import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import RefreshIcon from '@material-ui/icons/Refresh';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'
// import Divider from '@material-ui/core/Divider';

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

export default function ParticipantsContactList() {

    // const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [participants, setParticipants] = useState([])

    const classes = useStyles();
    const [dense] = useState(false);

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

    const handleClick = () => {

    }

    useEffect(fetchParticipants, []);

    function compare(a, b) {
        if (a.nomParticipant < b.nomParticipant) {
            return -1;
        }
        if (a.nomParticipant > b.nomParticipant) {
            return 1;
        }
        return 0;
    }

    return (
        <div>
            <Container maxWidth="sm">
                <Typography variant="h6" className={classes.title}>
                    Éditeurs et exposants
            </Typography>
                <RefreshIcon onClick={fetchParticipants} />
                <List dense={dense}>
                    <div className={classes.demo}>
                        {
                            loading ? <CircularProgress /> :
                                participants.map((participant) => (
                                    <p>{participant.nomParticipant}</p>
                                ))
                        }
                    </div>
                </List>
            </Container>

        </div>
    )
}