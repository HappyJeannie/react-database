import React ,  {Component} from 'react';
import './register.css';
import {signUp} from './../leanCloud/leanCloud';

class Register extends Component{
  constructor(props){
    super(props)
    this.state = {
      formData:{
        username:'',
        password:''
      }
    }
  }
  render(){
    return (
      <div className={this.props.status?"modal-regist active":"modal-regist"}>
        <div className="shadow" onClick={this.setModalStatus.bind(this)}></div>
        <div className="form">
          <h4>新用户注册</h4>
          <form onSubmit={this.signUp.bind(this)}>
          <div className="input-group">
              <label>
                <span className="title">用户名：</span>
                <input type="text" placeholder="请输入用户名" name="username" value={this.state.formData.username} onChange={this.getUserInfo.bind(this)}/>
              </label>
            </div>
            <div className="input-group">
              <label>
                <span className="title">密码：</span>
                <input type="password" placeholder="请输入密码" name="password" value={this.state.formData.password}  onChange={this.getUserInfo.bind(this)}/>
              </label>
            </div>
            <div className="input-group submit">
              <span onClick={this.setModalStatus.bind(this)}>已有账号，立即登录</span>
              <button>确定</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  setModalStatus(e){
    let status;
    if(e.target.innerText.indexOf('登录') !== -1){
      status=[true,false];
    }else{
      status=[false,false];
    }
    this.props.hideModal(e,status);
  }
  getUserInfo(e){
    // 获取用户名和密码
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    if(e.target.type==='password'){
      stateCopy.formData.password = e.target.value;
    }else{
      stateCopy.formData.username = e.target.value;
    }
    this.setState(stateCopy);
  }
  signUp(e){
    // 提交表单
    e.preventDefault();
    let data = this.state.formData;
    signUp(data).then((res)=>{
      // 注册成功后直接登录
      this.props.registSuccess(this,{'username':res.info.username,'isLogin':true})
    },(res)=>{
      console.log('出错')
    }).catch((res) => {
      console.log('catch')
    })
  }
}

export default Register