import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from "@material-ui/core";
import JeuService from '../../services/jeu/jeu'
import { useHistory,Link } from 'react-router-dom'


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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [rows, setRows] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const fetchJeux = () => {
    JeuService.findAll()
        .then(data => {
            setRows(data)
            setIsLoading(false)
            
        })
        .catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    }
    useEffect(fetchJeux, []);
    let history = useHistory();

  const handleClick = (event, idJeu) => {
    console.log(idJeu)
    history.push('/jeux/'+idJeu)
    }

  return (
    <div>
    {isLoading && <Grid alignItems='center' ><CircularProgress /></Grid>}
    {rows && 
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nom du jeu</StyledTableCell>
            <StyledTableCell align="right">Editeur</StyledTableCell>
            <StyledTableCell align="right">Type de jeu</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Min joueurs</StyledTableCell>
            <StyledTableCell align="right">Max joueurs</StyledTableCell>
            <StyledTableCell align="right">Durée</StyledTableCell>
            <StyledTableCell align="right">Avant-première</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow onClick={(event) => handleClick(event, row.idJeu)} key={row.nomJeu}>
              <StyledTableCell component="th" scope="row">
                {row.nomJeu}
              </StyledTableCell>
              <StyledTableCell align="right">{row.participant.nomParticipant}</StyledTableCell>
              <StyledTableCell align="right">{row.jeuType.nomType}</StyledTableCell>
              <StyledTableCell align="right">{row.age}</StyledTableCell>
              <StyledTableCell align="right">{row.nbJoueurMin}</StyledTableCell>
              <StyledTableCell align="right">{row.nbJoueurMax}</StyledTableCell>
              <StyledTableCell align="right">{row.duree}</StyledTableCell>
              <StyledTableCell align="right">{row.prototype}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
}
    </div>
  );
}
