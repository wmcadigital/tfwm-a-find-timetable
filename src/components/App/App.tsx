import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Contexts
import ContextProvider from 'globalState/ContextProvider';
import FindTimetable from './FindTimetable';

const App = () => {
  return (
    <React.StrictMode>
      <ContextProvider>
        <Router>
          <Switch>
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
