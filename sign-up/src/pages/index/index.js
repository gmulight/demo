/*
 * @Descripttion: 
 * @version: 
 * @Author: liuqinqin
 * @Date: 2020-05-26 14:56:39
 * @LastEditors: liuqinqin
 * @LastEditTime: 2020-06-11 17:37:05
 */
//index.js
//获取应用实例
const app = getApp()
// import Light from 'light';
Page({
  data: {
    fileArr: [
      {
        href: 'http://document.lightyy.com/zh-cn/docs/miniapp/reference/index.html',
        name: '移动开发平台开发文档'
      },
      {
        href: 'https://www.hs.net/api.html',
        name: 'OpenAPI在线接口说明文档'
      },
      {
        href: 'https://git01.hundsun.com/Programming-Contest-2020/document/tree/master',
        name: '其他说明文档'
      }
    ],
    fileDemoArr: [
      {
        href: 'https://git01.hundsun.com/Programming-Contest-2020/document/tree/master',
        name: 'U+编程大赛报名页'
      },
      {
        href: 'http://document.lightyy.com/zh-cn/docs/miniapp/reference/index.html',
        name: '理财商城'
      },
    ]
  },
  onReady: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../signup/signup'
    })
  },
  // 复制链接
  copyHref: function (e) {
    var data = this.data.fileArr[e.currentTarget.dataset.gid].href;
    var _this = this;
    wx.setClipboardData({
      data: data,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showToast({
              title: '链接复制成功，快去粘贴吧！',
              icon: 'none',
              duration: 2000,
            })
          }
        })
      }
    })
  },
  copyDemoHref: function (e) {
    var data = this.data.fileDemoArr[e.currentTarget.dataset.gid].href;
    var _this = this;
    wx.setClipboardData({
      data: data,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showToast({
              title: '链接复制成功，快去粘贴吧！',
              icon: 'none',
              duration: 2000,
            })
          }
        })
      }
    })
  },
})
