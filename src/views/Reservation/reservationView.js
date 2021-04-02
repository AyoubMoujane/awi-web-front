import React, { useState, useEffect, useCallback } from 'react'
import { ReservationList } from '../../components/Reservation/ReservationList'
import { ReservationForm } from '../../components/Reservation/ReservationForm'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'
import ReservationService from '../../services/reservation/reservation'
import { useSelector, useDispatch } from 'react-redux'
import filterCurrentFestival from '../../utils/filterCurrentFestival'

export function ReservationView() {

    const festivalReducer = useSelector(state => state.festivalReducer)
    const dispatch = useDispatch()

    const [reservations, setReservations] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)



    const fetchReservations = useCallback(() => {

        const data = {
            festival : filterCurrentFestival(festivalReducer.data).idFestival
        }

        setLoading(true)
        ReservationService.getReservationByFestival(data).then(
            response => {
                setReservations(response.data)
                setLoading(false)
            },
            error => {
                setError(error.response)
                setLoading(false)
            }
        )
    })




    useEffect(fetchReservations, [])


    return (
        <div>
            <Container maxWidth="xl">
                <ReservationForm fetchReservations={fetchReservations} />
                <br/>
                <Typography variant="h3" gutterBottom>
                    Liste des reservations
                </Typography>
                {loading ?
                    <CircularProgress />
                    :
                    <ReservationList reservations={reservations} fetchReservations={fetchReservations} />
                }
            </Container>
        </div>
    )
}