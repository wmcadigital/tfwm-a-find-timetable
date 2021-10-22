// Components
import Button from 'components/shared/Button/Button';
import Icon from 'components/shared/Icon/Icon';
import s from '../Stop.module.scss';
import TrainDepartures from '../TrainDepartures/TrainDepartures';

const StopInfo = () => {
  return (
    <div className="wmnds-col-md-2-3">
      <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid--justify-between">
        <div className="wmnds-col-2-3 wmnds-m-b-lg">
          <h2>
            Birmingham Moor street{' '}
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
    </div>
  );
};

export default StopInfo;
