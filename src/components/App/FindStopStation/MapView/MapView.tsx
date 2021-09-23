import StopStationSearch from '../StopStationSearch/StopStationSearch';
import SearchResults from '../StopStationSearch/SearchResults/SearchResults';
import s from './MapView.module.scss';

const MapView = () => {
  return (
    <div className={s.mapViewSection}>
      <div className={`${s.container} wmnds-grid wmnds-grid--spacing-md-2-lg`}>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-1-3">
          <div className="wmnds-p-md">
            <StopStationSearch />
            <SearchResults classes={s.results} />
          </div>
        </div>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-2-3">Map</div>
      </div>
    </div>
  );
};

export default MapView;
