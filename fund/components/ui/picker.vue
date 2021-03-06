<template>
    <div class="container" :style="containerStyle" @touchmove="touchMovehandler">
        <div class="bg">
            <div :class="[index!==(splitList.length-1)?'bottom-border':'']" v-for="(item, index) in splitList" :key="index" :style="heightStyle"></div>
        </div>
        <div class="list-container">
            <div class="list" ref="list1" :style="scrollerStyle" @panstart="onPanStart" @panmove="onPanMove1" @panend="onPanEnd1">
                <div class="item" :style="heightStyle" v-for="(item, index) in firstData" :key="index">
                    <text :class="['item-text', index==firstIndex?'active-text':'']">{{item}}</text>
                </div>
            </div>
            <div class="list" ref="list2" :style="scrollerStyle" v-if="pickerData.columns >= 2" @panstart="onPanStart" @panmove="onPanMove2" @panend="onPanEnd2">
                <div class="item" :style="heightStyle" v-for="(item, index) in secondData" :key="index">
                    <text :class="['item-text', index==secondIndex?'active-text':'']">{{item}}</text>
                </div>
            </div>
            <div class="list" ref="list3" :style="scrollerStyle" v-if="pickerData.columns == 3" @panstart="onPanStart" @panmove="onPanMove3" @panend="onPanEnd3">
                <div class="item" :style="heightStyle" v-for="(item, index) in thirdData" :key="index">
                    <text :class="['item-text', index==thirdIndex?'active-text':'']">{{item}}</text>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container{
        overflow: hidden;
    }
    .bg{
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        z-index: 10;
    }
    .list{
        z-index: 100;
        flex: 1;
    }
    .list-container{
        flex-direction: row;
    }
    .bottom-border{
        border-bottom-width: 1px;
        border-bottom-color: #e8e8e8;
    }
    .item{
        justify-content: center;
        align-items: center;
    }
    .item-text{
        font-size: 28px;
        color: #808080;
    }
    .active-text{
        font-weight: bold;
        color: #333333;
    }
</style>

