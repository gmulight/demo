<template>
    <div style="background-color:#f1f0f6;">
    <scroller id="app" :style="{height: scrollerHeight + 'px'}">
        <refresh v-if="isApp" class="refresh" :display="refreshing"  @refresh="onrefresh"  @pullingdown="onpullingdown">
            <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
            <!-- <text class="refresh-text" :value="refreshText"></text>-->
        </refresh>
        <!-- 个人详情 -->
        <div class="setting-top"
             :style="{height : isIPhoneX ?  '358px' : '310px', paddingTop : isIPhoneX ? '88px' : '40px'}">
            <image class="setting-bj" :style="{height : isIPhoneX ?  '358px' : '310px'}" src="images/setting-afternoon.jpg"></image>
            <div class="setting-head align-center flex-row">
                <div class="person align-center flex-row"> <!--  @click="jump('idBox/user-info', '个人信息', {headHidden: true})"-->
                    <image src="images/cricle.png" class="cricle mr10"></image>
                    <image :src="returnImg()" class="perimg"></image>
                    <text class="person-type">{{personType}}</text>
                </div>
                <div class="align-center flex-row flex-1 justify-end" >
                    <image class="book" src="images/book.png" ></image> <!--@click="jump('tradingBox/trading-record-all','历史交易', {headHidden: true})"-->
<!--                    <div class="notice justify-center " @click="jump('news', '消息中心', {headHidden: true})">-->
<!--                        <image src="images/notice.png" class="notice-img"></image>-->
<!--                        <text class="notice-num"  v-if="noticeNum != 0">{{noticeNum}}</text>-->
<!--                    </div>-->
                </div>
            </div>
            <div class="justify-center flex-1">
                <div class="flex-row justify-between"> <!-- @click="jump('login/login-app', '登录', {headHidden: true})"-->
                    <div class="align-center flex-row">
                        <text class="font-23 m-color-5 font-bold">{{userName}}</text>
                        <text class="font-23 m-color-5 font-bold" v-if="loginState">,</text>
                        <text class="font-23 m-color-5 font-bold ml30" v-if="loginState">{{dataName}}</text>
                        <image class="data-icon" :src="dataIcon" v-if="loginState"></image>
                    </div>
                   <!-- <div class="align-center flex-row mt40" v-if="isTypeR">
                        <template v-if="typeNum === 'num'">
                            <text v-if="lastlogintimeNum != 0" :class="['font-16',lastlogintimeNum > 0 ? 'm-color-red' : 'm-color-green','font-bold']">{{lastlogintimeNum == '0.0' ? '0.00' : lastlogintimeNum}}</text>
                            <text class="font-16 font-bold c-white" v-else >{{lastlogintimeNum == '0.0' ? '0.00' : lastlogintimeNum}}</text>
                            <image class="ml10 num-icon" v-if="isRegulateShow && lastlogintimeNum != 0" :src="regulate?grow:reduce"></image>
                        </template>
                        <template v-else>
                            <text class="font-16 m-color-red font-bold">***</text>
                        </template>
                    </div>-->
                </div>
                <div class="flex-row justify-between mb10 mt10" v-if="isTypeR">
                    <!--<text class="font-14 m-color-5">您与恒生相伴{{perData}}天</text>-->
                    <text class="font-14 m-color-5">恒生欢迎您</text>
                   <!-- <text class="font-14 m-color-5">距离上次登录财富增长</text>-->
                </div>
            </div>
        </div>

        <!-- 金额 -->
        <div class="setting-tab-box flex-row align-center h160">
            <div class="align-start flex-1 ml30">
                <div class="flex-row align-center">
                    <text class="font-12 m-color-9">总资产(元)</text>
                    <div class="ml10">
                        <image :src="eyePic" class="eye"></image> <!-- @click="changeType()"-->
                    </div>
                </div>
                <div v-if="typeNum === 'num'">
                    <text class="font-22 m-color-red font-bold mt15">{{allNum}}</text>
                </div>
                <div v-if="typeNum != 'num'">
                    <text class="font-22 m-color-red font-bold mt15">******</text>
                </div>
            </div>
            <div class="align-start flex-1 ml30">
                <text class="font-12 m-color-9">昨日收益(元)</text>
                <div v-if="typeNum === 'num'">
                    <text v-if="yestodayNum != 0" :class="['font-22',yestodayNumColor < 0 ? 'm-color-green' : 'm-color-red','font-bold','mt15']">{{yestodayNum}}</text>
                    <text class="font-22 font-bold mt15" v-else>{{yestodayNum == '0.0' ? '0.00' : yestodayNum}}</text>
                </div>
                <div v-else>
                    <text class="font-22 m-color-red font-bold mt15">******</text>
                </div>
            </div>
            <div class="line-setting"></div>
        </div>

        <!-- 现金宝 -->
        <div class="setting-tab-box flex-row align-center h100" >
