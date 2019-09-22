import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    backgroundColor : '#e8ecf1',
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

export default function MemberCard(props) {
  const classes = useStyles();
  const name = props.card["name"];
  const city = props.card["city"];
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {city}
        </Typography>
        <Button className="helpIcon" size="small"><InfoIcon color="midnightblue"></InfoIcon></Button>
      </CardContent>
      {/* <CardActions>
        
      </CardActions> */}
    </Card>
  );
}
