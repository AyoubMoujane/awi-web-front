import React from 'react'
import { TextField, Button, MenuItem, InputLabel, Select, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


function ParticipantForm() {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <form className="container mt-4 center-align">
            <h2>Ajouter exposant/éditeur</h2>
            <ul>
                <li>
                    <TextField className="row" id="outlined-basic" label="Nom" variant="outlined" />
                </li>
                <li>
                    <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>Some important helper text</FormHelperText>
                </li>
            </ul>
            <Button variant="contained" color="primary">Ajouter</Button>
        </form>
    )
}

export default ParticipantForm
