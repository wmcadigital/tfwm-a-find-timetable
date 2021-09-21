import { useFormContext } from 'globalState';
// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import ServiceSearchView from './ServiceSearchView/ServiceSearchView';
import TimetableView from './TimetableView/TimetableView';

const FindTimetable = () => {
  const [{ selectedService }] = useFormContext();
  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      {selectedService ? <TimetableView /> : <ServiceSearchView />}
    </div>
  );
};

export default FindTimetable;
