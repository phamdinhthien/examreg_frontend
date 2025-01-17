import React, { Component } from 'react';
import * as ApiConfig from '../../api/ConfigApi';
import './Style.css';
import ParticlesContainer from './ParticlesContainer';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { alertText, alertTextCustom } from '../../core/Controller';

class Login extends Component {
    // Khởi tạo constructor
    constructor(pros) {
        super(pros)
        this.state = {
            username: "",
            password: "",
            loading: false
        }
    }
    componentWillMount() {
        localStorage.setItem('access_token', '');
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // Submit Form đăng nhập
    submitForm = (e) => {
        this.setState({
            loading: true
        })
        e.preventDefault();
        const { username, password } = this.state;
        let data = {
            username: username,
            password: password
        }
        fetch(ApiConfig.API_URL + '/Account/Login.php', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(response => {
                let status = response.status;
                let message = response.message;
                if (status == 200) {
                    localStorage.setItem('access_token', response.token);
                    window.location.replace('/home');
                } else if (status == 400) {
                    this.setState({
                        loading: false
                    })
                    alertText(message);
                }
            })
            .catch(err => console.log(err))
    }
    // Hiển thị mật khẩu dưới dạng text
    onMouseDown = () => {
        document.getElementById('eye-password').className = ('fa fa-eye');
        document.getElementById('password').setAttribute('type', 'text');

    }
    // Hiển thi mật khẩu dưới dạng password
    onMouseUp = () => {
        document.getElementById('eye-password').className = ('fa fa-eye-slash')
        document.getElementById('password').setAttribute('type', 'password');

    }
    render() {
        return (
            <ParticlesContainer>
                <div className="container-fluid login">
                    {/* Thanh Navbar chứa tên trường */}
                    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ background: "linear-gradient(90deg,#48b1bf,#677ebd)", marginBottom: "50px" }}>
                        <div>
                            <img src="https://img.icons8.com/doodle/100/000000/brick.png"></img>
                            <Link to="/home" className="navbar-brand" style={{ fontWeight: "800", padding: "4px 0px" }}>
                                ABCuniversity</Link>
                        </div>
                        <h4 style={{ color: "#fff" }}>Hệ Thống Đăng Kí Môn Thi</h4>
                    </nav>
                    {/* Login-box chứa các yêu cầu về đệ trình form đăng nhập */}
                    <div className="login-box">
                        <div className="account-icon">
                            <img style={{ height: "80px", width: "80px" }} src="https://img.icons8.com/doodle/100/000000/brick.png"></img>
                            <h4>Đăng Nhập Hệ Thống</h4>
                        </div>
                        <form onSubmit={this.submitForm}>
                            <div className="box">
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} required />
                            </div>
                            <div className="box">
                                <i className="fa fa-eye-slash" id="eye-password" aria-hidden="true" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></i>
                                <input type="password" id="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} required />
                            </div>
                            {!this.state.loading
                                ?
                                <div style={{ position: "relative" }}>
                                    <input className="btn-login" type="submit" value="Đăng Nhập" />
                                </div>
                                :
                                <div style={{ textAlign: "center" }}>
                                    <div className="spinner-border text-success"></div>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </ParticlesContainer>
        );
    }
}
export default Login;