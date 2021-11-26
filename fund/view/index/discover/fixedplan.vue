<template>
    <div :style="{height: scrollerHeight + 'px'}">
        <!-- 头部 -->
        <image class="pos-img" src="images/fixed-plan-bg.png" :style="backgroundStyle"></image>
        <div class="py_header flex-row align-center" v-bind:style="styleObject"
             :class="[(paddingTop ? (isIPhoneX ? 'pt88' : 'pt40') : ''), (isIPhoneX ? 'h168' : 'h120')]">
            <div class="wish-left justify-center">
                <image src="images/left-icon-w.png" class="wish-icon" @click="goBack()"></image>
            </div>
            <div class="flex-1 justify-center align-center">
                <text class="font-18 m-color-5">定投计划</text>
            </div>
            <div style="width:200px" class="pr30 align-end"
                 @click="jump('fixedBox/fixed-histroy', '历史定投', {headHidden: true})">
                <text class="font-14 m-color-5">历史定投</text>
            </div>
        </div>
        <div class="h70"></div>

        <lc-lightbox type="custom"  showIndicator="true"
                     height="1020" :indicatorColor="indicatorColor">
            <div class="slider-wrapper align-center" v-for="plan in planList">
                <image class="plan-tag-top" src="images/planTop.png"></image>
                <div class="card-wrapper align-center">
                    <div class="detail-wrapper">
                        <image class="plan-background" :src="plan.fixinvesttheme | subjectValue('detailedImg')"></image>
                       <!-- <div class="plan-text-wrapper">
                            <text class="plan-name">{{plan.fundname}}</text>
                            <text class="plan-description">{{plan.fixinvesttheme | subjectValue('desc')}}</text>
                        </div>-->
                        <div class="plan-img-wrapper" v-if="plan.state == 'P'">
                            <image class="stop" src="images/stop.png"></image>
                        </div>
                    </div>
                    <div class="plan-tag-wrapper">
                        <image class="plan-tag-background" src="images/planBody.png"></image>
                        <text class="plan-type">{{plan.fixinvesttheme | subjectValue('title')}}</text>
                    </div>
                    <div class="mount-wrapper flex-row mt20">
                        <div class="flex-1 align-start">
                            <text class="m-color-9 font-12">已投金额</text>
                            <text class="m-color-red font-18 mt10">{{plan.totalcfmmoney | formatMoney}}</text>
                        </div>
                        <div class="align-end">
                            <text class="m-color-9 font-12">{{plan.kkzq + plan.kkrq}}定投(元)</text>
                            <text class="m-color-1 font-14 mt10">{{plan.applysum | formatMoney}}</text>
                        </div>
                    </div>
                    <div class="button-detail mt20" @click="jumpDetail(plan)">
                        <text class="button-detail-text font-19 m-color-5">查看详细</text>
                    </div>
                    <text class="tip-text m-color-9 font-12">下次扣款：{{plan.nexttradedate | formatDate}}</text>
                </div>
            </div>
        </lc-lightbox>

        <div class="flex-row bottomBtn" @click="toFundList">
            <div class="flex-1 blue-bj align-center justify-center">
                <text class="font-18 m-color-5">新增定投</text>
            </div>
        </div>
        <loadingUI :loadShow="loadShow"></loadingUI>

    </div>
</template>

<script>
    import LcLightbox from "lighting-ui/packages/lc-lightbox";
    import Utils from "../../../res/utils";
    import navbar from "../../../components/ui/navbar";
    import loadingUI from "../../../components/ui/loadingUI";
    import Light from "light";
    import LightSDK from 'light-sdk';
    import API from "../../../api/api.js";
    import FixConfig from "../../../static/plans";
    import config from '../../../config';
