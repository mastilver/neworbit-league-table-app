import React, { Component } from 'react';
import autobind from 'auto-bind';
import { Link } from 'react-router';
import store from '../../store';

import League from '../League/League';
import { cloneDeep, remove } from 'lodash'

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
            return leagues.map((league, index) => 
                <Link to={`/league-overview/${index}`} key={index}>
                    <img src={league.image} alt="League avatar" style={{ height: '50px' }} />
                    <League key={index} name={league.name} /><button key={`delete${index}`} value={index} onClick={this.handleClickDeleteLeague}>Delete</button>
                </Link>
            );
        }

        return(
            <div>There be no leagues</div>
        )
    }

    handleClickDeleteLeague(event) {
        event.preventDefault();
        const leagues =  cloneDeep(store.data.leagues);
        leagues.splice(event.target.value, 1);
        store.setState({
            leagues: leagues
        });
    }

}
