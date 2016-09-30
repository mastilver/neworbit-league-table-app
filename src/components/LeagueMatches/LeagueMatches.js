import React, { Component } from 'react';
import autoBind from 'auto-bind';
import { cloneDeep } from 'lodash';

import store from '../../store';


export default class LeagueMatches extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            matches: [],
            players: [],
            selectedPlayerA: '',
            selectedPlayerB: '',
            playerAScore: 0,
            playerBScore: 0
        };

        autoBind(this);
    }

    componentWillMount() {
        store.addCallback(this.updateState);
    }

    componentWillUnmount() {
        store.removeCallback(this.updateState);
    }

    updateState(){
        this.setState({
            matches: store.data.leagues[this.props.params.index].matches,
            players: store.data.leagues[this.props.params.index].players
        });
    }

    handlePlayerASelect(e) {
        this.setState({
            selectedPlayerA: e.target.value,
        });
    }

    handlePlayerAScoreUpdate(e) {
        this.setState({
            playerAScore: e.target.value,
        });
    }

    handlePlayerBScoreUpdate(e) {
        this.setState({
            playerBScore: e.target.value
        });
    }

    handlePlayerBSelect(e) {
        this.setState({
            selectedPlayerB: e.target.value,
        });
    }

    handleMatchCreate(e) {
        e.preventDefault();

        const { selectedPlayerA, selectedPlayerB, playerAScore, playerBScore } = this.state

        if(selectedPlayerA === '' || selectedPlayerB === '') {
            return;
        }

        const leagues = cloneDeep(store.data.leagues);
        leagues[this.props.params.index].matches.push({
            playerA: {
                name: selectedPlayerA,
                score: playerAScore
            },
            playerB: {
                name: selectedPlayerB,
                score: playerBScore
            }
        });

        store.setState({
            leagues
        });
    }

    render() {
        const { matches, players, selectedPlayerA, selectedPlayerB, playerAScore, playerBScore } = this.state;

        return (
            <div>
                <form onSubmit={this.handleMatchCreate}>
                    <select value={selectedPlayerA} onChange={this.handlePlayerASelect}>
                        <option/>
                        {players.map((player, i) => {
                            return (
                                <option key={i}>{player.name}</option>
                            );
                        })}
                    </select>
                    <input value={playerAScore} type="number" onChange={this.handlePlayerAScoreUpdate} />
                    {' - '}
                    <input value={playerBScore} type="number" onChange={this.handlePlayerBScoreUpdate} />
                    <select value={selectedPlayerB} onChange={this.handlePlayerBSelect}>
                        <option/>
                        {players.map((player, i) => {
                            return (
                                <option key={i}>{player.name}</option>
                            );
                        })}
                    </select>
                    <button>Create</button>
                </form>
                {this.renderMatches(matches)}
            </div>
        );
    }

    renderMatches(matches) {
        return matches.map((match, index) => {
            return (
                <div key={index}>
                    <span>{match.playerA.name}</span>
                    <span>{match.playerA.score}</span>
                    {' - '}
                    <span>{match.playerB.score}</span>
                    <span>{match.playerB.name}</span>
                </div>
            );
        })
    }
}
