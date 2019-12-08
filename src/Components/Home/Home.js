import React, { Component } from 'react';
import './Style.css';
import Banner from './Banner';
import Card from './Card';
import Footer from './Footer';

class Home extends Component {
    render() {
        return (
            <div>
                <Banner />
                <Card />
                <Footer />
            </div>
        )
    }
}
export default Home;