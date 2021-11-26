<template>
  <div class="container align-center justify-center" v-if="tipsshow">
   <div class="tips-main">
     <div class="tip-box align-center justify-center">
       <text class="tip-content">{{message}}</text>
     </div>
   </div>

    
  </div>
</template>
<style scoped src="../../css/ui.css"></style>
<style scoped>
.container {
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    width: 750px;
    height: 1200px;
    background-color:rgba(0,0,0,0);
}
.tip-box {
  border-radius: 10px;
  background-color: rgba(0,0,0,0.6);
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 50px;
  padding-right: 50px;
}


.tip-content {
  color: #fff;
  font-size: 28px;
}
  .tips-main{
    width: 450px;
  }
</style>

<script>
export default {
  props: {
    tipsshow: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  watch: {
    tipsshow(val) {
      if (val) {
        clearTimeout(this.timeout);
        var that = this;
        this.timeout = setTimeout(function() {
          that.$emit("showtip", false);
        }, that.duration);
      }
    }
  },
  computed: {},
  methods: {}
};
</script>
