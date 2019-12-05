import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
const menus = [
  { label: "Quản Lý Sinh Viên", to: "/students", exact: false },
  { label: "Quản Lý Kì Thi", to: "/exams", exact: false },
]
class Menu extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{background:"linear-gradient(90deg,#48b1bf,#677ebd)" ,marginBottom:"50px"}}> 
        <a className="navbar-brand" style={{fontWeight:"800", padding:"4px 0px"}}>
        {/* <i className="fa fa-user-circle-o  mr-2" aria-hidden="true"></i> */}
        Adminstrations</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {
              menus.map((m, index) => {
                return <Link className="nav-item nav-link" style={{color:"#fff  ", fontWeight:"700", marginRight:"20px", padding:"5px 0px" }} key={index} to={m.to} onClick={() => this.setState({ isShowMenu: false })}>{m.label}</Link>
              })
            }
          </div>
        </div>
      </nav>
    );
  }
}
export default Menu;