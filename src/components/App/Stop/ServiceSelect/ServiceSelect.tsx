import { useStopContext } from 'globalState';
import s from './ServiceSelect.module.scss';

type Line = { id: string; name: string; operator: string };

const ServiceSelect = () => {
  const [{ stopPointData, stopLines, selectedLine }, stopDispatch] = useStopContext();
  const services = stopPointData.stopPoint.lines;
  const handleChange = (value: Line | null) => {
    let routeData: any = value ? { ...value } : null;
    if (value) {
      const routeInfo = stopLines?.services.find((service: any) => service.id === value.id);
      if (routeInfo) {
        const { hasDisruptions, disruptionSeverity, routes } = routeInfo;
        routeData = { ...value, hasDisruptions, disruptionSeverity, routes };
      }
    }
    stopDispatch({ type: 'UPDATE_SELECTED_LINE', payload: routeData });
  };
  return (
    <div className={s.serviceContainer}>
      <div className={s.serviceGrid}>
        <div className={s.serviceBtn}>
          <input
            className="wmnds-screenreaders-only"
            type="radio"
            id="allServices"
            name="serviceSelect"
            value=""
            defaultChecked={!selectedLine}
            onChange={() => handleChange(null)}
          />
          <label className={`${s.isChecked} wmnds-btn wmnds-btn--primary`} htmlFor="allServices">
            All
          </label>
        </div>
        {services.map((service: any) => (
          <div key={service.id} className={s.serviceBtn}>
            <input
              className="wmnds-screenreaders-only"
              type="radio"
              id={service.id}
              name="serviceSelect"
              defaultChecked={selectedLine?.id === service.id}
              value={service.name}
              onChange={() => handleChange(service)}
            />
            <label className={`${s.isChecked} wmnds-btn wmnds-btn--primary`} htmlFor={service.id}>
              {service.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelect;
