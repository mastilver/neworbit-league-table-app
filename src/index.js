import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import LeagueList from './components/LeagueList/LeagueList';
import LeagueCreate from './components/LeagueCreate/LeagueCreate';
import store from './store';

function renderApp(){
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={LeagueList} />
                <Route path="/league-create" component={LeagueCreate} />
            </Route>
        </Router>,
        document.getElementById('root')
    );
}
renderApp();
store.callback = renderApp;