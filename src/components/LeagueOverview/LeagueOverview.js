import React, { Component } from 'react';
import autobind from 'auto-bind';

import { Link } from 'react-router';
import store from '../../store';
import League from '../League/League';
import { cloneDeep } from 'lodash';

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
                <Link to="/">Back to leagues</Link>
                <League name={name} /><input type="file" onChange={this.handleSetImage} />
                <img src={this.state.league.image} alt="League avatar" style={{ height: '50px' }} />
                <Link to={`/league-overview/${this.props.params.index}/league-players`}>Players </Link>
                <Link to={`/league-overview/${this.props.params.index}/league-matches`}>Matches </Link>
                <Link to={`/league-overview/${this.props.params.index}/league-table`}>Table </Link>
                {this.props.children}
            </div>
        )
    }

    handleSetImage(event) {
        const leagues = cloneDeep(store.data.leagues);
        let image = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
            let imageDataUrl = fileReader.result;
            leagues[this.props.params.index].image = imageDataUrl;
            store.setState({ leagues: leagues });
        });
        fileReader.readAsDataURL(image);
    }
}
