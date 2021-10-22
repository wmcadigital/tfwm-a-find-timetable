export type State = {
  stationPointData: any;
  stationAtcoCode: string;
  stationDepartures: any;
  selectedLine?: any;
  selectedRoute?: any;
};

export type StateAction =
  | {
      type: 'UPDATE_ATCOCODE';
      payload: string;
    }
  | {
      type: 'UPDATE_STATION_POINT';
      payload: any;
    }
  | {
      type: 'UPDATE_SELECTED_LINE';
      payload: any;
    }
  | {
      type: 'UPDATE_SELECTED_ROUTE';
      payload: any;
    }
  | {
      type: 'UPDATE_STATION_DEPARTURES';
      payload: any[];
    };

export type Context = [State, React.Dispatch<StateAction>];
