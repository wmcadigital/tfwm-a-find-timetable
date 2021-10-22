import { useState, useEffect } from 'react';
import { useStopContext } from 'globalState';
import ServiceDepartures from './ServiceDepartures/ServiceDepartures';
import ServiceDisruptions from './ServiceDisruptions/ServiceDisruptions';
import ServiceTimetable from './ServiceTimetable/ServiceTimetable';

const ServiceInfo = () => {
  const [{ selectedLine, stopDepartures }] = useStopContext();
  const [lineDepartures, setLineDepartures] = useState<any>([]);
  useEffect(() => {
    setLineDepartures(
      stopDepartures.departures.filter((dep: any) => dep.line.id === selectedLine.id).slice(0, 5)
    );
  }, [selectedLine, stopDepartures.departures]);

  return (
    <>
      <ServiceDepartures departures={lineDepartures} />
      <ServiceDisruptions />
      <ServiceTimetable />
    </>
  );
};

export default ServiceInfo;
