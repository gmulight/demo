import App from "light"
import DevicePlugin from "./plugins/device/index.js"
import Native from "./utils/native"

require("./lib/px2rem");
require("./app.less");

let Vue = App.Vue;

Vue.use(DevicePlugin)

App.filter("start",function (next) {
    //启动拦截器
    App.log("app started...");
    next();
}).filter("route",function (from, to, next) {
    //视图拦截器
    App.log(`view changed:${from.path}--${to.path}`);
    next()
}).start();