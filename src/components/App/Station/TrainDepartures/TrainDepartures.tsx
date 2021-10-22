import AutoComplete from 'components/shared/AutoComplete/AutoComplete';

const TrainDepartures = () => {
  return (
    <div className="wmnds-live-departures-train wmnds-m-b-lg">
      <div className="wmnds-live-departures-tabs">
        <input
          className="wmnds-live-departures-tabs__input wmnds-screenreaders-only"
          type="radio"
          value="Live departures"
          name="trainTabs"
          id="live-departures"
          aria-label="Live departures"
          checked
        />
        <label className="wmnds-live-departures-tabs__label" htmlFor="live-departures">
          <span className="wmnds-h3 wmnds-m-none">Live departures</span>
        </label>
        <input
          className="wmnds-live-departures-tabs__input wmnds-screenreaders-only"
          type="radio"
          value="Live arrivals"
          name="trainTabs"
          id="live-arrivals"
          aria-label="Live arrivals"
        />
        <label className="wmnds-live-departures-tabs__label" htmlFor="live-arrivals">
          <span className="wmnds-h3 wmnds-m-none">Live arrivals</span>
        </label>
        <div className="wmnds-live-departures wmnds-live-departures-tabs__departures">
          <div className="wmnds-col-1 wmnds-col-md-2-3">
            <p className="wmnds-h4 wmnds-m-t-none wmnds-m-b-md">
              Enter your destination to filter departures
            </p>
            <AutoComplete
              name="trainLiveDepartures"
              placeholder="Search"
              onUpdate={() => console.log('updated')}
            />
          </div>
          <hr className="wmnds-hide-mobile" />
          <div className="wmnds-grid wmnds-m-b-md">
            <div className="wmnds-col-1 wmnds-col-md-1-2" />
            <hr className="wmnds-col-1 wmnds-hide-desktop" />
            <div className="wmnds-col-1 wmnds-col-md-1-2">
              <p className="wmnds-text-align-right wmnds-m-b-none">Last updated 9:30am</p>
            </div>
          </div>
          <table className="wmnds-table wmnds-live-departures__train-timetable">
            <caption className="wmnds-table__caption wmnds-screenreaders-only">
              Live departures
            </caption>
            <thead>
              <th scope="col">Train</th>
              <th scope="col">Platform</th>
              <th scope="col">Time</th>
            </thead>
            <tbody>
              <tr>
                <th scope="row" data-header="Train">
                  <strong>Kidderminster</strong>
                  <span>West Midlands Railway</span>
                </th>
                <td data-header="Platform">2</td>
                <td data-header="Time">08:21</td>
              </tr>
              <tr>
                <th scope="row" data-header="Train">
                  <strong>London Marylebone</strong>
                  <span>Chiltern Railways</span>
                </th>
                <td data-header="Platform">1</td>
                <td data-header="Time">08:25</td>
              </tr>
              <tr>
                <th scope="row" data-header="Train">
                  <strong>Stratford-upon-Avon</strong>
                  <span>West Midlands Railway</span>
                </th>
                <td data-header="Platform">1</td>
                <td data-header="Time">08:31</td>
              </tr>
              <tr>
                <th scope="row" data-header="Train">
                  <strong>Worcester Forgate Street</strong>
                  <span>West Midlands Railway</span>
                </th>
                <td data-header="Platform" />
                <td data-header="Time">
                  <strong className="wmnds-live-departures__train-timetable-status">
                    Cancelled
                  </strong>
                </td>
              </tr>
              <tr>
                <th scope="row" data-header="Train">
                  <strong>Dorridge</strong>
                  <span>West Midlands Railway</span>
                </th>
                <td data-header="Platform">1</td>
                <td data-header="Time">08:40</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="wmnds-live-departures wmnds-live-departures-tabs__arrivals">
          <p className="wmnds-text-align-right wmnds-m-b-md">Last updated 9:30am</p>
          <table className="wmnds-table wmnds-live-departures__train-timetable wmnds-live-departures__train-timetable--responsive">
            <caption className="wmnds-table__caption wmnds-screenreaders-only">
              Live arrivals
            </caption>
            <thead>
              <th scope="col">Train</th>
              <th scope="col">Platform</th>
              <th scope="col">Time</th>
            </thead>
            <tbody>
              <tr>
                <th scope="row" data-header="Train">
                  <strong>Kidderminster</strong>
                  <span>West Midlands Railway</span>
                </th>
                <td data-header="Platform">2</td>
                <td data-header="Time">08:21</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrainDepartures;
