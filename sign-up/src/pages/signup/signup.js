/*
 * @Descripttion: 
 * @version: 
 * @Author: liuqinqin
 * @Date: 2020-05-28 09:39:05
 * @LastEditors: liuqinqin
 * @LastEditTime: 2020-06-11 21:18:06
 */
//logs.js
const util = require('../../utils/util.js')
import config from '../../config.js'
// import Light from 'light';
const Base64 = require('js-base64').Base64;

Page({
  data: {
    track1: 0,
    track2: 0,
    total: 0,
    token: ''
  },
  onReady: function () {
    var _this = this;
    wx.getStorage({
      key: 'isNeedUserInfo',
      success(res) {
        console.log(res.data)
      },
      fail(){
        wx.setStorage({
          key: "isNeedUserInfo",
          data: "1"
        })
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            var token = res.userInfo.extraInfo.token;
            // 解码
            var submitToken = Base64.decode(token);
            _this.data.token = submitToken;
            wx.setStorage({
              key: "token",
              data: submitToken
            })
            _this.loadData();
          },
          fail: function () {
            wx.showToast({
              title: '信息获取失败!',
              icon: 'none',
              duration: 2000,
            })
          }
        })
      }
    })
    
  },
  loadData: function () {
    var _this = this;
    // 本地数据mock
    // https://uplus.sit.hs.net/uplus/square/v1/gettopicpost?pageNum=1&pageSize=11&topicId=35&orderType=2

    var p1 = new Promise(this.getTotal);
    var submitArr = [];
    var contentArr = [];
    wx.getStorage({
      key: "token",
      success (res) {
        console.log(res.data)
        var token = res.data
        p1.then(function (result) {
          _this.data.total = result.data.data.total;
          var count = 0;
          if (_this.data.total < 500) {
            count = 1;
          } else {
            count = Math.ceil(_this.data.total / 500);
          }
          // 循环发送请求，获取所有帖子数量
          for (var i = 0; i < count; i++) {
            submitArr.push(new Promise(resolve => {
              wx.request({
                url: config.BASE_URL + `/uplus/square/v1/gettopicpost`,
                dataType: "json",
                method: "get",
                data: {
                  pageNum: i + 1,
                  pageSize: '500',
                  topicId: '70',
                  orderType: '2'
                },
                header: {
                  'content-type': 'application/json',
                  'X-GTN-Access-Token': token,
                },
                success: function (res) {
                  resolve(res)
                },
                fail: function (res) {
                  wx.showToast({
                    title: '信息数据失败!',
                    icon: 'none',
                    duration: 2000,
                  })
                  reject(res)
                }
              });
            }))
          }
          Promise.all(submitArr).then(result => {
            console.log(result) // 查找每个请求获取的帖子内容
            result.forEach(item => {
              item.data.data.records.forEach(item2 => {
                contentArr.push(item2.title)
              })
            })

            var saiti2 = 0;
            var saiti1 = 0;
            contentArr.forEach(item => {
              var first = item.indexOf('【');
              var last = item.indexOf('】');
              var str = item.substring(first + 1, last);
              if (str === 'Light技术应用') {
                saiti2++
              } else if (str === 'U+创意小程序') {
                saiti1++
              }
            })
            console.log('track1' + saiti1)
            console.log('track2' + saiti2)
            _this.data.track1 = saiti1;
            _this.data.track2 = saiti2;

            _this.setData({
              track1: saiti1,
              track2: saiti2
            })
          })
        })
      },
      fail () {
        wx.showToast({
          title: 'token获取失败!',
          icon: 'none',
          duration: 2000,
        })
      }
    })
  },
  getTotal: function (resolve, reject) {
    var _this = this;
    wx.getStorage({
      key: "token",
      success (res) {
        console.log(res.data)
        var token = res.data
        wx.request({
          url: config.BASE_URL + `/uplus/square/v1/gettopicpost`,
          dataType: "json",
          method: "get",
          data: {
            pageNum: '1',
            pageSize: '500',
            topicId: '70',
            orderType: '2'
          },
          header: {
            'content-type': 'application/json',
            'X-GTN-Access-Token': token,
          },
          success: function (res) {
            console.log('total', res)
            if (res.data.code == '0') {
              _this.data.total = res.data.data.total
              resolve(res)
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '信息数据获取失败!',
              icon: 'none',
              duration: 2000,
            })
            reject(res)
          }
        });
      },
      fail () {
        wx.showToast({
          title: 'token获取失败!',
          icon: 'none',
          duration: 2000,
        })
      }
    })

  },
  //事件处理函数
  bindViewTap: function (e) {
    wx.setStorage({
      key: "title",
      data: e.target.dataset.title
    })
    wx.setStorageSync('title', e.target.dataset.title)
    wx.navigateTo({
      url: '../baoming/baoming'
    })
  },
})
