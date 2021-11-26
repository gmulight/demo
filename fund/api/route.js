import Light from 'light';
import LightSDK from 'light-sdk';
import CustTypeService from '@/api/custtype';
import config from '@/config';
// import SafeOperation from '@/api/safe-operation';
import storage from '@/api/storage';
import api from './api';
var lg;
if (process.env.RUNTIME === "miniapp") {
  lg = __base__;
} else {
  lg = weex;
}
const VisitConfig = config.visitConfig;
const LOGIN = 'login/login-app';
export default {
  hsOpenIntercept (viewParam, next) {
    let { view, param, options } = viewParam;
    // 登录拦截判断
    let role;
    if (typeof VisitConfig[view] === 'undefined') {
      Object.keys(VisitConfig).forEach(key => {
        if (new RegExp(key).test(view)) {
          role = VisitConfig[key]
        }
      })
    } else {
      role = VisitConfig[view]
    }
    if (typeof role !== 'undefined') {
      // 需要登录，判断是否已登录
      storage.get('S_SAFE_NEEDVERIFY', (data) => {
        if (data == '1') {
          // SafeOperation.verify(viewParam);
        } else {
          CustTypeService.queryCustType().then((data) => {
            if (data && data.custtypes && data.custtypes.length > 0) {
              // 已登录
              next(view, param, options)
            } else {
              // SafeOperation.verify(viewParam, true, () => {
              //   // 未登录，重定向到登录
              //   next(LOGIN, {
              //     $target: view,
              //     ...param,
              //     $options:encodeURIComponent(JSON.stringify(options))
              //   }, {})
              // });
            }
          })
        }
      });
    } else {
      if (view == LOGIN && !(param && param.forceLogin)) {
        // SafeOperation.verify(viewParam, true, () => {
        //   // 未登录，重定向到登录
        //   next(LOGIN, {
        //     ...param,
        //     $options:encodeURIComponent(JSON.stringify(options))
        //   }, {})
        // });
      } else {
        // weex.requireModule('modal').alert({
        //   message: JSON.stringify(viewParam)
        // })
        next(view, param, options)
      }
    }
  },
  hsOpen (view, param, options) {
//	view = view.replace(/#/g, "");
  	if(view.indexOf("http") == 0 || view.indexOf("https") == 0 || view.indexOf("www") == 0) {
  		api.openWebPage(view);
  		return false;
  	}
    this.hsOpenIntercept({
      view, param, options
    }, (v, p, opt) => {
      let realParam2 = {
        headHidden: true, // 默认 隐藏导航栏
        ...opt
      };
      if (lg.config.env.platform != "Web" && realParam2.replace === true) {
        realParam2.replace = false;
      }
      Light.navigate(v, p || {}, realParam2);
    })
  },
  hsBack (step) {
    var number = {number: "1"}
    if (step) {
      number.number = String(step);
    }
    LightSDK.native.back(number);
  },
  hsOpenAndCloseSelf (view, param, options) {
    this.hsOpen(view, param, {
      ...options,
      replace: true,
      history: false
    });
  }
}