import { useStopStationContext } from 'globalState';
import Button from 'components/shared/Button/Button';
import ModeSelect from 'components/shared/ModeSelect/ModeSelect';
import { Mode } from 'globalState/GlobalContext/GlobalContext.types';
import LocationSearch from './LocationSearch';
import RadiusSearch from './RadiusSearch/RadiusSearch';

const StopStationSearch = () => {
  const [{ selectedModes }, stopStationDispatch] = useStopStationContext();
  const handleSelect = (mode: Mode) => {
    let payload: Mode[] = [];
    if (selectedModes.includes(mode)) {
      payload = selectedModes.filter((m) => m !== mode);
    } else {
      payload = [...selectedModes, mode];
    }
    stopStationDispatch({ type: 'UPDATE_SELECTED_MODES', payload });
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
        selectedModes={selectedModes}
        handleSelect={handleSelect}
        classes="wmnds-grid--spacing-3-sm"
      />
      <LocationSearch />
      <RadiusSearch />
    </div>
  );
};

export default StopStationSearch;
