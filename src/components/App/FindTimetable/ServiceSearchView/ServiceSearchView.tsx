import { useState, useEffect } from 'react';
// Import context
import { useTimetableContext } from 'globalState';
// Import API hook
import useServiceAPI from 'components/App/FindTimetable/customHooks/useServiceAPI';
// Import components
import Button from 'components/shared/Button/Button';
import Dropdown from 'components/shared/Dropdown/Dropdown';
import Loader from 'components/shared/Loader/Loader';
import Message from 'components/shared/Message/Message';
import ServiceResult from './ServiceResult/ServiceResult';
import BusAutoComplete from './BusAutoComplete/BusAutoComplete';
import TrainAutoComplete from './TrainAutoComplete/TrainAutoComplete';
import TrainResult from './TrainResult/TrainResult';
import ServiceModeSelect from './ServiceModeSelect/ServiceModeSelect';

const ServiceSearch = () => {
  const [{ selectedMode, busQuery, stations }, timetableDispatch] = useTimetableContext();
  const { loading, results, errorInfo, getAPIResults } = useServiceAPI();
  const [searchResults, setSearchResults] = useState(results);

  const getBusCompanyOptions = () => {
    const uniqueCompanies: string[] = [];
    if (selectedMode === 'bus' && results.length) {
      const allCompanies = results.map((result) => result.Service?.OperatorName);
      allCompanies.forEach((company) => {
        if (!uniqueCompanies.includes(company)) {
          uniqueCompanies.push(company);
        }
      });
    }
    return uniqueCompanies.map((company) => ({ text: company, value: company }));
  };

  const resetForm = () => {
    timetableDispatch({ type: 'CLEAR_SEARCH' });
  };

  useEffect(() => {
    setSearchResults(results);
    if (selectedMode === 'metro' && results.length === 1) {
      timetableDispatch({ type: 'UPDATE_SELECTED_SERVICE', payload: results[0] });
    }
  }, [results, timetableDispatch, selectedMode]);

  const handleFilterResults = (e: any) => {
    setSearchResults(results.filter((result) => result.Service.OperatorName === e.target.value));
  };

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
        <div className="wmnds-col-1 wmnds-col-lg-1-3">
          <div className="wmnds-p-md wmnds-bg-white wmnds-m-b-lg">
            <div className="wmnds-m-b-md wmnds-text-align-right">
              <Button text="Clear search" onClick={resetForm} btnClass="wmnds-btn--link" />
            </div>
            <ServiceModeSelect />
            {selectedMode === 'bus' && (
              <>
                <div className="wmnds-m-t-lg">
                  <p className="wmnds-h4 wmnds-m-t-none">Enter a service number</p>
                  <BusAutoComplete id="busAutoComplete" name="busAutoComplete" />
                </div>
                {searchResults && getBusCompanyOptions().length > 1 && (
                  <div className="wmnds-m-t-lg">
                    <Dropdown
                      label="Filter by bus company"
                      name="filter"
                      error={null}
                      onChange={handleFilterResults}
                      options={getBusCompanyOptions()}
                    />
                  </div>
                )}
              </>
            )}
            {selectedMode === 'rail' && (
              <div className="wmnds-m-t-lg">
                <TrainAutoComplete />
              </div>
            )}
          </div>
        </div>
        <div className="wmnds-col-1 wmnds-col-lg-2-3">
          {selectedMode === 'bus' && busQuery && (
            <>
              {loading ? (
                <Loader />
              ) : (
                <>
                  {searchResults ? (
                    <>
                      <div className="wmnds-h3 wmnds-m-t-none wmnds-m-b-lg">
                        {searchResults.length} result{searchResults.length !== 1 && 's'}
                      </div>
                      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
                        {searchResults
                          .sort((a, b) =>
                            a.Service.ServiceNumber.localeCompare(
                              b.Service.ServiceNumber,
                              navigator.languages[0] || navigator.language,
                              {
                                numeric: true,
                                ignorePunctuation: true,
                              }
                            )
                          )
                          .map((result) => (
                            <div
                              key={`${result.Service.OperatorCode}_${
                                result.Service.DestinationId
                              }_${result.Service.Stateless.replace(':', '_')}`}
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
          {selectedMode === 'rail' && (
            <>
              <p>
                You can find train timetables on the train company’s website. To find which train
                company runs your service, enter the stations you’ll travel between.
              </p>
              {stations.from?.name && stations.to?.name && <TrainResult />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSearch;
