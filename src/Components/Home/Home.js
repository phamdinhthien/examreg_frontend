import React, { Component } from 'react';
import './Style.css';
import Banner from './Banner';
import Card from './Card';
import Footer from './Footer';
import Authors from './Authors'
class Home extends Component {
    render() {
        return (
            // Các Component chính của trang chủ student
            <div>
                <Banner />
                <Card />
                <Authors />
                <Footer />
            </div>
        )
    }
}
export default Home;