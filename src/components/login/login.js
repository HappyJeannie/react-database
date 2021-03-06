import React ,  {Component} from 'react';
import './login.css';
import {signIn} from './../leanCloud/leanCloud';

class Login extends Component{
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
      <div className={this.props.status?"modal-login active":"modal-login"}>
        <div className="shadow" onClick={this.setModalStatus.bind(this)}></div>
        <div className="form">
          <h4>登录</h4>
          <form onSubmit={this.signIn.bind(this)}>
            <div className="input-group">
              <label>
                <span className="title">用户名：</span>
                <input type="text" placeholder="请输入用户名" name="username" value={this.state.formData.username} onChange={this.getUserInfo.bind(this)} onBlur={this.checkUsername.bind(this)}/>
              </label>
            </div>
            <div className="input-group">
              <label>
                <span className="title">密码：</span>
                <input type="password" placeholder="请输入密码" name="password" value={this.state.formData.password}  onChange={this.getUserInfo.bind(this)} onBlur={this.checkPassword.bind(this)}/>
              </label>
            </div>
            <div className="input-group submit">
              <span onClick={this.setModalStatus.bind(this)}>没有账号？立即注册</span>
              <span onClick={this.setModalStatus.bind(this)}>忘记密码</span>
              <button>确定</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  setModalStatus(e){
    let status;
    if(e.target.innerText.indexOf('注册') !== -1){
      status=[false,true,false];
    }else if(e.target.innerText.indexOf('忘记') !== -1){
      status=[false,false,true];
    }else{
      status=[false,false,false];
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
  signIn(e){
    // 登录
    e.preventDefault();
    let data = this.state.formData;
    signIn(data).then((res)=>{
      // 注册成功后直接登录
      this.props.registSuccess(this,{'username':res.info.username,'isLogin':true})
      this.props.onToast(this,'登录成功')
    },(res)=>{
      console.log('出错')
      console.log(res);
      this.props.onToast(this,res.msg);
    }).catch((res) => {
    })
  }
  checkUsername(e){
    // 验证用户名
    let data = this.state.formData;
    if(data.username.length <4){
      this.props.onToast(this,'用户名至少4个字符')
      e.target.focus();
      return false;
    }
  }
  checkPassword(e){
    // 密码
    let data = this.state.formData;
    if(data.password.length < 6){
      this.props.onToast(this,'密码至少6个字符')
      e.target.focus();
      return false;
    }
  }
}

export default Login