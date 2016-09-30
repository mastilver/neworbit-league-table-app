import React, { Component } from 'react';
import autobind from 'auto-bind';

import store from '../../store';
import { cloneDeep } from 'lodash';

export default class LeaguePlayers extends Component {

    constructor(...args) {
        super();
        autobind(this);

        this.state = { newPlayerName: '' };
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
        return (
            <div>
                <div>
                    <form onSubmit={this.createPlayer}>
                        <input type="text" value={this.state.newPlayerName} onChange={this.handleNewPlayerNameChange} />
                        <button type="submit">Create player</button>
                    </form>
                </div>
                <div>
                    {this.state.league.players.map((player, index) => {
                        return (<div key={index}>{player.name}</div>);
                    })}
                </div>
            </div>
        );
    }

    handleNewPlayerNameChange(event) {
        this.setState({ newPlayerName: event.target.value });
    }

    createPlayer(event) {
        event.preventDefault();
        const leagues = cloneDeep(store.data.leagues);
        leagues[this.props.params.index].players.push({ name: this.state.newPlayerName });
        store.setState({ leagues: leagues });
        this.setState({ newPlayerName: '' });
    }
}
