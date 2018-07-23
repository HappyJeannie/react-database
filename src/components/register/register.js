import React ,  {Component} from 'react';
import './register.css';

class Register extends Component{
  render(){
    return (
      <div className={this.props.status?"modal-regist active":"modal-regist"}>
        <div className="shadow" onClick={this.setModalStatus.bind(this)}></div>
        <div className="form">
          <h4>新用户注册</h4>
          <form>
            <div className="input-group">
              <label>
                <span className="title">邮箱：</span>
                <input type="text" placeholder="请输入邮箱" name="email" />
              </label>
            </div>
            <div className="input-group">
              <label>
                <span className="title">用户名：</span>
                <input type="text" placeholder="请输入用户名" name="username" />
              </label>
            </div>
            <div className="input-group">
              <label>
                <span className="title">密码：</span>
                <input type="password" placeholder="请输入密码" name="password" />
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
    if(e.target.innerText.indexOf('登录') != -1){
      status=[true,false];
    }else{
      status=[false,false];
    }
    this.props.hideToast(e,status);
  }
}

export default Register