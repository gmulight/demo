<template>
<div>
        <div :class="[(showNavbar=='true'||showNavbar==true)&&'mt90']" style="background-color: #f1f0f6">
            <!-- <div class="back-btn">
                <image src="images/back-dark.png" class="img-back" @click="goBack"></image>
            </div> -->
            <scroller :scrollable="isScrollable" :style="{height: scrollerHeight + 'px'}">
            <div class="flex-row align-center fund-head" v-if="fundinfo.fundtype != '2'">
                <div class="flex-1 pl60">
                    <text class="font-12 m-color-6">日涨跌幅</text>
                    <text :class="returnClass(dayinc)" class="font-24 font-bold mt15" v-if="navdate != '--'">{{dayinc}}</text>
                    <text class="m-color-9 font-24 font-bold mt15" v-else>--</text>
                </div>
                <div class="flex-1 pl60">
                    <div class="flex-row">
                        <text class="font-12 m-color-6">最新净值(元)</text>
                        <text class="font-12 m-color-6 ml10" v-if="navdate != '--'">{{navdate}}</text>
                    </div>
                    <text class="font-24 m-color-1 font-bold mt15" v-if="navdate != '--'">{{pernetvalue}}</text>
                    <text class="font-24 m-color-1 font-bold mt15" v-else>--</text>
                </div>
                <div class="line-view"></div>
            </div>
            <div class="flex-row align-center fund-head" v-else>
                <div class="flex-1 pl60">
                    <text class="font-12 m-color-6">七日年化收益率</text>
                    <text :class="returnClass(fundinfo.incomeratio)" class="font-24 font-bold mt15">{{incomeratio}}</text>
                </div>
                <div class="flex-1 pl60">
                    <div class="flex-row">
                        <text class="font-12 m-color-6">万份收益(元)</text>
                        <text class="font-12 m-color-6 ml10">{{navdate}}</text>
                    </div>
                    <text class="font-24 m-color-1 font-bold mt15">{{fundinfo.hfincomeratio}}</text>
                </div>
                <div class="line-view"></div>
            </div>

            <div class="flex-row align-center fund-mid">
                <div class="flex-1 flex-row">
                <text class="font-12 m-color-1 pr20 borderR">{{fundtypestr}}</text>
                <div class="flex-row align-center" v-if="risklevelstr">
                    <text class="m-color-8 ml20 mr10 font-12">{{risklevelstr}}</text>
                    <image src="images/risk.png" class="risk-icon" @click="riskShow"></image>
                </div>
                </div>
                <div class="flex-row">
                <text class="font-12 m-color-6 pl60" style="height: 25px;line-height: 25px" v-if="fundinfo.fundstate != '1'">申购起点</text>
                <text class="font-12 m-color-6 pl60" style="height: 25px;line-height: 25px" v-else>认购起点</text>
                <text class="font-12 m-color-6 ml10" style="height: 25px;line-height: 25px">{{fundPoint}}元</text>
                </div>
            </div>

            <!-- 图表 -->
            <div class="mt15 bgc-white" v-if="fundinfo.fundstate != '1'">
                <div v-if="chartType == 'normal'" class="chart-head flex-row align-center">
                    <div class="columnar flex-1">
                        <text class="font-14 m-color-1 font-bold">净值走势</text>
                    </div>
                    <div> <!-- @click="jump('historyvalue', '历史净值', {headHidden: true})"-->
                        <text class="font-14 m-color-3">历史净值</text>
                    </div>
                    <div class="line-view"></div>
                </div>

                
                
                <div>
                    <lt-canvas v-if="!showWebCanvas" ref="canvas" :width="750" :height="300"></lt-canvas>
                    <web-canvas v-if="showWebCanvas" ref="webCanvas" :width="750" :height="300"></web-canvas>
                </div>
                


                <!-- <div v-if="chartType == 'coin'">
                    <div class="flex-row flex-1" style="height: 90px">
                        <div class="flex-1 align-center justify-center" style="height: 90px" @click="chartTabClicked(0)">
                            <text class="font-14" :style="{color: chartTabIndex == 0 ? '#3580ee' : '#5e5e5e'}">七日年化收益率</text>
                            <div class="tab-line" :style="{backgroundColor: chartTabIndex == 0 ? '#3c94fe' : '#fff'}"></div>
                        </div>
                        <div class="flex-1 align-center justify-center" style="height: 90px" @click="chartTabClicked(1)">
                            <text class="font-14" :style="{color: chartTabIndex == 1 ? '#3580ee' : '#5e5e5e'}">万份收益</text>
                            <div class="tab-line" :style="{backgroundColor: chartTabIndex == 1 ? '#3580ee' : '#fff'}"></div>
                        </div>
                    </div>

                </div>
                <div v-if="chartLineNumber == 1" class="trend-status trend-status-one-line">
                    <text class="flex-1 font-13 m-color-9">{{trendPointDate}}</text>
                    <div class="flex-row align-center">
                        <text class="font-12 m-color-9 mr5">{{trendType}}</text>
                        <text class="font-12" style="color:#f0384f">{{trendPointValue}}</text>
                    </div>
                </div>
                <div v-if="chartLineNumber == 2" class="trend-status justify-between">
                    <div class="flex-row align-center">
                        <div style="width:20px; height:20px; margin-right:10px;" :style="{backgroundColor:trendColors[0]}"></div>
                        <text class="font-12 m-color-6 mr5">本基金</text>
                        <text class="font-12" style="color:#f0384f">{{trendPointValue1}}</text>
                        <text class="font-12" style="color:#f0384f">%</text>
                    </div>
                    <div class="flex-row align-center">
                        <div style="width:20px; height:20px; margin-right:10px;" :style="{backgroundColor:trendColors[1]}"></div>
                        <text class="font-12 m-color-6 mr5"></text>
                        <text class="font-12" style="color:#f0384f">{{trendPointValue2}}</text>
                        <text class="font-12" style="color:#f0384f">%</text>
                    </div>
                </div>
                <div @panstart="panStart" @panmove="panMove" @panend="panEnd">
                    <canvas ref="canvas_holder" style="width:750px; height:300px;"></canvas>
                    <div ref="location_line" class="location_line" v-if="locationLineVisible"></div>
                </div> -->
                <div class="flex-row tabBar-wrap">
                    <div :class="['tabBar-text', index==tabIndex?'active':'m-color-1',index==segment.length-1?'':'border-right']"
                    v-for="(item,index) in segment" :key="index" @click="switchGraphTabs(index)">
                        <text :class="['font-12', index==tabIndex?'active':'m-color-1']">{{item.text}}</text>
                    </div>
                </div>
            </div>
            <!-- <div class="mt15"  v-if="fundinfo.fundstate == '1'">
                <div class="chart-head flex-row align-center">
                    <div class="columnar flex-1">
                        <text class="font-14 m-color-1 font-bold">认购期</text>
                    </div>
                    <div class="mr10">
                        <text class="font-14 m-color-9">{{fundinfo.issuedate}}至{{fundinfo.subscribeenddate}}</text>
                    </div>
                    <div class="line-view"></div>
                </div>
            </div> -->
            <!-- 产品档案 -->
            <div class="mt15 mb120">
                <div class="chart-head flex-row align-center">
                    <div class="columnar flex-1">
                        <text class="font-14 m-color-1 font-bold">产品档案</text>
                    </div>
                    <div class="line-view"></div>
                 </div>
                <div class="flex-row aboutlist align-center"  @click="jump('file', '基金档案', {headHidden: true})"><!-- @click="jump('file', '基金档案', {headHidden: true})"-->
                    <div class="flex-1 ">
                    <text class="font-14 m-color-1">基金档案</text>
                    </div>
                    <div class="mr10">
                    <text class="font-14 m-color-9">概况</text>
                    </div>
                    <image src="images/arrow.png" class="arrow"/>
                     <div class="line-view" style="left:30px"></div>
                </div>
                 <div class="flex-row aboutlist align-center" @click="jump('managerchange', '基金经理', {headHidden: true})"><!--@click="jump('managerchange', '基金经理', {headHidden: true})"-->
                    <div class="flex-1">
                    <text class="font-14 m-color-1">基金经理</text>
                    </div>
                    <div class="mr10">
                    <text class="font-14 m-color-9">{{fundManagerName}}</text>
                    </div>
                    <image src="images/arrow.png" class="arrow"/>
                </div>
                  <div class="flex-row aboutlist align-center mt15" @click="jump('rule', '交易费率', {headHidden: true})"><!-- @click="jump('rule', '交易费率', {headHidden: true})"-->
                    <div class="flex-1">
                    <text class="font-14 m-color-1">交易费率</text>
                    </div>
                    <image src="images/arrow.png" class="arrow"/>
                     <div class="line-view"></div>
                </div>

                <div class="align-center flex-row rule-process" v-if="fundinfo.fundstate != '1' && fundDate1 != ''">
                    <div class="flex-column" style="width:160px">
                        <text class="font-14 m-color-1 t-center">申请提交</text>
                          <div class="round-box flex-1 justify-center align-center">
                            <div class="roundline"></div>
                            <div class="round"></div>
                           </div>
                        <text class="font-12 m-color-9 t-center">{{fundDate1||'今日 15 点前'}}</text>
                     </div>
                      <div class="flex-1 flex-column">
                        <text class="font-14 m-color-1 t-center">确认份额</text>
                        <div class="round-box flex-1 justify-center align-center">
                            <div class="roundline"></div>
                            <div class="round"></div>
                        </div>
                        <text class="font-12 m-color-9 t-center">{{fundDate2||'09-12 星期四'}}</text>
                    </div>
                    <div class="flex-column" style="width:170px">
                        <text class="font-14 m-color-1 t-center">查看盈亏</text>
                        <div class="round-box flex-1 justify-center align-center">
                            <div class="roundline"></div>
                            <div class="round"></div>
                         </div>
                        <text class="font-12 m-color-9 t-center">{{fundDate3||'09-16 星期一'}}</text>
                    </div>
                </div>
                <div class="align-center flex-row rule-process" v-if="fundinfo.fundstate == '1' && fundDate1 != ''">
                    <div class="flex-column" style="width:350px">
                        <text class="font-14 m-color-1 t-center">申请提交</text>
                        <div class="round-box flex-1 justify-center align-center">
                            <div class="roundline"></div>
                            <div class="round"></div>
                        </div>
                        <text class="font-12 m-color-9 t-center">{{fundDate1}}</text>
                    </div>
                    <div class="flex-1 flex-column">
                        <text class="font-14 m-color-1 t-center">申请确认</text>
                        <div class="round-box flex-1 justify-center align-center">
                            <div class="roundline"></div>
                            <div class="round"></div>
                        </div>
                        <text class="font-12 m-color-9 t-center">{{fundDate2}}</text>
                    </div>
                </div>
            </div>
            </scroller>
        </div>


            <!-- 底部按钮 -->
            <div class="flex-row bottomBtn"  v-if="((fundinfo.fundstate == '0' || fundinfo.fundstate == '1' || fundinfo.fundstate == '2' || fundinfo.fundstate == '6' ) &&
                    (fundinfo.declarestate == '0' && fundinfo.subscribestate  == '0' && fundinfo.valuagrstate == '0') || fundinfo.source != '0')">
                <div class="flex-1 disabled align-center justify-center">
                    <text class="font-18 m-color-5">特定渠道</text>
                </div>
            </div>
            <div class="flex-row bottomBtn"  v-else-if="fundinfo.declarestate == '0' && fundinfo.subscribestate  == '0' && fundinfo.valuagrstate == '0'">
                <div class="flex-1 disabled align-center justify-center">
                    <text class="font-18 m-color-5">暂停购买</text>
                </div>
            </div>
            <div class="flex-row bottomBtn" v-else-if="isFinancial">
                <div class="flex-1 flex-column align-start justify-center red-bj pl30">
                    <text class="font-14 m-color-5">剩余虚拟金</text>
                    <text class="font-14 m-color-5">{{money}}</text>
                </div>
                <div class=" align-center justify-center blue-bj" @click="financialBuy">
                    <text class="font-18 m-color-5">申 购</text>
                </div>
            </div>
            <div class="flex-row bottomBtn" v-else>
