<template>
    <div class="flex-row process-box">
        <div class="process-main justify-center flex-column" v-for="(item,index) in processList">
            <div class="process-icon align-center" v-if="index==0">
                <div class="line-ui-process" style="border-bottom-color:#3680e9"></div>
                <image src="images/process-i1-1.png" class="process-icon-div"></image>
            </div>
            <div class="process-icon" v-else>
                <div v-if="item.state=='narmal'">
                <div class="line-ui-process" style="left:0px;"></div>
                <div class="align-center">
                <image src="images/process-i2.png" class="process-icon-div"></image>
                </div>
                </div>
                <div v-else-if="item.state=='success'">
                <div class="line-ui-process" style="left:0px;border-bottom-color:#3680e9"></div>
                 <div class="align-center">
                <image src="images/process-i2-2.png" class="process-icon-div"></image>
                 </div>
                </div>
                <div v-else-if="item.state=='error'">
                <div class="line-ui-process" style="left:0px;border-bottom-color:#ee384f"></div>
                 <div class="align-center"> 
                <image src="images/process-fail.png" class="process-icon-div"></image>
                 </div>
                </div>
                <div v-else-if="item.state=='tranform'">
                <div class="line-ui-process" style="left:0px;border-bottom-color:#ee384f"></div>
                  <div class="align-center"> 
                <image src="images/process-cancel.png" class="process-icon-div"></image>
                  </div>
                </div>
            </div>
            <div class="mb15 align-center mt20">
                <text class="font-14 m-color-1">{{item.name}}</text>
            </div>
            <div class="align-center" style="height: 30px">
                <text class="font-12 m-color-9">{{item.data}}</text>
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
  name: "Process",
  watch: {},
  methods: {
    setting() {}
  }
};
</script>
<style scoped src="../../css/ui.css"></style>
<style scoped>
.process-main{
 width: 345px;
 height: 200px;
}
.process-box {
  padding-right: 30px;
  padding-left: 30px;
  background-color: #fff;
  height: 200px;
  position: relative;
}
.process-icon{
  width: 345px;
  position: relative;
}
.process-icon-div {
  width: 35px;
  height: 35px;
}
.line-ui-process {
  position: absolute;
  bottom: 16px;
  right: 0;
  content: " ";
  width: 175px;
  height: 2px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #e8e8e8;
}
</style>


