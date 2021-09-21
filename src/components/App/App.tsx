import React from 'react';
// Contexts
import ContextProvider from 'globalState/ContextProvider';
import FindTimetable from './FindTimetable';

const App = () => {
  return (
    <React.StrictMode>
      <ContextProvider>
        <FindTimetable />
      </ContextProvider>
    </React.StrictMode>
  );
};

export default App;
