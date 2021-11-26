<template>
    <div style="background-color:#f0eff4;">
        <div v-if="isAndroid" style="width:750px; height:40px; background-color:#000; position:fixed; top:0px;"></div>
            <div class="search-box flex-row align-center justify-around" :style="{height : isIOS ? (isIPhoneX ?  '168px' : '120px') : '80px', top : isAndroid ? '40px' : '0px'}" :class="[isIOS ? (isIPhoneX ? 'pt88' : 'pt40') : '']">
                <div class="search-wrap flex-row align-center">
                    <image class="search-img ml20" src="images/search.png"></image>
                    <text class="search-text ml20">搜索基金名称或代码</text>
                </div>
                <div class="flex-row align-center">
                    <image class="title-img" src="images/heart.png"></image>
                    <text class="search-text ml10">自选</text>
                </div>
            </div>
       
            <div class="wrap" :style="{top : isIPhoneX ? '168px' : '120px'}">
                <lc-tab-page v-if="!isMiniapp"
                    ref="lc-tab-page"
                    :tab-titles="tabTitles"
                    :tab-styles="tabStyles"
                    title-type="text"
                    :needSlider="needSlider"
                    :is-tab-view="isTabView"
                    :tab-page-height="tabPageHeight"
                    @LcTabPageCurrentTabSelected="LcTabPageCurrentTabSelected">
                    <scroller v-for="(v,index) in demoList" :key="index" class="item-container" :style="{ height: contentHeight }" :loadmoreoffset="40" @loadmore="handleScroll">
                        <div class="list">
                            <div class="change-data justify-between flex-row align-center" v-if="v.fundlist.length > 0">
                                <text class="change-text flex-1">基金名称</text>
                                <text class="change-text t-right w150">最新净值</text>
                                <div class="justify-end flex-row align-center w150"  @click="toggleDate()">
                                    <text class="change-text">{{tableContent}}</text>
                                    <image class="arrow-more" src='images/more.png'></image>
                                </div>
                            </div>
                            <div class="cell-fundlist" v-for="(item,i) in v.fundlist" :key="i" @click="toFundDetail(item)">
                                <div class="justify-between flex-row title-wrap align-center">
                                    <div class="flex-1 flex-column justify-center">
                                        <div class="flex-row align-center">
                                            <text class="title-text-1" style="flex: 1">{{item.shortname ? item.shortname : item.fundname}}</text>
                                            <div :class="specialClass(item)" v-if="special(item)">
                                                <text class="fund-grey-word">{{item | fundstatestr}}</text>
                                            </div>
                                        </div>
                                        <text class="title-text-2">{{item.fundcode}}</text>
                                    </div>
                                    <div class="flex-column align-end w150">
                                        <text class="cont-text-1" v-if="item.fundtype == '2' && item.navdate">{{item.hfincomeratio}}</text>
                                        <text class="cont-text-1" v-else-if="item.fundtype != '2' && item.navdate">{{item.pernetvalue}}</text>
                                        <text class="cont-text-1" v-else>--</text>
                                        <text class="cont-text-2" v-if="item.navdate">{{item.navdate | formatDate}}</text>
                                    </div>

                                    <div class="flex-row align-center cont-wrap w150">
                                        <text :class="returnClass(item.incomeratio)" v-if="item.fundtype == '2' && item.navdate">{{item | formatHfincomeratio}}</text>
                                        <text :class="returnClass(item.dayinc)" v-else-if="item.fundtype != '2' && tableIndex == '--' && item.navdate">{{item.dayinc}}</text>
                                        <text :class="returnClass(item.dayinc)" v-else-if="item.fundtype != '2' && tableIndex == '1' && item.navdate">{{item.dayinc}}</text>
                                        <text :class="returnClass(item.weekinc)" v-else-if="item.fundtype != '2' && tableIndex == '2' && item.navdate">{{item.weekinc}}</text>
                                        <text :class="returnClass(item.monthinc)" v-else-if="item.fundtype != '2' && tableIndex == '3' && item.navdate">{{item.monthinc}}</text>
                                        <text :class="returnClass(item.seasonhinc)" v-else-if="item.fundtype != '2' && tableIndex == '4' && item.navdate">{{item.seasonhinc}}</text>
                                        <text :class="returnClass(item.halfyearhinc)" v-else-if="item.fundtype != '2' && tableIndex == '5' && item.navdate">{{item.halfyearhinc}}</text>
                                        <text :class="returnClass(item.yearinc)" v-else-if="item.fundtype != '2' && tableIndex == '6' && item.navdate">{{item.yearinc}}</text>
                                        <text :class="returnClass(item.threeyearinc)" v-else-if="item.fundtype != '2' && tableIndex == '7' && item.navdate">{{item.threeyearinc}}</text>
                                        <text :class="returnClass(item.thisyearinc)" v-else-if="item.fundtype != '2' && tableIndex == '8' && item.navdate">{{item.thisyearinc}}</text>
                                        <text :class="returnClass(item.setupinc)" v-else-if="item.fundtype != '2' && tableIndex == '9' && item.navdate">{{item.setupinc}}</text>
                                        <text class="cont-text-5" v-else>--</text>
                                    </div>

                                    <div @click="changeHeart(item, i, index, $event)">
                                        <image v-if="item.heart" class="title-img" src="images/heart-1.png"></image>
                                        <image v-if="!item.heart" class="title-img" src="images/heart.png"></image>
                                    </div>
                                    
                                
                                </div>
                            </div>
                            <div class="change-data justify-between flex-row align-center" v-if="v.otherlist.length > 0">
                                <text class="change-text flex-1">基金名称</text>
                                <text class="change-text t-right w150">万份收益</text>
                                <div class="justify-end flex-row align-center w150">
                                    <text class="change-text mr10">七日年化</text>
                                </div>
                            </div>
                            <div class="cell-fundlist" v-for="(item,i) in v.otherlist" :key="'other'+i"  @click="toFundDetail(item)">
                                <div class="justify-between flex-row title-wrap align-center">
                                    <div class="flex-1 flex-column justify-center">
                                        <div class="flex-row align-center">
                                            <text class="title-text-1" style="flex: 1">{{item.shortname ? item.shortname : item.fundname}}</text>
                                            <div :class="specialClass(item)" v-if="special(item)">
                                                <text class="fund-grey-word">{{item | fundstatestr}}</text>
                                            </div>
                                        </div>
                                        <text class="title-text-2">{{item.fundcode}}</text>
                                    </div>

                                    <div class="flex-column align-end w150">
                                        <text class="cont-text-1" >{{item.hfincomeratio}}</text>
                                        <text class="cont-text-2">{{item.navdate | formatDate}}</text>
                                    </div>
                                    <div class="flex-row align-center cont-wrap w150">
                                        <text :class="returnClass(item.incomeratio)">{{item | formatHfincomeratio}}</text>
                                    </div>
                                    <div @click="changeHeart(item,i,index,$event)">
                                        <image class="title-img" src="images/heart.png" v-if="!item.heart"></image>
                                        <image class="title-img" src="images/heart-1.png" v-if="item.heart"></image>
                                    </div>       
                            </div>
                            </div>
                        </div>
                    </scroller>
                </lc-tab-page>
                <lc-tab-page v-if="isMiniapp"
                    ref="lc-tab-page-miniapp"
                    :tab-titles="tabTitles"
                    :tab-styles="tabStyles"
                    title-type="text"
                    :needSlider="needSlider"
                    :is-tab-view="isTabView"
                    :tab-page-height="tabPageHeight"
                    @LcTabPageCurrentTabSelected="LcTabPageCurrentTabSelected">
                    <scroller v-for="(v,index) in demoList" :key="index" class="item-container" :style="{ height: contentHeight }">
                        <div class="list">
                            <div class="change-data justify-between flex-row align-center" v-if="v.fundlist.length > 0">
                                <text class="change-text flex-1">基金名称</text>
                                <text class="change-text t-right w150">最新净值</text>
                                <div class="justify-end flex-row align-center w150"  @click="toggleDate()">
                                    <text class="change-text">{{tableContent}}</text>
                                    <image class="arrow-more" src='images/more.png'></image>
                                </div>
                            </div>
                            <div class="cell-fundlist" v-for="(item,i) in v.fundlist" :key="i" @click="toFundDetail(item)">
                                <div class="justify-between flex-row title-wrap align-center">
                                    <div class="flex-1 flex-column justify-center">
                                        <div class="flex-row align-center">
                                            <text class="title-text-1" style="flex: 1">{{item.shortname ? item.shortname : item.fundname}}</text>
                                            <div :class="specialClass(item)" v-if="special(item)">
                                                <text class="fund-grey-word">{{item | fundstatestr}}</text>
                                            </div>
                                        </div>
                                        <text class="title-text-2">{{item.fundcode}}</text>
                                    </div>
                                    <div class="flex-column align-end w150">
                                        <text class="cont-text-1" v-if="item.fundtype == '2' && item.navdate">{{item.hfincomeratio}}</text>
                                        <text class="cont-text-1" v-else-if="item.fundtype != '2' && item.navdate">{{item.pernetvalue}}</text>
                                        <text class="cont-text-1" v-else>--</text>
                                        <text class="cont-text-2" v-if="item.navdate">{{item.navdate | formatDate}}</text>
                                    </div>

                                    <div class="flex-row align-center cont-wrap w150">
                                        <text :class="returnClass(item.incomeratio)" v-if="item.fundtype == '2' && item.navdate">{{item | formatHfincomeratio}}</text>
                                        <text :class="returnClass(item.dayinc)" v-else-if="item.fundtype != '2' && tableIndex == '--' && item.navdate">{{item.dayinc}}</text>
                                        <text :class="returnClass(item.dayinc)" v-else-if="item.fundtype != '2' && tableIndex == '1' && item.navdate">{{item.dayinc}}</text>
                                        <text :class="returnClass(item.weekinc)" v-else-if="item.fundtype != '2' && tableIndex == '2' && item.navdate">{{item.weekinc}}</text>
                                        <text :class="returnClass(item.monthinc)" v-else-if="item.fundtype != '2' && tableIndex == '3' && item.navdate">{{item.monthinc}}</text>
                                        <text :class="returnClass(item.seasonhinc)" v-else-if="item.fundtype != '2' && tableIndex == '4' && item.navdate">{{item.seasonhinc}}</text>
                                        <text :class="returnClass(item.halfyearhinc)" v-else-if="item.fundtype != '2' && tableIndex == '5' && item.navdate">{{item.halfyearhinc}}</text>
                                        <text :class="returnClass(item.yearinc)" v-else-if="item.fundtype != '2' && tableIndex == '6' && item.navdate">{{item.yearinc}}</text>
                                        <text :class="returnClass(item.threeyearinc)" v-else-if="item.fundtype != '2' && tableIndex == '7' && item.navdate">{{item.threeyearinc}}</text>
                                        <text :class="returnClass(item.thisyearinc)" v-else-if="item.fundtype != '2' && tableIndex == '8' && item.navdate">{{item.thisyearinc}}</text>
                                        <text :class="returnClass(item.setupinc)" v-else-if="item.fundtype != '2' && tableIndex == '9' && item.navdate">{{item.setupinc}}</text>
                                        <text class="cont-text-5" v-else>--</text>
                                    </div>

                                    <div @click="changeHeart(item, i, index, $event)">
                                        <image v-if="item.heart" class="title-img" src="images/heart-1.png"></image>
                                        <image v-if="!item.heart" class="title-img" src="images/heart.png"></image>
                                    </div>
                                    
                                
                                </div>
                            </div>
                            <div class="change-data justify-between flex-row align-center" v-if="v.otherlist.length > 0">
                                <text class="change-text flex-1">基金名称</text>
                                <text class="change-text t-right w150">万份收益</text>
                                <div class="justify-end flex-row align-center w150">
                                    <text class="change-text mr10">七日年化</text>
                                </div>
                            </div>
                            <div class="cell-fundlist" v-for="(item,i) in v.otherlist" :key="'other'+i"  @click="toFundDetail(item)">
                                <div class="justify-between flex-row title-wrap align-center">
                                    <div class="flex-1 flex-column justify-center">
                                        <div class="flex-row align-center">
                                            <text class="title-text-1" style="flex: 1">{{item.shortname ? item.shortname : item.fundname}}</text>
                                            <div :class="specialClass(item)" v-if="special(item)">
                                                <text class="fund-grey-word">{{item | fundstatestr}}</text>
                                            </div>
                                        </div>
                                        <text class="title-text-2">{{item.fundcode}}</text>
                                    </div>

                                    <div class="flex-column align-end w150">
                                        <text class="cont-text-1" >{{item.hfincomeratio}}</text>
                                        <text class="cont-text-2">{{item.navdate | formatDate}}</text>
                                    </div>
                                    <div class="flex-row align-center cont-wrap w150">
                                        <text :class="returnClass(item.incomeratio)">{{item | formatHfincomeratio}}</text>
                                    </div>
                                    <div @click="changeHeart(item,i,index,$event)">
                                        <image class="title-img" src="images/heart.png" v-if="!item.heart"></image>
                                        <image class="title-img" src="images/heart-1.png" v-if="item.heart"></image>
                                    </div>       
                            </div>
                            </div>
                        </div>
                    </scroller>
                </lc-tab-page>
            </div>





            <div class="block-wrap" :style="{visibility:(showB&&newFund&&page==0)?'visible':'hidden'}" @click="showNewList">
                <image :style="{visibility:(showB&&newFund&&page==0)?'visible':'hidden'}" src="images/new-fund.png" class="block-img"></image>
            </div>
            <lc-tip @showTip="showTip" :show="show" type="text" :message="message"></lc-tip>
            <div class="mask" :style="{height: heightData +'px'}" v-if="showMask" @click="closeMsak()"></div>

            <div class="chose-wrap" v-if="showRadio">
                <lc-radio :list="radioList" :config="radioStyle" @LcRadioListChecked="LcRadioListChecked"></lc-radio>
            </div>
            <div class="block-box" v-if="showBlock">
                <image class="block-top" src="images/block-img.png"></image>
                <div slot="content" class="newFundBox">
                    <scroller style="background-color: #ffffff;">
                        <div class="flex-row block-item align-center" v-for="(item,index) in blockList" :key="index">
                            <div class="flex-1 flex-column align-left justify-center">
                                <text class="font-16 m-color-1">{{item.shortname ? item.shortname : item.fundname}}</text>
                                <div class="flex-row mt20">
                                    <text class="font-14 m-color-1 w250">{{item.fundcode}}</text>
                                    <text class="font-14 m-color-1">{{item.pernetvalue}}</text>
                                </div>
                            </div>
                            <div class="align-center justify-center buy-now">
                                <text class="font-16 m-color-3">立即购买</text>
                            </div>
                        </div>
                    </scroller>
                </div>
                <text class="block-close" @click="showNewList">X</text>

            </div>
        
            <!-- 底部 -->
            <!-- <bottombar :activeIndex="2"></bottombar> -->
    </div>
