import { useEffect, useState, useRef, useCallback } from 'react';
import { useFormContext } from 'globalState';
import axios from 'axios';

interface IError {
  title: string;
  message: string;
  isTimeoutError?: boolean;
}

const useTimetableHeaderAPI = () => {
  const [{ selectedService }] = useFormContext();
  const [results, setResults] = useState<any>();
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState<IError | null>(null); // Placeholder to set error messaging

  // Reference variables
  const mounted = useRef<any>();
  const source = useRef<any>();
  const apiTimeout = useRef<any>();
  // Helper functions
  const cancelRequest = () => {
    if (source.current) source.current.cancel('Api request timeout');
  };

  const startApiTimeout = useCallback(() => {
    apiTimeout.current = setTimeout(() => {
      cancelRequest();
    }, 15000); // 15 seconds
  }, []);

  const clearApiTimeout = () => clearTimeout(apiTimeout.current);

  const handleApiResponse = useCallback((responses, service) => {
    if (responses) {
      if (responses[1]?.data) {
        const lineData = responses[1]?.data.RouteSearchResponse.SearchMatches.RouteSearchMatch;
        const lineId = lineData.find(
          (line: any) =>
            line.LineName.toLowerCase() === service.Service.ServiceNumber.toLowerCase() &&
            line.Operators.Operator[0].Code === service.Service.OperatorCode
        );
        const resultsWithId = responses[0].data;
        resultsWithId.LineId = lineId.LineId;
        setResults(resultsWithId);
      } else {
        setResults(responses[0].data);
      }
    }
    clearApiTimeout();
    setLoading(false);
  }, []);

  const handleApiError = (errors: any[]) => {
    setLoading(false); // Set loading state to false after data is received
    setErrorInfo({
      // Update error message
      title: 'Please try again',
      message: 'Apologies, we are having technical difficulties.',
      isTimeoutError: axios.isCancel(errors),
    });
    setResults([]); // Reset the results
    if (!axios.isCancel(errors)) {
      // eslint-disable-next-line no-console
      console.log({ errors });
    }
  };

  // Take main function out of useEffect, so it can be called elsewhere to retry the search
  const getAPIResults = useCallback(() => {
    source.current = axios.CancelToken.source();
    mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
    setLoading(true); // Update loading state to true as we are hitting API
    startApiTimeout();
    const options = {
      cancelToken: source.current.token, // Set token with API call, so we can cancel this call on unmount
    };
    const headers = {
      'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
    };
    const apiPath = 'https://journeyplanner.networkwestmidlands.com/api';
    const stateless = encodeURI(selectedService!.Service.Stateless.replaceAll(':', '_'));
    const version = selectedService!.Service.Version;
    const serviceNumber = selectedService!.Service.ServiceNumber;
    const serviceId = selectedService!.Service.ItoLineId;
    const headerPath = `${apiPath}/TimetableStopApi/GetTimetableHeader/${stateless}/${version}`;
    const idPath = `${REACT_APP_API_HOST}/Tfwm-Api/Line/Search/${serviceNumber}`;
    const headerReq = axios.get(headerPath, options);
    const idReq = !serviceId ? axios.get(idPath, { ...options, headers }) : null;

    axios
      .all([headerReq, idReq])
      .then((res) => mounted.current && handleApiResponse(res, selectedService))
      .catch(handleApiError);
  }, [handleApiResponse, startApiTimeout, selectedService]);

  useEffect(() => {
    getAPIResults();
    // Unmount / cleanup
    return () => {
      mounted.current = false; // Set mounted back to false on unmount
      cancelRequest(); // cancel the request
      clearApiTimeout(); // clear timeout
    };
  }, [getAPIResults]);

  return { loading, errorInfo, results, getAPIResults };
};

export default useTimetableHeaderAPI;
