import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import { getCurrentRoles, getUserId } from '../../core/GetRoles';


var classNames = require('classnames');
// phân quyền
let role = getCurrentRoles();
const menus = [
  { label: "Quản Lý Sinh Viên", to: "/students", exact: false, display: role == 1},
  { label: "Quản Lý Kì Thi", to: "/exams", exact: false, display: role == 1 },
  { label: "Đăng Kí Thi", to: "/register-examtime", exact: false, display: role == 2 },
]
class Menu extends Component {
handleLogout = () =>{
    localStorage.clear();
    window.location.replace("/login");
  }
  render() {
    return (
      <div>
        {/* Thanh Navbar với 3 route chính là trang chủ, quản lý sinh viên, quản lý kì thi, nút đăng xuất */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{background:"linear-gradient(90deg,#48b1bf,#677ebd)" ,marginBottom:"50px"}}> 
      <img src="https://img.icons8.com/doodle/100/000000/brick.png"></img>
        <Link to="/home" className="navbar-brand" style={{fontWeight:"800", padding:"4px 0px"}}>
        ABCuniversity</Link>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {
              menus.map((m, index) => {
                return <Link className={ classNames('nav-item nav-link', {'activeMenu': window.location.pathname == m.to} ) } 
                  style={{color:"#fff  ", fontWeight:"700", marginRight:"20px", padding:"5px 0px", display: m.display?'block':'none' }} key={index} to={m.to} 
                  onClick={() => this.setState({ isShowMenu: false })}>{m.label}</Link>
              })
            }
          </div>
        </div>
        {/* Chức năng đăng xuất */}
         <UncontrolledDropdown>
              <DropdownToggle nav caret> 
              Adminstration <img src="https://img.icons8.com/ios-filled/50/000000/cat-footprint.png"></img>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <i className="fa fa-cogs" aria-hidden="true"></i>&nbsp;
                  Đổi Mật Khẩu
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={ this.handleLogout}>
                <i className="fa fa-share-square" aria-hidden="true"></i>&nbsp;
                  Đăng Xuất
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>  
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      </div>

    );
  }
}
export default Menu;