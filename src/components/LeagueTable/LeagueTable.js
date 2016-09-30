import React, { Component } from 'react';
import autobind from 'auto-bind';
import { sortBy } from 'lodash';
import store from '../../store';

export default class LeagueTable extends Component {
    constructor(...args){
        super(...args)

        autobind(this);

        this.state = {
            scores: []
        };
    }

    componentWillMount() {
        store.addCallback(this.updateState);
    }

    componentWillUnmount() {
        store.removeCallback(this.updateState);
    }

    updateState(){
        this.setState({
            scores: this.calculateScores(store.data.leagues[this.props.params.index].matches)
        });
    }

    render() {
        const scores = this.state.scores;

        console.log(scores);

        return(
            <div>
                <table>
                    <tr>
                        <th>Players</th>
                        <th>Points</th>
                        <th>Win</th>
                        <th>Draw</th>
                        <th>Lose</th>
                    </tr>
                    {this.renderScores(scores)}
                </table>
            </div>
        );
    }

    renderScores(scores) {
        return sortBy(scores, score => 1 / score.points).map((score, index) => {
            return(
                <tr>
                    <td>{score.name}</td>
                    <td>{score.points}</td>
                    <td>{score.win}</td>
                    <td>{score.draw}</td>
                    <td>{score.lose}</td>
                </tr>
            );
        })
    }

    calculateScores(matches) {
        var map = {};

        matches.forEach(match => {
            if (!map[match.playerA.name]) {
                map[match.playerA.name] = {
                    draw: 0,
                    win: 0,
                    lose: 0
                };
            }

            if (!map[match.playerB.name]) {
                map[match.playerB.name] = {
                    draw: 0,
                    win: 0,
                    lose: 0
                };
            }

            if (match.playerA.score === match.playerB.score) {
                map[match.playerA.name].draw++;
                map[match.playerB.name].draw++;
            } else if (match.playerA.score > match.playerB.score) {
                map[match.playerA.name].win++;
                map[match.playerB.name].lose++;
            } else {
                map[match.playerA.name].lose++;
                map[match.playerB.name].win++;
            }
        });

        return Object.keys(map).map(playerName => {
            return {
                name: playerName,
                ...map[playerName]
            }
        }).map(score => {
            return {
                ...score,
                points: score.win * 3 + score.draw
            };
        });
    }
}
