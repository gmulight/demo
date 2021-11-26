/**
 * 安全认证
 * 指纹/面容、手势
 */
import LightSdk from 'light-sdk';
import Light from 'light';
import storage from './storage';
import API from "./api";
import Config from '@/config';
import CustTypeService from '@/api/custtype';
import broadcast from '@/api/broadcast';
var storageModule = Light.requireModule('storage'); //缓存
const SAVEKEY = 'S_APP_SPEC_TOKEN';
const VERIFY_TIME = Config.verify.verifyTime; // 1 * 1000 // 切到后台后多长时间再次验证 /秒
const EXPIRE_TIME = Config.verify.expireTime; // 30 * 60 * 10000 // 30分钟
const GL = '手势密码'
const FP = '指纹登录'
const FR = '面容 ID登录'
const LOGIN = 'login/login-app';
let enterBackTime = 0;
var lg;
if (process.env.RUNTIME === "miniapp") {
  lg = __base__;
} else {
  lg = weex;
}
function isLogin (cb) {
  getUserAccount().then((data) => {
    if (data && data.accountNo) {
      cb && cb(true);
    } else {
      cb && cb(false);
    }
  })
}
function httpReq (url, data = "", notValidSucc) {
  return new Promise((resolve, reject) => {
    API.get(url, data, (jsonResult) => {
      if (notValidSucc || jsonResult.successful) {
        resolve(jsonResult);
      } else {
        reject(jsonResult);
      }
    });
  })
}
/**
 * 获取token密钥
 */
function getAppTokenKey () {
  return httpReq("account/login/getAppTokenKey");
}
/**
 * 验证并更换token
 */
function verifyAppToken (handtoken) {
  return httpReq("account/login/verifyAppToken","handtoken=" + handtoken)
}
// 续会话
function resettingExpire () {
  return httpReq("account/account/resettingExpire", "");
}
// app加密
function encryptTokenKey (str, key) {
  return new Promise((resolve) => {
    LightSdk.native.callNative("safe_operation.encryptToken", {
      str: str,
      key: key
    }, (res) => {
      resolve(res.data.result);
    });
  })
}
function concatTokenStr(token) {
  return new Promise((resolve, reject) => {
    storageModule.getItem("clientid", (e) => {
      if (e.data != "undefined") {
        LightSdk.native.getUDID({}, (res) => {
          resolve([e.data, res.data.UDID, token].join('|'))
        });
      } else {
        reject()
      }
    })
  })
}
/**
 * 判断是否超过 EXPIRE_TIME，超过则更换token，不超过则续会话
 */
function resettingExpireOrVerify () {
  return Promise.all([getSafeOperation(), CustTypeService.queryCustType(true)]).then(([data, custResult]) => {
    let timestamp = +new Date;
    if (custResult.successful == false || !(timestamp - data.SAVETIME <= EXPIRE_TIME)) {
      return Promise.all([getAppTokenKey(), concatTokenStr(data.TOKEN)])
      .then(([result, tokenstr]) => {
        return encryptTokenKey(tokenstr, result.tokenkey);
      }).then((res) => {
        return verifyAppToken(res.toUpperCase());
      }).then((result) => {
        storageModule.setItem("clientid", result.clientid, (e) => {
          if (e.result == 'success') {
            saveSafeOperation('TOKEN', result.handtoken)
            .then(() => {
              saveSafeOperation('SAVETIME', +new Date) // 保存当前系统时间
            })
            CustTypeService.saveCustType(result);
            broadcast.send('B_LOGIN', true);
            // LightSdk.native.userlogout(() => {});//刷新我的页面
            var pageRefresh = {isfundListRefresh: true,isHomeRefresh: true,isDiscoverRefresh: true};//用户刷新主页
            storageModule.setItem("pageRefresh",JSON.stringify(pageRefresh));
          }
        });
        return Promise.resolve();
      })
    } else {
      return resettingExpire();
    }
  })
}
/**
 * 获取安全验证是否可用
 * hardwareType: 硬件支持类型：FR-面容、FP-指纹
 * registerEnable: 是否设置了指纹 1-是、0-否
 */
