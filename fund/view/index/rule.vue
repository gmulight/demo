<template>
    <scroller  style="background-color:#eee;">
        <div class="h15"></div>
        <div :class="[showNavbar=='true'&&'mt90']">
            <!-- 申购费率 -->
            <div v-if="isShowPurchase">
                <div class="rule-head justify-center align-center flex-row">
                    <div class="flex-1">
                        <div class="columnar">
                            <text class="font-14 m-color-1 font-bold">购买费率</text>
                        </div>
                    </div>
                    <div class="w300 align-end">
                        <text class="font-14 m-color-3">支持银行及费率折扣</text>
                    </div>
                </div>
                <div class="align-center rule-top flex-row" >
                    <div class="flex-1">
                        <text class="font-14 m-color-1">买入金额</text>
                    </div>
                    <div class="w300 pl60">
                        <text class="font-14 m-color-1 ml70">费率</text>
                    </div>
                    <div class="line-rule" style="left:0px"></div>
                </div>
                <div class="align-center rule-mid flex-row" v-for="(item,index2) in declare" :key="index2">
                    <div class="flex-1">
                        <text class="font-14 m-color-1">{{item.money}}</text>
                    </div>
                    <div class="w300 pl60">
                            <text class="font-14 m-color-1 ml70">{{item.rate}}</text>
                    </div>
                    <div class="line-rule"></div>
                </div>
                <div class="align-center rule-top flex-row" v-if="custombuyfeedesc" >
                    <div class="flex-1">
                        <text class="font-12 m-color-9">{{custombuyfeedesc}}</text>
                    </div>
                </div>  
            
            </div>

         

            <div class="mt15" v-if="isShowRedeem">
                <div class="rule-head justify-center">
                    <div class="columnar">
                        <text class="font-14 m-color-1 font-bold">赎回费率</text>
                    </div>
                </div>
                <div class="align-center rule-top flex-row" v-if="!isCustomFeeSale">
                    <div class="flex-1">
                        <text class="font-14 m-color-1">持有期限</text>
                    </div>
                    <div class=" w300 pl60 ">
                        <text class="font-14 m-color-1 ml70">费率</text>
                    </div>
                    <div class="line-rule" style="left:0px"></div>
                </div>
                <div class="align-center rule-top flex-row" v-for="(item,index) in redeem" :key="index">
                    <div class="flex-1">
                        <text class="font-14 m-color-1">{{item.day}}</text>
                    </div>
                    <div class=" w300 pl60 ">
                        <text class="font-14 m-color-1 ml70">{{item.rate}}</text>
                    </div>
                    <div class="line-rule"></div>
                </div>
            </div>
            <!-- 支持银行卡 -->
            <!-- <div class="flex-row aboutlist align-center mt15 mb20" >
                <div class="flex-1">
                    <text class="font-14 m-color-1">支持银行及限额</text>
                </div>
                <image src="images/arrow.png" class="arrow"/>
            </div> -->
            <div class="align-center rule-top flex-row" v-if="customredemptfeedesc" >
                <div class="flex-1">
                    <text class="font-12 m-color-9">{{customredemptfeedesc}}</text>
                </div>
            </div>
            <navbar :title="title" v-if="showNavbar=='true'"></navbar>

        </div>
    </scroller>
