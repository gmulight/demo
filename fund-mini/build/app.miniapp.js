/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 3 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"pages":["pages/home/home","pages/discover/discover","pages/setting/setting","pages/fund-list/fund-list","pages/fund/fund","pages/managerchange/managerchange","pages/rule/rule","pages/file/file"],"window":{"backgroundTextStyle":"light","navigationBarBackgroundColor":"#ffffff","navigationBarTitleText":"Light MiniAPP","navigationBarTextStyle":"black"},"tabBar":{"color":"#dddddd","selectedColor":"#3989FD","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/home","iconPath":"images/bottom-i1.png","selectedIconPath":"images/bottom-i1-1.png","text":"首页"},{"pagePath":"pages/discover/discover","iconPath":"images/bottom-i2.png","selectedIconPath":"images/bottom-i2-1.png","text":"精选"},{"pagePath":"pages/fund-list/fund-list","iconPath":"images/bottom-i3.png","selectedIconPath":"images/bottom-i3-1.png","text":"基金"},{"pagePath":"pages/setting/setting","iconPath":"images/bottom-i4.png","selectedIconPath":"images/bottom-i4-1.png","text":"我的"}]},"style":"v2","sitemapLocation":"sitemap.json"}');

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


try {
  App;
} catch (e) {
  __webpack_require__.g.__thread__.triggerEvent = function (type, params) {
    var path = params.path,
        pageId = params.pageId;

    if (type === "navigate") {
      var patch = "\n      let el = document.createElement('div');\n      el.innerHTML = `<style type=\"text/css\">\n      .popup {\n        font-size:5.5vw;\n        height:100%;\n        text-align: center\n      }\n      .popup-overlay {\n        color: #ccc;\n        background: rgb(255, 255, 255);\n        position: absolute;\n        left: 0;\n        right: 0;\n        top: 20%;\n        bottom: 0;\n        margin: 0 7%\n      }\n    </style>\n    <div id=\"popup_default\" class=\"popup\">\n      <div class=\"popup-overlay\">\n      \u5C0A\u656C\u7684\u7528\u6237\uFF0C\u60A8\u7684\u5E94\u7528\u7248\u672C\u8FC7\u4F4E\uFF0C\u65E0\u6CD5\u6253\u5F00\u9875\u9762\uFF0C\u8BF7\u5347\u7EA7\u5E94\u7528\n      </div>\n    </div>`;\n      document.body.insertAdjacentElement('afterbegin', el);\n      ";

      __base__.postPatch(patch, pageId);
    }
  };
}

