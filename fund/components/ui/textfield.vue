
<template>
  <div class="textfiled-input-container">
    <div class="textfiled-input-row">
      <!-- type=text -->
      <input
              v-if="!type || type === 'text'"
              class="textfiled-input"
              :maxlength="maxlength"
              :autofocus="autofocus"
              type="text"
              :name="name"
              :placeholder="placeholder"
              :disabled="disabled"
              v-model="currentValue"
              @focus="onFocus"
              @blur="onBlur"
              @return="onReturn"
              @input="onInput"
              @change="onChange"
              ref="input"
              :disableSystemKeyboard="disableSystemKeyboard"/>
      <!-- type=date -->
      <input
              v-if="type === 'date'"
              class="textfiled-input"
              :maxlength="maxlength"
              :autofocus="autofocus"
              type="date"
              :name="name"
              :placeholder="placeholder"
              :disabled="disabled"
              v-model="currentValue"
              @focus="onFocus"
              @blur="onBlur"
              @return="onReturn"
              @input="onInput"
              @change="onChange"
              ref="input"/>
      <!-- type=time -->
      <input
              v-if="type === 'time'"
              class="textfiled-input"
              :maxlength="maxlength"
              :autofocus="autofocus"
              type="time"
              :name="name"
              :placeholder="placeholder"
              :disabled="disabled"
              v-model="currentValue"
              @focus="onFocus"
              @blur="onBlur"
              @return="onReturn"
              @input="onInput"
              @change="onChange"
              ref="input"/>
      <!-- type=number -->
      <input
              v-if="type === 'number'"
              class="textfiled-input"
              :maxlength="maxlength"
              :autofocus="autofocus"
              type="number"
              :name="name"
              :placeholder="placeholder"
              :disabled="disabled"
              v-model="currentValue"
              @focus="onFocus"
              @blur="onBlur"
              @return="onReturn"
              @input="onInput"
              @change="onChange"
              ref="input"/>
      <!-- type=email -->
      <input
              v-if="type === 'email'"
              class="textfiled-input"
              :maxlength="maxlength"
              :autofocus="autofocus"
              type="email"
              :name="name"
              :placeholder="placeholder"
              :disabled="disabled"
              v-model="currentValue"
              @focus="onFocus"
              @blur="onBlur"
              @return="onReturn"
              @input="onInput"
              @change="onChange"
              ref="input"/>
      <!-- type=url -->
      <input
              v-if="type === 'url'"
              class="textfiled-input"
              :maxlength="maxlength"
              :autofocus="autofocus"
              type="url"
              :name="name"
              :placeholder="placeholder"
              :disabled="disabled"
              v-model="currentValue"
              @focus="onFocus"
              @blur="onBlur"
              @return="onReturn"
              @input="onInput"
              @change="onChange"
              ref="input"/>
      <!-- type=tel -->
      <input
              v-if="type === 'tel'"
              class="textfiled-input"
              :maxlength="maxlength"
              :autofocus="autofocus"
              type="tel"
              :name="name"
              :placeholder="placeholder"
              :disabled="disabled"
              v-model="currentValue"
              @focus="onFocus"
              @blur="onBlur"
              @return="onReturn"
              @input="onInput"
              @change="onChange"
              ref="input"/>

      <!-- type=password -->
      <input
              v-if="type === 'password' && isPwdShow===false"
              class="textfiled-input"
              :maxlength="maxlength"
              :autofocus="autofocus"
              type="password"
              :name="name"
              :placeholder="placeholder"
              :disabled="disabled"
              v-model="currentValue"
              @focus="onFocus"
              @blur="onBlur"
              @return="onReturn"
              @input="onInput"
              @change="onChange"
              ref="input"/>

      <input
              v-if="type === 'password' && isPwdShow===true"
              class="textfiled-input"
              :maxlength="maxlength"
              :autofocus="autofocus"
              type="text"
              :name="name"
              :placeholder="placeholder"
              :disabled="disabled"
              v-model="pwdValue"
              @focus="onPwdFocus"
              @blur="onPwdBlur"
              @return="onPwdReturn"
              @input="onPwdInput"
              @change="onPwdChange"
              ref="input1"/>

      <!-- clear -->
      <image class="textfiled-input__clear" @click="clear" v-if="isClearShow" src="images/icon-del.png"></image>
    </div>
    <div class="textfiled-eye-container" v-if="type === 'password'" @click="toggleEye">
      <image class="textfiled-icon-eye" src="images/eye-close.png" v-if="!isPwdShow"></image>
      <image class="textfiled-icon-eye" src="images/eye-open.png" v-if="isPwdShow"></image>
    </div>
    <div class="textfiled-captcha-container" v-if="isCaptcha">
      <text class="textfiled-captcha-text" v-if="!isCodeSend" @click="getCaptcha">获取验证码</text>
      <text class="textfiled-captcha-count" v-if="isCodeSend">{{captchaTime}}s</text>
    </div>
  </div>

</template>


