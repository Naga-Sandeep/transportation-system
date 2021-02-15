import { AppBar, Toolbar, IconButton, Typography, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import TrainIcon from '@material-ui/icons/Train';
import useStyles from './styles';

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.header}>
      <Toolbar>
        <Grid container justify="center" alignItems="center">
          <Link to="/" className={classes.link}>
            <Grid item>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <TrainIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">Transportation System</Typography>
            </Grid>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
