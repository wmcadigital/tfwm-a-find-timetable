import { Link } from 'react-router-dom';
import formatDate from 'globalState/helpers/formatDate';
// Import types
import { IServiceResult } from 'globalState/TimetableContext/types/IServiceResult';
// Import components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import WarningText from 'components/shared/WarningText/WarningText';
// Import styles
import s from './ServiceResult.module.scss';

const ServiceResult = ({ result }: { result: IServiceResult }) => {
  const d = new Date(result.Service.ValidityStart);
  const now = new Date();
  const notYetValid = now < d;
  const startDate = formatDate(d);
  const stateless = result.Service.Stateless.replaceAll(':', '_').replace('*', 'H');

  return (
    <Link to={`/timetable/${stateless}`} className={`wmnds-p-md wmnds-bg-white ${s.serviceResult}`}>
      <div className={`wmnds-grid wmnds-grid--spacing-2-md wmnds-m-b-md ${s.serviceResultHeader}`}>
        <div className="wmnds-col-auto">
          <DisruptionIndicatorMedium text={result.Service.ServiceNumber} />
        </div>
        <div className={`wmnds-col-auto ${s.routeName}`}>
          <strong>{result.Service.RouteDescription}</strong>
        </div>
      </div>

      {notYetValid && (
        <WarningText iconClasses="wmnds-p-t-none">
          This service will start <div>{startDate}</div>
        </WarningText>
      )}
      <div>
        <span className="wmnds-link">{result.Service.OperatorName}</span> runs this service
      </div>
    </Link>
  );
};

export default ServiceResult;
