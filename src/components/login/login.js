import React ,  {Component} from 'react';
import './login.css';

class Login extends Component{
  render(){
    return (
      <div className="modal-login">
        <div className="shadow"></div>
        <div className="form">
          <h4>登录</h4>
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
              <button>确定</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login