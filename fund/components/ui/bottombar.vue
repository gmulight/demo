<template>
  <!-- <div class="bottombar" v-if="bottomshow"> -->
    <div class="bottombar-content" v-if="!bottomshow">
      <div class="menu-bottom flex-row align-center" style="margin-top:5px">
      <div class="flex-1 justify-center tab-link align-center"  v-for="(item, index) in items" :key="item.index" @click="jump(item.url,index)">
        <template v-if="index != activeIndex">
        <image :src="item.img" class="icon"></image>
        </template>
        <template v-else>
        <image :src="item.imgT" class="icon"></image>
        </template>
        <text class="font-11" :class="[{'m-color-3': index == activeIndex}, 'm-color-2']">{{item.text}}</text>
      </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import Light from 'light';
import API from '../../api/api.js';
const modal = Light.requireModule('modal');
export default {
  components:{API},
  name: "bottombar",
  props: {
    activeIndex: {
      default: 0
    },
  },
  data(){
    return {
      items: [
        { text: "首 页", img: "images/bottom-i1.png" , imgT:"images/bottom-i1-1.png", url: "home" },
        { text: "精 选", img: "images/bottom-i2.png" , imgT:"images/bottom-i2-1.png", url: "discover" },
        { text: "基 金", img: "images/bottom-i3.png" , imgT:"images/bottom-i3-1.png", url: "fund-list" },
        { text: "我 的", img: "images/bottom-i4.png" , imgT:"images/bottom-i4-1.png", url: "setting" }
      ],
      // bottomshow: process.env.RUNTIME==='miniapp',
      bottomshow: true

   }
  },
  methods:{
    jump(e,index){
      if(index==0){
        Light.navigate(e,{},{replace: true,navBarType: 0});
      }else{
        Light.navigate(e,{},{replace: true,navBarType: 2});
      }
    } 
  },
   created:function(){
     if(this.$route.path=='/index/fund') {
       this.bottomshow = false;
     }
      // if(!API.matchNative()&&process.env.RUNTIME !== "miniapp"){
      //    this.bottomshow = true
      // }
    }
};
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
.bottombar {
  position: relative;
  height: 100px;
}

.bottombar-content {
  background-color: #fff;
  height: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  box-shadow: 0 0 5px rgba(128,128,128,0.2);
  -moz-box-shadow:0 0 5px rgba(128,128,128,0.2);/*firefox*/ 
	-webkit-box-shadow:0 0 5px rgba(128,128,128,0.2);/*webkit*/ 
}
.tab-link{
  height:90px;
}
.icon{
  width:50px;
  height:50px;
}
</style>


