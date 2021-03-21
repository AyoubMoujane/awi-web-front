import React from 'react'
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

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
    const [editeurOnly, setEditeurOnly] = React.useState(0);

    const handleChange = (event) => {
        setEditeurOnly(event.target.value);
    };

    const handleSubmit = (event) => {
        console.log("Submitted form")
    }

    return (
        <form onSubmit={handleSubmit} className="container mt-4 center-align">
            <h2>Ajouter un participant</h2>
            <ul>
                <li>
                    <TextField id="outlined-basic" label="Nom" variant="outlined" />
                </li>
                <li>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label="Éditeur only"
                            value={editeurOnly}
                            onChange={handleChange}
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
            <Button variant="contained" color="primary" type="submit" value="Submit">Ajouter</Button>
        </form>
    )
}