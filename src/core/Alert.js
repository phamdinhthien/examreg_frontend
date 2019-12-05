import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            display: this.props.display,
            bgColor: ''
        }
    }
    setText = (text) => {
        this.setState({ text, bgColor: '' });
    }
    display = () => {
        this.setState({ display: true });
    }
    hidden = () => {
        this.setState({ display: false });
    }
    setBgColor = (color) => {
        this.setState({
            bgColor: color
        })
    }
    render() {
        return (
            <div id="alert" className={this.state.display ? "display" : ""} style={{ background: this.state.bgColor }}>
                {this.state.text}
            </div>
        )
    }
}

export default Alert;