import CardContainer from "../CardContainer";
import { Typography } from "@material-ui/core";

const Home = () => {
  const headerTitle = "Welcome to London's Transportation system";
  return (
    <CardContainer headerTitle={headerTitle}>
      <Typography variant="body2" color="textSecondary" component="p">
        Please take a look at the TFL services in the sidebar and select one for info.
      </Typography>
    </CardContainer>
  )
}

export default Home;
