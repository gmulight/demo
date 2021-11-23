require('./libs/Mixins.js');

const themeListeners = [];

__base__.DEBUG_MODE = true;
__base__.DEBUG_SHOW_NETWORK_INFO = true;
App({
    globalData: {
        theme: 'light', // dark
    },
    themeChanged(theme) {
        this.globalData.theme = theme;
        themeListeners.forEach((listener) => {
            listener(theme);
        });
    },
    watchThemeChange(listener) {
        if (themeListeners.indexOf(listener) < 0) {
            themeListeners.push(listener);
        }
    },
    unWatchThemeChange(listener) {
        const index = themeListeners.indexOf(listener);
        if (index > -1) {
            themeListeners.splice(index, 1);
        }
    },
});