import { useStopContext } from 'globalState';
import s from './ServiceSelect.module.scss';

type Line = { id: string; name: string; operator: string };

const ServiceSelect = () => {
  const [{ stopPointData, selectedLine }, stopDispatch] = useStopContext();
  const services = stopPointData.stopPoint.lines;
  const handleChange = (value: Line | null) => {
    stopDispatch({ type: 'UPDATE_SELECTED_LINE', payload: value });
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
