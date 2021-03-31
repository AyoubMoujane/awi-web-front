import React, { useState, useEffect, useCallback } from 'react'
import ZoneService from '../../services/zone/zone'
import { ZoneList } from '../../components/Zone/ZoneList'
import { ZoneForm } from '../../components/Zone/ZoneForm'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'
import { useSelector } from 'react-redux'
import filterCurrentFestival from '../../utils/filterCurrentFestival'
import RefreshIcon from '@material-ui/icons/Refresh';


export function ZonesView() {
    const [loading, setLoading] = useState(false)
    const [zones, setZone] = useState(null)
    const [error, setError] = useState(null)

    const festivalReducer = useSelector(state => state.festivalReducer)

    const fetchZones = useCallback(() => {
        setLoading(true)
        ZoneService.getCurrentFestivalZones().then(
            response => {
                setZone(response.data)
                setLoading(false)
            },
            error => {
                setError(error.response.data.message)
                setLoading(false)
            }
        )
    })

    useEffect(fetchZones, [])

    return (
        <div>
            <ZoneForm currentFestivalId={filterCurrentFestival(festivalReducer.data).idFestival} />
            <Container maxWidth="xl">
                <Typography variant="h3" gutterBottom>
                    Liste des zones du festival
            </Typography>
                <RefreshIcon onClick={fetchZones} />
                {loading ?
                    <CircularProgress />
                    :
                    zones === null ? null : <ZoneList zones={zones} />
                }
            </Container>
        </div>
    )
}