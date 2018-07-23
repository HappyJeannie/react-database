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
  let {username,password,email} = userInfo;
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  user.setEmail(email);
  return new Promise((resolve,reject)=> {
    user.signUp().then(function (loggedInUser) {
      resolve({
        status:200,
        msg:'注册成功',
        info:loggedInUser.attributes
      })
    }, function (error) {
      let errmsg;
      switch(error.code){
        case 202:
          errmsg={
            status:202,
            msg:'用户名被占用'
          }
        break;
        case 211:
          errmsg={
            status:211,
            msg:'找不到用户'
          }
        break;
        default:
         errmsg={
           status:400,
           msg:'出错啦'
         }
      }
      reject(errmsg)
    });
  })
}

export function signOut(){
  // 登出功能
  return new Promise((resolve,reject) => {
    AV.User.logOut().then((res)=> {
      // 登出成功
      resolve({
        status:200,
        msg:'登出'
      })
    },(error) => {
      // 操作失败
      console.log('操作失败')
    })
  })
}
export function signIn(userInfo){
  let {username,password} = userInfo;
  // 登录功能
  return new Promise((resolve,reject) => {
    AV.User.logIn(username,password).then(function (loggedInUser) {
      resolve({
        status:200,
        msg:'注册成功',
        info:loggedInUser.attributes
      })
    }, function (error) {
      let errmsg;
      switch(error.code){
        case 210:
          errmsg={
            status:210,
            msg:'用户名或密码不匹配'
          }
        break;
        case 211:
          errmsg={
            status:211,
            msg:'找不到用户'
          }
        break;
      }
      reject(errmsg)
    });
  })
}

export function passwordReset(userInfo){
  let {email} = userInfo;
  return new Promise((resolve,reject)=> {
    AV.User.requestPasswordReset(email)
      .then((success)=>{
        console.log('发送成功')
        console.log(success)
        resolve({
          status:200,
          msg:'发送成功，请查看邮箱'
        })
      },
      (error)=> {
        console.log(error.code)
        if(error.code === 205){
          reject({
            status:205,
            msg:'找不到电子邮箱地址对应的用户'
          })
        }else{
          reject({
            status:error.code,
            msg:'出错啦'
          })
        }
      });
  })
}

export function currentUser(){
  return new Promise((resolve,reject) => {
    let currentUser = AV.User.current();
    if(currentUser){
      resolve({
        status:200,
        data:currentUser.attributes,
        msg:'已登录'
      })
    }else{
      resolve({
        status:201,
        msg:'未登录'
      })
    }
  })
}