<!--            <div class="flex-row flex-1 align-center" @click="jump('xjb', '我的现金宝', {headHidden: true})">-->
<!--                <text class="font-14 m-color-1 ml30">现金宝</text>-->
<!--                <div v-if="typeNum === 'num'">-->
<!--                    <text class="font-16 m-color-1 font-bold ml20">{{xjbNum}}</text>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                    <text class="font-16 m-color-1 font-bold ml20">******</text>-->
<!--                </div>-->
<!--            </div>-->
            <div class="flex-row flex-1 align-center" > <!--@click="jump('holdBox/hold', '持有基金', {headHidden: true})"-->
                <text class="font-14 m-color-1 ml30">基金</text>
                <div v-if="typeNum === 'num'">
                    <text class="font-16 m-color-1 font-bold ml20">{{jjNum}}</text>
                </div>
                <div v-else>
                    <text class="font-16 m-color-1 font-bold ml20">******</text>
                </div>
            </div>

            <div class="flex-row flex-1 align-center" v-if="usNum != '--'"> <!-- @click="jump('holdBox/holdUS', 'QDII(多币种)', {headHidden: true})"-->
                <text class="font-14 m-color-1 ml30">QDII(多币种)</text>
                <div v-if="typeNum === 'num'">
                    <text class="font-16 m-color-1 font-bold ml20">{{usNum}}</text>
                </div>
                <div v-else>
                    <text class="font-16 m-color-1 font-bold ml20">******</text>
                </div>
            </div>

            <div class="lineColumn"></div>
            <div class="line-setting"></div>
        </div>

<!--        <div class="setting-tab-box flex-row align-center h100"  v-if="usNum != '&#45;&#45;'">-->
<!--            || pdNum != '&#45;&#45;'-->

<!--            <div class="flex-row flex-1 align-center" v-if="pdNum != '&#45;&#45;'" @click="jump('holdBox/hold-pd', '腾安', {headHidden: true})">-->
<!--                <text class="font-14 m-color-1 ml30">腾安</text>-->
<!--                <div v-if="typeNum === 'num'">-->
<!--                    <text class="font-16 m-color-1 font-bold ml20">{{pdNum}}</text>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                    <text class="font-16 m-color-1 font-bold ml20">******</text>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="lineColumn"></div>-->
<!--            <div class="line-setting"></div>-->
<!--        </div>-->

        <!--<div class="setting-tab-box flex-row align-center h100" v-if="isShowUS">
            <div class="flex-row flex-1 align-center" @click="jump('holdBox/holdUS', 'QDII(多币种)', {headHidden: true})">
                <text class="font-14 m-color-1 ml30">QDII(多币种)</text>
                <div v-if="typeNum === 'num'">
                    <text class="font-16 m-color-1 font-bold ml20">{{usNum}}</text>
                </div>
                <div v-else>
                    <text class="font-16 m-color-1 font-bold ml20">******</text>
                </div>
            </div>
        </div>-->

        <!-- 轮播 -->
        <div class="flex-row bgc-white align-center mt15 h100 pl30 pr30" ><!--@click="jump('tradeWayBox/trade-way', '在途交易', {headHidden: true})"-->
            <image :style="settingIcon" src="images/marquee.png"></image>
            <lc-marquee v-if="marquee.list.length > 0"
                    :list="marquee.list"
                    :index='1'
                    :interval="marquee.interval"
                    :duration="marquee.duration"
                    :wrapperStyle="marqueeWrapper"
                    :textStyle="marqueeText"
                    class="flex-1 ml10">
            </lc-marquee>
            <image src="images/arrow.png" class="arrow" v-if="marquee.list.length > 0"></image>
        </div>

        <!-- 定投计划 -->
<!--        <div class="setting-tab-box flex-row align-center h10 mt15" >-->
<!--            <div class="flex-row flex-1 align-center justify-center"-->
<!--                 @click="goDT()">-->
<!--                <image class="setting-icon" src="images/setting-tab-1.png"></image>-->
<!--                <text class="font-16 m-color-1 ml10 font-bold">定投计划</text>-->
<!--            </div>-->
<!--            <div class="flex-row flex-1 align-center justify-center"-->
<!--                 @click="jump('wishBoxTwo/my-wish', '福利中心', {headHidden: true})">-->
<!--                <image class="setting-icon" src="images/setting-tab-2.png"></image>-->
<!--                <text class="font-16 m-color-1 ml10 font-bold">我的心愿</text>-->
<!--            </div>-->
<!--            <div class="line-setting"></div>-->
<!--            <div class="lineColumn"></div>-->
<!--        </div>-->

        <!-- list -->
        <div class="flex-row aboutlist align-center"> <!-- @click="jump('bankBox/banklist', '银行卡', {headHidden: true})"-->
            <div class="flex-1 flex-row align-center">
                <image src="images/setting-icons-1.png" class="list-icon"></image>
                <text class="font-16 m-color-1 ml10">银行卡</text>
            </div>
            <text class="font-14 m-color-9 mr20">{{bankCardCount}}</text>
            <image src="images/arrow.png" class="arrow"></image>
            <div class="lineabout"></div>
        </div>
        <div class="flex-row aboutlist align-center"> <!-- @click="jump('safeBox/safe', '安全中心', {headHidden: true})"-->
            <div class="flex-1 flex-row align-center">
                <image src="images/setting-icons-2.png" class="list-icon"></image>
                <text class="font-16 m-color-1 ml10">安全设置</text>
            </div>
            <image src="images/arrow.png" class="arrow"></image>
            <div class="lineabout"></div>
        </div>
        <div class="flex-row aboutlist align-center"> <!-- @click="jump('riskBox/my-risk', '风险承受能力', {headHidden: true})"-->
            <div class="flex-1 flex-row align-center">
                <image src="images/setting-icons-3.png" class="list-icon"></image>
                <text class="font-16 m-color-1 ml10">风险承受能力</text>
            </div>
            <text class="font-14 m-color-9 mr20">{{riskabilityStr}}</text>
            <image src="images/arrow.png" class="arrow"></image>
        </div>
        <div class="flex-row aboutlist align-center mt15" v-if="!isActivity"> <!-- @click="jump('commend', '推荐好友', {headHidden: true})"-->
            <div class="flex-1 flex-row align-center">
                <image src="images/setting-icons-4.png" class="list-icon"></image>
                <text class="font-16 m-color-1 ml10">推荐好友</text>
            </div>
            <!-- <text class="font-14 m-color-9 mr20">可获得10元手机费</text>-->
            <image src="images/arrow.png" class="arrow"></image>
            <div class="lineabout"></div>
        </div>
