/*
 * @Descripttion: 
 * @version: 
 * @Author: liuqinqin
 * @Date: 2020-05-28 09:39:05
 * @LastEditors: liuqinqin
 * @LastEditTime: 2020-06-12 09:46:50
 */
//logs.js
const util = require('../../utils/util.js')
import config from '../../config.js'
const TabArr1 = ['恒生世界小程序', '客户地图小程序', 'U+商城小程序', '解决方案小程序']
const TabArr2 = ['EXCEL转PDF工具类库', '通过RPA实现滴滴打车账单自动报销', '高性能嵌入式结构化数据管理系统', '基于历史更新时间序列预测爬虫爬取时间', '异构数据库表数据内容对比']
const Base64 = require('js-base64').Base64;

const pageObject =
{
  data: {
    teamName: '', // 团队名
    teamMember: '', // 队员
    saidao: '', // 赛道名
    tipHidden: true,
    logs: [],
    actionSheetHidden: true, // 显示赛题弹出框
    actionSheetItems: [], // 赛题选项
    option: '', // 报名赛题
    imgUrlParams: [],
    token: ''
  },
  onReady: function () {

  },
  onLoad: function () {
    var _this = this;
    this.clearData();
    var title = wx.getStorage(
      {
        key: 'title',
        success (res) {
          // console.log(res.data)
          _this.data.saidao = '【' + res.data + '】'
          _this.setData({
            saidao: '【' + res.data + '】'
          })
          wx.setStorage({
            key: 'saidao',
            data: res.data
          })

        }
      }
    );
  },
  clearData () {
    this.data.teamName = '' // 团队名
    this.data.teamMember = ''// 队员
    this.data.saidao = '' // 赛道名
    this.data.option = ''
    this.data.imgUrlParams = []
    this.setData({
      teamName: '', // 团队名
      teamMember: '',// 队员
      saidao: '', // 赛道名
      option: '',
      imgUrlParams: []
    })
  },
  //事件处理函数
  bindViewTap () {
    wx.navigateTo({
      url: '../baoming/baoming'
    })
  },
  bindchangeName (e) {
    this.data.teamName = e.detail.value
  },
  bindchangeMember (e) {
    this.data.teamMember = e.detail.value
  },
  //事件处理函数
  cancel () {
    this.data.option = '';
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  backTop () {
    wx.navigateTo({
      url: '../signup/signup'
    })
  },
  //   title：赛道名+团队名
  // (例子)
  // 【U+创意小程序】维护中心团队

  // content：队员和赛题
  // (例子)
  // 队员：张梦迪，刘芹芹，吕彩霞
  // 报名赛题：1233213213123213
  handleRelease () {
    // var str = Base64.encode('1232')
    // var str2 = Base64.decode(str)
    // console.log(str2)
    var _this = this;
    // 发送请求
    if (_this.data.saidao == '') {
      return wx.showToast({
        title: '赛道不能为空!',
        icon: 'none',
        duration: 2000,
      })
    }

    if (_this.data.teamName == '') {
      return wx.showToast({
        title: '团队名不能为空!',
        icon: 'none',
        duration: 2000,
      })
    }
    if (_this.data.teamName.length > 30) {
      return wx.showToast({
        title: '团队名不能超过30个字!',
        icon: 'none',
        duration: 2000,
      })
    }
    if (_this.data.teamMember == '') {
      return wx.showToast({
        title: '团队成员不能为空!',
        icon: 'none',
        duration: 2000,
      })
    }
    if (_this.data.option == '') {
      return wx.showToast({
        title: '报名赛题不能为空!',
        icon: 'none',
        duration: 2000,
      })
    }

    const params = {
      content: `队员：${_this.data.teamMember}
    
          报名赛题：${_this.data.option}`,
      title: _this.data.saidao + _this.data.teamName,
      imgUrls: _this.data.imgUrlParams.join(','),
      topicIdList: [70]
    }

    wx.getStorage({
      key: "token",
      success (res) {
        console.log(res.data)
        var token = res.data
        wx.request({
          url: config.BASE_URL + `/uplus/square/v1/createpost`,// 发布
          method: "post",
          header: {
            'content-type': 'application/json', // 默认值
            'X-GTN-Access-Token': token,
          },
          data: params,
          success: ({ data }) => {
            if (data.code == 0) {
              wx.hideKeyboard()
              wx.showToast({
                title: ' 报名成功，我的贴子可查看报名信息!',
                icon: 'none',
                duration: 2000,
              })
            }
          },
          fail (err) {
            wx.showToast({
              title: '报名失败!',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }, fail () {
        wx.showToast({
          title: 'token获取失败!',
          icon: 'none',
          duration: 2000,
        })
      }
    })

  },
  getSaidao (e) {
    var itemName = e.target.dataset.index
    console.log(itemName)
    this.data.option = itemName;
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
      option: this.data.option,
    })
  },
  actionSheetTap (e) {
    var _this = this
    wx.getStorage({
      key: 'saidao',
      success (res) {
        if (res.data === 'U+创意小程序') {
          _this.setData({
            actionSheetHidden: !_this.data.actionSheetHidden,
            actionSheetItems: TabArr1
          })
        }
        if (res.data === 'Light技术应用') {
          _this.setData({
            actionSheetHidden: !_this.data.actionSheetHidden,
            actionSheetItems: TabArr2
          })
        }
      }
    })

  },
  actionSheetChange (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  deleteImg (e) {
    var index = e.currentTarget.dataset.index;
    this.data.imgUrlParams.splice(index, 1)
    this.setData({
      imgUrlParams: this.data.imgUrlParams
    })
  },
  handleCheckImage () {
    var _this = this;
    var maxCount = 9 - this.data.imgUrlParams.length
    wx.getStorage({
      key: "token",
      success (res) {
        console.log(res.data)
        var token = res.data
        wx.GMUChooseImage({
          count: maxCount,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            // var imgSrc = 'data:image/png;base64,' + res.tempFiles[0].path;
            Promise.all(res.tempFiles.map(base64 => {
              return _this.uploadFile(base64.path, token)
            })).then(res => {
              wx.showToast({
                title: '上传成功!',
                icon: 'none',
                duration: 2000
              })
              _this.data.imgUrlParams = _this.data.imgUrlParams.concat(res)
              _this.setData({
                imgUrlParams: _this.data.imgUrlParams
              })
            }).catch(err => {
              wx.showToast({
                message: '上传失败'
              })
            })

          }
        })
      },
      fail () {
        wx.showToast({
          title: 'token获取失败!',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },
  uploadFile (base64, token) {
    var _this = this;
    // 发送请求
    /*上传单张*/
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.BASE_URL + `/uplus/filemgr/v1/uploadpicture`,//自己请求的上传图片地址
        method: "post",
        header: {
          'content-type': 'application/json', // 默认值
          'X-GTN-Access-Token': token,
        },
        data: {
          content: base64
        },
        success: ({ data }) => {
          if (data.code == 0) {
            resolve(data.data.fileUri)
          }
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }
}

console.log(pageObject)


Page(pageObject)
