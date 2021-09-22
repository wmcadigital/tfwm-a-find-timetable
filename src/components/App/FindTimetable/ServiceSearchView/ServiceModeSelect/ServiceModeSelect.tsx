// Import context
import { useTimetableContext } from 'globalState';
// Import components
import ModeSelect from 'components/shared/ModeSelect/ModeSelect';

const ServiceModeSelect = () => {
  const [{ selectedMode }, timetableDispatch] = useTimetableContext();
  const handleSelect = (mode: 'bus' | 'rail' | 'metro') => {
    timetableDispatch({ type: 'UPDATE_SELECTED_MODE', payload: mode });
  };

  return (
    <ModeSelect
      selectedMode={selectedMode}
      handleSelect={handleSelect}
      classes="wmnds-grid--justify-between"
    />
  );
};

export default ServiceModeSelect;
