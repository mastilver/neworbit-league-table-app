import React, { Component } from 'react';
import autobind from 'auto-bind';
import { Link } from 'react-router';
import store from '../../store';

import League from '../League/League';

export default class LeagueList extends Component {
    constructor(...args){
        super(...args)
        autobind(this);
    }

    componentWillMount() {
        store.addCallback(this.updateState);
    }

    componentWillUnmount() {
        store.removeCallback(this.updateState);
    }

    updateState(){
        this.setState({
            leagues: store.data.leagues
        })
    }

    render() {
        return(
            <div>
                <div>
                    {this.renderLeagues(this.state.leagues)}
                </div>
                <div>
                    <Link to="/league-create">Create</Link>
                </div>
            </div>
        );
    }

    renderLeagues (leagues) {
        if(leagues.length) {
            return leagues.map((league, index) => (
                <Link to={`/league-overview/${index}`}>
                    <League key={index} name={league.name} />
                </Link>
            ));
        }

        return(
            <div>There be no leagues</div>
        )
    }
}
