import ServiceDepartures from './ServiceDepartures/ServiceDepartures';
import ServiceDisruptions from './ServiceDisruptions/ServiceDisruptions';
import ServiceTimetable from './ServiceTimetable/ServiceTimetable';

const ServiceInfo = () => {
  return (
    <div>
      <ServiceDepartures />
      <ServiceDisruptions />
      <ServiceTimetable />
    </div>
  );
};

export default ServiceInfo;
