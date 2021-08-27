import { IServiceResult } from '../types/IServiceResult';

export type State = {
  selectedMode: 'bus' | 'rail' | 'metro' | null;
  selectedService: IServiceResult | null;
};

export type StateAction =
  | {
      type: 'UPDATE_SELECTED_MODE';
      payload: 'bus' | 'rail' | 'metro' | null;
    }
  | {
      type: 'UPDATE_SELECTED_SERVICE';
      payload: IServiceResult | null;
    }
  | {
      type: 'SHOW_RESULT';
      payload: boolean;
    }
  | {
      type: 'CHANGE_VIEW';
      payload: boolean;
    };

export type Context = [State, React.Dispatch<StateAction>];
