import React, { Component } from 'react';
import autobind from 'auto-bind';

import { Link } from 'react-router';
import store from '../../store';
import League from '../League/League'

export default class LeagueOverview extends Component {
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
            league: store.data.leagues[this.props.params.index]
        });
    }

    render() {
        const name = this.state.league.name;

        return (
            <div>
                <League name={name} />
                <Link to={`/league-overview/${this.props.params.index}/league-players`}>Players </Link>
                <Link to={`/league-overview/${this.props.params.index}/league-matches`}>Matches </Link>
                <Link to={`/league-overview/${this.props.params.index}/league-table`}>Table </Link>
                {this.props.children}
            </div>
        )
    }
}
