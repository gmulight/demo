const isWeex = typeof WXEnvironment !== 'undefined';
const isWeexIOS = isWeex && /ios/i.test(WXEnvironment.platform);

import GContext2D from '../context-2d/RenderingContext';
import GContextWebGL from '../context-webgl/RenderingContext';

export default class GCanvas {

    // static GBridge = null;

    id = null;

    _needRender = true;

    constructor(id, { disableAutoSwap }) {
        this.id = id;

        this._disableAutoSwap = disableAutoSwap;
        if (disableAutoSwap) {
            this._swapBuffers = () => {
                GCanvas.GBridge.render(this.id);
            }
        }
    }

    getContext(type) {

        let context = null;

        if (type.match(/webgl/i)) {
            context = new GContextWebGL(this);

            context.componentId = this.id;

            if (!this._disableAutoSwap) {
                const render = () => {
                    if (this._needRender) {
                        GCanvas.GBridge.render(this.id);
                        this._needRender = false;
                    }
                }
                setInterval(render, 16);
            }

            GCanvas.GBridge.callSetContextType(this.id, 1); // 0 for 2d; 1 for webgl
        } else if (type.match(/2d/i)) {
            context = new GContext2D(this);

            context.componentId = this.id;

            const render = () => {

                const commands = context._drawCommands;
                if (isWeexIOS) {
                    // GCanvas.GBridge.hasEnterBackground((result) => {
                    // if (!result) {
                    context._drawCommands = '';
                    GCanvas.GBridge.render2d(this.id, commands);
                    this._needRender = false;
                    // }
                    // })
                }
                else {
                    context._drawCommands = '';
                    GCanvas.GBridge.render2d(this.id, commands);
                    this._needRender = false;
                }
            }
            setInterval(render, 16);

            GCanvas.GBridge.callSetContextType(this.id, 0);
        } else {
            throw new Error('not supported context ' + type);
        }

        return context;

    }

    reset() {
        GCanvas.GBridge.callReset(this.id);
    }


}