</template>
<script>
    import API from '../../api/api.js';
    import navbar from "../../components/ui/navbar";
    import Light from "light";
    import loadingUI from "../../components/ui/loadingUI";
    var modal = Light.requireModule('modal');

    export default {
        components: {
            navbar,loadingUI
        },
        data() {
            return {
                title:"交易费率",
                fundcode:"",//基金代码
                fundstate:"",//基金状态
                buybusin:"",
                isShowPurchase:true,//是否显示购买费率
                isShowRedeem:true,//是否显示赎回费率
                isCustomFeeBuy:false,//是否是自定义购买费率
                isCustomFeeSale:false,//是否是自定义赎回费率
                declare:[{
                    money: 'M<100万',
                    rate: '1.5%'
                }, {
                    money: '100万≤M<300万',
                    rate: '1%'
                }, {
                    money: '300万≤M<500万',
                    rate: '1%'
                }, {
                    money: 'M≥500万',
                    rate: '1000元/笔'
                }],//购买费率
                redeem:[{
                    day: 'T<7日',
                    rate: '1.5%'
                }, {
                    day: '7日≤T<30日',
                    rate: '0.75%'
                }, {
                    day: '30日≤T<1年',
                    rate: '0.5%'
                }, {
                    day: '1年≤T<2年',
                    rate: '0.25%'
                }, {
                    day: 'T≥2年',
                    rate: '0%'
                }, 
                    
                ],//赎回费率
                customredemptfeedesc:null,//自定义赎回费率说明
                custombuyfeedesc:null,//认申购自定义费率说明
                loadShow: false, //遮罩层必须参数
                showNavbar: false
            };
        },


        methods: {
            jump(url,title) {
                API.route.hsOpen(url, {}, {replace: false,title:title,headHidden:true});
            },

            getCustomFee(proResult){
                let that = this;
                let data = API.formGenerate().add("fundcode", that.fundcode).generate();
                API.get("/market/market/queryFundCustomFee", data, (jsonResult) =>{
                    if(jsonResult && jsonResult.successful) {
                        const newjsonResult = {
                            buy : [],
                            sale : []
                        };
                        for (let i in jsonResult.fundCustomFeeBeans){
                            let fee=jsonResult.fundCustomFeeBeans[i];
                            if(proResult.fundstate=="1"){//认购
                                if(proResult.customsubscriptfeesw&&proResult.customsubscriptfeesw=="1"){   //自定义认购费率打开
                                    if(fee.type=="1"){//认购
                                        newjsonResult.buy.push(
                                            {
                                                sort:fee.sort,
                                                money: fee.feeinterval,
                                                rate: fee.feevalue
                                            }
                                        );
                                        continue;
                                    }
                            
                                }
                            }else {//申购
                                if(proResult.custompurchasefeesw&&proResult.custompurchasefeesw=="1"){//自定义申购费率打开
                                    if(fee.type=="2"){//申购
                                        newjsonResult.buy.push(
                                            {
                                                sort:fee.sort,
                                                money: fee.feeinterval,
                                                rate: fee.feevalue
                                            }
                                        );
                                        continue;
                                    }
                                }
                            
                            }

                            if(proResult.customredemptfeesw&&proResult.customredemptfeesw=="1") {       //自定义赎回费率打开
                                if(fee.type=="3"){//赎回
                                    newjsonResult.sale.push(
                                        {
                                            sort:fee.sort,
                                            day: fee.feeinterval,
                                            rate: fee.feevalue
                                        }
                                    );
                                    continue;
                                }
                            }
                        }

                        
                        if((proResult.fundstate=="1"&&proResult.customsubscriptfeesw&&proResult.customsubscriptfeesw=="1")||(proResult.fundstate!="1"&&proResult.custompurchasefeesw&&proResult.custompurchasefeesw=="1")){//认购或申购自定义开关开着
                            that.isCustomFeeBuy=true;
                            if(newjsonResult.buy && newjsonResult.buy.length>0) {
                                newjsonResult.buy.sort(function (a,b) {
                                    return parseInt(a.sort) < parseInt(b.sort) ? -1 : 1;
                                })
                               
                                that.declare = newjsonResult.buy;
                            }else{
                                that.isShowPurchase=false;
                            }

                        }

                 
                           if(proResult.fundstate=="1"){
                                that.custombuyfeedesc= proResult.customsubscriptfeedesc
                           }else{
                                that.custombuyfeedesc= proResult.custompurchasefeedesc
                           }


                        if(proResult.customredemptfeesw&&proResult.customredemptfeesw=="1") {//自定义赎回开关开着
                                that.isCustomFeeSale = true;
                            if (newjsonResult.sale && newjsonResult.sale.length > 0) {
                                newjsonResult.sale.sort(function (a, b) {
                                    return parseInt(a.sort) < parseInt(b.sort) ? -1 : 1;
                                })
                              
                                that.redeem = newjsonResult.sale;

                            }else{//没有配置自定义赎回费率的情况不展示费率

                                that.isShowRedeem = false;

                            }
                        }
                            if(proResult.customredemptfeedesc&&proResult.customredemptfeedesc!=""){
                                that.customredemptfeedesc=proResult.customredemptfeedesc;
                            }

                         this.rateInterval(proResult);//获取申购赎回费率
                    } else {
                         that.loadShow=false;
                        API.callFailProcess(jsonResult);
                    }
                });
            },
            //获取费率
            rateInterval(proResult){
                const _that = this;
                var data = API.formGenerate().add("fundcode", _that.fundcode).add("custtype", "1").add("requestnum", "99")	//一次查完，防止分页;
                /*if(this.buybusin == "020"){//认购
                    data.add("businesstype", "020");
                }else{
                    data.add("businesstype", "022");
                }*/
                API.get("common/query/rateInterval", data.generate(), (jsonResult)=> {
                    if (jsonResult && jsonResult.successful){
                        var _feeobj = [],
                            _money = 0,
                            _rate = 0,
                            redeemsymboolObj = {
                                firstsymbool:'<',
                                leftsymbool:'≤',
                                rightsymbool:'<',
                                lastsymbool:'≥'
                            },
                            newjsonResult = {
                                declare : [],
                                redeem : []
                            };
                        for (var i in jsonResult.rateIntervalViewList){
                            _feeobj = jsonResult.rateIntervalViewList[i];
                            if(_feeobj.saletype=="0"){//0-直销
                                //处理买入费率
                                if (_that.fundstate == "1"){//认购期
                                  if(proResult.custompurchasefeesw&&proResult.customsubscriptfeesw=="0"){//自定义认购费率关闭


                                    if (_feeobj.tradetype == "020" && _feeobj.sharetype == "A") {//，020-认购业务代码
                                        if (_feeobj.feeratio == 0) {
                                            _money = "M≥" + parseFloat(_feeobj.minvalue) / 10000 + "万";
                                            _rate = parseInt(_feeobj.maxfee) + "元/笔";
                                        } else if (_feeobj.minvalue == 0) {
                                            _money = "M<" + parseFloat(_feeobj.maxvalue) / 10000 + "万";
                                            _rate = API.hsTools.accurateMul(_feeobj.feeratio,100) + "%";
                                        } else {
                                            _money = parseFloat(_feeobj.minvalue) / 10000 + "万≤M<" + parseFloat(_feeobj.maxvalue) / 10000 + "万";
                                            _rate = API.hsTools.accurateMul(_feeobj.feeratio,100) + "%";
                                        }
                                        //放入买入数组
                                        newjsonResult.declare.push(
                                            {
                                                money: _money,
                                                rate: _rate
                                            }
                                        );
                                        continue;
                                    }
                                  }
                                } else {
                                    if(proResult.custompurchasefeesw&&proResult.custompurchasefeesw=="0") {//自定义申购费率关闭
                                        if (_feeobj.tradetype == '022' && _feeobj.sharetype == "A") {//0-直销，022-申购业务代码
                                            if (_feeobj.feeratio == 0) {
                                                _money = "M≥" + parseFloat(_feeobj.minvalue) / 10000 + "万";
                                                _rate = parseInt(_feeobj.maxfee) + "元/笔";
                                            } else if (_feeobj.minvalue == 0) {
                                                _money = "M<" + parseFloat(_feeobj.maxvalue) / 10000 + "万";
                                                _rate = API.hsTools.accurateMul(_feeobj.feeratio,100) + "%";
                                            } else {
                                                _money = parseFloat(_feeobj.minvalue) / 10000 + "万≤M<" + parseFloat(_feeobj.maxvalue) / 10000 + "万";
                                               
                                               _rate = API.hsTools.accurateMul(_feeobj.feeratio,100)+ "%"
                                                
                                            }
                                            //放入买入数组
                                            newjsonResult.declare.push(
                                                {
                                                    money: _money,
                                                    rate: _rate
                                                }
                                            );
                                            continue;
                                        }
                                    }
                                }
                                //处理赎回费率
                                if((proResult.customredemptfeesw&&proResult.customredemptfeesw=="0")&&this.isShowRedeem) {//自定义赎回费率关闭
                                    if (_feeobj.tradetype == '024') {//024-赎回业务代码
                                        if (_feeobj.feeratio == 0) {
                                            if (_feeobj.maxholddays == 0) {
                                                _money = "T≥0";
                                            } else if (_feeobj.minholddays < 365) {
                                                _money = "T" + redeemsymboolObj.lastsymbool + parseInt(_feeobj.minholddays) + "日";
                                            } else {
                                                _money = "T" + redeemsymboolObj.lastsymbool + parseInt(_feeobj.minholddays / 365) + "年";
                                            }
                                        } else if (_feeobj.minholddays == 0) {
                                            if (_feeobj.maxholddays < 365) {
                                                _money = "T" + redeemsymboolObj.firstsymbool + parseInt(_feeobj.maxholddays) + "日";
                                            } else {
                                                _money = "T" + redeemsymboolObj.firstsymbool + parseInt(_feeobj.maxholddays / 365) + "年";
                                            }
                                        } else {
                                            if (_feeobj.minholddays < 365) {
                                                _money = parseInt(_feeobj.minholddays) + "日" + redeemsymboolObj.leftsymbool;
                                            } else {
                                                _money = parseInt(_feeobj.minholddays / 365) + "年" + redeemsymboolObj.leftsymbool;
                                            }
                                            _money = _money + "T";
                                            if (_feeobj.maxholddays < 365) {
                                                _money = _money + redeemsymboolObj.rightsymbool + parseInt(_feeobj.maxholddays) + "日";
                                            } else {
                                                _money = _money + redeemsymboolObj.rightsymbool + parseInt(_feeobj.maxholddays / 365) + "年";
                                            }
                                        }
                                        _rate = API.hsTools.accurateMul(_feeobj.feeratio,100)+ "%"
                                        //放入赎回数组
                                        newjsonResult.redeem.push(
                                            {
                                                day: _money,
                                                rate: _rate
                                            }
                                        );
                                    }
                                }
                            }
                        }
                           if((proResult.fundstate=="1"&&proResult.customsubscriptfeesw&&proResult.customsubscriptfeesw=="0")||(proResult.fundstate!="1"&&proResult.custompurchasefeesw&&proResult.custompurchasefeesw=="0")){//认购或申购自定义开关都关着
                                if(newjsonResult.declare && newjsonResult.declare.length>0) {
                                    _that.declare = newjsonResult.declare;
                                }else{
                                    this.isShowPurchase=false;
                                }
                           }
                          

                        if((proResult.customredemptfeesw&&proResult.customredemptfeesw=="0")){
                            if(newjsonResult.redeem && newjsonResult.redeem.length>0) {
                                _that.redeem = newjsonResult.redeem;
                            }else{
                                this.isShowRedeem=false;
                            }
                        }
                        this.loadShow=false;
                    } else {
                        this.loadShow=false;
                        API.callFailProcess(jsonResult);
                    }
                });
            },



            productDetail(){
                var that = this;
                that.loadShow=true;
                var data = API.formGenerate().add("fundcode", that.fundcode).generate();
                API.get("product/product/productDetail", data, function(jsonResult) {
                    if(jsonResult && jsonResult.successful) {
                     
                        if(jsonResult.result){
                           
                            that.getCustomFee(jsonResult.result);
                           
                        }
                    } else {
                         that.loadShow=false;
                        API.callFailProcess(jsonResult);
                    }
                });
            },
        },
        mounted() {
            this.productDetail();
        },
        //页面初始化得到传入的值
        afterShow(data){
            if (data.fundcode) {
                this.fundcode = data.fundcode;
                this.fundstate = data.fundstate;
                this.buybusin = data.buybusin;
            }
            this.showNavbar = data.showNavbar;

        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .rule-head {background-color: #ebf3fe;padding: 30px; }
    .margin75 {margin-left: 75px;}
    .rule-top,
    .rule-mid {position: relative;padding: 30px;background-color: #fff;}
    .rule-discount {width: 50px;height: 55px;position: absolute;top: 0;right: 30px;}
    .rule-icon{width: 50px;height: 55px;position: absolute;top: 0;}
    .columnar {border-left-width: 8px;border-left-style: solid;border-left-color: #3580ed;padding-left: 10px;}
    .line-rule {position: absolute;bottom: 0;left: 30px;right: 0px;content: " ";width: auto;height: 1px;border-bottom-width: 1px;border-bottom-style: solid;border-bottom-color: #e8e8e8;transform: scaleY(0.5);}
    .aboutlist{height: 100px;position: relative;padding-right:30px;padding-left:30px;background-color: #fff }
    .arrow{width: 20px;height: 30px;}
    .rule-process{height: 180px;padding-left: 30px;padding-right: 30px;background-color: #fff}
    .round-box {position: relative;height: 40px;}
    .round {width: 16px;height: 16px;background-color: #fff;border-radius: 8px;border-width: 2px;border-style: solid;border-color: #3580ee;}
    .roundline {position: absolute;top: 18px;left: 0px;right: 0px;content: " ";width: auto;height: 4px;border-bottom-width: 4px;border-bottom-style: solid;border-bottom-color: #3580ee;}
    .text-line{text-decoration: line-through;}
    .lines{
        lines:1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        height: 30px;
    }
    .w300{
        width: 300px;
    }
    .pl150{
        padding-left: 150px;
    }
    .h15{
        height: 15px;
        background-color: #f1f0f6;
    }
</style>