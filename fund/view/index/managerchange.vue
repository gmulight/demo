<template>
    <div class="bg">
        <scroller :class="[showNavbar=='true'&&'mt90']">
            <div class="h15"></div>

            <div class="cell-file flex-row">
                <text class="label">姓名</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.brokername}}</text>
                </div>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">性别</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.brokergender}}</text>
                </div>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">学位</text>
                <div class="flex-row align-center info-wrap flex-1">
                    <text class="info-wrap-text flex-1">{{info.degree}}</text>
                </div>
            </div>
            <div class="cell-file flex-row ">
                <text class="label">背景</text>
                <text class="info-wrap-text flex-1">{{info.background}}</text>
            </div>
        </scroller>
        <navbar title="基金经理" v-if="showNavbar=='true'"></navbar>


    </div>
</template>

<script>
    import Light from 'light';
    import API from '../../api/api.js';
    import navbar from "../../components/ui/navbar";
    import loadingUI from "../../components/ui/loadingUI";
    import Utils from "../../res/utils";
    var stream = Light.requireModule('stream');

    export default {
        data() {
            return {
                title:"基金经理",
                fundcode:"",
                parts: [],
                notData: false,
                loadShow:true,
                scrollerHeight:0,
                info: {},
                showNavbar: false
            };
        },
        components: {
            navbar,loadingUI
        },
        //
        created: function () {

            // this.scrollerHeight = Utils.env.getPageHeight()-90;
        },
        methods: {
            jump(url, title,item) {
                API.route.hsOpen(url, {fundcode:this.fundcode,brokerno:item.brokerno}, {replace: false,title:title,navigationBarShow: false});
            },
            //获取基金经理
            fundManagerQuery() {
                var that = this;
                if(process.env.RUNTIME.toLowerCase()==='web') {
                    stream.fetch({
                        method: "get",
                        // url: 'https://m.py-axa.com/appServer/product/product/fundbrokerquery.json?fundcode=519171&channel=gh_1bc20b27f070&jsonpCallback=fundManagerQuery&appServertimestamp=1570764072948&_=1570764072948&callback=fundManagerQuery',
                        url: 'https://hmlskucdm.lightyy.com/fundbrokerquery.json',
                        type: 'jsonp',
                        jsonpCallbackName: 'fundManagerQuery',
                        headers: {}
                    }, function(ret) {
                        if(!ret.ok) return;
                        that.info = ret.data.result[0];
                    })
                } else {
                    Light.ajax({
                        url: "https://hmlskucdm.lightyy.com/fundbrokerquery.json",
                        type: 'get',
                        dataType: 'jsonp',
                        jsonpCallbackName: 'fundManagerQuery',
                        headers: {},
                        success: function (res) {
                            console.log(res)
                            that.info = res;
                        }
                    })
                }
               
            },

            getfundManagerImgList(){
                var that = this;
                var requestList=[];
                for(var i in that.parts) {
                    requestList.push(that.getfundManagerImg(that.parts[i].brokerno));
                }
                Promise.all(requestList).then((res) => {

                    for (var j in res) {
                        that.parts[j].photo=res[j].personaldata;
                    } ;
                    that.loadShow = false;
                });
            },
            getfundManagerImg(brokerno){
                var that = this;
                    var data = API.formGenerate()
                        .add("brokerno", brokerno)
                        .generate();
                    return new Promise((resolve) =>{
                        API.get("product/product/fundmanagerheadquery", data, function(jsonResult) {
                            resolve(jsonResult)
                        });
                    })


            },


            //获取基金经理管理的基金，返回任职日期
            managerResume(brokerno) {
                const _that = this;
                var data = API.formGenerate()
                    .add("brokerno", brokerno)
                    .add("isposition", 1)
                    .generate();
                API.get("product/product/managerresumequery", data, function(jsonResult) {
                    if(jsonResult && jsonResult.successful) {
                        for(var i in jsonResult.result) {
                            if(_that.fundcode == jsonResult.result[i].fundcode){
                                return API.formatDate(jsonResult.result[i].starttime)+"~"+jsonResult.result[i].endime?API.formatDate(jsonResult.result[i].endime):"至今";
                                break;
                            }
                        }
                    } else {
                        API.callFailProcess(jsonResult);
                    }
                });
            }
        },
        //页面加载完执行
        mounted() {
            this.fundManagerQuery();
        },
        //页面初始化得到传入的值
        afterShow(data){
            if (data.fundcode) {
                this.fundcode = data.fundcode;
            }
            this.showNavbar = data.showNavbar;
        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .waymain {
        height: 130px;
        padding-left: 30px;
        padding-right: 30px;
        position: relative;
    }
    .line-mc {
        position: absolute;
        bottom: 0;
        left: 30px;
        right: 0px;
        content: " ";
        width: auto;
        height: 1px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e8e8e8;
        transform: scaleY(0.5);
    }
    .managrper{
        width: 80px;
        height: 80px;
    }
    .arrow{
        width: 20px;
        height: 30px;
    }

    .tip-box{position: absolute; top:300px; width: 600px; left:75px;}
    .noList{width: 268px; height: 240px;}

    .bg {
        background-color: #f1f0f6;
        height: 1334px;
    }

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
    .h15{
        height: 15px;
        background-color: #f1f0f6;
    }
</style>

