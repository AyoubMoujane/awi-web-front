import React, { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
// import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid } from "@material-ui/core";


// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     '& > * + *': {
//       marginLeft: theme.spacing(2),
//     },
//   },
// }));

const columns = [
  { field: 'idJeu', headerName: 'ID', width: 70 },
  { field: 'nomJeu', headerName: 'Nom du jeu', width: 130 },
  { field: 'editeur', headerName: 'Éditeur', width: 95 },
  { field: 'type', headerName: 'Type de jeu', width: 150 },

  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'nbJoueurMin',
    headerName: 'Min joueurs',
    description: 'Nombre de joueurs minimum pour jouer à ce jeu.',
    type: 'number',
    width: 125,
  },
  {
    field: 'nbJoueurMax',
    headerName: 'Max joueurs',
    description: 'Nombre de joueurs maximal pour jouer à ce jeu.',
    type: 'number',
    width: 125,
  },
  {
    field: 'duree',
    headerName: 'Durée',
    description: 'Durée moyenne en minutes du jeu estimée.',
    type: 'number',
    width: 90,
  },
  {
    field: 'prototype',
    headerName: 'Avant-première ?',
    type: 'boolean',

    width: 180,
  },
];


export default function JeuList() {
  // const classes = useStyles();
  const [jeux, setJeux] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetch("http://localhost:8080/api/jeux")
      .then(resp => resp.json())
      .then(data => {
        setJeux(data);
        setIsLoading(false);
      })
  }, [setJeux])
  console.log(jeux)

  return (
    <div style={{ height: 400, width: '100%' }}>
      {isLoading && <Grid alignItems='center' ><CircularProgress /></Grid>}
      {jeux &&
        <DataGrid getRowId={(row => row.idJeu)} rows={jeux} columns={columns} pageSize={5} checkboxSelection loading={isLoading} />
      }
    </div>
  );
}
