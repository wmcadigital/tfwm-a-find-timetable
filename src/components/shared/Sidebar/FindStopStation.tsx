import AutoComplete from 'components/shared/AutoComplete/AutoComplete';
import Button from 'components/shared/Button/Button';

const FindStopStation = () => {
  return (
    <div className="wmnds-content-card wmnds-m-b-lg">
      <div className="wmnds-p-md">
        <h2>Find a stop or station</h2>
        <div className="wmnds-m-b-md">
          <AutoComplete
            label="Enter a postcode, road name or place of interest"
            name="sidebarFindStopStation"
            placeholder="Search"
            onUpdate={() => console.log('update')}
          />
        </div>
        <Button text="Search" btnClass="wmnds-col-1" iconRight="general-chevron-right" />
      </div>
    </div>
  );
};

export default FindStopStation;
