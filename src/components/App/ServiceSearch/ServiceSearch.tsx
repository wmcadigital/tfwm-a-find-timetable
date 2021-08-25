import Button from 'components/shared/Button/Button';
import ServiceResult from 'components/shared/ServiceResult/ServiceResult';
import AutoComplete from 'components/shared/AutoComplete/AutoComplete';
import Dropdown from 'components/shared/Dropdown/Dropdown';

const results = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const ServiceSearch = () => {
  return (
    <div>
      <h1>Find a timetable</h1>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        <div className="wmnds-col-1 wmnds-col-md-1-3">
          <div className="wmnds-p-md wmnds-bg-white">
            <div className="wmnds-m-b-md wmnds-text-align-right">
              <Button text="Clear search" btnClass="wmnds-btn--link" />
            </div>
            <p className="wmnds-h4 wmnds-m-t-none">Select mode of transport</p>
            <div className="wmnds-grid wmnds-grid wmnds-grid--justify-between wmnds-m-b-lg">
              <Button text="Bus" btnClass="wmnds-btn--mode" iconLeft="modes-isolated-bus" />
              <Button text="Train" btnClass="wmnds-btn--mode" iconLeft="modes-isolated-rail" />
              <Button text="Tram" btnClass="wmnds-btn--mode" iconLeft="modes-isolated-metro" />
            </div>
            <div className="wmnds-m-b-lg">
              <p className="wmnds-h4 wmnds-m-t-none">Enter a service number</p>
              <AutoComplete
                placeholder="Search"
                name="busSearch"
                onUpdate={() => console.log('update')}
                onSelectResult={() => console.log('selected result')}
              />
            </div>
            <Dropdown label="Filter by bus company" name="filter" error={null} options={[]} />
          </div>
        </div>
        <div className="wmnds-col-1 wmnds-col-md-2-3">
          <div className="wmnds-h3 wmnds-m-t-none wmnds-m-b-lg">
            {results.length} result{results.length !== 1 && 's'}
          </div>
          <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
            {results.map((result) => (
              <div key={result.id} className="wmnds-col-1 wmnds-col-md-1-2">
                <ServiceResult />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSearch;
