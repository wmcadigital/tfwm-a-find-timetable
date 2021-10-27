import { useParams } from 'react-router-dom';
import { useStopContext } from 'globalState';

// Components
import Loader from 'components/shared/Loader/Loader';
import useStopAPI from '../customHooks/useStopAPI';
import BusStop from '../BusStop/BusStop';

const StopInfo = () => {
  const [{ stopPointData }] = useStopContext();
  const { atcoCode } = useParams<{ atcoCode: string }>();
  const { loading, results } = useStopAPI(
    `/Stop/v2/Departures/${atcoCode}`,
    'UPDATE_STOP_DEPARTURES'
  );

  const { stopPoint } = stopPointData;

  let mode = 'bus';
  if (stopPoint.busStopType === 'NaptanMetroPlatform') {
    mode = 'metro';
  }

  return (
    <>
      {loading ? (
        <Loader size="large" />
      ) : (
        <>
          {results ? (
            <div className="wmnds-col-md-2-3">{mode === 'bus' ? <BusStop /> : 'tram'}</div>
          ) : (
            'No results'
          )}
        </>
      )}
    </>
  );
};

export default StopInfo;
