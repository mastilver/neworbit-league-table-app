import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import LeagueList from './components/LeagueList/LeagueList';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LeagueList} />
    </Route>
  </Router>,
  document.getElementById('root')
);
