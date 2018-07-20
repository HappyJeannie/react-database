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
      </header>
    )
  }
}

export default Header