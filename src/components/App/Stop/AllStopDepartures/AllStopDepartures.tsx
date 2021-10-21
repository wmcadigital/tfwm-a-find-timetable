import useStopAPI from '../customHooks/useStopAPI';

const AllStopDepartures = ({ atcoCode }: { atcoCode: string }) => {
  const { results } = useStopAPI(`/Stop/v2/Departures/${atcoCode}`);
  console.log(results);
  return (
    <div className="wmnds-m-b-lg">
      <div className="wmnds-grid wmnds-grid--spacing-2-md wmnds-grid--justify-between wmnds-m-b-md">
        <div className="wmnds-col-2-3">
          <h3>Real time departures</h3>
        </div>
        <div className="wmnds-col-auto">Last updated 9:30am</div>
      </div>
      <div className="wmnds-live-departures wmnds-live-departures--bus">
        <div className="wmnds-live-departures__service wmnds-grid wmnds-grid--spacing-sm-2-md wmnds-grid--justify-between">
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <div className="wmnds-live-departures__service-details">
              <div className="wmnds-live-departures__service-name">16</div>
              <div className="wmnds-live-departures__service-description">
                <strong>Wolverhampton</strong>
                <span className="wmnds-live-departures__service-operator">
                  National Express West Midlands
                </span>
              </div>
            </div>
          </div>
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <div className="wmnds-live-departures__times">
              <div className="wmnds-live-departures__time">3 mins</div>
              <div className="wmnds-live-departures__time">7 mins</div>
              <div className="wmnds-live-departures__time">28 mins</div>
            </div>
          </div>
        </div>
        <div className="wmnds-live-departures__service wmnds-grid wmnds-grid--spacing-sm-2-md wmnds-grid--justify-between">
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <div className="wmnds-live-departures__service-details">
              <div className="wmnds-live-departures__service-name">17</div>
              <div className="wmnds-live-departures__service-description">
                <strong>Dudley</strong>
                <span className="wmnds-live-departures__service-operator">
                  National Express West Midlands
                </span>
              </div>
            </div>
          </div>
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <div className="wmnds-live-departures__times">
              <div className="wmnds-live-departures__time">4 mins</div>
              <div className="wmnds-live-departures__time">14 mins</div>
              <div className="wmnds-live-departures__time">24 mins</div>
            </div>
          </div>
        </div>
        <div className="wmnds-live-departures__service wmnds-grid wmnds-grid--spacing-sm-2-md wmnds-grid--justify-between">
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <div className="wmnds-live-departures__service-details">
              <div className="wmnds-live-departures__service-name">17A</div>
              <div className="wmnds-live-departures__service-description">
                <strong>Wall Heath</strong>
                <span className="wmnds-live-departures__service-operator">Diamond</span>
              </div>
            </div>
          </div>
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <div className="wmnds-live-departures__times">
              <div className="wmnds-live-departures__time">8 mins</div>
              <div className="wmnds-live-departures__time">19 mins</div>
              <div className="wmnds-live-departures__time">27 mins</div>
            </div>
          </div>
        </div>
        <div className="wmnds-live-departures__service wmnds-grid wmnds-grid--spacing-sm-2-md wmnds-grid--justify-between">
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <div className="wmnds-live-departures__service-details">
              <div className="wmnds-live-departures__service-name">57</div>
              <div className="wmnds-live-departures__service-description">
                <strong>Wall Heath</strong>
                <span className="wmnds-live-departures__service-operator">
                  National Express West Midlands
                </span>
              </div>
            </div>
          </div>
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <div className="wmnds-live-departures__times">
              <div className="wmnds-live-departures__time">6 mins</div>
              <div className="wmnds-live-departures__time">16 mins</div>
              <div className="wmnds-live-departures__time">26 mins</div>
            </div>
          </div>
        </div>
        <div className="wmnds-live-departures__service wmnds-grid wmnds-grid--spacing-sm-2-md wmnds-grid--justify-between">
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <div className="wmnds-live-departures__service-details">
              <div className="wmnds-live-departures__service-name">125</div>
              <div className="wmnds-live-departures__service-description">
                <strong>Bridgnorth</strong>
                <span className="wmnds-live-departures__service-operator">Diamond</span>
              </div>
            </div>
          </div>
          <div className="wmnds-col-1 wmnds-col-sm-1-2">
            <div className="wmnds-live-departures__times">
              <div className="wmnds-live-departures__time">9 mins</div>
              <div className="wmnds-live-departures__time">14 mins</div>
              <div className="wmnds-live-departures__time">24 mins</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStopDepartures;
