// Components

import TimetableView from './TimetableView/TimetableView';
import ServiceSearch from './ServiceSearch/ServiceSearch';

const pageToShow = <ServiceSearch />;

const App = () => {
  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg">
      {pageToShow === 1 && pageToShow}
      <div className="wmnds-col-2-3">
        <TimetableView />
      </div>
    </div>
  );
};

export default App;
