//index.js
//获取应用实例
const app = getApp()

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
    regulate: true,//涨/跌
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
    loadShow: false,//遮罩层必须参数
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
    tenanGuideEnable: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
