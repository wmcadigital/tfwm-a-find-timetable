import { useState, useEffect } from 'react';
import { useStopContext } from 'globalState';
import DisruptionIndicatorSmall from 'components/shared/DisruptionIndicator/DisruptionIndicatorSmall';
import Accordion from 'components/shared/Accordion/Accordion';
import Message from 'components/shared/Message/Message';
import { sanitize } from 'dompurify';
import s from './ServiceDisruptions.module.scss';

const ServiceDisruptions = () => {
  const [{ selectedLine, stopDisruptions }] = useStopContext();
  const [serviceDisruptions, setServiceDisruptions] = useState<any>(null);

  useEffect(() => {
    if (!serviceDisruptions && stopDisruptions?.length) {
      const thisLineDisruptions = stopDisruptions.filter((disruption: any) =>
        disruption.servicesAffected?.find((service: any) => service.id === selectedLine.id)
      );
      setServiceDisruptions(thisLineDisruptions);
    }
  }, [serviceDisruptions, stopDisruptions, selectedLine.id]);
  return (
    <div className="wmnds-m-b-md wmnds-p-b-md">
      <h3>Disruptions to this service</h3>
      {serviceDisruptions ? (
        <>
          {serviceDisruptions.map((disruption: any) => (
            <div className="wmnds-m-b-md">
              <Accordion
                key={disruption.id}
                id={disruption.id}
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
            </div>
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
