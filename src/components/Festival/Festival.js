import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

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
    },
    txtField: {
        width: 10,
    }
});

export function Festival({ festival }) {
    const classes = useStyles();

    return (
        <div>
            <h2>{festival.nomFestival}</h2>
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
                            <StyledTableRow key={"Espace de l'entrée"} className={classes.txtField}>
                                <StyledTableCell component="th" scope="row">
                                    {"Espace de l'entrée"}
                                </StyledTableCell>
                                <StyledTableCell align="right"> <TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={"Espace de l'entrée"} className={classes.txtField}>
                                <StyledTableCell component="th" scope="row">
                                    {"Espace de l'entrée"}
                                </StyledTableCell>
                                <StyledTableCell align="right"> <TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={"Espace de l'entrée"} className={classes.txtField}>
                                <StyledTableCell component="th" scope="row">
                                    {"Espace de l'entrée"}
                                </StyledTableCell>
                                <StyledTableCell align="right"> <TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow key={"Espace de l'entrée"} className={classes.txtField}>
                                <StyledTableCell component="th" scope="row">
                                    {"Espace de l'entrée"}
                                </StyledTableCell>
                                <StyledTableCell align="right"> <TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                                <StyledTableCell align="right"><TextField id="outlined-basic" variant="outlined" width={5}/></StyledTableCell>
                            </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
