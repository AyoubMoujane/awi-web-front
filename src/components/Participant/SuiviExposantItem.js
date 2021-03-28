import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { DatePicker } from "../Ui/DatePicker"

import SuiviExposantService from '../../services/suiviExposant/suiviExposant'



export function SuiviExposantItem({ suiviExposant, statusExposant }) {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [reservation, setReservation] = useState(null)
    const [espacesReserves, setEspacesReserves] = useState(null)

    const [commentaire, setCommentaire] = useState(suiviExposant.commentaire)
    const [premierContact, setPremierContact] = useState(suiviExposant.premierContact);
    const [deuxiemeContact, setDeuxiemeContact] = useState(suiviExposant.deuxiemeContact);
    const [troisiemeContact, setTroisiemeContact] = useState(suiviExposant.troisiemeContact);
    const [benevoles, setBenevoles] = useState(suiviExposant.besoinBenevol)
    const [place, setPlace] = useState(suiviExposant.place)


    const data = {
        idReservation: 1,
        idFestival: 7
    }


    //TODO : voir ou mettre la fonction getReservation

    const findReservation = () => {
        setLoading(true)
        SuiviExposantService.getReservation(data).then(
            response => {
                setReservation(response.data)
                setLoading(false)
            },
            error => {
                setError(error.response.data.message)
                setLoading(false)
            }
        )
    }


    const findEspacesReserves = () => {
        setLoading(true)
        SuiviExposantService.getEspacesReserves(data).then(
            response => {
                setEspacesReserves(response.data)
                setLoading(false)
            },
            error => {
                setError(error.response.data.message)
                setLoading(false)
            }
        )
    }

    
    useEffect(function () {
        findReservation()
        findEspacesReserves()
    }, [])


    console.log(espacesReserves)

    return (

        <TableRow key={suiviExposant.idParticipant}>
            <TableCell component="th" scope="row" style={{ width: 50 }}>
                <Link component="button" variant="body2">{suiviExposant.idParticipant}</Link>
            </TableCell>
            <TableCell style={{ width: 400 }}>
                <Container >
                    <TextField key={suiviExposant.idParticipant} label="commentaires sur le suivi de l'exposant" size="small" value={suiviExposant.commentaires} fullWidth />
                </Container>
            </TableCell>
            <TableCell style={{ width: 500 }}>

                <SuiviEchanges suiviExposant={suiviExposant} reservation={reservation} />

            </TableCell>
            <TableCell >Tables</TableCell>
            <TableCell >m2</TableCell>
            <TableCell >Factures</TableCell>
            <TableCell >Total (€)</TableCell>
        </TableRow>
    );
}



function SuiviEchanges({ suiviExposant }) {

    // const [selectedPremierContact, setSelectedPremierContact] = useState(suiviExposant.premierContact);
    // const [selectedDeuxiemeContact, setSelectedDeuxiemeContact] = useState(suiviExposant.deuxiemeContact);
    // const [selectedTroisiemeContact, setSelectedTroisiemeContact] = useState(suiviExposant.troisiemeContact);

    // const handleDateChange = (date) => {
    //     setSelectedPremierContact(date);
    // };

    return (
        <div>
            <Grid container spacing={1}>
                {/* <Grid item xs={4}>
                    <DatePicker key={`${suiviExposant.idParticipant}premier`} date={suiviExposant.premierContact} label="premier contact" />
                </Grid>
                <Grid item xs={4}>
                    <DatePicker key={`${suiviExposant.idParticipant}deuxieme`} date={suiviExposant.secondContact} label="deuxieme contact" />
                </Grid>
                <Grid item xs={4}>
                    <DatePicker key={`${suiviExposant.idParticipant}troisieme`} date={suiviExposant.troisiemeContact} label="troisieme contact" />
                </Grid> */}
                <Grid item xs={4}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        }
                        label="Bénévols ?"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                defaultChecked
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        }
                        label="Placé sur le plan ?"
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    <FormControl>
                        <InputLabel>Status de l'exposant</InputLabel>
                        <Select id={suiviExposant.idParticipant}>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid> */}


            </Grid>
        </div>
    )

}


/*

function Commentaire(suiviExposant) {

    return (
        <div>
            <TextField id={suiviExposant.idParticipant} label="commentaires sur le suivi de l'exposant" size="small" value={suiviExposant.commentaires} />
        </div>
    )

}

function Tables() {
    return (
        <div>
            {0}
        </div>
    )
}


function M2() {
    return (
        <div>
            {0}
        </div>
    )
}

function Facture() {
    return (
        <div>

        </div>
    )
}

function Total() {
    return (
        <div>
            {0}
        </div>
    )
}
*/