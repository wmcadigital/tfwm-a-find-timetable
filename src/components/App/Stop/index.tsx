import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStopContext } from 'globalState';

// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import Button from 'components/shared/Button/Button';
import Loader from 'components/shared/Loader/Loader';
import Icon from 'components/shared/Icon/Icon';
import s from './Stop.module.scss';
import AllStopDepartures from './AllStopDepartures/AllStopDepartures';
import ServiceInfo from './ServiceInfo/ServiceInfo';
import ServiceSelect from './ServiceSelect/ServiceSelect';
import useStopAPI from './customHooks/useStopAPI';

const StopInfo = ({ stopPoint }: { stopPoint: any }) => {
  const [{ selectedLine }] = useStopContext();
  const { atcoCode } = useParams<{ atcoCode: string }>();
  const departures = useStopAPI(`/Stop/v2/Departures/${atcoCode}`, 'UPDATE_STOP_DEPARTURES');

  let mode = 'bus';
  if (stopPoint.busStopType === 'NaptanMetroPlatform') {
    mode = 'metro';
  }

  return (
    <div className="wmnds-col-md-2-3">
      <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid--justify-between">
        <div className="wmnds-col-2-3">
          <h2>
            {stopPoint.locality}, {stopPoint.commonName} ({stopPoint.indicator}){' '}
            <Icon className={`${s.modeIcon} ${s[mode]}`} iconName={`modes-isolated-${mode}`} />
          </h2>
        </div>
        <div className="wmnds-col-auto">
          <Button
            btnClass="wmnds-btn--secondary wmnds-col-1"
            text="View map"
            iconRight="general-location-pin"
          />
        </div>
      </div>
      {mode === 'bus' && (
        <>
          <p>
            Select a bus service to see real time information, timetable and travel updates. <br />
            Bus services with the same number are run by different bus companies.
          </p>
          <div className={s.services}>
            <ServiceSelect />
          </div>
        </>
      )}
      {selectedLine === '' ? (
        <AllStopDepartures lines={stopPoint.lines} departures={departures} />
      ) : (
        <ServiceInfo departures={departures} />
      )}
    </div>
  );
};

const Stop = () => {
  const { atcoCode } = useParams<{ atcoCode: string }>();
  const { results, loading } = useStopAPI(`/Stop/v2/Point/${atcoCode}`, 'UPDATE_STOP_POINT');
  const [, stopDispatch] = useStopContext();

  useEffect(() => {
    stopDispatch({ type: 'UPDATE_ATCOCODE', payload: atcoCode });
  }, [stopDispatch, atcoCode]);

  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>{results?.stopPoint ? <StopInfo stopPoint={results.stopPoint} /> : 'Error'}</>
      )}
    </div>
  );
};

export default Stop;
