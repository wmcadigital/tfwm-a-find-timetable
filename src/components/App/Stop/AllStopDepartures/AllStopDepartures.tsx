import Loader from 'components/shared/Loader/Loader';
import Message from 'components/shared/Message/Message';

const StopServices = ({ lines, departures }: { lines: any; departures: any }) => {
  const mappedLines = lines.map((line: any) => {
    return {
      ...line,
      departures: departures.filter((departure: any) => departure.line.id === line.id),
    };
  });

  return (
    <div className="wmnds-live-departures wmnds-live-departures--bus">
      {mappedLines
        .sort((a: any, b: any) => b.departures.length - a.departures.length)
        .map((line: any) => (
          <div
            key={line.id}
            className="wmnds-live-departures__service wmnds-grid wmnds-grid--spacing-sm-2-md wmnds-grid--justify-between"
          >
            <div className="wmnds-col-1 wmnds-col-sm-1-2">
              <div className="wmnds-live-departures__service-details">
                <div className="wmnds-live-departures__service-name">{line.name}</div>
                {line.departures.length > 0 ? (
                  <div className="wmnds-live-departures__service-description">
                    <strong>{line.departures[0].towards}</strong>
                    <span className="wmnds-live-departures__service-operator">{line.operator}</span>
                  </div>
                ) : (
                  <div className="wmnds-live-departures__service-description">
                    Currently there are no services
                  </div>
                )}
              </div>
            </div>
            <div className="wmnds-col-1 wmnds-col-sm-1-2">
              <div className="wmnds-live-departures__times">
                {line.departures.length > 0 && (
                  <>
                    {line.departures.slice(0, 3).map((service: any) => (
                      <div className="wmnds-live-departures__time">
                        {Math.ceil(service.timeToArrival / 60)} mins
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const AllStopDepartures = ({ departures, lines }: { departures: any; lines: any }) => {
  const { loading, results, updatedAt, errorInfo, getAPIResults } = departures;
  return (
    <div className="wmnds-m-b-lg">
      <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid--justify-between wmnds-m-b-md">
        <div className="wmnds-col-2-3">
          <h3>Real time departures</h3>
        </div>
        {!loading && results && <div className="wmnds-col-auto">Last updated {updatedAt}</div>}
      </div>
      {loading ? (
        <div className="wmnds-p-lg wmnds-bg-white">
          <Loader />
        </div>
      ) : (
        <>
          {results?.departures ? (
            <StopServices lines={lines} departures={results.departures} />
          ) : (
            <>
              {errorInfo ? (
                <Message
                  type="error"
                  title={errorInfo.title}
                  message={errorInfo.message}
                  showRetry
                  retryCallback={getAPIResults}
                />
              ) : (
                <Message
                  type="error"
                  title="Please try again later"
                  message="Sorry, we are currently experiencing technical issues."
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AllStopDepartures;