<!--        <div class="flex-row aboutlist align-center mt15" @click="friend" v-if="isActivity" style="display: none;">-->
<!--            <div class="flex-1 flex-row align-center">-->
<!--                <image src="images/setting-icons-4.png" class="list-icon"></image>-->
<!--                <text class="font-16 m-color-1 ml10">推荐有礼</text>-->
<!--            </div>-->
<!--           &lt;!&ndash; <text class="font-14 m-color-9 mr20">可获得10元手机费</text>&ndash;&gt;-->
<!--            <image src="images/arrow.png" class="arrow"></image>-->
<!--            <div class="lineabout"></div>-->
<!--        </div>-->

<!--        <div class="flex-row aboutlist align-center" @click="financial" v-if="isActivity" style="display: none;">-->
<!--            <div class="flex-1 flex-row align-center">-->
<!--                <image src="images/setting-icons-7.png" class="list-icon"></image>-->
<!--                <text class="font-16 m-color-1 ml10">模拟理财</text>-->
<!--            </div>-->
<!--            &lt;!&ndash; <text class="font-14 m-color-9 mr20">可获得10元手机费</text>&ndash;&gt;-->
<!--            <image src="images/arrow.png" class="arrow"></image>-->
<!--            <div class="lineabout"></div>-->
<!--        </div>-->
        <div class="flex-row aboutlist align-center" > <!--@click="jump('feedbackBox/feedback', '意见反馈', {headHidden: true})"-->
            <div class="flex-1 flex-row align-center">
                <image src="images/setting-icons-5.png" class="list-icon"></image>
                <text class="font-16 m-color-1 ml10">意见反馈</text>
            </div>
            <image src="images/arrow.png" class="arrow"></image>
            <div class="lineabout"></div>
        </div>
        <div class="flex-row aboutlist align-center mb20"> <!-- @click="jump('about', '关于我们', {headHidden: true})"-->
            <div class="flex-1 flex-row align-center">
                <image src="images/setting-icons-6.png" class="list-icon"></image>
                <text class="font-16 m-color-1 ml10">关于我们</text>
            </div>
            <image src="images/arrow.png" class="arrow"></image>
        </div>
        <loadingUI :loadShow="loadShow"></loadingUI>
        <!-- 底部 -->

        <div v-if="isPDShow">
            <div class="mask" @touchmove.prevent.stop></div>
            <div class="flex-1 flex-column justify-center align-center h1334">
                <div class="showbox">
                    <div class="flex-1 align-center mt40 mb40">
                        <image src="images/tip-icon.png" class="tip-icon"></image>
                    </div>
                    <div class="flex-row align-center pl20 pr20">
                        <div class="flex-1 justify-center">
                            <text class="flex-1 t-center m-color-6 font-14 ">尊敬的客户，您在腾讯理财通的恒生日日丰</text>
                            <div class="flex-1 flex-row justify-center mt20">
                                <text class="m-color-6 font-14">D基金份额市值,请在</text>
<!--                                <text class="m-color-3 font-14" >“我的”-“腾安”</text>-->
                                <text class="m-color-6 font-14">查询</text>
                            </div>
                        </div>
                    </div>
                    <div class="flex-row  align-center justify-center  mt40">
                        <image src="images/check-1.png" class="check-block mr10" v-if="!isRead" @click="confirmRead"></image>
                        <image src="images/check-2.png" class="check-block mr10" v-if="isRead" @click="cancelRead" ></image>
                        <text class="font-14 m-color-9 mr30">以后不再提醒</text>
                    </div>
                    <div class="dialog-btn flex-column pl40 pr40">
                        <div class="flex-1 align-center blue-bj " @click="goPDHold">
                            <text class="flex-1 font-16 m-color-5 lh88">去看看</text>
                        </div>
                        <div class="flex-1 align-center" @click="hidePD">
                            <text class="flex-1 font-16 m-color-3 lh88">我知道了</text>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </scroller>
        <bottombar :activeIndex="3"></bottombar>
    </div>
