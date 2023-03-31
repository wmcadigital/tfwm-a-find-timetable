/* eslint-disable */
// @ts-nocheck
import { useState } from 'react';
import ReactTable from 'react-table';
import { useTimetableContext } from 'globalState';
import Loader from 'components/shared/Loader/Loader';
// Import API hook
import useFetch from '../customHooks/useFetch';
// Import components
import TimetableHeader from './TimetableHeader';
import TimetableRoute from './TimetableRoute';
// import Map from './Map/Map';

const TimetableView = () => {
  const [{ serviceId, serviceStateless }] = useTimetableContext();
  const [showInbound, setShowInbound] = useState(true);
  const [when, setWhen] = useState<string>('0');
  const fetchUrl = () => {
    if (serviceId) {
      return `/TimetableStopApi/GetTimetableHeader/${serviceId.id}/${when}/${serviceId.atcoCode}/${serviceId.operatorCode}`;
    }
    if (serviceStateless) {
      return `/TimetableStopApi/GetTimetableHeader/${serviceStateless.stateless}/${serviceStateless.version}`;
    }
    return '';
  };

  const { response, isFetching } = useFetch<any>(
    fetchUrl(),
    'https://journeyplanner.networkwestmidlands.com/api'
  );

  const handleWhen = (w: string) => {
    if (when !== w) {
      setWhen(w);
    }
  };
  return (
    <>

      {isFetching ? (
        <Loader />
      ) : (
        <>
          {response ? (
            <>
              <TimetableHeader
                showInbound={showInbound}
                toggleDirection={() => setShowInbound(!showInbound)}
                when={when}
                handleWhen={handleWhen}
                timetableHeader={response}
              />
              <TimetableRoute when={when} showInbound={showInbound} timetableHeader={response} />
              <div>
              </div>
            </>
          ) : (
            'Error'
          )}
        </>
      )}
    </>
  );
};

export default TimetableView;