function getSafeStatus (cb) {
  return new Promise((resolve => {
    LightSdk.native.callNative("safe_operation.getSafeStatus", {}, (res) => {
      cb && cb(res.data || {});
      resolve(res.data);
    });
  }))
}
/**
 * 获取用户登录信息
 */
function getUserAccount () {
  // 获取登录用户
  return new Promise((resolve) => {
    storage.get('S_LOGINACCOUNT', data => {
      resolve(data || {})
    })
  })
}
/**
 * 获取缓存
 * @param {String} key 
 */
function getCache(key) { 
  return new Promise((resolve) => {
    storage.get(key, data => {
      resolve(data)
    })
  })
}
/**
 * 保存用户安全认证情况
 * @param {String} type 保存的字段
 * @param {String} value 保存的值
 */
function saveSafeOperation (type, value) {
  return Promise.all([getUserAccount(), getCache(SAVEKEY)])
  .then(([loginInfo, data]) => {
    let userflag = loginInfo.accountNo;// loginInfo.mobile ? loginInfo.mobile : loginInfo.accountNo;
    if (!data) data = {}
    if (!data[userflag]) data[userflag] = {}
    data[userflag][type] = value;
    return new Promise((rv) => {
      storage.put(SAVEKEY, data, () => {
        rv();
      });
    });
  })
}
/**
 * 获取用户安全认证情况
 */
function getSafeOperation () {
  return Promise.all([getUserAccount(), getCache(SAVEKEY)])
  .then(([loginInfo, data]) => {
    let userData = {}
    if (data) {
      // if (loginInfo.mobile && (data[loginInfo.mobile])) {
      //   userData = data[loginInfo.mobile];
      //   // if (loginInfo.accountNo) { // 同步 证件号码记录
      //   //   data[loginInfo.accountNo] = data[loginInfo.mobile]; 
      //   //   storage.put(SAVEKEY, data); // 保存
      //   // }
      // } else 
      if (loginInfo.accountNo && data[loginInfo.accountNo]){
        // if (loginInfo.mobile) { // 同步 证件号码记录
        //   data[loginInfo.mobile] = data[loginInfo.accountNo]; 
        //   storage.put(SAVEKEY, data); // 保存
        // }
        userData = data[loginInfo.accountNo];
      }
    }
    return Promise.resolve(userData);
  });
}
/**
 * 调用原生方法弹出原生界面
 * @param {Object} option 
 * welcomeInfo: 显示的欢迎信息
 * verifyType: 验证类型: GL-手势、FP-指纹或面容、FPGL-指纹加手势(仅用于验证)
 * operationType: 操作类型：verify、set、update、close
 * avatar: 头像 base64-用户头像
 */
function callNative (option) {
  return getUserAccount()
  .then((loginInfo) => {
    if (option && !option.welcomeInfo) {
      let custName = loginInfo.custName || loginInfo.mobile.replace(/^(\d{3})(\d{4})(\d{4})/, '$1****$3')
      option.welcomeInfo = `尊敬的用户，您好` // ${custName}
    }
    return new Promise((resolve) => {
      LightSdk.native.callNative("safe_operation.verifyOpeation", option, (res) => {
        resolve(res.data)
      });
    })
  })
}
/**
 * 手势
 * @param {String} operationType 
 * @param {Function} cb 
 */
