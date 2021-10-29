import { useState } from 'react';
import { useStopContext } from 'globalState';

// Components
import Icon from 'components/shared/Icon/Icon';
import NearestStops from 'components/shared/Sidebar/NearestStops';
import s from '../Stop.module.scss';
import AllStopDepartures from '../AllStopDepartures/AllStopDepartures';
import ServiceInfo from '../ServiceInfo/ServiceInfo';
import ServiceSelect from '../ServiceSelect/ServiceSelect';
import StopInfoHeader from '../StopInfo/StopInfoHeader';
import Map from '../Map/Map';

import useStopAPI from '../customHooks/useStopAPI';

const BusStop = () => {
  const [showMap, setShowMap] = useState(false);
  const [{ stopPointData, selectedLine, stopDepartures, stopAtcoCode }] = useStopContext();
  const { stopPoint } = stopPointData;
  const { departures } = stopDepartures;
  const serviceInfo = useStopAPI(
    `/bus/v1/service/${stopPoint.lines.map((line: any) => line.id).join(',')}`,
    'UPDATE_STOP_LINES'
  );

  return (
    <div>
      {departures && (
        <>
          <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
            <div className="wmnds-col-md-2-3">
              <StopInfoHeader showMap={showMap} mapToggle={() => setShowMap(!showMap)}>
                {stopPoint.locality}, {stopPoint.commonName} ({stopPoint.indicator}){' '}
                <Icon className={`${s.modeIcon} ${s.bus}`} iconName="modes-isolated-bus" />
              </StopInfoHeader>
            </div>
          </div>
          {showMap && <Map />}
          <div className="wmnds-col-1 wmnds-col-md-2-3">
            <p>
              Select a bus service to see real time information, timetable and travel updates.{' '}
              <br />
              Bus services with the same number are run by different bus companies.
            </p>
            <div className={s.services}>
              <ServiceSelect />
            </div>
          </div>
          <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
            <div className="wmnds-col-1 wmnds-col-md-2-3">
              {!selectedLine ? (
                <AllStopDepartures />
              ) : (
                <>{serviceInfo ? <ServiceInfo /> : 'Error'}</>
              )}
            </div>
            <div className="wmnds-col-1 wmnds-col-md-1-3">
              <NearestStops lat={stopPoint.latitude} lon={stopPoint.longitude} id={stopAtcoCode} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusStop;
