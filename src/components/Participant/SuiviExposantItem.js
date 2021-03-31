import React, { useState, useEffect } from 'react'
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
import { Redirect } from 'react-router'

import { DatePicker } from "../Ui/DatePicker"

import ReservationService from '../../services/reservation/reservation'
import SuiviExposantService from '../../services/suiviExposant/suiviExposant'


export function SuiviExposantItem({ suiviExposant, statusExposant }) {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [reservation, setReservation] = useState([])
    const [espacesReserves, setEspacesReserves] = useState([])

    const [nbTotalTables, setNbTotalTables] = useState(0)
    const [nbTotalM2, setNbTotalM2] = useState(0)
    const [prixTotal, setPrixTotal] = useState(0)

    const participant = suiviExposant.participant

    const [commentaire, setCommentaire] = useState(suiviExposant.commentaire)
    const [premierContact, setPremierContact] = useState(suiviExposant.premierContact);
    const [secondContact, setSecondContact] = useState(suiviExposant.secondContact);
    const [troisiemeContact, setTroisiemeContact] = useState(suiviExposant.troisiemeContact);
    const [benevoles, setBenevoles] = useState(suiviExposant.besoinBenevol)
    const [place, setPlace] = useState(suiviExposant.place)
    const [status, setStatus] = useState(suiviExposant.statusExposant.nomStatus)


    const data = {
        idReservation: 27,
    }

    //TODO : voir ou mettre la fonction getReservation

    // const findReservation = () => {
    //     setLoading(true)
    //     ReservationService.getReservation(data).then(
    //         response => {
    //             setReservation(response.data)
    //             setLoading(false)
    //         },
    //         error => {
    //             setError(error.response.data.message)
    //             setLoading(false)
    //         }
    //     )
    // }


    const handleClick = (idParticipant) => {
        <Redirect to="/dashBoardReservation/"idParticipant/>
    }

    const handleChangeDate1 = (date) => {
        setLoading(true)
        setPremierContact(date)

        const data = {
            idFestival: 8,
            idParticipant: participant.idParticipant,
            premierContact: date
        }

        SuiviExposantService.updatePremierContact(data)
            .then(()=>{
                setLoading(false)
            })
    }   


    const findEspacesReserves = () => {
        setLoading(true)
        ReservationService.getEspacesReservesForReservation(data).then(
            response => {
                setEspacesReserves(response.data)
                setNbTotalTables(ReservationService.calculTotalNbTables(espacesReserves))
                setNbTotalM2(ReservationService.calculTotalM2(espacesReserves))
                setPrixTotal(ReservationService.calculPrixTotal(espacesReserves))
                setLoading(false)
            },
            error => {
                setError(error.response.data.message)
                setLoading(false)
            }
        )
    }


    useEffect(function () {
        findEspacesReserves()
    }, [])

    return (
            
                <TableRow key={suiviExposant.idParticipant}>
                    <TableCell component="th" scope="row" style={{ width: 50 }}>
                        <Link component="button" variant="body2" onClick={handleClick(participant.idParticipant)}>{participant.nomParticipant}</Link>
                    </TableCell>
                    <TableCell style={{ width: 400 }}>
                        <Container >
                            <TextField key={suiviExposant.idParticipant} label="commentaires sur le suivi de l'exposant" size="small" value={commentaire} onChange={(e) => setCommentaire(e.target.value)} fullWidth disabled />
                        </Container>
                    </TableCell>
                    <TableCell style={{ width: 500 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <DatePicker key={`${suiviExposant.idParticipant}premier`} date={premierContact} onChange={handleChangeDate1} label="premier contact" />
                            </Grid>
                            <Grid item xs={4}>
                                <DatePicker key={`${suiviExposant.idParticipant}deuxieme`} date={secondContact} onChange={setSecondContact} label="deuxieme contact" />
                            </Grid>
                            <Grid item xs={4}>
                                <DatePicker key={`${suiviExposant.idParticipant}troisieme`} date={troisiemeContact} onChange={setTroisiemeContact} label="troisieme contact" />
                            </Grid>
                            <Grid item xs={4}>
                                {<FormControl>
                                    <InputLabel>Status de l'exposant</InputLabel>
                                    <Select
                                        value={status}
                                        fullWidth
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        {statusExposant.map((status) => (
                                            <MenuItem key={status.idStatusExposant} value={status.nomStatus} >
                                                {status.nomStatus}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>}
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            checked={benevoles}
                                            onChange={(e) => setBenevoles(e.target.checked)}
                                        />
                                    }
                                    label="Bénévols ?"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            checked={place}
                                            onChange={(e) => setPlace(e.target.checked)}
                                        />
                                    }
                                    label="Placé sur le plan ?"
                                />
                            </Grid>



                        </Grid>
                    </TableCell>
                    <TableCell >{nbTotalTables}</TableCell>
                    <TableCell >{nbTotalM2}</TableCell>
                    <TableCell >Factures</TableCell>
                    <TableCell >{prixTotal}</TableCell>
                </TableRow>
            
    
    );
}
