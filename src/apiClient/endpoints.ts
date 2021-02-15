enum Endpoints {
  GET_SERVICES_STATUS = "https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=true",
  SEARCH_BIKE_POINTS = "https://api.tfl.gov.uk/BikePoint/Search?query="
}

export default Endpoints;
