// import { getSearchParam, setSearchParam, delSearchParam } from '../helpers/URLSearchParams'; // (used to sync state with URL)
import * as TForm from './FormContext.types';

// Use an IIFE to define the initial state as we need to check session storage and query params
export const initialState = (() => {
  const state: TForm.State = {
    selectedService: null,
    selectedMode: null,
  };

  return state;
})();

export const reducer = (state = initialState, action: TForm.StateAction): TForm.State => {
  switch (action.type) {
    case 'UPDATE_SELECTED_MODE':
      return { ...state, selectedMode: action.payload };
    case 'UPDATE_SELECTED_SERVICE':
      return { ...state, selectedService: action.payload };
    // Default should return initial state if error
    default:
      return initialState;
  }
};
