import { useEffect, useState, useRef, useCallback } from 'react';
import { useFormContext } from 'globalState';
import axios from 'axios';

interface IError {
  title: string;
  message: string;
  isTimeoutError?: boolean;
}

const useTimetableAPI = () => {
  const [{ selectedService }] = useFormContext();
  const [results, setResults] = useState<any>({
    inbound: [],
    outbound: [],
  });
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

  const handleApiResponse = useCallback((responses) => {
    const inbound = responses[0];
    const outbound = responses[1];

    if (responses.some((res: any) => res?.data.length > 0)) {
      setResults({
        inbound: inbound.data,
        outbound: outbound.data,
      });
    }
    clearApiTimeout();
    setLoading(false);
  }, []);

  const handleApiError = (errors: any[]) => {
    errors.forEach((error) => {
      setLoading(false); // Set loading state to false after data is received
      setErrorInfo({
        // Update error message
        title: 'Please try again',
        message: 'Apologies, we are having technical difficulties.',
        isTimeoutError: axios.isCancel(error),
      });
      setResults([]); // Reset the results
      if (!axios.isCancel(error)) {
        // eslint-disable-next-line no-console
        console.log({ error });
      }
    });
  };

  // Take main function out of useEffect, so it can be called elsewhere to retry the search
  const getAPIResults = useCallback(() => {
    source.current = axios.CancelToken.source();
    mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    setLoading(true); // Update loading state to true as we are hitting API
    startApiTimeout();
    const options = {
      cancelToken: source.current.token, // Set token with API call, so we can cancel this call on unmount
    };

    const inboundPath = `https://journeyplanner.networkwestmidlands.com/api/TimetableStopApi/GetStopsOnRoute/${encodeURI(
      selectedService!.Service.Stateless.replaceAll(':', '_')
    )}/${selectedService!.Service.Version}/Inbound/0`;
    const outboundPath = `https://journeyplanner.networkwestmidlands.com/api/TimetableStopApi/GetStopsOnRoute/${encodeURI(
      selectedService!.Service.Stateless.replaceAll(':', '_')
    )}/${selectedService!.Service.Version}/Outbound/0`;

    const inboundReq = axios.get(inboundPath, options);
    const outboundReq = axios.get(outboundPath, options);

    axios
      .all([outboundReq, inboundReq])
      .then(axios.spread((...responses) => mounted.current && handleApiResponse(responses)))
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

export default useTimetableAPI;
