<template>
    <div class="flex-column process-box">
        <div class="process-main align-center flex-row " v-for="(item,index) in processList">
            <div class="process-icon align-center h140 justify-center" v-if="index==0" >
                <div class="lineColumn borderB"></div>
                <image src="images/process-i1-1.png" class="process-icon-div"></image>
            </div>
            <div class="process-icon" v-else>
                <div class="h140 justify-center" v-if="item.state=='narmal'">
                  <template v-if="index != processList.length-1">
                <div class="lineColumn t0 h140"></div>
                  </template>
                   <template v-else>
                <div class="lineColumn t0"></div>
                  </template>
                <div class="align-center">
                <image src="images/process-i2.png" class="process-icon-div"></image>
                </div>
                </div>
                <div class="h140 justify-center" v-else-if="item.state=='success'">
                   <template v-if="index != processList.length-1">
                     <div class="lineColumn t0 h140 borderB"></div>
                   </template>
                   <template v-else>
                     <div class="lineColumn t0 borderB"></div>
                   </template>

                 <div class="align-center">
                <image src="images/process-i2-2.png" class="process-icon-div"></image>
                 </div>
                </div>
                <div class="h140 justify-center" v-else-if="item.state=='error'">
                  <template v-if="index != processList.length-1">
                     <div class="lineColumn t0 h140 borderR"></div>
                   </template>
                   <template v-else>
                     <div class="lineColumn t0 borderR"></div>
                   </template>  
                 <div class="align-center"> 
                <image src="images/process-fail.png" class="process-icon-div"></image>
                 </div>
                </div>
                <div class="h140 justify-center" v-else-if="item.state=='tranform'">
                   <template v-if="index != processList.length-1">
                     <div class="lineColumn t0 h140 borderR"></div>
                   </template>
                   <template v-else>
                     <div class="lineColumn t0 borderR"></div>
                   </template>  
                  <div class="align-center"> 
                    <image src="images/process-cancel.png" class="process-icon-div"></image>
                  </div>
                </div>
                 <div class="h140 justify-center" v-else-if="item.state=='money-none'">
                 <div class="lineColumn t0"></div>
                  <div class="align-center"> 
                  <image src="images/process-i3.png" class="process-icon-div"></image>
                  </div>
                </div>
                <div class="h140 justify-center" v-else-if="item.state=='money-arrival'">
                  <div class="lineColumn t0 borderB"></div>
                  <div class="align-center"> 
                  <image src="images/process-i3-2.png" class="process-icon-div"></image>
                  </div>
                </div>
            </div>
            <div class="flex-1 flex-column mt30">
              <div class="mb10 align-start">
                  <text class="font-14 m-color-1">{{item.name}}</text>
              </div>
              <div class="align-start">
                  <text class="font-12 m-color-9">{{item.data}}</text>
              </div>
            </div>
            </div>
    </div>
</template>

<script>
export default {
  props: {
    processList: {
      default: Array
    },
    sortCurrent: {},
  },
  data(){
      return{
          state: '',
      }   
  },
  name: "processcolumn",
  watch: {},
  methods: {
    setting() {}
  }
};
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
.process-main {
  height: 140px;
}
.process-box {
  padding-left: 30px;
  background-color: #fff;
  position: relative;
}
.process-icon{
  width: 100px;
  position: relative;
}
.process-icon-div {
  width: 35px;
  height: 35px;
}
.lineColumn {
  position: absolute;
  left: 50px;
  bottom: 0;
  content: " ";
  width: 2px;
  height: 70px;
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: #e8e8e8;
}
.h140{
  height: 140px;
}
.t0{
 top:0px;
}
.borderB{
border-right-color:#3680e9
}
.borderR{
border-right-color:#ee384f
}

</style>


