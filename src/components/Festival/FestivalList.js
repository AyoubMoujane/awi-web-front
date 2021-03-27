import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { Festival } from "./FestivalItem"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export function FestivalList({ festivals, fetchFestivals }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {festivals.map(festival => (
                    <Grid item xs={6}>
                        <Festival key={festival.idFestival} festival={festival} fetchFestivals={fetchFestivals} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
