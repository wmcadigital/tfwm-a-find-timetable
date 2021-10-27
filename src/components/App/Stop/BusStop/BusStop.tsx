import { useStopContext } from 'globalState';

// Components
import Icon from 'components/shared/Icon/Icon';
import s from '../Stop.module.scss';
import AllStopDepartures from '../AllStopDepartures/AllStopDepartures';
import ServiceInfo from '../ServiceInfo/ServiceInfo';
import ServiceSelect from '../ServiceSelect/ServiceSelect';
import StopInfoHeader from '../StopInfo/StopInfoHeader';

import useStopAPI from '../customHooks/useStopAPI';

const BusStop = () => {
  const [{ stopPointData, selectedLine, stopDepartures }] = useStopContext();
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
          <StopInfoHeader>
            {stopPoint.locality}, {stopPoint.commonName} ({stopPoint.indicator}){' '}
            <Icon className={`${s.modeIcon} ${s.bus}`} iconName="modes-isolated-bus" />
          </StopInfoHeader>
          <p>
            Select a bus service to see real time information, timetable and travel updates. <br />
            Bus services with the same number are run by different bus companies.
          </p>
          <div className={s.services}>
            <ServiceSelect />
          </div>
          {!selectedLine ? <AllStopDepartures /> : <>{serviceInfo ? <ServiceInfo /> : 'Error'}</>}
        </>
      )}
    </div>
  );
};

export default BusStop;
