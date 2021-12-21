// Import components
import Loader from 'components/shared/Loader/Loader';
import Route from 'components/shared/Route/Route';
// import Map from './Map/Map';
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
  // const [mapView, setMapView] = useState(false);
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
                {/* <div className="wmnds-col-auto">
                  <Button
                    onClick={() => setMapView(!mapView)}
                    btnClass="wmnds-btn--secondary wmnds-col-1"
                    text={mapView ? 'List view' : 'Map view'}
                    iconRight={mapView ? 'general-list' : 'general-location-pin'}
                  />
                </div> */}
              </div>
              {/* {mapView ? (
                <Map results={{ routeMap, stopData }} />
              ) : ( */}
              <Route route={showInbound ? inbound : outbound} />
              {/* )} */}
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
