import React, { Component } from 'react';
import autobind from 'auto-bind';

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
                {this.renderLeagues(leagues)}
             </div>
         );
     }

     renderLeagues (leagues) {
        if(leagues.length) {
            return leagues.map(league => <span>{league.name}</span>)
        }

        return(
            <div>There be no leagues</div>
        )
    }
}
