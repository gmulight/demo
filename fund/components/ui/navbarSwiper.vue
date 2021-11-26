<template>
    <div class="navbar-content">
        <div class="menu-top flex-row align-center">
            <div class="align-start justify-center" style="width: 150px;">
                <div v-if="leftBtnShow == 'false' ? false : true" @click="goBack()">
                    <image src="images/left-icon-w.png" class="icon-back"></image>
                </div>
            </div>
            <div class="nav-title flex-1">
                <template v-if="!!subTitle">
                    <div class="align-center justify-center">
                        <text class="font-14 m-color-1">{{title}}</text>
                        <text class="font-10 m-color-9">{{subTitle}}</text>
                    </div>
                </template>
                <template v-else>
                    <div class="align-center justify-center">
                        <text class="font-18 m-color-5">{{title}}</text>
                    </div>
                </template>
            </div>
            <div class="nav-rightBtn flex-row align-center" style="width: 150px">
                <slot name="rightBtn1"></slot>
                <slot name="rightBtn2"></slot>
            </div>
        </div>
    </div>

</template>

<script>
    import LightSDK from 'light-sdk';
    import API from '../../api/api.js';
    import Light from 'light';

    export default {
        components: {API},
        name: "navbarswiper",
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
                if(this.url == ""){
                    if (!API.matchNative()) {
                        // 如果是web执行
                        history.back()
                    } else {
                        LightSDK.native.back({})
                    }
                }else if(this.url == "setting" || this.url == "home" || this.url == "discover" || this.url == "fund-list"){
                    if (!API.matchNative()) {
                        // 如果是web执行
                        Light.navigate(this.url, {}, {replace: false, headHidden: true});
                    } else {
                        LightSDK.native.back({"number":"9999"})
                    }
                }else{
                    Light.navigate(this.url, {}, {replace: false, headHidden: true});
                }

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
        background-color: #1baaf0;
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
</style>


