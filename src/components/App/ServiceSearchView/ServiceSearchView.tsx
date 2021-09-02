// Import context
import { useFormContext } from 'globalState';
// Import components
import Button from 'components/shared/Button/Button';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Loader from 'components/shared/Loader/Loader';
import Message from 'components/shared/Message/Message';
import ServiceResult from './ServiceResult/ServiceResult';
import BusAutoComplete from '../BusAutoComplete/BusAutoComplete';
import ModeSelect from './ModeSelect/ModeSelect';
// Import hooks
import useServiceSearchAPI from './customHooks/useServiceSearchAPI';

const ServiceSearch = () => {
  const [{ selectedMode, busQuery }] = useFormContext();
  const { loading, results, errorInfo, getAPIResults } = useServiceSearchAPI();

  const errorMessage = (
    <Message
      type="error"
      title={errorInfo?.title}
      message={errorInfo?.message}
      showRetry={errorInfo?.isTimeoutError}
      retryCallback={getAPIResults}
    />
  );

  return (
    <div>
      <h1>Find a timetable</h1>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        <div className="wmnds-col-1 wmnds-col-md-1-3">
          <div className="wmnds-p-md wmnds-bg-white">
            <div className="wmnds-m-b-md wmnds-text-align-right">
              <Button text="Clear search" btnClass="wmnds-btn--link" />
            </div>
            <ModeSelect />
            {selectedMode === 'bus' && (
              <>
                <div className="wmnds-m-t-lg">
                  <p className="wmnds-h4 wmnds-m-t-none">Enter a service number</p>
                  <BusAutoComplete id="busAutoComplete" name="busAutoComplete" />
                </div>
                <div className="wmnds-m-t-lg">
                  <Dropdown label="Filter by bus company" name="filter" error={null} options={[]} />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          {selectedMode && busQuery && (
            <>
              {loading ? (
                <Loader />
              ) : (
                <>
                  {results ? (
                    <>
                      <div className="wmnds-h3 wmnds-m-t-none wmnds-m-b-lg">
                        {results.length} result{results.length !== 1 && 's'}
                      </div>
                      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
                        {results.map((result) => (
                          <div
                            key={result.Service.DestinationId}
                            className="wmnds-col-1 wmnds-col-md-1-2 wmnds-m-b-lg"
                          >
                            <ServiceResult result={result} />
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    errorMessage
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSearch;
