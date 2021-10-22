import ServiceDepartures from './ServiceDepartures/ServiceDepartures';
import ServiceDisruptions from './ServiceDisruptions/ServiceDisruptions';
import ServiceTimetable from './ServiceTimetable/ServiceTimetable';

const ServiceInfo = ({ departures }: { departures: any }) => {
  return (
    <div>
      <ServiceDepartures departures={departures} />
      <ServiceDisruptions />
      <ServiceTimetable />
    </div>
  );
};

export default ServiceInfo;
