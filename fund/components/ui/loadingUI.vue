<template>
    <div class='wrapper align-center justify-center' v-if="loadShow">
        <div class='loading align-center justify-center'>
            <image src="images/loading.gif" class="loading-img"></image>
        </div>
    </div>
</template>
<style scoped src="../../css/ui.css"></style>
<style scoped>
.wrapper{
    position: fixed;
    top:0;
    left:0;
    bottom:0;
    width: 750px;
}
.loading{
    width: 150px;
    height: 150px;
}
.loading-img{
    width: 150px;
    height: 150px;
}
</style>

<script>
export default {
  name: "loading",
  props: {
    loadShow: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {};
  },
  computed: {},
  methods: {
  }
};
</script>
