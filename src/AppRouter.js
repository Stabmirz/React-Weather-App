import React from "react";
import App from './App';
import Day1 from './days/Day1';
import Day2 from './days/Day2';
import Day3 from './days/Day3';
import Day4 from './days/Day4';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function AppRouter() {
  return (
    <Router>
      <div>
        <Link to=""></Link>
        <Route path="" exact component={App} />
        <Route path="/day1" component={Day1} />
        <Route path="/day2" component={Day2} />
        <Route path="/day3" component={Day3} />
        <Route path="/day4" component={Day4} />
      </div>
    </Router>
  );
}

export default AppRouter;