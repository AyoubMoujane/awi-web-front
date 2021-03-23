import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
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

export default function JeuDetail() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Editeur
        </Typography>
        <Typography variant="h5" component="h2">
          Nom du jeu
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Age
        </Typography>
        <Typography variant="body2" component="p">
          consigne 
          <br />
          {'consigne ....'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Modifier</Button>
      </CardActions>
    </Card>
  );
}
