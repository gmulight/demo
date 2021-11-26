<template>
    <div style="width: 750px;height: 300px;" >
        <web style="width: 750px;height: 300px;" @pagefinish="onPageFinish" src="canvas-wrap/index.html" ref="webview"></web>
    </div>
</template>

<script>
    let fin = []
    import Light from "light";
    export default {
        methods:{
            draw(cmmand){
                const that = this;
                fin=[];
                fin.push(function () {
                    if(process.env.RUNTIME==="native"){
                        var webview = Light.requireModule('webview');
                        webview.loadScript(this.$refs.webview,cmmand);
                    }else{
                        that.$refs.webview.$el.contentWindow.postMessage(cmmand,'*')
                    }
                })
                that.onPageFinish();
            },
            onPageFinish(){
                const that = this;
                fin.forEach(function (f) {
                    f.call(that)
                })
            }
        }
    }
</script>