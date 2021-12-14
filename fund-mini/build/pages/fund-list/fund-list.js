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
    tabTitles : [{title:"全部"}],  //["全部","混合型","QDII","债券型","指数型","货币型"],
    // demoList: [{fundtype: "9999", fundlist: [], otherlist: []}],
    demoList: [],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../fund/fund'
    })
  },
  onLoad: function () {
    // this.myAnimation = wx.createAnimation();
    this.loadData();
    this.setData({ s: __base__.config.env.deviceWidth || 375 })
  },
  setPage (e) {
    var x = Number(e.currentTarget.dataset.page);
    var i = -this.data.s * x
    var offset = e.currentTarget.offsetLeft > this.data.s/2 ? e.currentTarget.offsetLeft-this.data.s/2+e.currentTarget.offsetWidth/2:''
    this.setData({ scrollTop: 0, currentPage: x, translateX: i, currentTabOffsetLeft: offset })
    // this.myAnimation.translateX(i).step();
    // this.setData({ animation: this.myAnimation.export() })
  },
  loadData() {
    var that = this;
    // 本地数据mock
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
            success: function(res) {
                if (res && res.data) {
                    // let jsonResult =  JSON.stringify(res.data).match(/jsonp_1\((\S.*)\)/)[1]
                    that.jsonResultHelper(res.data, {});
                }
            },
            fail: function(err){
                console.log(err);
            }
        });
    } else {
        // 本地数据mock
        // const productInfoList = require('../../mock/productInfoList.json')
        // that.jsonResultHelper(productInfoList, {});
    }

    // this.jsonResultHelper(productInfoList, {});
  },
  followQuery: function (fundList) {
      this.jsonResultHelper(fundList, {});
  },
  jsonResultHelper(jsonResult, followQuery) {//注释里面的代码为项目个性化代码,可以对着找删除
      this.setData({
          tabTitles: [{title:"全部"}],
          demoList:[],
          blockList:[]
      })

      const that = this;
      //----------------------------------放入全部基金----------------------------------------------------
      let fundList = [];//公募基金
      let otherList = [];//货币基金
      jsonResult.productList.forEach(function (product) {
          if(followQuery && followQuery.successful && followQuery.myFollows != null) {
              followQuery.myFollows.forEach(function (myFollows) {
                  if(myFollows.fundcode == product.fundcode){
                      product.heart = true;
                  }
              })
          }
          product.dayinc = product.dayinc.replace('%','')
          if (product.fundtype == '2') {
              otherList.push(product);
          }else{
              fundList.push(product);
              // alert(that.tableContent);

          }
      });
      that.data.demoList.push({fundtype: "9999", fundlist: fundList, otherlist: otherList});
    //   that.setData({
    //       demoList: that.data.demoList
    //   })
      //----------------------------------放入全部基金--------------------------------------------

      const newfundtypes = ["混合型","QDII","债券型","指数型","货币型"];//对基金类型进行排序
      const newfund = {caption: "新发", keyvalue: "020", memo: ""};
      let ret = [newfund];
      newfundtypes.forEach(function (fundtype) {
          jsonResult.funddisplayDict.forEach(function (fundDict) {
              var fundstr = fundDict.caption;
              if(fundstr == fundtype ){
                  ret.push(fundDict);
              }
          })
      });

      ret.forEach(function (fundDict) {
        let productList = {fundtype: "", fundlist: [], otherlist:[]};
        jsonResult.productList.forEach(function (product,index) {
            //----------------------------------恒生个性化设置----------------------------------
            if(product.middleextra){
                let middleextra = JSON.parse(product.middleextra);
                if(product.fundtype == '2'){//货币
                    /*var hfincomeratio = product.hfincomeratio.split(".");
                    product.hfincomeratio = hfincomeratio[0] + "." + hfincomeratio[1].substring(0,middleextra.jzws);*/
                }else{
                    let pernetvalue = product.pernetvalue.split(".");
                    product.pernetvalue = pernetvalue[0] + "." + pernetvalue[1].substring(0,middleextra.jzws);
                }
            }
            //----------------------------------恒生个性化设置----------------------------------

            //----------------------------------放入新发基金------------------------------------
            if(product.fundstate == "1" && fundDict.caption == "新发"){
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
                }else{
                    productList.fundlist.push(product);
                }
                return;
            }
            //----------------------------------放入新发基金------------------------------------

            if(product.fundstate != "1"  && fundDict.caption != "新发"){//不是新发基金类型筛选
                if (fundDict.keyvalue == product.fundtypedisplay) {
                    if (product.fundtype == '2') {
                        productList.otherlist.push(product);
                    }else{
                        productList.fundlist.push(product);
                    }
                }
            }
        });
        if (productList.fundlist.length > 0 || productList.otherlist.length > 0 ) {
            that.data.tabTitles.push({title: fundDict.caption});
            productList.fundtype = fundDict.keyvalue;
            that.data.demoList.push(productList);
            
            //----------------------------------放入新发基金------------------------------------
            if(fundDict.caption == "新发"){
                productList.fundlist.forEach(function(item){
                    if(item.subscribestate  == '1'){
                        that.data.blockList.push(item);
                    };
                });
                if(productList.otherlist.length > 0){
                    productList.otherlist.forEach(function(item){
                        if(item.subscribestate  == '1'){
                            that.data.blockList.push(item);
                        }
                    })
                }
                if(that.data.blockList.length > 3){
                    that.blockList.slice(0,3);
                }
                if (that.data.blockList.length > 0){
                    that.newFund = true;
                }
            }

        }
        that.setData({
            tabTitles: that.data.tabTitles,
            demoList: that.data.demoList
        })
      });
  },
})
