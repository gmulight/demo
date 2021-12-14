
const ua = navigator.userAgent
const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua)
const isIOS = /(iPhone\sOS)\s([\d_]+)/.test(ua)

window.appForward = function(param){
  param = JSON.stringify(param);
  if(isAndroid){
      if(window.action != null&&window.action.forward!=null){
          window.action.forward(param);
      }else{
          var interval = setInterval(function(){
              if(window.action != null&&window.action.forward!=null){
                  window.action.forward(param);
                  clearInterval(interval);
              }
          },100);
          setTimeout(function(){
              clearInterval(interval);
          },3000);
      }
  }else if(isIOS){
      if(window.forward != null){
          window.forward(param);
      }else{
          var interval = setInterval(function(){
              if(window.forward != null){
                  window.forward(param);
                  clearInterval(interval);
              }
          },100);
          setTimeout(function(){
              clearInterval(interval);
          },3000);
      }
  }else{
      alert('请使用App查看本页！');
  }
}

// window.forward({
//   type:1,
//   pageId: '1-21-5-2',
//   param: 'fund_code=123456&login_flag=2',
//   callback: 'function'
//   callbackParam: {data: 'xxx'}
// });
// native页面跳转

//暴露在window中，供app调用
window.appCallback  = {
  
}