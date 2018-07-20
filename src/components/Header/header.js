import React , {Component} from 'react';
import './header.css';
import logo from './../../logo.svg';

class Header extends Component{
  render(){
    return (
      <header>
        <div className="logo">
          <span className="logo">
            <img src={logo} className="App-logo" alt="logo" />
          </span>
        </div>
        <div className="user">
          <ul>
            <li>登录</li>
            <li>注册</li>
            {/* <li><span className="icon"></span>yonghu 123</li>
            <li>登出</li> */}
          </ul>
        </div>
      </header>
    )
  }
}

export default Header