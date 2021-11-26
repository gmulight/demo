<template>
    <lc-popup popup-color="rgb(255, 255, 255)"
            ref="popup"
            :show="show"
            pos="bottom"
            @LcPopupOverlayClicked="popupOverlayBottomClick"
            :height="height">
        <div class="container" :style="{height:(height)+'px'}">
            <div class="popup-title">
                <image class="icon-close" src="images/close.png" @click.stop="closePopup"></image>
                <text class="popup-text">{{title}}</text>
            </div>
            <div style="flex:1;position:relative;">
                <slot name="content"></slot>
            </div>
        </div>
    </lc-popup>
</template>

<style scoped>
.popup-title{
    height: 100px;
    margin-left: 40px;
    margin-right: 40px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom-width: 1px;
    border-bottom-color: #3c94fe;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width:670px;
}
.icon-close{
    position: absolute;
    left: 0px;
    top: 35px;
    width: 30px;
    height: 30px;
}
.popup-text{
    font-size: 28px;
    color: #333;
}
.container{
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    flex-direction: column;
}
</style>

<script>
    import LcPopup from 'lighting-ui/packages/lc-popup';

    export default {
        name: "popup",
        components: { LcPopup },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: '提示'
            },
            height: {
                type: Number,
                default: 800
            },
        },
        computed:{

        },
        methods:{
            closePopup(){
                this.$emit('closeClicked');
            },
            popupOverlayBottomClick(){
                this.$emit('overlayClicked');
            },
            hide(){
                this.$refs.popup.hide();
            }   
        }
    };
</script>
