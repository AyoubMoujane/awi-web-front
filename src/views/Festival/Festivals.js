import React, { useState, useEffect, useCallback } from "react";
import { FestivalForm } from "../../components/Festival/FestivalForm"
import { FestivalList } from "../../components/Festival/FestivalList"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux'
import { fetchFestivalsRequest } from "../../redux/actions/festival/festivalActions"
import { connect } from 'react-redux'
import { Festival } from "../../components/Festival/Festival";

export function Festivals() {

    const festivalReducer = useSelector(state => state.festivalReducer)
    const dispatch = useDispatch()

    const [festivals, setFestivals] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const maintainOneCurrentFestival = () => {
        let currentFestival = festivals.filter((festival) => {
            return festival.estCourant
        })
    }

    // useEffect(fetchFestivals, [])

    return (
        <div>
            <p>{festivalReducer.idFestival}</p>
            <Button onClick={() => dispatch(fetchFestivalsRequest())}>Dispatch Fetch</Button>

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
                    // festivals === null ? null : <FestivalList festivals={festivals} fetchFestivals={fetchFestivals} />
                    festivals === null ? null : <FestivalList festivals={festivals} />

                }

            </Container>
        </div>
    )
}

// const mapStateToProps = state => {
//     return {
//         festivals: state.festivals
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         fetchFestivalsRequest: dispatch(fetchFestivalsRequest())
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Festivals)