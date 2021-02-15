import { useParams } from "react-router";
import {Grid, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import CardContainer from "../CardContainer";
import {useSelector} from "react-redux";

interface ServiceParams {
  serviceId: string;
}

const ServiceInfo = () => {
  const { serviceId: serviceParamId } = (useParams() as ServiceParams);
  const services = useSelector((store: any) => store.services);
  const service: Service = services.find((service: Service) => service.id === serviceParamId)

  if(!service) return noServiceFound(serviceParamId);

  const isServiceDisruption = service.lineStatuses.find((status) => status.severity !== 10);
  const disruptionList = service.lineStatuses
    .filter((status) => status.severity !== 10)
    .map((status) => status.reason);

  const DisplayList = () => (
    <List dense>
      {
        disruptionList.map((reason: string, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${index+1}) ${reason}`} />
          </ListItem>
        ))
      }
    </List>
  );

  const headerTitle = isServiceDisruption ? "Service currently suffering disruptions" : "No service disruptions";
  return (
    <CardContainer headerTitle={headerTitle}>
      {
        isServiceDisruption
          ? <DisplayList />
          : "Kudos to the service!!!"
      }
    </CardContainer>
  )
}

export default ServiceInfo;

function noServiceFound(name: string) {
  return (
    <CardContainer headerTitle={name}>
      <Grid container alignItems="center">
        <ErrorIcon />
        <Typography variant="body2" color="textSecondary" component="p">
          Sorry! No service available with this name.
        </Typography>
      </Grid>
    </CardContainer>
  )
}