<script>
import Light from 'light';
    const animation = Light.requireModule('animation');
    import Utils from 'utils';
    import Binding from 'weex-bindingx';

    export default {
        props: {
            id:{
                type:String,
                default:'1'
            },
            pickerData:{
                type: Object,
                default: () => {
                    return {
                        columns: 1,
                        data: [{key:1}, {key:2}, {key:3}, {key:4}, {key:5}]
                    }
                }
            }
        },
        data(){
            return {
                isMoving: false,
                rows: 5,
                rowHeight: 90,
                startY: 0,
                startTime: 0,
                gesToken: 0,
                firstData: [],
                firstIndex: 0,
                secondIndex: 0,
                thirdIndex: 0
            }
        },
        created(){
            let arr = [];
            this.pickerData.data.forEach(element => {
                arr.push(element.key);
            })
            this.firstData = arr;
        },
        computed:{
            secondData(){
                if(this.pickerData.columns == 1){
                    return [];
                }
                if(this.pickerData.columns == 2){
                    return this.pickerData.data[this.firstIndex].values;
                }
                if(this.pickerData.columns == 3){
                    let arr = [];
                    this.pickerData.data[this.firstIndex].values.forEach(element => {
                        arr.push(element.key);
                    });
                    return arr;
                }
            },
            thirdData(){
                if(this.pickerData.columns == 3){
                    return this.pickerData.data[this.firstIndex].values[this.secondIndex].values;
                }else{
                    return [];
                }
            },
            splitList(){
                return new Array(this.rows);
            },
            scrollerStyle(){
                return {
                    'height': this.pickerData.data.length * this.rowHeight + 'px',
                    'padding-top': (this.rows - 1)/2 * this.rowHeight + 'px'
                }
            },
            containerStyle(){
                return {
                    'height': this.rows * this.rowHeight + 'px'
                }
            },
            heightStyle(){
                return {
                    'height': this.rowHeight + 'px'
                }
            }
        },
        mounted(){
        },
        methods:{
            touchMovehandler(e){
                if(e.preventDefault){
                    e.preventDefault();
                }
            },
            getSelectedItem(callback){
                if(this.pickerData.columns == 1){
                    callback([this.firstIndex]);
                }
                if(this.pickerData.columns == 2){
                    callback([this.firstIndex, this.secondIndex]);
                }
                if(this.pickerData.columns == 3){
                    callback([this.firstIndex, this.secondIndex, this.thirdIndex]);
                }
            },
            onPanStart(e){
                this.startY = e.changedTouches[0].clientY;
                this.startTime = Date.now();
                e.preventDefault();
            },
            onPanMove1(e){
                e.preventDefault();
                this.onPanMove(e, this.$refs.list1, this.firstIndex);
            },
            onPanMove2(e){
                e.preventDefault();
                this.onPanMove(e, this.$refs.list2, this.secondIndex);
            },
            onPanMove3(e){
                e.preventDefault();
                this.onPanMove(e, this.$refs.list3, this.thirdIndex);
            },
            onPanMove(e, element, index){
                e.preventDefault();
                const moveY = e.changedTouches[0].clientY - this.startY;
                element && animation.transition(element, {
                    styles: {
                        transform: `translateY(${moveY - index*this.rowHeight}px)`
                    },
                    timingFunction: 'ease',
                    duration: 0
                }, () => {});
            },
            onPanEnd1(e){
                this.panEnd(e,'one');
            },
            onPanEnd2(e){
                this.panEnd(e,'two');
            },
            onPanEnd3(e){
                this.panEnd(e, 'three');
            },
            panEnd(e, flag){
                this.isMoving = true;
                let moveY = e.deltaY;
                if (Utils.env.isWeb()) {
                    moveY = e.changedTouches[0].clientY - this.startY;
                }

                let selectIndex,datas;
                if(flag == 'one'){
                    selectIndex = this.firstIndex;
                    datas = this.firstData;
                }
                if(flag == 'two'){
                    selectIndex = this.secondIndex;
                    datas = this.secondData;
                }
                if(flag == 'three'){
                    selectIndex = this.thirdIndex;
                    datas = this.thirdData;
                }

                let time = Date.now() - this.startTime;
                let speed = Math.abs(moveY) / time;
                /* 快速滚动距离系数 */
                let distance = moveY * speed / 0.1;

                let step, duration;
                if(moveY < 0){
                    /* 检测跟随滑动与快速滚动 */
                    if(speed > 1.0 && time < 100){
                        step = Math.round(distance / this.rowHeight);
                        /* 0.003 滚动时长系数 */
                        duration = speed / 0.003;
                    }else{
                        step = Math.round(moveY / this.rowHeight);
                        duration = 300;
                    }
                    selectIndex = selectIndex - step;
                    if (selectIndex > datas.length-1) {
                        selectIndex = datas.length-1;
                    }
                }else{
                    if(speed > 1.0 && time < 100){
                        step = Math.round(distance / this.rowHeight);
                        duration = speed / 0.003;
                    }else{
                        step = Math.round(moveY / this.rowHeight);
                        duration = 300;
                    }
                    selectIndex = selectIndex - step;
                    if(selectIndex < 0){
                        selectIndex = 0;
                    }
                }
                this.slideTo(selectIndex, duration, flag);
            },
            slideTo(selectIndex, duration, flag){
                let element;
                if(flag == 'one'){
                    element = this.$refs.list1;
                    this.firstIndex = selectIndex;
                }
                if(flag == 'two'){
                    element = this.$refs.list2;
                    this.secondIndex = selectIndex;
                }
                if(flag == 'three'){
                    element = this.$refs.list3;
                    this.thirdIndex = selectIndex;
                }

                this.$emit('selectedChange', {
                    id:this.id,
                    column: flag,
                    index: selectIndex
                } );
                element && animation.transition(element, {
                    styles: {
                        transform: `translateY(-${ (selectIndex * this.rowHeight) }px)`
                    },
                    timingFunction: 'ease',
                    duration
                }, () => {
                    this.isMoving = false;
                    /* 复原次级位置 */
                    if(flag == 'one'){
                        this.resetTwo();
                        this.resetThree();
                    }
                    if(flag == 'two'){
                        this.resetThree();
                    }
                });
            },
            getSelectedIndex(){
              return [
                  {
                      id: this.id,
                      column: 'one',
                      index: this.firstIndex
                  },
                  {
                      id: this.id,
                      column: 'two',
                      index: this.secondIndex
                  },
                  {
                      id: this.id,
                      column: 'three',
                      index: this.thirdIndex
                  }
              ]
            },
            setSelectedIndex(arr){
                let firstIndex = arr[0] || 0;
                let secondIndex = arr[1] || 0;
                let thirdIndex = arr[2] || 0;

                this.firstIndex = firstIndex;
                this.secondIndex = secondIndex;
                this.thirdIndex = thirdIndex;


                this.$refs.list1 && animation.transition(this.$refs.list1, {
                    styles: {
                        transform: `translateY(-${ (firstIndex * this.rowHeight) }px)`
                    },
                    timingFunction: 'ease',
                    duration: 0
                }, () => {
                });

                this.$refs.list2 && animation.transition(this.$refs.list2, {
                    styles: {
                        transform: `translateY(-${ (secondIndex * this.rowHeight) }px)`
                    },
                    timingFunction: 'ease',
                    duration: 0
                }, () => {
                });

                this.$refs.list3 && animation.transition(this.$refs.list3, {
                    styles: {
                        transform: `translateY(-${ (thirdIndex * this.rowHeight) }px)`
                    },
                    timingFunction: 'ease',
                    duration: 0
                }, () => {
                });

            },
            resetTwo(){
                if(this.$refs.list2){
                    animation.transition(this.$refs.list2, {
                        styles: {
                            transform: `translateY(0px)`
                        },
                        timingFunction: 'ease',
                        duration: 0
                    })
                    this.secondIndex = 0;
                }
            },
            resetThree(){
                if(this.$refs.list3){
                    animation.transition(this.$refs.list3, {
                        styles: {
                            transform: `translateY(0px)`
                        },
                        timingFunction: 'ease',
                        duration: 0
                    })
                    this.thirdIndex = 0;
                }
            }
        }
    }
</script>

