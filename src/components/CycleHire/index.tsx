import { useState } from "react";
import {Grid, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import CardContainer from "../CardContainer";
import SearchBar from "../SearchBar";
import apiClientService from "../../apiClient";

const CycleHire = () => {
  const [bikeQuery, setBikeQuery] = useState('');
  const [bikePoints, setBikePoints] = useState<BikePoint[] | null>(null);
  const [cacheMemory, setCacheMemory] = useState<{[key: string]: BikePoint[]}>({});
  const [loading, setLoading] = useState(false);

  const updateCacheMemory = (query: string, bikePoints: BikePoint[]) => {
    const updatedCacheMemory = {...cacheMemory, [query]: [...bikePoints]}
    setCacheMemory(updatedCacheMemory);
  }

  const searchBikePoints = async (query: string) => {
    try {
      setLoading(true);
      const bikePoints: BikePoint[] = await apiClientService.searchBikePoints(query);
      setLoading(false);
      updateCacheMemory(query, bikePoints);
      setBikePoints([...bikePoints]);
    } catch (error) {
      setLoading(false);
      setBikePoints([]);
    }
  }

  const onChangeHandler = (event: any) => {
    const query = event?.target?.value;
    setBikeQuery(query);
    if(!query) return;
    // cache memory check
    if(cacheMemory.hasOwnProperty(query)) {
      console.log('found in cache...');
      setBikePoints(cacheMemory[query]);
    } else {
      console.log('calling api...');
      searchBikePoints(query);
    }
  }

  const DisplayBikePointsList = () => (
    <List dense>
      {
        bikePoints?.map(({id, name, lat, long}, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${index+1}) ${id} ${name} (${lat}, ${long})`} />
          </ListItem>
        ))
      }
    </List>
  );

  const DisplayNoBikePointsMsg = () => (
    <Grid container alignItems="center">
      <ErrorIcon />
      <Typography variant="body2" color="textSecondary" component="p">
        Sorry! No Bike Points found for "{bikeQuery}"
      </Typography>
    </Grid>
  );

  return (
    <CardContainer headerTitle="Cycle Hire">
      <Grid container alignItems="center">
        <SearchBar onChange={onChangeHandler} loading={loading} />
        { !bikePoints?.length
            && bikePoints !== null
            && <DisplayNoBikePointsMsg />
        }
        { !loading && <DisplayBikePointsList /> }
      </Grid>
    </CardContainer>
  )
}

export default CycleHire;
