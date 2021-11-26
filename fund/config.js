/* 参数配置，打包时从不同环境配置中拷贝 */
let env = __ENV__;
export default {
    appBaseUrl: env.appBaseUrl,//appServer 地址,在 project.jons上面配置
    homeAndDiscoverUrl: env.homeAndDiscoverUrl,//首页和精选请求地址
    feedbackImgUrl: env.feedbackImgUrl,//意见反馈图片显示地址
    otherAppBaseUrl: env.otherAppBaseUrl,//第三方请求地址
    pdfUrl: env.pdfUrl,//PDF打开地址
    wxAppid: env.wxAppid,// 微信 appid
    internet: env.internet,// internet服务地址
    oneDiscount: "tuijian",//现金宝资产页面 底部推荐基金

    fundsort : ["混合型","QDII","债券型","指数型","货币型"],
    dsAgencyno: env.dsAgencyno,//直销销售商代码
    capitalmode: "M",// 资金方式
    weixin: env.weixin,// 终端渠道标识
    iphone: "app",// 终端渠道标识
    android: "app",// 终端渠道标识
    weixinChannelkey: "3",// 终端渠道标识
    iphoneChannelkey: "2",// 终端渠道标识
    androidChannelkey: "2",// 终端渠道标识
    wechat:"WX",//账户中心微信授权渠道标识
    serverTel:"0571-28828888",//客服电话
    shareTitle:"恒生官方APP",//分享标题
    shareContent:"购基一折起，理财新体验",//分享内容
    shareUrl:"http://www.py-axa.com/app/download/store.html",//分享跳转地址
    shareImage:"http://wx.py-axa.com/weixin-fund/upload/image/py.png",//分享图片
    riskConfig: {
        fundrisk_max: 4, // 基金的最高风险值
        fundrisk_min: 0,
        userrisk_max: 5, // 用户的最高风险承受能力值
        userrisk_min: 1
    },
    xjb: {
        name: env.xjbName,
        code: env.xjb,
        inputMin: 0.01
    },
    tradePubKey: 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJkZuOHsWQ0qPcNlkH7t9aE5qUUxtLjsSZh/6NYe2xG6jbaFwcAN/mYazAVGeWoT95zcGS6c4W2CV+EkQNYC9l0CAwEAAQ==',
    mobileReg: /^(1\d{10})$/,
    registerPWReg: /^[\da-zA-Z]{8,16}$/,//数字字母混合,纯字母,纯数字
    loginPWReg: /^[~!@#$%^&*()\-=_+\[\]\{\}:;\'\"\,\.\<\>?\/\|\\\?a-zA-Z0-9]{8,16}$/, //用于登录校验
    tradePWReg: /^[~!@#$%^&*()\-=_+\[\]\{\}:;\'\"\,\.\<\>?\/\|\\\?a-zA-Z0-9]{6,8}$/,
    queryPWReg: /^[0-9]{6}$/,
    authcodeReg: /^[0-9]{4}$/,
    isActivity: env.isActivity,// 是否显示活动
    isDollar: env.isDollar,// 是否开启多币种
    isAnalytics: env.isAnalytics,// 是否开启事件埋点
    isAnalyticsPages: env.isAnalyticsPages,// 是否开启页面埋点
    etfappfundlist: env.etfappfundlist,
    visitConfig: {//登录拦截界面
        "addbank\/|bankBox\/banklist|bankBox\/update-bank-phone|bankBox\/updatebp-success|idBox\/update-user-info|idBox\/user-info|recommendBox\/|discover\/|server": "",
        "setting|trade\/|tradingBox\/|tradeWayBox\/|fixedBox\/": "",
        "wishBoxTwo\/|wishBook\/|histroywish": "",
        "welfareBox|news|xjb|xjbdetails|profitdetails": "",
        "dingtou\/fun-list|dingtou\/add-fun|dingtou\/add-fun-range|dingtou\/add-fun-result|dingtou\/fixed-fun-result|dingtou\/fun-detail|dingtou\/history-fun-list|dingtou\/modify-fun|dingtou\/modify-fun-range|dingtou\/modify-fun-result": "",
        "feedbackBox\/|safeBox\/|riskBox\/|holdBox\/": "",
        "login\/bind-bank|login\/bind-phone": "",
        "ewm|welfareBox\/|myoptional|helpcenter\/|messageHtml":"",
    },
    verify: {
        verifyTime: 1*1000, // 切到后台后多长时间再次验证 /秒
        expireTime: 30 * 60 * 1000, // 会话超时时间
        fingerprint: {
            enable: true
        },
        gesture: {
            enable: true
        }
    }
}
