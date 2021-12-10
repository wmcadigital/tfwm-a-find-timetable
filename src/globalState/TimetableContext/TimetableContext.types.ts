import { IServiceResult } from 'globalState/TimetableContext/types/IServiceResult';
import { IStation } from 'globalState/TimetableContext/types/IStation';
import { Mode } from 'globalState/GlobalContext/GlobalContext.types';

export type ItoId = {
  id: string;
  atcoCode: string;
  operatorCode: string;
};

export type StatelessId = {
  stateless: string;
  version: string;
};

export type State = {
  selectedMode: Mode | null;
  selectedService: IServiceResult | null;
  serviceId: ItoId | null;
  serviceStateless: StatelessId | null;
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
      payload: Mode;
    }
  | {
      type: 'UPDATE_SERVICE_ID';
      payload: ItoId;
    }
  | {
      type: 'UPDATE_SERVICE_STATELESS';
      payload: StatelessId;
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
