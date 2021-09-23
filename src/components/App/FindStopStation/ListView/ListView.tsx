import StopStationSearch from '../StopStationSearch/StopStationSearch';
import SearchResults from '../StopStationSearch/SearchResults/SearchResults';
import s from './ListView.module.scss';

const ListView = () => {
  return (
    <div className="wmnds-container">
      <div className="wmnds-grid">
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-2-5">
          <div className={`${s.listSearch} wmnds-bg-white`}>
            <StopStationSearch />
          </div>
        </div>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-3-5">
          <SearchResults classes="wmnds-bg-white wmnds-p-l-md wmnds-p-t-xsm wmnds-p-b-xsm wmnds-m-b-md" />
        </div>
      </div>
    </div>
  );
};

export default ListView;
