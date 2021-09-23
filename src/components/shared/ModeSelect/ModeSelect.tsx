import { Mode } from 'globalState/GlobalContext/GlobalContext.types';
// Import components
import Button from 'components/shared/Button/Button';

const ModeSelect = ({
  label = 'Select mode of transport',
  selectedMode,
  handleSelect,
  classes,
}: {
  label?: string;
  selectedMode: string | null;
  handleSelect: (mode: Mode) => void;
  classes?: string;
}) => {
  return (
    <>
      <p className="wmnds-h4 wmnds-m-t-none">{label}</p>
      <div className={`wmnds-grid ${classes}`}>
        <div className="wmnds-col-auto">
          <Button
            onClick={() => handleSelect('bus')}
            text="Bus"
            btnClass="wmnds-btn--mode wmnds-col-1"
            iconLeft="modes-isolated-bus"
            isActive={selectedMode === 'bus'}
          />
        </div>
        <div className="wmnds-col-auto">
          <Button
            onClick={() => handleSelect('rail')}
            text="Train"
            btnClass="wmnds-btn--mode wmnds-col-1"
            iconLeft="modes-isolated-rail"
            isActive={selectedMode === 'rail'}
          />
        </div>
        <div className="wmnds-col-auto">
          <Button
            onClick={() => handleSelect('metro')}
            text="Tram"
            btnClass="wmnds-btn--mode wmnds-col-1"
            iconLeft="modes-isolated-metro"
            isActive={selectedMode === 'metro'}
          />
        </div>
      </div>
    </>
  );
};

export default ModeSelect;
