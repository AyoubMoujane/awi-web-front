import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export function SuiviExposantItem({suiviExposant}) {

    return (
        <div>
            <TableRow key={suiviExposant.idParticipant}>
                <TableCell component="th" scope="row">
                    {suiviExposant.idParticipant}
                </TableCell>
                <TableCell align="right">{suiviExposant.idParticipant}</TableCell>
                <TableCell align="right">{suiviExposant.commentaires}</TableCell>
                <TableCell align="right">Suivi des echanges</TableCell>
                <TableCell align="right">Tables</TableCell>
                <TableCell align="right">m2</TableCell>
                <TableCell align="right">Factures</TableCell>
                <TableCell align="right">Total (€)</TableCell>
                
            </TableRow>
        </div>
    );
}