// import * as echarts from '../../common/ec-canvas/echarts';
// import F2 from '../../common/f2-canvas/lib/f2';
const Charts = require('../../common/wxcharts')
var lineChart = null;
Page({
  data: {
    fundManagerName: '',
    drawLine: {},
    optsline: {},
    s: 375,
    chartType: 1
  },
  onLoad: function () {
    this.setData({ s: __base__.config.env.deviceWidth || 375 });

    var appInstance = getApp();
    var queryStr = JSON.stringify(appInstance.globalData.queryParams);
    if (queryStr.length > 2) {
      wx.showModal({
        title: '传递参数',
        content: JSON.stringify(appInstance.globalData.queryParams),
        success(res) {
            if (res.confirm) {
                console.log('用户点击确定');
            } else if (res.cancel) {
                console.log('用户点击取消');
            }
        }
      });
    }
  },
  onReady() {
    var that = this
    var arr = [40, 50, 30, 70, 80, 40, 90, 60, 80, 60, 69, 80, 80, 40, 50, 30, 70, 80, 40, 77, 80, 70, 60, 50, 80];
    // this.drawDemo(arr);
    this.changeChartData()
  },
  changeChartData(e) {
    let type = e ? parseInt(e.target.dataset.type):1
    console.log(type)
    this.setData({ chartType: type })
    let x_data = []
    let y_data = []
    switch(type){
      case 1:
        x_data=[ "04-05", "", "", "", "", "", "", "04-20", "", "", "", "", "", "", "05-05"]
        y_data= ["1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"]
      break;

      case 2:
        x_data=[ "02-05", "", "", "", "", "03-05", "", "", "", "", "", "04-05", "", "", "", "", "", "", "2021-05-05"]
        y_data= ["1.04","1.033","1.028","1.035","1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"]
      break;

      case 3:
        x_data=[ "2020-11-05", "", "", "", "", "", "", "", "", "", "", "2021-03-05","", "", "", "", "", "", "", "", "", "", "2021-05-05"]
        y_data= ["1.05","1.052","1.053","1.047","1.04","1.033","1.028","1.035","1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"]
      break;

      case 4:
        x_data=[ "2020-05-05", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "2020-11-05","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "2021-05-05"]
        y_data= ["1.032","1.039","1.038","1.034","1.04","1.039","1.037","1.043","1.041","1.047","1.05","1.052","1.053","1.047","1.04","1.033","1.028","1.035","1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"]
      break;

      case 5:
        x_data=[ "2020-02-05", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "2020-10-05","", "", "", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", "", "2021-05-05", ""]
        y_data= ["1.032","1.039","1.038","1.034","1.04","1.039","1.037","1.032","1.039","1.038","1.034","1.04","1.039","1.037","1.032","1.039","1.038","1.034","1.04","1.039","1.037","1.032","1.039","1.038","1.034","1.04","1.039","1.037","1.043","1.041","1.047","1.05","1.052","1.053","1.047","1.04","1.033","1.028","1.035","1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"]
      break;
      
      default:
        x_data=[ "04-05", "", "", "", "", "", "", "04-20", "", "", "", "", "", "", "05-05"]
        y_data= ["1.05", "1.028", "1.025", "1.02", "1.019", "1.042", "1.049", "1.057", "1.053", "1.045", "1.048", "1.037", "1.03", "1.044", "1.074"]
    }
    //绘制折线图
    this.OnWxChart(x_data,y_data,'图表一')
  },
  OnWxChart (x_data,y_data,name) {
    lineChart = new Charts({
      canvasId: 'chartline',     //输入wxml中canvas的id
      type: 'line',
      categories:x_data,    //模拟的x轴横坐标参数
      animation: false,  //是否开启动画
      legend: false,
     
      series: [{
        name: name,
        data: y_data,
        format: function (val, name) {
          return val + '元';
        }
      }],
      xAxis: {   //是否隐藏x轴分割线
        disableGrid: true,
      },
      yAxis: {      //y轴数据
        title: '',  //标题
        format: function (val) {  //返回数值
          return val.toFixed(2);
        },
        gridColor: '#D8D8D8',
      },
      // width: this.data.s*1.5,
      // height: this.data.s*150/375*1.5,
      width: this.data.s,
      height: this.data.s*150/375,
      dataLabel: false,  //是否在图表上直接显示数据
      dataPointShape: false, //是否在图标上显示数据点标志
      extra: {
        lineStyle: 'Broken'  //曲线
      }
    });
  },
  bindViewTap: function (e) {
    var src = e.currentTarget.dataset.src
    wx.navigateTo({
      url: '../' + src + '/' + src
    })
  },

  drawDemo(arr) {
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
    }
    var width = 300, height = 200;
    var maxV = arr.max();
    //计算y轴增量
    var yStep = height / maxV;
    var context = wx.createCanvasContext('chartline')
    context.setLineWidth(1);
    context.setStrokeStyle("#3580ee");
    //context.moveTo(0, 0);//开始画图的位置
    var x_space = width / (arr.length - 1);//水平点的间隙像素           
    //context.lineTo(15, 60); x表示水平向右延伸，y表示垂直高度位置，从画板最左上角(0,0)开始计算坐标
    var xLen = 0;
    for (var i = 0; i < arr.length; i++) {
      var yValue = arr[i];//纵坐标值
      xLen += x_space;
      var yPont = height - yValue * yStep;
      // console.log(yPont)
      if (i == 0) {
        xLen = 0;
      }
      var m = xLen + "," + yPont;
      context.lineTo(xLen, yPont);
    }
    context.stroke();
    context.draw();
  },
  onShow: function(options) {
    var appInstance = getApp()
    console.log(appInstance.globalData.queryParams) 

    console.log("options: " + JSON.stringify(appInstance.globalData.queryParams));

    // wx.showModal({
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
})
