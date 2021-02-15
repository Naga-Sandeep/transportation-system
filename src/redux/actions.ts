import { Dispatch } from "redux";
import apiClientService from "../apiClient";
import {FETCH_SERVICES_FAILURE, FETCHED_SERVICES, LOADING, LOADED} from "./actionTypes";

interface AsyncDispatch {
  (dispatch: Dispatch, getState?: () => any): Promise<void>
}

const loading = () => ({
  type: LOADING
});

const loaded = () => ({
  type: LOADED
});

const fetchedServices = (services: any) => ({
  type: FETCHED_SERVICES ,
  services
})

const fetchedServicesFailure = () => ({
  type: FETCH_SERVICES_FAILURE
})

export const fetchServices = (): AsyncDispatch => async(dispatch) => {
  try {
    dispatch(loading());
    const services = await apiClientService.getServices();
    dispatch(fetchedServices(services));
    dispatch(loaded());
  } catch (error) {
    console.error(error);
    dispatch(fetchedServicesFailure());
    dispatch(loaded());
  }
}
