// Import context
import { useFormContext } from 'globalState';
// Import types
import { IServiceResult } from 'globalState/types/IServiceResult';
// Import components
import DisruptionIndicatorMedium from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import WarningText from 'components/shared/WarningText/WarningText';
// Import styles
import s from './ServiceResult.module.scss';

const ServiceResult = ({ result }: { result: IServiceResult }) => {
  const [, formDispatch] = useFormContext();

  const updateSelectedService = () => {
    formDispatch({ type: 'UPDATE_SELECTED_SERVICE', payload: result });
  };

  return (
    <button
      onClick={updateSelectedService}
      className={`wmnds-p-md wmnds-bg-white ${s.serviceResult}`}
      type="button"
    >
      <div className={`wmnds-grid wmnds-grid--spacing-2-md wmnds-m-b-md ${s.serviceResultHeader}`}>
        <div className="wmnds-col-auto">
          <DisruptionIndicatorMedium text={result.Service.ServiceNumber} />
        </div>
        <div className={`wmnds-col-auto ${s.routeName}`}>
          <strong>{result.Service.RouteDescription}</strong>
        </div>
      </div>

      {!result && (
        <WarningText iconClasses="wmnds-p-t-none">
          This service will start <div>2 September 2021</div>
        </WarningText>
      )}
      <div>
        <span className="wmnds-link">{result.Service.OperatorName}</span> runs this service
      </div>
    </button>
  );
};

export default ServiceResult;
