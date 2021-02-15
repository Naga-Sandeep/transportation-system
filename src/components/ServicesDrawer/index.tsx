import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Typography,
  Grid
} from "@material-ui/core";
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import { fetchServices } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";

const ServicesDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const services: Service[] = useSelector((store: any) => store.services);
  const loading = useSelector((store: any) => store.loading);

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  const isStatusSevere = (statuses: LineStatuses[]) => {
    return statuses.find((status) => status.severity !== 10);
  }

  const ServiceListItem = ({ service }: {service: Service}) => (
    <Link to={`/${service.id}`} className={classes.link}>
      <ListItem button>
        <ListItemText primary={service.name} />
        <ListItemIcon className={classes.icon}>
          { service.types.includes('Night') && <NightsStayIcon /> }
        </ListItemIcon>
        <ListItemIcon className={classes.icon}>
          { isStatusSevere(service.lineStatuses) && <WarningRoundedIcon /> }
        </ListItemIcon>
      </ListItem>
    </Link>
  );

  const ServicesList = ({ services }: {services: Service[]}) => (
    <List>
      {
        services.length
          ? services.map((service, index) => <ServiceListItem key={index} service={service} />)
          : <Typography variant="body2" color="textSecondary">No services available at the moment</Typography>
      }
    </List>
  );

  const CycleHireListItem = () => (
    <List>
      <Link to="/cycle-hire" className={classes.link}>
        <ListItem button key="cycleHire">
          <ListItemIcon><DirectionsBikeIcon /></ListItemIcon>
          <ListItemText primary="Cycle Hire" />
        </ListItem>
      </Link>
    </List>
  );

  const LoadingIndicator = () => (
    <Grid container alignItems="center" justify="center">
      <CircularProgress size={20} />
      <Typography variant="body2" color="textSecondary" className={classes.loadingText}>
        loading services...
      </Typography>
    </Grid>
  );

  return (
    <Drawer variant="permanent" className={classes.drawer} classes={{ paper: classes.drawerPaper }}>
      <Toolbar />
      <div className={classes.drawerContainer}>
        {
          loading
            ? <LoadingIndicator />
            : <ServicesList services={services} />
        }
        <Divider />
        <CycleHireListItem />
      </div>
    </Drawer>
  )
}

export default ServicesDrawer;
