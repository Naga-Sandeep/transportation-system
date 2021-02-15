import { Action } from "redux";
import {FETCH_SERVICES_FAILURE, FETCHED_SERVICES, LOADED, LOADING} from "./actionTypes";

const initialState = {
  services: [],
  loading: false
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case LOADED:
      return { ...state, loading: false }
    case FETCHED_SERVICES:
      return {
        ...state,
        services: (action as any).services
      }
    case FETCH_SERVICES_FAILURE:
      return {
        ...state,
        services: initialState.services
      }
    default:
      return state;
  }
}

export default reducer;