/***/ }),
/* 5 */
/***/ (() => {

"use strict";


//app.js
// __base__.DEBUG_MODE = true;
// __base__.DEBUG_SHOW_NETWORK_INFO = true;
App({
  onLaunch: function onLaunch(options) {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    this.globalData.queryParams = options.query; // 登录

    wx.login({
      success: function success(res) {// 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }); // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    queryParams: null
  }
});

/***/ }),
/* 6 */
/***/ ((module) => {


  var components = {};
  ;
      module.exports = {
        render:new Function("this.$this=this;with(this){return _c('wx-view',{staticClass:\"data-v-9d5cbe\",class:_processClassBinding([])},[_c('wx-view',{staticStyle:{\"background-color\":\"#f0eff4\"}},[_c('wx-view',{staticStyle:{\"height\":\"17.786666666666665rem\"},attrs:{\"scroll-y\":\"true\"},on:{\"scroll\":function($event){return $this['scroll'].apply(null, arguments)}}},[_c('wx-view',[_c('wx-swiper',{staticClass:\"swiper-wrap\",class:_processClassBinding([]),attrs:{\"autoplay\":true,\"circular\":true,\"interval\":3000,\"duration\":1000}},[_l((imageList),function(item,index){return [_c('wx-swiper-item',[_c('wx-image',{staticStyle:{\"width\":\"100%\",\"height\":\"100%\"},attrs:{\"src\":item.src}})],1)]})],2)],1),_v(\" \"),_c('wx-view',{staticClass:\"nav-box flex-row align-center\",class:_processClassBinding([])},_l((navList),function(nav,index){return _c('wx-view',{staticClass:\"flex flex-1 align-center flex-column\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"nav-icon\",class:_processClassBinding([]),attrs:{\"src\":nav.iconFilename}}),_v(\" \"),_c('wx-text',{staticClass:\"font-14 m-color-1\",class:_processClassBinding([])},[_v(_s(nav.title))])],1)}),1),_v(\" \"),_c('wx-view',{staticClass:\"hot-box flex-column mt15\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-head flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"home-icon\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/home-i3.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-14 m-color-1 font-bold ml10\",class:_processClassBinding([])},[_v(_s(hotName))]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-1 align-end flex-column\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-6\",class:_processClassBinding([])},[_v(\"更多\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-other\",class:_processClassBinding([])})],1),_v(\" \"),_l((hotList),function(item,index){return (index < 5)?_c('wx-view',{staticClass:\"cellhot justify-center\",class:_processClassBinding([]),on:{\"tap\":function($event){return $this['bindViewTap'].apply(null, arguments)}}},[_c('wx-view',{staticClass:\"hot-line flex-column\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-row mb10 align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-left align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-22 \",class:_processClassBinding([_s(item.rate < 0? 'm-color-green' : 'm-color-red'),])},[_v(_s(item.rate)+_s(item.unit))])],1),_v(\" \"),_c('wx-view',{staticClass:\"pl35\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-16 m-color-1\",class:_processClassBinding([])},[_v(_s(item.title))])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-left align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-12 m-color-9\",class:_processClassBinding([])},[_v(_s(item.mobileShowIncInterval))])],1),_v(\" \"),_c('wx-view',{staticClass:\"pl35\",class:_processClassBinding([])},_l((item.fundinfo.tags),function(tag,i){return _c('wx-text',{staticClass:\"font-12 m-color-9\",class:_processClassBinding([])},[_v(_s(i==0? '':' I ')+_s(tag))])}),1)],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"lineColumn-hot\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',{staticClass:\"line-hot\",class:_processClassBinding([])}),_v(\" \"),(hotIcon && index < 3)?_c('wx-image',{staticClass:\"hot-icon\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/hot-i\"+_s(index)+\".png\"}}):_e()],1):_e()})],2),_v(\" \"),_c('wx-view',{staticClass:\"bgc-white mt15\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"infor-head flex-row align-center pl30 pr30\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"home-icon\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/home-i1.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-14 m-color-1 font-bold ml10\",class:_processClassBinding([])},[_v(\"最新资讯\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-1 align-end flex-column\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-6\",class:_processClassBinding([])},[_v(\"更多\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-other\",class:_processClassBinding([])})],1),_v(\" \"),_l((showList),function(item,index){return _c('wx-view',{staticClass:\"flex pt30 pb30 pl30 pr30 flex-row align-center pos-r\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-row align-center flex-1\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 flex-column\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"text-titles lines2\",class:_processClassBinding([])},[_v(_s(item.title))]),_v(\" \"),_c('wx-text',{staticClass:\"font-12 line34 m-color-99\",class:_processClassBinding([])},[_v(_s(item.create_time))])],1),_v(\" \"),(index%3==0)?_c('wx-image',{staticClass:\"news-img\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/new-pic1.png\"}}):_e(),_v(\" \"),(index%3==1)?_c('wx-image',{staticClass:\"news-img\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/new-pic2.png\"}}):_e(),_v(\" \"),(index%3==2)?_c('wx-image',{staticClass:\"news-img\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/new-pic3.png\"}}):_e()],1),_v(\" \"),_c('wx-view',{staticClass:\"line-hot\",class:_processClassBinding([])})],1)})],2)],1)],1)],1)}"),
        modules:{},
        imports:[],
        templates:{},
        components:components,
      }
      

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 8 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"navigationBarTitleText":"首页"}');

/***/ }),
/* 9 */
/***/ (() => {

"use strict";


//index.js
//获取应用实例
var app = getApp(); // import API from "../../api/api.js";

Page({
  data: {
    statusBarHeight: 44,
    openFund: true,
    isPages: false,
    pageTitle: "",
    scrollerHeight: '',
    pageUrl: "",
    bgColor: "#f1f0f6",
    isThreeShow: false,
    qrData: "",
    imageList: [{
      src: '../../images/lightbox/home-1.png'
    }, {
      src: '../../images/lightbox/home-2.png'
    }, {
      src: '../../images/lightbox/home-3.png'
    }],
    //顶部滚图
    noticeNum: 0,
    styleObject: "rgba(58,128,237,0)",
    activeIndex: 0,
    paddingTop: false,
    isIPhoneX: false,
    hotIcon: true,
    hotName: "正在热销",
    highIcon: true,
    highName: '高端理财',
    // pageData: homeData.page,
    pageData: [],
    refreshing: 'hide',
    refreshText: '',
    refreshFlag: false,
    lastUpdateDate: new Date().getTime(),
    loadShow: false,
    //遮罩层必须参数
    channel: "",
    preview: false,
    loginState: true,
    isRefreshStop: true,
    updateMessage: "",
    // app更新提示文字
    updateApkUrl: "",
    // app更新跳转链接
    isVersionOld: true,
    //app 版本是否是老版本
    // isApp: API.matchNative(),
    tanPic: false,
    adPic: "",
    adPicSrc: "",
    adPicSrcType: "",
    scroll: 'scroll',
    navList: [{
      "id": 2,
      "templateDataId": 83,
      "title": "基金排名",
      "subTitle": null,
      "iconFilename": "../../images/fun-nav-1.png",
      "linkType": "3",
      "link": "https://mcpc6pje8.lightyy.com/jjrankings.html?p=hsjy_0000&fontflag=1#/jjf10/jjrankings",
      "memo": "自定义-外链"
    }, {
      "id": 1,
      "templateDataId": 82,
      "title": "基金诊断",
      "subTitle": null,
      "iconFilename": "../../images/fun-nav-2.png",
      "linkType": "3",
      "link": "https://464ne3mkj.lightyy.com/index.html?p=hsjy_0000&s=240001#/index/fundDiagnosis",
      "memo": "自定义-外链"
    }, {
      "id": 3,
      "templateDataId": 84,
      "title": "智能问答",
      "subTitle": null,
      "iconFilename": "../../images/fun-nav-3.png",
      "linkType": "3",
      "link": "https://67r66py8a.lightyy.com/index.html?p=hsjy_0000#/fund_index",
      "memo": "内链-产品"
    }, {
      "id": 21,
      "templateDataId": 89,
      "title": "定投试算",
      "subTitle": null,
      "iconFilename": "../../images/fun-nav-4.png",
      "linkType": "3",
      "link": "https://eyjnixm2q.lightyy.com/index.html?p=hsjy_0000#/index",
      "memo": null
    }],
    hotList: [{
      "id": 2,
      "templateDataId": 16,
      "type": "1",
      "title": "回报稳健",
      "subTitle": "推荐基金",
      "linkType": "1",
      "link": "000559",
      "mobileShowType": "2",
      "mobileShowImgFilename": null,
      "mobileShowIncInterval": "七日年化收益率",
      "mobilePubImgFilename": null,
      "mobilePubText": null,
      "rate": "1.0020",
      "netValueDate": "2019-09-04",
      "unit": "%",
      "extendedUrl": null,
      "fundinfo": {
        "fundcode": "000559",
        "fundname": "恒生天天宝货币市场基金A",
        "shortname": "天天宝货币市场基金A",
        "fundtype": "2",
        "fundtypeName": "货币",
        "fundtypeDisplay": "00",
        "fundtypeDisplayName": "货币型",
        "tags": ["大数据", "数据时代", "投资灵活"]
      },
      "dsFundInfo": {
        "ofund_risklevel": "0",
        "nav_total": "1",
        "fund_status": "0",
        "nav_date": "20190818",
        "fund_name": "恒生天天宝货币市场基金A",
        "ofund_type": "2",
        "fund_code": "000559",
        "pre_income_ratio": "13.4818",
        "pre_yield": "null",
        "net_value": "1",
        "fund_full_name": "恒生天天宝货币市场基金A",
        "accept_hq_date": "20190819",
        "manager_code": "25",
        "setup_date": "20190731",
        "fund_sub_type": "0",
        "ta_code": "25"
      },
      "trustFundInfo": null
    }, {
      "id": 14,
      "templateDataId": 28,
      "type": "1",
      "title": "定期开放",
      "subTitle": null,
      "linkType": "1",
      "link": "000971",
      "mobileShowType": "2",
      "mobileShowImgFilename": null,
      "mobileShowIncInterval": "近一日涨跌幅",
      "mobilePubImgFilename": null,
      "mobilePubText": null,
      "rate": "653.33",
      "netValueDate": "2019-09-04",
      "unit": "%",
      "extendedUrl": null,
      "fundinfo": {
        "fundcode": "000971",
        "fundname": "恒生新经济股票",
        "shortname": "恒生新经济",
        "fundtype": "0",
        "fundtypeName": "普通",
        "fundtypeDisplay": "02",
        "fundtypeDisplayName": "股票型",
        "tags": ["定期开放"]
      },
      "dsFundInfo": {
        "ofund_risklevel": "1",
        "nav_total": "1.18",
        "fund_status": "0",
        "nav_date": "20190818",
        "fund_name": "恒生新经济股票",
        "ofund_type": "0",
        "fund_code": "000971",
        "pre_income_ratio": "0",
        "pre_yield": "null",
        "net_value": "1.08",
        "fund_full_name": "恒生新经济股票",
        "accept_hq_date": "20190819",
        "manager_code": "25",
        "setup_date": "20190731",
        "fund_sub_type": "0",
        "ta_code": "25"
      },
      "trustFundInfo": null
    }, {
      "id": 15,
      "templateDataId": 29,
      "type": "1",
      "title": "信用债主题",
      "subTitle": null,
      "linkType": "1",
      "link": "320014",
      "mobileShowType": "2",
      "mobileShowImgFilename": null,
      "mobileShowIncInterval": "近一日涨跌幅",
      "mobilePubImgFilename": null,
      "mobilePubText": null,
      "rate": "0.00",
      "netValueDate": "2019-09-04",
      "unit": "%",
      "extendedUrl": null,
      "fundinfo": {
        "fundcode": "320014",
        "fundname": "恒生上证新兴产业交易型开放式指数证券投资",
        "shortname": "恒生上证",
        "fundtype": "F",
        "fundtypeName": "指数型",
        "fundtypeDisplay": "05",
        "fundtypeDisplayName": "指数型",
        "tags": ["指数为王", "上证50"]
      },
      "dsFundInfo": {
        "ofund_risklevel": "3",
        "nav_total": "1.09",
        "fund_status": "0",
        "nav_date": "20190818",
        "fund_name": "恒生上证新兴产业交易型开放式指数证券投资",
        "ofund_type": "F",
        "fund_code": "320014",
        "pre_income_ratio": "0",
        "pre_yield": "null",
        "net_value": "1.09",
        "fund_full_name": "恒生上证新兴产业交易型开放式指数证券投资",
        "accept_hq_date": "20190819",
        "manager_code": "25",
        "setup_date": "20190731",
        "fund_sub_type": "0",
        "ta_code": "25"
      },
      "trustFundInfo": null
    }],
    showList: [{
      "category_name": null,
      "keywords": null,
      "activation_date": "20190813172440",
      "publish_user_id": "8EAE16000D045D01E053C620140A756B",
      "channel": null,
      "click_count": 0,
      "memo": null,
      "chainserial": null,
      "source": null,
      "expiration_date": null,
      "title": "A股三大股指午盘表现低迷！券商主题基金陷入调整",
      "type": "3",
      "content": null,
      "announce_time": null,
      "update_time": "2019-08-13 17:29:19",
      "update_user_id": "8EAE16000D045D01E053C620140A756B",
      "attachmentList": [],
      "publish_time": "2019-08-13 17:29:19",
      "pic_filename": null,
      "id": 3,
      "article_template": null,
      "page_size": 0,
      "create_user_id": "8EAE16000D045D01E053C620140A756B",
      "like_count": 0,
      "visible": "1",
      "create_time": "2019-08-13 17:25:22",
      "author": null,
      "total_count": 0,
      "page_no": 0,
      "sort": 0,
      "version": null,
      "url": "https://mcpc6pje8.lightyy.com/fic_news_detail.html?id=5d522c900c206e00014a1a47&h=null&p=hsjy_0000&u=null&t=null&sharetitle=A\xE8\x82\xA1\xE4\xB8\x89\xE5\xA4\xA7\xE8\x82\xA1\xE6\x8C\x87\xE5\x8D\x88\xE7\x9B\x98\xE8\xA1\xA8\xE7\x8E\xB0\xE4\xBD\x8E\xE8\xBF\xB7\xEF\xBC\x81\xE5\x88\xB8\xE5\x95\x86\xE4\xB8\xBB\xE9\xA2\x98\xE5\x9F\xBA\xE9\x87\x91\xE9\x99\xB7\xE5\x85\xA5\xE8\xB0\x83\xE6\x95\xB4&p=hsjy_0000&fontflag=1#/marketinfo/fic_news_detail",
      "filename": null,
      "status": "4"
    }, {
      "category_name": null,
      "keywords": null,
      "activation_date": "20190813172058",
      "publish_user_id": "8EAE16000D045D01E053C620140A756B",
      "channel": null,
      "click_count": 0,
      "memo": null,
      "chainserial": null,
      "source": null,
      "expiration_date": null,
      "title": "5分钟撩基 | 这只基金几乎空仓1年了！持有人已不耐烦，份额却不减反增",
      "type": "3",
      "content": null,
      "announce_time": null,
      "update_time": "2019-08-13 17:29:18",
      "update_user_id": "8EAE16000D045D01E053C620140A756B",
      "attachmentList": [],
      "publish_time": "2019-08-13 17:29:18",
      "pic_filename": null,
      "id": 2,
      "article_template": null,
      "page_size": 0,
      "create_user_id": "8EAE16000D045D01E053C620140A756B",
      "like_count": 0,
      "visible": "1",
      "create_time": "2019-08-13 17:21:22",
      "author": null,
      "total_count": 0,
      "page_no": 0,
      "sort": 0,
      "version": null,
      "url": "https://mcpc6pje8.lightyy.com/fic_news_detail.html?id=5d51320d9be19500010f6842&h=null&p=null&u=null&t=null&sharetitle=5\xE5\x88\x86\xE9\x92\x9F\xE6\x92\xA9\xE5\x9F\xBA | \xE8\xBF\x99\xE5\x8F\xAA\xE5\x9F\xBA\xE9\x87\x91\xE5\x87\xA0\xE4\xB9\x8E\xE7\xA9\xBA\xE4\xBB\x931\xE5\xB9\xB4\xE4\xBA\x86\xEF\xBC\x81\xE6\x8C\x81\xE6\x9C\x89\xE4\xBA\xBA\xE5\xB7\xB2\xE4\xB8\x8D\xE8\x80\x90\xE7\x83\xA6\xEF\xBC\x8C\xE4\xBB\xBD\xE9\xA2\x9D\xE5\x8D\xB4\xE4\xB8\x8D\xE5\x87\x8F\xE5\x8F\x8D\xE5\xA2\x9E#/marketinfo/fic_news_detail",
      "filename": null,
      "status": "4"
    }, {
      "category_name": null,
      "keywords": null,
      "activation_date": "20190813172010",
      "publish_user_id": "8EAE16000D045D01E053C620140A756B",
      "channel": null,
      "click_count": 0,
      "memo": null,
      "chainserial": null,
      "source": null,
      "expiration_date": null,
      "title": "牛基问诊 | 三年重仓大盘股，易方达中小盘为什么这么浪？",
      "type": "3",
      "content": null,
      "announce_time": null,
      "update_time": "2019-08-13 17:29:15",
      "update_user_id": "8EAE16000D045D01E053C620140A756B",
      "attachmentList": [],
      "publish_time": "2019-08-13 17:29:15",
      "pic_filename": null,
      "id": 1,
      "article_template": null,
      "page_size": 0,
      "create_user_id": "8EAE16000D045D01E053C620140A756B",
      "like_count": 0,
      "visible": "1",
      "create_time": "2019-08-13 17:20:53",
      "author": null,
      "total_count": 0,
      "page_no": 0,
      "sort": 0,
      "version": null,
      "url": "https://mcpc6pje8.lightyy.com/fic_news_detail.html?id=5d5133f21334160001835c52&h=null&p=null&u=null&t=null&sharetitle=\xE7\x89\x9B\xE5\x9F\xBA\xE9\x97\xAE\xE8\xAF\x8A | \xE4\xB8\x89\xE5\xB9\xB4\xE9\x87\x8D\xE4\xBB\x93\xE5\xA4\xA7\xE7\x9B\x98\xE8\x82\xA1\xEF\xBC\x8C\xE6\x98\x93\xE6\x96\xB9\xE8\xBE\xBE\xE4\xB8\xAD\xE5\xB0\x8F\xE7\x9B\x98\xE4\xB8\xBA\xE4\xBB\x80\xE4\xB9\x88\xE8\xBF\x99\xE4\xB9\x88\xE6\xB5\xAA\xEF\xBC\x9F#/marketinfo/fic_news_detail",
      "filename": null,
      "status": "4"
    }, {
      "category_name": null,
      "keywords": null,
      "activation_date": "20190813172440",
      "publish_user_id": "8EAE16000D045D01E053C620140A756B",
      "channel": null,
      "click_count": 0,
      "memo": null,
      "chainserial": null,
      "source": null,
      "expiration_date": null,
      "title": "A股三大股指午盘表现低迷！券商主题基金陷入调整",
      "type": "3",
      "content": null,
      "announce_time": null,
      "update_time": "2019-08-13 17:29:19",
      "update_user_id": "8EAE16000D045D01E053C620140A756B",
      "attachmentList": [],
      "publish_time": "2019-08-13 17:29:19",
      "pic_filename": null,
      "id": 3,
      "article_template": null,
      "page_size": 0,
      "create_user_id": "8EAE16000D045D01E053C620140A756B",
      "like_count": 0,
      "visible": "1",
      "create_time": "2019-08-13 17:25:22",
      "author": null,
      "total_count": 0,
      "page_no": 0,
      "sort": 0,
      "version": null,
      "url": "https://mcpc6pje8.lightyy.com/fic_news_detail.html?id=5d522c900c206e00014a1a47&h=null&p=hsjy_0000&u=null&t=null&sharetitle=A\xE8\x82\xA1\xE4\xB8\x89\xE5\xA4\xA7\xE8\x82\xA1\xE6\x8C\x87\xE5\x8D\x88\xE7\x9B\x98\xE8\xA1\xA8\xE7\x8E\xB0\xE4\xBD\x8E\xE8\xBF\xB7\xEF\xBC\x81\xE5\x88\xB8\xE5\x95\x86\xE4\xB8\xBB\xE9\xA2\x98\xE5\x9F\xBA\xE9\x87\x91\xE9\x99\xB7\xE5\x85\xA5\xE8\xB0\x83\xE6\x95\xB4&p=hsjy_0000&fontflag=1#/marketinfo/fic_news_detail",
      "filename": null,
      "status": "4"
    }, {
      "category_name": null,
      "keywords": null,
      "activation_date": "20190813172058",
      "publish_user_id": "8EAE16000D045D01E053C620140A756B",
      "channel": null,
      "click_count": 0,
      "memo": null,
      "chainserial": null,
      "source": null,
      "expiration_date": null,
      "title": "5分钟撩基 | 这只基金几乎空仓1年了！持有人已不耐烦，份额却不减反增",
      "type": "3",
      "content": null,
      "announce_time": null,
      "update_time": "2019-08-13 17:29:18",
      "update_user_id": "8EAE16000D045D01E053C620140A756B",
      "attachmentList": [],
      "publish_time": "2019-08-13 17:29:18",
      "pic_filename": null,
      "id": 2,
      "article_template": null,
      "page_size": 0,
      "create_user_id": "8EAE16000D045D01E053C620140A756B",
      "like_count": 0,
      "visible": "1",
      "create_time": "2019-08-13 17:21:22",
      "author": null,
      "total_count": 0,
      "page_no": 0,
      "sort": 0,
      "version": null,
      "url": "https://mcpc6pje8.lightyy.com/fic_news_detail.html?id=5d51320d9be19500010f6842&h=null&p=null&u=null&t=null&sharetitle=5\xE5\x88\x86\xE9\x92\x9F\xE6\x92\xA9\xE5\x9F\xBA | \xE8\xBF\x99\xE5\x8F\xAA\xE5\x9F\xBA\xE9\x87\x91\xE5\x87\xA0\xE4\xB9\x8E\xE7\xA9\xBA\xE4\xBB\x931\xE5\xB9\xB4\xE4\xBA\x86\xEF\xBC\x81\xE6\x8C\x81\xE6\x9C\x89\xE4\xBA\xBA\xE5\xB7\xB2\xE4\xB8\x8D\xE8\x80\x90\xE7\x83\xA6\xEF\xBC\x8C\xE4\xBB\xBD\xE9\xA2\x9D\xE5\x8D\xB4\xE4\xB8\x8D\xE5\x87\x8F\xE5\x8F\x8D\xE5\xA2\x9E#/marketinfo/fic_news_detail",
      "filename": null,
      "status": "4"
    }, {
      "category_name": null,
      "keywords": null,
      "activation_date": "20190813172010",
      "publish_user_id": "8EAE16000D045D01E053C620140A756B",
      "channel": null,
      "click_count": 0,
      "memo": null,
      "chainserial": null,
      "source": null,
      "expiration_date": null,
      "title": "牛基问诊 | 三年重仓大盘股，易方达中小盘为什么这么浪？",
      "type": "3",
      "content": null,
      "announce_time": null,
      "update_time": "2019-08-13 17:29:15",
      "update_user_id": "8EAE16000D045D01E053C620140A756B",
      "attachmentList": [],
      "publish_time": "2019-08-13 17:29:15",
      "pic_filename": null,
      "id": 1,
      "article_template": null,
      "page_size": 0,
      "create_user_id": "8EAE16000D045D01E053C620140A756B",
      "like_count": 0,
      "visible": "1",
      "create_time": "2019-08-13 17:20:53",
      "author": null,
      "total_count": 0,
      "page_no": 0,
      "sort": 0,
      "version": null,
      "url": "https://mcpc6pje8.lightyy.com/fic_news_detail.html?id=5d5133f21334160001835c52&h=null&p=null&u=null&t=null&sharetitle=\xE7\x89\x9B\xE5\x9F\xBA\xE9\x97\xAE\xE8\xAF\x8A | \xE4\xB8\x89\xE5\xB9\xB4\xE9\x87\x8D\xE4\xBB\x93\xE5\xA4\xA7\xE7\x9B\x98\xE8\x82\xA1\xEF\xBC\x8C\xE6\x98\x93\xE6\x96\xB9\xE8\xBE\xBE\xE4\xB8\xAD\xE5\xB0\x8F\xE7\x9B\x98\xE4\xB8\xBA\xE4\xBB\x80\xE4\xB9\x88\xE8\xBF\x99\xE4\xB9\x88\xE6\xB5\xAA\xEF\xBC\x9F#/marketinfo/fic_news_detail",
      "filename": null,
      "status": "4"
    }, {
      "category_name": null,
      "keywords": null,
      "activation_date": "20190813172440",
      "publish_user_id": "8EAE16000D045D01E053C620140A756B",
      "channel": null,
      "click_count": 0,
      "memo": null,
      "chainserial": null,
      "source": null,
      "expiration_date": null,
      "title": "A股三大股指午盘表现低迷！券商主题基金陷入调整",
      "type": "3",
      "content": null,
      "announce_time": null,
      "update_time": "2019-08-13 17:29:19",
      "update_user_id": "8EAE16000D045D01E053C620140A756B",
      "attachmentList": [],
      "publish_time": "2019-08-13 17:29:19",
      "pic_filename": null,
      "id": 3,
      "article_template": null,
      "page_size": 0,
      "create_user_id": "8EAE16000D045D01E053C620140A756B",
      "like_count": 0,
      "visible": "1",
      "create_time": "2019-08-13 17:25:22",
      "author": null,
      "total_count": 0,
      "page_no": 0,
      "sort": 0,
      "version": null,
      "url": "https://mcpc6pje8.lightyy.com/fic_news_detail.html?id=5d522c900c206e00014a1a47&h=null&p=hsjy_0000&u=null&t=null&sharetitle=A\xE8\x82\xA1\xE4\xB8\x89\xE5\xA4\xA7\xE8\x82\xA1\xE6\x8C\x87\xE5\x8D\x88\xE7\x9B\x98\xE8\xA1\xA8\xE7\x8E\xB0\xE4\xBD\x8E\xE8\xBF\xB7\xEF\xBC\x81\xE5\x88\xB8\xE5\x95\x86\xE4\xB8\xBB\xE9\xA2\x98\xE5\x9F\xBA\xE9\x87\x91\xE9\x99\xB7\xE5\x85\xA5\xE8\xB0\x83\xE6\x95\xB4&p=hsjy_0000&fontflag=1#/marketinfo/fic_news_detail",
      "filename": null,
      "status": "4"
    }, {
      "category_name": null,
      "keywords": null,
      "activation_date": "20190813172058",
      "publish_user_id": "8EAE16000D045D01E053C620140A756B",
      "channel": null,
      "click_count": 0,
      "memo": null,
      "chainserial": null,
      "source": null,
      "expiration_date": null,
      "title": "5分钟撩基 | 这只基金几乎空仓1年了！持有人已不耐烦，份额却不减反增",
      "type": "3",
      "content": null,
      "announce_time": null,
      "update_time": "2019-08-13 17:29:18",
      "update_user_id": "8EAE16000D045D01E053C620140A756B",
      "attachmentList": [],
      "publish_time": "2019-08-13 17:29:18",
      "pic_filename": null,
      "id": 2,
      "article_template": null,
      "page_size": 0,
      "create_user_id": "8EAE16000D045D01E053C620140A756B",
      "like_count": 0,
      "visible": "1",
      "create_time": "2019-08-13 17:21:22",
      "author": null,
      "total_count": 0,
      "page_no": 0,
      "sort": 0,
      "version": null,
      "url": "https://mcpc6pje8.lightyy.com/fic_news_detail.html?id=5d51320d9be19500010f6842&h=null&p=null&u=null&t=null&sharetitle=5\xE5\x88\x86\xE9\x92\x9F\xE6\x92\xA9\xE5\x9F\xBA | \xE8\xBF\x99\xE5\x8F\xAA\xE5\x9F\xBA\xE9\x87\x91\xE5\x87\xA0\xE4\xB9\x8E\xE7\xA9\xBA\xE4\xBB\x931\xE5\xB9\xB4\xE4\xBA\x86\xEF\xBC\x81\xE6\x8C\x81\xE6\x9C\x89\xE4\xBA\xBA\xE5\xB7\xB2\xE4\xB8\x8D\xE8\x80\x90\xE7\x83\xA6\xEF\xBC\x8C\xE4\xBB\xBD\xE9\xA2\x9D\xE5\x8D\xB4\xE4\xB8\x8D\xE5\x87\x8F\xE5\x8F\x8D\xE5\xA2\x9E#/marketinfo/fic_news_detail",
      "filename": null,
      "status": "4"
    }, {
      "category_name": null,
      "keywords": null,
      "activation_date": "20190813172010",
      "publish_user_id": "8EAE16000D045D01E053C620140A756B",
      "channel": null,
      "click_count": 0,
      "memo": null,
      "chainserial": null,
      "source": null,
      "expiration_date": null,
      "title": "牛基问诊 | 三年重仓大盘股，易方达中小盘为什么这么浪？",
      "type": "3",
      "content": null,
      "announce_time": null,
      "update_time": "2019-08-13 17:29:15",
      "update_user_id": "8EAE16000D045D01E053C620140A756B",
      "attachmentList": [],
      "publish_time": "2019-08-13 17:29:15",
      "pic_filename": null,
      "id": 1,
      "article_template": null,
      "page_size": 0,
      "create_user_id": "8EAE16000D045D01E053C620140A756B",
      "like_count": 0,
      "visible": "1",
      "create_time": "2019-08-13 17:20:53",
      "author": null,
      "total_count": 0,
      "page_no": 0,
      "sort": 0,
      "version": null,
      "url": "https://mcpc6pje8.lightyy.com/fic_news_detail.html?id=5d5133f21334160001835c52&h=null&p=null&u=null&t=null&sharetitle=\xE7\x89\x9B\xE5\x9F\xBA\xE9\x97\xAE\xE8\xAF\x8A | \xE4\xB8\x89\xE5\xB9\xB4\xE9\x87\x8D\xE4\xBB\x93\xE5\xA4\xA7\xE7\x9B\x98\xE8\x82\xA1\xEF\xBC\x8C\xE6\x98\x93\xE6\x96\xB9\xE8\xBE\xBE\xE4\xB8\xAD\xE5\xB0\x8F\xE7\x9B\x98\xE4\xB8\xBA\xE4\xBB\x80\xE4\xB9\x88\xE8\xBF\x99\xE4\xB9\x88\xE6\xB5\xAA\xEF\xBC\x9F#/marketinfo/fic_news_detail",
      "filename": null,
      "status": "4"
    }]
  },
  initPage: function initPage(res, jsonResult) {
    this.pageData = [];
    var that = this;
    var data = res;
    data.page.forEach(function (item) {});
    that.pageData = data.page;
    console.log(that.pageData);
    that.loadShow = false;
    this.refreshing = 'hide';
  },
  ajaxList: function ajaxList(jsonResult) {
    var that = this;
    wx.request({
      url: "https://m.py-axa.com/appServer/product/product/fundbrokerquery.json?fundcode=519171&channel=gh_1bc20b27f070&jsonpCallback=jsonp_1&appServertimestamp=1570764072948&_=1570764072948&callback=jsonp_1",
      dataType: "jsonp",
      method: "get",
      headers: {},
      success: function success(res) {
        console.log(res);
        that.initPage(res, jsonResult);
      }
    });
  },
  onLoad: function onLoad() {
    this.ajaxList();
  },
  scroll: function scroll(e) {
    console.log(this.styleObject);
    this.offsetY = e.detail.scrollTop;
    var percent = Math.abs(this.offsetY) / 500.0;

    if (percent > 1) {
      percent = 1;
    }

    console.log(percent);
    this.setData({
      styleObject: "rgba(58,128,237," + percent + ")"
    });
  },
  //事件处理函数
  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '../fund/fund'
    });
  },
  getUserInfo: function getUserInfo(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});

/***/ }),
/* 10 */
/***/ ((module) => {


  var components = {};
  ;
      module.exports = {
        render:new Function("this.$this=this;with(this){return _c('wx-view',{staticClass:\"data-v-af7265\",class:_processClassBinding([])},[_c('wx-view',{staticStyle:{\"background-color\":\"#f0eff4\"}},[_c('wx-view',{staticClass:\"search-box justify-around align-center \",class:_processClassBinding([_s(isIOS ? (isIPhoneX ? 'pt88' : 'pt40') : ''),]),style:(\"height : \"+_s(isIOS ? (isIPhoneX ?  '2.24rem' : '1.6rem') : '1.0666666666666667rem')+\"; top : \"+_s(isAndroid ? '0.5333333333333333rem' : ''))},[_c('wx-view',{staticClass:\"search-wrap flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"search-img ml20\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/search.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"search-text ml10\",class:_processClassBinding([])},[_v(\"搜索基金名称或代码\")])],1)],1),_v(\" \"),_c('wx-view',{style:(\"padding-top: \"+_s(isIPhoneX ? '2.24rem' : '1.6rem'))},[_c('wx-image',{staticStyle:{\"width\":\"10rem\",\"height\":\"3.8666666666666667rem\"},attrs:{\"src\":\"../../images/ding-banner.png\"}})],1),_v(\" \"),_c('wx-view',{staticClass:\"hot-box flex-column mt15\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-head flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"home-icon\",class:_processClassBinding([]),staticStyle:{\"width\":\"0.4666666666666667rem\",\"height\":\"0.4666666666666667rem\"},attrs:{\"src\":\"../../images/home-i3.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-14 m-color-1 font-bold ml10\",class:_processClassBinding([])},[_v(_s(hotNameTwo))]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-1 align-end flex-column\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-6\",class:_processClassBinding([])},[_v(\"更多\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-other\",class:_processClassBinding([])})],1),_v(\" \"),_l((fundList),function(item,index){return (index < 5)?_c('wx-view',{staticClass:\"cellhot justify-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-line flex-column\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-row mb10 align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-left align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-22 \",class:_processClassBinding([_s(item.rate < 0? 'm-color-green' : 'm-color-red'),])},[_v(_s(item.rate)+_s(item.unit))])],1),_v(\" \"),_c('wx-view',{staticClass:\"pl35 flex\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-16 m-color-1\",class:_processClassBinding([])},[_v(_s(item.title))])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-left align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-12 m-color-9\",class:_processClassBinding([])},[_v(_s(item.mobileShowIncInterval))])],1),_v(\" \"),_c('wx-view',{staticClass:\"pl35 flex\",class:_processClassBinding([])},_l((item.fundinfo.tags),function(tag,i){return _c('wx-text',{staticClass:\"font-12 m-color-9\",class:_processClassBinding([])},[_v(_s(i==0? '':' I ')+_s(tag))])}),1)],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"lineColumn-hot\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',{staticClass:\"line-hot\",class:_processClassBinding([])})],1):_e()})],2),_v(\" \"),_c('wx-view',{staticClass:\"flex-column special-box mt15\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"special-head flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"discover-icon ml30\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/discover-i1.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-14 m-color-1 font-bold ml10\",class:_processClassBinding([])},[_v(\"特色理财\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row pb30 pl5 pr5 justify-between\",class:_processClassBinding([])},_l((specialist),function(item,index){return _c('wx-view',{staticClass:\"flex-column sepcial-box justify-center align-start \",class:_processClassBinding([_s(index==0 ? 'sepcial-b1' : 'sepcial-b2'),])},[(index==0)?_c('wx-image',{staticClass:\"sepcial-img\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/discover-pic1.png\"}}):_e(),_v(\" \"),(index==1)?_c('wx-image',{staticClass:\"sepcial-img\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/discover-pic2.png\"}}):_e(),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center\",class:_processClassBinding([]),staticStyle:{\"margin\":\"-1.7333333333333334rem 0 0 0.8rem\",\"position\":\"relative\"}},[_c('wx-text',{staticClass:\"font-16 m-color-5\",class:_processClassBinding([])},[_v(_s(item.title))])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center mt10\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center\",class:_processClassBinding([]),staticStyle:{\"margin\":\"0 0 0 0.8rem\",\"position\":\"relative\"}},[_c('wx-text',{staticClass:\"font-12 m-color-5\",class:_processClassBinding([])},[_v(_s(item.subTitle))])],1)],1)}),1)],1),_v(\" \"),_c('wx-view',{staticClass:\"hot-box flex-column mt15\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-head flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"home-icon\",class:_processClassBinding([]),staticStyle:{\"width\":\"0.4666666666666667rem\",\"height\":\"0.4666666666666667rem\"},attrs:{\"src\":\"../../images/home-i3.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-14 m-color-1 font-bold ml10\",class:_processClassBinding([])},[_v(_s(hotName))]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-1 align-end flex-column\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-6\",class:_processClassBinding([])},[_v(\"更多\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-other\",class:_processClassBinding([])})],1),_v(\" \"),_l((hotList),function(item,index){return (index < 5)?_c('wx-view',{staticClass:\"cellhot justify-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-line flex-column\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-row mb10 align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-left align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-22 \",class:_processClassBinding([_s(item.rate < 0? 'm-color-green' : 'm-color-red'),])},[_v(_s(item.rate)+_s(item.unit))])],1),_v(\" \"),_c('wx-view',{staticClass:\"pl35 flex\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-16 m-color-1\",class:_processClassBinding([])},[_v(_s(item.title))])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"hot-left align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-12 m-color-9\",class:_processClassBinding([])},[_v(_s(item.mobileShowIncInterval))])],1),_v(\" \"),_c('wx-view',{staticClass:\"pl35 flex\",class:_processClassBinding([])},_l((item.fundinfo.tags),function(tag,i){return _c('wx-text',{staticClass:\"font-12 m-color-9\",class:_processClassBinding([])},[_v(_s(i==0? '':' I ')+_s(tag))])}),1)],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"lineColumn-hot\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',{staticClass:\"line-hot\",class:_processClassBinding([])})],1):_e()})],2)],1)],1)}"),
        modules:{},
        imports:[],
        templates:{},
        components:components,
      }
      

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 12 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"navigationBarTitleText":"精选"}');

/***/ }),
/* 13 */
/***/ (() => {

"use strict";


//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    imageList: [{
      src: 'http://101.71.12.145:7705/upload/image/25c3165a55c34b23ab456aae6bacc7ae.png'
    }, {
      src: 'http://101.71.12.145:7705/upload/image/4e9302c6702f47cd905cbc6d2370e950.png'
    }, {
      src: 'images/ding-banner.png'
    }],
    activeIndex: 1,
    isAndroid: false,
    isIOS: false,
    isIPhoneX: false,
    hotIcon: false,
    hotName: "精选主题",
    hotNameTwo: '优选基金',
    scrollerHeight: 0,
    loadShow: true,
    //遮罩层必须参数
    refreshing: 'hide',
    refreshText: '',
    refreshFlag: false,
    channel: "",
    preview: false,
    loginState: true,
    isRefreshStop: true,
    openFund: true,
    hotList: [{
      "id": 27,
      "templateDataId": 50,
      "type": "1",
      "title": "布局制造业",
      "subTitle": null,
      "linkType": "1",
      "link": "000714",
      "mobileShowType": "2",
      "mobileShowImgFilename": null,
      "mobileShowIncInterval": "近一日涨跌幅",
      "mobilePubImgFilename": null,
      "mobilePubText": null,
      "rate": "-2.61",
      "netValueDate": "2019-09-04",
      "unit": "%",
      "extendedUrl": null,
      "fundinfo": {
        "fundcode": "000714",
        "fundname": "恒生稳健回报混合A",
        "shortname": "恒生稳健",
        "fundtype": "A",
        "fundtypeName": "混合型",
        "fundtypeDisplay": "04",
        "fundtypeDisplayName": "混合型",
        "tags": ["收益稳健", "混合投资"]
      },
      "dsFundInfo": {
        "ofund_risklevel": "4",
        "nav_total": "1.15",
        "fund_status": "0",
        "nav_date": "20190818",
        "fund_name": "恒生稳健回报混合A",
        "ofund_type": "A",
        "fund_code": "000714",
        "pre_income_ratio": "0",
        "pre_yield": "null",
        "net_value": "1.15",
        "fund_full_name": "恒生稳健回报混合A",
        "accept_hq_date": "20190819",
        "manager_code": "25",
        "setup_date": "20190731",
        "fund_sub_type": "0",
        "ta_code": "25"
      },
      "trustFundInfo": null
    }, {
      "id": 28,
      "templateDataId": 51,
      "type": "1",
      "title": "回报稳健",
      "subTitle": null,
      "linkType": "1",
      "link": "000559",
      "mobileShowType": "2",
      "mobileShowImgFilename": null,
      "mobileShowIncInterval": "七日年化收益率",
      "mobilePubImgFilename": null,
      "mobilePubText": null,
      "rate": "1.0020",
      "netValueDate": "2019-09-04",
      "unit": "%",
      "extendedUrl": null,
      "fundinfo": {
        "fundcode": "000559",
        "fundname": "恒生天天宝货币市场基金A",
        "shortname": "天天宝货币市场基金A",
        "fundtype": "2",
        "fundtypeName": "货币",
        "fundtypeDisplay": "00",
        "fundtypeDisplayName": "货币型",
        "tags": ["大数据", "数据时代", "投资灵活"]
      },
      "dsFundInfo": {
        "ofund_risklevel": "0",
        "nav_total": "1",
        "fund_status": "0",
        "nav_date": "20190818",
        "fund_name": "恒生天天宝货币市场基金A",
        "ofund_type": "2",
        "fund_code": "000559",
        "pre_income_ratio": "13.4818",
        "pre_yield": "null",
        "net_value": "1",
        "fund_full_name": "恒生天天宝货币市场基金A",
        "accept_hq_date": "20190819",
        "manager_code": "25",
        "setup_date": "20190731",
        "fund_sub_type": "0",
        "ta_code": "25"
      },
      "trustFundInfo": null
    }, {
      "id": 29,
      "templateDataId": 52,
      "type": "1",
      "title": "新生经济",
      "subTitle": null,
      "linkType": "1",
      "link": "000971",
      "mobileShowType": "2",
      "mobileShowImgFilename": null,
      "mobileShowIncInterval": "近一日涨跌幅",
      "mobilePubImgFilename": null,
      "mobilePubText": null,
      "rate": "653.33",
      "netValueDate": "2019-09-04",
      "unit": "%",
      "extendedUrl": null,
      "fundinfo": {
        "fundcode": "000971",
        "fundname": "恒生新经济股票",
        "shortname": "恒生新经济",
        "fundtype": "0",
        "fundtypeName": "普通",
        "fundtypeDisplay": "02",
        "fundtypeDisplayName": "股票型",
        "tags": ["定期开放"]
      },
      "dsFundInfo": {
        "ofund_risklevel": "1",
        "nav_total": "1.18",
        "fund_status": "0",
        "nav_date": "20190818",
        "fund_name": "恒生新经济股票",
        "ofund_type": "0",
        "fund_code": "000971",
        "pre_income_ratio": "0",
        "pre_yield": "null",
        "net_value": "1.08",
        "fund_full_name": "恒生新经济股票",
        "accept_hq_date": "20190819",
        "manager_code": "25",
        "setup_date": "20190731",
        "fund_sub_type": "0",
        "ta_code": "25"
      },
      "trustFundInfo": null
    }],
    specialist: [{
      "id": 4,
      "templateDataId": 56,
      "title": "事件驱动",
      "subTitle": "把握热门事件",
      "iconFilename": "http://101.71.12.145:7705/upload/image/d631b15b659c4a1896b78adbfa275df8.png",
      "linkType": "3",
      "link": "https://mcpc6pje8.lightyy.com/fund_hero_detail.html?fundType=sjqd&h=0&p=hsjy_0000&u=null#/fund_hero/fund_hero_detail",
      "memo": null
    }, {
      "id": 5,
      "templateDataId": 57,
      "title": "轮动策略",
      "subTitle": "赚取超额收益",
      "iconFilename": "http://101.71.12.145:7705/upload/image/09be0eefc46a401aab2acd0035110d63.png",
      "linkType": "3",
      "link": "https://mcpc6pje8.lightyy.com/fund_hero_detail.html?fundType=ldcl&h=0&p=hsjy_0000&u=null#/fund_hero/fund_hero_detail",
      "memo": null
    }],
    fundList: [{
      "id": 43,
      "templateDataId": 93,
      "type": "1",
      "title": "新兴产业",
      "subTitle": null,
      "linkType": "1",
      "link": "320014",
      "mobileShowType": "2",
      "mobileShowImgFilename": null,
      "mobileShowIncInterval": "近一日涨跌幅",
      "mobilePubImgFilename": null,
      "mobilePubText": null,
      "rate": "0.00",
      "netValueDate": "2019-09-04",
      "unit": "%",
      "extendedUrl": null,
      "fundinfo": {
        "fundcode": "320014",
        "fundname": "恒生上证新兴产业交易型开放式指数证券投资",
        "shortname": "恒生上证",
        "fundtype": "F",
        "fundtypeName": "指数型",
        "fundtypeDisplay": "05",
        "fundtypeDisplayName": "指数型",
        "tags": ["指数为王", "上证50"]
      },
      "dsFundInfo": {
        "ofund_risklevel": "3",
        "nav_total": "1.09",
        "fund_status": "0",
        "nav_date": "20190818",
        "fund_name": "恒生上证新兴产业交易型开放式指数证券投资",
        "ofund_type": "F",
        "fund_code": "320014",
        "pre_income_ratio": "0",
        "pre_yield": "null",
        "net_value": "1.09",
        "fund_full_name": "恒生上证新兴产业交易型开放式指数证券投资",
        "accept_hq_date": "20190819",
        "manager_code": "25",
        "setup_date": "20190731",
        "fund_sub_type": "0",
        "ta_code": "25"
      },
      "trustFundInfo": null
    }, {
      "id": 44,
      "templateDataId": 94,
      "type": "1",
      "title": "高端制造",
      "subTitle": null,
      "linkType": "1",
      "link": "001707",
      "mobileShowType": "2",
      "mobileShowImgFilename": null,
      "mobileShowIncInterval": "近一日涨跌幅",
      "mobilePubImgFilename": null,
      "mobilePubText": null,
      "rate": "0.00",
      "netValueDate": "2019-09-04",
      "unit": "%",
      "extendedUrl": null,
      "fundinfo": {
        "fundcode": "001707",
        "fundname": "恒生高端制造股票",
        "shortname": "恒生高端",
        "fundtype": "B",
        "fundtypeName": "偏股型",
        "fundtypeDisplay": "02",
        "fundtypeDisplayName": "股票型",
        "tags": ["布局高端", "精工制造"]
      },
      "dsFundInfo": {
        "ofund_risklevel": "1",
        "nav_total": "1",
        "fund_status": "0",
        "nav_date": "20190818",
        "fund_name": "恒生高端制造股票",
        "ofund_type": "B",
        "fund_code": "001707",
        "pre_income_ratio": "0.0074",
        "pre_yield": "null",
        "net_value": "1",
        "fund_full_name": "恒生高端制造股票",
        "accept_hq_date": "20190819",
        "manager_code": "25",
        "setup_date": "20190813",
        "fund_sub_type": "0",
        "ta_code": "25"
      },
      "trustFundInfo": null
    }]
  },
  onLoad: function onLoad() {}
});

