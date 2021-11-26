<template>
  <div>
    <div class="input-container">
      <div v-for="(item, index) in pwdArray" :key="index" :class="['pwdBlock', index==0?'pwdBlock-first':'', showError?'pwdBlock-error':'']">
        <div class="dot" v-if="item!==undefined"></div>
      </div>
    </div>
    <div class="input-tip">
      <div>
        <text class="text-error" v-if="showError">{{chance}}</text>
      </div>
      <div>
        <text class="text-forget" v-if="showForget" @click="forgetHandle">忘记密码？</text>
      </div>
    </div>
    <div class="keyboard" :style="{'margin-top':marginTop+'px'}">
      <div class="row">
        <div @click="input(1)" class="num block">
          <text class="text-num">1</text>
        </div>
        <div @click="input(2)" class="num block line-password">
          <text class="text-num">2</text>
        </div>
        <div @click="input(3)" class="num block">
          <text class="text-num">3</text>
        </div>
      </div>
      <div class="row">
        <div @click="input(4)" class="num block">
          <text class="text-num">4</text>
        </div>
        <div @click="input(5)" class="num block line-password">
          <text class="text-num">5</text>
        </div>
        <div @click="input(6)" class="num block">
          <text class="text-num">6</text>
        </div>
      </div>
      <div class="row">
        <div @click="input(7)" class="num block">
          <text class="text-num">7</text>
        </div>
        <div @click="input(8)" class="num block line-password">
          <text class="text-num">8</text>
        </div>
        <div @click="input(9)" class="num block">
          <text class="text-num">9</text>
        </div>
      </div>
      <div class="row">
        <div class="action block">
        </div>
        <div @click="input(0)" class="num block line-password">
          <text class="text-num">0</text>
        </div>
        <div @click="del()" class="action block">
          <image src="images/key_del.png" class="icon-del"></image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    length:{
      default: 6
    },
    showError:{
      default: false
    },
    showForget:{
      default: false
    },
    marginTop:{
      default: 60
    },
    chance:{
      type: String,
      default: 'text'
    }
  },
  name: "PassWord",
  watch: {
  },
  data () {
    return {
      pwdArray: new Array(this.length),
    }
  },
  methods:{
    input(value){
      if(this.showError){
        return;
      }
      for (let index = 0; index < this.pwdArray.length; index++) {
        let element = this.pwdArray[index];
        if(element==undefined){
          this.pwdArray.splice(index,1,value);
          if(index==(this.pwdArray.length-1)){
            this.$emit('complete',this.pwdArray);
          }
          return;
        }
      }
    },
    del(){
      if(this.showError){
        return;
      }
      for (let index = this.pwdArray.length - 1; index >= 0; index--) {
        let element = this.pwdArray[index];
        if(element!=undefined){
          this.pwdArray.splice(index,1,undefined);
          return;
        }
      }
    },
    forgetHandle(){
      this.$emit('forgetClicked');
    },
    clear(){
      this.pwdArray = new Array(this.length);
    }
  }
};
</script>
<style scoped>
  .input-container{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .pwdBlock{
    width: 100px;
    height: 100px;
    border-color: #e8e8e8;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }
  .pwdBlock-first{
    border-left-width: 1px;
  }
  .pwdBlock-error{
    border-color: #f0384f;
  }
  .dot{
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: #333;
  }
  .input-tip{
    padding-left: 76px;
    padding-right: 76px;
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .text-error{
    color: #f0384f;
    font-size: 24px;
  }
  .text-forget{
    color: #3c94fe;
    font-size: 28px;
  }
  .keyboard{
    width: 750px;
  }
  .row{
    flex-direction: row;
    border-top-color: #e8e8e8;
    border-top-width: 1px;
  }
  .block{
    flex: 1;
    height: 120px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .block:active{
    background-color: #e8e8e8;
  }
  .num{
    background-color: #ffffff;
  }
  .action{
    background-color: #f0f0f5;
  }
  .text-num{
    font-size: 68px;
    color: #333;
  }
  .line-password{
    border-left-width: 1px;
    border-right-width: 1px;
    border-color: #e8e8e8;
  }
  .icon-del{
    width: 30px;
    height: 30px;
  }
</style>

