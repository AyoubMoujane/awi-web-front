import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export function Zone({ zone }) {

    const classes = useStyles();

    const nbJeux = zone.jeux.length

    return (
        <div className={classes.root}>
            
                <Box component="span" m={1}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography className={classes.heading}>Zone - {zone.nomZone} - {nbJeux} jeux </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nom du jeu</TableCell>
                                                <TableCell align="right">Editeur</TableCell>
                                                <TableCell align="right">Nb Joueur</TableCell>
                                                <TableCell align="right">Age min</TableCell>
                                                <TableCell align="right">Type</TableCell>
                                                <TableCell align="right">Avant-Prem</TableCell>
                                                <TableCell align="right">Placé ?</TableCell>
                                                <TableCell align="right">Reçu ?</TableCell>
                                                <TableCell align="right">Animateurs</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {zone.jeux.map((jeu) => (
                                                <TableRow key={jeu.idJeu}>
                                                    <TableCell component="th" scope="row">{jeu.nomJeu}</TableCell>
                                                    <TableCell align="right">{jeu.editeur}</TableCell>
                                                    <TableCell align="right">{jeu.nbJoueurMin}-{jeu.nbJoueurMax}</TableCell>
                                                    <TableCell align="right">{jeu.type}</TableCell>
                                                    <TableCell align="right">{jeu.prototype}</TableCell>
                                                    <TableCell align="right"></TableCell>
                                                    <TableCell align="right"></TableCell>
                                                    <TableCell align="right"></TableCell>
                                                    <TableCell align="right"></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Typography>
                        </AccordionDetails>
                        <Container maxWidth="sm">
                        <TextField id="standard-basic" label="Nombre de jeux" value = {nbJeux} disabled/>
                        </Container>
                    </Accordion>
                </Box>
         
        </div>
    )
}