/***/ }),
/* 14 */
/***/ ((module) => {


  var components = {};
  ;
      module.exports = {
        render:new Function("this.$this=this;with(this){return _c('wx-view',{staticClass:\"data-v-b4d47a\",class:_processClassBinding([])},[_c('wx-view',{staticStyle:{\"background-color\":\"#f1f0f6\"}},[_c('wx-view',{staticClass:\"setting-top\",class:_processClassBinding([]),style:(\"padding-top : \"+_s(isIPhoneX ? '1.1733333333333333rem' : '0.5333333333333333rem'))},[_c('wx-image',{staticClass:\"setting-bj\",class:_processClassBinding([]),style:(\"height : \"+_s(isIPhoneX ?  '4.773333333333333rem' : '4.133333333333334rem')),attrs:{\"src\":\"../../images/setting-afternoon.jpg\"}}),_v(\" \"),_c('wx-view',{staticClass:\"setting-head align-center flex-row\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"person align-center flex-row\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"cricle mr10\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/cricle.png\"}}),_v(\" \"),_c('wx-image',{staticClass:\"perimg\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/Unknown.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"person-type\",class:_processClassBinding([])},[_v(_s(personType))])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center flex-row flex-1 justify-end\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"book\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/book.png\"}})],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-1\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-row justify-between\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex align-center flex-row\",class:_processClassBinding([]),staticStyle:{\"z-index\":\"99\"}},[_c('wx-text',{staticClass:\"font-23 m-color-5 font-bold\",class:_processClassBinding([])},[_v(_s(userName))])],1)],1)],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"setting-tab-box flex-row align-center h160\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex align-start flex-1 ml30 flex-column\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-row align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-12 m-color-9\",class:_processClassBinding([])},[_v(\"总资产(元)\")]),_v(\" \"),_c('wx-view',{staticClass:\"ml10\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"eye\",class:_processClassBinding([]),attrs:{\"src\":eyePic}})],1)],1),_v(\" \"),(typeNum === 'num')?_c('wx-view',[_c('wx-text',{staticClass:\"font-22 m-color-red font-bold mt15\",class:_processClassBinding([])},[_v(_s(allNum))])],1):_e(),_v(\" \"),(typeNum != 'num')?_c('wx-view',[_c('wx-text',{staticClass:\"font-22 m-color-red font-bold mt15\",class:_processClassBinding([])},[_v(\"******\")])],1):_e()],1),_v(\" \"),_c('wx-view',{staticClass:\"flex align-start flex-1 ml30 flex-column\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-12 m-color-9\",class:_processClassBinding([]),staticStyle:{\"height\":\"0.6666666666666666rem\",\"line-height\":\"0.6666666666666666rem\"}},[_v(\"昨日收益(元)\")]),_v(\" \"),(typeNum === 'num')?_c('wx-view',[(yestodayNum != 0)?_c('wx-text',{staticClass:\"font-22 font-bold mt15 \",class:_processClassBinding([_s(yestodayNumColor < 0 ? 'm-color-green' : 'm-color-red'),])},[_v(_s(yestodayNum))]):_c('wx-text',{staticClass:\"font-22 font-bold mt15\",class:_processClassBinding([])},[_v(_s(yestodayNum == '0.0' ? '0.00' : yestodayNum))])],1):_c('wx-view',[_c('wx-text',{staticClass:\"font-22 m-color-red font-bold mt15\",class:_processClassBinding([])},[_v(\"******\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"line-setting\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-view',{staticClass:\"setting-tab-box flex-row align-center h100\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-row flex-1 align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 ml30\",class:_processClassBinding([])},[_v(\"基金\")]),_v(\" \"),(typeNum === 'num')?_c('wx-view',[_c('wx-text',{staticClass:\"font-16 m-color-1 font-bold ml20\",class:_processClassBinding([])},[_v(_s(jjNum))])],1):_c('wx-view',[_c('wx-text',{staticClass:\"font-16 m-color-1 font-bold ml20\",class:_processClassBinding([])},[_v(\"******\")])],1)],1),_v(\" \"),(usNum != '--')?_c('wx-view',{staticClass:\"flex-row flex-1 align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 ml30\",class:_processClassBinding([])},[_v(\"QDII(多币种)\")]),_v(\" \"),(typeNum === 'num')?_c('wx-view',[_c('wx-text',{staticClass:\"font-16 m-color-1 font-bold ml20\",class:_processClassBinding([])},[_v(_s(usNum))])],1):_c('wx-view',[_c('wx-text',{staticClass:\"font-16 m-color-1 font-bold ml20\",class:_processClassBinding([])},[_v(\"******\")])],1)],1):_e(),_v(\" \"),_c('wx-view',{staticClass:\"lineColumn\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',{staticClass:\"line-setting\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row bgc-white align-center mt15 h100 pl30 pr30\",class:_processClassBinding([])},[_c('wx-image',{staticStyle:{\"width\":\"0.6666666666666666rem\",\"height\":\"0.6666666666666666rem\"},attrs:{\"src\":\"../../images/marquee.png\"}})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row aboutlist align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"list-icon\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/setting-icons-1.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-16 m-color-1 ml10\",class:_processClassBinding([])},[_v(\"银行卡\")])],1),_v(\" \"),_c('wx-text',{staticClass:\"font-14 m-color-9 mr20\",class:_processClassBinding([])},[_v(_s(bankCardCount))]),_v(\" \"),_c('wx-image',{staticClass:\"arrow\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/arrow.png\"}}),_v(\" \"),_c('wx-view',{staticClass:\"lineabout\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row aboutlist align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"list-icon\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/setting-icons-2.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-16 m-color-1 ml10\",class:_processClassBinding([])},[_v(\"安全设置\")])],1),_v(\" \"),_c('wx-image',{staticClass:\"arrow\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/arrow.png\"}}),_v(\" \"),_c('wx-view',{staticClass:\"lineabout\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row aboutlist align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"list-icon\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/setting-icons-3.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-16 m-color-1 ml10\",class:_processClassBinding([])},[_v(\"风险承受能力\")])],1),_v(\" \"),_c('wx-text',{staticClass:\"font-14 m-color-9 mr20\",class:_processClassBinding([])},[_v(_s(riskabilityStr))]),_v(\" \"),_c('wx-image',{staticClass:\"arrow\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/arrow.png\"}})],1),_v(\" \"),(!isActivity)?_c('wx-view',{staticClass:\"flex flex-row aboutlist align-center mt15\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"list-icon\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/setting-icons-4.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-16 m-color-1 ml10\",class:_processClassBinding([])},[_v(\"推荐好友\")])],1),_v(\" \"),_c('wx-image',{staticClass:\"arrow\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/arrow.png\"}}),_v(\" \"),_c('wx-view',{staticClass:\"lineabout\",class:_processClassBinding([])})],1):_e(),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row aboutlist align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"list-icon\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/setting-icons-5.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-16 m-color-1 ml10\",class:_processClassBinding([])},[_v(\"意见反馈\")])],1),_v(\" \"),_c('wx-image',{staticClass:\"arrow\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/arrow.png\"}}),_v(\" \"),_c('wx-view',{staticClass:\"lineabout\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row aboutlist align-center mb20\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"list-icon\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/setting-icons-6.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"font-16 m-color-1 ml10\",class:_processClassBinding([])},[_v(\"关于我们\")])],1),_v(\" \"),_c('wx-image',{staticClass:\"arrow\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/arrow.png\"}})],1)],1)],1)}"),
        modules:{},
        imports:[],
        templates:{},
        components:components,
      }
      

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 16 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"navigationBarTitleText":"我的"}');

/***/ }),
/* 17 */
/***/ (() => {

"use strict";


//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    scrollerHeight: '',
    refreshing: 'hide',
    marquee: {
      duration: 2000,
      interval: 1000,
      list: []
    },
    iconShow: true,
    animate: false,
    xjbNum: "--",
    jjNum: "--",
    allNum: "--",
    usNum: "--",
    pdNum: "--",
    yestodayNum: "--",
    yestodayNumColor: "",
    lastlogintimeNum: "--",
    perData: "--",
    regulate: true,
    //涨/跌
    personType: "普",
    noticeNum: 0,
    type: "A",
    marqueeWrapper: {
      "background-color": "#fff"
    },
    marqueeText: {
      "font-size": "28px",
      "line-height": "50px"
    },
    settingLabel: {
      "font-size": "32px"
    },
    settingTitle: {
      "font-size": "28px"
    },
    settingIcon: {
      width: "50px",
      height: "50px"
    },
    grow: "images/grow.png",
    reduce: "../../images/reduce.png",
    typeNum: "num",
    eyePic: "../../images/openeye.png",
    isRegulateShow: true,
    userName: "请点击登录",
    riskabilityStr: "",
    bankCardCount: "",
    loadShow: false,
    //遮罩层必须参数
    settingPic: "",
    dataTime: "",
    dataIcon: "",
    isIPhoneX: false,
    dataName: "",
    loginState: true,
    accountInfo: {},
    isTypeR: false,
    isRefreshStop: true,
    isActivity: false,
    isShowUS: false,
    isRead: false,
    isPDShow: false,
    custType: {},
    openFund: true,
    tenanGuideEnable: false
  },
  //事件处理函数
  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function onLoad() {},
  getUserInfo: function getUserInfo(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});

