import React from 'react'
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
});


export function SuiviExposantList({ suivisExposants }) {

    const classes = useStyles();


    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Editeurs</TableCell>
                            <TableCell align="right">Commentaires</TableCell>
                            <TableCell align="right">Suivi des échanges</TableCell>
                            <TableCell align="right">Tables</TableCell>
                            <TableCell align="right">m2</TableCell>
                            <TableCell align="right">Factures</TableCell>
                            <TableCell align="right">Total (€)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suivisExposants ? suivisExposants.map(suiviExposant => <SuiviExposantItem key={suiviExposant._id} suiviExposant={suiviExposant}/>) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}