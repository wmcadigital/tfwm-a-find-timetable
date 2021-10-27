import { useStopContext } from 'globalState';

// Components
import BusStop from '../BusStop/BusStop';
import TramStop from '../TramStop/TramStop';

const StopInfo = () => {
  const [{ stopPointData, stopDepartures }] = useStopContext();
  const { stopPoint } = stopPointData;

  let mode = 'bus';
  if (stopPoint.busStopType === 'NaptanMetroPlatform') {
    mode = 'metro';
  }

  return (
    <>{stopDepartures ? <div>{mode === 'bus' ? <BusStop /> : <TramStop />}</div> : 'No results'}</>
  );
};

export default StopInfo;
