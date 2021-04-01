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


    const handleChangeDate1 = (date) => {
        setLoading(true)
        setPremierContact(date)

        const data = {
            idFestival: suiviExposant.idFestival,
            idParticipant: participant.idParticipant,
            premierContact: date
        }

        SuiviExposantService.updatePremierContact(data)
            .then(()=>{
                setLoading(false)
            })
    } 
    
    const handleChangeDate2 = (date) => {
        setLoading(true)
        setSecondContact(date)

        const data = {
            idFestival: suiviExposant.idFestival,
            idParticipant: participant.idParticipant,
            secondContact: date
        }

        SuiviExposantService.updateSecondContact(data)
            .then(()=>{
                setLoading(false)
            })
    } 

    const handleChangeDate3 = (date) => {
        setLoading(true)
        setTroisiemeContact(date)

        const data = {
            idFestival: suiviExposant.idFestival,
            idParticipant: participant.idParticipant,
            troisiemeContact: date
        }

        SuiviExposantService.updateTroisiemeContact(data)
            .then(()=>{
                setLoading(false)
            })
    } 

    const handleChangeStatus = (status) => {
        setLoading(true)
        setStatus(status)

        const data = {
            idFestival: suiviExposant.idFestival,
            idParticipant: participant.idParticipant,
            status: status
        }

        SuiviExposantService.updateStatus(data)
            .then(()=>{
                setLoading(false)
            })
    } 

    const handleChangePlace = (place) => {
        setLoading(true)
        setPlace(place)

        const data = {
            idFestival: suiviExposant.idFestival,
            idParticipant: participant.idParticipant,
            place: place
        }

        SuiviExposantService.updatePlace(data)
            .then(()=>{
                setLoading(false)
            })
    }
    

    const handleChangeBenevol = (benevoles) => {
        setLoading(true)
        setBenevoles(benevoles)

        const data = {
            idFestival: suiviExposant.idFestival,
            idParticipant: participant.idParticipant,
            besoinBenevol: benevoles
        }

        SuiviExposantService.updateBesoinBenevol(data)
            .then(()=>{
                setLoading(false)
            })
    }



    const findReservation = () => {

        setLoading(true)

        const data = {
            festival: suiviExposant.idFestival,
            participantReservation: suiviExposant.idParticipant
        }

        ReservationService.getReservationByExposant(data).then(
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




    async function findEspacesReserves () {

        setLoading(true)

        await findReservation()
        

        ReservationService.getEspacesReservesForReservation(reservation).then(
            response => {
                const data = response.data
                setEspacesReserves(data)
                setNbTotalTables(ReservationService.calculTotalNbTables(data))
                setNbTotalM2(ReservationService.calculTotalM2(data))
                setPrixTotal(ReservationService.calculPrixTotal(data))
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
                        <Link component="button" variant="body2" >{participant.nomParticipant}</Link>
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
                                <DatePicker key={`${suiviExposant.idParticipant}deuxieme`} date={secondContact} onChange={handleChangeDate2} label="deuxieme contact" />
                            </Grid>
                            <Grid item xs={4}>
                                <DatePicker key={`${suiviExposant.idParticipant}troisieme`} date={troisiemeContact} onChange={handleChangeDate3} label="troisieme contact" />
                            </Grid>
                            <Grid item xs={4}>
                                {<FormControl>
                                    <InputLabel>Status de l'exposant</InputLabel>
                                    <Select
                                        id={participant.idParticipant}
                                        value={statusExposant.nomStatus}
                                        fullWidth
                                        onChange={(e) => handleChangeStatus(e.target.value)}
                                    >
                                        {statusExposant.map((status) => (
                                            <MenuItem key={status.idStatusExposant} value={status.idStatusExposant}>
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
                                            onChange={(e) => handleChangeBenevol(e.target.checked)}
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
                                            onChange={(e) => handleChangePlace(e.target.checked)}
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
