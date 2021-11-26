<template>
    <div style="background-color:#f1f0f6;">
      <!--搜索框 -->
        <div v-if="isAndroid" style="width:750px; height:40px; background-color:#000; position:fixed; top:0px;"></div>
        <div class="search-box justify-around align-center"
                :style="{height : isIOS ? (isIPhoneX ?  '168px' : '120px') : '80px', top : isAndroid ? '40px' : '0px'}"
                :class="[isIOS ? (isIPhoneX ? 'pt88' : 'pt40') : '']">
            <div class="search-wrap flex-row align-center"> <!-- @click="jump('search', '搜索')"-->
                <image src="images/search.png" class="search-img ml20"></image>
                <text class="search-text ml10">搜索基金名称或代码</text>
            </div>
        </div>
        <scroller :style="{height: scrollerHeight + 'px'}">
            <refresh v-if="isApp" class="refresh" :display="refreshing" @refresh="onrefresh" @pullingdown="onpullingdown">
                <loading-indicator style="height: 60px; width: 60px;"></loading-indicator>
            <!-- <text class="refresh-text" :value="refreshText"></text>-->
            </refresh>
            <div :style="{marginTop: isIPhoneX ? '168px' : '120px'}">
                <image style="width:750px;height:290px;" src="images/ding-banner.png"></image>
            </div>
            <!-- <lc-slider style="position: relative"  :items="imageList" :auto-play="true" width="750" height="290" :interval="5000">
                    </lc-slider> -->
            <div v-for="(item, index) in pageData" :key="index">
                <!-- banner -->
                <!-- <div :style="{marginTop: isIPhoneX ? '168px' : '120px'}" v-if="item.type == 'banner'"> -->
                    <!-- <lc-lightbox autoPlay="true" infinite="true"
                                interval="5000"
                                type="custom"
                                :indicatorColor="indicatorColor"
                                showIndicator="true"
                                :image-list="imageList"
                                height="390">
                        <div class="subscripe-box flex-column" v-for="(item,index) in imageList" @click="lcImgClick(item)">
                            <div class="subscripe-head flex-row align-center flex-1">
                            </div>
                            <image :src="item.src" class="bannerImg"></image>
                        </div>
                    </lc-lightbox> -->
                    <!-- <lc-slider  :items="imageList" :auto-play="true" height="290" :interval="5000">
                    </lc-slider> -->
                <!-- </div> -->

                <!-- 定投精选 -->
                <fixed :recommendList="item.data" v-if="item.type == 'themeRecommMatrix'"></fixed> <!-- @onclick="fixedClick"-->

                <!-- 精选主题 -->
                <hot :hotList="item.data" :hotIcon="hotIcon" :hotName="hotName"
                    v-if="item.type == 'themeRecommMatrix2'&&hotName=='精选主题'"></hot> <!-- @onclick="navClick"-->

                <!-- 特色理财 -->
                <special :specialist="item.data" v-if="item.type == 'shortcuts'"></special> <!-- @onclick="specialClick"-->

                <!-- 热销排行 -->
                <hot :hotList="item.data" :hotIcon="hotIcon" :hotName="hotNameTwo" typeName="recommProds" ref="recommProds" v-if="item.type == 'recommProds'"></hot> <!-- @onclick="navClick($event, 'recommProds')"-->

            </div>

            <!-- 撑开高度 -->
            <div class="split"></div>
            <div class="split"></div>

            <!-- <loadingUI :loadShow="loadShow"></loadingUI> -->
            <!-- 底部 -->
            <!-- <bottombar :activeIndex="1"></bottombar> -->
        </scroller>
    </div>
</template>

