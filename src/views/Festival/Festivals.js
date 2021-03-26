import React, { useState, useEffect, useCallback } from "react";
import { FestivalForm } from "../../components/Festival/FestivalForm"
import { FestivalList } from "../../components/Festival/FestivalList"
import FestivalService from "../../services/festival/festival"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux'
import { fetchFestivals } from "../../redux/actions/festival"

export function Festivals() {
    const festivalReducer = useSelector(state => state.festivalReducer)
    const dispatch = useDispatch()

    const [festivals, setFestivals] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // const fetchFestivals = useCallback(() => {
    //     setLoading(true)
    //     FestivalService.getFestivals().then(
    //         response => {
    //             setFestivals(response.data)
    //             setLoading(false)
    //         },
    //         error => {
    //             setError(error.response.data.message)
    //             setLoading(false)
    //         }

    //     )
    // })

    const maintainOneCurrentFestival = () => {
        let currentFestival = festivals.filter((festival) => {
            return festival.estCourant
        })
    }

    // useEffect(fetchFestivals, [])

    return (
        <div>
            <p>{festivalReducer.idFestival}</p>
            <Button onClick={() => dispatch(fetchFestivals())}>Dispatch Fetch</Button>

            <Container maxWidth="xl">
                <Button onClick={maintainOneCurrentFestival} color="primary">
                    Test
                    </Button>
                <Typography variant="h3" gutterBottom>
                    Les festivals
                </Typography>
                <br />
                <br />
                {/* <FestivalForm fetchFestivals={fetchFestivals} /> */}
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

