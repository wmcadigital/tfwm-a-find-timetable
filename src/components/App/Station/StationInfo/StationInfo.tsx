// Components
import { useStationContext } from 'globalState';
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import s from '../Stop.module.scss';
import TrainDepartures from '../TrainDepartures/TrainDepartures';

const Parking = () => {
  return (
    <div className="wmnds-facilities wmnds-bg-white wmnds-p-lg wmnds-m-b-lg">
      <h3 className="wmnds-facilities__title">Park and ride</h3>
      <p className="wmnds-p-t-xsm">
        Owned by <a href="#/">West Midlands Combined Authority</a>
      </p>
      <ul className="wmnds-facilities__list">
        <li className="wmnds-facilities__list-item">
          <Icon iconName="facilities-taxi-rank" className="wmnds-facilities__icon" />
          Spaces: 310
        </li>
      </ul>
      <div className="wmnds-inset-text wmnds-m-b-lg">
        Parking is available on a first come, first served basis
      </div>
      <p>
        West Midlands Combined Authority operates a considerate parking policy to ensure all sites
        are accessible and used in the most appropriate way.
      </p>
      <p className="wmnds-m-b-none">
        Find information on how <a href="#/">Park and Ride</a> works.
      </p>
    </div>
  );
};

const Facilities = () => {
  return (
    <div className="wmnds-facilities wmnds-grid wmnds-grid--spacing-md-2-md wmnds-bg-white wmnds-p-lg wmnds-m-b-lg">
      <div className="wmnds-facilities__section wmnds-col-1-1 wmnds-col-md-1-2">
        <h3 className="wmnds-facilities__title">Station facilities</h3>
        <ul className="wmnds-facilities__list">
          <li className="wmnds-facilities__list-item">
            <Icon iconName="facilities-seating" className="wmnds-facilities__icon" />
            Seated area
          </li>
        </ul>
      </div>
      <div className="wmnds-facilities__section wmnds-col-1-1 wmnds-col-md-1-2">
        <h3 className="wmnds-facilities__title">Accessibility</h3>
        <ul className="wmnds-facilities__list">
          <li className="wmnds-facilities__list-item">
            <Icon iconName="facilities-step-free-access" className="wmnds-facilities__icon" />
            Step-free access
          </li>
        </ul>
      </div>
    </div>
  );
};

const StopInfo = () => {
  const [{ stationPoint }] = useStationContext();
  const station = stationPoint.data[0];
  return (
    <div className="wmnds-col-md-2-3">
      <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid--justify-between">
        <div className="wmnds-col-2-3 wmnds-m-b-lg">
          <h2>
            {station.name}{' '}
            <Icon className={`${s.modeIcon} ${s.train}`} iconName="modes-isolated-rail" />
          </h2>
          <h3 className="wmnds-m-t-none">Rail zone 1</h3>
        </div>
        <div className="wmnds-col-auto">
          <Button
            btnClass="wmnds-btn--secondary wmnds-col-1"
            text="View map"
            iconRight="general-location-pin"
          />
        </div>
      </div>
      <TrainDepartures />
      <Facilities />
      <Parking />
    </div>
  );
};

export default StopInfo;