/***/ }),
/* 18 */
/***/ ((module) => {


  var components = {};
  ;
      module.exports = {
        render:new Function("this.$this=this;with(this){return _c('wx-view',{staticClass:\"data-v-09ebdd\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"container\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"search-box flex-row align-center justify-around \",class:_processClassBinding([_s(isIOS ? (isIPhoneX ? 'pt88' : 'pt40') : ''),]),style:(\"height:\"+_s(isIOS ? (isIPhoneX ?  '2.24rem' : '1.6rem') : '1.0666666666666667rem')+\"; top:\"+_s(isAndroid ? '0.5333333333333333rem' : ''))},[_c('wx-view',{staticClass:\"search-wrap flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"search-img ml20\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/search.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"search-text ml20\",class:_processClassBinding([])},[_v(\"搜索基金名称或代码\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center\",class:_processClassBinding([])},[_c('wx-image',{staticClass:\"title-img\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/heart.png\"}}),_v(\" \"),_c('wx-text',{staticClass:\"search-text ml10\",class:_processClassBinding([])},[_v(\"自选\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"lc-tab-page\",class:_processClassBinding([]),style:(\"height: \"+_s(isIPhoneX ? '15.546666666666667rem' : '16.186666666666667rem')+\"; top : \"+_s(isIPhoneX ? '2.24rem' : '1.6rem'))},[_c('wx-scroll-view',{ref:\"tab-title-list\",staticClass:\"tab-title-list\",class:_processClassBinding([]),attrs:{\"scroll-x\":\"true\",\"scroll-with-animation\":\"true\",\"scroll-left\":currentTabOffsetLeft}},_l((tabTitles),function(v,index){return _c('wx-view',{staticClass:\"title-item\",class:_processClassBinding([]),attrs:{\"scroll-x\":\"true\",\"data-page\":index},on:{\"tap\":function($event){return $this['setPage'].apply(null, arguments)}}},[_c('wx-view',{staticClass:\"text-wrap\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"tab-text\",class:_processClassBinding([]),style:(\"font-weight: \"+_s(currentPage == index? 'bold' : 'normal')+\"; color: \"+_s(currentPage == index ? '#3580ee' : '#323232'))},[_v(_s(v.title))])],1),_v(\" \"),_c('wx-view',{staticClass:\"border-bottom\",class:_processClassBinding([]),style:(\"background-color: \"+_s(currentPage == index ? '#3580ee' : 'transparent'))})],1)}),1),_v(\" \"),_c('wx-scroll-view',{ref:\"tab-page-wrap\",staticClass:\"tab-page-wrap\",class:_processClassBinding([]),style:(\"height: \"+_s(isIPhoneX ? '14.48rem' : '15.12rem')),attrs:{\"scroll-top\":scrollTop,\"scroll-y\":\"true\"}},[_c('wx-view',_l((demoList),function(v,index){return _c('wx-view',{staticClass:\"page__hd slideAnimation\",class:_processClassBinding([]),style:(\"transform: translate(\"+_s(s*(index-currentPage))+\"px,0)\")},[_c('wx-view',{staticClass:\"list\",class:_processClassBinding([])},[(v.fundlist.length > 0)?_c('wx-view',{staticClass:\"flex change-data justify-between flex-row align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex change-text flex-1\",class:_processClassBinding([])},[_v(\"基金名称\")]),_v(\" \"),_c('wx-text',{staticClass:\"change-text t-right w150\",class:_processClassBinding([])},[_v(\"最新净值\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex justify-end flex-row align-center w150\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"change-text\",class:_processClassBinding([])},[_v(\"日涨跌幅\")]),_v(\" \"),_c('wx-image',{staticClass:\"arrow-more\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/more.png\"}})],1)],1):_e(),_v(\" \"),_l((v.fundlist),function(item,i){return _c('wx-view',{staticClass:\"cell-fundlist\",class:_processClassBinding([]),on:{\"tap\":function($event){return $this['bindViewTap'].apply(null, arguments)}}},[_c('wx-view',{staticClass:\"flex justify-between flex-row title-wrap align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 flex-column justify-center w300\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-row align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"title-text-1 text-ellipsis\",class:_processClassBinding([])},[_v(_s(item.shortname ? item.shortname : item.fundname))]),_v(\" \"),( item.fundstate == '1' || item.fundstate == '2' || item.fundstate == '4' || item.fundstate == '6' || item.fundstate == 'a')?_c('wx-view',{staticClass:\"flex justify-center \",class:_processClassBinding([_s(item.fundstate == '1' || item.fundstate == '2' || item.fundstate == '6'?'fund-orange':'fund-grey'),])},[_c('wx-text',{staticClass:\"fund-grey-word\",class:_processClassBinding([])},[_v(_s(item.fundstatestr))])],1):_e()],1),_v(\" \"),_c('wx-text',{staticClass:\"title-text-2\",class:_processClassBinding([])},[_v(_s(item.fundcode))])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-column align-end w150\",class:_processClassBinding([])},[(item.fundtype == '2' && item.navdate)?_c('wx-text',{staticClass:\"cont-text-1\",class:_processClassBinding([])},[_v(_s(item.hfincomeratio))]):(item.fundtype != '2' && item.navdate)?_c('wx-text',{staticClass:\"cont-text-1\",class:_processClassBinding([])},[_v(_s(item.pernetvalue))]):_c('wx-text',{staticClass:\"cont-text-1\",class:_processClassBinding([])},[_v(\"--\")]),_v(\" \"),(item.navdate)?_c('wx-text',{staticClass:\"cont-text-2\",class:_processClassBinding([])},[_v(_s(_f(\"formatDate\")(item.navdate)))]):_e()],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center cont-wrap w150\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"\",class:_processClassBinding([_s(item.dayinc>=0?'cont-text-3':'cont-text-4'),])},[_v(_s(item.dayinc)+\"%\")])],1),_v(\" \"),_c('wx-view',[_c('wx-image',{staticClass:\"title-img\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/heart.png\"}})],1)],1)],1)}),_v(\" \"),(v.otherlist.length > 0)?_c('wx-view',{staticClass:\"flex change-data justify-between flex-row align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex change-text flex-1\",class:_processClassBinding([])},[_v(\"基金名称\")]),_v(\" \"),_c('wx-text',{staticClass:\"change-text t-right w150\",class:_processClassBinding([])},[_v(\"万份收益\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex justify-end flex-row align-center w150\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"change-text mr10\",class:_processClassBinding([])},[_v(\"七日年化\")])],1)],1):_e(),_v(\" \"),_l((v.otherlist),function(item,i){return _c('wx-view',{staticClass:\"cell-fundlist\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex justify-between flex-row title-wrap align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 flex-column justify-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-row align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"title-text-1\",class:_processClassBinding([])},[_v(_s(item.shortname ? item.shortname : item.fundname))])],1),_v(\" \"),_c('wx-text',{staticClass:\"title-text-2\",class:_processClassBinding([])},[_v(_s(item.fundcode))])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-column align-end w150\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"cont-text-1\",class:_processClassBinding([])},[_v(_s(item.hfincomeratio))]),_v(\" \"),_c('wx-text',{staticClass:\"cont-text-2\",class:_processClassBinding([])},[_v(_s(_f(\"formatDate\")(item.navdate)))])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center cont-wrap w150\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"\",class:_processClassBinding([_s(item.hfincomeratio>=0?'cont-text-3':'cont-text-4'),])},[_v(_s(item.hfincomeratio))])],1),_v(\" \"),_c('wx-view',[_c('wx-image',{staticClass:\"title-img\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/heart.png\"}})],1)],1)],1)})],2)],1)}),1)],1)],1)],1)],1)}"),
        modules:{},
        imports:[],
        templates:{},
        components:components,
      }
      

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 20 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"navigationBarTitleText":"基金"}');

/***/ }),
/* 21 */
/***/ (() => {

"use strict";


// const productInfoList = require('../../mock/productInfoList.json')
Page({
  data: {
    isAndroid: false,
    isIOS: false,
    isIPhoneX: false,
    scrollTop: 0,
    currentPage: 0,
    translateX: 0,
    currentTabOffsetLeft: 0,
    tabWidth: 150,
    newFund: false,
    blockList: [],
    animation: {},
    s: 375,
    tabTitles: [{
      title: "全部"
    }],
    //["全部","混合型","QDII","债券型","指数型","货币型"],
    // demoList: [{fundtype: "9999", fundlist: [], otherlist: []}],
    demoList: []
  },
  //事件处理函数
  bindViewTap: function bindViewTap() {
    wx.navigateTo({
      url: '../fund/fund'
    });
  },
  onLoad: function onLoad() {
    // this.myAnimation = wx.createAnimation();
    this.loadData();
    this.setData({
      s: __base__.config.env.deviceWidth || 375
    });
  },
  setPage: function setPage(e) {
    var x = Number(e.currentTarget.dataset.page);
    var i = -this.data.s * x;
    var offset = e.currentTarget.offsetLeft > this.data.s / 2 ? e.currentTarget.offsetLeft - this.data.s / 2 + e.currentTarget.offsetWidth / 2 : '';
    this.setData({
      scrollTop: 0,
      currentPage: x,
      translateX: i,
      currentTabOffsetLeft: offset
    }); // this.myAnimation.translateX(i).step();
    // this.setData({ animation: this.myAnimation.export() })
  },
  loadData: function loadData() {
    var that = this; // 本地数据mock
    //   wx.request({
    //       url: "https://m.py-axa.com/appServer/product/product/productInfoList.json?sysType=PB&channel=gh_1bc20b27f070&jsonpCallback=jsonp_1&appServertimestamp=1570756291349&_=1570756291349&callback=jsonp_1",
    //       dataType: "jsonp",
    //       method: "get",
    //       headers: {},
    //       success: function (res) {
    //           let jsonResult =  res.data.match(/jsonp_1\((\S.*)\)/)[1]
    //           that.jsonResultHelper(JSON.parse(jsonResult), {});
    //       }
    //   });

    if (wx.request) {
      wx.request({
        method: "get",
        dataType: 'jsonp',
        // url: 'https://m.py-axa.com/appServer/product/product/productInfoList.json?sysType=PB&channel=gh_1bc20b27f070&jsonpCallback=jsonp_1&appServertimestamp=1570756291349&_=1570756291349&callback=jsonp_1',
        // url: 'https://lf6skk02y.lightyy.com/productInfoList.json',
        url: 'https://76jed1uh3.lightyy.com/productInfoList.json',
        header: {},
        success: function success(res) {
          if (res && res.data) {
            // let jsonResult =  JSON.stringify(res.data).match(/jsonp_1\((\S.*)\)/)[1]
            that.jsonResultHelper(res.data, {});
          }
        },
        fail: function fail(err) {
          console.log(err);
        }
      });
    } else {// 本地数据mock
      // const productInfoList = require('../../mock/productInfoList.json')
      // that.jsonResultHelper(productInfoList, {});
    } // this.jsonResultHelper(productInfoList, {});

  },
  followQuery: function followQuery(fundList) {
    this.jsonResultHelper(fundList, {});
  },
  jsonResultHelper: function jsonResultHelper(jsonResult, followQuery) {
    //注释里面的代码为项目个性化代码,可以对着找删除
    this.setData({
      tabTitles: [{
        title: "全部"
      }],
      demoList: [],
      blockList: []
    });
    var that = this; //----------------------------------放入全部基金----------------------------------------------------

    var fundList = []; //公募基金

    var otherList = []; //货币基金

    jsonResult.productList.forEach(function (product) {
      if (followQuery && followQuery.successful && followQuery.myFollows != null) {
        followQuery.myFollows.forEach(function (myFollows) {
          if (myFollows.fundcode == product.fundcode) {
            product.heart = true;
          }
        });
      }

      product.dayinc = product.dayinc.replace('%', '');

      if (product.fundtype == '2') {
        otherList.push(product);
      } else {
        fundList.push(product); // alert(that.tableContent);
      }
    });
    that.data.demoList.push({
      fundtype: "9999",
      fundlist: fundList,
      otherlist: otherList
    }); //   that.setData({
    //       demoList: that.data.demoList
    //   })
    //----------------------------------放入全部基金--------------------------------------------

    var newfundtypes = ["混合型", "QDII", "债券型", "指数型", "货币型"]; //对基金类型进行排序

    var newfund = {
      caption: "新发",
      keyvalue: "020",
      memo: ""
    };
    var ret = [newfund];
    newfundtypes.forEach(function (fundtype) {
      jsonResult.funddisplayDict.forEach(function (fundDict) {
        var fundstr = fundDict.caption;

        if (fundstr == fundtype) {
          ret.push(fundDict);
        }
      });
    });
    ret.forEach(function (fundDict) {
      var productList = {
        fundtype: "",
        fundlist: [],
        otherlist: []
      };
      jsonResult.productList.forEach(function (product, index) {
        //----------------------------------恒生个性化设置----------------------------------
        if (product.middleextra) {
          var middleextra = JSON.parse(product.middleextra);

          if (product.fundtype == '2') {//货币

            /*var hfincomeratio = product.hfincomeratio.split(".");
            product.hfincomeratio = hfincomeratio[0] + "." + hfincomeratio[1].substring(0,middleextra.jzws);*/
          } else {
            var pernetvalue = product.pernetvalue.split(".");
            product.pernetvalue = pernetvalue[0] + "." + pernetvalue[1].substring(0, middleextra.jzws);
          }
        } //----------------------------------恒生个性化设置----------------------------------
        //----------------------------------放入新发基金------------------------------------


        if (product.fundstate == "1" && fundDict.caption == "新发") {
          product.dayinc = "--";
          product.weekinc = "--";
          product.monthinc = "--";
          product.seasonhinc = "--";
          product.halfyearhinc = "--";
          product.yearinc = "--";
          product.threeyearinc = "--";
          product.thisyearinc = "--";
          product.setupinc = "--";

          if (product.fundtype == '2') {
            productList.otherlist.push(product);
          } else {
            productList.fundlist.push(product);
          }

          return;
        } //----------------------------------放入新发基金------------------------------------


        if (product.fundstate != "1" && fundDict.caption != "新发") {
          //不是新发基金类型筛选
          if (fundDict.keyvalue == product.fundtypedisplay) {
            if (product.fundtype == '2') {
              productList.otherlist.push(product);
            } else {
              productList.fundlist.push(product);
            }
          }
        }
      });

      if (productList.fundlist.length > 0 || productList.otherlist.length > 0) {
        that.data.tabTitles.push({
          title: fundDict.caption
        });
        productList.fundtype = fundDict.keyvalue;
        that.data.demoList.push(productList); //----------------------------------放入新发基金------------------------------------

        if (fundDict.caption == "新发") {
          productList.fundlist.forEach(function (item) {
            if (item.subscribestate == '1') {
              that.data.blockList.push(item);
            }

            ;
          });

          if (productList.otherlist.length > 0) {
            productList.otherlist.forEach(function (item) {
              if (item.subscribestate == '1') {
                that.data.blockList.push(item);
              }
            });
          }

          if (that.data.blockList.length > 3) {
            that.blockList.slice(0, 3);
          }

          if (that.data.blockList.length > 0) {
            that.newFund = true;
          }
        }
      }

      that.setData({
        tabTitles: that.data.tabTitles,
        demoList: that.data.demoList
      });
    });
  }
});

/***/ }),
/* 22 */
/***/ ((module) => {


  var components = {};
  ;
      module.exports = {
        render:new Function("this.$this=this;with(this){return _c('wx-view',{staticClass:\"data-v-ac9b54\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"container log-list\",class:_processClassBinding([])},[_c('wx-view',{staticStyle:{\"background-color\":\"#f1f0f6\",\"height\":\"17.786666666666665rem\"}},[_c('wx-view',{staticClass:\"flex flex-row align-center fund-head\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 pl60 flex-column\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-12 m-color-6\",class:_processClassBinding([])},[_v(\"日涨跌幅\")]),_v(\" \"),_c('wx-text',{staticClass:\"font-20 font-bold mt15 m-color-red\",class:_processClassBinding([])},[_v(\"0.86%\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-1 pl60 flex-column\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-row align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-12 m-color-6\",class:_processClassBinding([])},[_v(\"最新净值(元)\")]),_v(\" \"),_c('wx-text',{staticClass:\"font-12 m-color-6 ml10\",class:_processClassBinding([])},[_v(\"2020-04-17\")])],1),_v(\" \"),_c('wx-text',{staticClass:\"font-20 m-color-1 font-bold mt15\",class:_processClassBinding([])},[_v(\"1.178\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-view\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center fund-mid\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-12 m-color-1 pr20 borderR\",class:_processClassBinding([])},[_v(\"混合型\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"m-color-8 ml20 mr10 font-12\",class:_processClassBinding([])},[_v(\"R3-中风险\")]),_v(\" \"),_c('wx-image',{staticClass:\"risk-icon\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/risk.png\"}})],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-12 m-color-6 pl60\",class:_processClassBinding([]),staticStyle:{\"height\":\"0.3333333333333333rem\",\"line-height\":\"0.3333333333333333rem\"}},[_v(\"申购起点\")]),_v(\" \"),_c('wx-text',{staticClass:\"font-12 m-color-6 ml10\",class:_processClassBinding([]),staticStyle:{\"height\":\"0.3333333333333333rem\",\"line-height\":\"0.3333333333333333rem\"}},[_v(\"1.00元\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"mt15 bgc-white\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex chart-head flex-row align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex columnar flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 font-bold\",class:_processClassBinding([])},[_v(\"净值走势\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-view\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-view',{staticClass:\"canvasBox\",class:_processClassBinding([])},[_c('wx-canvas',{attrs:{\"id\":\"chartline\",\"canvas-id\":\"chartline\"}})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center chartTapGroup\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"\",class:_processClassBinding([_s(chartType==1 ? 'chartTap-on':'chartTap-off'),]),attrs:{\"data-type\":\"1\"},on:{\"tap\":function($event){return $this['changeChartData'].apply(null, arguments)}}},[_v(\"近一月\")]),_v(\" \"),_c('wx-view',{staticClass:\"\",class:_processClassBinding([_s(chartType==2 ? 'chartTap-on':'chartTap-off'),]),attrs:{\"data-type\":\"2\"},on:{\"tap\":function($event){return $this['changeChartData'].apply(null, arguments)}}},[_v(\"近一季\")]),_v(\" \"),_c('wx-view',{staticClass:\"\",class:_processClassBinding([_s(chartType==3 ? 'chartTap-on':'chartTap-off'),]),attrs:{\"data-type\":\"3\"},on:{\"tap\":function($event){return $this['changeChartData'].apply(null, arguments)}}},[_v(\"近半年\")]),_v(\" \"),_c('wx-view',{staticClass:\"\",class:_processClassBinding([_s(chartType==4 ? 'chartTap-on':'chartTap-off'),]),attrs:{\"data-type\":\"4\"},on:{\"tap\":function($event){return $this['changeChartData'].apply(null, arguments)}}},[_v(\"近一年\")]),_v(\" \"),_c('wx-view',{staticClass:\"\",class:_processClassBinding([_s(chartType==5 ? 'chartTap-on':'chartTap-off'),]),attrs:{\"data-type\":\"5\"},on:{\"tap\":function($event){return $this['changeChartData'].apply(null, arguments)}}},[_v(\"成立以来\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"mt15 mb120\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex chart-head flex-row align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex columnar flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 font-bold\",class:_processClassBinding([])},[_v(\"产品档案\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-view\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row aboutlist align-center\",class:_processClassBinding([]),attrs:{\"data-src\":\"file\"},on:{\"tap\":function($event){return $this['bindViewTap'].apply(null, arguments)}}},[_c('wx-view',{staticClass:\"flex flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1\",class:_processClassBinding([])},[_v(\"基金档案\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"mr10\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-9\",class:_processClassBinding([])},[_v(\"概况\")])],1),_v(\" \"),_c('wx-image',{staticClass:\"arrow\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/arrow.png\"}}),_v(\" \"),_c('wx-view',{staticClass:\"line-view\",class:_processClassBinding([]),staticStyle:{\"left\":\"0.4rem\"}})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row aboutlist align-center\",class:_processClassBinding([]),attrs:{\"data-src\":\"managerchange\"},on:{\"tap\":function($event){return $this['bindViewTap'].apply(null, arguments)}}},[_c('wx-view',{staticClass:\"flex flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1\",class:_processClassBinding([])},[_v(\"基金经理\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"mr10\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-9\",class:_processClassBinding([])},[_v(_s(fundManagerName))])],1),_v(\" \"),_c('wx-image',{staticClass:\"arrow\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/arrow.png\"}})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row aboutlist align-center mt15\",class:_processClassBinding([]),attrs:{\"data-src\":\"rule\"},on:{\"tap\":function($event){return $this['bindViewTap'].apply(null, arguments)}}},[_c('wx-view',{staticClass:\"flex flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1\",class:_processClassBinding([])},[_v(\"交易费率\")])],1),_v(\" \"),_c('wx-image',{staticClass:\"arrow\",class:_processClassBinding([]),attrs:{\"src\":\"../../images/arrow.png\"}}),_v(\" \"),_c('wx-view',{staticClass:\"line-view\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center flex-row rule-process\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-column\",class:_processClassBinding([]),staticStyle:{\"width\":\"2.1333333333333333rem\"}},[_c('wx-text',{staticClass:\"font-14 m-color-1 t-center\",class:_processClassBinding([])},[_v(\"申请提交\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex round-box flex-1 justify-center align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"roundline\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',{staticClass:\"round\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-text',{staticClass:\"font-12 m-color-9 t-center\",class:_processClassBinding([])},[_v(\"今日15点前\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-1 flex-column\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 t-center\",class:_processClassBinding([])},[_v(\"确认份额\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex round-box flex-1 justify-center align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"roundline\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',{staticClass:\"round\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-text',{staticClass:\"font-12 m-color-9 t-center\",class:_processClassBinding([])},[_v(\"09-12 星期四\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-column\",class:_processClassBinding([]),staticStyle:{\"width\":\"2.2666666666666666rem\"}},[_c('wx-text',{staticClass:\"font-14 m-color-1 t-center\",class:_processClassBinding([])},[_v(\"查看盈亏\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex round-box flex-1 justify-center align-center\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"roundline\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',{staticClass:\"round\",class:_processClassBinding([])})],1),_v(\" \"),_c('wx-text',{staticClass:\"font-12 m-color-9 t-center\",class:_processClassBinding([])},[_v(\"09-16 星期一\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row bottomBtn\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1 align-center justify-center blue-bj\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-18 m-color-5\",class:_processClassBinding([])},[_v(\"申 购\")])],1)],1)],1)],1)],1)],1)}"),
        modules:{},
        imports:[],
        templates:{},
        components:components,
      }
      

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 24 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"navigationBarTitleText":"基金详情"}');

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// import * as echarts from '../../common/ec-canvas/echarts';
// import F2 from '../../common/f2-canvas/lib/f2';
var Charts = __webpack_require__(26);

var lineChart = null;
Page({
  data: {
    fundManagerName: '',
    drawLine: {},
    optsline: {},
    s: 375,
    chartType: 1
  },
  onLoad: function onLoad() {
    this.setData({
      s: __base__.config.env.deviceWidth || 375
    });
    var appInstance = getApp();
    var queryStr = JSON.stringify(appInstance.globalData.queryParams);

    if (queryStr.length > 2) {
      wx.showModal({
        title: '传递参数',
        content: JSON.stringify(appInstance.globalData.queryParams),
        success: function success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  },
  onReady: function onReady() {
    var that = this;
    var arr = [40, 50, 30, 70, 80, 40, 90, 60, 80, 60, 69, 80, 80, 40, 50, 30, 70, 80, 40, 77, 80, 70, 60, 50, 80]; // this.drawDemo(arr);

    this.changeChartData();
  },
  changeChartData: function changeChartData(e) {
    var type = e ? parseInt(e.target.dataset.type) : 1;
    console.log(type);
    this.setData({
      chartType: type
    });
    var x_data = [];
    var y_data = [];

    switch (type) {
      case 1:
        x_data = ["04-05", "", "", "", "", "", "", "04-20", "", "", "", "", "", "", "05-05"];
        y_data = ["1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"];
        break;

      case 2:
        x_data = ["02-05", "", "", "", "", "03-05", "", "", "", "", "", "04-05", "", "", "", "", "", "", "2021-05-05"];
        y_data = ["1.04", "1.033", "1.028", "1.035", "1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"];
        break;

      case 3:
        x_data = ["2020-11-05", "", "", "", "", "", "", "", "", "", "", "2021-03-05", "", "", "", "", "", "", "", "", "", "", "2021-05-05"];
        y_data = ["1.05", "1.052", "1.053", "1.047", "1.04", "1.033", "1.028", "1.035", "1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"];
        break;

      case 4:
        x_data = ["2020-05-05", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "2020-11-05", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "2021-05-05"];
        y_data = ["1.032", "1.039", "1.038", "1.034", "1.04", "1.039", "1.037", "1.043", "1.041", "1.047", "1.05", "1.052", "1.053", "1.047", "1.04", "1.033", "1.028", "1.035", "1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"];
        break;

      case 5:
        x_data = ["2020-02-05", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "2020-10-05", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "2021-05-05", ""];
        y_data = ["1.032", "1.039", "1.038", "1.034", "1.04", "1.039", "1.037", "1.032", "1.039", "1.038", "1.034", "1.04", "1.039", "1.037", "1.032", "1.039", "1.038", "1.034", "1.04", "1.039", "1.037", "1.032", "1.039", "1.038", "1.034", "1.04", "1.039", "1.037", "1.043", "1.041", "1.047", "1.05", "1.052", "1.053", "1.047", "1.04", "1.033", "1.028", "1.035", "1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"];
        break;

      default:
        x_data = ["04-05", "", "", "", "", "", "", "04-20", "", "", "", "", "", "", "05-05"];
        y_data = ["1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"];
    } //绘制折线图


    this.OnWxChart(x_data, y_data, '图表一');
  },
  OnWxChart: function OnWxChart(x_data, y_data, name) {
    lineChart = new Charts({
      canvasId: 'chartline',
      //输入wxml中canvas的id
      type: 'line',
      categories: x_data,
      //模拟的x轴横坐标参数
      animation: false,
      //是否开启动画
      legend: false,
      series: [{
        name: name,
        data: y_data,
        format: function format(val, name) {
          return val + '元';
        }
      }],
      xAxis: {
        //是否隐藏x轴分割线
        disableGrid: true
      },
      yAxis: {
        //y轴数据
        title: '',
        //标题
        format: function format(val) {
          //返回数值
          return val.toFixed(2);
        },
        gridColor: '#D8D8D8'
      },
      // width: this.data.s*1.5,
      // height: this.data.s*150/375*1.5,
      width: this.data.s,
      height: this.data.s * 150 / 375,
      dataLabel: false,
      //是否在图表上直接显示数据
      dataPointShape: false,
      //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'Broken' //曲线

      }
    });
  },
  bindViewTap: function bindViewTap(e) {
    var src = e.currentTarget.dataset.src;
    wx.navigateTo({
      url: '../' + src + '/' + src
    });
  },
  drawDemo: function drawDemo(arr) {
    //求数组最大值
    Array.prototype.max = function () {
      var max = this[0];
      var len = this.length;

      for (var i = 1; i < len; i++) {
        if (this[i] > max) {
          max = this[i];
        }
      }

      return max;
    };

    var width = 300,
        height = 200;
    var maxV = arr.max(); //计算y轴增量

    var yStep = height / maxV;
    var context = wx.createCanvasContext('chartline');
    context.setLineWidth(1);
    context.setStrokeStyle("#3580ee"); //context.moveTo(0, 0);//开始画图的位置

    var x_space = width / (arr.length - 1); //水平点的间隙像素           
    //context.lineTo(15, 60); x表示水平向右延伸，y表示垂直高度位置，从画板最左上角(0,0)开始计算坐标

    var xLen = 0;

    for (var i = 0; i < arr.length; i++) {
      var yValue = arr[i]; //纵坐标值

      xLen += x_space;
      var yPont = height - yValue * yStep; // console.log(yPont)

      if (i == 0) {
        xLen = 0;
      }

      var m = xLen + "," + yPont;
      context.lineTo(xLen, yPont);
    }

    context.stroke();
    context.draw();
  },
  onShow: function onShow(options) {
    var appInstance = getApp();
    console.log(appInstance.globalData.queryParams);
    console.log("options: " + JSON.stringify(appInstance.globalData.queryParams)); // wx.showModal({
    //   title: '传递参数',
    //   content: JSON.stringify(appInstance.globalData.queryParams),
    //   success(res) {
    //       if (res.confirm) {
    //           console.log('用户点击确定');
    //       } else if (res.cancel) {
    //           console.log('用户点击取消');
    //       }
    //   }
    // });
  }
});

/***/ }),
/* 26 */
/***/ ((module) => {

"use strict";
/*
 * charts for WeChat small app v1.0
 *
 * https://github.com/xiaolin3303/wx-charts
 * 2016-11-28
 *
 * Designed and built with all the love of Web
 */


var config = {
  yAxisWidth: 15,
  yAxisSplit: 5,
  xAxisHeight: 15,
  xAxisLineHeight: 15,
  legendHeight: 15,
  yAxisTitleWidth: 15,
  padding: 12,
  columePadding: 3,
  fontSize: 10,
  dataPointShape: ['diamond', 'circle', 'triangle', 'rect'],
  colors: ['#7cb5ec', '#f7a35c', '#434348', '#90ed7d', '#f15c80', '#8085e9'],
  pieChartLinePadding: 25,
  pieChartTextPadding: 15,
  xAxisTextPadding: 3,
  titleColor: '#333333',
  titleFontSize: 20,
  subtitleColor: '#999999',
  subtitleFontSize: 15,
  toolTipPadding: 3,
  toolTipBackground: '#000000',
  toolTipOpacity: 0.7,
  toolTipLineHeight: 14,
  radarGridCount: 3,
  radarLabelTextMargin: 15
}; // Object.assign polyfill
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

function assign(target, varArgs) {
  if (target == null) {
    // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(target);

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index];

    if (nextSource != null) {
      // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }

  return to;
}

var util = {
  toFixed: function toFixed(num, limit) {
    limit = limit || 2;

    if (this.isFloat(num)) {
      num = num.toFixed(limit);
    }

    return num;
  },
  isFloat: function isFloat(num) {
    return num % 1 !== 0;
  },
  approximatelyEqual: function approximatelyEqual(num1, num2) {
    return Math.abs(num1 - num2) < 1e-10;
  },
  isSameSign: function isSameSign(num1, num2) {
    return Math.abs(num1) === num1 && Math.abs(num2) === num2 || Math.abs(num1) !== num1 && Math.abs(num2) !== num2;
  },
  isSameXCoordinateArea: function isSameXCoordinateArea(p1, p2) {
    return this.isSameSign(p1.x, p2.x);
  },
  isCollision: function isCollision(obj1, obj2) {
    obj1.end = {};
    obj1.end.x = obj1.start.x + obj1.width;
    obj1.end.y = obj1.start.y - obj1.height;
    obj2.end = {};
    obj2.end.x = obj2.start.x + obj2.width;
    obj2.end.y = obj2.start.y - obj2.height;
    var flag = obj2.start.x > obj1.end.x || obj2.end.x < obj1.start.x || obj2.end.y > obj1.start.y || obj2.start.y < obj1.end.y;
    return !flag;
  }
};

function findRange(num, type, limit) {
  if (isNaN(num)) {
    throw new Error('[wxCharts] unvalid series data!');
  }

  limit = limit || 10;
  type = type ? type : 'upper';
  var multiple = 1;

  while (limit < 1) {
    limit *= 10;
    multiple *= 10;
  }

  if (type === 'upper') {
    num = Math.ceil(num * multiple);
  } else {
    num = Math.floor(num * multiple);
  }

  while (num % limit !== 0) {
    if (type === 'upper') {
      num++;
    } else {
      num--;
    }
  }

  return num / multiple;
}

function calValidDistance(distance, chartData, config, opts) {
  var dataChartAreaWidth = opts.width - config.padding - chartData.xAxisPoints[0];
  var dataChartWidth = chartData.eachSpacing * opts.categories.length;
  var validDistance = distance;

  if (distance >= 0) {
    validDistance = 0;
  } else if (Math.abs(distance) >= dataChartWidth - dataChartAreaWidth) {
    validDistance = dataChartAreaWidth - dataChartWidth;
  }

  return validDistance;
}

function isInAngleRange(angle, startAngle, endAngle) {
  function adjust(angle) {
    while (angle < 0) {
      angle += 2 * Math.PI;
    }

    while (angle > 2 * Math.PI) {
      angle -= 2 * Math.PI;
    }

    return angle;
  }

  angle = adjust(angle);
  startAngle = adjust(startAngle);
  endAngle = adjust(endAngle);

  if (startAngle > endAngle) {
    endAngle += 2 * Math.PI;

    if (angle < startAngle) {
      angle += 2 * Math.PI;
    }
  }

  return angle >= startAngle && angle <= endAngle;
}

function calRotateTranslate(x, y, h) {
  var xv = x;
  var yv = h - y;
  var transX = xv + (h - yv - xv) / Math.sqrt(2);
  transX *= -1;
  var transY = (h - yv) * (Math.sqrt(2) - 1) - (h - yv - xv) / Math.sqrt(2);
  return {
    transX: transX,
    transY: transY
  };
}

function createCurveControlPoints(points, i) {
  function isNotMiddlePoint(points, i) {
    if (points[i - 1] && points[i + 1]) {
      return points[i].y >= Math.max(points[i - 1].y, points[i + 1].y) || points[i].y <= Math.min(points[i - 1].y, points[i + 1].y);
    } else {
      return false;
    }
  }

  var a = 0.2;
  var b = 0.2;
  var pAx = null;
  var pAy = null;
  var pBx = null;
  var pBy = null;

  if (i < 1) {
    pAx = points[0].x + (points[1].x - points[0].x) * a;
    pAy = points[0].y + (points[1].y - points[0].y) * a;
  } else {
    pAx = points[i].x + (points[i + 1].x - points[i - 1].x) * a;
    pAy = points[i].y + (points[i + 1].y - points[i - 1].y) * a;
  }

  if (i > points.length - 3) {
    var last = points.length - 1;
    pBx = points[last].x - (points[last].x - points[last - 1].x) * b;
    pBy = points[last].y - (points[last].y - points[last - 1].y) * b;
  } else {
    pBx = points[i + 1].x - (points[i + 2].x - points[i].x) * b;
    pBy = points[i + 1].y - (points[i + 2].y - points[i].y) * b;
  } // fix issue https://github.com/xiaolin3303/wx-charts/issues/79


  if (isNotMiddlePoint(points, i + 1)) {
    pBy = points[i + 1].y;
  }

  if (isNotMiddlePoint(points, i)) {
    pAy = points[i].y;
  }

  return {
    ctrA: {
      x: pAx,
      y: pAy
    },
    ctrB: {
      x: pBx,
      y: pBy
    }
  };
}

function convertCoordinateOrigin(x, y, center) {
  return {
    x: center.x + x,
    y: center.y - y
  };
}

function avoidCollision(obj, target) {
  if (target) {
    // is collision test
    while (util.isCollision(obj, target)) {
      if (obj.start.x > 0) {
        obj.start.y--;
      } else if (obj.start.x < 0) {
        obj.start.y++;
      } else {
        if (obj.start.y > 0) {
          obj.start.y++;
        } else {
          obj.start.y--;
        }
      }
    }
  }

  return obj;
}

function fillSeriesColor(series, config) {
  var index = 0;
  return series.map(function (item) {
    if (!item.color) {
      item.color = config.colors[index];
      index = (index + 1) % config.colors.length;
    }

    return item;
  });
}

function getDataRange(minData, maxData) {
  var limit = 0;
  var range = maxData - minData;

  if (range >= 10000) {
    limit = 1000;
  } else if (range >= 1000) {
    limit = 100;
  } else if (range >= 100) {
    limit = 10;
  } else if (range >= 10) {
    limit = 5;
  } else if (range >= 1) {
    limit = 1;
  } else if (range >= 0.1) {
    limit = 0.1;
  } else {
    limit = 0.01;
  }

  return {
    minRange: findRange(minData, 'lower', limit),
    maxRange: findRange(maxData, 'upper', limit)
  };
}

function measureText(text) {
  var fontSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10; // wx canvas 未实现measureText方法, 此处自行实现

  text = String(text);
  var text = text.split('');
  var width = 0;
  text.forEach(function (item) {
    if (/[a-zA-Z]/.test(item)) {
      width += 7;
    } else if (/[0-9]/.test(item)) {
      width += 5.5;
    } else if (/\./.test(item)) {
      width += 2.7;
    } else if (/-/.test(item)) {
      width += 3.25;
    } else if (/[\u4e00-\u9fa5]/.test(item)) {
      width += 10;
    } else if (/\(|\)/.test(item)) {
      width += 3.73;
    } else if (/\s/.test(item)) {
      width += 2.5;
    } else if (/%/.test(item)) {
      width += 8;
    } else {
      width += 10;
    }
  });
  return width * fontSize / 10;
}

function dataCombine(series) {
  return series.reduce(function (a, b) {
    return (a.data ? a.data : a).concat(b.data);
  }, []);
}

function getSeriesDataItem(series, index) {
  var data = [];
  series.forEach(function (item) {
    if (item.data[index] !== null && typeof item.data[index] !== 'undefined') {
      var seriesItem = {};
      seriesItem.color = item.color;
      seriesItem.name = item.name;
      seriesItem.data = item.format ? item.format(item.data[index]) : item.data[index];
      data.push(seriesItem);
    }
  });
  return data;
}

function getMaxTextListLength(list) {
  var lengthList = list.map(function (item) {
    return measureText(item);
  });
  return Math.max.apply(null, lengthList);
}

function getRadarCoordinateSeries(length) {
  var eachAngle = 2 * Math.PI / length;
  var CoordinateSeries = [];

  for (var i = 0; i < length; i++) {
    CoordinateSeries.push(eachAngle * i);
  }

  return CoordinateSeries.map(function (item) {
    return -1 * item + Math.PI / 2;
  });
}

function getToolTipData(seriesData, calPoints, index, categories) {
  var option = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var textList = seriesData.map(function (item) {
    return {
      text: option.format ? option.format(item, categories[index]) : item.name + ': ' + item.data,
      color: item.color
    };
  });
  var validCalPoints = [];
  var offset = {
    x: 0,
    y: 0
  };
  calPoints.forEach(function (points) {
    if (typeof points[index] !== 'undefined' && points[index] !== null) {
      validCalPoints.push(points[index]);
    }
  });
  validCalPoints.forEach(function (item) {
    offset.x = Math.round(item.x);
    offset.y += item.y;
  });
  offset.y /= validCalPoints.length;
  return {
    textList: textList,
    offset: offset
  };
}

function findCurrentIndex(currentPoints, xAxisPoints, opts, config) {
  var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var currentIndex = -1;

  if (isInExactChartArea(currentPoints, opts, config)) {
    xAxisPoints.forEach(function (item, index) {
      if (currentPoints.x + offset > item) {
        currentIndex = index;
      }
    });
  }

  return currentIndex;
}

function isInExactChartArea(currentPoints, opts, config) {
  return currentPoints.x < opts.width - config.padding && currentPoints.x > config.padding + config.yAxisWidth + config.yAxisTitleWidth && currentPoints.y > config.padding && currentPoints.y < opts.height - config.legendHeight - config.xAxisHeight - config.padding;
}

function findRadarChartCurrentIndex(currentPoints, radarData, count) {
  var eachAngleArea = 2 * Math.PI / count;
  var currentIndex = -1;

  if (isInExactPieChartArea(currentPoints, radarData.center, radarData.radius)) {
    var fixAngle = function fixAngle(angle) {
      if (angle < 0) {
        angle += 2 * Math.PI;
      }

      if (angle > 2 * Math.PI) {
        angle -= 2 * Math.PI;
      }

      return angle;
    };

    var angle = Math.atan2(radarData.center.y - currentPoints.y, currentPoints.x - radarData.center.x);
    angle = -1 * angle;

    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    var angleList = radarData.angleList.map(function (item) {
      item = fixAngle(-1 * item);
      return item;
    });
    angleList.forEach(function (item, index) {
      var rangeStart = fixAngle(item - eachAngleArea / 2);
      var rangeEnd = fixAngle(item + eachAngleArea / 2);

      if (rangeEnd < rangeStart) {
        rangeEnd += 2 * Math.PI;
      }

      if (angle >= rangeStart && angle <= rangeEnd || angle + 2 * Math.PI >= rangeStart && angle + 2 * Math.PI <= rangeEnd) {
        currentIndex = index;
      }
    });
  }

  return currentIndex;
}

function findPieChartCurrentIndex(currentPoints, pieData) {
  var currentIndex = -1;

  if (isInExactPieChartArea(currentPoints, pieData.center, pieData.radius)) {
    var angle = Math.atan2(pieData.center.y - currentPoints.y, currentPoints.x - pieData.center.x);
    angle = -angle;

    for (var i = 0, len = pieData.series.length; i < len; i++) {
      var item = pieData.series[i];

      if (isInAngleRange(angle, item._start_, item._start_ + item._proportion_ * 2 * Math.PI)) {
        currentIndex = i;
        break;
      }
    }
  }

  return currentIndex;
}

function isInExactPieChartArea(currentPoints, center, radius) {
  return Math.pow(currentPoints.x - center.x, 2) + Math.pow(currentPoints.y - center.y, 2) <= Math.pow(radius, 2);
}

function splitPoints(points) {
  var newPoints = [];
  var items = [];
  points.forEach(function (item, index) {
    if (item !== null) {
      items.push(item);
    } else {
      if (items.length) {
        newPoints.push(items);
      }

      items = [];
    }
  });

  if (items.length) {
    newPoints.push(items);
  }

  return newPoints;
}

function calLegendData(series, opts, config) {
  if (opts.legend === false) {
    return {
      legendList: [],
      legendHeight: 0
    };
  }

  var padding = 5;
  var marginTop = 8;
  var shapeWidth = 15;
  var legendList = [];
  var widthCount = 0;
  var currentRow = [];
  series.forEach(function (item) {
    var itemWidth = 3 * padding + shapeWidth + measureText(item.name || 'undefined');

    if (widthCount + itemWidth > opts.width) {
      legendList.push(currentRow);
      widthCount = itemWidth;
      currentRow = [item];
    } else {
      widthCount += itemWidth;
      currentRow.push(item);
    }
  });

  if (currentRow.length) {
    legendList.push(currentRow);
  }

  return {
    legendList: legendList,
    legendHeight: legendList.length * (config.fontSize + marginTop) + padding
  };
}

function calCategoriesData(categories, opts, config) {
  var result = {
    angle: 0,
    xAxisHeight: config.xAxisHeight
  };

  var _getXAxisPoints = getXAxisPoints(categories, opts, config),
      eachSpacing = _getXAxisPoints.eachSpacing; // get max length of categories text


  var categoriesTextLenth = categories.map(function (item) {
    return measureText(item);
  });
  var maxTextLength = Math.max.apply(this, categoriesTextLenth);

  if (maxTextLength + 2 * config.xAxisTextPadding > eachSpacing) {
    result.angle = 45 * Math.PI / 180;
    result.xAxisHeight = 2 * config.xAxisTextPadding + maxTextLength * Math.sin(result.angle);
  }

  return result;
}

function getRadarDataPoints(angleList, center, radius, series, opts) {
  var process = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var radarOption = opts.extra.radar || {};
  radarOption.max = radarOption.max || 0;
  var maxData = Math.max(radarOption.max, Math.max.apply(null, dataCombine(series)));
  var data = [];
  series.forEach(function (each) {
    var listItem = {};
    listItem.color = each.color;
    listItem.data = [];
    each.data.forEach(function (item, index) {
      var tmp = {};
      tmp.angle = angleList[index];
      tmp.proportion = item / maxData;
      tmp.position = convertCoordinateOrigin(radius * tmp.proportion * process * Math.cos(tmp.angle), radius * tmp.proportion * process * Math.sin(tmp.angle), center);
      listItem.data.push(tmp);
    });
    data.push(listItem);
  });
  return data;
}

function getPieDataPoints(series) {
  var process = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var count = 0;
  var _start_ = 0;
  series.forEach(function (item) {
    item.data = item.data === null ? 0 : item.data;
    count += item.data;
  });
  series.forEach(function (item) {
    item.data = item.data === null ? 0 : item.data;
    item._proportion_ = item.data / count * process;
  });
  series.forEach(function (item) {
    item._start_ = _start_;
    _start_ += 2 * item._proportion_ * Math.PI;
  });
  return series;
}

function getPieTextMaxLength(series) {
  series = getPieDataPoints(series);
  var maxLength = 0;
  series.forEach(function (item) {
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    maxLength = Math.max(maxLength, measureText(text));
  });
  return maxLength;
}

function fixColumeData(points, eachSpacing, columnLen, index, config, opts) {
  return points.map(function (item) {
    if (item === null) {
      return null;
    }

    item.width = (eachSpacing - 2 * config.columePadding) / columnLen;

    if (opts.extra.column && opts.extra.column.width && +opts.extra.column.width > 0) {
      // customer column width
      item.width = Math.min(item.width, +opts.extra.column.width);
    } else {
      // default width should less tran 25px
      // don't ask me why, I don't know
      item.width = Math.min(item.width, 25);
    }

    item.x += (index + 0.5 - columnLen / 2) * item.width;
    return item;
  });
}

function getXAxisPoints(categories, opts, config) {
  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
  var spacingValid = opts.width - 2 * config.padding - yAxisTotalWidth;
  var dataCount = opts.enableScroll ? Math.min(5, categories.length) : categories.length;
  var eachSpacing = spacingValid / dataCount;
  var xAxisPoints = [];
  var startX = config.padding + yAxisTotalWidth;
  var endX = opts.width - config.padding;
  categories.forEach(function (item, index) {
    xAxisPoints.push(startX + index * eachSpacing);
  });

  if (opts.enableScroll === true) {
    xAxisPoints.push(startX + categories.length * eachSpacing);
  } else {
    xAxisPoints.push(endX);
  }

  return {
    xAxisPoints: xAxisPoints,
    startX: startX,
    endX: endX,
    eachSpacing: eachSpacing
  };
}

function getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config) {
  var process = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 1;
  var points = [];
  var validHeight = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  data.forEach(function (item, index) {
    if (item === null) {
      points.push(null);
    } else {
      var point = {};
      point.x = xAxisPoints[index] + Math.round(eachSpacing / 2);
      var height = validHeight * (item - minRange) / (maxRange - minRange);
      height *= process;
      point.y = opts.height - config.xAxisHeight - config.legendHeight - Math.round(height) - config.padding;
      points.push(point);
    }
  });
  return points;
}

function getYAxisTextList(series, opts, config) {
  var data = dataCombine(series); // remove null from data

  data = data.filter(function (item) {
    return item !== null;
  });
  var minData = Math.min.apply(this, data);
  var maxData = Math.max.apply(this, data);

  if (typeof opts.yAxis.min === 'number') {
    minData = Math.min(opts.yAxis.min, minData);
  }

  if (typeof opts.yAxis.max === 'number') {
    maxData = Math.max(opts.yAxis.max, maxData);
  } // fix issue https://github.com/xiaolin3303/wx-charts/issues/9


  if (minData === maxData) {
    var rangeSpan = maxData || 1;
    minData -= rangeSpan;
    maxData += rangeSpan;
  }

  var dataRange = getDataRange(minData, maxData);
  var minRange = dataRange.minRange;
  var maxRange = dataRange.maxRange;
  var range = [];
  var eachRange = (maxRange - minRange) / config.yAxisSplit;

  for (var i = 0; i <= config.yAxisSplit; i++) {
    range.push(minRange + eachRange * i);
  }

  return range.reverse();
}

function calYAxisData(series, opts, config) {
  var ranges = getYAxisTextList(series, opts, config);
  var yAxisWidth = config.yAxisWidth;
  var rangesFormat = ranges.map(function (item) {
    item = util.toFixed(item, 2);
    item = opts.yAxis.format ? opts.yAxis.format(Number(item)) : item;
    yAxisWidth = Math.max(yAxisWidth, measureText(item) + 5);
    return item;
  });

  if (opts.yAxis.disabled === true) {
    yAxisWidth = 0;
  }

  return {
    rangesFormat: rangesFormat,
    ranges: ranges,
    yAxisWidth: yAxisWidth
  };
}

function drawPointShape(points, color, shape, context) {
  context.beginPath();
  context.setStrokeStyle("#ffffff");
  context.setLineWidth(1);
  context.setFillStyle(color);

  if (shape === 'diamond') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y);
        context.lineTo(item.x, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  } else if (shape === 'circle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x + 3.5, item.y);
        context.arc(item.x, item.y, 4, 0, 2 * Math.PI, false);
      }
    });
  } else if (shape === 'rect') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x - 3.5, item.y - 3.5);
        context.rect(item.x - 3.5, item.y - 3.5, 7, 7);
      }
    });
  } else if (shape === 'triangle') {
    points.forEach(function (item, index) {
      if (item !== null) {
        context.moveTo(item.x, item.y - 4.5);
        context.lineTo(item.x - 4.5, item.y + 4.5);
        context.lineTo(item.x + 4.5, item.y + 4.5);
        context.lineTo(item.x, item.y - 4.5);
      }
    });
  }

  context.closePath();
  context.fill();
  context.stroke();
}

