<template>
    <div  style="background-color:#f0eff4;">
    <!-- 顶部 -->
        <!-- <text>{{bundleJS}}</text> -->

    <div class="py_header flex-row align-center" :style="styleObject"  :class="[(paddingTop ? (isIPhoneX ? 'pt88' : 'pt40') : ''), (isIPhoneX ? 'h168' : 'h120')]">
        <div class="search-wrap flex-row align-center ml30" :style="{width : paddingTop ? 580 : 650 + 'px'}"> <!--  @click="jump('search','搜索')" -->
            <image class="search-img ml20" src="images/glass.png"></image>
            <text class="search-text ml20"></text>
        </div>
        <div v-if="paddingTop">
            <image src="images/scan.png" class="scan-icon" @click="scanQRCode"></image>
        </div>
        <div class="notice justify-center " > <!-- @click="jump('news','消息中心')" -->
            <image src="images/notice.png" class="notice-img"></image>
            <text class="notice-num" v-if="noticeNum != 0">{{noticeNum}}</text>
        </div>
    </div>
    <scroller @scroll="scrollHandler" :style="{height: scrollerHeight + 'px', paddingBottom: '100px'}">
        <refresh v-if="isApp" class="refresh" :display="refreshing"  @refresh="onrefresh" @pullingdown="onpullingdown">
            <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
        </refresh>
        <lc-slider-jsn style="position: relative" :items="imageList" :auto-play="true" width="750" height="490" :interval="5000"></lc-slider-jsn>
     
        <div v-for="(item, index) in pageData" :key="index">

            <!-- nav -->
            <lc-nav :navList="item.data" v-if="item.type == 'shortcuts'"></lc-nav> <!--  @onclick="navClick1" -->

            <!--现金宝 -->
            <xjb :xjbBox="item.data[0]" v-if="item.type == 'cashs'"></xjb>
             <!-- @onclick="xjbClick" @onFund="jump('xjb','',{fundcode:item.data[0].link})" -->

            <!-- 推荐基金 -->
            <recommend :recommendList="item.data" ref="themeRecommMatrix" typeName="themeRecommMatrix"  v-if="item.type == 'themeRecommMatrix'"></recommend> <!-- @onclick="navClick($event,'themeRecommMatrix')" -->

            <!-- 限时福利 -->
            <welfare :welfarePic="item.data" v-if="item.type == 'viceBanner'"></welfare> <!--  @onclick="welfareClick" -->


            <!-- 热销排行 -->
            <div>
                <hot :hotList="item.data" :hotIcon="hotIcon" :hotName="hotName" typeName="recommProds" ref="recommProds" v-if="item.type == 'recommProds'"
                 @onclick="navClick($event, 'recommProds')"></hot>
            </div>
            

            <!-- 价值精选 -->
            <!-- <value :valueList="item.data" :valueOne="item.data"
                   v-if="item.type == 'themeRecommMatrix2'"></value> -->

            <!-- 资讯列表中台 -->
            <div>
                <cmsnewslist ref="asianews" v-if="item.type == 'cmsNewsList'" :infoList="item.data"></cmsnewslist>
            </div>
            


        </div>
   </scroller>

        <!-- <dialog :show="isThreeShow" :top=312>
            <div class="flex-column align-center pt60 pb80">
                <image src="images/faile.png" class="icon-fail"></image>
                <text class="font-14 m-color-9 mt40">{{qrData}}</text>
            </div>
            <div class="dialog-btn" @click="hideThree">
                <text class="font-20 font-bold m-color-3">确定</text>
            </div>
        </dialog> -->

        <!-- <div v-if="tanPic">
            <div class="mask" @touchmove.prevent.stop></div>
            <div class="flex-1 flex-column justify-center align-center h1334">
                <image @load="onImageLoad" class="tan_img" :src="adPic" @click="adPicClick()"></image>
                <image class="tan_close_img" src="images/tan-close.png" @click="closeTan()"></image>
            </div>

        </div> -->

        <!-- <loadingUI :loadShow="loadShow"></loadingUI> -->
        <!-- 底部 -->
        <!-- <bottombar :activeIndex="0"></bottombar> -->

    </div>
