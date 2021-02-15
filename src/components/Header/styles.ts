import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => createStyles({
  header: {
    zIndex: 1300
  },
  link: {
    display: 'inherit',
    justifyContent: 'inherit',
    alignItems: 'inherit',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));
