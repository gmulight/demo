//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imageList: [
        { src: 'http://101.71.12.145:7705/upload/image/25c3165a55c34b23ab456aae6bacc7ae.png' },
        { src: 'http://101.71.12.145:7705/upload/image/4e9302c6702f47cd905cbc6d2370e950.png' },
        { src: 'images/ding-banner.png' },
    ],
    activeIndex: 1,
    isAndroid: false,
    isIOS: false,
    isIPhoneX: false,
    hotIcon: false,
    hotName: "精选主题",
    hotNameTwo:'优选基金',
    scrollerHeight: 0,
    loadShow: true, //遮罩层必须参数
    refreshing:'hide',
    refreshText:'',
    refreshFlag:false,
    channel:"",
    preview:false,
    loginState:true,
    isRefreshStop: true,
    openFund:true,
    hotList:[
        {
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
                "tags": [
                    "收益稳健",
                    "混合投资"
                ]
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
        },
        {
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
                "tags": [
                    "大数据",
                    "数据时代",
                    "投资灵活"
                ]
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
        },
        {
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
                "tags": [
                    "定期开放"
                ]
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
        }
    ],
    specialist:[
        {
            "id": 4,
            "templateDataId": 56,
            "title": "事件驱动",
            "subTitle": "把握热门事件",
            "iconFilename": "http://101.71.12.145:7705/upload/image/d631b15b659c4a1896b78adbfa275df8.png",
            "linkType": "3",
            "link": "https://mcpc6pje8.lightyy.com/fund_hero_detail.html?fundType=sjqd&h=0&p=hsjy_0000&u=null#/fund_hero/fund_hero_detail",
            "memo": null
        },
        {
            "id": 5,
            "templateDataId": 57,
            "title": "轮动策略",
            "subTitle": "赚取超额收益",
            "iconFilename": "http://101.71.12.145:7705/upload/image/09be0eefc46a401aab2acd0035110d63.png",
            "linkType": "3",
            "link": "https://mcpc6pje8.lightyy.com/fund_hero_detail.html?fundType=ldcl&h=0&p=hsjy_0000&u=null#/fund_hero/fund_hero_detail",
            "memo": null
        }
    ],
    fundList:[
        {
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
                "tags": [
                    "指数为王",
                    "上证50"
                ]
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
        },
        {
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
                "tags": [
                    "布局高端",
                    "精工制造"
                ]
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
        }
    ]
  },
  
  onLoad: function () {
    
  },
  
})
