import { IServiceResult } from '../types/IServiceResult';
import { IStation } from '../types/IStation';

export type State = {
  selectedMode: string | null;
  selectedService: IServiceResult | null;
  busQuery: string;
  trainQuery: {
    from: string;
    to: string;
  };
  stations: {
    from: Partial<IStation> | null;
    to: Partial<IStation> | null;
  };
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
      type: 'UPDATE_RAIL_QUERY';
      payload: {
        from: string;
        to: string;
      };
    }
  | {
      type: 'UPDATE_RAIL_STATIONS';
      payload: {
        from: Partial<IStation> | null;
        to: Partial<IStation> | null;
      };
    }
  | {
      type: 'CLEAR_SEARCH';
    };

export type Context = [State, React.Dispatch<StateAction>];
