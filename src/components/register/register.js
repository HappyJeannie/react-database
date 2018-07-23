import React ,  {Component} from 'react';
import './register.css';
import {signUp} from './../leanCloud/leanCloud';

class Register extends Component{
  constructor(props){
    super(props)
    this.state = {
      formData:{
        username:'',
        password:'',
        email:''
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
                <span className="title">邮箱：</span>
                <input type="email" placeholder="请输入邮箱" name="email" value={this.state.formData.email} onChange={this.getUserInfo.bind(this)} onBlur={this.checkEmail.bind(this)}/>
              </label>
            </div>
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
      status=[true,false,false];
    }else{
      status=[false,false,false];
    }
    this.props.hideModal(e,status);
  }
  getUserInfo(e){
    // 获取用户名和密码
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    if(e.target.name==='password'){
      stateCopy.formData.password = e.target.value;
    }else if(e.target.name==='email'){
      stateCopy.formData.email = e.target.value;
    }else if(e.target.name==='username'){
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
      this.props.onToast(this,'注册成功')
      this.resetForm();
    },(res)=>{
      console.log('出错')
    }).catch((res) => {
      console.log('catch')
    })
  }
  checkEmail(e){
    // 验证邮箱格式
    let data = this.state.formData;
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
    if(!reg.test(data.email)){
      this.props.onToast(this,'邮箱格式不正确')
      e.target.focus();
      return false;
    }
  }
  resetForm(){
    let data = JSON.parse(JSON.stringify(this.state.formData))
    for(var i in data){
      data[i] = '';
    }
    this.setState({
      formData:data
    });
  }
}

export default Register