// Import components
import Button from 'components/shared/Button/Button';

const ModeSelect = ({
  label = 'Select mode of transport',
  selectedMode,
  handleSelect,
}: {
  label?: string;
  selectedMode: string | null;
  handleSelect: (mode: 'bus' | 'rail' | 'metro') => void;
}) => {
  return (
    <>
      <p className="wmnds-h4 wmnds-m-t-none">{label}</p>
      <div className="wmnds-grid wmnds-grid wmnds-grid--justify-between">
        <Button
          onClick={() => handleSelect('bus')}
          text="Bus"
          btnClass="wmnds-btn--mode"
          iconLeft="modes-isolated-bus"
          isActive={selectedMode === 'bus'}
        />
        <Button
          onClick={() => handleSelect('rail')}
          text="Train"
          btnClass="wmnds-btn--mode"
          iconLeft="modes-isolated-rail"
          isActive={selectedMode === 'rail'}
        />
        <Button
          onClick={() => handleSelect('metro')}
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
