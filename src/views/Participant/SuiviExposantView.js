import React, {useState, useEffect, useCallback} from 'react'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'
import { useSelector, useDispatch } from 'react-redux'

import { SuiviExposantList } from '../../components/Participant/SuiviExposantList'
import filterCurrentFestival from '../../utils/filterCurrentFestival'

import SuiviExposantService from '../../services/suiviExposant/suiviExposant'
import StatusExposantService from '../../services/statusExposant/statusExposant'

export function SuiviExposantView () {

    const [suivisExposants, setSuivisExposants] = useState([])
    const [statusExposant, setStatusExposant] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const festivalReducer = useSelector(state => state.festivalReducer)
    const dispatch = useDispatch()

    const data = {
        idFestival : filterCurrentFestival(festivalReducer.data).idFestival
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

    const fetchStatusExposant = () => {
        setLoading(true)
        StatusExposantService.getStatusExposant().then(
            response => {
                setStatusExposant(response.data)
                setLoading(false)
            },
            error => {
                setError(error.response.data.message)
                setLoading(false)
            }
        )
    }

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