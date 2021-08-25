// Import components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import WarningText from 'components/shared/WarningText/WarningText';
// Import styles
import s from './ServiceResult.module.scss';

const ServiceResult = () => {
  return (
    <button className={`wmnds-p-md wmnds-bg-white ${s.serviceResult}`} type="button">
      <div className={`wmnds-grid wmnds-grid--spacing-2-md wmnds-m-b-md ${s.serviceResultHeader}`}>
        <div className="wmnds-col-auto">
          <DisruptionIndicatorMedium text="16" />
        </div>
        <div className="wmnds-col-auto">
          <strong>West Bromwich - Birmingham via Hamstead</strong>
        </div>
      </div>
      <WarningText iconClasses="wmnds-p-t-none">
        This service will start <div>2 September 2021</div>
      </WarningText>
      <div>
        <span className="wmnds-link">National Express West Midlands</span> runs this service
      </div>
    </button>
  );
};

export default ServiceResult;
