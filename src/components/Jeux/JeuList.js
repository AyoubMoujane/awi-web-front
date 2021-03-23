import { useState, useEffect } from "react";
// import { DataGrid } from '@material-ui/data-grid';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { Grid } from "@material-ui/core";




// const columns = [
//   { field: 'idJeu', headerName: 'ID', width: 70 },
//   { field: 'nomJeu', headerName: 'Nom du jeu', width: 130 },
//   { field: 'editeur', headerName: 'Éditeur', width: 95 },
//   { field: 'type', headerName: 'Type de jeu', width: 150 },

//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'nbJoueurMin',
//     headerName: 'Min joueurs',
//     description: 'Nombre de joueurs minimum pour jouer à ce jeu.',
//     type: 'number',
//     width: 125,
//   },
//   {
//     field: 'nbJoueurMax',
//     headerName: 'Max joueurs',
//     description: 'Nombre de joueurs maximal pour jouer à ce jeu.',
//     type: 'number',
//     width: 125,
//   },
//   {
//     field: 'duree',
//     headerName: 'Durée',
//     description: 'Durée moyenne en minutes du jeu estimée.',
//     type: 'number',
//     width: 90,
//   },
//   {
//     field: 'prototype',
//     headerName: 'Avant-première ?',
//     type: 'boolean',

//     width: 180,
//   },
// ];


// export default function JeuList() {
//   const [jeux, setJeux] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   useEffect(() => {
//     fetch("http://localhost:8080/api/jeux")
//       .then(resp => resp.json())
//       .then(data => {
//         setJeux(data);
//         setIsLoading(false);
//       })
//   }, [setJeux])
//   console.log(jeux)

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       {isLoading && <Grid alignItems='center' ><CircularProgress /></Grid>}
//       {jeux &&
//         <DataGrid getRowId={(row => row.idJeu)} rows={jeux} columns={columns} pageSize={20} checkboxSelection loading={isLoading} />
//       }
//     </div>
//   );
// }

import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList() {
  const classes = useStyles();
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

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">

      {jeux.map((jeu) => (
          <ListItem button key={jeu}>
          <ListItemLink href="#simple-list">
            <ListItemText primary={jeu.idJeu} />
          </ListItemLink>
          </ListItem>
        ))}

        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Spam" />
        </ListItemLink>
      </List>
    </div>
  );
}

