import React, { Component } from 'react';
import autobind from 'auto-bind';

export default class League extends Component {

    constructor(...args) {
        super();
        autobind(this);
    }

    render() {
        const name = this.props.name;
        return (
            <div style={{ height: '50px', display: 'inline-block' }}>
                {name}
            </div>
        );
    }
}
