import Button from 'components/shared/Button/Button';

const ServiceDepartures = () => {
  return (
    <div>
      <div className="wmnds-live-departures wmnds-live-departures--service">
        <div className="wmnds-live-departures__service-details wmnds-m-b-md">
          <div className="wmnds-live-departures__service-name">16</div>
          <div className="wmnds-live-departures__service-description">
            <div className="wmnds-h3 wmnds-m-none">
              Stourbridge - Wolverhampton via Kingswinford
            </div>
          </div>
        </div>
        <p>
          <a href="#0">National Express West Midlands</a> runs this service
        </p>
        <Button
          iconLeft="general-star-empty"
          text="Add to homepage"
          btnClass="wmnds-btn--favourite"
        />
        <hr />
        <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--spacing-md-2-md">
          <div className="wmnds-col-1 wmnds-col-md-auto">
            <div className="wmnds-h3 wmnds-m-t-none wmnds-m-b-md">Real time departures</div>
            <p className="wmnds-m-b-md">See when the next 16 bus leaves this stop</p>
          </div>
          <div className="wmnds-col-1 wmnds-col-md-auto">
            <p className="wmnds-live-departures__last-updated">Last updated 9:30am</p>
          </div>
        </div>
        <div className="wmnds-live-departures__times">
          <div className="wmnds-live-departures__time">4 mins</div>
          <div className="wmnds-live-departures__time">14 mins</div>
          <div className="wmnds-live-departures__time">24 mins</div>
          <div className="wmnds-live-departures__time">34 mins</div>
          <div className="wmnds-live-departures__time">44 mins</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDepartures;
