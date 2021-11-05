import { useStopStationContext } from 'globalState';
import StopStationSearch from '../StopStationSearch/StopStationSearch';
import SearchResult from '../StopStationSearch/SearchResults/SearchResult';
import s from './MapView.module.scss';
import Map from './Map/Map';

const SelectedStop = () => {
  const [{ selectedStopId, stops }] = useStopStationContext();
  const selectedStop = stops.find(
    (stop) => stop.properties.atcoCode === selectedStopId || stop.properties.crs === selectedStopId
  );

  if (selectedStop) {
    return (
      <SearchResult
        stopType={selectedStop.properties.type}
        distance={`${selectedStop.locationDistance?.toFixed(1)} miles away`}
        text={selectedStop.properties.name}
        atcoCode={selectedStop.properties.atcoCode || selectedStop.properties.crs || ''}
        key={selectedStop.properties.atcoCode}
      />
    );
  }
  return null;
};

const MapView = () => {
  return (
    <div className={s.mapViewSection}>
      <div className={`${s.container} wmnds-grid wmnds-grid--spacing-md-2-lg`}>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-1-3">
          <div className="wmnds-p-md">
            <StopStationSearch />
            {SelectedStop && (
              <div className={s.results}>
                <SelectedStop />
              </div>
            )}
          </div>
        </div>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-2-3">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default MapView;
