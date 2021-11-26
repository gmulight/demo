<template>
    <div class="hot-box flex-column mt15">
        <div class="hot-head flex-row align-center">
            <image src="images/home-i3.png" class="home-icon" style="width:35px; height:35px;"></image>
            <text class="font-14 m-color-1 font-bold ml10">{{hotName}}</text>
            <div class="flex-1 align-end" @click="nextTab(2)">
                <text class="font-14 m-color-6">更多</text>
            </div>
            <div class="line-other"></div>
        </div>

        <div class="cellhot justify-center" v-for="(item,index) in hotList" @click="jump(item)" v-if="index < 5">
            <div class="hot-line flex-column">
                <div class="flex-row mb10 align-center">
                    <div class="hot-left align-center">
                        <text :class="setClass(item)">{{item | formatRate}}{{item.unit}}</text>
                    </div>
                    <div class="pl35">
                        <text class="font-16 m-color-1">{{item.title}}</text>
                    </div>
                </div>
                <div class="flex-row mt10 align-center">
                    <div class="hot-left align-center">
                        <text class="font-12 m-color-9">{{item.mobileShowIncInterval}}</text>
                    </div>
                    <div class="pl35">
                        <text class="font-12 m-color-9">{{item.fundinfo | fomatTags}}</text>
                    </div>
                </div>
            </div>
            <div class="lineColumn-hot"></div>
            <div class="line-hot"></div>
            <image class="hot-icon" :src="'images/hot-i'+ index +'.png'" v-if="hotIcon && index < 3"></image>
        </div>
    </div>
</template>

<script>
    import Light from 'light';
    import btn from "../../components/ui/btn";
    import API from "../../api/api.js";
    export default {
        components: {btn},
        name: "xjb",
        props: {
            hotList: {
                type: Array
            },
            hotIcon: {
                default: false
            },
            hotName: {}
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
                // API.nextTab(index);
            },
        },
        created: function () {

        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .hot-box {
        background-color: #fff;
    }

    .hot-head {
        height: 90px;
        position: relative;
        padding-right: 30px;
        padding-left: 30px;
    }

    .cellhot {
        height: 160px;
        padding-right: 40px;
        padding-left: 40px;
        position: relative;
    }

    .hot-line {
        position: relative;
    }

    .hot-left {
        width: 240px;
    }

    .hot-icon {
        position: absolute;
        top: 0;
        right: 45px;
        width: 50px;
        height: 80px;
    }

    .line-hot {
        position: absolute;
        bottom: 0;
        left: 40px;
        right: 40px;
        content: " ";
        width: auto;
        height: 1px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e8e8e8;
        transform: scaleY(0.5);

    }

    .lineColumn-hot {
        position: absolute;
        left: 280px;
        top: 35px;
        bottom: 35px;
        height: 90px;
        content: " ";
        width: 1px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #e8e8e8;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
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


