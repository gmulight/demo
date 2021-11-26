<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>

    <slider :auto-play="autoPlay" class="Imgslider"
            :interval="interval"
            :infinite="infinite"
            :style="{ height: height  + 'px', width: width  + 'px'}">
        <template v-if="type == 'normal' || type == undefined">
        <div 
             v-for="(v,index) in imageList"
             :style="{ height: height  + 'px', width: width  + 'px'}"
             @click="imgClick(index)"
             :key="index">
            <image resize="cover" v-if="!v.onroll"
                   :src="v.src"
                   :style="{ height: height + 'px', width: width  + 'px', borderRadius: borderRadius}"></image>
            <div v-if="v.imgInfo" class="imgInfo" :style="imgInfoStyle">
                <text class="imgInfo-text" :style="imgInfoTextStyle">{{v.imgInfo}}</text>
            </div>

            <!-- 其他 -->

            <div v-if="v.onroll" class="flex-column w750 flex-1">
                <div class="align-center mt40 mb30">
                    <text class="font-24 m-color-1 font-bold t-center">{{v.rolltitle}}</text>
                </div>
                <div class="align-center">
                    <text class="font-33 " :class="returnClass(v.rollrate)">{{v.rollrate}}</text>
                </div>
                <div class="align-center mt10">
                    <text class="font-14 m-color-9 ">{{v.rollday}}</text>
                    <text class="font-14 mt10 m-color-9 ">{{v.rolldesc}}</text>
                </div>
                <div class="p-btn">
                    <div class="button btn-normal primary" @click="jump('dingtou/add-fun?fundcode='+v.fundcode,'新增定投计划')">
                        <div ><text class="font-18 m-color-5 font-bold" >{{v.rolltip}}</text></div>
                    </div>
                </div>
            </div>

            <!-- 其他 -->

        </div>
        </template>
        <slot ></slot>
        <indicator class="indicator" v-if="showIndicator=='true'&&imageList.length>1"
                   :style="indicatorStyle"></indicator>
    </slider>

</template>

<style scoped>
    .Imgslider{ align-items: center;}
    .indicator {
        position: absolute;
        item-color: #399DE2;
        item-selected-color: #0785DB;
        item-size: 20px;
        height: 20px;
        bottom: 24px;
    }
    .imgInfo{width: 750px; height: 60px; position: absolute; bottom: 0; left: 0;
        padding-left: 25px; justify-content: center; background-color: rgba(0,0,0,0.4);}
    .imgInfo-text{ color: #fff; font-size: 28px; lines:1; text-overflow: ellipsis;}

    .xjb-box {
        height: 415px;
        background-color: #fff;
        position: relative;
    }

    .xjb-icon {
        width: 270px;
        height: 340px;
        position: absolute;
        right: 0;
        top: 0;
    }

    .p-btn {
        margin-top:20px;
        margin-left: 75px;
        margin-right: 75px;
        height: 90px;
        background-color: #3580ed;
        border-radius: 45px;
    }



    .button {
        border-radius: 50px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .btn-normal {
        height: 90px;
    }

    .btn-min {
        height: 50px;
    }

    .primary {
        color: #fff;
        background-color: #3580ed;
        border-width: 1px;
        border-color: #157fd0;
    }
    .w750{
        width: 750px;
        background-color: #fff;
    }
</style>
<style scoped src="../../css/ui.css"></style>
<script>
    import Light from 'light';
    import API from '@/api/api';
    export default {
        name: "rollfund",
        props: {
            type: {
                type: String,
                default: "normal" //"normal" or "custom"
            },
            autoPlay:false,
            infinite:true,
            imgInfoStyle:{
                default:''
            },
            imgInfoTextStyle:{
                default:''
            },
            interval:{
                type: String,
                default: "3000"
            },
            borderRadius: {
                type: [Number],
                default: 0
            },
            width: {
                type: [Number, String],
                default: 750
            },
            height: {
                type: [Number, String],
                default: 750
            },
            imageList: Array,
            showIndicator: true,
            indicatorColor: {
                type: Object,
                default: () => ({
                'item-color': '#399DE2',
                'item-selected-color': '#0785DB',
                'item-size': '10px', 'bottom':'25px'
            })
        }
    },
    computed: {
        indicatorStyle () {
            return {
                width: this.width + 'px',
                ...this.indicatorColor
        }
        }
    },
    methods: {
        imgClick (index) {
            this.$emit('lcImgClick',{index});
        },
        jump(url, title, data,params) {
            if(!params){
                params = {headHidden : true};
            }
            params.replace = false;
            params.title = title;
            API.route.hsOpen(url, data, params);
        },
        returnClass(value){
            if (isNaN(parseFloat(value))) {
                return ["font-33", "m-color-9"];
            }else if (parseFloat(value) > 0 || parseFloat(value) == 0) {
                return ["font-33", "m-color-red"];
            } else {
                return ["font-33", "m-color-green"];
            }
        }
    }
    };
</script>
