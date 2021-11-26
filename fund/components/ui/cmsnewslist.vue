<template>
  <div v-if="showList.length">
    <div class="bgc-white mt15">
      <div class="infor-head flex-row align-center pl30 pr30">
        <image src="images/home-i1.png" class="home-icon"></image>
        <text class="font-14 m-color-1 font-bold ml10">最新资讯</text>
        <div class="flex-1 align-end">
            <text class="font-14 m-color-6">更多</text>
        </div>
        <div class="line-other"></div>
      </div>
      <div>
        <div class="pt30 pb30 pl30 pr30 flex-row align-center" v-for="(item, index) in showList" :key="'asia'+index">
          <div class="flex-row align-center flex-1">
            <div class="flex-1">
              <text class="text-titles lines2">{{item.title}}</text>
              <text class="font-12 line34 m-color-99">{{item.create_time}}</text>
            </div>
            <image src="images/new-pic1.png" v-if="index==0" class="news-img"></image>
            <image src="images/new-pic2.png" v-if="index==1" class="news-img"></image>
            <image src="images/new-pic3.png" v-if="index==2" class="news-img"></image>
          </div>
          <div class="line-hot"></div>
        </div>
      </div>
     
    </div>
  </div>
</template>
<script>
  import Light from 'light';
  import API from "../../api/api.js";

  export default {
    name: "asiacomp",
    props: {
      infoList: {
        type: Object
      }
    },
    data() {
      return {
        showList: []
      }
    },
    created() {
      this.showList = this.infoList.dataList
    },
    methods: {
      goDetail: function(e) {
        if(e) {
          //$.route.hsOpen(e);
          API.openWebPage(e);
        }
      },
      goMore: function() {
        //$.route.hsOpen(this.infoList.cmsExtendedUrl);
        API.openWebPage(this.infoList.cmsExtendedUrl);
      }
    },
    watch: {
    }
  }
</script>

<style scoped src="../../css/ui.css"></style>
<style scoped>
  .line40 {
    line-height: 40px;
  }
  
  .line50 {
    line-height: 50px;
  }
  
  .news-img {
    width: 178px;
    height: 128px;
    margin-left: 20px;
  }
  
  .m-color-99 {
    color: #999999;
  }
  
  .mr64 {
    margin-right: 64px;
  }
  
  .text-titles {
    height: 84px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 30px;
    color: #333333;
    line-height: 42px;
    margin-bottom: 12px;
    font-weight: bold;
  }
  .infor-head {
      height: 90px;
      position: relative;
  }
  .home-icon {
      width: 30px;
      height: 30px;
  }
  .line-other {
      position: absolute;
      bottom: 0;
      left: 0px;
      right: 0;
      content: " ";
      width: auto;
      height: 1px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: #e8e8e8;
      transform: scaleY(0.5);
  }
  .line-hot {
      position: absolute;
      bottom: 0;
      left: 40px;
      right: 40px;
      content: " ";
      width: auto;
      height: 1px;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: #e8e8e8;
      transform: scaleY(0.5);

    }
    .lines2{ lines:2; text-overflow: ellipsis;}
</style>