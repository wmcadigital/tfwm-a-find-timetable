// Import context
import { useFormContext } from 'globalState';
// Import components
import Button from 'components/shared/Button/Button';

const ModeSelect = () => {
  const [{ selectedMode }, formDispatch] = useFormContext();
  const selectMode = (mode: 'bus' | 'rail' | 'metro') => {
    formDispatch({ type: 'UPDATE_SELECTED_MODE', payload: mode });
  };

  return (
    <>
      <p className="wmnds-h4 wmnds-m-t-none">Select mode of transport</p>
      <div className="wmnds-grid wmnds-grid wmnds-grid--justify-between">
        <Button
          onClick={() => selectMode('bus')}
          text="Bus"
          btnClass="wmnds-btn--mode"
          iconLeft="modes-isolated-bus"
          isActive={selectedMode === 'bus'}
        />
        <Button
          onClick={() => selectMode('rail')}
          text="Train"
          btnClass="wmnds-btn--mode"
          iconLeft="modes-isolated-rail"
          isActive={selectedMode === 'rail'}
        />
        <Button
          onClick={() => selectMode('metro')}
          text="Tram"
          btnClass="wmnds-btn--mode"
          iconLeft="modes-isolated-metro"
          isActive={selectedMode === 'metro'}
        />
      </div>
    </>
  );
};

export default ModeSelect;
