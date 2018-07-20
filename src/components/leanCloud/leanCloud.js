import AV from 'leancloud-storage'
import AVData from './leancloud-config';
const { Query, User } = AV;
var APP_ID = AVData.APP_ID;
var APP_KEY = AVData.APP_KEY;

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


export default AV;  