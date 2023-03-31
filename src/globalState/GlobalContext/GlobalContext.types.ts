export type Mode = 'bus' | 'rail' | 'tram';

export type State = {};

export type StateAction = {
  type: 'UPDATE_SELECTED_MODE';
  payload: Mode;
};

export type Context = [State, React.Dispatch<StateAction>];
