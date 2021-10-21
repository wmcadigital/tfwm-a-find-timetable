import s from './ServiceSelect.module.scss';

const ServiceSelect = ({ services }: { services: any[] }) => {
  return (
    <div className={s.serviceContainer}>
      <div className={s.serviceGrid}>
        <div className={s.serviceBtn}>
          <input
            className="wmnds-screenreaders-only"
            type="radio"
            id="allServices"
            name="serviceSelect"
            value="all"
          />
          <label className={`${s.isChecked} wmnds-btn wmnds-btn--primary`} htmlFor="allServices">
            All
          </label>
        </div>
        {services.map((service) => (
          <div key={service} className={s.serviceBtn}>
            <input
              className="wmnds-screenreaders-only"
              type="radio"
              id={service}
              name="serviceSelect"
              value={service}
            />
            <label className={`${s.isChecked} wmnds-btn wmnds-btn--primary`} htmlFor={service}>
              {service}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelect;
