import React, { useState, useEffect } from 'react';
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
    }
});

export function Festival({ festival }) {
    const classes = useStyles();
/*
    const [nom, setNom] = useState('')
    const [selectedDate, setSelectedDate] = useState('');
    const [nbTableEntree, setNbTableEntree] = useState('')
    const [nbTableAccueil, setNbTableAccueil] = useState('')
    const [nbTableBuvette, setNbTableBuvette] = useState('')
    const [prixTableEntree, setPrixTableEntree] = useState('')
    const [prixTableAccueil, setPrixTableAccueil] = useState('')
    const [prixTableBuvette, setPrixTableBuvette] = useState('')
    const [prixM2Entree, setPrixM2Entree] = useState('')
    const [prixM2Accueil, setPrixM2Accueil] = useState('')
    const [prixM2Buvette, setPrixM2Buvette] = useState('')
*/
    console.log(festival.espaces[0]) 

    return (
        <div>
            <h2>{festival.nomFestival}</h2>
            <h3>{festival.dateFestival}</h3>
            {JSON.stringify(festival.espaces[0])}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Espace</StyledTableCell>
                            <StyledTableCell align="right">tables</StyledTableCell>
                            <StyledTableCell align="right">prix table (€)</StyledTableCell>
                            <StyledTableCell align="right">prix m2 (€)</StyledTableCell>
                            <StyledTableCell align="right">réservés tables</StyledTableCell>
                            <StyledTableCell align="right">réservés m2</StyledTableCell>
                            <StyledTableCell align="right">restant</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {festival.espaces.map((espace) => (
                            <StyledTableRow key={espace.typeEspace}>
                                <StyledTableCell component="th" scope="row">
                                    {espace.typeEspace}
                                </StyledTableCell>
                                <StyledTableCell align="right">{espace.nbTableMax}</StyledTableCell>
                                <StyledTableCell align="right">{espace.prixUnitaireTable}</StyledTableCell>
                                <StyledTableCell align="right">{espace.prixM2}</StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
