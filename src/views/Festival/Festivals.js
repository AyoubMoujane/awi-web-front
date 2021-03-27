import React, { useState, useEffect, useCallback } from "react";
import { FestivalForm } from "../../components/Festival/FestivalForm"
import { FestivalList } from "../../components/Festival/FestivalList"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux'
import { fetchFestivals } from "../../redux/actions/festival/festivalActions"
import filterGetCurrentFestival from "../../utils/filterCurrentFestival"

export function Festivals() {

    const festivalReducer = useSelector(state => state.festivalReducer)
    const dispatch = useDispatch()



    useEffect(() => dispatch(fetchFestivals()), [])

    return (
        <div>
            <Container maxWidth="xl">
                <Typography variant="h3" gutterBottom>
                    Les festivals
                </Typography>
                <br />
                <br />
                <FestivalForm /*fetchFestivals={fetchFestivals}*/ />
                <br />
                <br />
                {festivalReducer.loading ?
                    <CircularProgress />
                    : (festivalReducer.data ? <FestivalList festivals={festivalReducer.data} /> :
                        <div>Aucun festival...</div>)
                }
            </Container>
        </div >
    )
}