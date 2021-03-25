import React from 'react'
import Typography from '@material-ui/core/Typography'
import { SuiviExposantList } from '../../components/Participant/SuiviExposantList'


export function SuiviExposantView () {

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                    Suivi des exposants
            </Typography>
            <SuiviExposantList/>
        </div>
    )
}