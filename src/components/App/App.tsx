import React from 'react';
// Contexts
import ContextProvider from 'globalState/ContextProvider';
import { useFormContext } from 'globalState';
// Components
import Breadcrumbs from 'components/shared/Breadcrumbs/Breadcrumbs';
import ServiceSearchView from './ServiceSearchView/ServiceSearchView';
import TimetableView from './TimetableView/TimetableView';

const ViewToShow = () => {
  const [{ selectedService }] = useFormContext();
  return (
    <>
      <div className="wmnds-container">
        <Breadcrumbs />
      </div>
      <div className="wmnds-container wmnds-p-t-lg wmnds-p-b-lg">
        {selectedService ? <TimetableView /> : <ServiceSearchView />}
      </div>
    </>
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
