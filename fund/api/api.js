import Light from 'light';
import config from '../config.js'
import JSEncrypt from 'cos_jsencrypt'
import LightSDK from 'light-sdk';
import Route from './route';

var event = Light.requireModule('event');
var storage = Light.requireModule('storage'); //缓存
var stream = Light.requireModule('stream');
const LightJSBridge = Light.requireModule('LightJSBridge');
const TIMEOUT = 40000;
var lg;
if (process.env.RUNTIME === "miniapp") {
    lg = __base__;
} else {
    lg = weex;
}
let API = {
    count: 1,
    get: (functionNo, data, callback, type) => {
        var timestamp = (new Date()).valueOf();
        data = API.encryptPassword(data);
        data = API.addChannelKey(data);
        /* 添加参数 */
        /* weex中jsonp自动命名，配合自增命名 */
        if (!API.matchNative() || process.env.RUNTIME === "miniapp") {
            data += "&jsonpCallback=jsonp" + (API.count++);
            data += "&appServertimestamp=" + timestamp;
            data += "&_=" + timestamp;
        }
        //判断渠道,如果为 web 则不传 clientid 安全考虑
        if (API.matchNative()) {
            storage.getItem("clientid", (e) => {
                if (e.data != "undefined") {
                    data += "&clientid=" + e.data;
                } else {
                    data += "&clientid=";
                }
                API.getUDID(function (deviceId) {
                    if (deviceId) {
                        data += "&deviceId=" + encodeURIComponent(deviceId.data.UDID);
                    }
                    // Promise.race([API.fetch(functionNo, data, callback, "post"), API.fetchTimeOut()]).

                    Promise.race([API.fetch(functionNo, data, callback, "post")]).
                        then(function (res) {
                            callback(res);
                        }).catch(function (res) {
                            callback(res);
                        });
                });
            });

        } else {
            // Promise.race([API.fetch(functionNo, data, callback, type), API.fetchTimeOut()]).

            Promise.race([API.fetch(functionNo, data, callback, type)]).
                then(function (res) {
                    callback(res);
                }).catch(function (res) {
                    callback(res);
                });

        }
    },
    fetchTimeOut() {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                /* 超时反馈 */
                resolve({ successful: true });
            }, TIMEOUT);
        });
    },
    fetch(functionNo, data, callback, type) {
        // return new Promise((resolve, reject) => {
        if (type == "post") {
            return new Promise((resolve, reject) => {
                Light.ajax({
                    type: 'POST',
                    url: config.appBaseUrl + functionNo + ".json",
                    data: data,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    timeout: TIMEOUT,
                    success: function (data) {
                        // var resData = JSON.parse(data.data);
                        var resData = data.data;
                        // if (API.matchNative() && !!resData.clientid) {
                        //     storage.setItem("clientid", resData.clientid);
                        // }
                        resolve(resData);
                    },
                    error: function (err) {
                        reject(err)
                    }
                },
                    // function (res) {
                    //     if (callback) {
                    //         if (res.ok) {
                    //             var resData = JSON.parse(res.data);
                    //             if (API.matchNative() && !!resData.clientid) {
                    //                 storage.setItem("clientid", resData.clientid);
                    //             }
                    //             resolve(resData);
                    //         } else {
                    //             resolve(JSON.parse(res.data));
                    //         }
                    //     }
                    // }
                )

            })
        } else {
            return new Promise((reslove, reject) => {
                Light.ajax({
                    type: 'GET',
                    url: config.appBaseUrl + functionNo + ".json?" + data,
                    dataType: 'json',
                    timeout: TIMEOUT,
                    data: {},
                    success: function (data) {
                        console.log(data)
                        if (API.matchNative() && !!res.data.clientid) {
                            storage.setItem("clientid", res.data.clientid);
                        }
                        reslove(data)
                    },
                    error: function (err) {
                        reject(err)
                    }
                },
                    // function (res) {
                    //     if (callback) {
                    //         if (res.ok) {
                    //             if (API.matchNative() && !!res.data.clientid) {
                    //                 storage.setItem("clientid", res.data.clientid);
                    //             }
                    //             resolve(res.data);
                    //         } else {
                    //             resolve(res.data);
                    //         }
                    //     }
                    // }
                )
            })
        }

        // });
    },
    otherGet: (functionNo, data, callback) => {
        Light.fetch({
            method: 'GET',
            url: config.otherAppBaseUrl + functionNo + ".ha?" + data,
        }, function (res) {
            if (callback) {
                if (res.ok) {
                    callback(res.data);
                } else {
                    callback(res.data);
                }
            }
        })
    },
    getUDID(callback) {
        LightSDK.native.getUDID({}, callback);
    },
    addChannelKey(data) {
        /* 区分三端 */
        let channel, platform;
        platform = lg.config.env.platform;
        if (platform === "Web") {
            channel = config.weixin;
        } else if (platform === "android") {
            channel = config.android;
        } else if (platform === "iOS") {
            channel = config.iphone;
        }
        return data + "&channel=" + channel;
    },
    getChannelkey() {
        /* 区分三端 */
        let warningChannelkey, platform;
        platform = lg.config.env.platform;
        if (platform === "Web") {
            warningChannelkey = config.weixinChannelkey;
        } else if (platform === "android") {
            warningChannelkey = config.androidChannelkey;
        } else if (platform === "iOS") {
            warningChannelkey = config.iphoneChannelkey;
        }
        return warningChannelkey;
    },
    getChannelName() {
        /* 区分三端 */
        let channel, platform;
        platform = lg.config.env.platform;
        if (platform === "Web") {
            channel = config.weixin;
        } else if (platform === "android") {
            channel = config.android;
        } else if (platform === "iOS") {
            channel = config.iphone;
        }
        return channel;
    },
    matchNative: function () {
        let platform = lg.config.env.platform;
        console.log(lg.config.env)
        return (platform == "android" || platform == "iOS") && process.env.RUNTIME !== "miniapp";
    },
    nextTab(index) {
        if (!API.matchNative() || process.env.RUNTIME === "miniapp") {
            if (index == "0") {
                Light.navigate('home', {}, { replace: true, title: '', navBarType: 0, });
            } else if (index == "1") {
                Light.navigate('discover', {}, { replace: true, title: '', navBarType: 2, });
            } else if (index == "2") {
                Light.navigate('fund-list', {}, { replace: true, title: '', navBarType: 2 });
            } else {
                Light.navigate('setting', {}, { replace: true, title: '', navBarType: 2 });
            }

        } else {
            LightSDK.native.switchTab({ index: index }, "");
        }

    },
    openWebPage(url, data, params) { //跳转外链
        let platform;
        platform = lg.config.env.platform;
        if (platform === "Web") {
            if (data == null) {
                window.location.href = url;
            } else {
                window.location.href = url + data;
            }
        } else if (platform === "android" || platform === "iOS") {
            if (params) {
                params.startPage = url;
                event.openNative('web', params);
            } else {
                event.openNative('web', { startPage: url });
            }
        }

    },
    encryptPassword(data) {
        /* 密码加密,中文编码 */
        var newArray = [],
            dataArray = data.split("&");
        dataArray.forEach(function (n, i) {
            var key = n.split("=")[0];
            var value = n.split("=")[1];
            if (key == 'password' || key == 'tradepassword' || key == 'newpassword') { //加密密码
                if (!!config.tradePubKey && !!value) {
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey(config.tradePubKey);
                    value = encodeURIComponent(encrypt.encrypt(value));
                    n = key + "=" + value;
                }
            } else { //编码中文
                var chinese = /^[\u4E00-\u9FA5]/;
                if (chinese.test(value)) {
                    value = encodeURIComponent(value);
                    n = key + "=" + value;
                }
            }
            newArray.push(n);
        })
        return newArray.join('&');
    },
    hsBack(step) {
        var number = { number: "1" };
        if (step) {
            number.number = String(step);
        }

        LightSDK.native.back(number);

    },
    hsHome(url) {
        if (!API.matchNative() || process.env.RUNTIME === "miniapp") {
            // 如果是web执行
            Light.navigate(url, {}, { replace: true, headHidden: true });
        } else {
            LightSDK.native.back({ "number": "9999" })
        }
    },
    validForm: function () {
        var reg = {
            notEmpty: {
                rule: /^[\s\S]+$/,
                desc: ""
            },
            loginPw: {
                rule: config.loginPWReg,
                desc: "登录密码必须为8-16位数字或字母"
            },
            registerPw: {
                rule: config.registerPWReg,
                desc: "登录密码必须为8-16位数字或字母"
            },
            queryPw: {
                rule: config.queryPWReg,
                desc: "查询密码必须为6位数字"
            },
            tradePw: {
                rule: config.tradePWReg,
                desc: "交易密码必须为6-8位字母、数字"
            },
            tradePw2: {
                rule: config.queryPWReg,
                desc: "交易密码必须为6位数字"
            },
            mobile: {
                rule: config.mobileReg,
                desc: "手机号码"
            },
            authcode: {
                rule: config.authcodeReg,
                desc: ""
            },
            num: {
                rule: /^\d+$/,
                desc: ""
            },
            money: {
                rule: /^\d+(\.\d{0,2})?$/,
                desc: "金额"
            },
            word: {
                rule: /^[a-zA-Z0-9]+$/
            },
            zip: {
                rule: /^[0-9]{6}$/,
                desc: "邮编"
            },
            email: {
                rule: /^$|^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]{2,})+([\.][a-zA-Z\-_]{2,})?$/,
                desc: "email"
            },
            openAccount: {
                rule: {
                    test: function (value) {
                        try {
                            var birthday = value.substr(6, 8);
                            var now = new Date();
                            var year = now.getFullYear();
                            var month = now.getMonth() + 1;
                            var date = now.getDate();
                            if (month < 10) month = "0" + month;
                            if (date < 10) date = "0" + date;
                            return (parseInt(year + "" + month + "" + date) - parseInt(birthday)) > 180000
                        } catch (e) {
                            return true;
                        }
                    }
                },
                desc: ""
            },
            script: {
                rule: {
                    test: function (value) {
                        return !(/<script[^>]*>.*<\/script>/i.test(value));
                    }
                },
                desc: ""
            },
            reg: {
                rule: {
                    test: function (value) {
                        return value.reg.test(value.value);
                    }
                },
                desc: ""
            },
            strlength: {
                rule: {
                    test: function (value) {
                        if (value.size) {
                            if (value.value.length == value.size) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            if (value.value.length >= value.min && value.value.length <= value.max) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                },
                desc: ""
            },
            certificate: {
                rule: {
                    test: function (value) {
                        var certificate18 = /^((11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91)\d{4})((((19|20)(([02468][048])|([13579][26]))0229))|((20[0-9][0-9])|(19[0-9][0-9]))((((0[1-9])|(1[0-2]))((0[1-9])|(1\d)|(2[0-8])))|((((0[1,3-9])|(1[0-2]))(29|30))|(((0[13578])|(1[02]))31))))((\d{3}(x|X))|(\d{4}))$/;
                        return certificate18.test(value);
                    }
                },
                desc: "18位身份证"
            },
            certificate15And18: {
                rule: {
                    test: function (value) {
                        var certificate15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
                        var certificate18 = /^((11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91)\d{4})((((19|20)(([02468][048])|([13579][26]))0229))|((20[0-9][0-9])|(19[0-9][0-9]))((((0[1-9])|(1[0-2]))((0[1-9])|(1\d)|(2[0-8])))|((((0[1,3-9])|(1[0-2]))(29|30))|(((0[13578])|(1[02]))31))))((\d{3}(x|X))|(\d{4}))$/;
                        return certificate15.test(value) || certificate18.test(value);
                    }
                },
                desc: "身份证"
            },
            bankcard: {
                rule: {
                    test: function (value) {
                        return /^[\d]{12,19}$/.test(value);
                    }
                },
                desc: "银行卡"
            },
            "=": {
                rule: {
                    test: function (value) {
                        return (value.a == value.b);
                    }
                },
                desc: ""
            },
            "!=": {
                rule: {
                    test: function (value) {
                        return (value.a != value.b);
                    }
                },
                desc: ""
            },
            ">": {
                rule: {
                    test: function (value) {
                        return parseFloat(value.a) > parseFloat(value.b);
                    }
                }
            },
            "<": {
                rule: {
                    test: function (value) {
                        return parseFloat(value.a) < parseFloat(value.b);
                    }
                }
            },
            ">=": {
                rule: {
                    test: function (value) {
                        return parseFloat(value.a) >= parseFloat(value.b);
                    }
                }
            },
            "<=": {
                rule: {
                    test: function (value) {
                        return parseFloat(value.a) <= parseFloat(value.b);
                    }
                }
            },
            chineseName: {
                rule: {
                    test: function (value) {
                        var chinese = /^[\u4E00-\u9FA5]{2,10}(?:·[\u4E00-\u9FA5]{2,10})*$/;
                        return chinese.test(value);
                    }
                },
                desc: "姓名"
            },
            english: {
                rule: /^[A-Za-z]+$/,
                desc: "英文"
            },
        };

        var validQueue = [];

        function valid(type, value, desc, address, addressMsg) {
            if (reg[type]) {
                if (value && reg[type].rule.test(value)) {
                    return { "success": true, "msg": "" };
                } else {
                    var msg = "";
                    if (desc) {
                        msg = desc;
                    } else if (reg[type].desc) {
                        msg = (reg[type].desc.length < 7 ? "请输入正确的" + reg[type].desc : reg[type].desc);
                    }
                    return { "success": false, "msg": msg, "address": address, "addressMsg": addressMsg };
                }
            }
        }
        return {
            /**
             *
             * @param reg 判断规则
             * @param value 数值
             * @param desc 错误说明
             * @param address 错误的位置
             * @param addressMsg 错误说明的位置
             * @returns {API}
             */
            add: function (reg, value, desc, address, addressMsg) {
                validQueue.push({
                    reg: reg,
                    value: value,
                    desc: desc,
                    address: address == null ? "" : address,
                    addressMsg: addressMsg == null ? "" : addressMsg,
                });
                return this;
            },
            valid: function () {
                for (var index in validQueue) {
                    var content = valid(validQueue[index].reg, validQueue[index].value, validQueue[index].desc,
                        validQueue[index].address, validQueue[index].addressMsg);
                    if (false == content.success) {
                        validQueue = [];
                        return { "success": false, "msg": content.msg, "address": content.address, "addressMsg": content.addressMsg };
                    }
                }
                validQueue = [];
                return { "success": true, "msg": "" };
            }
        }
    },
    formGenerate: function () {
        var data = [];
        return {
            add: function (key, value) {
                data.push({
                    key: key,
                    value: value
                });
                return this;
            },
            generate: function () {
                var str = data[0].key + "=" + data[0].value;
                for (var i = 1; i < data.length; i++) {
                    if (data[i].value == null || data[i].value == 'null') {
                        data[i].value = '';
                    }
                    str += "&" + data[i].key + "=" + data[i].value;
                }
                data = [];
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }
        }
    },
    removeAllItem: function () {
        storage.removeItem("accoInfo");
        storage.removeItem("bankNo");
        storage.removeItem("certInfo");
        storage.removeItem("custtype");
        storage.removeItem("loginInfo");
        storage.removeItem("shareData");
        storage.removeItem("currentBankcard");
        storage.removeItem("bankList");
        storage.removeItem("fundList");
        storage.removeItem("tradeWayList");
        storage.removeItem("wayList");
        storage.removeItem("encashResult");
        storage.removeItem("chargeResult");


        storage.removeItem("buyResult");
        storage.removeItem("saleResult");
        storage.removeItem("targetFunds");
        storage.removeItem("transFund");

        storage.removeItem("mobile");
        storage.removeItem("cardAuthInfo");
        storage.removeItem("route");
        storage.removeItem("entrance");
        storage.removeItem("weixinData");
        storage.removeItem("tradePwdError");
        storage.removeItem("hasreadFlag"); //指数定投广告栏已读标记
        //storage.removeItem("pageRefresh");//用于页面刷新,现有fund-list,safe

        storage.removeItem("systemData");
        storage.removeItem("pickerData1");
        storage.removeItem("pageRefresh");
        storage.removeItem("notTipContractCard");
        storage.removeItem("moneyList");
        storage.removeItem("limit");
        storage.removeItem("homePagePopAds");
        storage.removeItem("home");
        storage.removeItem("historyList");
        storage.removeItem("fundcode");
        storage.removeItem("fixMoneyInfo");
        storage.removeItem("exponentcode");
        storage.removeItem("discover");
        storage.removeItem("applyPlacelolder");


    },
    callFailProcess: function (jsonResult) { /*服务调用失败操作*/
        Light.trigger("error", jsonResult);
    },
    analytics: function (attributes, jsonResult, eventName) { //埋点
        if (config.isAnalytics == "false") {
            return;
        }
        var event = "";
        if (attributes.c_theme == "register") { //注册
            if (eventName == "sendRegCodeByAcnt") {
                if (jsonResult.successful) { //获取手机注册验证码成功
                    event = "getRegisterSmsSuccess";
                } else { //获取手机注册验证码失败
                    event = "getRegisterSmsError";
                }
            } else if (eventName == "checkAuthCodeByAcnt") {
                if (jsonResult.successful) { //注册成功
                    event = "registerSuccess";
                } else { //注册失败
                    event = "registerError";
                }
            }
        } else if (attributes.c_theme == "openAccount") { //开户
            if (eventName == "queryCustType") {
                event = "checkCustType"; //验证客户类型
            } else if (eventName == "psmtSendMessageAuth") {
                if (jsonResult.successful) { //获取银行卡验证码成功
                    event = "getOpenAccountSmsSuccess";
                } else { //获取银行卡验证码失败
                    event = "getOpenAccountSmsError";
                }
            } else if (eventName == "psmtValMessageAuth") {
                if (jsonResult.successful) { //实名认证成功
                    event = "openAccountSuccess";
                } else { //实名认证失败
                    event = "openAccountError";
                }
            } else if (eventName == "addCustInfo") {
                event = "addCustInfo"; //个人资料提交
            } else if (eventName == "psmtOpenacco") {
                if (jsonResult.successful) { //交易密码添加成功
                    event = "setTradePwdSuccess";
                } else { //交易密码添加失败
                    event = "setTradePwdError";
                }
            } else if (eventName == "bindAccount") {
                if (jsonResult.successful) { //关联直销、代销用户成功
                    event = "relateCustSuccess";
                } else { //关联直销、代销用户失败
                    event = "relateCustError";
                }
            }
        } else if (attributes.c_theme == "trade") { //交易
            if (eventName == "buy020") {
                if (jsonResult.successful) { //认购成功
                    event = "confirmSuccess";
                } else { //认购失败
                    event = "confirmError";
                }
            } else if (eventName == "buy022") {
                if (jsonResult.successful) { //申购成功
                    event = "purchaseSuccess";
                } else { //申购失败
                    event = "purchaseError";
                }
            } else if (eventName == "sale") {
                if (jsonResult.successful) { //赎回成功
                    event = "redeemSuccess";
                } else { //赎回失败
                    event = "redeemError";
                }
            } else if (eventName == "charge") {
                if (jsonResult.successful) { //充值成功
                    event = "depositSuccess";
                } else { //充值失败
                    event = "depositError";
                }
            } else if (eventName == "encash") {
                if (jsonResult.successful) { //提现成功
                    event = "withdrawSuccess";
                } else { //提现失败
                    event = "withdrawError";
                }
            } else if (eventName == "trans") { //基金转换
                if (jsonResult.successful) { //转换成功
                    event = "convertSuccess";
                } else { //转换成功
                    event = "convertError";
                }
            }
        } else if (attributes.c_theme == "risk") { //风险测评
            if (eventName == "Risk") { //提交风险测评
                if (jsonResult.successful) { //
                    event = "submitRiskSuccess";
                } else { //提交失败
                    event = "submitRiskError";
                }
            } else if (eventName == "againRisk") {
                event = "modifyRisk"; //重新测评
            }
        } else if (attributes.c_theme == "search") { //搜索 、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
            event = "search";
        } else if (attributes.c_theme == "login") { //登录
            if (jsonResult.successful) {
                event = "loginSuccess";
            } else {
                event = "loginError";
            }
        } else if (attributes.c_theme == "favourFund") { //基金自选 删除自选
            if (jsonResult.successful) {
                if (eventName == "followChangeTrue") {
                    event = "addFavourFund";
                } else if (eventName == "followChangeFalse") {
                    event = "removeFavourFund";
                }
            }
        } else if (attributes.c_theme == "signAndCancelBank") { //获取银行卡验证码成功(绑卡)失败
            if (eventName == "psmtSendMessageAuth") {
                if (jsonResult.successful) {
                    event = "getAddBankCardSmsSuccess";
                } else {
                    event = "getAddBankCardSmsError";
                }
            } else if (eventName == "psmtAddCard") { //绑卡成功、失败
                if (jsonResult.successful) {
                    event = "addBankCardSuccess";
                } else {
                    event = "addBankCardError";
                }
            } else if (eventName == "psmtCloseTradeAcco") { //解绑成功失败
                if (jsonResult.successful) {
                    event = "removeBankCardSuccess";
                } else {
                    event = "removeBankCardError";
                }
            }
        } else if (attributes.c_theme == "fix") { //定投
            if (eventName == "fixDeclare") {
                if (jsonResult.successful) {
                    event = "addFixSuccess";
                } else {
                    event = "addFixError";
                }
            } else if (eventName == "fixCharge") { //心愿
                if (jsonResult.successful) {
                    event = "addWishSuccess";
                } else {
                    event = "addWishError";
                }
            }
        } else if (attributes.c_theme == "pwdManager") { //修改密码
            if (eventName == "modifyLoginPWD") { //修改登录密码
                if (jsonResult.successful) {
                    event = "modifyLoginPwdSuccess";
                } else {
                    event = "modifyLoginPwdErro";
                }
            } else if (eventName == "modifyPwd") { //修改交易密码
                if (jsonResult.successful) {
                    event = "modifyTradePwdSuccess";
                } else {
                    event = "modifyTradePwdError";
                }
            } else if (eventName == "resetLoginPwdCheckCode") { //找回密码
                if (jsonResult.successful) {
                    event = "resetLoginPwdSuccess";
                } else {
                    event = "resetLoginPwdError";
                }
            }
        } else if (attributes.c_theme == "homePageFund") { //首页
            if (eventName == "lcImgClick") { //推荐banner
                event = "recommendBanner";
            } else if (eventName == "xjbClick") { //现金宝
                event = "moneyFundForHomepage";
            } else if (eventName == "recommProds") { //热推
                event = "hotProduce";
            } else if (eventName == "themeRecommMatrix") { //推荐
                event = "recommendForHomepage";
            } else if (eventName == "discoverlcImg") { //精选banner
                event = "themesForBanner";
            } else if (eventName == "discoverItemClick") { //精选主题
                event = "themesForHomepage";
            }
        } else if (attributes.pageid == "fund") {
            event = "addpage";
        } else if (attributes.pageid == "historyvalue") {
            event = "addpage";
        } else if (attributes.pageid == "file") {
            event = "addpage";
        } else if (attributes.pageid == "managerchange") {
            event = "addpage";
        } else if (attributes.pageid == "rule") {
            event = "addpage";
        } else if (attributes.pageid == "add-fun") {
            event = "addpage";
        } else if (attributes.pageid == "apply") {
            event = "addpage";
        } else if (attributes.pageid == "redeem") {
            event = "addpage";
        } else if (attributes.pageid == "xjb-recharge") {
            event = "addpage";
        } else if (attributes.pageid == "xjbcash") {
            event = "addpage";
        } else if (attributes.pageid == "transform") {
            event = "addpage";
        }

        attributes.c_code = jsonResult.code;
        attributes.c_message = jsonResult.message;
        // attributes.channel = API.getChannelkey();

        var params = {
            "event": event,
            "attributes": attributes
        };

        if (API.matchNative()) {
            LightJSBridge.call("analytics.sendEvent", params, () => { });
        } else {
            // API.buriedPoint.buriedEvent(event,attributes);
        }
    },
    analyticsUserInfo(userId, userName, age, gender) {
        if (config.isAnalytics == "false") {
            return;
        }
        age == null ? "" : age;
        gender == null ? "" : gender;
        if (gender == "0") {
            gender = "M";
        } else if (gender == "1") {
            gender = "F";
        }
        if (API.matchNative()) {
            LightSDK.native.callNative("common.sendUserInfo", { "id": userId, "userName": userName, "age": age, "gender": gender }, () => { })
        } else {
            // API.buriedPoint.buriedUser(userId,userName,age,gender);
        }
    },
    buriedPoint: { //埋点
        buriedEvent: function (event, other) {
            Countly.q.push(['customEvent', {
                eventId: event,
                duration: "1000",
                userId: "",
                other: other
            }]);
        },
        buriedUser: function (userId, userName, age, gender) {
            Countly.q.push(['userinfo', {
                userId: userId,
                age: age,
                userName: userName,
                gender: gender,
                other: {}
            }]);
        }
    },
    previewFile(url) {
        LightSDK.native.filePreview({ url: url }, function () { })
    },
    systemState: function (callback) { //远程加载参数配置

        // storage.getItem("systemData", (e) => {
        //     function setSystemData(){
        //         var timestamp = (new Date()).valueOf();
        //         var url = config.homeAndDiscoverUrl;
        //         url = url +"system.json?_" + timestamp;
        //         stream.fetch({
        //             method: 'GET',
        //             url: url,
        //             type:"json"
        //         }, function (res) {

        //             var content = res.data;


        //             if (!content.successful) {//系统维护
        //                 Light.navigate('maintenance', {}, {headHidden: true});
        //             }else{
        //                 content.newRefreshTime = parseInt(API.hsTools.formatDate("","yyyyMMddhhmm"));
        //                 storage.setItem("systemData", JSON.stringify(content));// 设置系统参数
        //             }
        //             if(callback){
        //                 callback(content);
        //             }
        //         });
        //     }
        //     if (e.data != "undefined") {//缓存存在,判断是否超时
        //         var systemData = JSON.parse(e.data);
        //         if((parseInt(API.hsTools.formatDate("","yyyyMMddhhmm")) - parseInt(systemData.newRefreshTime))
        //             > systemData.refreshTime){
        //             setSystemData();
        //         }else{
        //             if(callback){
        //                 callback(systemData)
        //             }
        //         }
        //     }else{
        //         setSystemData();
        //     }
        // });
    },
    hsTools: {
        accurateAdd: function (num1, num2) { // 高精度浮点数加法
            var r1, r2, m;
            try {
                r1 = num1.toString().split('.')[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = num2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return Math.round(num1 * m + num2 * m) / m;
        },
        accurateMul: function (arg1, arg2) { // 高精度浮点数乘法
            var m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            if (s1.split(".").length == 2) {
                m += s1.split(".")[1].length;
            }
            if (s2.split(".").length == 2) {
                m += s2.split(".")[1].length;
            }
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },
        recoveryMoney: function (val) { //把含有千分位的金额值替换成数值
            return val.toString().replace(/,/g, '');
        },
        getyyyymmddfromDate: function (odate, pass) {
            pass = !!pass ? parseInt(pass) : 0;
            if (!odate) {
                odate = new Date(new Date().getTime() + pass * 24 * 60 * 60 * 1000);
            } else {
                odate = new Date(odate.getTime() + pass * 24 * 60 * 60 * 1000);
            }
            var yyyy = odate.getFullYear();
            var mm = (odate.getMonth() + 1) > 9 ? (odate.getMonth() + 1).toString() : '0' + (odate.getMonth() + 1);
            var dd = odate.getDate() > 9 ? odate.getDate().toString() : '0' + odate.getDate();
            return yyyy + mm + dd;
        },
        getSexFromCard: function (identityno) {
            var sex = 0;
            if (identityno.length == 15) {
                sex = identityno.substr(13, 1);
            } else if (identityno.length == 18) {
                sex = identityno.substr(16, 1);
            }
            return sex % 2;
        },
        getBirthdayFromCard: function (identityno) {
            var year;
            var month;
            var day;
            if (identityno.length == 15) {
                year = "19" + identityno.substr(6, 2);
                month = identityno.substr(8, 2);
                day = identityno.substr(10, 2);
            } else if (identityno.length == 18) {
                year = identityno.substr(6, 4);
                month = identityno.substr(10, 2);
                day = identityno.substr(12, 2);
            }
            return year + "-" + month + "-" + day;
        },
        getAgeFromCard: function (identityno) {
            //获取年龄
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - identityno.substring(6, 10) - 1;
            if (identityno.substring(10, 12) < month || identityno.substring(10, 12) == month && identityno.substring(12, 14) <= day) {
                age++;
            }
            return age;
        },
        getAgeFromDate: function (date) {
            //获取年龄
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - date.substring(0, 4) - 1;
            if (date.substring(4, 6) < month || date.substring(4, 6) == month && date.substring(6, 8) <= day) {
                age++;
            }
            return age;
        },
        maskCardCenter: function (str) {
            if (str.length > 8) {
                return str.substr(0, 4) + " **** **** " + str.substr(str.length - 4, 4);
            } else {
                return str
            }
        },
        maskCardHead: function (str) {
            return str.length > 4 ? str.substr(str.length - 4, 4) : str;
        },
        formatMoney: function (val) { //格式化金额
            val = val.toString();
            var mSymbol = "";
            if (!!val && (val.substr(0, 1) == "-" || val.substr(0, 1) == "+")) {
                mSymbol = val.substr(0, 1);
                val = val.substr(1, val.length - 1);
            }
            var arrayVal = val.toString().replace(/,/g, '');
            arrayVal = arrayVal.split(".");
            if (arrayVal[1] == undefined) {
                arrayVal[1] = "00";
            }
            var num = (arrayVal[0]) ? arrayVal[0].toString() : '',
                cent = (typeof arrayVal[1] != "undefined") ? "." + arrayVal[1] : "",
                moneyNum = '',
                result = '';

            cent = cent.substr(0, 3);

            while (num.length > 3) {
                moneyNum = ',' + num.slice(-3) + moneyNum;
                num = num.slice(0, num.length - 3);
            }
            if (num) {
                result = num + moneyNum + cent;
            }
            return mSymbol + result;
        },
        // 两个浮点数求和
        accAdd: function (num1, num2) {
            var r1, r2, m;
            try {
                r1 = num1.toString().split('.')[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = num2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            // return (num1*m+num2*m)/m;

            return Math.round(num1 * m + num2 * m) / m;
        },

        // 两个浮点数相减
        accSub: function (num1, num2) {
            var r1, r2, m, n;
            try {
                r1 = num1.toString().split('.')[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = num2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            n = (r1 >= r2) ? r1 : r2;
            return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
        },

        // 两个浮点数相除
        accDiv: function (num1, num2) {
            var t1, t2, r1, r2;
            try {
                t1 = num1.toString().split('.')[1].length;
            } catch (e) {
                t1 = 0;
            }
            try {
                t2 = num2.toString().split(".")[1].length;
            } catch (e) {
                t2 = 0;
            }
            r1 = Number(num1.toString().replace(".", ""));
            r2 = Number(num2.toString().replace(".", ""));
            return (r1 / r2) * Math.pow(10, t2 - t1);
        },

        // 两个浮点数相乘
        accMul: function (num1, num2) {
            var m = 0,
                s1 = num1.toString(),
                s2 = num2.toString();
            try {
                m += s1.split(".")[1].length
            } catch (e) { };
            try {
                m += s2.split(".")[1].length
            } catch (e) { };
            return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        },

        keepTwoDecimalFull: function (num) {
            var result = parseFloat(num);
            if (isNaN(result)) {
                // alert('传递参数错误，请检查！');
                return false;
            }
            result = Math.round(num * 100) / 100;
            var s_x = result.toString();
            var pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2) {
                s_x += '0';
            }
            return s_x;
        },

        HH_MM_SS: function (HHMMSS, option) { // 将HHMMSS格式化为HH:MM:SS
            option = option || "HH:MM:SS";
            if (typeof HHMMSS == "string") {
                if (option == "HH:MM:SS") {
                    return HHMMSS.substr(0, 2) + ":" + HHMMSS.substr(2, 2) + ":" + HHMMSS.substr(4, 2);
                } else if (option == "HH:MM") {
                    return HHMMSS.substr(0, 2) + ":" + HHMMSS.substr(2, 2);
                }
            } else {
                return HHMMSS || "--";
            }
        },
        yyyy_mm_dd: function (yyyymmdd, symbo) { // 将yyyymmddd格式化为yyyy-mm-dd
            var symbo = symbo || "-"
            if (typeof yyyymmdd == "string") {
                return yyyymmdd.substr(0, 4) + symbo + yyyymmdd.substr(4, 2) + symbo + yyyymmdd.substr(6, 2);
            } else if (yyyymmdd instanceof Date) {
                var year = yyyymmdd.getFullYear();
                var month = yyyymmdd.getMonth() + 1;
                var strDate = yyyymmdd.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                return year + symbo + month + symbo + strDate;
            } else {
                return yyyymmdd || "--";
            }
        },
        mm_dd: function (yyyymmdd) { //时间格式化
            if (typeof yyyymmdd == "string") {
                return yyyymmdd.substr(4, 2) + "-" + yyyymmdd.substr(6, 2);
            } else {
                return yyyymmdd || "--";
            }
        },
        mm_dd_other: function (yyyymmdd) { //时间格式化
            if (typeof yyyymmdd == "string") {
                return yyyymmdd.substr(4, 2) + "/" + yyyymmdd.substr(6, 2);
            } else {
                return yyyymmdd || "--";
            }
        },
        getBankPicName: function (key) {
            if (key == "920") {
                return "pingan"
            } else if (key == "934") {
                return "youchu"
            } else if (key == "002") {
                return "icbc"
            } else if (key == "003") {
                return "abc"
            } else if (key == "004") {
                return "boc"
            } else if (key == "005") {
                return "ccb"
            } else if (key == "006") {
                return "bocom"
            } else if (key == "007") {
                return "cmb"
            } else if (key == "009") {
                return "ceb"
            } else if (key == "011") {
                return "spdb"
            } else if (key == "012") {
                return "hxb"
            } else if (key == "014") {
                return "cmbc"
            } else if (key == "015") {
                return "ecitic"
            } else if (key == "016") {
                return "guangfa"
            } else if (key == "017") {
                return "shb"
            } else if (key == "020") {
                return "xy"
            } else if (key == "907") {
                return "wzb"
            } else if (key == "904") {
                return "njcb"
            } else if (key == "903") {
                return "shnc"
            } else if (key == "905") {
                return "jhb"
            } else if (key == "951") {
                return "zsb"
            }
        },
        formatDateSelect(date) {
            var yyyymmdd = date.split("-");
            if (parseInt(yyyymmdd[1]) < 10) {
                yyyymmdd[1] = "0" + yyyymmdd[1];
            }
            if (parseInt(yyyymmdd[2]) < 10) {
                yyyymmdd[2] = "0" + yyyymmdd[2];
            }
            date = yyyymmdd[0] + yyyymmdd[1] + yyyymmdd[2];
            return date;
        },
        /**
         * 日期格式化
         * date: 日期或日期字符串
         * fmt: 日期格式字符串
         */
        formatDate(date, fmt = 'yyyy-MM-dd') {
            if (!date) date = new Date();
            if (typeof date === 'string') date = new Date(date.replace(/(\d{4})[^\d]?(\d{2})[^\d]?(\d{2})/, '$1/$2/$3'));
            var o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds(),
                'q+': Math.floor((date.getMonth() + 3) / 3),
                'S': date.getMilliseconds()
            };
            var week = {
                '0': '\u65e5',
                '1': '\u4e00',
                '2': '\u4e8c',
                '3': '\u4e09',
                '4': '\u56db',
                '5': '\u4e94',
                '6': '\u516d'
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + '']);
            }
            for (const k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                }
            }
            return fmt;
        },
        /**
         * 将js对象拼接为转换成字符串
         * @param {*} obj
         */
        queryStringify(obj) {
            var arr = [];
            if (typeof obj === 'object') {
                for (var key in obj) {
                    arr.push(key + '=' + obj[key]);
                }
                return arr.join('&');
            }
            return obj
        },
        matchIncName: function (typeinc) {
            var incname = "";
            if ("dayinc" == typeinc) {
                incname = "日涨跌幅";
            } else if ("weekinc" == typeinc) {
                incname = "最近一周涨跌幅";
            } else if ("monthinc" == typeinc) {
                incname = "最近一个月涨跌幅";
            } else if ("seasonhinc" == typeinc) {
                incname = "最近三个月涨跌幅";
            } else if ("halfyearhinc" == typeinc) {
                incname = "最近半年涨跌幅";
            } else if ("thisyearinc" == typeinc) {
                incname = "今年以来涨跌幅";
            } else if ("yearinc" == typeinc) {
                incname = "最近一年涨跌幅";
            } else if ("twoyearinc" == typeinc) {
                incname = "最近两年涨跌幅";
            } else if ("threeyearinc" == typeinc) {
                incname = "最近三年涨跌幅";
            } else if ("setupinc" == typeinc) {
                incname = "成立以来";
            } else if ("hfincomeratio" == typeinc) {
                incname = "万份收益";
            } else if ("incomeratio" == typeinc) {
                incname = "七日年化";
            } else if ("pernetvalue" == typeinc) {
                incname = "单位净值";
            } else if ("income_rate1y" == typeinc) {
                incname = "最近一年定投收益率";
            } else if ("income_rate2y" == typeinc) {
                incname = "最近二年定投收益率";
            } else if ("income_rate3y" == typeinc) {
                incname = "最近三年定投收益率";
            }
            return incname;
        },
        decimal: function (x, s) {
            var f = parseFloat(x);
            if (isNaN(f)) {
                return "--"
            } else {
                return parseFloat(x).toFixed(s);
            }
        },
        funDate: function (aa) {
            var date1 = new Date();
            var month = date1.getMonth() + 1;
            var strDate = date1.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var time1 = date1.getFullYear() + "" + month + "" + strDate;

            var date2 = new Date(date1);
            date2.setDate(date1.getDate() + aa);
            var month = date2.getMonth() + 1;
            var strDate = date2.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var time2 = date2.getFullYear() + "" + month + "" + strDate;
            return { today: time1, afterDay: time2 };
        },
        datedifference(sDate1) { //计算一个时间点距离今天的天数,格式为 xxxx-xx-xx
            var dateSpan,
                iDays,
                sDate2;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(new Date());
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays
        },
        decimal2: function (x) {
            var f = parseFloat(x);
            if (isNaN(f)) {
                return "--"
            } else {
                return parseFloat(x).toFixed(2);
            }
        },
        decimal4: function (x) {
            var f = parseFloat(x);
            if (isNaN(f)) {
                return "--"
            } else {
                return parseFloat(x).toFixed(4);
            }
        },
        dateToch: function (d) {
            var darray = d.split("-");
            return darray[0] + "年" + darray[1] + "月" + darray[2] + "日";
        },
        // accurateMul: function(arg1, arg2) {
        //     var m = 0,
        //         s1 = arg1.toString(),
        //         s2 = arg2.toString();
        //     if (s1.split(".").length == 2) {
        //         m += s1.split(".")[1].length;
        //     }
        //     if (s2.split(".").length == 2) {
        //         m += s2.split(".")[1].length;
        //     }
        //     return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
        // },
        inArray: function in_array(stringToSearch, arrayToSearch) {
            for (var s = 0; s < arrayToSearch.length; s++) {
                var thisEntry = arrayToSearch[s].toString();
                if (thisEntry == stringToSearch) {
                    return true;
                }
            }
            return false;
        }
    }
};
API.route = Route;
export default API;