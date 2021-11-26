<template>
    <div class="flex-column discover-box mt15">
        <div class="flex-row discover-head align-center">
            <image src="images/discover-i2.png" class="discover-icon ml30"></image>
            <text class="font-14 m-color-1 font-bold ml10">定投精选</text>
            <div class="line-other"></div>
        </div>
        <div class="discover-main flex-row" style="flex-wrap: wrap;">
            <div class="discover-div" v-for="(item,index) in recommendList">
                <div class="align-center mt30">
                    <text class="font-16 m-color-1">{{item.title}}</text>
                </div>
                <div class="align-center mt30 mb15">
                    <text :class="setClass(item)">{{item | formatRate}}{{item.unit}}</text>
                </div>
                <div class="align-center">
                    <text class="font-12 m-color-9">{{item.mobileShowIncInterval}}</text>
                </div>

                <div class="d-btn">
                    <btn :size="size" :type="type" @btnClicked="jump(item)">
                        <text class="font-16 m-color-3">立即定投</text>
                    </btn>
                </div>
            </div>
        </div>
        <div class="line-other"></div>
    </div>
</template>

<script>
    import Light from 'light';
    import btn from "../../components/ui/btn";
    export default {
        components:{btn},
        name: "",
        props: {
            recommendList:{
                type:Array
            }
        },
        data(){
            return {
                size: {
                    default: "min"
                },
                type: {
                    default: "ghost"
                }
            }
        },
        filters:{
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
        methods:{
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
        },
        created:function(){

        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .discover-box {
        background-color: #fff;
    }
    .discover-head{
        position: relative;
        height: 90px;
    }
    .discover-main,{
        position: relative;
    }
    .discover-icon {
        width: 30px;
        height: 30px;
    }
    .line-other {
        position: absolute;
        bottom: 0;
        left: 0px;
        right: 0rem;
        content: " ";
        width: auto;
        height: 1px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: #e8e8e8;
        transform: scaleY(0.5);
    }
    .d-btn {
        margin-top: 35px;
        margin-left: 60px;
        margin-right: 60px;
        margin-bottom: 20px;
        height: 62px;
    }
    .discover-div{
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


