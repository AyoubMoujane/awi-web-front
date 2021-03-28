import React, {useState, useEffect, useCallback} from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'

import { SuiviExposantList } from '../../components/Participant/SuiviExposantList'

import SuiviExposantService from '../../services/suiviExposant/suiviExposant'

export function SuiviExposantView () {

    const [suivisExposants, setSuivisExposants] = useState(null)
    const [statusExposant, setStatusExposant] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const data = {
        idFestival : 7
    } 
    
    const fetchSuiviExposant = useCallback(() => {
        setLoading(true)
        SuiviExposantService.getAllSuivisExposants(data).then(
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

    const fetchStatusExposant = useCallback(() => {
        setLoading(true)
        // SuiviExposantService.getStatusExposant().then(
        //     response => {
        //         setStatusExposant(response.data)
        //         setLoading(false)
        //     },
        //     error => {
        //         setError(error.response.data.message)
        //         setLoading(false)
        //     }
        // )
    })

    useEffect(function () {
        fetchSuiviExposant()
        fetchStatusExposant()
    }, [])

    return (
        <div>
            <Container maxWidth="xl">
                <Typography variant="h3" gutterBottom>
                    Suivi des exposants
                </Typography>
                {loading ?
                    <CircularProgress />
                    :
                    <SuiviExposantList suivisExposants={suivisExposants} statusExposant={statusExposant}/>
                }
            </Container>
        </div>
    )
}