<script>
    import Utils from 'utils';
    export default {
        name: 'textfield',
        created () {
            this.currentValue = (this.value === undefined || this.value === null) ? '' :  this.value
        },
        data(){
            return {
                currentValue: '',
                isClearShow: false,
                isCodeSend: this.isCodeClick,
                isPwdShow: this.pwdShow,
                captchaTime: this.time,
                pwdValue: '',
                isDisabled: this.disabled
            }
        },
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value: [String, Number],
            name: String,
            placeholder: String,
            disabled: {
                type: Boolean,
                default: false
            },
            disableSystemKeyboard: {
                type: Boolean,
                default: false
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            maxlength: Number,
            isCaptcha: {
                type: Boolean,
                default: false
            },
            time:{
                type: Number,
                default: 30
            },
            isCodeClick:{
                type: Boolean,
                default: false
            },
            pwdShow:{
                type: Boolean,
                default: false
            }
        },
        methods: {
            clear () {
                this.currentValue = '';
                this.pwdValue = '';
            },
            focus () {
                this.$refs.input.focus()
            },
            blur () {
                this.$refs.input.blur()
            },
            onFocus ($event) {
                if(this.currentValue !== ""){
                    this.isClearShow = true;
                }
                this.$emit('onfocus', this.currentValue, $event)
            },
            onBlur ($event) {
                this.$emit('on-blur', this.currentValue, $event);
                this.$emit('onblur',this.currentValue, $event)


            },
            //weex不支持keyup事件
            onReturn ($event) {
                if ($event.key === 'Enter') {
                    $event.target.blur()
                    this.$emit('on-enter', this.currentValue, $event)
                }
            },
            onInput($event) {
                this.$emit('oninput', this.currentValue, $event)
            },
            onChange($event) {
                this.$emit('on-change', this.currentValue, $event)
            },
            onPwdFocus ($event) {
                this.currentValue = this.pwdValue;
                if(this.currentValue !== ""){
                    this.isClearShow = true;
                }
                this.$emit('onfocus', this.currentValue, $event)
            },
            onPwdBlur ($event) {
                this.isClearShow = false;
                this.$emit('on-blur', this.currentValue, $event)
            },
            //weex不支持keyup事件
            onPwdReturn ($event) {
                this.currentValue = this.pwdValue;
                if ($event.key === 'Enter') {
                    $event.target.blur()
                    this.$emit('on-enter', this.currentValue, $event)
                }
            },
            onPwdInput($event) {
                this.currentValue = this.pwdValue;
                this.$emit('on-input', this.currentValue, $event)
            },
            onPwdChange($event) {
                this.currentValue = this.pwdValue;
                this.$emit('on-change', this.currentValue, $event)
            },
            getPwdCaptcha() {
                this.$emit("captchaClicked");
            },
            countDown(){
                this.isCodeSend = true;
                var myVar = setInterval(() => {
                    if (this.captchaTime === 1) {
                        this.isCodeSend = false;
                        this.captchaTime = this.time;
                        clearInterval(myVar);
                        this.$emit('codeSendEnd');
                    } else {
                        this.captchaTime--;
                    }
                }, 1000)
            },
            toggleEye(){
                if(this.isPwdShow){
                    /* 关闭密码 */
                    this.isPwdShow = false;
                    this.currentValue = this.pwdValue;
                    if(Utils.env.isWeb()){
                        this.$nextTick( () => {
                            this.$refs.input.focus();
                            this.$refs.input.blur();
                        })
                    }
                }else{
                    /* 显示密码 */
                    this.isPwdShow = true;
                    this.pwdValue = this.currentValue;
                    if(Utils.env.isWeb()){
                        this.$nextTick( () => {
                            this.$refs.input1.focus();
                            this.$refs.input1.blur();
                        })
                    }
                }
            },
            getCaptcha(){
                this.$emit("sendCaptcha");
            }
        },
        watch: {
            value (val) {
                this.currentValue = val
            },
            currentValue (newVal) {
                if (newVal !== "" && !this.isDisabled) {
                    this.isClearShow = true;
                }else{
                    this.isClearShow = false;
                }
                this.$emit('input', this.currentValue);
            }
        }
    }
</script>

<style scoped>
  .textfiled-input-container{
    flex-direction: row;
    justify-content: space-between;
    height: 96px;
    padding-top: 24px;
    padding-bottom: 24px;
    border-bottom-width: 1px;
    border-bottom-color: #e8e8e8;
  }
  .textfiled-input-row{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
  .textfiled-input {
    height: 48px;
    font-size: 30px;
    color: #666;
    flex: 1;
  }
  .textfiled-input__clear{
    width: 32px;
    height: 32px;
    margin-left: 10px;
  }
  .textfiled-eye-container{
    margin-left: 20px;
    padding: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .textfiled-icon-eye{
    width: 40px;
    height: 30px;
  }
  .textfiled-captcha-container{
    width: 160px;
    padding-left: 20px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-left-width: 1px;
    border-left-color: #e8e8e8;
  }
  .textfiled-captcha-text{
    font-size: 28px;
    color: #3c94fe;
  }
  .textfiled-captcha-count{
    font-size: 28px;
    color: #666;
  }
</style>
