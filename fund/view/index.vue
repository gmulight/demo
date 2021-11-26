<template>
    <div class="flex-1">
        <sub-view></sub-view>
        <!-- <bottombar :activeIndex="activeIndex" v-if="!isMiniapp"></bottombar> -->
    </div>
</template>
<script>
    import Light from "light";
    import API from '../api/api.js';
    import config from '../config.js'
    import tips from '../components/ui/tips';
    import btn from "../components/ui/btn";
    import dialog from "../components/ui/dialog";
    import LightSDK from 'light-sdk';
    // import SafeOperation from "../api/safe-operation";
    import bottombar from "../components/ui/bottombar";


    var storage = Light.requireModule('storage');//缓存
    export default {
        components: {tips, btn, dialog, bottombar},
        data() {
            return {
                tipsshow: false,//提示必须参数
                message: "",//提示必须参数
                isTwoShow: false,
                isThreeShow: false,
                getUrl: "",
                btnName: "确定",
                activeIndex: 0,
                isMiniapp: process.env.RUNTIME==='miniapp',
                bundleJS : 'empty'
            };
        },
        methods: {
            showtip() {//提示组件必须
                this.tipsshow = false;
            },
            ok() {
                this.isTwoShow = false;
                if(this.getUrl != ""){
                    API.route.hsOpen(this.getUrl,{},{replace: false,title:'',headHidden:true});
                } else {
                    this.message = "非身份证客户暂不支持开户！";
                    this.tipsshow = true;
                    setTimeout(function () {
                        API.hsBack();
                    },2000);
                }
            },
            close() {
                this.isTwoShow = false;
                API.hsBack();
            },
            success() {
                this.isThreeShow = false;
                if(this.getUrl != ""){
                    API.route.hsOpen(this.getUrl,{},{replace: false,title:'',headHidden:true});
                }else{
                    API.hsBack();
                }
            },
            getcusttpye(custtype){
                if (custtype == "C" || custtype == "preuser") { //纯代销用户
                    this.getUrl = "login/bind-phone";
                }else if(custtype == "RC" || custtype == "CR" || custtype == "preuserR"){//注册加代销用户
                    storage.getItem("accoInfo", (e) => {
                        var userInfo = e.data != "undefined" ? JSON.parse(e.data) : {};
                        if(userInfo.accountInfo.identitytype != "0"){
                            this.getUrl = "";// 其他证件用户直接跳转首页
                        }else{
                            this.getUrl = "idbox/id-verification-two";
                        }
                    });
                }else if(custtype.indexOf("ED") != -1 && custtype.indexOf("R") == -1){
                    this.getUrl = "login/bind-phone";
                    this.btnName = "前往绑定";
                    this.message = "如需使用该功能,请前往绑定手机号"
                } else{
                    this.getUrl = "idBox";
                }
            }
        },
        mounted() {
            // this.bundleJS = __base__.bundleJS;
            // SafeOperation.loginPreVerify();
            Light.on("error", (jsonResult) => {
                console.log('jsonResult', jsonResult)
                if (jsonResult && jsonResult.code) {
                    this.message = jsonResult.message;
                    if ("ETS-5BP00001" == jsonResult.code) { //长时间未登录
                        API.removeAllItem();
                        if (API.matchNative()) {
                            // SafeOperation.verify({}, true, () => {
                            //     Light.navigate('login/login-app', {}, {replace: false, title: '登录', headHidden: true});
                            // });
                        } else {
                            setTimeout(() => {
                                Light.navigate('login/login-app', {}, {replace: false, title: '登录', headHidden: true});
                            },300);
                        }
                    } else {
                        if("ETS-5BS0011" == jsonResult.code) {
                            this.isTwoShow = true;
                            this.getUrl = "";
                            this.btnName = "确定";
                         } else if(jsonResult.code == "ETS-5BD0042" || jsonResult.code == "DS-TR041036" || jsonResult.code == "DS-TR6L2506") {
                            this.message = "您的风险等级评估已过期或未评估,请重新确定您的风险承受能力";
                            this.isTwoShow = true;
                            this.getUrl = "riskBox/risk";
                            this.btnName = "确定";
                         } else if(jsonResult.code == "ETS-5BA00021" || jsonResult.code == "ETS-5BA00018" || jsonResult.code == "ETS-5BA00020") {
                            this.isTwoShow = true;//柜台用户,代销用户,手机号注册用户,一律去绑卡
                            this.btnName = "一键开户";
                            storage.getItem("custtype",(e) => {
                                if (e.data != "undefined") {
                                    this.getcusttpye(e.data.replace(/"/g,''));
                                } else {
                                    // API.get("account/account/queryCustType", "", (jsonResult) => {
                                    //     if (jsonResult.successful) {
                                    //         var types = jsonResult.custtypes.join("");
                                    //         this.getcusttpye(types);
                                    //     }
                                    // });
                                }
                            });
                         } else if(jsonResult.code == "ACB01") {//手机号已经注册
                            this.message = "该手机号已注册,请点击确定输入登录密码进行绑定";
                            this.isTwoShow = true;
                            this.getUrl = "login/set-login-password";
                            this.btnName = "确定";
                        } else if(jsonResult.code == "todolist") {//待办事项
                            this.message = "您需要完成待办事项";
                            this.isTwoShow = true;
                            this.getUrl = "server";
                            this.btnName = "确定";
                        } else if(jsonResult.code == "ACB42") {//手机号已经绑定
                            this.message = "该账户已与其他账号绑定,请重新输入新的手机号";
                            this.isThreeShow = true;
                            this.getUrl = "";
                        }  else if(jsonResult.code == "HPSS-BUSI-000048" || jsonResult.code == "ETS-5BP9961"
                            || jsonResult.code == "ETS-5BL4101" || jsonResult.code == "ETS-5BL4102") {//未开户
                            this.message = "您尚未开通网上交易功能，请先开通电子直销账户";
                            this.btnName = "一键开户";
                            this.isTwoShow = true;
                            this.getUrl = "idBox";
                        } else if(jsonResult.code == "ACB22"){
                            this.message = "输入错误次数过多,请稍后重试";
                            this.tipsshow = true;
                        } else {
                            this.tipsshow = true;
                         }
                    }
                } else {
                     if(jsonResult&&jsonResult.message == "服务器连接失败") {
                         this.tipsshow = true;
                         this.message = "哎呀，网络开小差了";
                     }else {
                         if(API.matchNative()){
                             LightSDK.native.getNetworkStatus(null,(result) => {
                                 if(result.data.result == "noNetwork"){
                                     this.tipsshow = true;
                                     this.message = "网络连接异常, 请检查网络";
                                 } else{
                                     this.tipsshow = true;
                                     this.message = "哎呀，网络开小差了";
                                 } 
                             });
                         }else{
                             this.tipsshow = true;
                             this.message = "哎呀，网络开小差了";
                         }

                     }
                }
            })
        },
        watch:{
            '$route': {
                handler: function (curPage, prePage) {
                    switch (curPage.path) {
                        case '/index/home':
                            this.activeIndex = 0;
                            break;
                        case '/index/discover':
                            this.activeIndex = 1;
                            break;
                        case '/index/fund-list':
                            this.activeIndex = 2;
                            break;
                        case '/index/setting':
                            this.activeIndex = 3;
                            break;
                        case '/index/fund':
                            this.activeIndex = 2;
                            break;
                    
                        default:
                            break;
                    }
                     
                   
                    if (!API.matchNative()) {
                        API.systemState();
                    }

                    if(config.isAnalyticsPages == "false"){
                        return;
                    }
                    // if (prePage && !API.matchNative()) {
                    //     Countly.q.push(['closePage', {
                    //         pageId: prePage.path, userId: "USER_ID", other: {}
                    //     }]);
                    // }
                    // if (curPage && !API.matchNative()) {
                    //     Countly.q.push(['openPage', {
                    //         pageId: curPage.path, userId: "USER_ID", other: {}
                    //     }]);
                    // }
                },
                immediate: true,
            }
        }
    }
</script>
<style scoped src="../css/ui.css"></style>
<style scoped>
    .icon-fail {
        width: 110px;
        height: 110px;
    }

    .description-text {
        text-align: center;
        font-size: 28px;
        line-height: 48px;
        color: #5e5e5e;
        margin-top: 20px;
    }

    .dialog-btn {
        height: 90px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-top-width: 1px;
        border-top-color: #e8e8e8;
    }

    .btn-left {
        height: 90px;
        border-right-width: 1px;
        border-right-color: #e8e8e8;
    }
</style>
