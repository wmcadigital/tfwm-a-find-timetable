// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import ServiceSearchView from './ServiceSearchView/ServiceSearchView';

const FindTimetable = () => {
  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      <ServiceSearchView />
    </div>
  );
};

export default FindTimetable;