function drawRingTitle(opts, config, context) {
  var titlefontSize = opts.title.fontSize || config.titleFontSize;
  var subtitlefontSize = opts.subtitle.fontSize || config.subtitleFontSize;
  var title = opts.title.name || '';
  var subtitle = opts.subtitle.name || '';
  var titleFontColor = opts.title.color || config.titleColor;
  var subtitleFontColor = opts.subtitle.color || config.subtitleColor;
  var titleHeight = title ? titlefontSize : 0;
  var subtitleHeight = subtitle ? subtitlefontSize : 0;
  var margin = 5;

  if (subtitle) {
    var textWidth = measureText(subtitle, subtitlefontSize);
    var startX = (opts.width - textWidth) / 2 + (opts.subtitle.offsetX || 0);
    var startY = (opts.height - config.legendHeight + subtitlefontSize) / 2;

    if (title) {
      startY -= (titleHeight + margin) / 2;
    }

    context.beginPath(); // context.setFontSize(subtitlefontSize);

    context.setFillStyle(subtitleFontColor);
    context.fillText(subtitle, startX, startY);
    context.stroke();
    context.closePath();
  }

  if (title) {
    var _textWidth = measureText(title, titlefontSize);

    var _startX = (opts.width - _textWidth) / 2 + (opts.title.offsetX || 0);

    var _startY = (opts.height - config.legendHeight + titlefontSize) / 2;

    if (subtitle) {
      _startY += (subtitleHeight + margin) / 2;
    }

    context.beginPath(); // context.setFontSize(titlefontSize);

    context.setFillStyle(titleFontColor);
    context.fillText(title, _startX, _startY);
    context.stroke();
    context.closePath();
  }
}