<script>
    import LcLightbox from "lighting-ui/packages/lc-lightbox";
    import Title from "lighting-ui/packages/_mods/title.vue";
    import Category from "lighting-ui/packages/_mods/category.vue";
    import LcSearchbar from "lighting-ui/packages/lc-searchbar";
    import btn from "../../components/ui/btn";
    import bottombar from "../../components/ui/bottombar";
    import Light from "light";
    import API from '../../api/api.js';
    import Utils from "../../res/utils";
    import fixed from "../../components/ui/fixed";
    import hot from "../../components/ui/hot";
    import special from "../../components/ui/special";
    import config from "../../config";
    import loadingUI from "../../components/ui/loadingUI";
    import discoverData from "../../static/discover";
    import LcSlider from "../../components/ui/lb-mini";

    var stream = Light.requireModule('stream');
    var storage = Light.requireModule("storage"); //缓存
    export default {
        components: {Title, Category, LcLightbox, LcSearchbar, btn, bottombar, API, fixed, hot, special, loadingUI,LcSlider},
        data: function () {
            return {
                indicatorColor: {
                    'item-color': '#808080',
                    'item-selected-color': '#f0384f',
                    'item-size': '14px',
                    'bottom': '20px'
                },
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
                pageData: discoverData.page,
                scrollerHeight: 0,
                loadShow: true, //遮罩层必须参数
                refreshing:'hide',
                refreshText:'',
                refreshFlag:false,
                lastUpdateDate:new Date().getTime(),
                channel:"",
                preview:false,
                loginState:true,
                isRefreshStop: true,
                openFund:true,
                isApp:API.matchNative()
            };
        },
        methods: {
            onrefresh() {
                if(!this.isRefreshStop){
                    var self = this;
                    this.loadShow = true;
                    storage.removeItem("discover");
                    this.getRiskFund();
                    this.refreshing = 'show';
                    setTimeout(() => {
                        self.refreshing = 'hide';
                        this.isRefreshStop = true;
                    }, 500);
                }
            },
            onpullingdown(event){
                if(this.isRefreshStop && event.pullingDistance > 80) {
                    this.isRefreshStop = false;
                }
            },
            initPage(res, jsonResult) {
                this.imageList = [];
                this.pageData = [];
                var that = this;
                var data = res;
                data.page.forEach((item) => {
                    if (item.type == 'banner') {
                        item.data.forEach((itemBanner) => {
                            itemBanner.src = itemBanner.mobileImgFilename;
                            // that.imageList.push(itemBanner)
                        })
                    }
                    if (item.type != 'viceBanner' && item.type != 'shortcuts' && jsonResult.productList != null
                        && jsonResult.productList.length > 0) {
                        //推荐过滤风险不匹配的基金
                        var fundList = [];
                        item.data.forEach((i) => {
                            if (i.fundinfo) {
                                jsonResult.productList.forEach((items) => {
                                    if (items.fundcode == i.fundinfo.fundcode) {
                                        fundList.push(i);
                                    }
                                });
                            }
                        });
                        item.data = fundList;
                    }
                });
                that.pageData = data.page;
                that.loadShow = false;
                this.refreshing = 'hide';
            },
            ajaxList: function (jsonResult) {
                var that = this;
                var timestamp = (new Date()).valueOf();
               /* storage.getItem("discover", function (e) {
                    if (e.data != "undefined") {
                        that.initPage(e.data, jsonResult);
                    }*/
                    var url = config.homeAndDiscoverUrl + that.channel;
                    if(that.preview){//是否是预览查看
                        url = url + "_discover_preview.json?_" + timestamp;
                    }else{
                        url = url +"_discover.json?_" + timestamp;
                    }
                    // stream.fetch({
                    //     method: 'GET',
                    //     url: url//"static/discover.json"
                    // }, function (res) {
                    //     if(!that.preview) {//中台预览不需要缓存
                    //         storage.setItem("discover", JSON.stringify(JSON.parse(res.data)));
                    //     }
                    //     that.initPage(res.data, jsonResult);
                    // });
                    // Light.ajax({
                    //     type: 'GET',
                    //     url: url,//"static/discover.json"
                    //     success: function (res) {
                    //         if(!that.preview) {//中台预览不需要缓存
                    //             storage.setItem("discover", JSON.stringify(res));
                    //         }
                    //         that.initPage(res, jsonResult);
                    //     }
                    // });

                    // 本地数据mock
                    Light.ajax({
                        url: "mock/discoverList.json",
                        type: 'get',
                        dataType: 'json',
                        headers: {},
                        success: function (res) {
                            if(!that.preview) {//中台预览不需要缓存
                                storage.setItem("discover", JSON.stringify(res));
                            }
                            that.initPage(res, jsonResult);
                        }
                    });

               /* });*/
            },
            navClick(e) {
                if (e.link == "" || e.link == "#") {
                    return;
                }
                var fundinfo=e.fundinfo;
                var attributes = {"c_maintitle":e.title,"c_subtitle":e.subTitle,
                    "c_prodcode":fundinfo.fundcode,"c_prodname":fundinfo.fundname,
                    "c_accesslink":e.link,"c_theme":"homePageFund"};
                API.analytics(attributes,e,"discoverItemClick");


                if (e.linkType == "1") {//跳转产品详情
                    this.jump("fund", "", {fundcode: e.link});
                } else if (e.linkType == "3") {//跳转外链
                    this.jump(e.link, "", "");
                };
                if (typeName="recommProds"){
                   var  fundinfo=e.fundinfo;
                   var attributes = {"c_maintitle":e.title,"c_subtitle":e.subTitle,
                       "c_prodcode":fundinfo.fundcode,"c_prodname":fundinfo.fundname,
                       "c_accesslink":e.link,"c_theme":"homePageFund"};
                   API.analytics(attributes,e,"recommProds");
               }
            },
            fixedClick(e) {
                if (e.link == "" || e.link == "#") {
                    return;
                }
                if (e.linkType == "1") {//跳转产品详情

                  if(this.openFund){
                    this.jump('dingtou/add-fun', "", { fundcode: e.link });
                  }else{
                    this.jump('trade/fixed-investment', "", {fundcode: e.link});
                  }

                } else if (e.linkType == "3") {//跳转外链
                    this.jump(e.link, "", "");
                }
            },
            specialClick(e) {
                if (e.linkType == "1") {//跳转产品详情
                    if (e.link == config.xjb.code) {//跳转现金宝
                        this.jump("trade/xjb-recharge", "", "");
                    } else {//跳转心愿
                        this.jump("wishBoxTwo/my-wish", "", "");
                    }
                } else if (e.linkType == "3") {//跳转外链
                    this.jump(e.link, "", "");
                }
            },
            xjbClick(e) {
                if (e.linkType == "1") {//跳转产品详情
                    this.jump("trade/xjb-recharge", "", {fundcode: e.link});
                }
            },
            lcImgClick(item) {

                // var item = this.imageList[e.index];
                var attributes = {"c_maintitle":item.name,"c_subtitle":"","c_prodcode":"","c_prodname":"",
                    "c_accesslink":item.mobileLink,"c_theme":"homePageFund"};
                API.analytics(attributes,item,"discoverlcImg");

                if (item.mobileLinkType == "1") {//跳转产品详情
                    this.jump("fund", "", {fundcode: item.mobileLink});
                } else if (item.mobileLinkType == "3") {//跳转外链
                    API.openWebPage(item.mobileLink);
                }
            },
            jump(url, title, data) {
                var params = {};
                params.replace = false;
                params.title = title;
                // if(url == "wishBoxTwo/my-wish" && !this.loginState){//未登录
                //     Light.navigate('login/login-app', {}, {headHidden: true});
                //     return;
                // }else 
                // if(url == "trade/fixed-investment"){
                //     if(!this.loginState){//未登录
                //         Light.navigate('login/login-app', {}, {headHidden: true});
                //         return;
                //     }else{//已登录设置定投计划头部
                //         params.navigationBarShow = false;
                //     }
                // } 
                // else if (url == 'dingtou/add-fun') {
                //   if (!this.loginState) {//未登录
                //     Light.navigate('login/login-app', {}, { headHidden: true })
                //     return
                //   } else {//已登录设置定投计划头部
                //     params.replace=false;
                //       params.headHidden=true;
                //   }
                // }
                // else if(url == "trade/xjb-recharge" && !this.loginState){//未登录
                //     Light.navigate('login/login-app', {}, {headHidden: true});
                //     return;
                // }else{
                //     params.headHidden = true;
                // }
                API.route.hsOpen(url, data, params);
            },
            getRiskFund(){
                // var param = API.formGenerate().add("sysType", "PB").add("riskmatch", "true").generate();

            
                // API.get("product/product/productInfoList", param, (jsonResult) => {
                //     console.log(jsonResult)
                //     this.ajaxList(jsonResult);
                // });

                var that = this;
                Light.ajax({
                    url: "mock/productInfoList.json",
                    type: 'get',
                    dataType: 'json',
                    headers: {},
                    success: function (res) {
                        that.ajaxList(res);
                    }
                });
            },
            isLoginState(){
                storage.getItem("custtype", (e) => {
                    if (e.data != "undefined") {
                        this.loginState = true;
                    }else{
                        // API.get("account/account/queryCustType", "", (jsonResult) => {
                        //     if (jsonResult.successful) {
                        //         this.loginState = true;
                        //     }else{
                        //         this.loginState = false;
                        //     }
                        // });

                    }
                })
            },
            discoverRefresh(){
                storage.getItem("pageRefresh", (e) => {
                    if (e.data != "undefined") {
                        var pageRefresh = JSON.parse(e.data);
                        if(pageRefresh.isDiscoverRefresh){
                            pageRefresh.isDiscoverRefresh = false;
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
          systemState () {
            var that = this
            API.systemState(function (param) {
              if (param.openFund) {
                that.openFund = param.openFund
              }
            })

          },
        },
        mounted() {
            this.getRiskFund();
            
            if(!API.matchNative()){
                this.isLoginState();
                this.systemState()
            }
            if (Utils.env.isIOS()) {
                this.isIOS = true;
                if (Utils.env.isIPhoneX()) {
                    this.isIPhoneX = true;
                }
            }
            // if (Utils.env.isAndroid()) {
            //     this.isAndroid = true;
            //     var dom = Light.requireModule('dom')
            //     dom.getComponentRect('viewport', (ret) => {
            //         this.scrollerHeight = ret.size.height;
            //     })
            //     return;
            // }
            this.scrollerHeight = Utils.env.getPageHeight() + 40;
        },
        created: function () {
            Light.on('viewappear',() => {
                this.isLoginState();
                this.discoverRefresh();
                this.systemState()
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
    .subscripe-head {
       position: relative;
        height:40px;
        width: 690px;
    }

    .hot-line {
        position: relative;
    }

    .subscripe-box {
        background-color: #fff;
        padding-left: 30px;
        padding-right: 30px;
        padding-bottom: 55px;
        padding-top: 20px;
        position: relative;
    }

    .subscripe {
        border-width: 1px;
        border-style: solid;
        border-color: #f0384f;
        padding-top: 2px;
        padding-right: 6px;
        padding-bottom: 2px;
        padding-left: 6px;
        position:absolute;
        right:0;
        top:20px;
    }

    .search {
        padding-top: 15px;
        padding-bottom: 30px;
        background-color: #fff;
    }

    .search-bar-input {
        height: 55px;
        border-radius: 30px;
        font-size: 24px;
    }

    .d-btn {
        margin-top: 35px;
        margin-left: 60px;
        margin-right: 60px;
        height: 62px;
    }

    .lineColumn {
        position: absolute;
        right: 374px;
        top: 0;
        bottom: 0;
        content: " ";
        width: 1px;
        height: 355px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #e8e8e8;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
    }

    .search-box {
        width: 750px;
        left: 0;
        position: fixed;
        background-color: #fff;
        z-index: 99;
    }

    .item-container {
        width: 750px;
    }

    .search-wrap {
        width: 690px;
        background-color: #eee;
        height: 55px;
        border-radius: 30px;
    }

    .search-img {
        width: 30px;
        height: 30px;
    }

    .search-text {
        font-size: 24px;
        color: #808080;
    }

    .line-jx {
        position: absolute;
        bottom: 0;
        left: 40px;
        right: 40px;
        content: " ";
        width: auto;
        height: 1px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e8e8e8;
        transform: scaleY(0.5);

    }

    .lineColumn-jx {
        position: absolute;
        left: 280px;
        top: 35px;
        bottom: 35px;
        height: 90px;
        content: " ";
        width: 1px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #e8e8e8;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
    }

    .bannerImg {
        height: 270px;
        width: 690px;
    }

    .indicator {
        position: absolute;
        item-color: #fff;
        item-selected-color: #f0384f;
        item-size: 14px;
        width: 690px;
        height: 20px;
        bottom: 30px;
    }
</style>