</template>

<script>
    import dialog from "../../components/ui/dialog";
    import Title from "lighting-ui/packages/_mods/title.vue";
    import Category from "lighting-ui/packages/_mods/category.vue";
    import LcLightbox from "lighting-ui/packages/lc-lightbox";
    import btn from "../../components/ui/btn";
    import bottombar from "../../components/ui/bottombar";
    import Light from "light"; // light
    import API from "../../api/api.js";
    import LightSDK from 'light-sdk';
    import loadingUI from "../../components/ui/loadingUI";
    import config from "../../config";
    // import broadcast from "@/api/broadcast";
    import Utils from "../../res/utils";
    import LcNav from "../../components/ui/nav";
    import xjb from "../../components/ui/xjb";
    import cmsnewslist from "../../components/ui/cmsnewslist";
    import recommend from "../../components/ui/recommend";
    import welfare from "../../components/ui/welfare";
    import hot from "../../components/ui/hot";
    import value from "../../components/ui/value";
    import LcSliderJsn from "../../components/ui/lb-mini";
    import LcSlider from "../../components/ui/lb-mini-web";
    import homeData from "../../static/home";
    // import SafeOperation from "../../api/safe-operation";
    var lg;
    if (process.env.RUNTIME === "miniapp") {
        lg = __base__;
    } else {
        lg = weex;
    }

    const LightJSBridge = Light.requireModule('LightJSBridge');
    var stream = Light.requireModule('stream');
    var storage = Light.requireModule("storage"); //缓存
    var modal = Light.requireModule('modal');

    export default {
        name: "home",
        components: {Title, Category,cmsnewslist, LcLightbox, btn, bottombar, LcNav, xjb, recommend, welfare, hot, value, dialog, loadingUI,LcSlider,LcSliderJsn},
        data: function () {
            return {
                statusBarHeight: 44,
                openFund: true,
                isPages: false,
                pageTitle: "",
                scrollerHeight: '',
                pageUrl: "",
                bgColor:"#f1f0f6",
                isThreeShow: false,
                qrData: "",
                indicatorColor: {
                    "item-color": "#fff",
                    "item-selected-color": "#f0384f",
                    "item-size": "14px",
                    "bottom": "30px"
                },
                imageList: [
                    { src: 'images/lightbox/home-1.png' },
                    { src: 'images/lightbox/home-2.png' },
                    { src: 'images/lightbox/home-3.png' }//4个有问题

                ],//顶部滚图
                noticeNum: 0,
                styleObject: {
                    // "background-color": "rgba(58,128,237,0)",
                    
                    backgroundColor: "rgba(58,128,237,0)",
                },
                activeIndex: 0,
                paddingTop: false,
                isIPhoneX: false,
                hotIcon: true,
                hotName: "正在热销",
                highIcon:true,
                highName:'高端理财',
                // pageData: homeData.page,
                pageData:[],
                refreshing:'hide',
                refreshText:'',
                refreshFlag:false,
                lastUpdateDate:new Date().getTime(),
                loadShow: false, //遮罩层必须参数
                channel:"",
                preview:false,
                loginState:true,
                isRefreshStop: true,
                updateMessage:"",// app更新提示文字
                updateApkUrl:"",// app更新跳转链接
                isVersionOld:true,//app 版本是否是老版本
                isApp:API.matchNative(),
                tanPic:false,
                adPic:"",
                adPicSrc:"",
                adPicSrcType:"",

            };
        },
        methods: {
            opengmu() {
                var event = Light.requireModule('event');
                event.openNative('miniapp', {
                    startPage: 'puyin.vhost.light.com/app.miniapp.js'
                })
                // Light.navigate('gmu://miniapp?startPage=puyin.vhost.light.com/app.miniapp.js')
            },
            onImageLoad (event) {
                if (event.success) {
                }else{
                    this.homePagePopAds();
                }
            },
            adPicClick(){
                if(this.adPicSrcType == "1"){
                    this.jump("fund", "", {fundcode: this.adPicSrc});
                }else if(this.adPicSrcType == "2"){

                }else if(this.adPicSrcType == "3"){
                    API.openWebPage(this.adPicSrc);
                }
            },
            setHomePagePopAds(jsonResult){
                function rnd(n, m){
                    var random = Math.floor(Math.random()*(m-n+1)+n);
                    return random;
                }
                var ads = [];
                jsonResult.result.forEach((item) =>{
                    if(item.mobileimgfilename){
                        ads.push(item);
                    }
                });
                if(ads.length > 0){
                    var count = rnd(0,ads.length - 1);
                    this.adPic = jsonResult.advertpath + jsonResult.result[count].mobileimgfilename
                        + "?_random=" + new Date().getTime();
                    if(jsonResult.result[count].mobilelinktype == "1"){//跳转基金详情
                        this.adPicSrcType = "1";//跳转基金详情
                    }else if(jsonResult.result[count].mobilelinktype == "3"){
                        if(jsonResult.result[count].mobilelink.indexOf("gmu") != -1){//跳转 app 内部页面
                            this.adPicSrcType = "2";//跳转 app 内部页面
                        }else{
                            this.adPicSrcType = "3";//跳转外部页面
                        }
                    }
                    this.adPicSrc = jsonResult.result[count].mobilelink;
                    this.tanPic = true;
                }
            },
            getHomePagePopAds(){
                storage.getItem("homePagePopAds", (e) => {
                    if (e.data != "undefined") {
                        var homePagePopAds = JSON.parse(e.data);
                        if(parseInt(homePagePopAds.newDate) != parseInt(API.hsTools.formatDate("","yyyyMMdd"))){
                            this.homePagePopAds();
                        }
                    }else{
                       this.homePagePopAds();
                    }
                });
            },
            homePagePopAds(){
                var data = API.formGenerate().add("useflag","homePagePopAds").generate();
                API.get("product/product/bannerquery", data ,(jsonResult) => {
                    if(jsonResult&&jsonResult.successful){
                        jsonResult.newDate = API.hsTools.formatDate("","yyyyMMdd");
                        storage.setItem("homePagePopAds", JSON.stringify(jsonResult));
                        this.setHomePagePopAds(jsonResult);
                    }
                });
            },
            closeTan(){
                this.tanPic=false;
            },
            getAvgr() {
                // this.loadShow = true;
                // var that=this
                // API.get("valuavgr/fixdeclare/protocolList", "state2=H&queryfixtrans=true&queryfixdelare=true&pageno=1&pagesize=100000",(jsonResult) => {
                //     this.loadShow = false;

                      if(this.openFund){
                          this.jump('dingtou/homeding','','','0');
                      }else{
                        API.route.hsOpen("discover/fixedplan", "", {replace:false, navigationBarShow : false});
                    }
                // });
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
            onrefresh() {
                if(!this.isRefreshStop){
                    var self = this;
                    this.loadShow = true;
                    storage.removeItem("home");
                    this.getRiskFund();
                    this.refreshing = 'show';
                    setTimeout(() => {
                        self.refreshing = 'hide';
                        this.isRefreshStop = true;
                    }, 500);
                }
            },
            onpullingdown(event){
                if(this.isRefreshStop && event.pullingDistance > 80){
                    this.isRefreshStop = false;
                }
            },
            hideThree: function () {
                this.isThreeShow = false;
            },
            nextTab: function (index) {
                API.nextTab(index);
            },
            initPage(res, jsonResult) {
                // this.imageList = [];
                this.pageData = [];
                var that = this;
                var data = res;

                data.page.forEach((item) => {
                    // if (item.type == 'banner') {
                    //     item.data.forEach((itemBanner) => {

                    //         itemBanner.src = itemBanner.mobileImgFilename + "?_random=" + new Date().getTime();
                    //         // that.imageList.push(itemBanner)
                    //     })
                    // }

                    // if (item.type != 'viceBanner' && item.type != 'shortcuts' && item.type != 'themeRecommMatrix2'&& item.type != 'cmsNewsList'
                    //     && jsonResult.productList != null && jsonResult.productList.length > 0) {
                    //     //推荐过滤风险不匹配的基金
                    //     var fundList = [];
                    //     item.data.forEach((i) => {
                    //         if (i.fundinfo) {
                    //             jsonResult.productList.forEach((items) => {
                    //                 if (items.fundcode == i.fundinfo.fundcode) {
                    //                     fundList.push(i);
                    //                 }
                    //             });
                    //         }
                    //     });
                    //     item.data = fundList;
                    // }

                });
                that.pageData = data.page;
                console.log(that.pageData)
                that.loadShow = false;
                this.refreshing = 'hide';
            },
            ajaxList: function (jsonResult) {
                var that = this;
                var timestamp = (new Date()).valueOf();
                /*storage.getItem("home", function (e) {
                    if (e.data != "undefined") {
                        that.initPage(e.data, jsonResult);
                    }*/
                    var url = config.homeAndDiscoverUrl + that.channel;
                    if(that.preview){//是否预览查看
                        url = url + "_home_preview.json?_" + timestamp;
                    }else{
                        url = url +"_home.json?_" + timestamp;
                    }
                    // stream.fetch({
                    //     method: 'GET',
                    //     url: url//"static/home.json"
                    // }, function (res) {
                    //     if(!that.preview) {//中台预览不需要缓存
                    //         storage.setItem("home", JSON.stringify(JSON.parse(res.data)));
                    //     }
                    //     that.initPage(res.data, jsonResult);
                    // });
                    // Light.ajax({
                    //     type: 'GET',
                    //     url: url,//"static/home.json"
                    //     success: function (res) {
                    //         if(!that.preview) {//中台预览不需要缓存
                    //             storage.setItem("home", JSON.stringify(res));
                    //         }
                    //         that.initPage(res, jsonResult);
                    //     }
                    // });

                    //本地数据mock
                    if(process.env.RUNTIME.toLowerCase()==='web') {
                        stream.fetch({
                            method: "get",
                            url: "mock/indexList.json",
                            type: "json",
                            headers: {}
                        }, function(res) {
                            //  if(!that.preview) {//中台预览不需要缓存
                            //         storage.setItem("home", JSON.stringify(res));
                            //     }
                            that.initPage(res.data, jsonResult);
                        }, function(ret){
                            
                        })
                        
                    } else {
                        Light.ajax({
                            url: "mock/indexList.json",
                            type: 'get',
                            dataType: 'json',
                            headers: {},
                            success: function (res) {
                                if(!that.preview) {//中台预览不需要缓存
                                    storage.setItem("home", JSON.stringify(res));
                                }
                                that.initPage(res, jsonResult);
                            }
                        });
                        
                    }
                   
                    

                //});
            },
            navClick(e, typeName) {
                if (e.link == "" || e.link == "#") {
                    return;
                }

               if (typeName="recommProds"){
                   var  fundinfo=e.fundinfo;
                   var attributes = {"c_maintitle":e.title,"c_subtitle":e.subTitle,
                       "c_prodcode":fundinfo.fundcode,"c_prodname":fundinfo.fundname,
                       "c_accesslink":e.link,"c_theme":"homePageFund"};
                   API.analytics(attributes,e,"recommProds");
               }
                if (typeName == "themeRecommMatrix") {
                    var  fundinfo=e.fundinfo;
                    var attributes = {"c_maintitle":e.title,"c_subtitle":e.subTitle,
                        "c_prodcode":fundinfo.fundcode,"c_prodname":fundinfo.fundname,
                        "c_accesslink":e.link,"c_theme":"homePageFund"};
                    API.analytics(attributes,e,"themeRecommMatrix");
               }

                if (e.linkType == "1") {//跳转产品详情
                    this.jump("fund", "", {fundcode: e.link});
                }  else if (e.linkType == '3') {
                  this.jump(e.link, '', '')
                }
            },
              navClick1 (e) {
                if (e.link == '' || e.link == '#') {
                  return
                }

            if (!this.openFund) {
                if (e.linkType == '1') {//跳转产品详情
                  this.jump('fund', '', { fundcode: e.link })
              } else if (e.linkType == '3') {//跳转其他内部链接
                this.jump(e.link, '', '')
              }
            }else{
              if (e.linkType == '1') {//跳转产品详情
                this.jump('fund', '', { fundcode: e.link })
                } else if (e.linkType == '3' && e.title.indexOf('魔方定投')>=0) {

                  if(this.openFund){

                      this.jump('dingtou/homeding','','','0')

                  }else{
                      API.route.hsOpen("discover/fixedplan", "", {replace:false, navigationBarShow : false});
                  }
                  // this.jump('discover/fixedplan', '魔方定投', '', { navigationBarShow: false,navBarType:2 })

                } else if (e.linkType == '3') {
                  this.jump(e.link, '', '')
                }
            }

              },
            welfareClick(){
                this.jump("welfareBox", "", "");
            },
            xjbClick(e) {
                if (e.linkType == "1") {//跳转产品详情
                    var fundinfo=e.fundinfo;
                    var attributes = {"c_maintitle":e.title,"c_subtitle":e.subTitle,
                        "c_prodcode":fundinfo.fundcode,"c_prodname":fundinfo.fundname,
                        "c_accesslink":e.link,"c_theme":"homePageFund"};
                    API.analytics(attributes,e,"xjbClick");
                    this.jump("trade/xjb-recharge", "", {fundcode: e.link});
                }
            },
            lcImgClick(e) {//banner点击
                return;
                var item = this.imageList[e.index];
                var attributes = {"c_maintitle":item.name,"c_subtitle":"","c_prodcode":"","c_prodname":"",
                    "c_accesslink":item.mobileLink,"c_theme":"homePageFund"};
                API.analytics(attributes,item,"lcImgClick");
                if (item.mobileLinkType == "1") {//跳转产品详情
                    this.jump("fund", "", {fundcode: item.mobileLink});
                } else if (item.mobileLinkType == "3") {//跳转外链
                    API.openWebPage(item.mobileLink);
                }
            },
            /*
            *
            *   navBarType：0------>不使用标题栏、状态栏(状态栏不占高度会浮在页面顶部，即页面通顶效果)
                navBarType：1------>使用标题栏、状态栏（默认）
                navBarType：2------>仅使用状态栏且状态栏占高度
            * */
            jump(url, title, data,navBarType) {
                var params = {};
                params.replace = false;
                params.title = title;
                if(navBarType){
                    params.navBarType=navBarType;
                }
                if(url == "wishBoxTwo/my-wish"){//未登录
                    // if(!this.loginState){//未登录
                    //     this.jumpLogin()
                    //     return;
                    // }else{
                        this.getMyWish();
                        return;
                    // }
                }
                // else if(url == "xjb" && !this.loginState){//未登录
                //     this.jumpLogin()
                //     return;
                // }else
                if(url == "discover/fixedplan"){
                    // if(!this.loginState){//未登录
                    //     this.jumpLogin()
                    //     return;
                    // }else{
                        this.getAvgr();
                        return;
                    // }
                }
                // else if(url == "trade/xjb-recharge" && !this.loginState){//未登录
                //     this.jumpLogin()
                //     return;
                // }else if(url == "welfareBox" && !this.loginState){//未登录
                //     this.jumpLogin()
                //     return;
                // }else if(url == "news" && !this.loginState){//未登录
                //     this.jumpLogin()
                //     return;
                // }else{
                //     params.headHidden = true;
                // }

                if(url.indexOf("http") != -1){//完整的外链
                    API.openWebPage(url);
                    return;
                }
                API.route.hsOpen(url, data, params);
                // Light.navigate(url, data, params);
            },
            jumpLogin () {
                // Light.navigate('login/login-app', {}, {headHidden: true});
            },
            scrollHandler(e) {

                this.offsetY = e.contentOffset.y;
                var percent = Math.abs(this.offsetY) / 500.0;
                if (percent > 1) {
                    percent = 1;
                }
                // console.log(percent)
                // this.styleObject = {
                //     "background-color": "rgba(58,128,237," + percent + ")",
                //     // "padding-top": this.statusBarHeight+'px'
                // }
                this.styleObject.backgroundColor = "rgba(58,128,237," + percent + ")";
                   
            },
            scanQRCode() {
                var that = this;
                LightSDK.native.scanCode({}, function (data) {
                    if (data.info.error_code != "0") {
                        that.qrData = "扫码失败";
                        that.isThreeShow = true;
                        return false;
                    } else {
                        try {
                            var qr = JSON.parse(data.data.result);
                            if (qr.key == "etrade-login") {
                                if (qr.value.expflg && qr.value.expflg == "1") {
                                    that.qrData = "二维码已过期";
                                    that.isThreeShow = true;
                                } else {
                                    storage.getItem("accoInfo", function (e) {//判断是否有登录
                                        var token = qr.value.token;
                                        if (e.data != "undefined") {
                                            // API.get("account/account/queryCustType", "", function(jsonResult) {
                                            //     if (jsonResult.successful) {//如果登录直接授权网上交易登录
                                            //         that.jump("ewm", "", {qrtoken:  encodeURIComponent(token)});
                                            //     } else if (jsonResult.code == "ETS-5BP00001") {//先登录在授权网上交易登录
                                            //         that.jump("login/login-app", "", {qrtoken:  encodeURIComponent(token)});
                                            //     }
                                            // });
                                        } else {//先登录在授权网上交易登录
                                            that.jump("login/login-app", "", {qrtoken:  encodeURIComponent(token)});
                                        }
                                    });
                                }
                            }else{
                                that.qrData = "无效二维码";
                                that.isThreeShow = true;
                            }
                        } catch (e) {
                            that.qrData = "扫码失败";
                            that.isThreeShow = true;
                        }
                    }
                })
            },
            getRiskFund(){
                var param = API.formGenerate().add("sysType", "PB").add("riskmatch", "true").generate();
                // API.get("product/product/productInfoList", param, (jsonResult) => {
                    this.ajaxList({});
                // });
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
            isLoginState(){
                // API.get("account/account/queryCustType", "", (jsonResult) => {
                //     if (jsonResult.successful) {
                //         // SafeOperation.saveCustType(jsonResult)
                //         this.loginState = true;
                //         this.getNews();
                //     }else{
                //         this.noticeNum = 0;
                //         this.loginState = false;
                //         if(API.matchNative()){//如果 app 未登录删除手势密码
                //             LightJSBridge.call("validate.verifyOpeation", {"verifyType":"GL", "GLOpeationType": "clear"}, (result) => {});
                //         }
                //     }
                // });
            },
            appInit(){

                let platform = lg.config.env.platform;
                var param = API.formGenerate();
                if (platform == "iOS") {
                    param.add("deviceType", "1");
                } else {
                    param.add("deviceType", "2");
                }
                API.get("common/msgpush/addcustdevice", param.generate(), () => {
                    this.updatedevicepushid();
                });


                /*storage.getItem("isNotFirstLaunch", (ret) => {
                    if (ret.data == 'undefined') {
                        storage.setItem("isNotFirstLaunch", "true", () => {});
                        //删除手势密码
                        LightJSBridge.call("validate.verifyOpeation", {"verifyType":"GL", "GLOpeationType": "clear"}, (result) => {});
                    }

                    API.get("account/account/resettingExpire", "", function() {});
                    this.preVerifyOpeation();//检查手势密码,为第一次打开 app 准备
                    weex.requireModule("globalEvent").addEventListener('AppWillEnterForeground',() => {//app 唤醒
                        this.preVerifyOpeation();//注册手势密码,为后台唤醒准备
                    });
                });*/
            },
            preVerifyOpeation(){
                LightJSBridge.call("validate.preVerifyOpeation", {"verifyType": "GL"}, (result) => {//检查手势密码
                    if (result.data.result == "true") {//存在手势密码
                        var params={
                            "verifyType":"GL",
                            "otherTitle":"忘记手势密码",
                            "GLOpeationType": "verify"
                        };
                        LightJSBridge.call("validate.verifyOpeation", params, (result) => {//验证手势密码
                            if (result.data.result == "success") {//验证成功,关闭手势密码遮罩

                            }else{//验证失败或者点击忘记密码,删除手势密码,跳转到登录页面
                                LightJSBridge.call("validate.verifyOpeation", {
                                    "verifyType":"GL",
                                    "GLOpeationType": "clear"
                                }, (result) => {
                                    var pageRefresh = {isfundListRefresh: true,isHomeRefresh: true,isDiscoverRefresh: true};//用户刷新主页
                                    storage.setItem("pageRefresh",JSON.stringify(pageRefresh));
                                    LightSDK.native.userlogout(() => {});//刷新我的页面
                                    Light.navigate("login/login-app", {}, {replace: false, headHidden: true});
                                });

                            }

                        });
                    }
                });
            },
            updatedevicepushid(){
                var param = API.formGenerate();
                LightSDK.native.pushGetRegistrationID({}, function (jsonResult) {
                    param.add("pushid", encodeURIComponent(jsonResult.data.registrationID));
                    API.get("common/msgpush/updatedevicepushid", param.generate(), function () {
                    });
                });
            },
            homeRefresh(){
                storage.getItem("pageRefresh", (e) => {
                    if (e.data != "undefined") {
                        var pageRefresh = JSON.parse(e.data);
                        if(pageRefresh.isHomeRefresh){
                            pageRefresh.isHomeRefresh = false;
                            storage.setItem("pageRefresh",JSON.stringify(pageRefresh));
                            this.getRiskFund();
                        }
                    }
                });
                storage.getItem("lastDate", (e) => {
                    if (e.data != "undefined") {
                        var newDate = new Date().getDay();
                        if(parseInt(newDate) != parseInt(e.data)){
                            this.getRiskFund();
                        }
                    }
                    storage.setItem("lastDate", new Date().getDay() + "");// 设置最后一次打开时间
                });
            },
            version() {
                if (!this.isVersionOld) {
                    return;
                }
                LightSDK.native.getVersion({}, (versionData) => {
                    var appVersion = versionData.data.version;
                    var form = API.formGenerate();
                    if (Utils.env.isAndroid()) {
                        form.add("platform", "android")
                    } else {
                        form.add("platform", "iphone")
                    }
                    API.get("system/common/lastVersion", form.generate(), (jsonResult) => {
                        if (jsonResult && jsonResult.successful) {
                            if (parseFloat(jsonResult.versionResult.version) > parseFloat(appVersion)) {
                                this.updateMessage = jsonResult.versionResult.updateMessage;
                                this.updateApkUrl = jsonResult.versionResult.updateApkUrl;
                                if(jsonResult.versionResult.isForceUpdateAPP == "0"){//不强制更新
                                    this.confirmMsg();
                                }else{
                                    this.alertMsg();
                                }
                            } else {
                                this.isVersionOld = false;
                            }
                        }
                    })
                });
            },
            alertMsg(){
                var modal = Light.requireModule('modal');
                modal.alert({
                    message: this.updateMessage,
                    duration: 0.3,
                    okTitle: "立即更新"
                }, (value) => {
                    var params={
                        url: this.updateApkUrl
                    };
                    LightSDK.native.openURL(params,function () {});
                });
            },
            confirmMsg(){
                let platform = lg.config.env.platform;
                var okTitle = "稍后再说";
                var cancelTitle = "立即更新";
                if(platform == "android"){
                    okTitle = "立即更新";
                    cancelTitle = "稍后再说";
                }
                var modal = Light.requireModule('modal');
                modal.confirm({
                    message: this.updateMessage,
                    duration: 0.3,
                    okTitle: okTitle,
                    cancelTitle: cancelTitle
                }, (value) => {
                    if(value == "立即更新"){
                        var params={
                            url: this.updateApkUrl
                        };
                        LightSDK.native.openURL(params,function () {});
                    }
                });

            },
          systemState () {
            var that = this
            API.systemState(function (param) {
              if (param.openFund) {
                that.openFund = param.openFund
                    }
            })

            },
        },
        watch: {},
        mounted() {

            // SafeOperation.firstPreVerify();
            // SafeOperation.updateToken();
            // SafeOperation.loginPreVerify();
            this.getRiskFund();

            if(!API.matchNative()){
                this.isLoginState();
                this.systemState();
                // this.getHomePagePopAds();
            }else{
                // Light.requireModule("globalEvent").addEventListener('AppWillEnterForeground',() => {//app 唤醒
                //     this.version();
                // });
                this.version();
                // this.appInit();
            }
            if (API.matchNative()) {
                this.paddingTop = true;
                if (Utils.env.isIPhoneX()) {
                    this.isIPhoneX = true;
                    this.scrollerHeight = Utils.env.getPageHeight() + 20;
                    return;
                }else{
                    // if (Utils.env.isAndroid()) {
                    //     var dom = Light.requireModule('dom')
                    //     dom.getComponentRect('viewport', (ret) => {
                    //         this.scrollerHeight = ret.size.height;
                    //     })
                    //     return;
                    // }
                }
                storage.getItem("loginInfo", (e) => {//判断是否登录,处理杀进程的问题
                    if (!e.data || e.data == "undefined") {
                        API.get("account/login/logout", "", (jsonResult) => {
                            API.removeAllItem();
                        });
                    }
                });
            }
            this.scrollerHeight = Utils.env.getPageHeight() + 40;
        },
        created: function () {
            var that = this;
            // LightSDK.native.getStatusBarHeight ({}, (res)=>{
            //     //  modal.alert({
            //     //     message: JSON.stringify( __base__.config),
            //     //     duration: 0.3,
            //     //     okTitle: "OK"
            //     // }, function() {
            //     // })
            //     var dpr = 2;
            //     // if(process.env.RUNTIME === 'miniapp') {
            //     //     dpr = __base__.config.env.dpr;
            //     // } else {
            //     //     dpr = this.$page.config.env.dpr || this.$page.config.env.scale;
            //     // }
                
            //     // that.statusBarHeight = res.data.height * dpr;
            //     // this.styleObject.paddingTop = this.statusBarHeight+'px';
            //     // console.log(this.$page)
               
            // });
            // if(API.matchNative()) {
            //     broadcast.receive("loginsuccess", (c) => {
            //         if (c == true) {
            //             that.loginState = true;
            //         }
            //     });
            // }
            Light.on('viewappear',() => {
                this.isLoginState();
                this.homeRefresh();
                this.systemState();
                // this.getHomePagePopAds();
            });

        },
        afterShow(data){
            //页面初始化得到传入的值
            if (data.channel) {
                this.channel = data.channel;
                this.preview = data.preview == null ? false : true;
            }else{
                this.channel = API.getChannelName();
            }
        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .refresh{
        justify-content: center;
        align-items: center;
        width: 750px;
    }
    .refresh-text{
        text-align: center;
        font-size: 24px;
        height: 60px;
        color:#949494;
        margin-top:10px;
        margin-bottom:10px;
    }
    .baseLine {
        width: 700px;
        height: 30px;
    }

    .lineColumn {
        position: absolute;
        right: 374px;
        top: 0;
        bottom: 0;
        content: " ";
        width: 1px;
        height: 350px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #e8e8e8;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
    }

    .sepcial-line {
        width: 70px;
        height: 5px;
        background-color: #fff;
    }

    .sepcial-img {
        width: 117px;
        height: 80px;
        position: absolute;
        top: 0;
        right: 0;
    }

    .py_header {
        position: fixed;
        width: 750px;
        top: 0;
        right: 0;
        z-index: 99;
    }

    .h168 {
        height: 168px;
    }

    .h120 {
        height: 120px;
    }

    .scan-icon {
        width: 50px;
        height: 50px;
        margin-left: 10px;
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

    .search-wrap {
        width: 580px;
        background-color: rgba(255, 255, 255, 0.5);
        height: 55px;
        border-radius: 30px;
    }

    .search-img {
        width: 30px;
        height: 30px;
    }

    .search-text {
        font-size: 28px;
        color: #fff;
    }

    /* dialog3 */
    .icon-fail {
        width: 110px;
        height: 110px;
    }

    .dialog-btn {
        height: 90px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-top-width: 1px;
        border-top-color: #e8e8e8;
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
    .mask{
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
        background-color: rgba(103,103,103,0.5)
    }
    .tan_img{
        width:614px;
        height: 720px;
    }
    .tan_close_img{
        width:90px;
        height: 90px;
        margin-top: 50px;
    }
</style>

