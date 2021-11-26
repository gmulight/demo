<template>
    <div class="value-box flex-row mt15">
        <div class="justify-center value-right flex-1 flex-column" @click="jump(valueOne[0])">
            <div class="align-center">
                <text class="font-16 m-color-1">{{valueOne[0].title}}</text>
            </div>
            <div class="align-center mt10 mb10">
                <text class="font-12 m-color-9">{{valueOne[0].subTitle}}</text>
            </div>
            <div class="align-center">
                <image :src="valueOne[0].mobileShowImgFilename" class="value-one"></image>
            </div>
            <div class="lineColumn" style="right:0; height: 270px;"></div>
        </div>
        <div class="flex-column flex-1 value-bottom">
            <div class="flex-1 flex-row align-center pr30 pl30" @click="jump(item)" v-for="(item,index) in valueList"
                 v-if="index != 0">
                <div class="flex-column flex-1">
                    <div class="align-start">
                        <text class="font-16 m-color-1">{{item.title}}</text>
                    </div>
                    <div class="align-start mt10">
                        <text class="font-12 m-color-9">{{item.subTitle}}</text>
                    </div>
                </div>
                <div>
                    <image :src="item.mobileShowImgFilename" class="value-two"></image>
                </div>
            </div>
            <div class="line-ui-value"></div>
        </div>
    </div>
</template>

<script>
    import Light from 'light';
    import API from "../../api/api.js";

    export default {
        components: {},
        name: "",
        props: {
            valueList: {
                type: Array
            },
            valueOne: {
                type: Array
            },
        },
        data() {
            return {}
        },
        filters: {},
        methods: {
            jump($event) {
                this.$emit('onclick', $event)
            },
        },
        created: function () {

        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .value-box {
        background-color: #fff;
        height: 270px;
    }

    .value-right,
    .value-bottom {
        position: relative;
    }

    .value-one {
        width: 170px;
        height: 130px;
    }

    .value-two {
        width: 110px;
        height: 100px;
    }

    .line-ui-value {
        position: absolute;
        bottom: 135px;
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

    .lineColumn {
        position: absolute;
        right: 374px;
        top: 0;
        bottom: 0;
        content: " ";
        width: 1px;
        height: 350px;
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #e8e8e8;
        -webkit-transform: scaleX(0.5);
        transform: scaleX(0.5);
    }
</style>


