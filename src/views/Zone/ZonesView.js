import React, {useState, useEffect, useCallback} from 'react'
import ZoneService from '../../services/zone/zone'
import { ZoneList } from '../../components/Zone/ZoneList'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'


export function ZonesView() {

    const [loading, setLoading] = useState(false)
    const [zones, setZone] = useState(null)
    const [error, setError] = useState(null)

    const fetchZones = useCallback(() => {
        setLoading(true)
        ZoneService.getZones().then(
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
            <Container maxWidth="xl">
            <Typography variant="h3" gutterBottom>
                Liste des zones du festival
            </Typography>
            {loading ?
                    <CircularProgress />
                    :
                    zones === null ? null : <ZoneList zones={zones} />
            }
            </Container>
        </div>
    )
}