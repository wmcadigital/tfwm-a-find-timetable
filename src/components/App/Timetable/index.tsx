import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTimetableContext } from 'globalState';
import { ServiceIdentifier } from 'globalState/TimetableContext/TimetableContext.types';
// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import TimetableView from './TimetableView/TimetableView';

const Timetable = () => {
  const [{ serviceId }, timetableDispatch] = useTimetableContext();
  const { id, atcoCode, operatorCode } = useParams<ServiceIdentifier>();

  useEffect(() => {
    timetableDispatch({ type: 'UPDATE_SERVICE_ID', payload: { id, atcoCode, operatorCode } });
  }, [id, atcoCode, operatorCode, timetableDispatch]);

  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      {serviceId && <TimetableView />}
    </div>
  );
};

export default Timetable;
