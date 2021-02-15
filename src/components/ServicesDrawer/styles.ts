import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 270;

export default makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    minWidth: '30px'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  loadingText: {
    margin: '20px 10px'
  }
}));
