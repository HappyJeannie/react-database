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

export function signUp(userInfo,success,error){
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
      resolve({
        status:400,
        msg:'用户名被占用'
      })
    });
  })
  
}