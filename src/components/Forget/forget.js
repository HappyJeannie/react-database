import React ,  {Component} from 'react';
import './forget.css';
import {passwordReset} from './../leanCloud/leanCloud';

class Forget extends Component{
  constructor(props){
    super(props)
    this.state = {
      formData:{
        email:''
      }
    }
  }
  
  render(){
    return (
      <div className={this.props.status?"modal-login active":"modal-login"}>
        <div className="shadow" onClick={this.setModalStatus.bind(this)}></div>
        <div className="form">
          <h4>忘记密码</h4>
          <form onSubmit={this.passwordReset.bind(this)}>
            <div className="input-group">
              <label>
                <span className="title">邮箱：</span>
                <input type="text" placeholder="请输入注册邮箱" name="email" value={this.state.formData.email} onChange={this.getUserInfo.bind(this)} onBlur={this.checkEmail.bind(this)}/>
              </label>
            </div>
            <div className="input-group submit">
              <span onClick={this.setModalStatus.bind(this)}>登录</span>
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
    if(e.target.name==='email'){
      stateCopy.formData.email = e.target.value;
    }
    this.setState(stateCopy);
  }
  passwordReset(e){
    // 登录
    e.preventDefault();
    let data = this.state.formData;
    passwordReset(data).then((res)=>{
      // 注册成功后直接登录
      console.log(res);
      this.props.onToast(this,res.msg)
      this.props.hideModal(e,[true,false,false]);
      // 发送成功后直接打开登录页
    },(res)=>{
      console.log('出错')
      console.log(res);
      this.props.onToast(this,res.msg);
    }).catch((res) => {
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
}

export default Forget