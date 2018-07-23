import AV from 'leancloud-storage'
import AVData from './leancloud-config';
//const { Query, User } = AV;
var APP_ID = AVData.APP_ID;
var APP_KEY = AVData.APP_KEY;

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


export default AV;  

export function signUp(userInfo){
  // 注册功能
  // 新建 AVUser 对象实例
  let user = new AV.User();
  // 设置用户名
  user.setUsername(userInfo.username);
  // 设置密码
  user.setPassword(userInfo.password);
  return new Promise((resolve,reject)=> {
    user.signUp().then(function (loggedInUser) {
      resolve({
        status:200,
        msg:'注册成功',
        info:loggedInUser.attributes
      })
    }, function (error) {
      console.log(error);
      reject({
        status:400,
        msg:'用户名被占用'
      })
    });
  })
}

export function signOut(){
  // 登出功能
  return new Promise((resolve,reject) => {
    AV.User.logOut().then((res)=> {
      // 登出成功
      console.log('登出成功')
      console.log(res)
      resolve({
        status:200,
        msg:'登出'
      })
    },(error) => {
      // 操作失败
      console.log('操作失败')
      console.log(error)
    })
  })
}
export function signIn(userInfo){
  let {username,password} = userInfo;
  // 登出功能
  return new Promise((resolve,reject) => {
    AV.User.logIn(username,password).then(function (loggedInUser) {
      console.log('登录成功')
      console.log(loggedInUser)
      resolve({
        status:200,
        msg:'注册成功',
        info:loggedInUser.attributes
      })
    }, function (error) {
      console.log(error);
      reject({
        status:400,
        msg:'用户名或秘密错误'
      })
    });
  })
}