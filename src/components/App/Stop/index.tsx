import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStopContext } from 'globalState';

// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import Loader from 'components/shared/Loader/Loader';
import useStopAPI from './customHooks/useStopAPI';
import StopInfo from './StopInfo/StopInfo';

const Stop = () => {
  const { atcoCode } = useParams<{ atcoCode: string }>();
  const { loading } = useStopAPI(`/Stop/v2/Point/${atcoCode}`, 'UPDATE_STOP_POINT');
  const [{ stopPointData }, stopDispatch] = useStopContext();

  useEffect(() => {
    stopDispatch({ type: 'UPDATE_ATCOCODE', payload: atcoCode });
  }, [stopDispatch, atcoCode]);

  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      {loading ? <Loader /> : <>{stopPointData ? <StopInfo /> : 'Error'}</>}
    </div>
  );
};

export default Stop;
