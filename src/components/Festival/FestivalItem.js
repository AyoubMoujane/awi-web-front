import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { useSelector, useDispatch } from 'react-redux'
import FestivalService from "../../services/festival/festival"
import { DatePicker } from "../Ui/DatePicker"
import filterGetCurrentFestival from "../../utils/filterCurrentFestival"
import { switchCurrentFestival } from "../../redux/actions/festival/festivalActions"

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
    const festivalReducer = useSelector(state => state.festivalReducer)
    const dispatch = useDispatch()

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const handleSwitch = () => {
        setLoading(true)
        let newCurrentFestival = {
            ...festival, estCourant: !estCourant,
            nbTableEntree: nbTableEntree,
            nbTableAccueil: nbTableAccueil,
            nbTableBuvette: nbTableBuvette
        }

        let previousCurrentFestival = filterGetCurrentFestival(festivalReducer.data)
        dispatch(switchCurrentFestival(newCurrentFestival, previousCurrentFestival))

    }

    const [loading, setLoading] = useState(false);

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
    const [estCourant] = useState(festival.estCourant)

    // variables calculées
    const [tableReserveEntree] = useState(0)
    const [tableReserveAccueil] = useState(0)
    const [tableReserveBuvette] = useState(0)
    const [m2reserveEntree] = useState(0)
    const [m2reserveAccueil] = useState(0)
    const [m2reserveBuvette] = useState(0)
    const [tableRestanteEntree] = useState(0)
    const [tableRestanteAccueil] = useState(0)
    const [tableRestanteBuvette] = useState(0)


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    useEffect(function () {
        festival.espaces.map((espace) => {
            if (espace.typeEspace === 1) {
                setNbTableEntree(espace.nbTableMax)
                setPrixTableEntree(espace.prixUnitaireTable)
                setPrixM2Entree(espace.prixM2)
            }
            if (espace.typeEspace === 2) {
                setNbTableAccueil(espace.nbTableMax)
                setPrixTableAccueil(espace.prixUnitaireTable)
                setPrixM2Accueil(espace.prixM2)
            }
            if (espace.typeEspace === 3) {
                setNbTableBuvette(espace.nbTableMax)
                setPrixTableBuvette(espace.prixUnitaireTable)
                setPrixM2Buvette(espace.prixM2)
            }

        })

        setSelectedDate(festival.dateFestival)
        setNom(festival.nomFestival)
    }, [])


    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true)

        const data = {
            ...festival,
            nomFestival: nom,
            dateFestival: selectedDate,
            nbTableEntree: nbTableEntree,
            nbTableAccueil: nbTableAccueil,
            nbTableBuvette: nbTableBuvette
        }

        FestivalService.updateFestival(
            data
        ).then(
            () => {
                handleClose()
            }
        )

        setLoading(false)

    }

    return (
        <div>

            <Box component="span" m={1}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={estCourant}
                            onChange={handleSwitch}
                            name="estCourant"
                            color="primary"
                        />
                    }
                    label="estCourant"
                />
                <Card>
                    <CardContent>
                        <h2>{nom}</h2>
                        <h3>{selectedDate}</h3>
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
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row">
                                            {"Espace Entrée"}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{nbTableEntree}</StyledTableCell>
                                        <StyledTableCell align="right">{prixTableEntree}</StyledTableCell>
                                        <StyledTableCell align="right">{prixM2Entree}</StyledTableCell>
                                        <StyledTableCell align="right">{tableReserveEntree}</StyledTableCell>
                                        <StyledTableCell align="right">{m2reserveEntree}</StyledTableCell>
                                        <StyledTableCell align="right">{tableRestanteEntree}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="row">
                                            {"Espace Accueil"}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{nbTableAccueil}</StyledTableCell>
                                        <StyledTableCell align="right">{prixTableAccueil}</StyledTableCell>
                                        <StyledTableCell align="right">{prixM2Accueil}</StyledTableCell>
                                        <StyledTableCell align="right">{tableReserveAccueil}</StyledTableCell>
                                        <StyledTableCell align="right">{m2reserveAccueil}</StyledTableCell>
                                        <StyledTableCell align="right">{tableRestanteAccueil}</StyledTableCell>
                                    </StyledTableRow>
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row">
                                            {"Espace Buvette"}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{nbTableBuvette}</StyledTableCell>
                                        <StyledTableCell align="right">{prixTableBuvette}</StyledTableCell>
                                        <StyledTableCell align="right">{prixM2Buvette}</StyledTableCell>
                                        <StyledTableCell align="right">{tableReserveBuvette}</StyledTableCell>
                                        <StyledTableCell align="right">{m2reserveBuvette}</StyledTableCell>
                                        <StyledTableCell align="right">{tableRestanteBuvette}</StyledTableCell>
                                    </StyledTableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br />
                        <Button variant="contained" color="primary" size="small" onClick={handleClickOpen}>Modifier</Button>

                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title"><TextField id="standard-full-width" label="Nom du festival" fullWidth value={nom} onChange={(e) => setNom(e.target.value)} /></DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    <DatePicker date={selectedDate} onChange={handleDateChange} label="date" />
                                </DialogContentText>
                                <Grid container spacing={3}>

                                    <Grid container item xs={12} spacing={3}>
                                        <Grid item xs={4}>
                                            <TextField label="Nombre Table Entree" variant="outlined" value={nbTableEntree} onChange={(e) => setNbTableEntree(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField label="Prix Table Entree" variant="outlined" value={prixTableEntree} disabled />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField label="Prix m2 Entree" variant="outlined" value={prixM2Entree} disabled />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} spacing={3}>
                                        <Grid item xs={4}>
                                            <TextField label="Nombre Table Acceuil" variant="outlined" value={nbTableAccueil} onChange={(e) => setNbTableAccueil(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField label="Prix Table Accueil" variant="outlined" value={prixTableAccueil} disabled />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField label="Prix m2 Accueil" variant="outlined" value={prixM2Accueil} disabled />
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} spacing={3}>
                                        <Grid item xs={4}>
                                            <TextField label="Nombre Table Buvette" variant="outlined" value={nbTableBuvette} onChange={(e) => setNbTableBuvette(e.target.value)} />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField label="Prix Table Buvette" variant="outlined" value={prixTableBuvette} disabled />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField label="Prix m2 Buvette" variant="outlined" value={prixM2Buvette} disabled />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Annuler
                    </Button>
                                <Button onClick={handleSubmit} color="primary" disabled={loading}>
                                    Modifier
                    </Button>
                            </DialogActions>
                        </Dialog>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}