function showGesture (operationType, cb) {
  let option
  if (typeof operationType == 'string') {
    option = { operationType }
  } else {
    option = operationType;
  }
  getSafeOperation().then((data) => {
    let glock = data ? data.GLPSW : null;
    callNative({
      verifyType: 'GL', gestureLock: glock, ...option
    }).then((res) => {
      if (res.result == 'success') {
        if (option.operationType != 'update') {
          let isSet = option.operationType == 'set';
          saveSafeOperation('GL', isSet).then(() => {
            let GLPsw = isSet ? res.gestureLock : '';
            return saveSafeOperation('GLPSW', GLPsw);
          }).then(() => {
            cb && cb(res);
          })
        } else {
          saveSafeOperation('GLPSW', res.gestureLock).then(() => {
            cb && cb(res);
          })
        }
      } else if (res.result == 'fail') {
        // 验证失败
        triggerLogout();
        saveSafeOperation('GL', false); // 清除 手势
        cb && cb(res);
      } else {
        cb && cb(res);
      }
    })
  })
}
/**
 * toast形式显示提示信息
 * @param {String} message 提示信息
 * @param {Boolean} isFR 是否是面容识别
 */
function showTip (message, isFR) {
  let delaytime = 0;
  if (isFR) {
    delaytime = 1000;
  }
  setTimeout(() => { // 面容延迟弹出以避免被原生遮挡
    Light.requireModule('modal').toast({
      message: message,
      duration: 0.5
    });
  }, delaytime);
}
/**
 * 开启指纹/手势
 * @param {String} typeStr 开启类型
 */
function setSafeOperation (typeStr) {
  Light.requireModule('modal').confirm({
    message: `是否开启${typeStr}`,
    okTitle: '开启',
    cancelTitle: '取消'
  }, (value) => {
    if (value == '开启') {
      if (typeStr == GL) {
        showGesture('set', (res) => {
          if (res.result == 'success') {
            showTip(`${typeStr}开启成功`);
          }
          // $.route.backToIndex(0);
        });
      } else {
        callNative({
          verifyType: 'FP', operationType: 'set'
        }).then((res) => {
          if (res.result == 'success') {
            saveSafeOperation('FP', true)
            .then(() => {
              showTip(`${typeStr}开启成功`, typeStr == FR);
            })
          }
        });
      }
    }
  })
}
/**
 * 登录后检验用户是否开启指纹、手势
 */
function afterLoginVerify () {
  return getCache('S_NOTIFYFPGL').then((data) =>{
    if (data) {
      storage.remove('S_NOTIFYFPGL');
      return Promise.all([getSafeOperation(), getSafeStatus()])
    }
    return Promise.reject();
  }).then(([data, status]) => {
    if (data.FP && status.registerEnable != '1') {
      data.FP = false;
      saveSafeOperation('FP', false);
    }
    if (!data.FP && !data.GL) {
      let typeStr;
      if (status.hardwareType && status.registerEnable == '1') {
        typeStr = (status.hardwareType == 'FR' ? FR : FP);
      } else {
        typeStr = GL
      }
      return Promise.resolve(typeStr);
    } else {
      return Promise.reject();
    }
  }).then((typeStr) => {
    setSafeOperation(typeStr);
  }).catch(() => {})
}
/**
 * 退出登录
 */
function triggerLogout () {
  // storage.put('S_CLIENTID', '', () => {
  //   $.fund.removeCache(true);
    broadcast.send('B_LOGIN', false);
  //   $.http.req("account/login/logout")
  // }); // 清空 clientid
}
/**
 * 切换到后台后进行验证
 */