</template>

<script>
    import LcCell from "lighting-ui/packages/lc-cell";
    import LcMarquee from "lighting-ui/packages/lc-marquee";
    import Light from "light";
    import bottombar from "../../components/ui/bottombar";
    import loadingUI from '../../components/ui/loadingUI';
    import API from '../../api/api.js';
    import Utils from "../../res/utils";
    import config from "../../config";
    import dialog from "../../components/ui/dialog";
    import btn from "../../components/ui/btn";
    // import broadcast from "@/api/broadcast";
    // import SafeOperation from '@/api/safe-operation';

    var storage = Light.requireModule('storage');//缓存

    var stream = Light.requireModule('stream');
    export default {
        components: {
            LcCell,
            LcMarquee,
            Light,
            bottombar,
            loadingUI,
            API,
            dialog,
            btn
        },
        data() {
            return {
                scrollerHeight: '',
                refreshing:'hide',
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
                reduce: "images/reduce.png",
                typeNum: "num",
                eyePic: "images/openeye.png",
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
                accountInfo:{},
                isTypeR:false,
                isRefreshStop: true,
                isActivity:false,
                isShowUS:false,
                isDollar:config.isDollar,
                isApp:API.matchNative(),
                isRead:false,
                isPDShow:false,
                custType:{},
                openFund:true,
                tenanGuideEnable:false,

            };
        },
        methods: {
            goPDHold(){
                if(this.isRead){//下次不再提示
                    storage.setItem("notTipPD", JSON.stringify({"identityno":  this.accountInfo.identityno
                        ,"isRead": true,"newDate" : API.hsTools.formatDate("","yyyyMMdd")}));
                }else{
                    storage.setItem("notTipPD", JSON.stringify({"identityno":  this.accountInfo.identityno
                        ,"isRead": false,"newDate" : API.hsTools.formatDate("","yyyyMMdd")}));
                }
                this.isPDShow = false;
                API.route.hsOpen('holdBox/hold-pd', {}, {headHidden: true});
            },
            hidePD(){
                // 下次不再提示
                if(this.isRead){
                    storage.setItem("notTipPD", JSON.stringify({"identityno":  this.accountInfo.identityno
                        ,"isRead": true,"newDate" : API.hsTools.formatDate("","yyyyMMdd")}));
                }else{
                    storage.setItem("notTipPD", JSON.stringify({"identityno":  this.accountInfo.identityno
                        ,"isRead": false,"newDate" : API.hsTools.formatDate("","yyyyMMdd")}));
                }
                this.isPDShow = false
            },
            isCustTypePD(){
                var types = this.custType.custtypes.join("");
                if(types.indexOf("PY") != -1){//存在PD角色
                    storage.getItem("notTipPD", (e) => {//判断是否需要提示
                        if (e.data != "undefined") {
                            var notTipPD = JSON.parse(e.data);
                            if(notTipPD.identityno != this.accountInfo.identityno){//客户标识不同,直接提示
                                 if(this.tenanGuideEnable){
                                     this.isPDShow = true;
                                 }
                            }else if(!notTipPD.isRead && parseInt(notTipPD.newDate) != parseInt(API.hsTools.formatDate("","yyyyMMdd"))){
                                //客户标识一致,判断是否勾选过不再提示,并判断时间是否是同一天
                                   if(this.tenanGuideEnable){
                                     this.isPDShow = true;
                                 }
                            }
                        } else {//PD角色提示标识为空,表示需要显示提示
                               if(this.tenanGuideEnable){
                                     this.isPDShow = true;
                                 }
                        }
                    });
                    this.queryThirdAssets();
                }
            },
          goDT () {
              if(this.openFund){
                this.jump('dingtou/fun-list','', {navBarType: '0'})
              }else{
                this.jump("discover/fixedplan", "", {replace:false, navigationBarShow : false});
              }
          },
            queryThirdAssets(){
                API.get("query/share/queryThirdAssets", "", (jsonResult) => {
                    if (jsonResult.successful) {
                        this.pdNum = API.hsTools.formatMoney(jsonResult.totalcapital);
                    }
                })
            },
            financial(){
                // if(!this.loginState){
                //     Light.navigate('login/login-app', {}, {headHidden: true});
                //     return;
                // }
                this.loadShow = true;
                //活动类型（0通用活动，1生日赠礼，2邀请有礼，3模拟理财)
                API.get("market/market/couponquery", "activitytype=3&callid=imitate",(jsonResult) => {
                    this.loadShow = false;
                    if (jsonResult && jsonResult.successful) {
                        var coupon = {};
                        if(jsonResult.couponBeanList.length > 0){
                            coupon = jsonResult.couponBeanList[0];
                        }
                        if(!coupon.state || coupon.state != "1"){
                            API.openWebPage(config.feedbackImgUrl + "activity/pages/frd_end.html");
                            return;
                        }
                        storage.getItem("clientid", (e) => {
                            if (e.data != "undefined") {
                                API.openWebPage(config.feedbackImgUrl + "activity/pages/financial-1.html?activityid="+ coupon.activityid +"&clientid=" + e.data,"",{navBarType: '2', statusBarStyle:'white'});
                            }else{
                                API.openWebPage(config.feedbackImgUrl + "activity/pages/financial-1.html?activityid="+ coupon.activityid);
                            }
                        });
                    }else{
                        API.callFailProcess(jsonResult)
                    }
                });
            },
            friend(){
                // if(!this.loginState){
                //     Light.navigate('login/login-app', {}, {headHidden: true});
                //     return;
                // }
                this.loadShow = true;
                API.get("market/market/couponquery", "activitytype=2&callid=friend",(jsonResult) => {
                    this.loadShow = false;
                    if (jsonResult && jsonResult.successful) {
                        var coupon = {};
                        if(jsonResult.couponBeanList.length > 0){
                            coupon = jsonResult.couponBeanList[0];
                        }
                        storage.getItem("clientid", (e) => {
                            if (e.data != "undefined") {
                                API.openWebPage(config.feedbackImgUrl + "activity/pages/new-frd_start.html?activityid="+ coupon.activityid +"&clientid=" + e.data);
                            }else{
                                API.openWebPage(config.feedbackImgUrl + "activity/pages/new-frd_start.html?activityid="+ coupon.activityid);
                            }
                        });
                    }else{
                        API.callFailProcess(jsonResult);
                    }
                });
            },
            getMyWish() {
                this.loadShow = true;
                API.get("valuavgr/fixdeclare/protocolList", "state2=H&busintype=01&businflag=090&queryfixdelare=true&pageno=1&pagesize=100000",(jsonResult) => {
                    this.loadShow = false;
                    if(jsonResult.result == 0){
                        API.openWebPage(config.feedbackImgUrl + "web/pullswiper.html","?channel=web");
                    }else{
                        API.route.hsOpen("wishBoxTwo/my-wish", "", {replace:false, headHidden : true});
                    }
                });
            },
            getAvgr() {
              // var that=this
              //   this.loadShow = true;
              //   API.get("valuavgr/fixdeclare/protocolList", "state2=H&queryfixtrans=true&queryfixdelare=true&pageno=1&pagesize=100000",(jsonResult) => {
              //       this.loadShow = false;


                      if(this.openFund){
                        API.route.hsOpen("dingtou/fun-list", "", {navBarType: '0'})
                      }else{
                        API.route.hsOpen("discover/fixedplan", "", {replace:false, navigationBarShow : false});
                      }

                // });
            },
            returnImg(){
              if(this.accountInfo.sex == "0"){
                  return "images/woman.png";
              }else if(this.accountInfo.sex == "1"){
                  return "images/man.png";
              }else{
                  return "images/Unknown.png";
              }
            },
            getShare: function () {
                var that = this;
                storage.getItem("shareData", (e) => {

                    if (e.data != "undefined") {
                        var shareData = JSON.parse(e.data);
                        that.setShare(shareData);
                    } else {
                        this.loadShow = true;
                        if(this.isDollar == "true"){
                            API.get("query/share/queryDcInvestMoneyTypeProfit", "supportmoney=true", function (jsonResult) {
                                that.setShare(jsonResult);
                            })
                        }else{
                            API.get("query/share/standShareList", "supportmoney=true", function (jsonResult) {
                                that.setShare(jsonResult);
                            })
                        }

                    }
                })
            },
            setShare: function (jsonResult) {
                var that = this;
                if (jsonResult.successful) {
                    var shareData = jsonResult;
                    storage.setItem("shareData", JSON.stringify(shareData));
                    that.allNum = API.hsTools.formatMoney(jsonResult.totalcapital);//总金额
                    that.yestodayNum = API.hsTools.formatMoney(jsonResult.totallastincome);//昨日收益
                    that.yestodayNumColor = jsonResult.totallastincome;//昨日收益
                    that.xjbNum = API.hsTools.formatMoney(jsonResult.moneyShare.totalcapital);//现金宝
                    that.jjNum = API.hsTools.formatMoney(jsonResult.pbShare.totalcapital);//基金
                    if(parseFloat(jsonResult.dollartotalcapital) > 0){
                       that.usNum = API.hsTools.formatMoney(jsonResult.dollartotalcapital);//美元
                       that.isShowUS = true;
                    }
                }
                that.loadShow = false
            },
            getUserBankList: function () {
                var that = this;
                storage.getItem("currentBankcard", function (e) {

                    if (e.data != "undefined") {
                        var bankCardList = JSON.parse(e.data);
                        that.setUserBankList(bankCardList);
                    } else {
                        API.get("account/tradeacco/psmtMyCardList", "showrenewsigncard=false&showfastmodeonly=false", function (jsonResult) {
                            that.setUserBankList(jsonResult);
                        })
                    }
                })
            },
            setUserBankList: function (jsonResult) {
                var that = this;
                if (jsonResult.successful && jsonResult.result.length > 0) {
                    var bankCardList = jsonResult;
                    storage.setItem("currentBankcard", JSON.stringify(bankCardList));
                    var cardList = [];
                    jsonResult.result.forEach(function(bankCard){
                        if(bankCard.bankChannel && bankCard.bankChannel.length >0){
                            bankCard.bankChannel.some(function (channel) {
                                if(channel.detailcapitalmode == "01" || channel.interfacetype == "1" ||  channel.validatemode=="5"){
                                    cardList.push(bankCard);
                                    return true;
                                }
                            });
                        }
                    });
                    that.bankCardCount = cardList.length + "张";
                }
                if(jsonResult.code == "ETS-5BA00018"){
                    this.isTypeR = false;
                }else{
                    this.isTypeR = true;
                }
            },
            getUserInfo: function () {
                API.get("account/account/queryCustType", "", (jsonResult) => {
                    if (jsonResult.successful) {
                        // SafeOperation.saveCustType(jsonResult)
                        this.custType = jsonResult;
                        storage.getItem("accoInfo", (e) => {
                            if (e.data != "undefined") {
                                var accoInfo = JSON.parse(e.data);
                                this.setUserInfo(accoInfo);
                            } else {
                                this.loadShow = true;
                                API.get("account/account/queryAccoinfo", "showfastmodeonly=false", (jsonResult) => {
                                    if(jsonResult.successful){
                                        this.setUserInfo(jsonResult);
                                    }
                                })
                            }
                        });
                        this.setCusttype();
                    }else{
                        this.loadShow = false;
                        this.xjbNum = "--";
                        this.perData = "--";
                        this.jjNum = "--";
                        this.allNum = "--";
                        this.yestodayNum = "--";
                        this.yestodayNumColor = "";
                        this.lastlogintimeNum = "--";
                        this.loginState = false;
                        this.bankCardCount = "";
                        this.userName = "请点击登录";
                        this.marquee.list = [];
                        this.riskabilityStr = "";
                        this.isTypeR = false;
                        this.usNum = "--";
                        this.pdNum = "--";
                        this.returnImg();
                        API.removeAllItem();
                    }
                });
            },
            setCusttype(){
                storage.getItem("custtype",(e) => {
                    if (e.data == "undefined") {
                        API.get("account/account/queryCustType", "", (jsonResult) => {
                            if (jsonResult.successful) {
                                var custtype = jsonResult.custtypes.join("");
                                storage.setItem("custtype", JSON.stringify(custtype));
                            }
                        });
                    }
                });
            },
            setUserInfo: function (jsonResult) {
                var that = this;
                that.marquee.list = [];
                if (jsonResult.successful) {
                    that.loginState = true;
                    var accountInfo = jsonResult;
                    this.accountInfo = jsonResult.accountInfo;
                    storage.setItem("accoInfo", JSON.stringify(accountInfo));
                    that.userName = jsonResult.accountInfo.custname;
                    if(that.userName == null){
                        that.userName = jsonResult.accountInfo.mobile;
                    }
                    that.riskabilityStr = jsonResult.riskabilityStr;
                    var pflag = jsonResult.accountInfo.pubprofessionalinvestorflag;
                    that.personType = pflag === "1" ? "专" : "普";
                    if(!API.matchNative()){
                        storage.getItem("typeNum", (e) => {
                            if (e.data != "undefined") {
                                this.typeNum = "num";
                                this.changeType();
                            }
                        });
                    }
                    if(jsonResult.accountInfo.openaccodate){//如果存在开户时间
                        that.perData = API.hsTools.datedifference(API.hsTools.yyyy_mm_dd(jsonResult.accountInfo.openaccodate)) + 1;
                    }else{
                        that.perData = "--";
                    }
                    that.returnImg();
                    that.getShare();
                    that.getUserBankList();
                    that.getTradeWay();
                    //that.getLoginInfo();
                    that.getNews();
                    that.isCustTypePD();

                }
            },
            getLoginInfo(){
                storage.getItem("loginInfo", (e) => {
                    if (e.data != "undefined") {
                        var loginInfo = JSON.parse(e.data);
                        if(loginInfo.lastlogintime != null){
                            var startdate = loginInfo.lastlogintime.substr(0, 8);
                            var enddate = API.hsTools.formatDate(new Date(),'yyyyMMdd');
                            var form = API.formGenerate();
                            form.add("ofundtype", "1")//产品类别,1:公募;2:专户
                                .add("filterdsmoney", "1")//过滤直销现金宝收益, 默认不过滤
                                .add("startdate", startdate)
                                .add("enddate", enddate);
                            API.get("query/share/dcInvestProfit",form.generate(), (jsonResult) => {
                                if(jsonResult.successful){
                                    this.lastlogintimeNum = jsonResult.totalincome;
                                    this.yeatoday();
                                }
                            })
                        }
                    }
                })
            },
            getTradeWay(){//需要优化,在途查询
                storage.getItem("tradeWayList", (e) => {
                    if (e.data != "undefined") {
                        var currentWayList = JSON.parse(e.data);
                        this.setTradeWay(currentWayList);
                    } else {
                        API.get("trade/withdraw/withdrawList", "", (withdrawResult) => {
                            //var date = API.hsTools.funDate(-7);
                            API.get("query/tradeapply/applyList", "pageno=1&pagesize=200&fixbusinboardtype=02&confirmflag=9", (jsonResult) => {
                                if (jsonResult.successful) {
                                    var validResult = [];
                                    jsonResult.result.forEach(function (item) {
                                        if (item.kkstat != '1') {// 过滤扣款无效的
                                            validResult.push(item);
                                        }
                                    });
                                    jsonResult.result = validResult;
                                    withdrawResult.result.forEach(function (withdraw) {//修改列表显示内容
                                        jsonResult.result.push(withdraw);
                                    });
                                    this.setTradeWay(jsonResult.result);
                                }
                            });

                        })
                    }
                })
            },
            setTradeWay(jsonResult) {
                var that = this;
                if (jsonResult.length > 0) {
                    var tradeWayList = jsonResult;
                    storage.setItem("tradeWayList", JSON.stringify(tradeWayList));
                    tradeWayList.forEach((item) => {
                        item.text = (item.shortname ? item.shortname : item.fundname) + item.businflagstr+ "申请已提交,等待处理";
                    });
                    that.marquee.list = tradeWayList;
                }else{
                    storage.setItem("tradeWayList", JSON.stringify({data:"isNotData"}));
                    that.marquee.list = [{text: "暂无更多信息"}];
                }
            },
            // 增长和亏损
            yeatoday: function () {
                var _this = this;
                if (_this.lastlogintimeNum == "--") {
                    _this.isRegulateShow = false;
                }
                if (_this.lastlogintimeNum > 0) {
                    this.regulate = true;
                } else {
                    this.regulate = false;
                }
            },
            jump(url, title, params) {
                //如果没有登录,选择性让用户点击可以点击的
                // if(!this.loginState && title != '关于我们'){
                //     Light.navigate('login/login-app', {}, {headHidden: true});
                //     return;
                //
                if(url == "discover/fixedplan"||url == "dingtou/fun-list"){
                    this.getAvgr();
                    return;
                }else if(url == "wishBoxTwo/my-wish"){
                    this.getMyWish();
                    return;
                }else if(this.loginState && title == '登录'){
                     return;
                 }
                params.replace = false;
                params.title = title;
                API.route.hsOpen(url, {}, params);
            },
            changeType() {
                if (this.typeNum === "num") {
                    this.typeNum = null;
                    this.eyePic = "images/colseeye.png";
                    storage.setItem("typeNum", "num");
                } else {
                    this.typeNum = "num";
                    this.eyePic = "images/openeye.png";
                    storage.removeItem("typeNum");
                }
            },


            getNews() {
                var form = API.formGenerate()
                    .add("requestnum", "99")
                    .add("pageno", "1")
                    .add("pagesize", "99")
                    .add("querytype", "1")
                    .generate();
                API.get("common/msgpush/mssagearrayquery", form, (jsonResult) => {
                    if (jsonResult && jsonResult.successful) {
                        var msg = JSON.parse(jsonResult.msgs);
                        var count = 0;
                        msg.forEach((item) => {
                            if (item.is_read == "0") {
                                count++;
                            }
                        })
                        this.noticeNum = count;
                    }
                });
            },
            refreshData(){
                storage.getItem("lastDate", (e) => {
                    if (e.data != "undefined") {
                       var newDate = new Date().getDay();
                       if(parseInt(newDate) != parseInt(e.data)){
                           this.loadShow = true;
                           API.removeAllItem();
                       }
                    }
                    storage.setItem("lastDate", new Date().getDay() + "");// 设置最后一次打开时间
                    this.getUserInfo();
                });
                this.dataTime = new Date().getHours();
                if (this.dataTime > 5 && this.dataTime <= 11) {
                    //上午
                    this.settingPic = "images/setting-morning.jpg";
                    this.dataIcon = "images/morning.png";
                    this.dataName = "上午好!";
                } else if (this.dataTime > 11 && this.dataTime <= 15) {
                    //中午
                    this.settingPic = "images/setting-midday.jpg";
                    this.dataIcon = "images/midday.png";
                    this.dataName = "中午好!";
                } else if (this.dataTime > 15 && this.dataTime < 18) {
                    //下午
                    this.settingPic = "images/setting-afternoon.jpg";
                    this.dataIcon = "images/afternoon.png";
                    this.dataName = "下午好!";
                } else {
                    //晚上
                    this.settingPic = "images/setting-bj.jpg";
                    this.dataIcon = "images/moon.png";
                    this.dataName = "晚上好!";
                }

            },
            onrefresh() {
                if(!this.isRefreshStop){
                    API.removeAllItem();
                    this.loadShow = true;
                    this.getUserInfo();
                    this.refreshing = 'show';
                    setTimeout(() => {
                        this.refreshing = 'hide';
                        this.isRefreshStop = true;
                    }, 500);
                }
            },
            onpullingdown(event){
                if(this.isRefreshStop && event.pullingDistance > 80){
                    this.isRefreshStop = false;
                }
            },
            confirmRead(){
                this.isRead = true;
            },
            cancelRead(){
                this.isRead = false;
            },

            getSystemState(){
                var that = this;
      function getTenanGuideEnable(systemData) {
                    if(systemData.tenanGuideEnable){

                    if(systemData.tenanGuideEnable){
                        that.tenanGuideEnable = true;
                    }else {
                        that.tenanGuideEnable = false;
                    }
                }else{
                    that.tenanGuideEnable = false;
                }
            }
                function getIsActivity(systemData){
                    if(systemData.isActivity){

                        if(systemData.isActivity == "1"){
                            that.isActivity = true;
                        }else {
                            that.isActivity = false;
                        }
                    }else{
                        that.isActivity = false;
                    }

                }
                function isOpenFund(systemData) {
                    if (systemData.openFund) {
                        that.openFund = systemData.openFund
                    }
                }

                    API.systemState((systemData) => {
                        getIsActivity(systemData);
                        isOpenFund(systemData);
                        getTenanGuideEnable(systemData);
                        // if(!API.matchNative()) {
                            that.loadShow = true;

                            that.refreshData();
                        // }
                        if(API.matchNative()){
                            if(Utils.env.isIPhoneX()){
                                that.scrollerHeight = Utils.env.getPageHeight() + 10;
                            }else{
                                that.scrollerHeight = Utils.env.getPageHeight() + 40;
                            }
                        }else{
                            that.scrollerHeight = Utils.env.getPageHeight() - 100;
                        }
                    })

            }
        },



        mounted() {


//          this.systemState()




        },
        created() {
            if (Utils.env.isIPhoneX()) {
                this.isIPhoneX = true;
            }
            Light.on('viewappear',() => {
            //   SafeOperation.verify();

                // this.refreshData();
                this.getSystemState();
            });


            if (!API.matchNative()) {
               this.getSystemState();
            }
            // broadcast.receive('B_LOGIN', (isLogin) => {

            //     this.noticeNum=0;
            //     this.refreshData();
            // })
            // broadcast.receive("typeNum", (c) => {
            //     if(c == true) {
            //         console.error("setting"+ this.typeNum);
            //         if (this.typeNum === "num") {
            //             this.typeNum = null;
            //             this.eyePic = "images/colseeye.png";
            //         } else {
            //             this.typeNum = "num";
            //             this.eyePic = "images/openeye.png";
            //         }
            //     }
            // });
        }
    };
