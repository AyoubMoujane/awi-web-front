// import React, { useState } from 'react'
// import { TextField, Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
// import SaveIcon from "@material-ui/icons/Save"

import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';


import ParticipantService from "../../services/participant/participant"
import { Save } from '@material-ui/icons';

export default function ParticipantForm() {

    // const useStyles = makeStyles((theme) => ({
    //     formControl: {
    //         margin: theme.spacing(1),
    //         minWidth: 120,
    //     },
    //     selectEmpty: {
    //         marginTop: theme.spacing(2),
    //     },
    // }));

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

    const handleCheckBox = () => {
        console.log("handlecheckbox")
        setEditeurOnly(!editeurOnly)
    }

    const classes = useStyles();
    const [editeurOnly, setEditeurOnly] = useState(0);
    const [nomParticipant, setNomParticipant] = useState("");
    const [loading, setLoading] = useState(false)

    const handleChangeEditeurOnly = (event) => {
        setEditeurOnly(event.target.value);
    };

    const handleChangeNomParticipant = (event) => {
        setNomParticipant(event.target.value);
    };

    const createParticipant = () => {
        setLoading(true)
        ParticipantService.create(nomParticipant, editeurOnly)
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
        createParticipant()
    }

    return (
        // <form className="container mt-4 center-align">
        //     <Typography variant="h6" className={classes.title}>
        //         Créer des participants
        //     </Typography>
        //     <ul>
        //         <li>
        //             <TextField id="outlined-basic" label="Nom" variant="outlined" value={nomParticipant} onChange={handleChangeNomParticipant} />
        //         </li>
        //         <li>
        //             <FormControl variant="outlined" className={classes.formControl}>
        //                 <TextField
        //                     id="standard-select-currency"
        //                     select
        //                     label="Éditeur only"
        //                     value={editeurOnly}
        //                     onChange={handleChangeEditeurOnly}
        //                     helperText="Participant exclusivement éditeur ?"
        //                 >
        //                     {choices.map((option) => (
        //                         <MenuItem key={option.value} value={option.value}>
        //                             {option.label}
        //                         </MenuItem>
        //                     ))}
        //                 </TextField>
        //             </FormControl>
        //         </li>
        //     </ul>
        //     {loading ? <CircularProgress /> : <Button startIcon={<SaveIcon />} variant="contained" color="primary" onClick={handleSubmit}>Ajouter</Button>}
        // </form>

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PlaylistAddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Créer un éditeur/exposant
        </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Nom"
                        name="email"
                        autoComplete="email"
                        value={nomParticipant}
                        onChange={handleChangeNomParticipant}
                        autoFocus
                    />
                    <FormControlLabel
                        control={<Checkbox checked={editeurOnly} onChange={handleCheckBox} color="primary" />}
                        label="Editeur only ?"
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