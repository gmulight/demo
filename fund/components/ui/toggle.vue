<template>
    <div>
        <div class="toggle-container0" @click="toggle" ref="bg" v-if="!open">
            <div class="toggle-ball0" ref="ball" ></div>
        </div>
        <div class="toggle-container1" @click="toggle" ref="bg" v-if="open">
            <div class="toggle-ball1" ref="ball" ></div>
        </div>
    </div>
</template>

<style scoped>
    .toggle-container0{
        position: relative;
        width: 80px;
        height: 40px;
        background-color: #cccccc;
        border-radius: 40px;
        flex-direction: row;
        align-items: center;
    }
    .toggle-container1{
        position: relative;
        width: 80px;
        height: 40px;
        background-color: #3580ed;
        border-radius: 40px;
        flex-direction: row;
        align-items: center;
    }
    .toggle-ball0{
        width: 36px;
        height: 36px;
        margin-left: 2px;
        border-radius: 36px;
        background-color: #ffffff;
    }
    .toggle-ball1{
        width: 36px;
        height: 36px;
        margin-left: 42px;
        border-radius: 36px;
        background-color: #ffffff;
    }
</style>

<script>
import Light from 'light';
    const animation = Light.requireModule('animation')
    export default {
        name: "toggle",
        props: {
            opened: {
                default: true
            },
            autoSwitch: {
                default: true
            }
        },
        data(){
            return {
                isOpened: this.opened,
                open: false
            }
        },
        methods:{
            open0(){
                var el = this.$refs.ball;
                var bg = this.$refs.bg;
                animation.transition(el, {
                        styles: {
                            transform: 'translate(39.5px, 0px)',
                        },
                        duration: 300,
                        timingFunction: 'ease',
                        delay: 0
                    }, function () {}
                )
                animation.transition(bg, {
                        styles: {
                            backgroundColor: '#3580ed',
                        },
                        duration: 300,
                        timingFunction: 'ease',
                        delay: 0
                    }, function () {}
                )
            },
            close0(){
                var el = this.$refs.ball;
                var bg = this.$refs.bg;
                animation.transition(el, {
                        styles: {
                            transform: 'translate(0px, 0px)',
                        },
                        duration: 300,
                        timingFunction: 'ease',
                        delay: 0
                    }, function () {}
                )
                animation.transition(bg, {
                        styles: {
                            backgroundColor: '#cccccc',
                        },
                        duration: 300,
                        timingFunction: 'ease',
                        delay: 0
                    }, function () {}
                )
            },
            open1(){
                var el = this.$refs.ball;
                var bg = this.$refs.bg;
                animation.transition(el, {
                        styles: {
                            transform: 'translate(0px, 0px)',
                        },
                        duration: 300,
                        timingFunction: 'ease',
                        delay: 0
                    }, function () {}
                )
                animation.transition(bg, {
                        styles: {
                            backgroundColor: '#3580ed',
                        },
                        duration: 300,
                        timingFunction: 'ease',
                        delay: 0
                    }, function () {}
                )
            },
            close1(){
                var el = this.$refs.ball;
                var bg = this.$refs.bg;
                animation.transition(el, {
                        styles: {
                            transform: 'translate(-39.5px, 0px)',
                        },
                        duration: 300,
                        timingFunction: 'ease',
                        delay: 0
                    }, function () {}
                )
                animation.transition(bg, {
                        styles: {
                            backgroundColor: '#cccccc',
                        },
                        duration: 300,
                        timingFunction: 'ease',
                        delay: 0
                    }, function () {}
                )
            },
            toggle(){
                if (this.autoSwitch) {
                    this.switch();
                }
                this.$emit('toggle', this.isOpened);
            },
            switch() {
                if(!this.open){
                    if(this.isOpened){
                        this.close0();
                    }else{
                        this.open0();
                    }
                }else{
                    if(this.isOpened){
                        this.close1();
                    }else{
                        this.open1();
                    }
                }
                this.isOpened = !this.isOpened;
            },
            setToggleStatus(status) {
                this.open = status;
                this.isOpened = status;
            }
        }
    };
</script>