</script>

<style scoped src="../../css/ui.css"></style>
<style scoped>
    .setting-tab-box {
        background-color: #fff;
        position: relative;
    }

    .h100 {
        height: 100px;
    }

    .h160 {
        height: 160px;
    }

    .setting-top {
        padding-left: 30px;
        padding-right: 30px;
    }

    .setting-head {
        height: 80px;
    }

    .setting-bj {
        width: 750px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .person {
        position: relative;
        width: 100px;
        height: 60px;
    }

    .person-type {
        position: absolute;
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        border-radius: 50%;
        background-color: #f8646b;
        right: 12px;
        bottom: 3px;
        font-size: 18px;
        color: #fff;
    }

    .book {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    .notice {
        position: relative;
        height: 80px;
        width: 60px;
    }

    .notice-img {
        width: 50px;
        height: 50px;
    }

    .notice-num {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #f4901e;
        position: absolute;
        top: 8px;
        right: 8px;
        border-radius: 15px;
        color: #fff;
        font-size: 18px;
    }

    .line-setting {
        position: absolute;
        bottom: 0;
        left: 0px;
        right: 0;
        content: " ";
        width: auto;
        height: 1px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e8e8e8;
        transform: scaleY(0.5);
    }

    .lineabout {
        position: absolute;
        bottom: 0;
        left: 30px;
        right: 0;
        content: " ";
        width: auto;
        height: 1px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e8e8e8;
        transform: scaleY(0.5);
    }

    .lineColumn {
        position: absolute;
        right: 374px;
        top: 0;
        bottom: 0;
        content: " ";
        width: 1px;
        height: 100px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #e8e8e8;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
    }

    .setting-icon {
        width: 40px;
        height: 40px;
    }

    .arrow {
        width: 20px;
        height: 30px;
    }

    .aboutlist {
        height: 100px;
        position: relative;
        padding-right: 30px;
        padding-left: 30px;
        background-color: #fff;
    }

    .list-icon {
        width: 50px;
        height: 50px;
    }

    .data-icon {
        width: 45px;
        height: 45px;
        margin-top: -15px
    }

    .num-icon {
        width: 20px;
        height: 30px;
    }

    .cricle {
        width: 10px;
        height: 30px;
    }

    .perimg {
        width: 54px;
        height: 54px;
    }

    .eye {
        width: 40px;
        height: 30px;
    }
    .refresh{
        justify-content: center;
        align-items: center;
        width: 750px;
    }

    .blue-bj {
        background-color: #3580ee
    }

    .lh88{
        line-height: 88px;
    }

    .check-block{
        width: 30px;
        height: 30px;
    }
    /*弹出窗*/
    .tip-icon{
        width: 220px;
        height: 221px;
    }
    .dialog-btn {

        margin-top: 60px;
    }
    .mask{
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
        background-color: rgba(103,103,103,0.5)
    }
    .h1334{
        width: 750px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
    }
    .showbox{
        width: 600px;
        height: 700px;
        background-color: #fff;
    }
</style>
