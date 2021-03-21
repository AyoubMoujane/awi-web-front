import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';


import ParticipantService from "../../services/participant/participant"

export default function ParticipantForm() {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const choices = [
        {
            value: 1,
            label: "Oui"
        },
        {
            value: 0,
            label: "Non"
        }
    ]

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
        <form className="container mt-4 center-align">
            <Typography variant="h6" className={classes.title}>
                Créer des participants
            </Typography>
            <ul>
                <li>
                    <TextField id="outlined-basic" label="Nom" variant="outlined" value={nomParticipant} onChange={handleChangeNomParticipant} />
                </li>
                <li>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Éditeur only"
                            value={editeurOnly}
                            onChange={handleChangeEditeurOnly}
                            helperText="Participant exclusivement éditeur ?"
                        >
                            {choices.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </li>
            </ul>
            {loading ? <CircularProgress /> : <Button variant="contained" color="primary" onClick={handleSubmit}>Ajouter</Button>}
        </form>
    )
}