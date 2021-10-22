// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import StationInfo from './StationInfo/StationInfo';

const Stop = () => {
  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      <StationInfo />
    </div>
  );
};

export default Stop;
