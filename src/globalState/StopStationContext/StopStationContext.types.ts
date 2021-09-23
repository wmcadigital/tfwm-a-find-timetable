import { Mode } from 'globalState/GlobalContext/GlobalContext.types';

export type State = {
  selectedModes: Mode[];
};

export type StateAction = {
  type: 'UPDATE_SELECTED_MODES';
  payload: Mode[];
};

export type Context = [State, React.Dispatch<StateAction>];
