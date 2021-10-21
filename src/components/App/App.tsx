import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Contexts
import ContextProvider from 'globalState/ContextProvider';
import FindTimetable from './FindTimetable';
import FindStopStation from './FindStopStation';
import Stop from './Stop';

const App = () => {
  return (
    <React.StrictMode>
      <ContextProvider>
        <Router>
          <Switch>
            <Route path="/find-a-timetable">
              <FindTimetable />
            </Route>
            <Route path="/stop/:atcoCode">
              <Stop />
            </Route>
            <Route path="/">
              <FindStopStation />
            </Route>
          </Switch>
        </Router>
      </ContextProvider>
    </React.StrictMode>
  );
};

export default App;
