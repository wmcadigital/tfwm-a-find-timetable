import Button from 'components/shared/Button/Button';

const StopInfoHeader = ({
  children,
  showMap,
  mapToggle,
}: {
  children: React.ReactNode;
  showMap: boolean;
  mapToggle: () => void;
}) => {
  return (
    <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid--justify-between">
      <div className="wmnds-col-2-3">
        <h2>{children}</h2>
      </div>
      <div className="wmnds-col-auto">
        <Button
          btnClass="wmnds-btn--secondary wmnds-col-1"
          text={showMap ? 'Hide map' : 'View map'}
          iconRight="general-location-pin"
          onClick={mapToggle}
        />
      </div>
    </div>
  );
};

export default StopInfoHeader;
