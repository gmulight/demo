<template>
  <div class="container"  v-if="show" :style="{height: scrollerHeight + 'px'}" @click="noMethod">
    <overlay @animationOver="toggleBox" :show="show"></overlay>
    <div class="dialog-box" v-if="show" :style="{top:top+'px'}" @click="noMethod">
        <slot></slot>
    </div>
  </div>
</template>

<style scoped>
  .container {
    position: fixed;
    width: 750px;
    /*兼容H5异常*/
    z-index: 99999;
  }

  .dialog-box {
    position: fixed;
    left: 75px;
    width: 600px;
    background-color: #FFFFFF;
  }

</style>

<script>
		import Overlay from './overlay';
    import Utils from "lighting-ui/packages/utils";
    export default {
        name: "dialog",
        components: { Overlay },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            top: {
              type: Number,
              default: 300
            },
        },
        data() {
            return {
              scrollerHeight:0
            }
        },
        methods: {
        	toggleBox() {
        	}
        },
       mounted() {
          this.scrollerHeight = Utils.env.getPageHeight();    
      }
    };
</script>
