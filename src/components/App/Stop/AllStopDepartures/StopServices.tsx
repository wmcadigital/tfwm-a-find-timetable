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
                      <div
                        key={`time_${service.timeToArrival}`}
                        className="wmnds-live-departures__time"
                      >
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
export default StopServices;
