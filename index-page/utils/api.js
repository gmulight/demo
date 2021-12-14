import axios from 'axios'
const qs = require('qs') // for application/x-www-form-urlencoded

const axiosBase = axios.create({
  baseURL: "http://10.26.210.114:8080/qhzx-front",
  withCredentials: true,
  headers: {
    // access_token: store.getters.url.accessToken
  }
})

function execute(method, func, params, options, type, apitype) {
  let config = {
    method: method,
    headers: {}
  }
  if (method === 'post') {
    config.data = qs.stringify(params)
  } else if (method === 'get') {
    config.params = params
  }
  let FUC = axiosBase(func, config)

  return FUC
}

const API = {
  getNews: function() {
    let params = {
      modelId: "110000",
      pageNo: 0,
      pageSize: 10,
      channel: "tzyjhyqh"
    }
    return execute('post', '/model/getBannerList', params, {}).then(res => {
      console.log(res)
      return res
    })
    // let url = "https://zixun.hsmdb.com/qhzxduoqudao-front/model/getModelNews"
    // return new Promise((resolve,reject) => {
    //   window.jsonCallBack =(result) => {
    //       resolve(result)
    //   }
    //   var JSONP=document.createElement("script");
    //   JSONP.type="text/javascript";
    //   JSONP.src=`${url}&callback=jsonCallBack`;
    //   document.getElementsByTagName("head")[0].appendChild(JSONP);
    //   setTimeout(() => {
    //       document.getElementsByTagName("head")[0].removeChild(JSONP)
    //   },500)
  }
}

export default API