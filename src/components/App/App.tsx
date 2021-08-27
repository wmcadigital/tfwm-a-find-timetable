import React from 'react';
// Contexts
import ContextProvider from 'globalState/ContextProvider';
import { useFormContext } from 'globalState';
// Components
import ServiceSearchView from './ServiceSearchView/ServiceSearchView';
import TimetableView from './TimetableView/TimetableView';

const ViewToShow = () => {
  const [{ selectedService }] = useFormContext();
  return (
    <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg">
      {selectedService ? (
        <div className="wmnds-col-2-3">
          <TimetableView />
        </div>
      ) : (
        <ServiceSearchView />
      )}
    </div>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <ContextProvider>
        <ViewToShow />
      </ContextProvider>
    </React.StrictMode>
  );
};

export default App;