function verify (viewParam = {}, force = false, next) {
  storage.get('S_SAFE_NEEDVERIFY', (data) => {
    if (data == '1' || force) {
      isLogin((isLogin) => {
        if (isLogin) {
          Promise.all([getSafeOperation(), getSafeStatus()])
          .then(([data, status]) => {
            if (!data.FP && !data.GL) { 
              storage.put('S_SAFE_NEEDVERIFY', '0');
              next && next();
              return; 
            }
            // 只开启了指纹/面容，但是系统中没有录入指纹/面容
            if (data.FP && !data.GL && status.registerEnable != '1') {
              let typeStr = (status.hardwareType == 'FR' ? FR : FP);
              // 退出登录
              Light.requireModule('modal').toast({
                message: `${typeStr}不可用，请重新登录`
              });
              storage.put('S_SAFE_NEEDVERIFY', '0'); 
              saveSafeOperation('FP', false); // 清除 指纹
              triggerLogout();
              API.route.hsOpen(LOGIN, {backToRoot: '1'}, {disableSwipeGestureBack: true});
            } else {
              if (data.FP && status.registerEnable != '1') {
                data.FP = false;
                saveSafeOperation('FP', false);
              }
              callNative({
                verifyType: (data.FP && status.registerEnable == '1' ? 'FP' : '') + (data.GL? 'GL' : ''),
                operationType: 'verify',
                gestureLock: data.GLPSW || null
              }).then((res) => {
                // 忘记手势或失败超过最大次数
                storage.put('S_SAFE_NEEDVERIFY', '0'); 
                if (res.result == 'success') {
                  resettingExpireOrVerify().then(() => {
                    let delaytime = 0;
                    if (viewParam && viewParam.view && viewParam.view != LOGIN) {
                      let {view, options, param } = viewParam;
                      API.route.hsOpen(view, param, options)
                      delaytime = 100;
                    }
                    setTimeout(() => {
                      LightSdk.native.callNative("safe_operation.verifyClose", {}, (res) => {});
                    }, delaytime)
                  }).catch((e) => {
                    Light.requireModule('modal').toast({
                      message: `登录失败，请验证密码登录`
                    });
                    if (viewParam && viewParam.view && viewParam.view != LOGIN) {
                      let {view, options, param } = viewParam;
                      API.route.hsOpen(LOGIN, {
                        $target: view,
                        ...param,
                        $options:encodeURIComponent(JSON.stringify(options)),
                        backToRoot: '1', forceLogin: true
                      }, {disableSwipeGestureBack: true})
                    } else {
                      API.route.hsOpen(LOGIN, {backToRoot: '1', forceLogin: true}, {disableSwipeGestureBack: true});
                    }
                    setTimeout(() => {
                      LightSdk.native.callNative("safe_operation.verifyClose", {}, (res) => {});
                    }, 200)
                  })
                } else if (res.result == 'forget' || res.result == 'fail') {
                  triggerLogout();
                  saveSafeOperation('GL', false); // 清除 手势
                  API.route.hsOpen(LOGIN, {backToRoot: '1', forceLogin: true}, {disableSwipeGestureBack: true});
                  setTimeout(() => {
                    LightSdk.native.callNative("safe_operation.verifyClose", {}, (res) => {});
                  }, 200)
                } else if (res.result == 'password' || res.result == 'verifypsw'){
                  triggerLogout();
                  API.route.hsOpen(LOGIN, {backToRoot: '1', forceLogin: true}, {disableSwipeGestureBack: true});
                  setTimeout(() => {
                    LightSdk.native.callNative("safe_operation.verifyClose", {}, (res) => {});
                  }, 200)
                } else {
                  // Light.requireModule('modal').alert({
                  //   message: JSON.stringify(res)
                  // })
                }
              })
            }
          })
        } else {
          storage.put('S_SAFE_NEEDVERIFY', '0');
          next && next();
        }
      })
    }
  });
}
/**
 * 第一次进入app初始化
 */
