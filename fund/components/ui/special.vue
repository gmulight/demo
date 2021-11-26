<template>
     <div class="flex-column special-box mt15">
        <div class="special-head flex-row align-center">
            <image src="images/discover-i1.png" class="discover-icon ml30"></image>
            <text class="font-14 m-color-1 font-bold ml10">特色理财</text>
        </div>
        <div class="flex-row pb30 pl5 pr5 justify-between">
            <div class="flex-column sepcial-box justify-center align-start" @click="jump(item)" :class="[index==0 ? 'sepcial-b1' : 'sepcial-b2']" v-for="(item,index) in specialist">
                <image src="images/discover-pic1.png" v-if="index==0" class="sepcial-img"></image>
                <image src="images/discover-pic2.png" v-if="index==1" class="sepcial-img-two"></image>
                <div class="align-center" style="margin-top:-10px;">
                    <text class="font-16 m-color-5">{{item.title}}</text>
                </div>
                <div class="align-center mt10"></div>
                <div class="align-center">
                      <text class="font-12 m-color-5">{{item.subTitle}}</text>
                 </div>
            </div>
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
            specialist: {
                type: Array
            },
        },
        data() {
            return {}
        },
        filters:{
           
        },
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
.special-box{
  background-color: #fff;
}
.special-head{
  position: relative;
  height: 90px;
}
.discover-icon {
  width: 30px;
  height: 30px;
}

.sepcial-box {
  width: 370px;
  height: 172px;
  padding-left: 40px;
}

.sepcial-line {
  width: 70px;
  height: 4px;
  background-color: #fff;
}
.sepcial-img {
  width: 370px;
  height: 172px;
  position: absolute;
  bottom: 0;
  left: 5px;
  top: -10px;
}
.sepcial-img-two {
  width: 370px;
  height: 172px;
  position: absolute;
  bottom: 0;
  right: 5px;
  top: -10px;
}
.pl5{
  padding-left: 5px;
}
.pr5{
  padding-right: 5px;
}
</style>


