// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import s from './StopStation.module.scss';
import AllDepartures from './AllDepartures/AllDepartures';
import ServiceInfo from './ServiceInfo/ServiceInfo';
import ServiceSelect from './ServiceSelect/ServiceSelect';

const StopStation = () => {
  const services = ['16', '17', '17A', '57', '125'];
  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      <div className="wmnds-col-md-2-3">
        <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid--justify-between">
          <div className="wmnds-col-2-3">
            <h2>
              Stourbridge, Stourbridge Interchange (Stand C){' '}
              <Icon className={`${s.modeIcon} ${s.bus}`} iconName="modes-isolated-bus" />
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
        <p>
          Select a bus service to see real time information, timetable and travel updates. <br />
          Bus services with the same number are run by different bus companies.
        </p>
        <div className={s.services}>
          <ServiceSelect services={services} />
        </div>
        <ServiceInfo />
        <AllDepartures />
      </div>
    </div>
  );
};

export default StopStation;
