/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTimetableContext } from 'globalState';
// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';

const Timetable = () => {
  const [{ selectedService }] = useTimetableContext();
  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      <h1>Timetable</h1>
    </div>
  );
};

export default Timetable;
