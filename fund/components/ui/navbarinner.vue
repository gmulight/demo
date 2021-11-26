<template>
    <div class="navbar-content">
        <div class="menu-top flex-row align-center">
            <div class="align-start justify-center" style="width: 140px;">
                <!--<div v-if="leftBtnShow" @click="goBack()">-->
                    <!--<image src="images/left-icon.png" class="icon-back"></image>-->
                <!--</div>-->
            </div>
            <div class="nav-title flex-1">
                <template v-if="!!subTitle">
                    <div class="flex-row justify-center">
                        <text class="font-18 m-color-3" style="height: 45px;line-height: 45px">{{title}}</text>
                        <text class="font-12 m-color-9" style="height: 45px;line-height: 45px"> {{subTitle}}</text>
                    </div>
                </template>
                <template v-else>
                    <div class="align-center justify-center">
                        <text class="font-18 m-color-3">{{title}}</text>
                    </div>
                </template>
            </div>
            <div class="nav-rightBtn flex-row align-center" style="width: 140px">
                <slot name="rightBtn1"></slot>
                <slot name="rightBtn2"></slot>
            </div>
        </div>
        <div class="line-other"></div>
    </div>

</template>

<script>
    import LightSDK from 'light-sdk';
    import API from '../../api/api.js';
    import Light from 'light';

    export default {
        components: {API},
        name: "navbarinner",
        props: {
            url: {
                type: String,
                default: ""
            },
            title: {},
            subTitle: {},
            leftBtnShow: {default: true}
        },
        data() {
            return {}
        },

        methods: {
            goBack() {
                this.$emit('goPrev')

            }
        },
        created: function () {

        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .menu-top {
        position: relative;
        height: 90px;
    }

    .navbar-content {
        background-color: #fff;
        height: 90px;
        top: 0;
        left: 0;
        right: 0;
        position: fixed;
    }

    .icon-back {
        width: 50px;
        height: 50px;
        margin-left: 10px;
    }

    .line-other {
        position: absolute;
        bottom: 0;
        left: 0px;
        right: 0;
        content: " ";
        width: auto;
        height: 1px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e8e8e8;
        transform: scaleY(0.5);
    }
</style>


