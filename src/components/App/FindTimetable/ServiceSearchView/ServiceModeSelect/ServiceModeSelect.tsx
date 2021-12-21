// Import context
import { useTimetableContext } from 'globalState';
import { Mode } from 'globalState/GlobalContext/GlobalContext.types';
// Import components
import ModeSelect from 'components/shared/ModeSelect/ModeSelect';

const ServiceModeSelect = () => {
  const [{ selectedMode }, timetableDispatch] = useTimetableContext();
  const handleSelect = (mode: Mode) => {
    timetableDispatch({ type: 'UPDATE_SELECTED_MODE', payload: mode });
  };

  return (
    <ModeSelect
      selectedModes={selectedMode && [selectedMode]}
      handleSelect={handleSelect}
      classes="wmnds-grid--spacing-3-xsm"
    />
  );
};

export default ServiceModeSelect;
