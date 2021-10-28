import { useState, useEffect } from 'react';
import { useStopContext } from 'globalState';

// Components
import Icon from 'components/shared/Icon/Icon';
import s from '../Stop.module.scss';
import StopInfoHeader from '../StopInfo/StopInfoHeader';
import Map from '../Map/Map';
import ServiceDepartures from '../ServiceInfo/ServiceDepartures/ServiceDepartures';
import ServiceDisruptions from '../ServiceInfo/ServiceDisruptions/ServiceDisruptions';
import ServiceTimetable from '../ServiceInfo/ServiceTimetable/ServiceTimetable';

const TramStop = () => {
  const [showMap, setShowMap] = useState(false);
  const [{ stopPointData, stopDepartures, stopDisruptions }, stopDispatch] = useStopContext();
  const { stopPoint } = stopPointData;
  useEffect(() => {
    stopDispatch({
      type: 'UPDATE_SELECTED_LINE',
      payload: {
        id: stopPointData.stopPoint.lines[0].id,
        name: stopPointData.stopPoint.lines[0].name,
        routes: [
          {
            operatorCode: 'TMM',
            routeName: 'Birmingham - Wolverhampton',
            operator: stopPointData.stopPoint.lines[0].operator,
          },
        ],
      },
    });
  }, [stopDispatch, stopPointData.stopPoint.lines]);

  const hasDisruptions =
    stopDisruptions?.filter((disruption: any) => disruption.mode === 'tram').length > 0;
  return (
    <div>
      <div className="wmnds-col-md-2-3">
        <StopInfoHeader showMap={showMap} mapToggle={() => setShowMap(!showMap)}>
          {stopPoint.locality}, {stopPoint.commonName} ({stopPoint.indicator}){' '}
          <Icon className={`${s.modeIcon} ${s.metro}`} iconName="modes-isolated-metro" />
        </StopInfoHeader>
      </div>
      {showMap && <Map />}
      <div className="wmnds-col-2-3">
        <ServiceDepartures departures={stopDepartures.departures.slice(0, 5)} isTram />
        {hasDisruptions && <ServiceDisruptions />}
        <ServiceTimetable />
      </div>
    </div>
  );
};

export default TramStop;
