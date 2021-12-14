Page({
    data: {},
    onLoad: function() {
        var appInstance = getApp();
        var queryStr = JSON.stringify(appInstance.globalData.queryParams);
        if (queryStr.length > 4) {
            wx.showModal({
                title: '传递参数',
                content: JSON.stringify(appInstance.globalData.queryParams),
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                }
            });
        }
    },
})