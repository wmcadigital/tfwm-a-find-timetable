import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTimetableContext } from 'globalState';
import { ItoId, StatelessId } from 'globalState/TimetableContext/TimetableContext.types';
// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import TimetableView from './TimetableView/TimetableView';

const Timetable = () => {
  const [{ serviceId, serviceStateless }, timetableDispatch] = useTimetableContext();
  const { id, atcoCode, operatorCode } = useParams<ItoId>();
  const { stateless, version } = useParams<StatelessId>();

  useEffect(() => {
    if (id) {
      timetableDispatch({
        type: 'UPDATE_SERVICE_ID',
        payload: { id, atcoCode, operatorCode },
      });
    }
    if (stateless) {
      timetableDispatch({
        type: 'UPDATE_SERVICE_STATELESS',
        payload: { stateless, version },
      });
    }
  }, [id, atcoCode, operatorCode, timetableDispatch, stateless, version]);

  return (
    <div className="wmnds-container wmnds-p-b-lg">
      <div className="wmnds-m-b-md">
        <Breadcrumbs />
      </div>
      {(serviceId || serviceStateless) && <TimetableView />}
    </div>
  );
};

export default Timetable;
