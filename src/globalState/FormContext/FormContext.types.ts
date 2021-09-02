import { IServiceResult } from '../types/IServiceResult';

export type State = {
  selectedMode: string | null;
  selectedService: IServiceResult | null;
  busQuery: string;
};

export type StateAction =
  | {
      type: 'UPDATE_SELECTED_MODE';
      payload: 'bus' | 'rail' | 'metro';
    }
  | {
      type: 'UPDATE_SELECTED_SERVICE';
      payload: IServiceResult | null;
    }
  | {
      type: 'UPDATE_BUS_QUERY';
      payload: string;
    }
  | {
      type: 'CLEAR_SEARCH';
    };

export type Context = [State, React.Dispatch<StateAction>];
