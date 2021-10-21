import ServiceDepartures from './ServiceDepartures/ServiceDepartures';
import ServiceTimetable from './ServiceTimetable/ServiceTimetable';

const ServiceInfo = () => {
  return (
    <div>
      <ServiceDepartures />
      <h3>Disruptions to this service</h3>
      <ServiceTimetable />
    </div>
  );
};

export default ServiceInfo;
