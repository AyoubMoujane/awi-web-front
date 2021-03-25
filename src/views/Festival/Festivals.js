import React, { useState, useEffect, useCallback } from "react";
import { Festival } from "../../components/Festival/Festival"
import { FestivalForm } from "../../components/Festival/FestivalForm"
import FestivalService from "../../services/festival/festival"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';

export function Festivals() {


    const [festivals, setFestivals] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchFestivals = useCallback(() => {
        setLoading(true)
        FestivalService.getFestivals().then(
            response => {
                setFestivals(response.data)
                setLoading(false)
            },
            error => {
                setError(error.response.data.message)
                setLoading(false)
            }

        )
    })

    useEffect(fetchFestivals, [])

    return (
        <div>
            <Container maxWidth="xl">
                <Typography variant="h3" gutterBottom>
                    Les festivals
                </Typography>
                <br />
                <br />
                <FestivalForm fetchFestivals={fetchFestivals}/>
                <br />
                <br />
                {loading ?
                    <CircularProgress />
                    :
                    festivals === null ? null : <FestivalList festivals={festivals} fetchFestivals={fetchFestivals} />
                }
                
            </Container>
        </div>
    )
}

function FestivalList({ festivals, fetchFestivals }) {
    return (
        <div>
            {festivals.map(festival => <Festival key={festival.idFestival} festival={festival} fetchFestivals={fetchFestivals}/>)}
        </div>
    )
}