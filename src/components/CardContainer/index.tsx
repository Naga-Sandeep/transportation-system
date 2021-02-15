import {Card, CardHeader, CardContent, Grid, Divider} from "@material-ui/core";
import useStyles from './styles';

const CardContainer = ({ headerTitle, children }: any) => {
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center" className={classes.container}>
      <Card variant="outlined" className={classes.card}>
        <CardHeader title={headerTitle} />
        <Divider />
        <CardContent>
          { children || 'no content' }
        </CardContent>
      </Card>
    </Grid>
  )
};

export default CardContainer;
