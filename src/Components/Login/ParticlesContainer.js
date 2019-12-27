import React, { Component } from 'react';
import Particles from 'react-particles-js';
// khởi tạo particpleOpt
const particleOpt = {
    particles: {
        number: {
            value: 150,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
}

class ParticlesContainer extends Component {
    render() {
        return (
            // background của trang login
            <Particles
                params={particleOpt} style={{ background: "linear-gradient(to right, rgb(203,52,181), rgb(68,166,187))", position: "absolute" }}
            />
        );
    }
}
export default ({ children }) => (
    <>
        <ParticlesContainer />
        {children}
    </>
);