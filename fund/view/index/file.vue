
<template>
    <div class="bg">
        <scroller :class="[showNavbar=='true'&&'mt90']">
            <div class="h15"></div>
            <div class="cell-file flex-row">
                <text class="label">基金全称</text>
                <text class="info-wrap-text flex-1">{{info.fundfullname}}</text>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">基金简称</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.shortname}}</text>
                </div>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">基金代码</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.fundcode}}</text>
                </div>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">发行日期</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.issuedate | formatDate}}</text>
                </div>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">成立日期</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.fundsetupdate | formatDate}}</text>
                </div>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">管理费</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.managerfee ? info.managerfee : ""}}</text>
                </div>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">托管费</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.trusteefee ? info.trusteefee : ""}}</text>
                </div>
            </div>
            <div class="cell-file flex-row " v-if="info.servicefare">
                <text class="label">销售服务费</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.servicefare}}</text>
                </div>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">收费方式</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.sharetype}}</text>
                </div>
            </div>

            <div v-for="(item,index) in tree" :key="index">
                <div class="cell-file flex-row justify-between align-center " @click="togglebox(item)">
                    <text class="label">{{item.name}}</text>
                    <image class="info-wrap-img" v-if="!item.boxshow" src="images/arr-right.png"></image>
                    <image class="info-wrap-img" v-if="item.boxshow" src="images/arr-down.png"></image>
                </div>
                <text class="toggle-box" v-if="item.boxshow">{{item.content}}</text>
            </div>

            <div class="cell-file flex-row ">
                <text class="label">基金管理人</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.fundmanager}}</text>
                </div>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">基金托管人</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.trusteename}}</text>
                </div>
            </div>
        </scroller>
        <navbar title="基金档案" v-if="showNavbar=='true'"></navbar>

        
    </div>
