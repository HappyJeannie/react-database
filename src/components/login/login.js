import React ,  {Component} from 'react';
import './login.css';

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
          <form>
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
              <span onClick={this.setModalStatus.bind(this)}>没有账号？立即注册</span>
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
      status=[false,true];
    }else{
      status=[false,false];
    }
    this.props.hideToast(e,status);
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
}

export default Login