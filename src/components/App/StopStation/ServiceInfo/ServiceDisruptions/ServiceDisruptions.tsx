import { useState } from 'react';

import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
import Icon from 'components/shared/Icon/Icon';
import s from './ServiceDisruptions.module.scss';

const ServiceDisruptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="wmnds-m-b-lg">
      <h3>Disruptions to this service</h3>
      <div className={`wmnds-accordion${isOpen ? ' wmnds-is--open' : ''}`}>
        <button
          aria-controls="accordion-01"
          className="wmnds-accordion__summary-wrapper"
          aria-expanded={isOpen}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={`${s.summary} wmnds-accordion__summary`}>
            <DisruptionIndicatorSmall
              iconLeft="modes-isolated-bus"
              className={s.disruptionIndicator}
              text="16"
            />
            <span>
              Roadworks at <strong>Kings Road, New Oscott</strong>
            </span>
          </div>
          <Icon iconName="general-expand" className="wmnds-accordion__icon" />
          <Icon
            iconName="general-minimise"
            className="wmnds-accordion__icon wmnds-accordion__icon--minimise"
          />
        </button>
        <div className="wmnds-accordion__content" id="accordion-01">
          Lorem ipsum dolar sit...
        </div>
      </div>
    </div>
  );
};

export default ServiceDisruptions;
