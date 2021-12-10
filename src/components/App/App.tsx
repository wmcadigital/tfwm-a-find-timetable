import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Contexts
import ContextProvider from 'globalState/ContextProvider';
import FindTimetable from './FindTimetable';
import Timetable from './Timetable';

const App = () => {
  return (
    <React.StrictMode>
      <ContextProvider>
        <Router>
          <Switch>
            <Route path="/timetable/:id/:atcoCode/:operatorCode">
              <Timetable />
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
