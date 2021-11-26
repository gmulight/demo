<template>
    <div class="nav-box flex-row align-center">
        <div class="flex-1 align-center flex-column" v-for="(item,index) in navList" @click="jump(item)">
            <image class="nav-icon" :src="item.iconFilename"></image>
            <text class="font-14 m-color-1">{{item.title}}</text>
        </div>
    </div>
</template>

<script>
    import Light from 'light';

    export default {
        components: {},
        name: "",
        props: {
            navList: {
                type: Array
            }
        },
        data() {
            return {}
        },
        methods: {
            jump($event) {
                this.$emit('onclick', $event)
            }
        },
        created: function () {

        }
    };
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
    .nav-box {
        background-color: #fff;
        padding-bottom: 5px;
        height: 148px;
    }

    .nav-icon {
        width:110px;
        height:80px;
    }
</style>


