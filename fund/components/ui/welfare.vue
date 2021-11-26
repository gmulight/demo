<template>
      <div class="welfare-box flex-column mt15" @click="jump()">
            <div class="welfare-head flex-row align-center">
              <image src="images/home-i2.png" class="home-icon"></image>
              <text class="font-14 m-color-1 font-bold ml10">APP专属福利</text>
              <div class="flex-1 align-end">
                  <text class="font-14 m-color-6">更多</text>
              </div>
            </div>
            <div class="welfare-main">
                <image :src="welfarePic[0].mobileImgFilename" class="welfarePic"></image>
            </div>
        </div>
</template>

<script>
import Light from 'light';
export default {
  components:{},
  name: "",
  props: {
    welfarePic:{
        type: Array
    }
  },
  data(){
    return {
   }
  },
  methods:{
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
.welfare-box {
  background-color: #fff;
}

.welfare-head {
  height: 90px;
  position: relative;
  padding-right: 30px;
  padding-left: 30px;
}
.welfare-main {
  margin-right: 30px;
  margin-left: 30px;
  margin-bottom: 30px;
}
.welfarePic {
  width: 690px;
  height: 270px;
}
.home-icon {
    width: 30px;
    height: 30px;
}
</style>


