import * as TStation from './StationContext.types';
// Use an IIFE to define the initial state as we need to check session storage and query params
export const initialState = (() => {
  const state: TStation.State = {
    stationPointData: null,
    stationAtcoCode: '',
    stationDepartures: null,
  };

  return state;
})();

export const reducer = (state = initialState, action: TStation.StateAction): TStation.State => {
  switch (action.type) {
    case 'UPDATE_ATCOCODE':
      return { ...state, stationAtcoCode: action.payload };
    case 'UPDATE_STATION_POINT':
      return { ...state, stationPointData: action.payload };
    case 'UPDATE_STATION_DEPARTURES':
      return { ...state, stationDepartures: action.payload };
    case 'UPDATE_SELECTED_LINE':
      return { ...state, selectedLine: action.payload };
    case 'UPDATE_SELECTED_ROUTE':
      return { ...state, selectedRoute: action.payload };
    // Default should return initial state if error
    default:
      return initialState;
  }
};
