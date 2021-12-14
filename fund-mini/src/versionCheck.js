try {
  App;
} catch (e)  {
  global.__thread__.triggerEvent = function (type, params) {
    let { path, pageId } = params;
    if (type === "navigate") {
      let patch = `
      let el = document.createElement('div');
      el.innerHTML = \`<style type="text/css">
      .popup {
        font-size:5.5vw;
        height:100%;
        text-align: center
      }
      .popup-overlay {
        color: #ccc;
        background: rgb(255, 255, 255);
        position: absolute;
        left: 0;
        right: 0;
        top: 20%;
        bottom: 0;
        margin: 0 7%
      }
    </style>
    <div id="popup_default" class="popup">
      <div class="popup-overlay">
      尊敬的用户，您的应用版本过低，无法打开页面，请升级应用
      </div>
    </div>\`;
      document.body.insertAdjacentElement('afterbegin', el);
      `;
      __base__.postPatch(patch, pageId);
    }
  };
}
