import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100vh'
  },
  card: {
    minWidth: '40%',
    maxWidth: '50%'
  }
}));
