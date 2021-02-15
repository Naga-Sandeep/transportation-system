import axios from "axios";
import Endpoints from "./endpoints";
import sortBy from "lodash/sortBy";

interface ApiClientService {
  getServices: () => Promise<any>,
  searchBikePoints: (queryString: string) => Promise<any>
}

const apiClientService: ApiClientService = {
  getServices() {
    return axios
      .get(Endpoints.GET_SERVICES_STATUS)
      .then(extractServiceInfo)
      .then(sortByModeNameAndServiceName)
      .catch((error) => { throw Error(error); });
  },
  searchBikePoints(queryString) {
    return axios
      .get(Endpoints.SEARCH_BIKE_POINTS + queryString)
      .then(extractBikePoints)
      .catch((error) => { throw Error(error); })
  }
}

export default apiClientService;

function extractServiceInfo({data: rawServicesData}: any): Service[] {
  return rawServicesData
    .map((service: any) => ({
      id: service.id,
      name: service.name || '',
      modeName: service.modeName || '',
      types: getServiceTypes(service.serviceTypes || []),
      lineStatuses: getLineStatuses(service.lineStatuses || [])
    }))
}

function sortByModeNameAndServiceName(services: Service[]): Service[] {
  const serviceModeName = 'modeName';
  const serviceName = 'name';
  return sortBy(services, [serviceModeName, serviceName]);
}

function getLineStatuses(statuses: any[]): LineStatuses[] {
  return statuses.map((status: any) => ({
    severity: status.statusSeverity,
    reason: status.reason || ''
  }));
}

function getServiceTypes(types: any[]): ServiceTypes[] {
  return types.map((type: any) => type.name);
}

function extractBikePoints({data: rawBikePointsData}: any): BikePoint[] {
  return rawBikePointsData
    .map((bikePoint: any) => ({
      fullId: bikePoint.id,
      id: extractDigitsFromId(bikePoint.id),
      name: bikePoint.commonName,
      lat: bikePoint.lat,
      long: bikePoint.lon
    }))
}

function extractDigitsFromId(fullId: string): number {
  return parseInt(fullId.split('_')[1]);
}