<!--                <div style="display: none" class="align-center justify-center" :class="[fundinfo.valuagrstate == '0'?'disabled':'blue-bj']"  @click="clickBtn('fixed',fundinfo.valuagrstate)" v-if="fundinfo.fundstate != '1'">-->
<!--                    <text class="font-18 m-color-5">定 投</text>-->
<!--                </div>-->
                <div class="flex-1 align-center justify-center" :class="[fundinfo.declarestate == '0' && fundinfo.subscribestate  == '0'?'disabled':'red-bj']" v-if="!isXjb"> <!--  @click="clickBtn('buy',fundinfo.declarestate, fundinfo.subscribestate)"-->
                    <text class="font-18 m-color-5" v-if="fundinfo.fundstate == '1'">认 购</text>
                    <text class="font-18 m-color-5" v-else>申 购</text>
                </div>
                <div class="flex-1 red-bj align-center justify-center" v-if="isXjb"><!-- @click="jump('trade/xjb-recharge', '现金宝充值', {headHidden: true})"-->
                    <text class="font-18 m-color-5">申 购</text>
                </div>
            </div>

            <!-- <dialog :show="isOneShow" :top=400>
                <div class="dialog-content bottom-line">
                    <text class="font-12 m-color-8 line-height-20">{{riskContent.risk1}}</text>
                    <text class="font-12 m-color-1 line-height-20 mt10">{{riskContent.risk2}}</text>
                    <text class="font-12 m-color-1 line-height-20 mt10">{{riskContent.risk3}}</text>
                </div>
                <div class="dialog-btns"  @click="hideOne">
                    <text class="font-14 m-color-3">知道了</text>
                </div>
            </dialog> -->
            <loadingUI :loadShow="loadShow"></loadingUI>
            <div v-if="showNavbar=='true'">
                <navbar :title="title" :subTitle="fundcode">
                    <div slot="rightBtn1" class="mr20 ml20" @click="changeHeart()">
                        <image class="title-img" src="images/heart.png" v-if="!heart"></image>
                        <image class="title-img" src="images/heart-1.png" v-if="heart"></image>
                    </div>
                </navbar>
            </div>
            
            <lc-tip @showTip="showTip" :show="show" type="text" :message="message"></lc-tip>
 </div>
</template>

