import React, { Component } from 'react';
import * as ApiConfig from '../../api/ConfigApi';
import './Style.css';
class Login extends Component {
    constructor(pros) {
        super(pros)
        this.state = {
            username: "",
            password: "",
            loading: false
        }
    }
    componentWillMount(){
        localStorage.setItem('access_token_examreg', '');
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitForm = (e) => {
        this.setState({
            loading: true
        })
        e.preventDefault();
        const { username, password } = this.state;

        if (username === "admin" && password === "123") {
            localStorage.setItem('access_token_examreg', username);
            window.location.replace('/home');
        }
    }
    onMouseDown = () => {
        document.getElementById('eye-password').className = ('fa fa-eye');
        document.getElementById('password').setAttribute('type', 'text');

    }
    onMouseUp = () =>{
        document.getElementById('eye-password').className = ('fa fa-eye-slash')
        document.getElementById('password').setAttribute('type', 'password');
        
    }
    render() {
        return (
            <div className="container-fluid login">
                <div className="login-box">
                    <div className="account-icon">
                        <i className="fa fa-user-circle"></i>
                    </div>
                    <form onSubmit={this.submitForm}>
                        <div className="box">
                            
                            <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.onChange} required />
                        </div>
                        <div className="box">
                        <i className="fa fa-eye-slash" id="eye-password"  aria-hidden="true" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></i>
                        <input type="password" id="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} required />
                        </div>
                        {!this.state.loading
                            ?
                            <div style={{ position: "relative" }}>
                                <input className="btn-login" type="submit" value="Đăng Nhập" />
                            </div>
                            :
                            <div style={{textAlign: "center"}}>
                                <div className="spinner-border text-success"></div>
                            </div>
                        }
                        {/* <a href="#">Quên Mật Khẩu ?</a> */}
                    </form>
                </div>
            </div>
        );
    }
}
export default Login;