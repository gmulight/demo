<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/10/25. -->
<!--A gray overlay mask-->

<template>
  <div>
    <div class="lc-overlay" ref="lc-overlay" v-if="show" :class="[navbarShow? 'top90': 'top0' ]"
      :hack="shouldShow" @click="overlayClicked" :style="overlayStyle" @touchmove.prevent.stop>
    </div>
  </div>
</template>

<style scoped>
  .lc-overlay {
    width: 750px;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .top0 {
    top: 0
  }
  .top90 {
    top: 90px;
  }
</style>

<script>
  import Light from 'light';
  const animation = Light.requireModule('animation');
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      },
      transparent: {
        type: Boolean,
        default: false
      },
      hasAnimation: {
        type: Boolean,
        default: true
      },
      duration: {
        type: [Number, String],
        default: 100
      },
      timingFunction: {
        type: Array,
        default: () => (['ease-in', 'ease-out'])
      },
      opacity: {
        type: [Number, String],
        default: 0.4
      },
      canAutoClose: {
        type: Boolean,
        default: true
      },
      navbarShow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      overlayStyle() {
        return {
          opacity: this.hasAnimation ? 0 : 1,
          backgroundColor: `rgba(0, 0, 0,${this.opacity})`
        }
      },
      shouldShow() {
        const {
          show,
          hasAnimation
        } = this;
        if (hasAnimation) {
          hasAnimation && setTimeout(() => {
            this.appearOverlay(show);
          }, 50);
        } else {
          this.appearOverlay(show);
        }
        return show;
      }
    },
    methods: {
      overlayClicked() {
        this.$emit('onOverlayClicked');
      },
      appearOverlay(bool, duration = this.duration) {
        const {
          transparent,
          hasAnimation,
          timingFunction,
          show
        } = this;
        const overlayEl = this.$refs['lc-overlay'];
        if (!transparent && hasAnimation && overlayEl) {
          animation.transition(overlayEl, {
            styles: {
              opacity: bool ? 1 : 0
            },
            duration: this.duration,
            timingFunction: timingFunction[bool ? 0 : 1],
            delay: 0
          }, () => {
            this.$emit('animationOver', {
              show: show
            });
          });
        } else {
          this.$emit('animationOver', {
            show: show
          });
        }
      }
    },
    watch: {
      show(newVal) {
        if (newVal == false) {
          this.$emit('animationOver', {
            show: newVal
          });
        }
      }
    }
  };
</script>
<doc>
  遮罩组件
</doc>