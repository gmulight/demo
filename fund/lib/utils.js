
import UrlParser from 'url-parse';
import Light from 'light';
var lg;
if (process.env.RUNTIME === "miniapp") {
    lg = __base__;
} else {
    lg = weex;
}
const Utils = {
    UrlParser: UrlParser,
    _typeof(obj) {
        return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    },
    isPlainObject(obj) {
        return Utils._typeof(obj) === 'object';
    },
    isString(obj) {
        return typeof (obj) === 'string';
    },
    isNonEmptyArray(obj = []) {
        return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined';
    },
    isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    },
    isEmptyObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    },
    mergeDeep(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();
        if (Utils.isObject(target) && Utils.isObject(source)) {
            for (const key in source) {
                if (Utils.isObject(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, {
                            [key]: {}
                        });
                    }
                    Utils.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        return Utils.mergeDeep(target, ...sources);
    },
    appendProtocol(url) {
        if (/^\/\//.test(url)) {
            const {
        bundleUrl
      } = lg.config;
            return `http${/^https:/.test(bundleUrl) ? 's' : ''}:${url}`;
        }
        return url;
    },
    encodeURLParams(url) {
        const parsedUrl = new UrlParser(url, true);
        return parsedUrl.toString();
    },
    goToH5Page(jumpUrl, animated = false, callback = null) {
        const Navigator = Light.requireModule('navigator')
        if (/^(https|http):\/\//.test(jumpUrl)) {
            const jumpUrlObj = new Utils.UrlParser(jumpUrl, true);
            const url = Utils.appendProtocol(jumpUrlObj.toString());
            Navigator.push({
                url: url,
                animated: animated
            }, callback);
        } else {
            // params = params || {};
            if (jumpUrl.indexOf('#/') === 0) {
                jumpUrl = jumpUrl.substring(1);
            } else {
                jumpUrl = `/${jumpUrl}`;
            }
            let query = '';
            // if (params != {}) {
            //   query = '?';
            //   Object.keys(params).forEach(function (key) {
            //     query += `${key}=${secodeURIComponent(params[key])}&`;
            //   })
            //   query.substring(0, query.length - 2);
            // } else {
            //   query = '';
            // }
            var finalUrl = `${lg.config.bundleUrl.split('#')[0]}#${jumpUrl}${query}`;

            Navigator.push({
                url: finalUrl,
                animated: animated
            }, callback);
        }
    },
    
    env: {
        isTaobao() {
            const { appName } = lg.config.env;
            return /(tb|taobao|??????)/i.test(appName);
        },
        isTrip() {
            const { appName } = lg.config.env;
            return appName === 'LX';
        },
        isWeb() {
            const { platform } = lg.config.env;
            return typeof (window) === 'object' && platform.toLowerCase() === 'web';
        },
        isIOS() {
            const { platform } = lg.config.env;
            return platform.toLowerCase() === 'ios';
        },
        /**
         * ????????? iPhone X
         * @returns {boolean}
         */
        isIPhoneX() {
            const { deviceHeight } = lg.config.env;
            if (Utils.env.isWeb()) {
                return typeof window !== undefined && window.screen && window.screen.width && window.screen.height && (parseInt(window.screen.width, 10) === 375) && (parseInt(window.screen.height, 10) === 812);
            }
            return Utils.env.isIOS() && deviceHeight === 2436;
        },
        isAndroid() {
            const { platform } = lg.config.env;
            return platform.toLowerCase() === 'android';
        },
        isAlipay() {
            const { appName } = lg.config.env;
            return appName === 'AP';
        },
        isAlipayWeb() {
            return Utils.env.isAlipay() && Utils.env.isWeb();
        },
        supportsEB() {
            const weexVersion = lg.config.env.weexVersion || '0';
            const isHighWeex = Utils.compareVersion(weexVersion, '0.10.1.4') && (Utils.env.isIOS() || Utils.env.isAndroid());
            const expressionBinding = Light.requireModule('expressionBinding');
            return expressionBinding && expressionBinding.enableBinding && isHighWeex;
        },

        /**
         * ??????Android??????????????????????????????expressionBinding(????????????????????????)
         * @returns {boolean}
         */
        supportsEBForAndroid() {
            return (Utils.env.isAndroid()) && Utils.env.supportsEB();
        },

        /**
         * ??????IOS??????????????????????????????expressionBinding
         * @returns {boolean}
         */
        supportsEBForIos() {
            return (Utils.env.isIOS()) && Utils.env.supportsEB();
        },

        /**
         * ??????weex?????????????????????????????????????????????????????????
         * @returns {Number}
         */
        getPageHeight() {
            const { env } = lg.config;
            const navHeight = Utils.env.isWeb() ? 0 : (Utils.env.isIPhoneX() ? 176 : 132);
            return env.deviceHeight / env.deviceWidth * 750 - navHeight;
        },

        getDeviceHeight() {
            const { env } = lg.config;
            return env.deviceHeight;
        },

        getDeviceWidth() {
            const { env } = lg.config;
            return env.deviceWidth;
        }
    },

    /**
     * ???????????????
     * @memberOf Utils
     * @param currVer {string}
     * @param promoteVer {string}
     * @returns {boolean}
     * @example
     *
     * const { Utils } = require('@ali/wx-bridge');
     * const { compareVersion } = Utils;
     * console.log(compareVersion('0.1.100', '0.1.11')); // 'true'
     */
    compareVersion(currVer = '0.0.0', promoteVer = '0.0.0') {
        if (currVer === promoteVer) return true;
        const currVerArr = currVer.split('.');
        const promoteVerArr = promoteVer.split('.');
        const len = Math.max(currVerArr.length, promoteVerArr.length);
        for (let i = 0; i < len; i++) {
            const proVal = ~~promoteVerArr[i];
            const curVal = ~~currVerArr[i];
            if (proVal < curVal) {
                return true;
            } else if (proVal > curVal) {
                return false;
            }
        }
        return false;
    },
    /**
     * ????????????
     * @param arr ???????????????
     * @param size ?????????????????????
     * @returns {Array}
     */
    arrayChunk(arr = [], size = 4) {
        let groups = [];
        if (arr && arr.length > 0) {
            groups = arr.map((e, i) => {
                return i % size === 0 ? arr.slice(i, i + size) : null;
            }).filter(e => {
                return e;
            });
        }
        return groups;
    },
    truncateString(str, len, hasDot = true) {
        let newLength = 0;
        let newStr = '';
        let singleChar = '';
        const chineseRegex = /[^\x00-\xff]/g;
        const strLength = str.replace(chineseRegex, '**').length;
        for (let i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) !== null) {
                newLength += 2;
            } else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }

        if (hasDot && strLength > len) {
            newStr += '...';
        }
        return newStr;
    }
};

export default Utils;