function firstPreVerify () {
  if (lg.config.env.platform != 'Web' && (Config.verify.fingerprint.enable || Config.verify.gesture.enable)) {
    isFirstEnterApp(() => {
      getSafeOperation().then((data) => {
        if (data.FP || data.GL) { 
          storage.put('S_SAFE_NEEDVERIFY', '1');
        }
      });
      // verify();
      Light.requireModule("globalEvent").addEventListener('AppDidEnterBackground',() => {//app 唤醒
        // App进入后台
        enterBackTime = +new Date;
      });
      Light.requireModule("globalEvent").addEventListener('AppWillEnterForeground',() => {//app 唤醒
        getSafeOperation().then((data) => {
          if (!data.FP && !data.GL) { 
            storage.put('S_SAFE_NEEDVERIFY', '0'); 
            return; 
          } else {
            let nowTime = +new Date;
            if (nowTime - enterBackTime > VERIFY_TIME) {
              LightSdk.native.getCurrentPages({}, (res) => {
                let view = res.data[res.data.length - 1].url;
                let role;
                let VisitConfig = Config.visitConfig;
                if (typeof VisitConfig[view] === 'undefined') {
                  Object.keys(VisitConfig).forEach(key => {
                    if (new RegExp(key).test(view)) {
                      role = VisitConfig[key]
                    }
                  })
                } else {
                  role = VisitConfig[view]
                }
                storage.put('S_SAFE_NEEDVERIFY', '1');
                // 如果当前页面需要登录，立即验证
                if (typeof role !== 'undefined') {
                  verify();
                }
              })
            }
          }
        })
      });
    })
  }
}
/**
 * 在4个tab页初始化，用于登录返回后引导开启指纹/手势
 */
function loginPreVerify() {
  if (lg.config.env.platform != 'Web' && ((Config.verify.fingerprint.enable || Config.verify.gesture.enable))) {
    Light.on('viewappear', () => {
      afterLoginVerify();
    });
  }
}
/**
 * 保存登录信息
 */
function saveLoginInfo (accountType, accountNo, jsonResult) {
  storage.put("S_LOGINACCOUNT", {
    custName: jsonResult.custname,
    accountType: accountType,
    accountNo: accountNo,
    mobile: jsonResult.mobile
  }, 'local', () => {
    saveSafeOperation('TOKEN', jsonResult.handtoken)
    .then(() => {
      saveSafeOperation('SAVETIME', +new Date) // 保存当前系统时间
    })
  })
}
function saveLoginInfoAfterRegister (mobile, isBind, jsonResult) {
  storage.get('S_LOGINACCOUNT', (data) => {
    if (false == isBind || !data) {
      data = {};
      data.accountNo = mobile;
      data.accountType = '0';
    }
      data.mobile = mobile;
    storage.put('S_LOGINACCOUNT', data, 'local');
    if (!isBind && lg.config.env.platform != 'Web') {
      saveSafeOperation('TOKEN', jsonResult.handtoken)
      .then(() => {
        saveSafeOperation('SAVETIME', +new Date) // 保存当前系统时间
      })
    }
  }, 'local');
}
function removeLoginInfo () {
  storage.put("S_LOGINACCOUNT", {}, 'local');
}
function notifyOpen () {
  if (lg.config.env.platform != 'Web' && (Config.verify.fingerprint.enable || Config.verify.gesture.enable)) {
    storage.put('S_NOTIFYFPGL', true); // 需要提示用户开启指纹/手势
  }
}
/**
 * 用来获取是否是第一次打开app
 */
function isFirstEnterApp(cb) {
  LightSdk.native.callNative('user.getInfo', {}, (info) => {
    if (info.data.result.uid != "") {
      // 非空不是第一次
      // cb && cb(false);
    } else {
      // 第一次进入设置uid，并在退出app后删除
      LightSdk.native.callNative('user.setInfo', {uid: '1',logoutWhenExit: true}, (info) => {
        cb && cb(true);
      })
    }
  })
}
function toSetting () {
  LightSdk.native.callNative("safe_operation.toSetting", {}, (res) => {
  });
}
function saveCustType (result) {
  CustTypeService.saveCustType(result);
}
export default {  
  getSafeStatus,
  saveSafeOperation,
  getSafeOperation,
  callNative,
  firstPreVerify,
  loginPreVerify,
  verify,
  showGesture,
  showTip,
  saveLoginInfo,
  saveLoginInfoAfterRegister,
  removeLoginInfo,
  toSetting,
  notifyOpen,
  saveCustType
}