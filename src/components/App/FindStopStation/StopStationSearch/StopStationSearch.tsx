import { useStopStationContext } from 'globalState';
import Button from 'components/shared/Button/Button';
import ModeSelect from 'components/shared/ModeSelect/ModeSelect';
import { Mode } from 'globalState/GlobalContext/GlobalContext.types';
import LocationSearch from './LocationSearch';
import RadiusSearch from './RadiusSearch/RadiusSearch';

const StopStationSearch = () => {
  const [, stopStationDispatch] = useStopStationContext();
  const selectedMode = null;
  const handleSelect = (mode: Mode) => {
    stopStationDispatch({ type: 'UPDATE_SELECTED_MODE', payload: mode });
  };
  const resetForm = () => {
    console.log('reset');
  };

  return (
    <div>
      <div className="wmnds-m-b-md wmnds-text-align-right">
        <Button text="Clear search" onClick={resetForm} btnClass="wmnds-btn--link" />
      </div>
      <ModeSelect
        selectedMode={selectedMode}
        handleSelect={handleSelect}
        classes="wmnds-grid--spacing-3-sm"
      />
      <LocationSearch />
      <RadiusSearch />
    </div>
  );
};

export default StopStationSearch;
