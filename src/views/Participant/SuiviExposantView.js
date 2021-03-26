import React, {useState, useEffect, useCallback} from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'

import { SuiviExposantList } from '../../components/Participant/SuiviExposantList'

import SuiviExposantService from '../../services/suiviExposant/suiviExposant'

export function SuiviExposantView () {

    const [suivisExposants, setSuivisExposants] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchSuiviExposant = useCallback(() => {
        setLoading(true)
        SuiviExposantService.getAllSuivisExposants().then(
            response => {
                setSuivisExposants(response.data)
                setLoading(false)
            },
            error => {
                setError(error.response.data.message)
                setLoading(false)
            }
        )
    })

    console.log(suivisExposants)

    useEffect(fetchSuiviExposant, [])

    return (
        <div>
            <Container maxWidth="xl">
                <Typography variant="h3" gutterBottom>
                    Suivi des exposants
                </Typography>
                {loading ?
                    <CircularProgress />
                    :
                    <SuiviExposantList suivisExposants={suivisExposants}/>
                }
            </Container>
        </div>
    )
}