<template>
    <div class="recommend-box flex-column mt15">
        <div class="recommend-head flex-row align-center">
            <image src="images/home-i1.png" class="home-icon"></image>
            <text class="font-14 m-color-1 font-bold ml10">推荐基金</text>
            <div class="flex-1 align-end" @click="nextTab(2)">
                <text class="font-14 m-color-6">更多</text>
            </div>
            <div class="line-other"></div>
        </div>
        <div class="recommend-main flex-row" style="flex-wrap: wrap;">
            <div class="li-div" v-for="(item,index) in recommendList" v-if="index < 4">
                <div class="justify-center" style="height:315px" @click="jump(item)">
                    <div class="align-center">
                        <text class="font-16 m-color-1">{{item.title}}</text>
                    </div>
                    <div class="align-center mt25 mb10">
                        <text :class="setClass(item)">{{item | formatRate}}{{item.unit}}</text>
                    </div>
                    <div class="align-center">
                        <text class="font-12 m-color-9">{{item.mobileShowIncInterval}}</text>
                    </div>
                    <div class="align-center mt30">
                        <text class="font-12 m-color-9">{{item.fundinfo | fomatTags}}</text>
                    </div>
                </div>
            </div>
        </div>
        <div class="line-other"></div>
    </div>
</template>

<script>
    import Light from 'light';
    import API from "../../api/api.js";
    export default {
        components: {},
        name: "",
        props: {
            recommendList: {
                type: Array
            }
        },
        data() {
            return {}
        },
        filters:{
            fomatTags(date){
                if(date){
                    var tags = ""
                    date.tags.forEach(function (item) {
                        tags = tags + "  I  " + item;
                    })
                    return tags.substr(5,tags.length);
                }
            },
            formatRate: function (value) {
                if(value){
                    if(value.fundinfo.fundtype == 2){
                        return value.rate.substr(0,5);
                    }else{
                        return value.rate;
                    }

                }
            },
        },
        methods: {
            setClass(item){
                if(item.rate && parseFloat(item.rate) < 0){
                    return ["font-22","m-color-green"];
                }else{
                    return ["font-22","m-color-red"];
                }
            },
            jump($event) {
                this.$emit('onclick', $event)
            },
            nextTab: function (index) {
                API.nextTab(index);
            },
        },
        created: function () {

        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .recommend-box {
        background-color: #fff;
    }

    .recommend-head {
        height: 90px;
        position: relative;
        padding-right: 30px;
        padding-left: 30px;
    }

    .recommend-main {
        position: relative;
    }

    .home-icon {
        width: 30px;
        height: 30px;
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

    .li-div {
        width: 374px;
        height: 319px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #e8e8e8;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e8e8e8;
    }
</style>


