/* eslint-disable no-plusplus */
import { useEffect, useState, useRef, useCallback } from 'react';
import { useTimetableContext } from 'globalState';
import axios from 'axios';

interface IError {
  title: string;
  message: string;
  isTimeoutError?: boolean;
}

const useTimetableAPI = (when: string, timetableHeader: any, isInbound?: boolean) => {
  const [{ serviceId }] = useTimetableContext();
  const [results, setResults] = useState<any>({
    inbound: [],
    outbound: [],
    routeMap: [],
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
    const serializeStopData = (data: any) => {
      let matchedStopIndex = 0;
      const fixedBody = data
        .split('"NaptanIds"')
        .map((fragment: any) => {
          let index = 0;
          return fragment.replace(/(string)/g, (match: any) => {
            return `${match}_${(index++).toString().padStart(3, '0')}`;
          });
        })
        .join('"NaptanIds"')
        .replace(/(MatchedStop)/g, (match: any) => {
          return `${match}_${(matchedStopIndex++).toString().padStart(3, '0')}`;
        });
      return JSON.parse(fixedBody);
    };

    const inbound = responses[0];
    const outbound = responses[1];
    const routeMap = responses[2];
    const rawStopData = serializeStopData(responses[3].data);

    const stopData: any = Object.keys(rawStopData.RouteSequence.Stations).map(
      (stop) => rawStopData.RouteSequence.Stations[stop]
    );

    if (responses.some((res: any) => res?.data.length > 0)) {
      setResults({
        inbound: inbound.data,
        outbound: outbound.data,
        routeMap: routeMap.data,
        stopData,
      });
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
      'Content-Type': 'text/plain',
    };
    const direction = isInbound ? 'Inbound' : 'Outbound';
    const apiPath = 'https://journeyplanner.networkwestmidlands.com/api';
    const stateless = encodeURI(
      timetableHeader.BaseRoute.LineName.replaceAll(':', '_').replaceAll('*', 'H')
    );

    const id = serviceId?.id || '85551';
    const version = timetableHeader.BaseRoute.VersionNumber;
    const inboundPath = `${apiPath}/TimetableStopApi/GetStopsOnRoute/${stateless}/${version}/Inbound/${when}`;
    const outboundPath = `${apiPath}/TimetableStopApi/GetStopsOnRoute/${stateless}/${version}/Outbound/${when}`;
    const routeMapPath = `${apiPath}/TimetableStopApi/getRouteMap/${stateless}/${version}/${direction}/${when}`;
    const mapPath = `${REACT_APP_API_HOST}/Tfwm-Api/Line/${id}/Route/sequence/${direction}`;

    const inboundReq = axios.get(inboundPath, options);
    const outboundReq = axios.get(outboundPath, options);
    const routeMapReq = axios.get(routeMapPath, options);
    const mapReq = axios({
      method: 'get',
      url: mapPath,
      headers,
      transformResponse: [
        (data) => {
          return data;
        },
      ], // forces data to return raw text as data needs to be serialized properly
    });

    axios
      .all([inboundReq, outboundReq, routeMapReq, mapReq])
      .then(axios.spread((...responses) => mounted.current && handleApiResponse(responses)))
      .catch(handleApiError);
  }, [startApiTimeout, serviceId, timetableHeader, isInbound, when, handleApiResponse]);

  useEffect(() => {
    getAPIResults();
    // Unmount / cleanup
    return () => {
      mounted.current = false; // Set mounted back to false on unmount
      // cancelRequest(); // cancel the request
      clearApiTimeout(); // clear timeout
    };
  }, [getAPIResults]);

  return { loading, errorInfo, results, getAPIResults };
};

export default useTimetableAPI;
