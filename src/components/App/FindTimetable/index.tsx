import { useFormContext } from 'globalState';
// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import ServiceSearchView from './ServiceSearchView/ServiceSearchView';
import TimetableView from './TimetableView/TimetableView';

const FindTimetable = () => {
  const [{ selectedService }] = useFormContext();
  return (
    <>
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      <div className="wmnds-p-b-lg">
        {selectedService ? <TimetableView /> : <ServiceSearchView />}
      </div>
    </>
  );
};

export default FindTimetable;