function drawPointText(points, series, config, context) {
  // 绘制数据文案
  var data = series.data;
  context.beginPath(); // context.setFontSize(config.fontSize);

  context.setFillStyle('#666666');
  points.forEach(function (item, index) {
    if (item !== null) {
      var formatVal = series.format ? series.format(data[index]) : data[index];
      context.fillText(formatVal, item.x - measureText(formatVal) / 2, item.y - 2);
    }
  });
  context.closePath();
  context.stroke();
}

function drawRadarLabel(angleList, radius, centerPosition, opts, config, context) {
  var radarOption = opts.extra.radar || {};
  radius += config.radarLabelTextMargin;
  context.beginPath(); // context.setFontSize(config.fontSize);

  context.setFillStyle(radarOption.labelColor || '#666666');
  angleList.forEach(function (angle, index) {
    var pos = {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
    var posRelativeCanvas = convertCoordinateOrigin(pos.x, pos.y, centerPosition);
    var startX = posRelativeCanvas.x;
    var startY = posRelativeCanvas.y;

    if (util.approximatelyEqual(pos.x, 0)) {
      startX -= measureText(opts.categories[index] || '') / 2;
    } else if (pos.x < 0) {
      startX -= measureText(opts.categories[index] || '');
    }

    context.fillText(opts.categories[index] || '', startX, startY + config.fontSize / 2);
  });
  context.stroke();
  context.closePath();
}

function drawPieText(series, opts, config, context, radius, center) {
  var lineRadius = radius + config.pieChartLinePadding;
  var textObjectCollection = [];
  var lastTextObject = null;
  var seriesConvert = series.map(function (item) {
    var arc = 2 * Math.PI - (item._start_ + 2 * Math.PI * item._proportion_ / 2);
    var text = item.format ? item.format(+item._proportion_.toFixed(2)) : util.toFixed(item._proportion_ * 100) + '%';
    var color = item.color;
    return {
      arc: arc,
      text: text,
      color: color
    };
  });
  seriesConvert.forEach(function (item) {
    // line end
    var orginX1 = Math.cos(item.arc) * lineRadius;
    var orginY1 = Math.sin(item.arc) * lineRadius; // line start

    var orginX2 = Math.cos(item.arc) * radius;
    var orginY2 = Math.sin(item.arc) * radius; // text start

    var orginX3 = orginX1 >= 0 ? orginX1 + config.pieChartTextPadding : orginX1 - config.pieChartTextPadding;
    var orginY3 = orginY1;
    var textWidth = measureText(item.text);
    var startY = orginY3;

    if (lastTextObject && util.isSameXCoordinateArea(lastTextObject.start, {
      x: orginX3
    })) {
      if (orginX3 > 0) {
        startY = Math.min(orginY3, lastTextObject.start.y);
      } else if (orginX1 < 0) {
        startY = Math.max(orginY3, lastTextObject.start.y);
      } else {
        if (orginY3 > 0) {
          startY = Math.max(orginY3, lastTextObject.start.y);
        } else {
          startY = Math.min(orginY3, lastTextObject.start.y);
        }
      }
    }

    if (orginX3 < 0) {
      orginX3 -= textWidth;
    }

    var textObject = {
      lineStart: {
        x: orginX2,
        y: orginY2
      },
      lineEnd: {
        x: orginX1,
        y: orginY1
      },
      start: {
        x: orginX3,
        y: startY
      },
      width: textWidth,
      height: config.fontSize,
      text: item.text,
      color: item.color
    };
    lastTextObject = avoidCollision(textObject, lastTextObject);
    textObjectCollection.push(lastTextObject);
  });
  textObjectCollection.forEach(function (item) {
    var lineStartPoistion = convertCoordinateOrigin(item.lineStart.x, item.lineStart.y, center);
    var lineEndPoistion = convertCoordinateOrigin(item.lineEnd.x, item.lineEnd.y, center);
    var textPosition = convertCoordinateOrigin(item.start.x, item.start.y, center);
    context.setLineWidth(1); // context.setFontSize(config.fontSize);

    context.beginPath();
    context.setStrokeStyle(item.color);
    context.setFillStyle(item.color);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    var curveStartX = item.start.x < 0 ? textPosition.x + item.width : textPosition.x;
    var textStartX = item.start.x < 0 ? textPosition.x - 5 : textPosition.x + 5;
    context.quadraticCurveTo(lineEndPoistion.x, lineEndPoistion.y, curveStartX, textPosition.y);
    context.moveTo(lineStartPoistion.x, lineStartPoistion.y);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(textPosition.x + item.width, textPosition.y);
    context.arc(curveStartX, textPosition.y, 2, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.beginPath();
    context.setFillStyle('#666666');
    context.fillText(item.text, textStartX, textPosition.y + 3);
    context.closePath();
    context.stroke();
    context.closePath();
  });
}

function drawToolTipSplitLine(offsetX, opts, config, context) {
  var startY = config.padding;
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
  context.beginPath();
  context.setStrokeStyle('#cccccc');
  context.setLineWidth(1);
  context.moveTo(offsetX, startY);
  context.lineTo(offsetX, endY);
  context.stroke();
  context.closePath();
}

function drawToolTip(textList, offset, opts, config, context) {
  var legendWidth = 4;
  var legendMarginRight = 5;
  var arrowWidth = 8;
  var isOverRightBorder = false;
  offset = assign({
    x: 0,
    y: 0
  }, offset);
  offset.y -= 8;
  var textWidth = textList.map(function (item) {
    return measureText(item.text);
  });
  var toolTipWidth = legendWidth + legendMarginRight + 4 * config.toolTipPadding + Math.max.apply(null, textWidth);
  var toolTipHeight = 2 * config.toolTipPadding + textList.length * config.toolTipLineHeight; // if beyond the right border

  if (offset.x - Math.abs(opts._scrollDistance_) + arrowWidth + toolTipWidth > opts.width) {
    isOverRightBorder = true;
  } // draw background rect


  context.beginPath();
  context.setFillStyle(opts.tooltip.option.background || config.toolTipBackground);
  context.setGlobalAlpha(config.toolTipOpacity);

  if (isOverRightBorder) {
    context.moveTo(offset.x, offset.y + 10);
    context.lineTo(offset.x - arrowWidth, offset.y + 10 - 5);
    context.lineTo(offset.x - arrowWidth, offset.y + 10 + 5);
    context.moveTo(offset.x, offset.y + 10);
    context.fillRect(offset.x - toolTipWidth - arrowWidth, offset.y, toolTipWidth, toolTipHeight);
  } else {
    context.moveTo(offset.x, offset.y + 10);
    context.lineTo(offset.x + arrowWidth, offset.y + 10 - 5);
    context.lineTo(offset.x + arrowWidth, offset.y + 10 + 5);
    context.moveTo(offset.x, offset.y + 10);
    context.fillRect(offset.x + arrowWidth, offset.y, toolTipWidth, toolTipHeight);
  }

  context.closePath();
  context.fill();
  context.setGlobalAlpha(1); // draw legend

  textList.forEach(function (item, index) {
    context.beginPath();
    context.setFillStyle(item.color);
    var startX = offset.x + arrowWidth + 2 * config.toolTipPadding;
    var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;

    if (isOverRightBorder) {
      startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding;
    }

    context.fillRect(startX, startY, legendWidth, config.fontSize);
    context.closePath();
  }); // draw text list

  context.beginPath(); // context.setFontSize(config.fontSize);

  context.setFillStyle('#ffffff');
  textList.forEach(function (item, index) {
    var startX = offset.x + arrowWidth + 2 * config.toolTipPadding + legendWidth + legendMarginRight;

    if (isOverRightBorder) {
      startX = offset.x - toolTipWidth - arrowWidth + 2 * config.toolTipPadding + +legendWidth + legendMarginRight;
    }

    var startY = offset.y + (config.toolTipLineHeight - config.fontSize) / 2 + config.toolTipLineHeight * index + config.toolTipPadding;
    context.fillText(item.text, startX, startY + config.fontSize);
  });
  context.stroke();
  context.closePath();
}

function drawYAxisTitle(title, opts, config, context) {
  var startX = config.xAxisHeight + (opts.height - config.xAxisHeight - measureText(title)) / 2;
  context.save();
  context.beginPath(); // context.setFontSize(config.fontSize);

  context.setFillStyle(opts.yAxis.titleFontColor || '#333333');
  context.translate(0, opts.height);
  context.rotate(-90 * Math.PI / 180);
  context.fillText(title, startX, config.padding + 0.5 * config.fontSize);
  context.stroke();
  context.closePath();
  context.restore();
}

function drawColumnDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var _calYAxisData = calYAxisData(series, opts, config),
      ranges = _calYAxisData.ranges;

  var _getXAxisPoints = getXAxisPoints(opts.categories, opts, config),
      xAxisPoints = _getXAxisPoints.xAxisPoints,
      eachSpacing = _getXAxisPoints.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  context.save();

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts); // 绘制柱状数据图

    context.beginPath();
    context.setFillStyle(eachSeries.color);
    points.forEach(function (item, index) {
      if (item !== null) {
        var startX = item.x - item.width / 2 + 1;
        var height = opts.height - item.y - config.padding - config.xAxisHeight - config.legendHeight;
        context.moveTo(startX, item.y);
        context.rect(startX, item.y, item.width - 2, height);
      }
    });
    context.closePath();
    context.fill();
  });
  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    points = fixColumeData(points, eachSpacing, series.length, seriesIndex, config, opts);

    if (opts.dataLabel !== false && process === 1) {
      drawPointText(points, eachSeries, config, context);
    }
  });
  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    eachSpacing: eachSpacing
  };
}

function drawAreaDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var _calYAxisData2 = calYAxisData(series, opts, config),
      ranges = _calYAxisData2.ranges;

  var _getXAxisPoints2 = getXAxisPoints(opts.categories, opts, config),
      xAxisPoints = _getXAxisPoints2.xAxisPoints,
      eachSpacing = _getXAxisPoints2.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
  var calPoints = [];
  context.save();

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points);
    splitPointList.forEach(function (points) {
      // 绘制区域数据
      context.beginPath();
      context.setStrokeStyle(eachSeries.color);
      context.setFillStyle(eachSeries.color);
      context.setGlobalAlpha(0.6);
      context.setLineWidth(2);

      if (points.length > 1) {
        var firstPoint = points[0];
        var lastPoint = points[points.length - 1];
        context.moveTo(firstPoint.x, firstPoint.y);

        if (opts.extra.lineStyle === 'curve') {
          points.forEach(function (item, index) {
            if (index > 0) {
              var ctrlPoint = createCurveControlPoints(points, index - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          });
        } else {
          points.forEach(function (item, index) {
            if (index > 0) {
              context.lineTo(item.x, item.y);
            }
          });
        }

        context.lineTo(lastPoint.x, endY);
        context.lineTo(firstPoint.x, endY);
        context.lineTo(firstPoint.x, firstPoint.y);
      } else {
        var item = points[0];
        context.moveTo(item.x - eachSpacing / 2, item.y);
        context.lineTo(item.x + eachSpacing / 2, item.y);
        context.lineTo(item.x + eachSpacing / 2, endY);
        context.lineTo(item.x - eachSpacing / 2, endY);
        context.moveTo(item.x - eachSpacing / 2, item.y);
      }

      context.closePath();
      context.fill();
      context.setGlobalAlpha(1);
    });

    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      drawPointShape(points, eachSeries.color, shape, context);
    }
  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context);
    });
  }

  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing
  };
}

function drawLineDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

  var _calYAxisData3 = calYAxisData(series, opts, config),
      ranges = _calYAxisData3.ranges;

  var _getXAxisPoints3 = getXAxisPoints(opts.categories, opts, config),
      xAxisPoints = _getXAxisPoints3.xAxisPoints,
      eachSpacing = _getXAxisPoints3.eachSpacing;

  var minRange = ranges.pop();
  var maxRange = ranges.shift();
  var calPoints = [];
  context.save();

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTipSplitLine(opts.tooltip.offset.x, opts, config, context);
  }

  series.forEach(function (eachSeries, seriesIndex) {
    var data = eachSeries.data;
    var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
    calPoints.push(points);
    var splitPointList = splitPoints(points);
    splitPointList.forEach(function (points, index) {
      context.beginPath();
      context.setStrokeStyle(eachSeries.color);
      context.setLineWidth(2);

      if (points.length === 1) {
        context.moveTo(points[0].x, points[0].y);
        context.arc(points[0].x, points[0].y, 1, 0, 2 * Math.PI);
      } else {
        context.moveTo(points[0].x, points[0].y);

        if (opts.extra.lineStyle === 'curve') {
          points.forEach(function (item, index) {
            if (index > 0) {
              var ctrlPoint = createCurveControlPoints(points, index - 1);
              context.bezierCurveTo(ctrlPoint.ctrA.x, ctrlPoint.ctrA.y, ctrlPoint.ctrB.x, ctrlPoint.ctrB.y, item.x, item.y);
            }
          });
        } else {
          points.forEach(function (item, index) {
            if (index > 0) {
              context.lineTo(item.x, item.y);
            }
          });
        }

        context.moveTo(points[0].x, points[0].y);
      }

      context.closePath();
      context.stroke();
    });

    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      drawPointShape(points, eachSeries.color, shape, context);
    }
  });

  if (opts.dataLabel !== false && process === 1) {
    series.forEach(function (eachSeries, seriesIndex) {
      var data = eachSeries.data;
      var points = getDataPoints(data, minRange, maxRange, xAxisPoints, eachSpacing, opts, config, process);
      drawPointText(points, eachSeries, config, context);
    });
  }

  context.restore();
  return {
    xAxisPoints: xAxisPoints,
    calPoints: calPoints,
    eachSpacing: eachSpacing
  };
}

function drawToolTipBridge(opts, config, context, process) {
  context.save();

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0 && opts.enableScroll === true) {
    context.translate(opts._scrollDistance_, 0);
  }

  if (opts.tooltip && opts.tooltip.textList && opts.tooltip.textList.length && process === 1) {
    drawToolTip(opts.tooltip.textList, opts.tooltip.offset, opts, config, context);
  }

  context.restore();
}

function drawXAxis(categories, opts, config, context) {
  var _getXAxisPoints4 = getXAxisPoints(categories, opts, config),
      xAxisPoints = _getXAxisPoints4.xAxisPoints,
      startX = _getXAxisPoints4.startX,
      endX = _getXAxisPoints4.endX,
      eachSpacing = _getXAxisPoints4.eachSpacing;

  var startY = opts.height - config.padding - config.xAxisHeight - config.legendHeight;
  var endY = startY + config.xAxisLineHeight;
  context.save();

  if (opts._scrollDistance_ && opts._scrollDistance_ !== 0) {
    context.translate(opts._scrollDistance_, 0);
  }

  context.beginPath();
  context.setStrokeStyle(opts.xAxis.gridColor || "#cccccc");

  if (opts.xAxis.disableGrid !== true) {
    if (opts.xAxis.type === 'calibration') {
      xAxisPoints.forEach(function (item, index) {
        if (index > 0) {
          context.moveTo(item - eachSpacing / 2, startY);
          context.lineTo(item - eachSpacing / 2, startY + 4);
        }
      });
    } else {
      xAxisPoints.forEach(function (item, index) {
        context.moveTo(item, startY);
        context.lineTo(item, endY);
      });
    }
  }

  context.closePath();
  context.stroke(); // 对X轴列表做抽稀处理

  var validWidth = opts.width - 2 * config.padding - config.yAxisWidth - config.yAxisTitleWidth;
  var maxXAxisListLength = Math.min(categories.length, Math.ceil(validWidth / config.fontSize / 1.5));
  var ratio = Math.ceil(categories.length / maxXAxisListLength);
  categories = categories.map(function (item, index) {
    return index % ratio !== 0 ? '' : item;
  });

  if (config._xAxisTextAngle_ === 0) {
    context.beginPath(); // context.setFontSize(config.fontSize);

    context.setFillStyle(opts.xAxis.fontColor || '#666666');
    categories.forEach(function (item, index) {
      var offset = eachSpacing / 2 - measureText(item) / 2;
      context.fillText(item, xAxisPoints[index] + offset, startY + config.fontSize + 5);
    });
    context.closePath();
    context.stroke();
  } else {
    categories.forEach(function (item, index) {
      context.save();
      context.beginPath(); // context.setFontSize(config.fontSize);

      context.setFillStyle(opts.xAxis.fontColor || '#666666');
      var textWidth = measureText(item);
      var offset = eachSpacing / 2 - textWidth; // var _calRotateTranslate = calRotateTranslate(xAxisPoints[index] + eachSpacing / 2, startY + config.fontSize / 2 + 5, opts.height),
      //     transX = _calRotateTranslate.transX,
      //     transY = _calRotateTranslate.transY;
      // context.rotate(-1 * config._xAxisTextAngle_);
      // context.translate(transX, transY);

      context.fillText(item, xAxisPoints[index] + offset, startY + config.fontSize + 5);
      context.closePath();
      context.stroke();
      context.restore();
    });
  }

  context.restore();
}

function drawYAxisGrid(opts, config, context) {
  var spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  var eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
  var startX = config.padding + yAxisTotalWidth;
  var endX = opts.width - config.padding;
  var points = [];

  for (var i = 0; i < config.yAxisSplit; i++) {
    points.push(config.padding + eachSpacing * i);
  }

  points.push(config.padding + eachSpacing * config.yAxisSplit + 2);
  context.beginPath();
  context.setStrokeStyle(opts.yAxis.gridColor || "#cccccc");
  context.setLineWidth(1);
  points.forEach(function (item, index) {
    context.moveTo(startX, item);
    context.lineTo(endX, item);
  });
  context.closePath();
  context.stroke();
}

function drawYAxis(series, opts, config, context) {
  if (opts.yAxis.disabled === true) {
    return;
  }

  var _calYAxisData4 = calYAxisData(series, opts, config),
      rangesFormat = _calYAxisData4.rangesFormat;

  var yAxisTotalWidth = config.yAxisWidth + config.yAxisTitleWidth;
  var spacingValid = opts.height - 2 * config.padding - config.xAxisHeight - config.legendHeight;
  var eachSpacing = Math.floor(spacingValid / config.yAxisSplit);
  var startX = config.padding + yAxisTotalWidth;
  var endX = opts.width - config.padding;
  var endY = opts.height - config.padding - config.xAxisHeight - config.legendHeight; // set YAxis background

  context.setFillStyle(opts.background || '#ffffff');

  if (opts._scrollDistance_ < 0) {
    context.fillRect(0, 0, startX, endY + config.xAxisHeight + 5);
  }

  context.fillRect(endX, 0, opts.width, endY + config.xAxisHeight + 5);
  var points = [];

  for (var i = 0; i <= config.yAxisSplit; i++) {
    points.push(config.padding + eachSpacing * i);
  }

  context.stroke();
  context.beginPath(); // context.setFontSize(config.fontSize);

  context.setFillStyle(opts.yAxis.fontColor || '#666666');
  rangesFormat.forEach(function (item, index) {
    var pos = points[index] ? points[index] : endY;
    context.fillText(item, config.padding + config.yAxisTitleWidth, pos + config.fontSize / 2);
  });
  context.closePath();
  context.stroke();

  if (opts.yAxis.title) {
    drawYAxisTitle(opts.yAxis.title, opts, config, context);
  }
}

function drawLegend(series, opts, config, context) {
  if (!opts.legend) {
    return;
  } // each legend shape width 15px
  // the spacing between shape and text in each legend is the `padding`
  // each legend spacing is the `padding`
  // legend margin top `config.padding`


  var _calLegendData = calLegendData(series, opts, config),
      legendList = _calLegendData.legendList;

  var padding = 5;
  var marginTop = 8;
  var shapeWidth = 15;
  legendList.forEach(function (itemList, listIndex) {
    var width = 0;
    itemList.forEach(function (item) {
      item.name = item.name || 'undefined';
      width += 3 * padding + measureText(item.name) + shapeWidth;
    });
    var startX = (opts.width - width) / 2 + padding;
    var startY = opts.height - config.padding - config.legendHeight + listIndex * (config.fontSize + marginTop) + padding + marginTop; // context.setFontSize(config.fontSize);

    itemList.forEach(function (item) {
      switch (opts.type) {
        case 'line':
          context.beginPath();
          context.setLineWidth(1);
          context.setStrokeStyle(item.color);
          context.moveTo(startX - 2, startY + 5);
          context.lineTo(startX + 17, startY + 5);
          context.stroke();
          context.closePath();
          context.beginPath();
          context.setLineWidth(1);
          context.setStrokeStyle('#ffffff');
          context.setFillStyle(item.color);
          context.moveTo(startX + 7.5, startY + 5);
          context.arc(startX + 7.5, startY + 5, 4, 0, 2 * Math.PI);
          context.fill();
          context.stroke();
          context.closePath();
          break;

        case 'pie':
        case 'ring':
          context.beginPath();
          context.setFillStyle(item.color);
          context.moveTo(startX + 7.5, startY + 5);
          context.arc(startX + 7.5, startY + 5, 7, 0, 2 * Math.PI);
          context.closePath();
          context.fill();
          break;

        default:
          context.beginPath();
          context.setFillStyle(item.color);
          context.moveTo(startX, startY);
          context.rect(startX, startY, 15, 10);
          context.closePath();
          context.fill();
      }

      startX += padding + shapeWidth;
      context.beginPath();
      context.setFillStyle(opts.extra.legendTextColor || '#333333');
      context.fillText(item.name, startX, startY + 9);
      context.closePath();
      context.stroke();
      startX += measureText(item.name) + 2 * padding;
    });
  });
}

function drawPieDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var pieOption = opts.extra.pie || {};
  series = getPieDataPoints(series, process);
  var centerPosition = {
    x: opts.width / 2,
    y: (opts.height - config.legendHeight) / 2
  };
  var radius = Math.min(centerPosition.x - config.pieChartLinePadding - config.pieChartTextPadding - config._pieTextMaxLength_, centerPosition.y - config.pieChartLinePadding - config.pieChartTextPadding);

  if (opts.dataLabel) {
    radius -= 10;
  } else {
    radius -= 2 * config.padding;
  }

  series = series.map(function (eachSeries) {
    eachSeries._start_ += (pieOption.offsetAngle || 0) * Math.PI / 180;
    return eachSeries;
  });
  series.forEach(function (eachSeries) {
    context.beginPath();
    context.setLineWidth(2);
    context.setStrokeStyle('#ffffff');
    context.setFillStyle(eachSeries.color);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, radius, eachSeries._start_, eachSeries._start_ + 2 * eachSeries._proportion_ * Math.PI);
    context.closePath();
    context.fill();

    if (opts.disablePieStroke !== true) {
      context.stroke();
    }
  });

  if (opts.type === 'ring') {
    var innerPieWidth = radius * 0.6;

    if (typeof opts.extra.ringWidth === 'number' && opts.extra.ringWidth > 0) {
      innerPieWidth = Math.max(0, radius - opts.extra.ringWidth);
    }

    context.beginPath();
    context.setFillStyle(opts.background || '#ffffff');
    context.moveTo(centerPosition.x, centerPosition.y);
    context.arc(centerPosition.x, centerPosition.y, innerPieWidth, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }

  if (opts.dataLabel !== false && process === 1) {
    // fix https://github.com/xiaolin3303/wx-charts/issues/132
    var valid = false;

    for (var i = 0, len = series.length; i < len; i++) {
      if (series[i].data > 0) {
        valid = true;
        break;
      }
    }

    if (valid) {
      drawPieText(series, opts, config, context, radius, centerPosition);
    }
  }

  if (process === 1 && opts.type === 'ring') {
    drawRingTitle(opts, config, context);
  }

  return {
    center: centerPosition,
    radius: radius,
    series: series
  };
}

function drawRadarDataPoints(series, opts, config, context) {
  var process = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var radarOption = opts.extra.radar || {};
  var coordinateAngle = getRadarCoordinateSeries(opts.categories.length);
  var centerPosition = {
    x: opts.width / 2,
    y: (opts.height - config.legendHeight) / 2
  };
  var radius = Math.min(centerPosition.x - (getMaxTextListLength(opts.categories) + config.radarLabelTextMargin), centerPosition.y - config.radarLabelTextMargin);
  radius -= config.padding; // draw grid

  context.beginPath();
  context.setLineWidth(1);
  context.setStrokeStyle(radarOption.gridColor || "#cccccc");
  coordinateAngle.forEach(function (angle) {
    var pos = convertCoordinateOrigin(radius * Math.cos(angle), radius * Math.sin(angle), centerPosition);
    context.moveTo(centerPosition.x, centerPosition.y);
    context.lineTo(pos.x, pos.y);
  });
  context.stroke();
  context.closePath(); // draw split line grid

  var _loop = function _loop(i) {
    var startPos = {};
    context.beginPath();
    context.setLineWidth(1);
    context.setStrokeStyle(radarOption.gridColor || "#cccccc");
    coordinateAngle.forEach(function (angle, index) {
      var pos = convertCoordinateOrigin(radius / config.radarGridCount * i * Math.cos(angle), radius / config.radarGridCount * i * Math.sin(angle), centerPosition);

      if (index === 0) {
        startPos = pos;
        context.moveTo(pos.x, pos.y);
      } else {
        context.lineTo(pos.x, pos.y);
      }
    });
    context.lineTo(startPos.x, startPos.y);
    context.stroke();
    context.closePath();
  };

  for (var i = 1; i <= config.radarGridCount; i++) {
    _loop(i);
  }

  var radarDataPoints = getRadarDataPoints(coordinateAngle, centerPosition, radius, series, opts, process);
  radarDataPoints.forEach(function (eachSeries, seriesIndex) {
    // 绘制区域数据
    context.beginPath();
    context.setFillStyle(eachSeries.color);
    context.setGlobalAlpha(0.6);
    eachSeries.data.forEach(function (item, index) {
      if (index === 0) {
        context.moveTo(item.position.x, item.position.y);
      } else {
        context.lineTo(item.position.x, item.position.y);
      }
    });
    context.closePath();
    context.fill();
    context.setGlobalAlpha(1);

    if (opts.dataPointShape !== false) {
      var shape = config.dataPointShape[seriesIndex % config.dataPointShape.length];
      var points = eachSeries.data.map(function (item) {
        return item.position;
      });
      drawPointShape(points, eachSeries.color, shape, context);
    }
  }); // draw label text

  drawRadarLabel(coordinateAngle, radius, centerPosition, opts, config, context);
  return {
    center: centerPosition,
    radius: radius,
    angleList: coordinateAngle
  };
}

