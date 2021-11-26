<template>
<div>
  <div class="numberfield-input-container">
    <div class="numberfield-icon-container" v-if="showIcon">
        <text class="numberfield-icon-rmb" >¥</text>
    </div>
    <div class="numberfield-input-row">
      <input ref="input0" class="numberfield-input" type="number" v-if="!formatShow" @blur="numbertBlur" @input="onInput" @focus="numberFocus" v-model="numberValue" :maxlength="maxlength" :placeholder="placeholder" :autofocus="isAutoFocus" singleline="true" />
      
      <text class="numberfield-input__text" v-if="formatShow" @click="textFocus">{{textValue}}</text>
    </div>
    <image class="numberfield-input__clear" @click="clearHandle" v-if="isClearShow" src="images/icon-del.png"></image>
    <slot name="action"></slot>
  </div>
</div>  
</template>

<script>
export default {
    created () {
        this.numberValue = (this.value === undefined || this.value === null) ? '' :  this.value
    },
  name: "numberfield",
  props: {
    value: {
      type: [Number,String],
      default: 0
    },
    showIcon: {
      default: false
    },
    placeholder: {
      default: '请输入...'
    },
    maxlength: {
      default: 12
    },
    max:{
      type: [Number,String],
    }
  },
  data(){
    return {
      numberValue: '',
      formatShow: false,
      isClearShow: false,
      textValue: undefined,
      isAutoFocus: false,
    }
  },
  methods: {
    clearHandle($event) {
      this.numberValue = "";
      this.textValue = "0.00";
      this.isClearShow = false;
      this.$emit('onclear', this.numberValue, $event)
      // this.isAutoFocus = true;
    },
    numberFocus(){
      this.isClearShow = true;
    },
    /* 聚焦切换为number */
    textFocus(){
      this.formatShow = false;
      this.isAutoFocus = true;
    },
    /* 失去焦点显示为text */
    numbertBlur($event){
      if(this.numberValue !== ""){
        if(parseFloat(this.max)>parseFloat(this.numberValue)){
          this.textValue = "";
          this.numberValue=0
          return;
        }
        this.textValue = this.format(this.numberValue);
      }else{
        this.textValue = "0.00";
      }
      this.formatShow = true;
      if(this.numberValue){
          this.numberValue = parseFloat((this.numberValue + "").replace(/[^\d\.-]/g, "")).toFixed(2);
      }else{
          this.numberValue = "0.00";
      }
      //this.isClearShow = false;
      this.$emit('on-blur', this.numberValue, $event)
    },
    format(s){
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";   
      var l = s.split(".")[0].split("").reverse(),r = s.split(".")[1];   
      var t = "";   
      for(var i = 0; i < l.length; i ++ )   {   
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }   
      return t.split("").reverse().join("") + "." + r;   
    },
    setValue(val){
      this.numberValue = val;
      if(val !== ""){
          this.textValue = this.format(val);
      }else{
          this.textValue = "0.00";
      }
    },
    onInput($event) {
        this.$emit('oninput', this.numberValue, $event)
    }
  },
  watch: {
    value (val) {
      this.numberValue = val;
    },
    numberValue () {
        this.$emit('input', this.numberValue);
    }
  }
};
</script>

<style scoped>
  .numberfield-input-container{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 120px;
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .numberfield-input-row{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    position: relative;
    height: 72px;;
  }
  .numberfield-input__text{
    width: 500px;
    height: 72px;
    padding-top: 6px;
    justify-content: center;
    font-size: 52px;
    color: #333;
  }
  .numberfield-input {
    width: 500px;
    height: 72px;
    font-size: 52px;
    justify-content: center;
    color: #333;
    background-color: #ffffff;
  }
  .numberfield-input__clear{
    width: 32px;
    height: 32px;
    margin-left: 10px;
  }
  .numberfield-icon-container{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 72px;
  }
  .numberfield-icon-rmb{
      width: 60px;
      background-color: #ffffff;
      font-size: 56px;
      color: #333;
  }
</style>


