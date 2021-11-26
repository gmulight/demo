var native = function() {
  const bus = new BroadcastChannel('bus');
  var result = null;
  var channelProc = {};
  var pageChannel = h5(); // 因broadcastchannel 本页面无效
  bus.onmessage = function(event) {
    var cb = channelProc[event.data.channel];
    cb && cb(event.data.value, event.data.channel);
  }
  result = {
    send: function(channel, obj) {
      bus.postMessage({
        channel: channel,
        value: obj
      })
      pageChannel.send(channel, obj);
    },
    receive: function(channel, cb) {
      channelProc[channel] = cb;
      pageChannel.receive(channel, cb);
    }
  };
  return result;
};

var h5 = function() { // spa内自定义广播
  var eventList = [];
  return {
    send: function(key, info, h5enable) {
      if (h5enable) {
        if (eventList[key]) {
          eventList[key].forEach((fn) => {
            fn(info);
          });
        }
      }
    },
    receive: function(key, fn, h5enable) {
      if (h5enable) {
        eventList[key] || (eventList[key] = []);
        eventList[key].push(fn);
      }
    },
  };
};
var lg;
if (process.env.RUNTIME === "miniapp") {
  lg = __base__;
} else {
  lg = weex;
}
let module = null;
let platform = lg.config.env.platform;
if (platform == "android" || platform == "iOS") {
  module = native();
} else {
  module = h5();
}
export default module;