function drawCanvas(opts, context) {
  context.draw();
}

var Timing = {
  easeIn: function easeIn(pos) {
    return Math.pow(pos, 3);
  },
  easeOut: function easeOut(pos) {
    return Math.pow(pos - 1, 3) + 1;
  },
  easeInOut: function easeInOut(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 3);
    } else {
      return 0.5 * (Math.pow(pos - 2, 3) + 2);
    }
  },
  linear: function linear(pos) {
    return pos;
  }
};

function Animation(opts) {
  this.isStop = false;
  opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
  opts.timing = opts.timing || 'linear';
  var delay = 17;

  var createAnimationFrame = function createAnimationFrame() {
    if (typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame;
    } else if (typeof setTimeout !== 'undefined') {
      return function (step, delay) {
        setTimeout(function () {
          var timeStamp = +new Date();
          step(timeStamp);
        }, delay);
      };
    } else {
      return function (step) {
        step(null);
      };
    }
  };

  var animationFrame = createAnimationFrame();
  var startTimeStamp = null;

  var _step = function step(timestamp) {
    if (timestamp === null || this.isStop === true) {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
      return;
    }

    if (startTimeStamp === null) {
      startTimeStamp = timestamp;
    }

    if (timestamp - startTimeStamp < opts.duration) {
      var process = (timestamp - startTimeStamp) / opts.duration;
      var timingFunction = Timing[opts.timing];
      process = timingFunction(process);
      opts.onProcess && opts.onProcess(process);
      animationFrame(_step, delay);
    } else {
      opts.onProcess && opts.onProcess(1);
      opts.onAnimationFinish && opts.onAnimationFinish();
    }
  };

  _step = _step.bind(this);
  animationFrame(_step, delay);
} // stop animation immediately
// and tigger onAnimationFinish


Animation.prototype.stop = function () {
  this.isStop = true;
};

function drawCharts(type, opts, config, context) {
  var _this = this;

  var series = opts.series;
  var categories = opts.categories;
  series = fillSeriesColor(series, config);

  var _calLegendData = calLegendData(series, opts, config),
      legendHeight = _calLegendData.legendHeight;

  config.legendHeight = legendHeight;

  var _calYAxisData = calYAxisData(series, opts, config),
      yAxisWidth = _calYAxisData.yAxisWidth;

  config.yAxisWidth = yAxisWidth;

  if (categories && categories.length) {
    var _calCategoriesData = calCategoriesData(categories, opts, config),
        xAxisHeight = _calCategoriesData.xAxisHeight,
        angle = _calCategoriesData.angle;

    config.xAxisHeight = xAxisHeight;
    config._xAxisTextAngle_ = angle;
  }

  if (type === 'pie' || type === 'ring') {
    config._pieTextMaxLength_ = opts.dataLabel === false ? 0 : getPieTextMaxLength(series);
  }

  var duration = opts.animation ? 1000 : 0;
  this.animationInstance && this.animationInstance.stop();

  switch (type) {
    case 'line':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          drawYAxisGrid(opts, config, context);

          var _drawLineDataPoints = drawLineDataPoints(series, opts, config, context, process),
              xAxisPoints = _drawLineDataPoints.xAxisPoints,
              calPoints = _drawLineDataPoints.calPoints,
              eachSpacing = _drawLineDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.calPoints = calPoints;
          _this.chartData.eachSpacing = eachSpacing;
          drawXAxis(categories, opts, config, context);
          drawLegend(opts.series, opts, config, context);
          drawYAxis(series, opts, config, context);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        }
      });
      break;

    case 'column':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          drawYAxisGrid(opts, config, context);

          var _drawColumnDataPoints = drawColumnDataPoints(series, opts, config, context, process),
              xAxisPoints = _drawColumnDataPoints.xAxisPoints,
              eachSpacing = _drawColumnDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.eachSpacing = eachSpacing;
          drawXAxis(categories, opts, config, context);
          drawLegend(opts.series, opts, config, context);
          drawYAxis(series, opts, config, context);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        }
      });
      break;

    case 'area':
      this.animationInstance = new Animation({
        timing: 'easeIn',
        duration: duration,
        onProcess: function onProcess(process) {
          drawYAxisGrid(opts, config, context);

          var _drawAreaDataPoints = drawAreaDataPoints(series, opts, config, context, process),
              xAxisPoints = _drawAreaDataPoints.xAxisPoints,
              calPoints = _drawAreaDataPoints.calPoints,
              eachSpacing = _drawAreaDataPoints.eachSpacing;

          _this.chartData.xAxisPoints = xAxisPoints;
          _this.chartData.calPoints = calPoints;
          _this.chartData.eachSpacing = eachSpacing;
          drawXAxis(categories, opts, config, context);
          drawLegend(opts.series, opts, config, context);
          drawYAxis(series, opts, config, context);
          drawToolTipBridge(opts, config, context, process);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        }
      });
      break;

    case 'ring':
    case 'pie':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          _this.chartData.pieData = drawPieDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        }
      });
      break;

    case 'radar':
      this.animationInstance = new Animation({
        timing: 'easeInOut',
        duration: duration,
        onProcess: function onProcess(process) {
          _this.chartData.radarData = drawRadarDataPoints(series, opts, config, context, process);
          drawLegend(opts.series, opts, config, context);
          drawCanvas(opts, context);
        },
        onAnimationFinish: function onAnimationFinish() {
          _this.event.trigger('renderComplete');
        }
      });
      break;
  }
} // simple event implement


function Event() {
  this.events = {};
}

Event.prototype.addEventListener = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Event.prototype.trigger = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var type = args[0];
  var params = args.slice(1);

  if (!!this.events[type]) {
    this.events[type].forEach(function (listener) {
      try {
        listener.apply(null, params);
      } catch (e) {
        console.error(e);
      }
    });
  }
};

var Charts = function Charts(opts, _component) {
  opts.title = opts.title || {};
  opts.subtitle = opts.subtitle || {};
  opts.yAxis = opts.yAxis || {};
  opts.xAxis = opts.xAxis || {};
  opts.extra = opts.extra || {};
  opts.legend = opts.legend === false ? false : true;
  opts.animation = opts.animation === false ? false : true;
  var config$$1 = assign({}, config);
  config$$1.yAxisTitleWidth = opts.yAxis.disabled !== true && opts.yAxis.title ? config$$1.yAxisTitleWidth : 0;
  config$$1.pieChartLinePadding = opts.dataLabel === false ? 0 : config$$1.pieChartLinePadding;
  config$$1.pieChartTextPadding = opts.dataLabel === false ? 0 : config$$1.pieChartTextPadding;
  this.opts = opts;
  this.config = config$$1;
  this.context = _component ? wx.createCanvasContext(opts.canvasId, _component) : wx.createCanvasContext(opts.canvasId); // store calcuated chart data
  // such as chart point coordinate

  this.chartData = {};
  this.event = new Event();
  this.scrollOption = {
    currentOffset: 0,
    startTouchX: 0,
    distance: 0
  };
  drawCharts.call(this, opts.type, opts, config$$1, this.context);
};

Charts.prototype.updateData = function () {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.opts.series = data.series || this.opts.series;
  this.opts.categories = data.categories || this.opts.categories;
  this.opts.title = assign({}, this.opts.title, data.title || {});
  this.opts.subtitle = assign({}, this.opts.subtitle, data.subtitle || {});
  drawCharts.call(this, this.opts.type, this.opts, this.config, this.context);
};

Charts.prototype.stopAnimation = function () {
  this.animationInstance && this.animationInstance.stop();
};

Charts.prototype.addEventListener = function (type, listener) {
  this.event.addEventListener(type, listener);
};

Charts.prototype.getCurrentDataIndex = function (e) {
  var touches = e.touches && e.touches.length ? e.touches : e.changedTouches;

  if (touches && touches.length) {
    var _touches$ = touches[0],
        x = _touches$.x,
        y = _touches$.y;

    if (this.opts.type === 'pie' || this.opts.type === 'ring') {
      return findPieChartCurrentIndex({
        x: x,
        y: y
      }, this.chartData.pieData);
    } else if (this.opts.type === 'radar') {
      return findRadarChartCurrentIndex({
        x: x,
        y: y
      }, this.chartData.radarData, this.opts.categories.length);
    } else {
      return findCurrentIndex({
        x: x,
        y: y
      }, this.chartData.xAxisPoints, this.opts, this.config, Math.abs(this.scrollOption.currentOffset));
    }
  }

  return -1;
};

Charts.prototype.showToolTip = function (e) {
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (this.opts.type === 'line' || this.opts.type === 'area') {
    var index = this.getCurrentDataIndex(e);
    var currentOffset = this.scrollOption.currentOffset;
    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset,
      animation: false
    });

    if (index > -1) {
      var seriesData = getSeriesDataItem(this.opts.series, index);

      if (seriesData.length !== 0) {
        var _getToolTipData = getToolTipData(seriesData, this.chartData.calPoints, index, this.opts.categories, option),
            textList = _getToolTipData.textList,
            offset = _getToolTipData.offset;

        opts.tooltip = {
          textList: textList,
          offset: offset,
          option: option
        };
      }
    }

    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
};

Charts.prototype.scrollStart = function (e) {
  if (e.touches[0] && this.opts.enableScroll === true) {
    this.scrollOption.startTouchX = e.touches[0].x;
  }
};

Charts.prototype.scroll = function (e) {
  // TODO throtting...
  if (e.touches[0] && this.opts.enableScroll === true) {
    var _distance = e.touches[0].x - this.scrollOption.startTouchX;

    var currentOffset = this.scrollOption.currentOffset;
    var validDistance = calValidDistance(currentOffset + _distance, this.chartData, this.config, this.opts);
    this.scrollOption.distance = _distance = validDistance - currentOffset;
    var opts = assign({}, this.opts, {
      _scrollDistance_: currentOffset + _distance,
      animation: false
    });
    drawCharts.call(this, opts.type, opts, this.config, this.context);
  }
};

Charts.prototype.scrollEnd = function (e) {
  if (this.opts.enableScroll === true) {
    var _scrollOption = this.scrollOption,
        currentOffset = _scrollOption.currentOffset,
        distance = _scrollOption.distance;
    this.scrollOption.currentOffset = currentOffset + distance;
    this.scrollOption.distance = 0;
  }
};

module.exports = Charts;

/***/ }),
/* 27 */
/***/ ((module) => {


  var components = {};
  ;
      module.exports = {
        render:new Function("this.$this=this;with(this){return _c('wx-view',{staticClass:\"data-v-307617\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"bg\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"h15\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"姓名\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"陈蔚丰\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"性别\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"男\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"学位\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"南京大学环境科学硕士\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"背景\")]),_v(\" \"),_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"曾在江苏瑞华投资发展有限公司担任行业研究员。2010年11月加盟浦银安盛基金，担任行业研究员、高级研究员，2014年7月起任公司旗下股票基金经理助理。研究行业涵盖医药、煤炭、旅游、计算机等行业。2015年5月，担任浦银安盛医疗健康混合基金基金经理。2016年1月，担任浦银安盛红利精选混合基金基金经理。\")])],1)],1)],1)}"),
        modules:{},
        imports:[],
        templates:{},
        components:components,
      }
      

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 29 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"navigationBarTitleText":"基金经理"}');

/***/ }),
/* 30 */
/***/ (() => {

"use strict";


Page({
  data: {},
  onLoad: function onLoad() {}
});

/***/ }),
/* 31 */
/***/ ((module) => {


  var components = {};
  ;
      module.exports = {
        render:new Function("this.$this=this;with(this){return _c('wx-view',{staticClass:\"data-v-e20fb7\",class:_processClassBinding([])},[_c('wx-view',{staticStyle:{\"background-color\":\"#eee\"}},[_c('wx-view',{staticClass:\"h15\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',[_c('wx-view',[_c('wx-view',{staticClass:\"flex rule-head justify-between align-center flex-row\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"columnar\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 font-bold\",class:_processClassBinding([])},[_v(\"购买费率\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex w300 justify-end\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-3\",class:_processClassBinding([])},[_v(\"支持银行及费率折扣\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center rule-top flex-row\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1\",class:_processClassBinding([])},[_v(\"买入金额\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center w300 pl60\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 ml70\",class:_processClassBinding([])},[_v(\"费率\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-rule\",class:_processClassBinding([]),staticStyle:{\"left\":\"0px\"}})],1),_v(\" \"),_l((declare),function(item,index2){return _c('wx-view',{staticClass:\"flex align-center rule-mid flex-row\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1\",class:_processClassBinding([])},[_v(_s(item.money))])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center w300 pl60\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 ml70\",class:_processClassBinding([])},[_v(_s(item.rate))])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-rule\",class:_processClassBinding([])})],1)})],2),_v(\" \"),_c('wx-view',{staticClass:\"mt15\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex rule-head justify-between\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"columnar\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 font-bold\",class:_processClassBinding([])},[_v(\"赎回费率\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center rule-top flex-row\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1\",class:_processClassBinding([])},[_v(\"持有期限\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center w300 pl60\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 ml70\",class:_processClassBinding([])},[_v(\"费率\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-rule\",class:_processClassBinding([]),staticStyle:{\"left\":\"0px\"}})],1),_v(\" \"),_l((redeem),function(item,index){return _c('wx-view',{staticClass:\"flex align-center rule-top flex-row\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"flex flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1\",class:_processClassBinding([])},[_v(_s(item.day))])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex align-center w300 pl60\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"font-14 m-color-1 ml70\",class:_processClassBinding([])},[_v(_s(item.rate))])],1),_v(\" \"),_c('wx-view',{staticClass:\"line-rule\",class:_processClassBinding([])})],1)})],2)],1)],1)],1)}"),
        modules:{},
        imports:[],
        templates:{},
        components:components,
      }
      

/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 33 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"navigationBarTitleText":"交易费率"}');

/***/ }),
/* 34 */
/***/ (() => {

"use strict";


Page({
  data: {
    declare: [{
      money: 'M<100万',
      rate: '1.5%'
    }, {
      money: '100万≤M<300万',
      rate: '1%'
    }, {
      money: '300万≤M<500万',
      rate: '1%'
    }, {
      money: 'M≥500万',
      rate: '1000元/笔'
    }],
    //购买费率
    redeem: [{
      day: 'T<7日',
      rate: '1.5%'
    }, {
      day: '7日≤T<30日',
      rate: '0.75%'
    }, {
      day: '30日≤T<1年',
      rate: '0.5%'
    }, {
      day: '1年≤T<2年',
      rate: '0.25%'
    }, {
      day: 'T≥2年',
      rate: '0%'
    }] //赎回费率

  },
  onLoad: function onLoad() {}
});

/***/ }),
/* 35 */
/***/ ((module) => {


  var components = {};
  ;
      module.exports = {
        render:new Function("this.$this=this;with(this){return _c('wx-view',{staticClass:\"data-v-451f78\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"bg\",class:_processClassBinding([])},[_c('wx-view',{staticClass:\"h15\",class:_processClassBinding([])}),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"基金全称\")]),_v(\" \"),_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"浦银安盛医疗健康灵活配置混合型证券投资基金\")])],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"基金简称\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"浦银医疗\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"基金代码\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"519171\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"发行日期\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"2015-04-21\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"成立日期\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"2015-05-25\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"管理费\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"1.5%/年\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"托管费\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"0.25%/年\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"收费方式\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"A\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"基金管理人\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"--\")])],1)],1),_v(\" \"),_c('wx-view',{staticClass:\"flex cell-file flex-row\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"label\",class:_processClassBinding([])},[_v(\"基金托管人\")]),_v(\" \"),_c('wx-view',{staticClass:\"flex flex-row align-center info-wrap flex-1\",class:_processClassBinding([])},[_c('wx-text',{staticClass:\"flex info-wrap-text flex-1\",class:_processClassBinding([])},[_v(\"中信银行股份有限公司\")])],1)],1)],1)],1)}"),
        modules:{},
        imports:[],
        templates:{},
        components:components,
      }
      

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 37 */
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"navigationBarTitleText":"基金档案"}');

/***/ }),
/* 38 */
/***/ (() => {

"use strict";


Page({
  data: {},
  onLoad: function onLoad() {
    var appInstance = getApp();
    var queryStr = JSON.stringify(appInstance.globalData.queryParams);

    if (queryStr.length > 4) {
      wx.showModal({
        title: '传递参数',
        content: JSON.stringify(appInstance.globalData.queryParams),
        success: function success(res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    }
  }
});

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";


var _interopRequireDefault = __webpack_require__(1);

__webpack_require__(2);

var _app2 = _interopRequireDefault(__webpack_require__(3));

__webpack_require__(4);

App.weappConfig = _app2["default"];

__webpack_require__(5);

Page.weappRoute = "pages/home/home";
Page.weappPage = __webpack_require__(6);
Component.weappRoute = "pages/home/home";
Component.weappComponent = __webpack_require__(6);

__webpack_require__(7);

Page.weappConfig = __webpack_require__(8);

__webpack_require__(9);

Page.weappRoute = "pages/discover/discover";
Page.weappPage = __webpack_require__(10);
Component.weappRoute = "pages/discover/discover";
Component.weappComponent = __webpack_require__(10);

__webpack_require__(11);

Page.weappConfig = __webpack_require__(12);

__webpack_require__(13);

Page.weappRoute = "pages/setting/setting";
Page.weappPage = __webpack_require__(14);
Component.weappRoute = "pages/setting/setting";
Component.weappComponent = __webpack_require__(14);

__webpack_require__(15);

Page.weappConfig = __webpack_require__(16);

__webpack_require__(17);

Page.weappRoute = "pages/fund-list/fund-list";
Page.weappPage = __webpack_require__(18);
Component.weappRoute = "pages/fund-list/fund-list";
Component.weappComponent = __webpack_require__(18);

__webpack_require__(19);

Page.weappConfig = __webpack_require__(20);

__webpack_require__(21);

Page.weappRoute = "pages/fund/fund";
Page.weappPage = __webpack_require__(22);
Component.weappRoute = "pages/fund/fund";
Component.weappComponent = __webpack_require__(22);

__webpack_require__(23);

Page.weappConfig = __webpack_require__(24);

__webpack_require__(25);

Page.weappRoute = "pages/managerchange/managerchange";
Page.weappPage = __webpack_require__(27);
Component.weappRoute = "pages/managerchange/managerchange";
Component.weappComponent = __webpack_require__(27);

__webpack_require__(28);

Page.weappConfig = __webpack_require__(29);

__webpack_require__(30);

Page.weappRoute = "pages/rule/rule";
Page.weappPage = __webpack_require__(31);
Component.weappRoute = "pages/rule/rule";
Component.weappComponent = __webpack_require__(31);

__webpack_require__(32);

Page.weappConfig = __webpack_require__(33);

__webpack_require__(34);

Page.weappRoute = "pages/file/file";
Page.weappPage = __webpack_require__(35);
Component.weappRoute = "pages/file/file";
Component.weappComponent = __webpack_require__(35);

__webpack_require__(36);

Page.weappConfig = __webpack_require__(37);

__webpack_require__(38);
})();

/******/ })()
;