import {
  getSearchParam,
  setSearchParam,
  delSearchParam,
  getAllSearchParams,
} from 'globalState/helpers/URLSearchParams';
import * as TForm from './FormContext.types';

// Use an IIFE to define the initial state as we need to check session storage and query params
export const initialState = (() => {
  const state: TForm.State = {
    selectedService: null,
    selectedMode: getSearchParam('mode') || null,
    busQuery: getSearchParam('q') || '',
  };

  return state;
})();

export const reducer = (state = initialState, action: TForm.StateAction): TForm.State => {
  switch (action.type) {
    case 'UPDATE_SELECTED_MODE':
      setSearchParam('mode', action.payload);
      return { ...state, selectedMode: action.payload };
    case 'UPDATE_SELECTED_SERVICE':
      return { ...state, selectedService: action.payload };
    case 'UPDATE_BUS_QUERY':
      setSearchParam('q', action.payload);
      return { ...state, busQuery: action.payload };
    case 'CLEAR_SEARCH':
      getAllSearchParams().forEach((param) => {
        delSearchParam(param);
      });
      return initialState;
    // Default should return initial state if error
    default:
      return initialState;
  }
};
