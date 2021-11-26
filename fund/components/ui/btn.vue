<template>
  <div class="button" :class="['button', size==='normal'?'btn-normal':'btn-min', type==='primary'?'primary':'ghost', disabled?'disabled':'']" @click="clickHandle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    disabled: {
      default: false
    },
    size: {
      default: "normal"
    },
    type: {
      default: "primary"
    }
  },
  name: "btn",
  methods: {
    clickHandle (event) {
      if (!this.disabled) {
        this.$emit("btnClicked", event);
      }
    }
  }
};
</script>
<style scoped>
.button {
  border-radius: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn-normal {
  height: 90px;
}

.btn-min {
  height: 50px;
}

.primary {
  color: #fff;
  background-color: #3580ed;
  border-width: 1px;
  border-color: #157fd0;
}
.ghost {
  color: #3580ed;
  background-color: #fff;
  border-width: 1px;
  border-color: #157fd0;
}
.disabled {
  background-color: #ccc;
  border-width: 1px;
  border-color: #ccc;
}
</style>


