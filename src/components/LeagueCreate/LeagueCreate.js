import React, { Component } from 'react';
import autobind from 'auto-bind';

import { Link } from 'react-router';

export default class LeagueCreate extends Component {

    constructor(...args) {
        super();
        autobind(this);
    }

    render() {
        return (
            <div>
                <div>
                    <Link to="/">Back</Link>
                </div>
                <div>
                    Name: 
                    <input type="text" />
                </div>
            </div>
        );
    }

}