import * as TStopStation from './StopStationContext.types';

// Use an IIFE to define the initial state as we need to check session storage and query params
export const initialState = (() => {
  const state: TStopStation.State = {
    selectedModes: [],
    location: null,
    stops: [],
    searchRadius: 1,
  };

  return state;
})();

export const reducer = (
  state = initialState,
  action: TStopStation.StateAction
): TStopStation.State => {
  switch (action.type) {
    case 'UPDATE_SELECTED_MODES':
      return { ...state, selectedModes: action.payload };
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };
    case 'UPDATE_STOPS':
      return { ...state, stops: action.payload };
    case 'UPDATE_SEARCH_RADIUS':
      return { ...state, searchRadius: action.payload };
    case 'RESET_FORM':
      return initialState;
    // Default should return initial state if error
    default:
      return initialState;
  }
};
