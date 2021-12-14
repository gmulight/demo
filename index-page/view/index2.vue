
<template>
    <div>
        <div class="top-wrap">
            <div class="top-title">
                <h1>投资赢家</h1>
            </div>
            <img src="images/c0.png" class="topimg" />
        </div>

        <div class="nav-wrap">
            <div class="flex flex-cloum nav-content" v-for="(v,k) in navs" :key="k">
                <img :src="v.src" />
                <span>{{v.title}}</span>
            </div>
        </div>
        <div class="notice-wrap">
            <img src="images/notice.png" />
            <p>公司免费软件“招金策”已更新，请及时更新</p>
        </div>

        <div class="title" style="margin-top:0.4rem;">
            <span>自选合约</span>
        </div>

        <div class="main-wrap">
            <div class="flex flex-cloum main-content bg-red">
                <em>沪深1803</em>
                <span>4312.0</span>
                <p>+31.80 +0.74%</p>
            </div>
            <div class="flex flex-cloum main-content bg-green">
                <em>沪深1803</em>
                <span>4312.0</span>
                <p>+31.80 +0.74%</p>
            </div>
            <div class="flex flex-cloum main-content bg-red">
                <em>沪深1803</em>
                <span>4312.0</span>
                <p>+31.80 +0.74%</p>
            </div>
        </div>


    </div>
</template>
<script>
    export default {
        data(){
            return {
                navs:[
                    {title:'在线开户',src:'images/c1.png'},
                    {title:'原油专区',src:'images/c2.png'},
                    {title:'意见反馈',src:'images/c3.png'},
                    {title:'机构动向',src:'images/c4.png'},
                    {title:'期市日历',src:'images/c5.png'},
                    {title:'投教学院',src:'images/c6.png'}
                ]
            }
        },
        methods:{
        }
    }
</script>
<style lang="less" scoped>
.top-wrap{ 
    height: 3.54rem; background: #fff;
    .top-title{
        padding-top: 0; height: 0.94rem;
        h1{ color: #333; font-size: 0.36rem;}
    }
}
.topimg{display: block; width: 6.9rem; height: 2.6rem; margin: 0 auto;}
.nav-wrap{
    height: 4.2rem; flex-wrap: wrap; margin-top: 0.2rem;
    .nav-content{
        width: 2.5rem;
        span{ color: #666; margin-top: 0.24rem;}
    }
}
.notice-wrap{
    margin-top: 0.2rem;
    img{ width: 0.28rem; height: 0.24rem;}
}

.main-wrap{
    height: 2.28rem; background: #fff; padding: 0 0.3rem;
    .main-content{ 
        width: 2.18rem; height: 1.6rem; border-radius: 0; background-size: 100% 100%;
        em{ color: #fff; font-size: 0.28rem;margin-top: 0;}
        span{ color: #fff; font-size: 0.4rem;margin-top: 0.2rem;}        
        p{ color: #fff; font-size: 0.24rem;margin-top: 0.2rem;}
    }
}
.bg-red{ background: url("../images/c-red.png") no-repeat;}
.bg-green{ background: url("../images/c-green.png") no-repeat;}
</style>
