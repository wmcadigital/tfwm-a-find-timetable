import { useStopContext } from 'globalState';

// Components
import BusStop from '../BusStop/BusStop';

const StopInfo = () => {
  const [{ stopPointData, stopDepartures }] = useStopContext();
  const { stopPoint } = stopPointData;

  let mode = 'bus';
  if (stopPoint.busStopType === 'NaptanMetroPlatform') {
    mode = 'metro';
  }

  return (
    <>
      {stopDepartures ? (
        <div className="wmnds-col-md-2-3">{mode === 'bus' ? <BusStop /> : 'tram'}</div>
      ) : (
        'No results'
      )}
    </>
  );
};

export default StopInfo;
