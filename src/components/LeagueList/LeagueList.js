import React, { Component } from 'react';
import autobind from 'auto-bind';
import { Link } from 'react-router';

import League from '../League/League';

export default class LeagueList extends Component {
    constructor(...args){
        super(...args)
        autobind(this);
    }

    render() {
        const leagues = [
            {name: 'Bob'},
            {name: 'Double'}
        ];

        return(
            <div>
                <div>
                    {this.renderLeagues(leagues)}
                </div>
                <div>
                    <Link to="/league-create">Create</Link>
                </div>
            </div>
        );
    }

    renderLeagues (leagues) {
        if(leagues.length) {
            return leagues.map(league => <League name={league.name} />);
        }

        return(
            <div>There be no leagues</div>
        )
    }
}
