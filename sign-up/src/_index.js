
    import "../src/app.wxss"
    import config from "../src/app.json"
    require('../src/versionCheck.js')
    App.weappConfig = config;
    require("../src/app.js");
    Page.weappRoute="pages/signup/signup"
Page.weappPage=require("E:/客户代码/baoming-mini/light-mini/src/pages/signup/signup.wxml");
Component.weappRoute="pages/signup/signup"
Component.weappComponent=require("E:/客户代码/baoming-mini/light-mini/src/pages/signup/signup.wxml");
require('../src/pages/signup/signup.wxss');
Page.weappConfig = require('../src/pages/signup/signup.json');
require('../src/pages/signup/signup.js');
Page.weappRoute="pages/baoming/baoming"
Page.weappPage=require("E:/客户代码/baoming-mini/light-mini/src/pages/baoming/baoming.wxml");
Component.weappRoute="pages/baoming/baoming"
Component.weappComponent=require("E:/客户代码/baoming-mini/light-mini/src/pages/baoming/baoming.wxml");
require('../src/pages/baoming/baoming.wxss');
Page.weappConfig = require('../src/pages/baoming/baoming.json');
require('../src/pages/baoming/baoming.js');
