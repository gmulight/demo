const that = this;

this.global = this;

function initial(params) {
  __base__.bundleUrl = "http://" + params.host + "/app.miniapp.js",
  importScripts("../app.miniapp.js");
  __thread__.triggerEvent("onLaunch", { path:'/index', pageId: "0"});
  __thread__.triggerEvent("onMiniAppShow", { path:'/index', pageId: "0", query: '', referrerInfo: {}, scene: 1037 });
  // __thread__.triggerEvent("onMiniAppHide", { path:'/index', pageId: "0" });
  const pathCheck = /\?path=([^&]*)&query=([^]*)/gi.exec(params.search);
  let path =  App.weappConfig.pages[0];
  if (pathCheck) {
    path = pathCheck[1]+"?"+decodeURIComponent(pathCheck[2]);
  }
  __thread__.triggerEvent("navigate", { path, pageId: "0"});
}

__base__ = {
  config: {
    env: {
      container: "miniapp",
      platform: "web"
    },
  },
  postPatch(patch, pageId) {
    postMessage({
      type: "patch",
      content: {
        patch,
        pageId,
      },
    });
  },
};

importScripts("./util/util.js")
importScripts("./core/miniapp.thread.js");
importScripts('./worker/LightJSBridge.js')
onmessage = function (e) {
  if (e.data.type === "start") {
    initial(e.data);
  } else if (e.data.type === "event") {
    eval(e.data.script);
  } else if(e.data.type === "api") {
    eval(translateToNoSlashString(e.data.script))
  } else if(e.data.type === "sync"){
    sync(e.data.api,translateToNoSlashString(e.data.data))
  }
};

location.reload = function () {
  postMessage({
    type: "patch",
    content: {
      patch: `location.reload()`,
    },
  });
};
