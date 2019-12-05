import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Interface extends Component {

    render() {
        return (
            <div>
                <h1>This is my website manage student</h1>
                <Link to="/">Logout</Link>
            </div>
        );
    }
}
export default Interface;