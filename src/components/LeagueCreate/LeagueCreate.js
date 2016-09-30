import React, { Component } from 'react';
import autobind from 'auto-bind';

import { Link } from 'react-router';
import store from '../../store';

export default class LeagueCreate extends Component {

    constructor(...args) {
        super();
        autobind(this);

        this.state = {name:""};
    }

    handleChange(e){
        this.setState({ name: e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();
        const league = { name: this.state.name, players: [] };

        store.setState({
            leagues: store.data.leagues.concat(league)
        });
        this.props.history.push(`/league-overview/${store.data.leagues.length - 1}`);
    }

    render() {
        return (
            <div>
                <div>
                    <Link to="/">Back</Link>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleChange}/>
                    </label>
                    <button type="submit">save</button>
                </form>
            </div>
        );
    }
}
