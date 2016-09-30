import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import LeagueList from './components/LeagueList/LeagueList';
import LeagueCreate from './components/LeagueCreate/LeagueCreate';
import LeagueOverview from './components/LeagueOverview/LeagueOverview';
import LeaguePlayers from './components/LeaguePlayers/LeaguePlayers';
import store from './store';

function renderApp(){
    ReactDOM.render(
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={LeagueList} />
                <Route path="/league-create" component={LeagueCreate} />
                <Route path="/league-overview/:index" component={LeagueOverview}>
                    <Route path="league-players" component={LeaguePlayers} />
                </Route>
            </Route>
        </Router>,
        document.getElementById('root')
    );
}
renderApp();
store.callback = renderApp;