</template>
<script>
    import Light from "light";
    import API from '../../api/api.js';
    import LcTabPage from "lighting-ui/packages/lc-tab-page";
    import Utils from "lighting-ui/packages/utils";
    import navbar from "../../components/ui/navbar";
    import loadingUI from "../../components/ui/loadingUI";
    import config from '../../config';
    var event = Light.requireModule('event');
    var modal = Light.requireModule('modal');
    var storage = Light.requireModule('storage');
    var stream = Light.requireModule('stream');


    

    export default {
        components: { LcTabPage, navbar, loadingUI },
        data() {
            return {
                showNavbar: false,
                title: "基金档案",
                tabTitles: [
                    { title: "基金概况" },
                    // { title: "基金公告" },
                    { title: "资产配置" }
                ],
                tabStyles: {
                    bgColor: "#FFFFFF",
                    titleColor: "#323232",
                    activeTitleColor: "#3580ee",
                    activeBgColor: "#FFFFFF",
                    isActiveTitleBold: false,
                    width: 250,
                    height: 80,
                    fontSize: 32,
                    hasActiveBottom: true,
                    activeBottomColor: "#3580ee",
                    activeBottomHeight: 6,
                    activeBottomWidth: 220,
                    textPaddingLeft: 10,
                    textPaddingRight: 10
                },
                needSlider: true,
                isTabView: true,
                tabPageHeight: "",
                loadShow: false,//加载中
                fundcode: "",
                asset: "",//资产规模
                assetDate:"",
                info: {},//基金信息
                tree: [],
                bonus: 0,
                tabIndex: 0,
                segment: [
                    // { text: "业务公告" },
                    // { text: "定期公告" },
                    // { text: "法律文件" },
                    // { text: "新闻资讯" }
                ],
                reportData: [
                    {
                        pageno: 1,
                        datalist: [],
                        totalCount: 0,
                        hasMore: false
                    },
                    {
                        pageno: 1,
                        datalist: [],
                        totalCount: 0,
                        hasMore: false
                    },
                    {
                        pageno: 1,
                        datalist: [],
                        totalCount: 0,
                        hasMore: false
                    },
                    {
                        pageno: 1,
                        datalist: [],
                        totalCount: 0,
                        hasMore: false
                    }
                ],
                zcList: [],//资产分布
                hyList: [],//行业分布
                gpccList: [],//十大股票持仓
                zqccList: [],//债券持仓
                zqccTitle:"十大债券重仓",
                tabIndex1: 0,
                ccListNodata:false,//有无持仓数据
                fundtypedisplay:"",//基金类型
                segment1: [
                    { text: "资产分布" },
                    // { text: "品种明细" },
                    { text: "行业分布" },
                ],
                webUrl:""
            };
        },
        filters: {
            formatDate: function (value) {
                if(value){
                    return API.hsTools.yyyy_mm_dd(value);
                }else{
                    return "";
                }

            },
            formatDate2: function (value) {
                return API.hsTools.mm_dd(value);
            }
        },
        methods: {
            jump(url, title) {
                API.route.hsOpen(url, {fundcode: this.fundcode}, {replace: false,title:title,headHidden:true});
            },
            togglebox: function(item) {
                item.boxshow = !item.boxshow;
            },
            changeTab(index) {
                this.tabIndex = index;
            },
            changeTab1(index) {
                this.tabIndex1 = index;
            },
            //获取基金概况
            productDetail(){
                var that = this;
                if(process.env.RUNTIME.toLowerCase()==='web') {
                    stream.fetch({
                        method: "get",
                        // url: 'https://m.py-axa.com/appServer/product/product/productDetail.json?fundcode=519171&channel=gh_1bc20b27f070&jsonpCallback=jsonp_1&appServertimestamp=1570762801857&_=1570762801857&callback=jsonp_1',
                        url: 'https://i0zsm2fnx.lightyy.com/productDetail.json',
                        type: 'jsonp',
                        jsonpCallbackName: 'productDetail',
                        headers: {}
                    }, function(ret) {
                        if(!ret.ok) return;
                        that.info = ret.data.result;
                    })
                } else {
                    Light.ajax({
                        url: "https://i0zsm2fnx.lightyy.com/productDetail.json",
                        type: 'get',
                        dataType: 'json',
                        jsonpCallbackName: 'productDetail',
                        headers: {},
                        success: function (res) {
                            that.info = res.result;
                        }
                    })
                }
               

                // var data = API.formGenerate()
                //     .add("fundcode", this.fundcode)
                //     .generate();
                // this.loadShow = true;
                // API.get("product/product/productDetail", data,(jsonResult) => {
                //     this.loadShow = false;
                //     if (jsonResult && jsonResult.successful) {
                //         if(jsonResult.result) {
                //             var result = jsonResult.result;
                //             this.fundtypedisplay=jsonResult.result.fundtypedisplay;
                //              this.fundallocationquery();//获取投资组合
                //             if(result.fundtype == "S"){
                //                 this.segment1.push({ text: "申赎清单" });
                //                 var fundcode = "";
                //                 if(jsonResult.result.middleextra){
                //                     var middleextra = JSON.parse(jsonResult.result.middleextra);
                //                     fundcode = middleextra.yjscdm;
                //                 }
                //                 this.webUrl = config.etfappfundlist + fundcode;
                //             }
                //             if(result.sharetype=="A") result.sharetype="前端收费";
                //             else if(result.sharetype=="B") result.sharetype="后端收费";
                //             else result.sharetype="前端收费, 后端收费";
                //             if(result.defaultautobuy=="0") result.defaultautobuy="红利再投资";
                //             else if(result.defaultautobuy=="1") result.defaultautobuy="现金红利";
                //             if(result.shortname){
                //                 result.fundname = result.shortname;
                //             }
                //             this.info = result;
                //             var tz = [];
                //             if(this.info.startinvestamount) {
                //                 tz.push(
                //                     {
                //                         name: "申购起点",boxshow: false,
                //                         content: this.info.startinvestamount
                //                     }
                //                 );
                //             }
                //             if(this.info.prodinvestobjective) {
                //                 tz.push(
                //                     {
                //                         name: "投资目标",boxshow: false,
                //                         content: this.info.prodinvestobjective
                //                     }
                //                 );
                //             }
                //             if(this.info.prodinvestscope) {
                //                 tz.push(
                //                     {
                //                         name: "投资范围",boxshow: false,
                //                         content: this.info.prodinvestscope
                //                     }
                //                 );
                //             }
                //             if(this.info.prodinvestmentstrategy) {
                //                 tz.push(
                //                     {
                //                         name: "投资策略",boxshow: false,
                //                         content: this.info.prodinvestmentstrategy
                //                     }
                //                 );
                //             }
                //             if(this.info.riskreturncharacter) {
                //                 tz.push(
                //                     {
                //                         name: "风险收益特征", boxshow: false,
                //                         content: this.info.riskreturncharacter
                //                     }
                //                 );
                //             }
                //             if(this.info.performancebenchmark) {
                //                 tz.push(
                //                     {
                //                         name: "业绩比较基准",boxshow: false,
                //                         content: this.info.performancebenchmark
                //                     }
                //                 );
                //             }
                //             this.tree = tz;
                //             this.bonusList();
                //         }
                //     } else {
                //         API.callFailProcess(jsonResult);
                //     }
                // });
            },
            bonusList() {//分红
                var data = API.formGenerate()
                    .add("fundcode", this.fundcode)
                    .add("pageno", 1)
                    .add("pagesize", 9999)
                    .generate();
                API.get("trade/bonus/dcprofitschemaquery", data, (jsonResult) => {
                    if (jsonResult && jsonResult.successful) {
                        if(jsonResult.profitSchemaQueryBeanList != null){
                            /*var total_value = 0.00;
                            jsonResult.profitSchemaQueryBeanList.forEach((item) => {
                                total_value += parseFloat(API.hsTools.accurateMul(item.unitprofit, 10).toFixed(3));
                            });*/
                            this.bonus = parseFloat(API.hsTools.accurateMul(jsonResult.profitSchemaQueryBeanList[0].unitprofit, 10).toFixed(2));
                        }else{
                            this.info.defaultautobuy = "";
                        }
                    } else {
                        API.callFailProcess(jsonResult);
                    }
                });
            },
            //获取最新的资产配置
            fundallocationquery() {
                var data = API.formGenerate()
                    .add("fundcode", this.fundcode)
                    .add("recentFlag", 1)
                    .add("requestnum", 30)
                    .generate();
                API.get("product/product/fundallocationquery", data, (jsonResult) => {
                    if (jsonResult && jsonResult.successful) {
                        // if(jsonResult.assetAllocationQueryList.length == 0){
                        //     return;
                        // }
                        if(jsonResult.assetAllocationQueryList.length>0){
                        var dateArray = ['', '0331', '0630', '0930', '1231']; // 每季的最后一天
                        var date = API.hsTools.dateToch(API.hsTools.yyyy_mm_dd(jsonResult.assetAllocationQueryList[0].specified_year + '' + dateArray[jsonResult.assetAllocationQueryList[0].report_type]))
                        this.assetDate = date;
                        var assetAllocationQuery = [];
                        jsonResult.assetAllocationQueryList.forEach((item) => {
                            if (item.asset == "现金") {
                                item.asset = "银行存款和现金";
                            }
                            if(item.asset == "合计"){
                                var market_value = API.hsTools.formatMoney(API.hsTools.decimal2(item.market_value / 100000000.00));	// 单位：亿元
                                this.asset = market_value + "亿元";
                            }
                            if (item.ratio_in_nv) {
                                item.ratio_in_nv = API.hsTools.decimal4(item.ratio_in_nv) * 100;
                                item.ratio_in_nv = item.ratio_in_nv.toString().substr(0,4);
                                assetAllocationQuery.push(item);
                            }
                        });
                        assetAllocationQuery.sort(function (i, j) {
                            return parseFloat(i.ratio_in_nv) > parseFloat(j.ratio_in_nv) ? 1 : -1;
                        });
                        this.zcList = assetAllocationQuery;
                        }


                        jsonResult.heavyWeightStocksQueryList.forEach((item) => {
                            item.ratio_in_nv = API.hsTools.decimal2(parseFloat(item.ratio_in_nv) * 100);
                        });
                        jsonResult.heavyWeightStocksQueryList.sort(function (i, j) {
                            return parseFloat(i.ratio_in_nv) > parseFloat(j.ratio_in_nv) ? -1 : 1;
                        });
                        if(jsonResult.bondPortifolioDetailList){
                        jsonResult.bondPortifolioDetailList.forEach((item) => {
                            item.ratio_in_nv = API.hsTools.decimal2(parseFloat(item.ratio_in_nv) * 100);
                        });
                        jsonResult.bondPortifolioDetailList.sort(function (i, j) {
                            return parseFloat(i.ratio_in_nv) > parseFloat(j.ratio_in_nv) ? -1 : 1;
                        });
                        }
                        jsonResult.investIndustryQueryList.forEach((item) => {
                            if (item.ratio_in_nv) {
                                item.ratio_in_nv = API.hsTools.decimal2(parseFloat(item.ratio_in_nv) * 100);
                            } else {
                                item.ratio_in_nv = 0;
                            }
                        });
                        jsonResult.investIndustryQueryList.sort(function (i, j) {
                            return parseFloat(i.ratio_in_nv) > parseFloat(j.ratio_in_nv) ? 1 : -1;
                        });


                        this.hyList = jsonResult.investIndustryQueryList;
                       if(this.fundtypedisplay=="01"){//债券 十大股票持仓 五大债券持仓
                         this.gpccList = jsonResult.heavyWeightStocksQueryList;
                        if(jsonResult.bondPortifolioDetailList&&jsonResult.bondPortifolioDetailList.length>=5){
                             for(let i = 0; i < 5; i++) {
                                 this.zqccList.push(jsonResult.bondPortifolioDetailList[i]);
                             }
                            this.zqccTitle="五大债券持仓";
                        }
                        if(jsonResult.investIndustryQueryList.length==0&&jsonResult.bondPortifolioDetailList&&jsonResult.bondPortifolioDetailList.length<5){
                            this.ccListNodata=true;
                        }else{
                             this.ccListNodata=false;
                        }
                       }else if(this.fundtypedisplay=="03"||this.fundtypedisplay=="02"){//混合  指数 十大股票持仓 五大债券
                         this.gpccList = jsonResult.heavyWeightStocksQueryList;

                        if(jsonResult.bondPortifolioDetailList&&jsonResult.bondPortifolioDetailList.length>=5){
                             for(let i = 0; i < 5; i++) {
                                 this.zqccList.push(jsonResult.bondPortifolioDetailList[i]);
                             }
                           this.zqccTitle="五大债券持仓";
                        }

                        if(jsonResult.investIndustryQueryList.length==0&&jsonResult.bondPortifolioDetailList&&jsonResult.bondPortifolioDetailList.length<5){
                            this.ccListNodata=true;
                        }else{
                             this.ccListNodata=false;
                        }

                       }else if(this.fundtypedisplay=="00"){//货币 十大债券持仓

                        if(jsonResult.bondPortifolioDetailList&&jsonResult.bondPortifolioDetailList.length>=10){
                             for(let i = 0; i < 10; i++) {
                                 this.zqccList.push(jsonResult.bondPortifolioDetailList[i]);
                             }
                               this.zqccTitle="十大债券持仓";
                        }
                        if(jsonResult.bondPortifolioDetailList&&jsonResult.bondPortifolioDetailList.length<10){
                            this.ccListNodata=true;
                        }else{
                             this.ccListNodata=false;
                        }
                       }else{
                            this.gpccList = jsonResult.heavyWeightStocksQueryList;

                        if(jsonResult.heavyWeightStocksQueryList.length==0){
                            this.ccListNodata=true;
                        }else{
                             this.ccListNodata=false;
                        }
                       }


                    } else {
                        API.callFailProcess(jsonResult);
                    }
                });
            },
            //获取公告
            getReport(state){
                var columnid = "";
                if(state == 0){
                    columnid = "px200707261442175000";
                }else if(state == 1){
                    columnid = "px100723112750370000";
                }else if(state == 2){
                    columnid = "px071009044149804000";
                }else if(state == 3){
                    columnid = "px200707021428241000";
                }
                var data = API.formGenerate()
                    .add("fundcode", this.fundcode)//519110
                    .add("pageno", this.reportData[state].pageno)
                    .add("pagesize", 10)
                    .add("columnid", columnid);
                API.otherGet("apiArticleSelect", data.generate(), (jsonResult) => {
                    if(jsonResult != null){
                        jsonResult = JSON.parse(jsonResult);
                        this.reportData[state].datalist = this.reportData[state].datalist.concat(jsonResult.dataList);
                        this.reportData[state].totalRecords += jsonResult.dataList.length;
                        if (this.reportData[state].totalRecords == jsonResult.totalcount) {
                            this.reportData[state].hasMore = false;
                        } else {
                            this.reportData[state].pageno++;
                            this.reportData[state].hasMore = true;
                        }
                    }
                })

            },
            getLink(item){
                if(item.alink.indexOf(".pdf") > 0){//存在 pdf 结尾
                    if(API.matchNative()){//手机打开 PDF
                        API.previewFile(config.pdfUrl + item.alink);
                    }else{// 浏览器打开 PDF, 不支持安卓 h5
                        location.href = "http://ito8gby4g.lightyy.com/web/viewer.html?file=" + encodeURIComponent(config.pdfUrl + item.alink);
                    }
                }else{
                    API.route.hsOpen("otherHtml",{id:item.articlepk},{replace:false, headHidden: true});
                }
            }
        },
        mounted() {
            this.productDetail();//获取基金详情
            this.getReport(0);
            this.getReport(1);
            this.getReport(2);
            this.getReport(3);

            this.tabPageHeight = Utils.env.getPageHeight();
        },
        //页面初始化得到传入的值
        beforeShow(params) {
            this.showNavbar = params.showNavbar;
        },
        afterShow(data){
            if (data.fundcode) {
                this.fundcode = data.fundcode;
            }
        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .item-container {width: 750px;}
    .cell-file {
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 30px;
        padding-right: 30px;
        background-color: #fff;
    }
    .label {
        font-size: 28px;
        color: #808080;
        width: 185px;
    }
    .info-wrap-text {
        font-size: 28px;
        color: #333;
    }
    .info-wrap-img {
        width: 30px;
        height: 30px;
    }
    .c-blue {
        color: #3c94fe;
    }
    .toggle-box {
        padding-top: 25px;
        padding-bottom: 25px;
        padding-left: 30px;
        padding-right: 30px;
        background-color: #fff;
        color: #333;
        font-size: 28px;
        border-top-width: 1px;
        border-top-color: #e8e8e8;
        border-bottom-width: 1px;
        border-bottom-color: #e8e8e8;
    }

    .tabBar-wrap {
        width: 692px;
        height: 60px;
        border-width: 2px;
        border-color: #3580ee;
        border-radius: 5px;

    }
    .tabBar-text {
        flex: 1;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }
    .active {
        background-color: #3580ee;
        color: #fff;
    }
    .border-right {
        border-right-width: 2px;
        border-right-color: #3580ee;
    }
    .list-n {
        /*height: 1200px;*/
        background-color: #fff;
    }
    .cell-n {
        width: 690px;
        height: 180px;
        justify-content: center;
        position: relative;
        border-bottom-width: 1px;
        border-bottom-color: #e8e8e8;
    }
    .cell-text-1 {
        font-size: 32px;
        color: #ee5a24;
    }
    .cell-text-2 {
        font-size: 24px;
        color: #5e5e5e;
    }
    .cell-text-3 {
        font-size: 28px;
        color: #333;
        lines: 2;
        text-overflow: ellipsis;
    }
    .cell-type-img {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 70px;
        height: 50px;
    }

    .tabBar-wrap-d {
        width: 540px;
        height: 60px;
        border-width: 2px;
        border-color: #3580ee;
        border-radius: 5px;
    }
    .tabBar-text-d {
        flex: 1;
        align-items: center;
        justify-content: center;
        background-color: #fff;
    }
    .active-d {
        background-color: #3580ee;
        color: #fff;
    }
    .cell-d-top {
        height: 90px;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom-width: 1px;
        border-bottom-color: #e8e8e8;
        background-color: #fff;
    }
    .cell-d {
        height: 90px;
        margin-left: 30px;
        margin-right: 30px;
        width: 690px;
        border-bottom-width: 1px;
        border-bottom-color: #e8e8e8;
        background-color: #fff;
    }
    .label-d {
        font-size: 28px;
        color: #333;
    }
    .info-wrap-text-d {
        width: 265px;
        font-size: 28px;
        color: #333;
        text-align: center;
    }
    .font-b {
        font-weight: bold;
    }
    .shutiao {
        width: 7px;
        height: 30px;
        background-color: #3580ee;
    }
    .title {
        font-size: 32px;
        color: #333;
        margin-left: 15px;
        font-weight: bold;
    }
    .bg {
        background-color: #f1f0f6;
    }
    .h15{
        height: 15px;
        background-color: #f1f0f6;
    }
    .tabBox{
        height: 110px;
        background-color:#f1f0f6;
    }

    .tip-box{position: absolute; top:300px; width: 600px; left:75px;}
    .noList{width: 268px; height: 240px;}
    .tip_left{
        background-color: #fff;
        /*margin-left: 170px;*/
        /*flex: 1;*/
        height: 1000px;
    }
    .scroller_bj{
        background-color: #fff;
    }
</style>
