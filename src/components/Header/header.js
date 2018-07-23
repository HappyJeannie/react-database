import React , {Component} from 'react';
import './header.css';
import logo from './../../logo.svg';
import {signOut} from './../leanCloud/leanCloud';

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
          <ul className={this.props.userStatus.isLogin?"":"login"} >
            <li onClick={this.setModalStatus.bind(this)}>登录</li>
            <li onClick={this.setModalStatus.bind(this)}>注册</li>
          </ul>
          <ul className={this.props.userStatus.isLogin?"login":""} >
            <li><span className="icon"></span>{this.props.userStatus.username}</li>
            <li onClick={this.singOut.bind(this)}>登出</li>
          </ul>
        </div>
      </header>
    )
  }
  setModalStatus(e){
    let status;
    if(e.target.innerText.indexOf('登录') !== -1){
      status = [true,false]
    }else{
      status = [false,true]
    }
    this.props.hideModal(e,status);
  }
  singOut(){
    signOut().then((res) => {
      this.props.signOut(this,{'username':'','isLogin':false})
      this.props.onToast(this,res.msg)
    })
  }
}

export default Header