<script>
    var lg;
    if (process.env.RUNTIME === "miniapp") {
        lg = __base__;
    } else {
        lg = weex;
    }
    import LightSDK from 'light-sdk';
    import Light from "light";
    import navbar from "../../components/ui/navbar";
    import loadingUI from "../../components/ui/loadingUI";
    import API from "../../api/api.js";
    import LcTip from 'lighting-ui/packages/lc-tip';
    import config from '../../config.js';
    import dialog from "../../components/ui/dialog";
    import Utils from "../../res/utils";
    import LightChart from 'light-chart';
    import { enable, WeexBridge, Image as GImage } from "canvas/index";
    // var isWeex = typeof callNative === "function";
    var isWeb = Utils.env.isWeb();
    const animation = Light.requireModule('animation')
    var storage = Light.requireModule("storage"); //缓存
    var stream = Light.requireModule('stream');
    var modal = Light.requireModule('modal');
    var result = require('../../mock/fundChart0.json')

    
    export default {
        components: {
            navbar, loadingUI, LcTip, dialog,
            ltCanvas:require("light-chart/canvas"),
            // webCanvas:require("light-chart/webCanvas")
            webCanvas:require("../../ui/canvas")

         },
        data() {
            return {
                isScrollable:true,
                scrollerHeight:0,
                isOneShow:false,
                loadShow: true, //遮罩层必须参数
                dayinc: "",
                navdate: "",
                pernetvalue: "",
                fundPoint: "",
                title: "",
                tabIndex: 0,
                realCanvas: {},
                cacheContext: {},
                yUnitLength: 0,
                canvasInfo: {},
                chartType: "normal",//coin
                chartTabIndex: 0,
                chartLineNumber: 1,
                heart: false,
                show: false,
                message: '',
                isXjb:false,

                lowestrisktolerance:"",
                riskability:"",
                fundcode:"",
                fundstate:"",
                fundinfo:{},
                risklevel:"",
                fundtype:"",
                fundname:"",
                fundtypestr:"",
                risklevelstr:"",
                incomeratio:"",

                trendLeftValue: [[],[]],
                trendBottomValue: [[],[]],
                locationLineVisible: false,
                trendPointDate: "",
                trendType: "单位净值",
                trendTypeList: ["七日年化收益率", "万份收益"],
                trendPointValue: "",
                trendPointValue1: "1.77",
                trendPointValue2: "-1.88",
                gridColor: "#ddd",
                segment: [
                    { text: "近一月" },
                    { text: "近一季" },
                    { text: "近半年" },
                    { text: "近一年" },
                    { text: "成立以来" }
                ],
                trendPointsList: [],
                trendDataList: [[[],[],[],[],[]],[[],[],[],[],[]]],
                hisMarketData:[[],[],[],[],[],[],[],[],[],[]],
                trendColors: [
                    "#3580ee",
                    "#f09031"
                ],
                trendFillColor: "#d8eefc",
                disabled:false,
                fundManagerName:"",
                fundManagerShow:false,
                trendPointHfincomeratio:"",
                trendPointIncomeratio:"",
                isCanvasData:false,
                riskmessage:[
                    {risk1:"R1-低风险",risk2:"适合人群：",risk3:"保守型、稳健型、平衡型、积极型、进取型"},
                    {risk1:"R2-中低风险",risk2:"适合人群：",risk3:"稳健型、平衡型、积极型、进取型"},
                    {risk1:"R3-中风险",risk2:"适合人群：",risk3:"平衡型、积极型、进取型"},
                    {risk1:"R4-中高风险",risk2:"适合人群：",risk3:"积极型、进取型"},
                    {risk1:"R5-高风险",risk2:"适合人群：",risk3:"进取型"},
                ],
                riskContent:{},
                fundDate1:"",
                fundDate2:"",
                fundDate3:"",
                loginState:true,
                isApp: true,
                isFinancial: false,
                money:"0.00",
                activityid:"",
                openFund:true,
                riskabilityStr:"",
                fundtypedisplaystr:"",
                chartData:[],
                chart:null,
                newChartData: [[],[],[],[],[]],
                showNavbar: false,
                showWebCanvas: process.env.RUNTIME==='native'
            };
        },
        watch:{//恒生个性化代码可删除
            trendPointValue(newVal){
                if(this.fundinfo.middleextra && newVal.indexOf("%") == -1 && this.fundinfo.fundtype != "2"){
                    var middleextra = JSON.parse(this.fundinfo.middleextra);
                    var value = newVal.split(".");
                    this.trendPointValue = value[0] + "." + value[1].substring(0,middleextra.jzws);
                }
                if(this.fundinfo.fundtype == "2" && this.chartTabIndex == 0){
                    if(this.fundinfo.middleextra && JSON.parse(this.fundinfo.middleextra).jzws){
                        var middleextra = JSON.parse(this.fundinfo.middleextra);
                        var incomeratio = newVal.split(".");
                        this.trendPointValue = (incomeratio[0] + "." + incomeratio[1].substring(0,middleextra.jzws)) + "%";
                    }
                }
            }
        },
        methods: {
            goBack() {
                this.$light.navigateBack()
            },

            riskShow(){
                this.isOneShow = true;
            },
            hideOne(){
                this.isOneShow = false;
            },
            returnClass(value) {
                if (parseFloat(value) > 0 || parseFloat(value) == 0) {
                    return ["m-color-red"];
                } else if(value == "--"){
                    return ["m-color-9"];
                } else {
                    return ["m-color-green"];
                }
            },
            share(){
                var params={
                    "title": config.shareTitle,
                    "content": config.shareContent,
                    "url": config.shareUrl,
                    "image": config.shareImage
                };
                LightSDK.native.socialShare(params);
            },
            showTip() {
                this.show = false;
            },
            clickBtn(type,state, subscribestate){
                // if(!this.loginState){//未登录
                //     Light.navigate('login/login-app', {}, {headHidden: true});
                //     return;
                // }
                if (type == "fixed" && state == "1") {

                  if(this.openFund){
                    API.route.hsOpen('dingtou/add-fun', {fundcode: this.fundcode}, {
                      replace: false,
                      headHidden: true,
                    })
                  }else{
                    API.route.hsOpen('trade/fixed-investment', {fundcode: this.fundcode}, {
                      replace: false,
                      navigationBarShow: false
                    });
                  }


                } else if (type == "buy" && (state == "1" ||subscribestate == "1")) {
                    API.route.hsOpen('trade/apply', {fundcode: this.fundcode}, {
                        replace: false,
                        headHidden: true
                    });
                }
            },
            tapStar: function (starStatus,message) {
                var fundcode = this.fundcode;
                var data = API.formGenerate()
                    .add("status", starStatus)
                    .add("fundcode", fundcode)
                    .add("followtype", "1")
                    .generate();
                API.get("account/myfollows/followChange", data, (jsonResult) => {

                    var attributes = {"c_risklevel":this.riskabilityStr,"c_prodtype":this.fundtypedisplaystr,"c_prodcode":this.fundcode,
                        "c_prodname":this.fundname,"c_theme":"favourFund"};

                    if(starStatus){
                        API.analytics(attributes,jsonResult,"followChangeTrue");
                    }else{
                        API.analytics(attributes,jsonResult,"followChangeFalse");
                    }
                    this.show = true;
                    if (!jsonResult.successful) {
                        this.message = "使用此功能需要登录";
                    }else{
                        this.message = message;
                        this.heart = !this.heart;
                        var pageRefresh = {isfundListRefresh: true};//用于基金列表刷新页面
                        storage.setItem("pageRefresh",JSON.stringify(pageRefresh));
                    }
                });

            },
            changeHeart() {
                this.heart = !this.heart;
                this.message = this.heart ? '自选成功' : '取消自选成功';
                this.show = true;
                // setTimeout(()=>{
                //     this.show = false;
                // }, 1500)
            },
            
            jump(url, title, params) {
                if (url == "historyvalue") {
                    var attributes = {
                        "c_risklevel": this.riskabilityStr,
                        "c_prodtype": this.fundtypedisplaystr,
                        "c_prodcode": this.fundcode,
                        "c_prodname": this.fundname,
                        "pageid": "historyvalue"
                    };
                    // API.analytics(attributes, "", "");

                    // storage.getItem("accoInfo", (e) => {
                    //     var userId;
                    //     if (e.data != "undefined") {
                    //         var accoInfo = JSON.parse(e.data);
                    //         var infoData = accoInfo.accountInfo;
                    //         userId = infoData.custuuid;
                    //     } else {
                    //         userId = "";
                    //     }
                    //     Countly.q.push(['openPage', {
                    //         pageId: "/index/historyvalue", userId: userId, other: attributes
                    //     }]);
                    // });
                }
                else if (url == "file") {
                    var attributes = {"c_risklevel":this.riskabilityStr,"c_prodtype":this.fundtypedisplaystr,"c_prodcode":this.fundcode,"c_prodname":this.fundname,"pageid":"file"};
                    // API.analytics(attributes,"","");

                    // storage.getItem("accoInfo", (e) => {
                    //     var userId;
                    //     if (e.data != "undefined") {
                    //         var accoInfo = JSON.parse(e.data);
                    //         var infoData=accoInfo.accountInfo;
                    //         userId=infoData.custuuid;
                    //     } else {
                    //         userId="";
                    //     }
                    //     Countly.q.push(['openPage', {
                    //         pageId: "/index/file", userId:userId , other: attributes
                    //     }]);
                    // });
                }
                else if (url=="managerchange"){
                    // var attributes = {"c_risklevel":this.riskabilityStr,"c_prodtype":this.fundtypedisplaystr,"c_prodcode":this.fundcode,"c_prodname":this.fundname,"pageid":"managerchange"};
                    // API.analytics(attributes,"","");

                    //     storage.getItem("accoInfo", (e) => {
                    //         var userId;
                    //         if (e.data != "undefined") {
                    //             var accoInfo = JSON.parse(e.data);
                    //             var infoData=accoInfo.accountInfo;
                    //             userId=infoData.custuuid;
                    //         } else {
                    //             userId="";
                    //         }
                    //         Countly.q.push(['openPage', {
                    //             pageId: "/index/managerchange", userId:userId , other: attributes
                    //         }]);
                    //     });
                }
                else if (url == "rule") {
                    // var attributes = {"c_risklevel":this.riskabilityStr,"c_prodtype":this.fundtypedisplaystr,"c_prodcode":this.fundcode,"c_prodname":this.fundname,"pageid":"rule"};
                    // API.analytics(attributes,"","");
                    //         storage.getItem("accoInfo", (e) => {
                    //             var userId;
                    //             if (e.data != "undefined") {
                    //                 var accoInfo = JSON.parse(e.data);
                    //                 var infoData=accoInfo.accountInfo;
                    //                 userId=infoData.custuuid;
                    //             } else {
                    //                 userId="";
                    //             }
                    //             Countly.q.push(['openPage', {
                    //                 pageId: "/index/rule", userId:userId , other: attributes
                    //             }]);
                    //         });
                }
                params.replace = false;
                params.title = title;
                var data = {fundcode:this.fundcode,fundstate:this.fundstate,buybusin:this.fundinfo.buybusin};
                // if(url == "trade/xjb-recharge" && !this.loginState){//未登录
                //     Light.navigate('login/login-app', {}, {headHidden: true});
                //     return;
                // }else
                if(url == 'historyvalue' && this.fundinfo.middleextra){//恒生个性化代码可删除
                    data.middleextra = encodeURIComponent(this.fundinfo.middleextra);
                }
              
               
                var navBarType = this.showNavbar=='true' ? 2 : 1;
                params.navBarType = navBarType;
                data.showNavbar = this.showNavbar;

                // API.route.hsOpen(url, data, params);
                this.$light.navigate(url,data,params)
            },
            setFundInfo(fundinfo) {
                var that = this;

                this.fundinfo = fundinfo;
                this.risklevel = fundinfo.risklevel;
                this.fundtype = fundinfo.fundtype;
                this.fundname = fundinfo.shortname ? fundinfo.shortname : fundinfo.fundname;
                // this.title = fundinfo.shortname ? fundinfo.shortname : fundinfo.fundname;
                this.dayinc = fundinfo.dayinc;
                this.fundtypestr = fundinfo.fundtypedisplaystr;
                this.risklevelstr = fundinfo.risklevelstr;
                this.fundPoint = fundinfo.startamount == null ? "0.00" : API.hsTools.formatMoney(parseFloat(fundinfo.startamount) * 10000);
                this.navdate = API.hsTools.yyyy_mm_dd(fundinfo.navdate);
                this.fundstate = fundinfo.fundstate;
                // fundinfo.fundstate == "0" ? "开放申购，开放赎回" : fundinfo.fundstatestr; 基线版ued要求注释
                fundinfo.fundstatestr = "";
                // storage.getItem("custtype",(e) => {
                //     if (e.data != "undefined") {
                //         that.followQuery();
                //     } else {
                //         API.get("account/account/queryCustType", "", (jsonResult) => {
                //             if (jsonResult.successful) {
                //                 that.followQuery();
                //             }
                //         });
                //     }
                // });
                if(fundinfo.fundtype == "2") {
                    if(this.fundinfo.incomeratio){
                        if(fundinfo.middleextra && JSON.parse(this.fundinfo.middleextra).jzws){
                            var middleextra = JSON.parse(fundinfo.middleextra);
                            var incomeratio = fundinfo.incomeratio.split(".");
                            this.incomeratio = (incomeratio[0] + "." + incomeratio[1].substring(0,middleextra.jzws)) + "%";
                        }else{
                            this.incomeratio = this.fundinfo.incomeratio;
                        }
                    }else{
                        this.incomeratio = this.fundinfo.incomeratio;
                    }
                    this.chartType = "coin";
                } else {
                    this.chartType = "normal";
                }
                if(fundinfo.fundstate == "1") { //认购状态不需要画曲线图
                    this.dayinc = "--";
                    fundinfo.issuedate = API.hsTools.formatDate(fundinfo.issuedate);
                    if(this.fundinfo.middleextra && JSON.parse(this.fundinfo.middleextra).subscribeEndDate){
                        var middleextra = JSON.parse(this.fundinfo.middleextra);
                        fundinfo.subscribeenddate = API.hsTools.formatDate(middleextra.subscribeEndDate);
                    }else{
                        fundinfo.subscribeenddate = API.hsTools.formatDate(fundinfo.subscribeenddate);
                    }
                } else {
                   this.getHisMarket("30", 0, () => {
                    //    that.drawTrendGraph();
                   });
                }
                if(fundinfo.middleextra){//恒生个性化代码可删除
                    var middleextra = JSON.parse(fundinfo.middleextra);
                    if(fundinfo.fundtype == '2'){//货币
                        /*var hfincomeratio = fundinfo.hfincomeratio.split(".");
                        fundinfo.hfincomeratio = hfincomeratio[0] + "." + hfincomeratio[1].substring(0,middleextra.jzws);*/
                    }else{
                        var pernetvalue = fundinfo.pernetvalue.split(".");
                        fundinfo.pernetvalue = pernetvalue[0] + "." + pernetvalue[1].substring(0,middleextra.jzws);
                    }
                }
                this.pernetvalue = fundinfo.pernetvalue;
                if(this.fundinfo.fundcode == config.xjb.code){
                    this.isXjb = true;
                }
                if(fundinfo.risklevel){
                    this.riskContent =  this.riskmessage[parseInt(fundinfo.risklevel)];
                }
                this.setFundDate(fundinfo.buybusin);
                this.loadShow = false;
                this.getChartData(0);
                //action.fundbrokerquery(); //做完dotemplete,才能写上基金经理
            },
            getChartData(d){
                
                // 本地数据mock
                var that = this;
                // that.newChartData[d] = [];
                if(that.newChartData[d].length>0) {
                    if(process.env.RUNTIME==='native') {
                        that.initWebCanvas(that.newChartData[d])
                    } else {
                        that.initChart(that.newChartData[d])
                    }
                    
                } else {
                    if(process.env.RUNTIME === 'web') {
                            result = require("../../mock/fundChart"+d+".json");
                            var res = result;
                            
                            res.result.forEach((item)=>{
                                item.totalnetvalue = parseFloat(item.totalnetvalue);
                                item.navdate = that.parseDate(item.navdate)
                            })
                            that.newChartData[d] = res.result.reverse();
                            that.initChart(that.newChartData[d])
                        
                        // stream.fetch({
                        //     method: "get",
                        //     url: 'https://m.py-axa.com/appServer/product/otherinfo/hisMarket.json?fundcode=519176&pageno=1&applyrecordno=10000&startdate=20000811&enddate=20191010&publishflag=1&channel=gh_1bc20b27f070&jsonpCallback=jsonp_7&appServertimestamp=1570771989855&_=1570771989855&callback=jsonp_7',
                        //     type: "jsonp",
                        //     headers: {}
                        // }, function(ret) {
                        //     modal.toast({
                        //         message: JSON.stringify(ret),
                        //         duration: 0.3
                        //     })
                        //     if(!ret.ok) return;
                        //     var res = ret.data;
                            
                        //     res.result.forEach((item)=>{
                        //         item.totalnetvalue = parseFloat(item.totalnetvalue);
                        //         item.navdate = that.parseDate(item.navdate)
                        //     })
                        //     that.newChartData[d] = res.result.reverse();
                        //     that.initChart(that.newChartData[d])
                           
                        // })
                    } else {
                        Light.ajax({
                            url: "mock/fundChart"+d+".json",
                            type: 'get',
                            dataType: 'json',
                            headers: {},
                            success: function (res) {
                                res.result.forEach((item)=>{
                                    item.totalnetvalue = parseFloat(item.totalnetvalue);
                                    item.navdate = that.parseDate(item.navdate)
                                })
                                that.newChartData[d] = res.result.reverse();
                                if(process.env.RUNTIME==='native') {
                                    that.initWebCanvas(that.newChartData[d])
                                } else {
                                    that.initChart(that.newChartData[d])
                                }
                            }
                        });
                    }
                }
            },
            parseDate(date){
                var sep = '-'
                return date.slice(0,4) + sep + date.slice(4,6) + sep + date.slice(6,8);
            },
            initWebCanvas(data){
                var scale = {
                    navdate: {
                        tickCount: 3,
                        formatter:function formatter(val){
                            return val.slice(5)
                        }
                    },
                    totalnetvalue: {
                        tickCount: 5,
                        alias: '单位净值',
                        formatter:function formatter(val){
                            return parseFloat(val);
                        }
                    }
                }
              

                this.$refs.webCanvas.draw(`
                    chart.clear();
                    chart.source(${JSON.stringify(data)});
                    chart.scale(${JSON.stringify(scale)});

                   
                    chart.tooltip({
                        showCrosshairs: true,
                        showXTip: true,
                    });
                    chart.axis('navdate', {
                        label: function label(text, index, total) {
                            var textCfg = {};
                            if (index === 0) {
                                textCfg.textAlign = 'left';
                            } else if (index === total - 1) {
                                textCfg.textAlign = 'right';
                            }
                            return textCfg;
                        }
                    });
                
                    chart.area().position('navdate*totalnetvalue');
                    chart.line().position('navdate*totalnetvalue');
                    chart.render();
                `);

            },

            initChart(data){
                this.chart.clear();
                this.chart.source(data);
                        
                this.chart.tooltip({
                    showCrosshairs: true,
                    showXTip: true,
                });
                this.chart.scale({
                    navdate: {
                        tickCount: 3,
                        formatter:function formatter(val){
                            return val.slice(5)
                        }
                    },
                    totalnetvalue: {
                        tickCount: 5,
                        alias: '单位净值',
                        formatter:function formatter(val){
                            return parseFloat(val);
                        }
                    }
                });
                this.chart.axis('navdate', {
                    label: function label(text, index, total) {
                        var textCfg = {};
                        if (index === 0) {
                            textCfg.textAlign = 'left';
                        } else if (index === total - 1) {
                            textCfg.textAlign = 'right';
                        }
                        return textCfg;
                    }
                });
            
                this.chart.area().position('navdate*totalnetvalue');
                this.chart.line().position('navdate*totalnetvalue');
                this.chart.render();
            },
            getHisMarket(applyrecordno,index,func){
                if (this.trendDataList[this.chartTabIndex][index].length != 0) {
                    func && func();
                    return;
                }
                var that = this;
                var enddate = this.fundinfo.navdate;
                var startdate = API.hsTools.getyyyymmddfromDate(new Date(),"-"+applyrecordno);
                var data = API.formGenerate()
                    .add("fundcode",that.fundcode)
                    .add("pageno", "1")
                    .add("applyrecordno", "10000")
                    .add("startdate", startdate)
                    .add("enddate", enddate)
                    .add("publishflag", "1").generate();
                this.loadShow = true;
                // API.get("product/otherinfo/hisMarket", data, (jsonResult) => {
                //     this.loadShow = false;
                //     if(jsonResult.successful && jsonResult.result.length > 0) {
                //         that.isCanvasData = true;
                //         if(applyrecordno == "30"){
                //             that.setData(jsonResult.result,index);
                //         }
                //         if(applyrecordno == "90"){
                //             that.setData(jsonResult.result,index);
                //         }
                //         if(applyrecordno == "182"){
                //             that.setData(jsonResult.result,index);
                //         }
                //         if(applyrecordno == "365"){
                //             that.setData(jsonResult.result,index);
                //         }
                //         if(applyrecordno == "7000"){
                //             that.setData(jsonResult.result,index);
                //         }
                //     }else{
                //         this.isCanvasData = false;
                //     }
                //     func && func();
                // });
            },
            setData(result,index){
                var trendData1 = [];//净值,七日年化
                var trendData2 = [];//万份收益
                var data = result;

                data.forEach((item) =>{
                    var data1 = "";
                    var data2 = "";
                    if(this.fundtype != '2'){
                        data1 = {date: item.navdate,value:item.pernetvalue}
                    }else{
                        data1 = {date: item.navdate,value:item.incomeratio};
                        data2 = {date: item.navdate,value:item.hfincomeratio};
                        trendData2.push(data2);
                    }
                    trendData1.push(data1);
                });
                if(index == 0){
                    if(result.length > 0){
                        this.trendPointDate = API.hsTools.yyyy_mm_dd(result[0].navdate);
                        if(this.fundtype != "2"){
                            this.trendPointValue = result[0].pernetvalue;
                        }else{
                            this.trendPointValue = result[0].incomeratio;
                            this.trendPointHfincomeratio = result[0].hfincomeratio;
                            this.trendPointIncomeratio = result[0].incomeratio;
                        }
                    }
                    this.updateData(result,trendData1,trendData2,index);
                }
                if(index == 1){
                    this.updateData(result,trendData1,trendData2,index);
                }
                if(index == 2){
                    this.updateData(result,trendData1,trendData2,index);
                }
                if(index == 3){
                    this.updateData(result,trendData1,trendData2,index);
                }
                if(index == 4){
                    this.updateData(result,trendData1,trendData2,index);
                }

            },//将数据取大小均分,取日期均分,排序,放入画线的变量里面(望有志者进行数据存储优化,
            // 关注trendDataList,chartTabIndex ,[0-4]为净值,七日年化线条,[5-9]为万份收益线条,
            // 可将数组改为[[],[]]每次切换取对应的数据填充,关联方法drawTrendGraph(),renderChart())
            updateData(result,trendData1,trendData2,index){
                this.setDate(result,false, index);
                if(this.fundtype == "2"){
                    this.setDate(result, true, index);
                    this.setNumber(result, true, index);
                    if(index == 0){//货币的万份收益走势
                        this.hisMarketData[5][0] = trendData2.reverse();
                        this.trendDataList[1][index][0] = this.hisMarketData[5][0];
                    }else if(index == 1){
                        this.hisMarketData[6][0] = trendData2.reverse();
                        this.trendDataList[1][index][0] =  this.hisMarketData[6][0];
                    }else if(index == 2){
                        this.hisMarketData[7][0] = trendData2.reverse();
                        this.trendDataList[1][index][0] = this.hisMarketData[7][0];
                    }else if(index == 3){
                        this.hisMarketData[8][0] = trendData2.reverse();
                        this.trendDataList[1][index][0] = this.hisMarketData[8][0];
                    }else if(index == 4){
                        this.hisMarketData[9][0] = trendData2.reverse();
                        this.trendDataList[1][index][0] = this.hisMarketData[9][0];
                    }
                }
                this.setNumber(result, false, index);
                this.hisMarketData[index][0] = trendData1.reverse();
                this.trendDataList[0][index][0] = this.hisMarketData[index][0];
            },
            getRatio(ratio) {
                return ratio == '--' ? 0 : ratio;
            },
            setNumber(result,again,index) {
                if(result.length > 0){
                    var data = result;
                    data.sort((i, j) => {
                        if (this.fundtype == '2') {//如果是货币
                            if(again){
                                return parseFloat(this.getRatio(i.hfincomeratio)) > parseFloat(this.getRatio(j.hfincomeratio)) ? -1 : 1;
                            }else{
                                return parseFloat(this.getRatio(i.incomeratio)) > parseFloat(this.getRatio(j.incomeratio)) ? -1 : 1;
                            }
                        } else {
                            return parseFloat(this.getRatio(i.pernetvalue)) > parseFloat(this.getRatio(j.pernetvalue)) ? -1 : 1;
                        }
                    });
                    var pernetvalue1 = "";
                    var pernetvalue2 = "";
                    if(this.fundtype != '2'){
                         pernetvalue1 = data[0].pernetvalue;//单位净值
                         pernetvalue2 = data[data.length - 1].pernetvalue;//单位净值
                    }else{
                        if(again){
                            pernetvalue1 = data[0].hfincomeratio;//万份收益
                            pernetvalue2 = data[data.length - 1].hfincomeratio;//万份收益
                        }else{
                            pernetvalue1 = data[0].incomeratio.replace("%","");//七日年化
                            pernetvalue2 = data[data.length - 1].incomeratio.replace("%","");//七日年化
                        }
                    }
                    var pernetvalueList = this.Split(parseFloat(pernetvalue2), parseFloat(pernetvalue1), 4);
                    var pernetvalue = [];
                    pernetvalueList.forEach((item) => {
                        pernetvalue.push(this.ToDecimal(item));
                    });
                    pernetvalue.sort((i, j) => {
                        return parseFloat(this.getRatio(j)) - parseFloat(this.getRatio(i));
                    });
                    if(again){
                        this.trendLeftValue[1][index] = pernetvalue;
                    }else{
                        this.trendLeftValue[0][index] = pernetvalue;
                    }
                }else{
                    this.trendLeftValue[0].push([]);
                }

            },
            Split(From, To, Count) {
                var Step = (To - From) / Count;
                var R = [From];
                for (var i = 0; i < Count ; i++) {R.push(From += Step);}
                return R
            },
            ToDecimal(x) {
                var f = parseFloat(x);
                if (isNaN(f)) {return 0;}
                f = Math.round(x * 10000) / 10000;
                return f + "";
            },
            setDate(result,again,index){
                if(result.length > 0){
                    var navdate1 = API.hsTools.yyyy_mm_dd(result[0].navdate);
                    var navdate2 = API.hsTools.yyyy_mm_dd(result[result.length - 1].navdate);
                    if(again){
                        this.trendBottomValue[1][index] = this.TimeRange(navdate2,navdate1,7);
                    }else{
                        this.trendBottomValue[0][index] = this.TimeRange(navdate2,navdate1,7);
                    }
                }else{
                    this.trendBottomValue[0].push([]);
                }

            },
            addDatetime(dt) {//时间戳转换日期格式，我这边的格式是 "2017-10-05 01：02：56",需要补零
                dt = new Date(dt);
                var dataTime_str = "";

                var mon = parseInt(dt.getMonth()) + 1;
                dataTime_str += (mon < 10 ? ("0" + mon) : mon) + "-";//存入月  .getMonth()函数从0月开始算，正确日期应该+1

                var day = dt.getDate();
                dataTime_str += (day < 10 ? ("0" + day) : day) + " ";//存入日

                return dataTime_str;
            },
            TimeRange(startTimes, endTimes, amount) {// 传入参数 2017-10-05 2017-10-06 24 开始时间 结束时间 多少段
                startTimes = startTimes.split('-');
                endTimes = endTimes.split('-');
                startTimes = Date.parse(new Date(startTimes[0],(startTimes[1]-1),startTimes[2])); // 计算开始时间的时间戳
                endTimes = Date.parse(new Date(endTimes[0],(endTimes[1]-1),endTimes[2])); // 计算结束时间的时间戳
                var timeAll = endTimes - startTimes; // 总时间间隔
                if (endTimes <= startTimes) {
                    return -1;
                }
                if (amount < 2) {
                    return -2;
                }
                var timeRange = new Array(); // return数组初始化
                var timeGap = timeAll / amount; // 分割后时间间隔

                var momentTime_front = "";
                var momentTime_rear = "";

                for (var i = 0; i <= amount; i++) {

                    momentTime_front = this.addDatetime(startTimes + timeGap * (i));
                    momentTime_rear = this.addDatetime(startTimes + timeGap * (i + 1) - 1000);

                    timeRange.push(momentTime_front);
                }
                return timeRange;
            },
            // drawTrendGraph(){
            //     var ref = this.$refs.canvas_holder;
            //     var size = this.getRealCanvasSize(ref);
            //     if (isWeb) {
            //         //canvas 在web上运行默认宽高是300*150大小 需要设置真实的宽高
            //         ref.width = size.width;
            //         ref.height = size.height;
            //     }else{
            //         ref = enable(ref, {bridge: WeexBridge});
            //     }
            //     if (this.chartType == "normal") {
            //         this.trendType = "单位净值";
            //     } else {
            //         this.trendType = "七日年化收益率";
            //     }
            //     this.cacheContext = ref.getContext('2d');
            //     var trendDataTab1 = [this.hisMarketData[0], this.hisMarketData[1], this.hisMarketData[2], this.hisMarketData[3], this.hisMarketData[4]];
            //     this.trendDataList.push(trendDataTab1);
            //     if(this.chartType != "normal"){
            //         var trendDataTab2 = [this.hisMarketData[5], this.hisMarketData[6], this.hisMarketData[7], this.hisMarketData[8], this.hisMarketData[9]];
            //         this.trendDataList.push(trendDataTab2);
            //     }
            //     this.chartLineNumber = this.trendDataList[this.chartTabIndex][this.tabIndex].length;
            //     if(this.isCanvasData){
            //         this.renderChart();
            //     }
            // },
            followQuery: function() {
                // API.get("account/myfollows/followQuery", "", (jsonResult) => {
                //     if(jsonResult && jsonResult.successful) {
                //         jsonResult.myFollows.forEach( (item) => {
                //             if(item.fundcode == this.fundcode) {
                //                 this.heart = true;
                //             }
                //         });
                //     }
                // });
            },
            switchGraphTabs(index) {
                this.chartData='';
                this.tabIndex = index;
                this.getChartData(index)
                // if(index == 1){
                //     this.changeTableData("90", index);
                // }else if(index == 2){
                //     this.changeTableData("182", index);
                // }else if(index == 3){
                //     this.changeTableData("365", index);
                // }else if(index == 4){
                //     this.changeTableData("7000", index);
                // }else{
                //     this.changeTableData("30", index);
                // }
            },
            changeTableData(date, index){

                this.getHisMarket(date, index, () => {
                    this.tabIndex = index;
                    this.renderChart();//初始化
                });
            },
            chartTabClicked(index) {
                this.chartTabIndex = index;
                this.trendType = this.trendTypeList[index];
                if(this.fundtype == '2'){
                    if(index == 0){
                        this.trendPointValue = this.trendPointIncomeratio;
                    }else{
                        this.trendPointValue = this.trendPointHfincomeratio;
                    }
                }
                this.renderChart();
            },
            renderChart() {
                this.initCanvas(this.trendLeftValue[this.chartTabIndex][this.tabIndex], this.trendBottomValue[this.chartTabIndex][this.tabIndex]);
                this.handleTrendData(this.trendDataList[this.chartTabIndex][this.tabIndex]);
                //仅有一条趋势线时进行填充操作
                if (this.trendDataList[this.chartTabIndex][this.tabIndex].length == 1) {
                    this.fillTrendLine();
                }
                this.drawGrid(this.trendLeftValue[this.chartTabIndex][this.tabIndex], this.trendBottomValue[this.chartTabIndex][this.tabIndex]);
                this.drawTrendLine();
            },
            getRealCanvasSize(ref) {

                var size = isWeb
                    ?   {
                            width: parseInt(ref.clientWidth),
                            height: parseInt(ref.clientHeight)
                    }
                    :   {
                            width: 750,
                            height: 300
                    };
                return size;
            },
            initCanvas(trendLeftValue, trendBottomValue) {

                var realCanvas = this.realCanvas;
                this.canvasInfo.leftX = 100 * this.webScale;
                this.canvasInfo.rightX = realCanvas.width - 40 * this.webScale;
                this.canvasInfo.topY = 10 * this.webScale;
                this.canvasInfo.bottomY = realCanvas.height - 40 * this.webScale;
                this.canvasInfo.stepX = (this.canvasInfo.rightX - this.canvasInfo.leftX) / (trendBottomValue.length - 1);
                this.canvasInfo.stepY = (this.canvasInfo.bottomY - this.canvasInfo.topY) / trendLeftValue.length;
                this.yUnitLength = (this.canvasInfo.stepY * (trendLeftValue.length - 1)) / (trendLeftValue[0] - trendLeftValue[trendLeftValue.length - 1]);
                this.cacheContext.clearRect(0, 0, realCanvas.width, realCanvas.height);
            },
            drawGrid(trendLeftValue, trendBottomValue) {

                //网格
                for (let index = 0; index <= trendLeftValue.length; index++) {
                    const value = trendLeftValue[index];
                    var start = {
                        x: this.getOdd(this.canvasInfo.leftX),
                        y: this.getOdd(this.canvasInfo.topY + index * this.canvasInfo.stepY)
                    };
                    var end = {
                        x: this.getOdd(this.canvasInfo.rightX),
                        y: this.getOdd(this.canvasInfo.topY + index * this.canvasInfo.stepY)
                    };
                    this.drawLind(start, end);
                }

                //左侧价格表
                for (var index = 0; index < trendLeftValue.length; index++) {
                	this.cacheContext.font = "24px";
	                this.cacheContext.fillStyle = "#777";
	                this.cacheContext.textAlign = "right";
	                this.cacheContext.textBaseline = "top";
	                this.cacheContext.fillText(trendLeftValue[index], (100 - 20) * this.webScale, (index * this.canvasInfo.stepY));
                 }

                 //底部日期表
                for (let index = 0; index < trendBottomValue.length; index++) {
                    this.cacheContext.font = "24px";
	                this.cacheContext.fillStyle = "#777";
	                this.cacheContext.textAlign = "center";
	                this.cacheContext.textBaseline = "top";
	                this.cacheContext.fillText(trendBottomValue[index], this.canvasInfo.leftX + (index * this.canvasInfo.stepX), this.canvasInfo.bottomY + 10 * this.webScale);
                }
            },
            handleTrendData(trendData) {
                var maxValue = this.trendLeftValue[this.chartTabIndex][this.tabIndex][0];
                for (let i = 0; i < trendData.length; i++) {
                    this.trendPointsList[i] = [];
                    const line = trendData[i];
                    var xUnitLength = (this.canvasInfo.rightX - this.canvasInfo.leftX) / (line.length - 1);
                    for (var j = 0; j < line.length; j++) {
                        var item = line[j];
                        var point = {
                            x: this.canvasInfo.leftX + xUnitLength * j,
                            y: this.canvasInfo.topY + (maxValue - item.value.replace("%","")) * this.yUnitLength
                        }
                        this.trendPointsList[i].push(point);
                    }
                }
            },
            fillTrendLine() {
                this.cacheContext.beginPath();
                this.cacheContext.fillStyle = this.trendFillColor;
                this.cacheContext.lineWidth = 1;
                this.cacheContext.moveTo(this.canvasInfo.leftX, this.canvasInfo.bottomY);
                for (let j = 0; j < this.trendPointsList[0].length; j++) {
                    const point = this.trendPointsList[0][j];
                    this.cacheContext.lineTo(point.x, point.y);
                }
                this.cacheContext.lineTo(this.canvasInfo.rightX, this.canvasInfo.bottomY);
                this.cacheContext.closePath();
                this.cacheContext.fill();
            },
            drawTrendLine() {

                for (let i = 0; i < this.trendPointsList.length; i++) {
                    this.cacheContext.beginPath();
                    this.cacheContext.strokeStyle = this.trendColors[i];
                    this.cacheContext.lineWidth = 2;
                    this.cacheContext.moveTo(this.trendPointsList[i][0].x, this.trendPointsList[i][0].y);
                    for (let j = 1; j < this.trendPointsList[i].length; j++) {
                        const point = this.trendPointsList[i][j];
                        this.cacheContext.lineTo(point.x, point.y);
                    }
                    this.cacheContext.stroke();
                }
            },
            drawLind(start, end) {

                this.cacheContext.beginPath();
                this.cacheContext.strokeStyle = this.gridColor;
                this.cacheContext.lineWidth = 1;

                this.cacheContext.moveTo(start.x, start.y);
                this.cacheContext.lineTo(end.x, end.y);
                this.cacheContext.stroke();
            },
            //数字为参数，返回奇数
            getOdd: function(value, add) {

                var result;
                if (add) {
                    result = value % 2 == 0 ? value - 1 : value;
                } else {
                    result = value % 2 == 0 ? value - 1 : value;
                }
                return result;
            },
            panStart(event) {
                this.isScrollable =false;
                this.locationLineVisible = true;
                this.moveLocationLine(event);
            },
            panMove(event) {
                this.isScrollable =false;
                this.moveLocationLine(event);

            },
            panEnd(event) {
                this.isScrollable =true;

            },
            moveLocationLine(event) {
                var locationX;
                if (!isWeb) {
                    locationX = event.changedTouches[0].pageX;
                }
                else {
                    locationX = event.changedTouches[0].pageX / lg.config.env.scale;
                }
                if (locationX < 100 || locationX > 710) {
                    return;
                }
                animation.transition(this.$refs.location_line, {
                    styles: {
                        transform: 'translateX(' + locationX + 'px)',
                        transformOrigin: 'left top'
                    },
                }, function () {});
                var trendItem = this.getTrendItemByLocationX(event.changedTouches[0].pageX - 100 * this.webScale);
                if (this.chartLineNumber == 1) {
                    var dateString = trendItem.date.toString();
                    var year = dateString.slice(0, 4);
                    var month = dateString.slice(4, 6);
                    var day = dateString.slice(6, 8);
                    this.trendPointDate = year + "/" + month + "/" + day;
                    this.trendPointValue = trendItem.value;
                }
                else if (this.chartLineNumber == 2) {
                    this.trendPointValue1 = trendItem[0].value;
                    this.trendPointValue2 = trendItem[1].value;
                }
            },
            getTrendItemByLocationX(x) {
                var xUnitLength = (this.canvasInfo.rightX - this.canvasInfo.leftX) / (this.trendDataList[this.chartTabIndex][this.tabIndex][0].length - 1);
                var index = Math.round(x / xUnitLength);
                if (this.chartLineNumber == 1) {
                    return this.trendDataList[this.chartTabIndex][this.tabIndex][0][index];
                }
                else if (this.chartLineNumber == 2) {
                    return [
                        this.trendDataList[this.chartTabIndex][this.tabIndex][0][index],
                        this.trendDataList[this.chartTabIndex][this.tabIndex][1][index]
                        ];
                }
            },
            productDetail(){
                var that = this;
                if(process.env.RUNTIME.toLowerCase()==='web') {
                    stream.fetch({
                        method: "get",
                        // url: 'https://m.py-axa.com/appServer/product/product/productDetail.json?fundcode=519171&channel=gh_1bc20b27f070&jsonpCallback=productDetail&appServertimestamp=1570761873763&_=1570761873763&callback=productDetail',
                        url: 'https://i0zsm2fnx.lightyy.com/productDetail.json',
                        type: 'jsonp',
                        jsonpCallbackName: 'productDetail',
                        headers: {}
                    }, function(ret) {
                        if(!ret.ok) return;
                        var jsonResult = ret.data;
                        if(jsonResult && jsonResult.successful && jsonResult.result) {
                            var result=jsonResult.result;

                            that.riskabilityStr=result.risklevelstr;
                            that.fundtypedisplaystr=result.fundtypedisplaystr;

                            that.riskability = jsonResult.riskability;
                            that.lowestrisktolerance = jsonResult.lowestrisktolerance;
                            that.setFundInfo(jsonResult.result);
                            that.loadShow = false;
                        } else {
                            that.loadShow = false;
                            API.callFailProcess(jsonResult);
                        }
                    })
                } else {
                    //本地数据mock
                    Light.ajax({
                        // url: "mock/fundInfo.json",
                        url: "https://i0zsm2fnx.lightyy.com/productDetail.json",
                        type: 'get',
                        dataType: 'jsonp',
                        jsonpCallbackName: 'productDetail',
                        headers: {},
                        success: function (jsonResult) {
                            if(jsonResult && jsonResult.successful) {
                                var  result=jsonResult.result;

                                that.riskabilityStr=result.risklevelstr;
                                that.fundtypedisplaystr=result.fundtypedisplaystr;

                                that.riskability = jsonResult.riskability;
                                that.lowestrisktolerance = jsonResult.lowestrisktolerance;
                                that.setFundInfo(jsonResult.result);
                                that.loadShow = false;
                            } else {
                                that.loadShow = false;
                                API.callFailProcess(jsonResult);
                            }
                        }   
                    });


                }
               
            },
            //获取基金经理
            fundManagerQuery() {
                var _that = this;
                if(process.env.RUNTIME.toLowerCase()==='web') {
                    stream.fetch({
                        method: "get",
                        // url: 'https://m.py-axa.com/appServer/product/product/fundbrokerquery.json?fundcode=519171&channel=gh_1bc20b27f070&jsonpCallback=fundManagerQuery&appServertimestamp=1570766293471&_=1570766293471&callback=fundManagerQuery',
                        url: 'https://hmlskucdm.lightyy.com/fundbrokerquery.json',
                        type: 'jsonp',
                        jsonpCallbackName: 'fundManagerQuery',
                        headers: {}
                    }, function(ret) {
                        if(!ret.ok) return;
                        var jsonResult = ret.data;
                        var broker = [];
                        for(var i in jsonResult.result) {
                            broker.push(jsonResult.result[i].brokername);
                        }
                        if(broker.length > 0){
                            _that.fundManagerName = broker.join("、");
                            _that.fundManagerShow = true;
                        }
                    })
                } else {
                    // 本地数据mock
                    Light.ajax({
                        // url: "https://m.py-axa.com/appServer/product/product/fundbrokerquery.json?fundcode=519171&channel=gh_1bc20b27f070&jsonpCallback=fundManagerQuery&appServertimestamp=1570766293471&_=1570766293471&callback=fundManagerQuery",
                        url: 'https://hmlskucdm.lightyy.com/fundbrokerquery.json',
                        type: 'get',
                        dataType: 'jsonp',
                        jsonpCallbackName: 'fundManagerQuery',
                        headers: {},
                        success: function (jsonResult) {
                            if(jsonResult && jsonResult.successful) {
                                var broker = [];
                                for(var i in jsonResult.result) {
                                    broker.push(jsonResult.result[i].brokername);
                                }
                                if(broker.length > 0){
                                    _that.fundManagerName = broker.join("、");
                                    _that.fundManagerShow = true;
                                }
                            } else {
                                API.callFailProcess(jsonResult);
                            }
                        }
                    });
                }
               
            },
            setFundDate(buybusin){
                // API.get("common/query/queryPredictDate", "fundcode=" + this.fundcode + "&busincode=" + buybusin, (jsonResult) => {
                //     if (jsonResult && jsonResult.successful) {
                //         this.fundDate2 = API.hsTools.formatDate(jsonResult.affirmdate, "MM-dd EEE");
                //         this.fundDate3 = API.hsTools.formatDate(jsonResult.valuedate, "MM-dd EEE");
                //         var dataTime = new Date().getHours();
                //         if(dataTime > 14){
                //             this.fundDate1 = "今日15点后";
                //         }else{
                //             this.fundDate1 = "今日15点前";
                //         }
                //     }
                // });
                var that = this;

                if(process.env.RUNTIME === 'web') {
                    var jsonResult = require("../../mock/fundDate.json");
                    that.fundDate2 = API.hsTools.formatDate(jsonResult.affirmdate, "MM-dd EEE");
                    that.fundDate3 = API.hsTools.formatDate(jsonResult.valuedate, "MM-dd EEE");
                    var dataTime = new Date().getHours();
                    if(dataTime > 14){
                        that.fundDate1 = "今日15点后";
                    }else{
                        that.fundDate1 = "今日15点前";
                    }
                } else {
                    // 本地数据mock
                    Light.ajax({
                        url: "http://192.168.194.41:3000/mock/fundDate.json",
                        type: 'get',
                        dataType: 'json',
                        headers: {},
                        success: function (jsonResult) {
                            if (jsonResult && jsonResult.successful) {//
                                that.fundDate2 = API.hsTools.formatDate(jsonResult.affirmdate, "MM-dd EEE");
                                that.fundDate3 = API.hsTools.formatDate(jsonResult.valuedate, "MM-dd EEE");
                                var dataTime = new Date().getHours();
                                if(dataTime > 14){//
                                    that.fundDate1 = "今日15点后";
                                }else{
                                    that.fundDate1 = "今日15点前";
                                }
                            }
                        }
                    });

                }
                    
               
            },
            isLoginState(){
                this.loadShow = true;
                // API.get("account/account/queryCustType", "", (jsonResult) => {
                //     this.loadShow = false;
                //     if (jsonResult.successful) {
                //         this.loginState = true;
                //         if(this.activityid){
                //             this.financialMoney();
                //         }
                //     }else{
                //         this.loginState = false;
                //     }
                // });
            },
            financialMoney(){
                // API.get("market/market/queryVirtualShare", "activityid=" + this.activityid, (jsonResult) => {
                //     if(jsonResult && jsonResult.successful) {
                //         this.money = API.hsTools.formatMoney(jsonResult.eablemarketvalue);
                //     }
                // });
            },
          systemState () {
            var that = this
            API.systemState(function (param) {
              if (param.openFund) {
                that.openFund = param.openFund
              }
            })

          },
            financialBuy(){
                storage.getItem("clientid", (e) => {
                    if (e.data != "undefined") {
                        API.openWebPage(config.feedbackImgUrl + "activity/pages/financial-5.html?fundcode="
                            + this.fundcode + "&activityid=" + this.activityid + "&clientid=" + e.data,"",{navBarType: '2'});
                    }else{
                        API.openWebPage(config.feedbackImgUrl + "activity/pages/financial-5.html?fundcode="
                            + this.fundcode + "&activityid=" + this.activityid);
                    }
                });
            }
        },
        mounted() {
            this.productDetail();
            this.fundManagerQuery();
            this.isLoginState();
            if(process.env.RUNTIME!=='native') {
                this.chart=new LightChart.Chart({
                    ltCanvas:this.$refs.canvas,
                    widthRatio: 1
                });
            }
            
            // this.drawTrendGraph();
            // if (!isWeb) {
            //     var gcanvas = enable(this.$refs.canvas_holder, {bridge: WeexBridge});
            //     var ctx = gcanvas.getContext("2d");
            //     ctx.fillStyle = 'white';
            // }

            if(!API.matchNative()){
                this.isApp = false
            }
        },
        afterShow(data) {
            //页面初始化得到传入的值
            if (data.fundcode) {
                //判断是否为空
                this.fundcode = data.fundcode;
                this.title = data.title;
            }
            if (data.isFinancial) {
                //判断是否为空
                this.isFinancial = true;
                this.activityid = data.activityid;
            }
            this.showNavbar = data.showNavbar;
        },
        created() {

            this.scrollerHeight = Utils.env.getPageHeight()-100;
            this.realCanvas.width = 750;
            this.realCanvas.height = 300;
          this.systemState()
          storage.removeItem('backFromModify')
          storage.removeItem('backFromRange')


            if(isWeb) { //web会小于1
                this.realCanvas.width=lg.config.env.deviceWidth / lg.config.env.dpr;
                this.realCanvas.height = this.realCanvas.width / 750 * 300;
            }
            this.webScale = this.realCanvas.width / 750;

        }

    };