var lg;
if (process.env.RUNTIME === "miniapp") {
    lg = __base__;
} else {
    lg = weex;
}
    var storage = Light.requireModule('storage');//缓存
    export default {
        components: {
            LcLightbox, navbar, loadingUI
        },
        filters: {
            formatMoney(value) {
                if (!value) return '';
                return API.hsTools.formatMoney(value);
            },
            formatDate(value) {
                if (!value) return '';
                return API.hsTools.formatDate(value, "yyyy/MM/dd");
            },
            subjectValue(value, key) {
                let subject = FixConfig.ThemeBg[value];
                return subject ? subject[key] : '';
            },
        },
        data() {
            return {
                title: "定投计划",
                containerS: {
                    width: 750,
                    height: 900,
                    position: "relative",
                    overflow: "hidden"
                },
                cardS: {
                    width: 630,
                    height: 900,
                    spacing: 0,
                    scale: 1
                },
                planList: [],
                styleObject: {
                    "background-color": "rgba(58,128,237,0)"
                },
                paddingTop: false,
                isIPhoneX: false,
                loadShow: false,
                scrollerHeight:0,
                indicatorColor: {
                    'item-color': '#808080',
                    'item-selected-color': '#f0384f',
                    'item-size': '14px',
                    'bottom': '20px'
                },
                count:0,
            }
        },
        methods: {
            jump(url, title, params) {
                params.replace = false;
                params.title = title;
                API.route.hsOpen(url, {}, params);
            },
            jumpDetail(data) {
                var option = {
                    replace: false,
                    title: '定投详情',
                    navigationBarShow: false
                }
                API.route.hsOpen('fixedBox/fixed', {
                    protocolid: data.protocolid,
                    totalsucctime: data.totalsucctime,
                    totalcfmmoney: data.totalcfmmoney,
                    fixinvesttheme: data.fixinvesttheme
                }, option);
            },
            goBack() {
                API.hsHome("setting");

            },
            toFundList() {
                // if(API.matchNative()){
                //     LightSDK.native.back({"number": "9999"})
                // }
                // API.nextTab(2);
            },
            getFixInvestTheme(data) {
                if (data.fixinvesttheme) return data.fixinvesttheme;
                // 如果没有定投主题有协议别名找对应,无协议别名取第一个主题
                let fixinvesttheme = FixConfig.FixItems[0];
                data.protocolname && FixConfig.FixItems.some((f) => {
                    if (FixConfig.ThemeBg[f].title == data.protocolname) {
                        fixinvesttheme = f;
                        return true;
                    }
                });
                return fixinvesttheme
            },
            getAvgr() {
                var that = this;
                this.loadShow = true;
                API.get("valuavgr/fixdeclare/protocolList", "state2=H&queryfixtrans=true&queryfixdelare=true&pageno=1&pagesize=100000", function (jsonResult) {
                    that.loadShow = false;
                    if (jsonResult.successful) {
                        that.token = jsonResult.token;
                        var temp = [];
                        var map = [];
                        jsonResult.result.forEach((item) => {//拿出所有心愿的编号
                            if (item.state != "H" && item.fundcode == config.xjb.code && item.fixinvestsum != "0.00"
                                && item.targetfundcode == "") {//未结束,为现金宝,目标金额不为0,并且没有目标基金,就是心愿定投
                                map.push(item);
                            }
                        });
                        jsonResult.result.forEach((item) => {
                            var weeks = {
                                "2": "一",
                                "3": "二",
                                "4": "三",
                                "5": "四",
                                "6": "五"
                            }
                            item.KKDay = "";
                            if (item.protocolperiodunit == "0") {
                                item.kkzq = "每月";
                                item.kkrq = (item.protocolfixday.length == 1 ? "0" + item.protocolfixday : item.protocolfixday) + "日";
                            } else if (item.protocolperiodunit == "1") {
                                if (item.tradeperiod == "1") {
                                    item.kkzq = "每周";
                                    item.kkrq = "周" + weeks[item.protocolfixday];
                                } else {
                                    item.kkzq = "每两周";
                                    item.kkrq = "周" + weeks[item.protocolfixday];
                                }
                            }
                            if (item.state != "H") {
                                var isWish = false;
                                map.forEach((mapItem) => {//过滤心愿定投
                                    if(mapItem.protocolid == item.protocolid){
                                        isWish = true;
                                    }
                                });
                                if(!isWish){
                                    item.fixinvesttheme = that.getFixInvestTheme(item);
                                    if(item.targetfundname){
                                        item.fundname = item.targetfundname;
                                    }
                                    temp.push(item);
                                }
                            }
                        });

                        that.planList = temp;
                        /*if(jsonResult.result == 0 && that.count == 0){
                            that.count = 1;
                            setTimeout(function () {
                                API.openWebPage(config.feedbackImgUrl + "web/conduct.html","?channel=web");
                            },500);
                            return;
                        }*/
                    } else {
                        API.callFailProcess(jsonResult);
                    }
                });
            },
            getcusttpye(custtype){
                this.loadShow = false;
                if (custtype.length == 1 || custtype == "" || custtype == "RC"  || custtype == "CR"|| custtype.indexOf("preuser") != -1) { //纯注册用户
                    var jsonResult = {code:"ETS-5BA00020",message:"您尚未开通网上交易功能，请先开通电子直销账户"};
                    API.callFailProcess(jsonResult);
                }else{
                    this.getAvgr();
                }
            },
            initPage(){
                storage.getItem("custtype",(e) => {
                    if (e.data != "undefined") {
                        this.getcusttpye(e.data.replace(/"/g,''));
                    } else {
                        API.get("account/account/queryCustType", "", (jsonResult) => {
                            if (jsonResult.successful) {
                                var types = jsonResult.custtypes.join("");
                                this.getcusttpye(types);
                            }
                        });
                    }
                });
            }
        },
        computed: {
            wrapperStyle() {
                return {
                    "background-color": "#84a0b9",
                    height: Utils.env.getPageHeight() + "px"
                }
            },
            backgroundStyle() {
                return {
                    width: "750px"
                }
            },
        },
        mounted(){
            if(!API.matchNative()) {
                this.initPage();
            }
            let platform = lg.config.env.platform;
            if(platform == "android" || Utils.env.isIPhoneX()){
                this.scrollerHeight = Utils.env.getDeviceHeight();
            }else{
                this.scrollerHeight = 1334;
            }
        },
        created() {
            if (API.matchNative()) {
                this.paddingTop = true;
                if (Utils.env.isIPhoneX()) {
                    this.isIPhoneX = true;
                }
            }
            Light.on('viewappear',() => {
                this.loadShow = true;
                this.initPage();
            });

        }
    }
</script>

<style scoped src="../../../css/ui.css"></style>
<style scoped>
    .slider-wrapper {
        width: 750px;
        height: 900px;
    }

    .plan-tag-top {
        width: 172px;
        height: 14px;
        position: absolute;
        right: 76px;
    }

    .card-wrapper {
        width: 640px;
        height: 900px;
        background-color: #fff;
        margin-top: 14px;
    }

    .detail-wrapper {
        width: 570px;
        height: 556px;
        margin-top: 36px;
    }

    .plan-background {
        width: 570px;
        height: 556px;
        position: absolute;
    }

    .plan-text-wrapper {
        margin-top: 72px;
        margin-right: 32px;
        margin-left: 32px;
    }
    .plan-img-wrapper {
        margin-top: 470px;
        margin-right: 32px;
        margin-left: 32px;
    }

    .plan-name {
        font-size: 46px;
        color: #ffffff;
    }

    .plan-description {
        font-size: 24px;
        color: #ffffff;
        margin-top: 20px;
        line-height: 32px;
    }

    .plan-tag-wrapper {
        width: 178px;
        height: 50px;
        position: absolute;
        top: -4px;
        right: 18px;
        align-items: center;
    }

    .plan-tag-background {
        width: 178px;
        height: 50px;
        position: absolute;
    }

    .plan-type {
        font-size: 30px;
        color: #ffffff;
    }

    .mount-wrapper {
        width: 570px;
    }

    .button-detail {
        width: 570px;
        height: 80px;
        background-color: #3580ee;
        justify-content: center;
        align-content: center;
    }

    .button-detail-text {
        text-align: center;
    }

    .tip-text {
        width: 640px;
        text-align: center;
        position: absolute;
        bottom: 32px;
    }

    .add-fixed-wrapper {
        width: 750px;
        position: absolute;
        bottom: 60px;
    }

    .add-fixed-img {
        width: 38px;
        height: 38px;
        margin-left: 4px;
    }

    .indicator {
        position: absolute;
        item-color: #fff;
        item-selected-color: #f0384f;
        item-size: 14px;
        width: 750px;
        height: 20px;
        bottom: 24px;
    }

    .pos-img {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .py_header {
        width: 750px;
    }

    .wish-left {
        width: 200px;
    }

    .wish-icon {
        width: 50px;
        height: 50px;
        margin-left: 20px;
    }

    .h70 {
        height: 70px;
    }

    .h168 {
        height: 168px;
    }

    .h120 {
        height: 120px;
    }

    .bottomBtn {
        height: 100px;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 750px;
    }
    .blue-bj {
        background-color: #3580ee;
    }
    .stop{
        width: 113px;
        height: 41px;
    }
</style>
