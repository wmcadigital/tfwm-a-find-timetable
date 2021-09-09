import { useState, useEffect } from 'react';
// Import context
import { useFormContext } from 'globalState';
// Import API hook
import useTimetableAPI from 'globalState/customHooks/useTimetableAPI';
import formatDate from 'globalState/helpers/formatDate';
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
  const [when, setWhen] = useState<string>('0');
  const [oneDirection, setOneDirection] = useState(false);
  const [{ selectedService }] = useFormContext();
  const { loading, results } = useTimetableAPI(when, showInbound);
  const { inbound, outbound, routeMap } = results;

  const reversedDescription = selectedService?.Service.RouteDescription.split(' - ')
    .reverse()
    .join(' - ');

  useEffect(() => {
    if (!inbound.length) {
      setOneDirection(true);
      setShowInbound(false);
    } else if (!outbound.length) {
      setOneDirection(true);
      setShowInbound(false);
    } else {
      setOneDirection(false);
    }
  }, [inbound, outbound]);

  const d = new Date(selectedService!.Service.ValidityStart);
  const startDate = formatDate(d);

  const handleWhen = (w: string) => {
    if (when !== w) {
      setWhen(w);
    }
  };

  return (
    <>
      <div className={`wmnds-col-md-2-3 wmnds-m-b-md ${s.timetableView}`}>
        <div className={`wmnds-grid wmnds-grid--spacing-3-md wmnds-m-b-lg ${s.timetableHeader}`}>
          <div className="wmnds-col-auto">
            <DisruptionIndicator text={selectedService?.Service.ServiceNumber} />
          </div>
          <div className={`wmnds-col-auto ${s.routeDescription}`}>
            <h1 className="wmnds-h3 wmnds-m-none">
              {showInbound ? selectedService?.Service.RouteDescription : reversedDescription}
            </h1>
          </div>
          {!oneDirection && (
            <div className="wmnds-col-auto">
              <Button
                onClick={() => setShowInbound(!showInbound)}
                btnClass="wmnds-btn--secondary"
                text="Change direction"
                iconRight="general-swap"
              />
            </div>
          )}
        </div>
        <p>
          <a href="#0">{selectedService?.Service.OperatorName}</a> runs this service
        </p>
        <WarningText>This is the latest timetable (last updated {startDate})</WarningText>
        <FileDownload
          text="Download ‘Full Timetable’ (PDF)"
          fileName="timetable.pdf"
          href={`https://journeyplanner.networkwestmidlands.com/Timetables/Download/${encodeURI(
            selectedService!.Service.Stateless.replaceAll(':', '_')
          )}/${selectedService!.Service.Version}/${encodeURI(
            selectedService!.Service.OperatorName
          )}_${selectedService!.Service.ServiceNumber}/False`}
        />
        <h2 className="wmnds-h3 wmnds-m-b-md">When</h2>
        <div>
          <Button
            btnClass="wmnds-btn--secondary wmnds-m-r-md wmnds-m-b-sm"
            text="Monday to Friday"
            isActive={when === '0'}
            onClick={() => handleWhen('0')}
          />
          <Button
            btnClass="wmnds-btn--secondary wmnds-m-r-md wmnds-m-b-sm"
            text="Saturday"
            isActive={when === '2'}
            onClick={() => handleWhen('2')}
          />
          <Button
            btnClass="wmnds-btn--secondary wmnds-m-r-md wmnds-m-b-sm"
            text="Sunday"
            isActive={when === '3'}
            onClick={() => handleWhen('3')}
          />
        </div>
      </div>
      {loading ? (
        <div className={`wmnds-m-lg ${mapView ? 'wmnds-col-1' : 'wmnds-col-md-2-3'}`}>
          <Loader />
        </div>
      ) : (
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
          {mapView ? (
            <Map results={routeMap} />
          ) : (
            <Route route={showInbound ? inbound : outbound} />
          )}
        </div>
      )}
    </>
  );
};

export default TimetableView;
