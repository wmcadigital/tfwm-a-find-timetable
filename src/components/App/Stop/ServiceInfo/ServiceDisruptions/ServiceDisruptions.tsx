import { useState, useEffect } from 'react';
import { useStopContext } from 'globalState';
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
import Icon from 'components/shared/Icon/Icon';
// import Loader from 'components/shared/Loader/Loader';
import Message from 'components/shared/Message/Message';
import { sanitize } from 'dompurify';
import s from './ServiceDisruptions.module.scss';

const Accordion = ({
  id,
  summary,
  children,
}: {
  id: string;
  summary: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`wmnds-accordion${isOpen ? ' wmnds-is--open' : ''}`}>
      <button
        aria-controls={id}
        className="wmnds-accordion__summary-wrapper"
        aria-expanded={isOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`${s.summary} wmnds-accordion__summary`}>{summary}</div>
        <Icon iconName="general-expand" className="wmnds-accordion__icon" />
        <Icon
          iconName="general-minimise"
          className="wmnds-accordion__icon wmnds-accordion__icon--minimise"
        />
      </button>
      <div className="wmnds-accordion__content" id={id}>
        {children}
      </div>
    </div>
  );
};

const ServiceDisruptions = () => {
  const [{ selectedLine, disruptions }] = useStopContext();
  const [serviceDisruptions, setServiceDisruptions] = useState<any>(null);

  useEffect(() => {
    if (!serviceDisruptions && disruptions?.length) {
      const thisLineDisruptions = disruptions.filter((disruption: any) =>
        disruption.servicesAffected?.find((service: any) => service.id === selectedLine.id)
      );
      setServiceDisruptions(thisLineDisruptions);
    }
  }, [serviceDisruptions, disruptions, selectedLine.id]);
  return (
    <div className="wmnds-m-b-lg">
      <h3>Disruptions to this service</h3>
      {serviceDisruptions ? (
        <>
          {serviceDisruptions.map((disruption: any) => (
            <Accordion
              id="disruption_accordion"
              summary={
                <>
                  <DisruptionIndicatorSmall
                    iconLeft="modes-isolated-bus"
                    className={s.disruptionIndicator}
                    text={selectedLine.name}
                  />
                  <span>
                    {disruption.title} at <strong>{disruption.subtitle}</strong>
                  </span>
                </>
              }
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitize(disruption.description),
                }}
              />
            </Accordion>
          ))}
        </>
      ) : (
        <Message
          type="error"
          title="Please try again later"
          message="Sorry, we are experiencing technical issues."
        />
      )}
    </div>
  );
};

export default ServiceDisruptions;
