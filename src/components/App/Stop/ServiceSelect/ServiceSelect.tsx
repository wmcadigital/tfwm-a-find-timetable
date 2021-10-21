import React from 'react';
import s from './ServiceSelect.module.scss';

type Line = { id: string; name: string; operator: string };

const ServiceSelect = ({
  services,
  handleChange,
}: {
  services: Line[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
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
            onChange={handleChange}
          />
          <label className={`${s.isChecked} wmnds-btn wmnds-btn--primary`} htmlFor="allServices">
            All
          </label>
        </div>
        {services.map((service) => (
          <div key={service.id} className={s.serviceBtn}>
            <input
              className="wmnds-screenreaders-only"
              type="radio"
              id={service.id}
              name="serviceSelect"
              value={service.name}
              onChange={handleChange}
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
