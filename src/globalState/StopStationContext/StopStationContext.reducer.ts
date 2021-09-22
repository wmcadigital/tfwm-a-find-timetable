import * as TStopStation from './StopStationContext.types';

// Use an IIFE to define the initial state as we need to check session storage and query params
export const initialState = (() => {
  const state: TStopStation.State = {};

  return state;
})();

export const reducer = (
  state = initialState,
  action: TStopStation.StateAction
): TStopStation.State => {
  switch (action.type) {
    case 'UPDATE_SELECTED_MODE':
      return { ...state };
    // Default should return initial state if error
    default:
      return initialState;
  }
};
