<template>
    <div class="flex-column xjb-box mt15" @click="jumpFund(xjbBox)">
        <image src="images/xjb.png" class="xjb-icon"></image>
        <div class="align-center mt40 mb30">
            <text class="font-24 m-color-1 font-bold">{{xjbBox.title}}</text>
        </div>
        <div class="align-center">
            <text class="font-33 m-color-red" v-if="xjbBox.rate != null && xjbBox.rate != '' ">{{xjbBox.rate | formatRate}}{{xjbBox.unit}}</text>
            <text class="font-33 m-color-red" v-else>暂无数据</text>
        </div>
        <div class="align-center mt10">
            <text class="font-12 m-color-9">{{xjbBox.mobileShowIncInterval}}({{xjbBox.netValueDate}})</text>
        </div>
        <div class="p-btn">
            <btn @btnClicked="jump(xjbBox)">
                <text class="font-18 m-color-5 font-bold">立即购买</text>
            </btn>
        </div>
    </div>
</template>

<script>
    import Light from 'light';
    import btn from "../../components/ui/btn";

    export default {
        components: {btn},
        name: "xjb",
        props: {
            xjbBox: {}
        },
        data() {
            return {}
        },
        filters: {
            formatRate: function (value) {
                if(value){
                    return value.substr(0,5);
                }
            },
        },
        methods: {
            jump($event) {
                this.$emit('onclick', $event)
            },
            jumpFund($event) {
                this.$emit('onFund', $event)
            }
        },
        created: function () {

        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
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
        margin-top: 35px;
        margin-left: 75px;
        margin-right: 75px;
        height: 90px;
        background-color: #3580ed;
        border-radius: 45px;
    }
</style>


