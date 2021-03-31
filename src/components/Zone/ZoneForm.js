import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddIcon from '@material-ui/icons/Add';

import ZoneService from "../../services/zone/zone"

export function ZoneForm({ currentFestivalId }) {

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
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    const classes = useStyles();
    const [nomZone, setnomZone] = useState("");
    const [loading, setLoading] = useState(false)

    const handleChangenomZone = (event) => {
        setnomZone(event.target.value);
    };

    const createZone = () => {
        setLoading(true)
        ZoneService.create(nomZone, currentFestivalId)
            .then(data => {
                console.log(data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const handleSubmit = (event) => {
        createZone()
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Créer une zone dans le festival
        </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Nom"
                        value={nomZone}
                        onChange={handleChangenomZone}
                        autoFocus
                    />
                    {
                        loading ? <CircularProgress /> :
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSubmit}
                            >
                                Ajouter
                        </Button>
                    }

                </form>
            </div>
        </Container>
    )
}