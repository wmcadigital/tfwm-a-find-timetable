import { useState, useEffect } from 'react';
import { useStopContext } from 'globalState';
import ServiceDepartures from './ServiceDepartures/ServiceDepartures';
import ServiceDisruptions from './ServiceDisruptions/ServiceDisruptions';
import ServiceTimetable from './ServiceTimetable/ServiceTimetable';

const ServiceInfo = () => {
  const [{ selectedLine, stopDepartures, stopLines }] = useStopContext();
  const [lineDepartures, setLineDepartures] = useState<any>([]);
  const thisLine = stopLines?.services.find((service: any) => service.id === selectedLine.id);
  useEffect(() => {
    setLineDepartures(
      stopDepartures.departures.filter((dep: any) => dep.line.id === selectedLine.id).slice(0, 5)
    );
  }, [selectedLine, stopDepartures.departures]);

  return (
    <>
      <ServiceDepartures departures={lineDepartures} />
      {thisLine.hasDisruptions && <ServiceDisruptions />}
      <ServiceTimetable />
    </>
  );
};

export default ServiceInfo;
