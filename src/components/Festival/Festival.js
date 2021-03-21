import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(espace, tables, prix, reserves, restant) {
    return { espace, tables, prix, reserves, restant };
}

const rows = [
    createData("Espace de l'entrée ", 159, 6.0, 24, 4.0),
    createData('Espace étage accueil', 237, 9.0, 37, 4.3),
    createData('Espace étage buvette', 262, 16.0, 24, 6.0),
    createData('Total', 305, 3.7, 67, 4.3),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export function Festival({ festival }) {
    const classes = useStyles();

    const [loading, setLoading] = useState(false)


    return (
        <div>
            <h2>{festival.nomFestival}</h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Espace</StyledTableCell>
                            <StyledTableCell align="right">tables</StyledTableCell>
                            <StyledTableCell align="right">prix(€)</StyledTableCell>
                            <StyledTableCell align="right">réservés</StyledTableCell>
                            <StyledTableCell align="right">restant</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.espace}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.tables}</StyledTableCell>
                                <StyledTableCell align="right">{row.prix}</StyledTableCell>
                                <StyledTableCell align="right">{row.reserves}</StyledTableCell>
                                <StyledTableCell align="right">{row.restant}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