</script>

<style scoped src="../../css/ui.css"></style>
<style scoped>
    .fund-head {
    height: 170px;
    position: relative;
    background-color: #fff;
    }

    .fund-mid {
    height: 80px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #fff;
    }

    .risk-icon {
    width: 30px;
    height: 30px;
    }

    .rule-box {
    position: relative;
    }
    .line-view {
    position: absolute;
    bottom: 0;
    left: 0px;
    right: 0px;
    content: " ";
    width: auto;
    height: 1px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e8e8e8;
    transform: scaleY(0.5);
    }
    .chart-head {
    height: 80px;
    background-color: #fff;
    padding-left: 30px;
    padding-right: 30px;
    position: relative;
    }
    .columnar {
    border-left-color: #3580ed;
    border-left-style: solid;
    border-left-width: 8px;
    padding-left: 10px;
    }
    .tabBar-wrap {
    width: 690px;
    height: 52px;
    border-width: 2px;
    border-color: #3580ee;
    margin-left: 30px;
    border-radius: 5px;
    margin-top: 40px;
    margin-bottom: 40px;
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
    .chart-img {
    width: 750px;
    height: 395px;
    }
    .aboutlist {
    height: 90px;
    position: relative;
    padding-right: 30px;
    padding-left: 30px;
    background-color: #fff;
    }
    .arrow {
    width: 20px;
    height: 30px;
    }
    .rule-process{
    height: 180px;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #fff
    }
    .round-box {
    position: relative;
    height: 40px;
    }
    .round {
    width: 16px;
    height: 16px;
    background-color: #fff;
    border-radius: 8px;
    border-width: 2px;
    border-style: solid;
    border-color: #3580ee;
    }
    .roundline {
    position: absolute;
    top: 18px;
    left: 0px;
    right: 0px;
    content: " ";
    width: auto;
    height: 4px;
    border-bottom-width: 4px;
    border-bottom-style: solid;
    border-bottom-color: #3580ee;
    }
    .bottomBtn {
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    }
    .blue-bj {
        width: 300px;
        background-color: #3580ee;
    }
    .red-bj {
        background-color: #f0384f;
    }
    .borderR {
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #e8e8e8;
    }
    .trend-status {
        flex-direction: row;
        align-items: center;
        padding-top: 16px;
        padding-right: 28px;
        padding-bottom: 16px;
        padding-left: 28px;
        margin-bottom: 40px;
    }
    .trend-status-one-line {
        background-color: #ebf3fc;
    }
    .location_line {
        width:1px;
        height:250px;
        background-color:#666;
        position: absolute;
        top: 10px;
    }
    .tab-line {
        width:375px;
        height:2px;
        position:absolute;
        bottom:0px;
    }
    .disabled{
     width: 300px;
    background-color: #808080;
    }
    .share{
        width: 45px;
        height: 40px;
    }
    .title-img {
        width: 50px;
        height: 50px;
    }

    .bottom-line{
        border-bottom-width: 1px;
        border-bottom-color: #e8e8e8;
    }
    .dialog-content{
        height: 200px;
        padding-top: 40px;
        padding-left: 20px;
        padding-right: 20px;
    }
    .dialog-btns{
        height: 90px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .back-btn {
        height: 80px;
        justify-content: center;
        background-color: #fff;
        margin-bottom: 20px;
        padding-left: 20px;
    }
    .img-back {
        width: 48px;
        height: 48px;
    }
</style>