</template>
<script>
    import Light from 'light';
    import LcTabPage from 'lighting-ui/packages/lc-tab-page';
    import LcTip from 'lighting-ui/packages/lc-tip';
    import LcRadio from 'lighting-ui/packages/lc-radio';
    import bottombar from "../../components/ui/bottombar";
    import loadingUI from "../../components/ui/loadingUI";
    import API from '../../api/api.js';
    import Utils from "../../res/utils";
    import config from "../../config";
    var stream = Light.requireModule('stream');
    var modal = Light.requireModule('modal');



    var storage = Light.requireModule("storage"); //缓存
    export default {
        components: {LcTabPage, LcTip, LcRadio, bottombar, loadingUI},
        data() {
            return {
                isMiniapp: process.env.RUNTIME==='miniapp',
                isWeb: process.env.RUNTIME==='web',
                page: 0,
                showB:false,
                refreshing:'hide',
                refreshText:'',
                refreshFlag:false,
                lastUpdateDate:new Date().getTime(),
                loadShow: false, //遮罩层必须参数
                tabTitles: [{title:"全部"}],
                tabStyles: {
                    bgColor: '#FFFFFF',
                    titleColor: '#323232',
                    activeTitleColor: '#3580ee',
                    activeBgColor: '#FFFFFF',
                    isActiveTitleBold: false,
                    width: 150,
                    height: 80,
                    fontSize: 32,
                    hasActiveBottom: true,
                    activeBottomColor: '#3580ee',
                    activeBottomHeight: 6,
                    activeBottomWidth: 150,
                    textPaddingLeft: 10,
                    textPaddingRight: 10,
                },
                needSlider: true,
                isTabView: true,
                tabPageHeight: '',
                tabList: [],
                show: false,
                message: '',
                demoList: [{fundtype: "9999", fundlist: [], otherlist: []}],
                radioList: [
                    {title: '日涨跌幅', value: 1, checked: true},
                    {title: '近一周', value: 2},
                    {title: '近一个月', value: 3},
                    {title: '近三个月', value: 4},
                    {title: '近六个月', value: 5},
                    {title: '近一年', value: 6},
                    {title: '近三年', value: 7},
                    {title: '今年以来', value: 8},
                    {title: '成立以来', value: 9},
                ],
                radioStyle: {
                    checkedIcon: 'images/check.png',
                    checkedColor: '#3c94fe'
                },
                showMask: false,
                showDate: false,
                showRadio: false,
                isAndroid:false,
                isIOS:false,
                isIPhoneX: false,
                tableIndex: "--",
                tableContent: "日涨跌幅",
                showBlock:false,
                newFund:false,
                blockList: [],
                heightData:null,
                isRefreshStop: true,
                isApp:API.matchNative(),
                heart: false,
                asiamsg: 'ghhh',
                showNavbar: false
                
            }
        },
        computed: {
            contentHeight() {
                if(process.env.RUNTIME==='web') {
                    return  (this.tabPageHeight - this.tabStyles.height*2 - 120) + 'px'
                } else if(process.env.RUNTIME==='miniapp') {
                    if (__base__.config.env.platform=='iOS' && __base__.config.env.deviceHeight==812) {
                        return this.showNavbar ? (this.tabPageHeight - this.tabStyles.height*2 - 120) + 'px' : (this.tabPageHeight - this.tabStyles.height*2 - 150*2) + 'px'
                    }
                    return this.showNavbar ? (this.tabPageHeight - this.tabStyles.height*2-30) + 'px' : (this.tabPageHeight - this.tabStyles.height*2 - 180) + 'px'

                } else {
                    return (this.tabPageHeight - this.tabStyles.height*2) + 'px'
                }
                // return process.env.RUNTIME==='web' ? (this.tabPageHeight - this.tabStyles.height*2 - 120) + 'px' : (this.tabPageHeight - this.tabStyles.height*2 ) + 'px'
            }
        },
        filters: {
            formatDate: function (value) {
                return API.hsTools.mm_dd_other(value);
            },
            formatHfincomeratio: function (value) {
                if(value.fundtype != '2'){
                    return parseFloat(value.incomeratio).toFixed(3) + "%";
                }else{
                    if(value.middleextra && JSON.parse(value.middleextra).jzws){
                        var middleextra = JSON.parse(value.middleextra);
                        var incomeratio = value.incomeratio.split(".");
                        return (incomeratio[0] + "." + incomeratio[1].substring(0,middleextra.jzws)) + "%";
                    }else{
                        return value.incomeratio;
                    }
                }

            },
            fundstatestr:function (item) {
                if((item.fundstate == '0' || item.fundstate == '1' || item.fundstate == '2' || item.fundstate == '6' ) &&
                    (item.declarestate == '0' && item.subscribestate  == '0' && item.valuagrstate == '0') || item.source != "0"){
                    return "特定渠道";//直销不能购买
                } else if((item.fundstate != '0' && item.fundstate != '1' && item.fundstate != '2' && item.fundstate != '6' )){
                    return item.fundstatestr;
                }else{
                    return "";
                }
            }
        },
        methods: {
            handleScroll(e) {
                var copy = this.demoList[0].fundlist;
                if(copy&&copy.length>0) {
                    this.demoList[0].otherlist = this.demoList[0].otherlist.concat(copy);
                }
            },
            special: function (item) {//直销能购买,终端限制
                if((item.fundstate == '0' || item.fundstate == '1' || item.fundstate == '2' || item.fundstate == '6' ) &&
                    (item.declarestate == '0' && item.subscribestate  == '0' && item.valuagrstate == '0')){
                    return true;//直销不能购买
                } else if((item.fundstate != '0' && item.fundstate != '1' && item.fundstate != '2' && item.fundstate != '6' )){
                    return true;
                }else{
                    return false;
                }
            },
            specialClass(item){
                if((item.fundstate == '0' || item.fundstate == '1' || item.fundstate == '2' || item.fundstate == '6' ) &&
                    (item.declarestate == '0' && item.subscribestate  == '0' && item.valuagrstate == '0') || item.source != "0"){
                    return ['fund-orange','justify-center'];
                } else if((item.fundstate != '0' && item.fundstate != '1' && item.fundstate != '2' && item.fundstate != '6' )){
                    return ['fund-grey','justify-center'];
                }
            },
            showNewList(){
                this.showMask = !this.showMask;
                this.newFund = !this.newFund;
                this.showBlock = !this.showBlock;
                this.heightData = 1600
            },
            onrefresh() {
                if(!this.isRefreshStop){
                    storage.removeItem("fundList");
                    this.loadShow = true;
                    // this.loadData();
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
            returnClass(value) {
                if (parseFloat(value) > 0 || parseFloat(value) == 0) {
                    return ["cont-text-3"];
                } else if (value == "--"){
                    return ["cont-text-5"];
                } else {
                    return ["cont-text-4"];
                }

            },
            LcTabPageCurrentTabSelected(e) {
                this.page = e.page;
                this.showMask = false;
                this.showRadio = false;
            },
            changeHeart(item,subIndex,index,event) {
                return;
                item['heart'] = item.heart ? false : true;
                this.demoList[index].fundlist[subIndex]['heart'] = item.heart;
                this.message = item.heart ? '自选成功' : '取消自选成功';
                this.show = true;
                event.stopPropagation();
            },
            tapStar: function (item, starStatus) {
                var fundcode = item.fundcode;
                var data = API.formGenerate()
                    .add("status", starStatus)
                    .add("fundcode", fundcode)
                    .add("followtype", "1")
                    .generate();

                API.get("account/myfollows/followChange", data, (jsonResult) => {
                    this.show = true;

                    var attributes = {"c_risklevel":item.riskabilityStr,"c_prodtype":item.fundtypedisplaystr,"c_prodcode":item.fundcode,
                        "c_prodname":item.fundname,"c_theme":"favourFund"};

                    if(starStatus){
                        API.analytics(attributes,jsonResult,"followChangeTrue");
                    }else{
                        API.analytics(attributes,jsonResult,"followChangeFalse");
                    }

                    if (!jsonResult.successful) {
                        if(jsonResult.code == 'ETS-5BE0054'){
                            this.message = "要删除的自选基金不存在";
                        }else if(jsonResult.code == 'ETS-5BE0052'){
                            this.message = "无法添加自选基金";
                        }else{
                            this.message = "使用此功能需要登录";
                        }
                    }else{
                        item.heart = !item.heart;
                    }
                });

            },
            toggleDate() {
                this.showMask = !this.showMask;
                this.showRadio = !this.showRadio;
                this.heightData = 600
            },
            closeMsak() {
                this.showMask = false;
                this.showRadio = false;
                this.showBlock=false;
                this.newFund=true;

            },
            LcRadioListChecked(e) {
                var that = this;
                this.checkedInfo = e;
                this.tableContent = e.title;
                this.sortProduct(e.value);
                this.tableIndex = e.value;
                setTimeout(function () {
                    that.showMask = false;
                    that.showRadio = false;
                }, 300)
            },
            sortProduct(value) { // 排序
                var that = this;
                that.demoList.forEach(function (productList) {
                    productList.fundlist.sort(function (i, j) {
                        if (i.fundtype != '2' && value == "1") {
                            return parseFloat(that.getRatio(i.dayinc)) > parseFloat(that.getRatio(j.dayinc)) ? -1 : 1;
                        } else if (i.fundtype != '2' && value == "2") {
                            return parseFloat(that.getRatio(i.weekinc)) > parseFloat(that.getRatio(j.weekinc)) ? -1 : 1;
                        } else if (i.fundtype != '2' && value == "3") {
                            return parseFloat(that.getRatio(i.monthinc)) > parseFloat(that.getRatio(j.monthinc)) ? -1 : 1;
                        } else if (i.fundtype != '2' && value == "4") {
                            return parseFloat(that.getRatio(i.seasonhinc)) > parseFloat(that.getRatio(j.seasonhinc)) ? -1 : 1;
                        } else if (i.fundtype != '2' && value == "5") {
                            return parseFloat(that.getRatio(i.halfyearhinc)) > parseFloat(that.getRatio(j.halfyearhinc)) ? -1 : 1;
                        } else if (i.fundtype != '2' && value == "6") {
                            return parseFloat(that.getRatio(i.yearinc)) > parseFloat(that.getRatio(j.yearinc)) ? -1 : 1;
                        } else if (i.fundtype != '2' && value == "7") {
                            return parseFloat(that.getRatio(i.threeyearinc)) > parseFloat(that.getRatio(j.threeyearinc)) ? -1 : 1;
                        } else if (i.fundtype != '2' && value == "8") {
                            return parseFloat(that.getRatio(i.thisyearinc)) > parseFloat(that.getRatio(j.thisyearinc)) ? -1 : 1;
                        } else if (i.fundtype != '2' && value == "9") {
                            return parseFloat(that.getRatio(i.setupinc)) > parseFloat(that.getRatio(j.setupinc)) ? -1 : 1;
                        }
                    });
                });

            },
            showTip() {
                this.show = false;
            },
            toFundDetail(item) {
                var that = this;
                
                var navBarType = 1;
                if(that.showNavbar=='true') {
                    navBarType = 2;
                }
                this.$light.navigate('fund', {
                    fundcode: item.fundcode,
                    title: item.shortname,
                    showNavbar: that.showNavbar
                }, {
                    navBarType: navBarType,
                    replace: false,
                    title: item.shortname,
                })
            },
            jump(url, data, params) {
                params.replace = false;
                if(url == "trade/apply"){
                    this.closeMsak();
                }
                API.route.hsOpen(url, data, params);
            },
            loadData() {
                var that = this;
                that.loadShow = true;
                // const param = API.formGenerate().add("sysType", "PB").generate();
                
                if(process.env.RUNTIME.toLowerCase()==='web') {
                    stream.fetch({
                        method: "get",
                        // url: 'https://m.py-axa.com/appServer/product/product/productInfoList.json?sysType=PB&channel=gh_1bc20b27f070&jsonpCallback=productInfoList&appServertimestamp=1570756291349&_=1570756291349&callback=productInfoList',
                        url: 'https://h66hjitvx.lightyy.com/productInfoList.json',
                        type: "jsonp",
                        jsonpCallbackName: 'productInfoList',
                        headers: {}
                    }, function(jsonResult) {
                            if (jsonResult&&jsonResult.data) {
                            storage.setItem("fundList", JSON.stringify(jsonResult.data));
                            that.followQuery(jsonResult.data);
                            that.$nextTick(() => {
                                that.showB = true;
                            })
                        } else {
                            that.loadShow = false;
                            API.callFailProcess(jsonResult.data);
                        }
                    }, function(ret){
                        
                    })

                
                } else {
                    // 本地数据mock
                    
                    Light.ajax({
                        url: "https://h66hjitvx.lightyy.com/productInfoList.json",
                        type: 'get',
                        dataType: 'jsonp',
                        jsonpCallbackName: 'productInfoList',
                        headers: {},
                        success: function (jsonResult) {
                            if (jsonResult) {
                                storage.setItem("fundList", JSON.stringify(jsonResult));
                                // that.followQuery(JSON.parse(jsonResult));
                                that.followQuery(jsonResult);

                                that.$nextTick(() => {
                                    that.showB = true;
                                })
                            } else {
                                that.loadShow = false;
                                API.callFailProcess(jsonResult);
                            }
                        },
                        error:function(err){
                            console.log(err);
                        }
                    });
                    
                    
                }
                
                // API.get("product/product/productInfoList", param, function (jsonResult) {
                //     if (jsonResult && jsonResult.successful) {
                //         storage.setItem("fundList", JSON.stringify(jsonResult));
                //         that.followQuery(jsonResult);
                //         that.$nextTick(() => {
                //             that.showB = true;
                //         })
                //     } else {
                //         that.loadShow = false;
                //         API.callFailProcess(jsonResult);
                //     }
                // });
            },
            followQuery: function(fundList) {
                // API.get("account/myfollows/followQuery", "", (jsonResult) => {
                    this.jsonResultHelper(fundList, {});
                // });
            },

            jsonResultHelper(jsonResult, followQuery) {//注释里面的代码为项目个性化代码,可以对着找删除
                this.tabTitles = [{title:"全部"}];
                this.demoList = [];
                this.blockList = [];
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
                    if (product.fundtype == '2') {
                        otherList.push(product);
                    }else{
                        fundList.push(product);
                        // alert(that.tableContent);

                    }
                });
                that.demoList.push({fundtype: "9999", fundlist: fundList, otherlist: otherList});
                //----------------------------------放入全部基金--------------------------------------------

                const newfundtypes = config.fundsort;//对基金类型进行排序
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
                        that.tabTitles.push({title: fundDict.caption});
                        productList.fundtype = fundDict.keyvalue;
                        that.demoList.push(productList);

                        //----------------------------------放入新发基金------------------------------------
                        if(fundDict.caption == "新发"){
                            productList.fundlist.forEach(function(item){
                                if(item.subscribestate  == '1'){
                                    that.blockList.push(item);
                                };
                            });
                            if(productList.otherlist.length > 0){
                                productList.otherlist.forEach(function(item){
                                    if(item.subscribestate  == '1'){
                                        that.blockList.push(item);
                                    }
                                })
                            }
                            if(that.blockList.length > 3){
                                that.blockList.slice(0,3);
                            }
                            if(that.blockList.length > 0){
                                that.newFund = true;
                            }
                        }

                        //----------------------------------放入新发基金------------------------------------
                    }
                });

                that.demoList.forEach(function (productList,idx) {
                    
                    // 排序
                    productList.fundlist.sort(function (i, j) {
                        if (i.fundtype == '2') {//如果是货币
                            return parseFloat(that.getRatio(i.incomeratio)) > parseFloat(that.getRatio(j.incomeratio)) ? -1 : 1;
                        } else {
                            return parseFloat(that.getRatio(i.dayinc)) > parseFloat(that.getRatio(j.dayinc)) ? -1 : 1;
                        }
                    });
                    //----------------------------------放入全部基金------------------------------------------
                    if(productList.otherlist != null){
                        productList.otherlist.sort(function (i, j) {
                            if (i.fundtype == '2') {//如果是货币
                                return parseFloat(that.getRatio(i.incomeratio)) > parseFloat(that.getRatio(j.incomeratio)) ? -1 : 1;
                            } else {
                                return parseFloat(that.getRatio(i.dayinc)) > parseFloat(that.getRatio(j.dayinc)) ? -1 : 1;
                            }
                        });
                    }
                    //----------------------------------放入全部基金----------------------------------------------------
                });
                if(that.tableIndex!="--"){
                    that.sortProduct(that.tableIndex);
                }

                // that.sortProduct(that.tableIndex);
                that.loadShow = false;
            },
            getRatio(ratio) {
                return ratio == '--' ? 0 : ratio;
            },
            clearInterval() {
                clearInterval(this.timer);
            }
        },
        mounted() {
            // var count = 0;
            // this.show = true;
            // this['timer'] = setInterval(()=>{
            //     this.asiamsg = count++;
            // },1000)
            // this.message = '23333'
            //  this.show = true;
            //     var timer = setTimeout(()=>{
            //         console.log('message')
            //     }, 1500)
            //     clearTimeout(timer);
            setTimeout(()=>{
                this.loadData();
            }, 100)
            // this.loadData();
            // if(!API.matchNative()){
            //     this.loadData();
            // }
            if(Utils.env.isIOS()){
                this.isIOS = true;
                if (Utils.env.isIPhoneX()) {
                    this.isIPhoneX = true;
                }
            }
            // if (Utils.env.isAndroid()) {
            //     this.isAndroid = true;
            //    var dom = Light.requireModule('dom')
            //     dom.getComponentRect('viewport', (ret) => {
            //         console.log(ret)
            //         if(ret.size.height == 0){
            //             this.tabPageHeight = Utils.env.getPageHeight() + 40;
            //         }else{
            //             this.tabPageHeight = ret.size.height;
            //         }
            //     })
            //     return;
            // }
            this.tabPageHeight = Utils.env.getPageHeight() + 40;
        },
        created() {
            // Light.on('viewappear',() => {
                /*storage.getItem("pageRefresh", (e) => {
                    if (e.data != "undefined") {
                        var pageRefresh = JSON.parse(e.data);
                        if(pageRefresh.isfundListRefresh){
                            pageRefresh.isfundListRefresh = false;
                            storage.setItem("pageRefresh",JSON.stringify(pageRefresh));
                            storage.removeItem("fundList");*/
                            // this.loadData();
                 /*       }
                    }
                });*/
            // });
        },
        beforeShow(params) {
            
            this.showNavbar = params.showNavbar;
            storage.setItem("showNavbar", JSON.stringify(params.showNavbar));
         
        }
    }
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .refresh {
        justify-content: center;
        align-items: center;
        width: 750px;
    }

    .refresh-text {
        text-align: center;
        font-size: 24px;
        height: 60px;
        color: #949494;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .search-box {
        width: 750px;
        left: 0;
        position: fixed;
        background-color: #fff;
        z-index: 999;
    }

    .item-container {
        width: 750px;
        background-color: #e8e8e8;
        height: 400px;
    }

    .search-wrap {
        width: 560px;
        background-color: #eee;
        height: 55px;
        border-radius: 30px;
    }

    .search-img {
        width: 30px;
        height: 30px;
    }

    .search-text {
        font-size: 28px;
        color: #808080;
    }

    .change-data {
        height: 75px;
        background-color: #eee;
        padding-left: 30px;
        padding-right: 80px;
        border-bottom-width: 1px;
        border-bottom-color: #e8e8e8;
    }

    .change-text {
        font-size: 28px;
        color: #333;
    }

    .arrow-more {
        width: 30px;
        height: 20px;
    }

    .list {
        width: 750px;
    }

    .cell-fundlist {
        height: 130px;
    }

    .title-wrap {
        height: 130px;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom-width: 1px;
        border-bottom-color: #e8e8e8;
        background-color: #fff;
    }
    .title-text-1 {
        color: #333;
        font-size: 32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        lines: 1;
        display: block;
    }

    .title-text-2 {
        color: #808080;
        font-size: 26px;
        margin-top: 15px;
    }

    .title-img {
        width: 50px;
        height: 50px;
    }
    .special-img {
        width: 94px;
        height: 28px;
    }

    .cont-wrap {
        height: 86px;
        background-color: #fff;
    }

    .cont-box {
        height: 86px;
        width: 415px;
        justify-content: space-between;
        padding-left: 30px;
        padding-right: 30px;
    }

    .border-right {
        border-right-width: 1px;
        border-right-color: #e8e8e8;
    }

    .cont-text-1 {
        color: #333;
        font-size: 32px;
    }

    .cont-text-2 {
        color: #808080;
        font-size: 26px;
        margin-top: 15px;
    }

    .cont-text-3 {
        color: #f0384f;
        font-size: 32px;
        flex: 1;
        text-align: center;
    }

    .cont-text-5 {
        color: #808080;
        font-size: 32px;
        flex: 1;
        text-align: center;
    }

    .cont-text-4 {
        color: #37c848;
        font-size: 32px;
        flex: 1;
        text-align: center;
    }

    .chose-wrap {
        position: fixed;
        top: 275px;
        left: 0;
        width: 750px;
        background-color: #fff;
    }

    .mask {
        width: 750px;
        height: 600px;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #000;
        opacity: 0.6;
    }

    .block-wrap{ position: fixed; left: 0; bottom: 175px; z-index:999;}
    .block-img{ width: 103px; height: 103px;}

    .block-box {
        width: 690px;
        height: 720px;
        position: fixed;
        left: 30px;
        bottom: 240px;
        z-index: 999
    }

    .block-close {
        width: 60px;
        height: 60px;
        text-align: center;
        color: #fff;
        font-size: 60px;
        position: absolute;
        right: 315px;
        bottom: 5px;
    }

    .block-item {
        width: 690px;
        height: 160px;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom-width: 1px;
        border-bottom-color: #e8e8e8;
        border-bottom-style: solid;
        background-color: #fff
    }

    .block-text {
        color: #333;
        font-size: 30px;
    }

    .col-red {
        color: #e89f8d;
    }

    .block-arrow {
        width: 20px;
        height: 30px;
    }

    .block-top {
        width: 690px;
        height: 90px;
    }

    .w250 {
        width: 250px;
    }

    .buy-now {
        border-width: 1px;
        border-color: #3c94fe;
        border-style: solid;
        width: 160px;
        height: 60px;
    }

    .newFundBox {
        height: 480px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .wrap{
        position: fixed;
        left: 0;
    }
    .fund-grey{
        height: 30px;
        width: 110px;
        background-color: #6D6D6D;
        border-radius: 15px;
        margin-left: 10px;
    }
    .fund-orange{
        height: 30px;
        width: 110px;
        background-color:#F17E00;
        border-radius: 15px;
        margin-left: 10px;
    }
    .fund-grey-word{
        font-size: 20px;
        color: #fff;
        text-align: center;
    }
    .w150{
        width: 170px;
    }
</style>
