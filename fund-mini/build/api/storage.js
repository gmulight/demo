import LightSDK from 'light-sdk';
const LOCAL = 'local'
const DEFAULT_TYPE = 'session'
var lg;
if (process.env.RUNTIME === "miniapp") {
  lg = __base__;
} else {
  lg = weex;
}
const platform = lg.config.env.platform.toLowerCase()
export default {
  put (key, value, option, callback) {
    let type = DEFAULT_TYPE
    let time
    if (typeof option === 'object') {
      type = option.type
      time = option.time
    } else if (typeof option === 'string') {
      type = option
    } else if (typeof option === 'number') {
      time = option
    } else if (typeof option === 'function') {
      callback = option
    }
    let expiredtime = ''
    if (time) {
      let d = new Date()
      d.setTime(d.getTime() + time * 1000)
      expiredtime = d.getTime()
    }
    let item = {value, expiredtime}
    if (platform !== 'web' || type === LOCAL) {
      LightSDK.native.writeData({key: key, value: JSON.stringify(item)}, function (r) {
        callback && callback(r)
      })
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(item))
      callback && callback(true)
    }
  },
  get (key, option, callback) {
    let type = DEFAULT_TYPE
    if (typeof option === 'string') {
      type = option
    } else if (typeof option === 'function') {
      callback = option
    }
    const _getItem = (result) => {
      let jsonobj = null
      if (typeof result === 'undefined') result = null
      else {
        try {
          if (typeof result == "object") {
            jsonobj = result;
          } else {
            jsonobj = JSON.parse(result)
          }
        } catch (e) {
          console.error('json parse error', e)
        }
      }
      let returnValue = null
      let expired = false
      if (jsonobj && jsonobj.value) {
        let expiredMs = new Date().getTime() - jsonobj.expiredtime
        if (jsonobj.expiredtime && expiredMs >= 0) {
          // this.remove(key, type)
          expired = true
        }
        returnValue = jsonobj.value
      }
      callback && callback(returnValue, expired)
    }
    var result;
    if (platform !== 'web' || type === LOCAL) {
      LightSDK.native.readData({key: key}, function (r) {
        result = r.data || {}
        _getItem(result.result)
      });
    } else {
      result = window.sessionStorage.getItem(key)
      _getItem(result)
    }
  },
  remove (key, option, callback) {
    let type = DEFAULT_TYPE
    if (typeof option === 'string') {
      type = option
    } else if (typeof option === 'function') {
      callback = option
    }
    if (platform !== 'web' || type === LOCAL) {
      LightSDK.native.deleteData({key: key}, function (r) {
        callback && callback(r)
      })
    } else {
      window.sessionStorage.removeItem(key)
      callback && callback(true)
    }
  }
}
