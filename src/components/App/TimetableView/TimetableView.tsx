import { useState } from 'react';
// Import context
import { useFormContext } from 'globalState';
// Import API hook
import useTimetableAPI from 'globalState/customHooks/useTimetableAPI';
// Import components
import Button from 'components/shared/Button/Button';
import DisruptionIndicator from 'components/shared/DisruptionIndicator/DisruptionIndicatorMedium';
import Loader from 'components/shared/Loader/Loader';
import Route from 'components/shared/Route/Route';
import FileDownload from 'components/shared/FileDownload/FileDownload';
import WarningText from 'components/shared/WarningText/WarningText';
import Map from './Map/Map';

import s from './TimetableView.module.scss';

const TimetableView = () => {
  const [mapView, setMapView] = useState(false);
  const [showInbound, setShowInbound] = useState(true);
  const [{ selectedService }] = useFormContext();
  const { loading, results } = useTimetableAPI();
  const { inbound, outbound } = results;

  const reversedDescription = selectedService?.Service.RouteDescription.split(' - ')
    .reverse()
    .join(' - ');

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={`wmnds-col-md-2-3 wmnds-m-b-md ${s.timetableView}`}>
            <div
              className={`wmnds-grid wmnds-grid--spacing-3-md wmnds-m-b-lg ${s.timetableHeader}`}
            >
              <div className="wmnds-col-auto">
                <DisruptionIndicator text={selectedService?.Service.ServiceNumber} />
              </div>
              <div className={`wmnds-col-auto ${s.routeDescription}`}>
                <h1 className="wmnds-h3 wmnds-m-none">
                  {showInbound ? selectedService?.Service.RouteDescription : reversedDescription}
                </h1>
              </div>
              <div className="wmnds-col-auto">
                <Button
                  onClick={() => setShowInbound(!showInbound)}
                  btnClass="wmnds-btn--secondary"
                  text="Change direction"
                  iconRight="general-swap"
                />
              </div>
            </div>
            <p>
              <a href="#0">{selectedService?.Service.OperatorName}</a> runs this service
            </p>
            <WarningText>This is the latest timetable (last updated 2 July 2021)</WarningText>
            <FileDownload
              text="Download ‘Full Timetable’ (PDF)"
              fileName="timetable.pdf"
              href="#0"
            />
            <h2 className="wmnds-h3 wmnds-m-b-md">When</h2>
            <div>
              <Button
                btnClass="wmnds-btn--secondary wmnds-m-r-md wmnds-m-b-sm"
                text="Monday to Friday"
              />
              <Button btnClass="wmnds-btn--secondary wmnds-m-r-md wmnds-m-b-sm" text="Saturday" />
              <Button btnClass="wmnds-btn--secondary wmnds-m-r-md wmnds-m-b-sm" text="Sunday" />
            </div>
          </div>
          <div className={mapView ? 'wmnds-col-1' : 'wmnds-col-md-2-3'}>
            <h2 className="wmnds-h3">Route</h2>
            <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid wmnds-grid--justify-between">
              <div className={mapView ? 'wmnds-col-md-1-2' : 'wmnds-col-3-4'}>
                <p>
                  Click on a stop name to find timetables, live departures, disruptions and the
                  nearest stops or stations.
                </p>
              </div>
              <div className="wmnds-col-auto">
                <Button
                  onClick={() => setMapView(!mapView)}
                  btnClass="wmnds-btn--secondary wmnds-col-1"
                  text={mapView ? 'List view' : 'Map view'}
                  iconRight={mapView ? 'general-list' : 'general-location-pin'}
                />
              </div>
            </div>
            {mapView ? <Map /> : <Route route={showInbound ? inbound : outbound} />}
          </div>
        </>
      )}
    </>
  );
};

export default TimetableView;
