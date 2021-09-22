export type State = {};

export type StateAction = {
  type: 'UPDATE_SELECTED_MODE';
  payload: 'bus' | 'rail' | 'metro';
};

export type Context = [State, React.Dispatch<StateAction>];
