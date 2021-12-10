/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useTimetableContext } from 'globalState';
import Loader from 'components/shared/Loader/Loader';
// Import API hook
import useFetch from '../customHooks/useFetch';
// Import components
import TimetableHeader from './TimetableHeader';
import TimetableRoute from './TimetableRoute';
// import Map from './Map/Map';

const TimetableView = () => {
  const [{ serviceId }] = useTimetableContext();
  const [showInbound, setShowInbound] = useState(true);
  const [when, setWhen] = useState<string>('0');
  const { id, atcoCode, operatorCode } = serviceId;

  const fetchUrl =
    id.length && atcoCode.length && operatorCode.length
      ? `/TimetableStopApi/GetTimetableHeader/${id}/${when}/${atcoCode}/${operatorCode}`
      : '';

  const { response, isFetching } = useFetch<any>(
    fetchUrl,
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
