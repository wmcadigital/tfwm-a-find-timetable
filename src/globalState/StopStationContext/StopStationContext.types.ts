import { Mode } from 'globalState/GlobalContext/GlobalContext.types';
import { ILocation } from './types/ILocation';
import { IStop } from './types/IStop';

export type State = {
  selectedModes: Mode[];
  location: ILocation | null;
  stops: IStop[];
};

export type StateAction =
  | {
      type: 'UPDATE_SELECTED_MODES';
      payload: Mode[];
    }
  | {
      type: 'UPDATE_LOCATION';
      payload: ILocation | null;
    }
  | {
      type: 'UPDATE_STOPS';
      payload: IStop[];
    };

export type Context = [State, React.Dispatch<StateAction>];
