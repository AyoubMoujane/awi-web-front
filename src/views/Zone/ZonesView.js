import React, {useState, useEffect} from 'react'
import ZoneService from '../../services/zone/zone'
import { ZoneList } from '../../components/Zone/ZoneList'
import { Alert, AlertTitle } from '@material-ui/lab';

export function ZonesView() {

    const [zones, setZone] = useState(null)
    const [error, setError] = useState(null)

    useEffect(function () {
        ZoneService.getZones().then(
            response => {
                setZone(response.data)
            },
            error => {
                setError(error.response.data.message)
            }
        )
    }, [])

    return (
        <div>
            <h2>Liste des zones du festival</h2>
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{error}</strong>
              </Alert>
            )}
            {zones === null ? null : <ZoneList zones={zones} />}
        </div>
    )
}