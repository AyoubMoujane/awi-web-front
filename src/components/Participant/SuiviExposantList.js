import React, { useState } from 'react'
import { SuiviExposantItem } from './SuiviExposantItem'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    box: {
        width: "50%",
        height: "50%"
    }
});


export function SuiviExposantList({ suivisExposants, statusExposant}) {

    const classes = useStyles();


    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 50 }}>Exposants</TableCell>
                            <TableCell style={{ width: 300 }}>Commentaires</TableCell>
                            <TableCell style={{ width: 500 }}>Suivi des échanges</TableCell>
                            <TableCell style={{ width: 10 }}>Tables</TableCell>
                            <TableCell style={{ width: 10 }}>m2</TableCell>
                            <TableCell style={{ width: 50 }}>Factures</TableCell>
                            <TableCell style={{ width: 20 }}>Total (€)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suivisExposants ? suivisExposants.map(suiviExposant => <SuiviExposantItem key={suiviExposant.idParticipant} suiviExposant={suiviExposant} statusExposant={statusExposant}/>
                        ) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}