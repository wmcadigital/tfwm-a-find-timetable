import React from 'react';
import Loader from 'components/shared/Loader/Loader';
import Route from 'components/shared/Route/Route';
import TimetableButtons from './TimetableButtons';

import useTimetableAPI from '../customHooks/useTimetableAPI';

const TimetableRoute = ({
  when,
  showInbound,
  timetableHeader,
}: {
  when: string;
  showInbound: boolean;
  timetableHeader: any;
}) => {
  const { loading, results } = useTimetableAPI(when, timetableHeader, showInbound);
  const { inbound, outbound } = results;

  return (
    <>
      {loading ? (
        <div className="wmnds-m-lg wmnds-col-md-2-3">
          <Loader />
        </div>
      ) : (
        <>
          {results ? (
            <div className="wmnds-col-md-2-3">
              <h2 className="wmnds-h3">Route</h2>
              <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid wmnds-grid--justify-between">
                <div className="wmnds-col-1 wmnds-col-md-3-4">
                  <p>
                    Click on a stop name to find timetables, live departures, disruptions and the
                    nearest stops or stations.
                  </p>
                </div>
              </div>
              <TimetableButtons />

              <Route route={showInbound ? inbound : outbound} time />
            </div>
          ) : (
            'Error'
          )}
        </>
      )}
    </>
  );
};

export default TimetableRoute;
