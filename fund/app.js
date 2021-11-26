import App from "light"
import Config from "./config"
let index = App.navigate;
App.navigate = function(url, data, params) {
    console.log('eeeeee')
    url = "index/" + url;
    if (process.env.RUNTIME === 'native' && params.replace == true) {
        url = '/' + url;
    }
    index.call(this, url, data, params)
};
App.Vue.mixin({
    data() {
        return {
            bundleJS: 'empty'
        }
    },
    mounted() {
        // this.bundleJS = JSON.stringify(__base__);
    },
})
App.filter("start", function(next) {
    next()
}).filter("route", function(from, to, next) {
    next()
}).start();


function loadConfig(url, timeout = 1000) {
    return new Promise((resolve) => {
        App.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                timeout: timeout,
                data: {},
                headers: {},
                success: function(res) {
                    console.log(res)
                        // if (res.data == null) {
                        // 	console.error("配置文件加载失败，请检查config.json是否格式正确")
                        // }
                    let config = res.ok && res.data ? res.data : {};
                    // 深度赋值到原配置文件，相同字段会被覆盖
                    function deepMerge(config1, config2) {
                        var result = config1;
                        for (let key in config2) {
                            if (typeof result[key] === 'object' && typeof config2[key] === 'object') {
                                result[key] = deepMerge(result[key], config2[key]);
                            } else if (typeof config2[key] === 'object') {
                                result[key] = deepMerge({}, config2[key]);
                            } else {
                                if (typeof result[key] === 'string') {
                                    if (config2[key]) { // 字符串值不为空才覆盖
                                        result[key] = config2[key];
                                    }
                                } else {
                                    result[key] = config2[key];
                                }
                            }
                        }
                        return result;
                    }
                    deepMerge(Config, config)
                    resolve(Config);
                }
            },
            // function (res) {
            // 	if (res.data == null) {
            // 	console.error("配置文件加载失败，请检查config.json是否格式正确")
            // 	}
            // 	let config = res.ok && res.data ? res.data : {};
            // 	// 深度赋值到原配置文件，相同字段会被覆盖
            // 	function deepMerge(config1, config2) {
            // 	var result = config1;
            // 		for(let key in config2 ){
            // 		if (typeof result[key] === 'object' && typeof config2[key] === 'object') {
            // 		result[key] = deepMerge(result[key], config2[key]);
            // 		} else if (typeof config2[key] === 'object') {
            // 		result[key] = deepMerge({}, config2[key]);
            // 		} else {
            // 		if (typeof result[key] === 'string') {
            // 			if (config2[key]) { // 字符串值不为空才覆盖
            // 			result[key] = config2[key];
            // 			}
            // 		} else {
            // 			result[key] = config2[key];
            // 		}
            // 		}
            // 	}
            // 	return result;
            // 	}
            // 	deepMerge(Config, config)
            // 	resolve(Config);
            // 	// 加载配置文件失败
            // }
        )
    })
}