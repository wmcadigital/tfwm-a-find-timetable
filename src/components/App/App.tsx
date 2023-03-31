import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Contexts
import ContextProvider from 'globalState/ContextProvider';
import FindTimetable from './FindTimetable';
import Timetable from './Timetable';
import Stop from './Stop';

const App = () => {
  return (
    <React.StrictMode>
      <ContextProvider>
        <Router>
          <Switch>
            <Route
              path={['/timetable/:id/:atcoCode/:operatorCode', '/timetable/:stateless/:version']}
            >
              <Timetable />
            </Route>
            <Route path="/stop/:stop">
              <Stop />
            </Route>
            <Route path="/">
              <FindTimetable />
            </Route>
          </Switch>
        </Router>
      </ContextProvider>
    </React.StrictMode>
  );
};

export default App;
