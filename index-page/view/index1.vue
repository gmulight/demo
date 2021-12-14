
<template>
    <div>
        <div class="top-wrap">
            <div class="top-title">
                <img src="images/service.png" />
                <h1></h1>
                <img src="images/message.png" />
            </div>
            <img src="images/i0.png" class="topimg" />
        </div>

        <div class="nav-wrap">
            <div class="flex flex-cloum nav-content" v-for="(v,k) in navs" :key="k">
                <img :src="v.src" />
                <span>{{v.title}}</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="notice-wrap">
            <span>公告</span>
            <p>公司免费软件“招金策”已更新，请及时更新</p>
        </div>
        <div class="line"></div>

        <div class="question flex just-between flex-row">
            <div class="flex flex-cloum just-center">
                <p>有问题</p>
                <span>请点击我哦</span>
            </div>
            <img src="../images/i7.png" />
        </div>


    </div>
</template>
<script>
    export default {
        data(){
            return {
                navs:[
                    {title:'在线开户',src:'images/i1.png'},
                    {title:'原油专区',src:'images/i2.png'},
                    {title:'意见反馈',src:'images/i3.png'},
                    {title:'机构动向',src:'images/i4.png'},
                    {title:'期市日历',src:'images/i5.png'},
                    {title:'投教学院',src:'images/i6.png'}
                ]
            }
        },
        methods:{
        }
    }
</script>
<style lang="less" scoped>
.top-wrap{ 
    height: 3.68rem; background: linear-gradient(270deg,rgba(25,163,193,1) 0%,rgba(46,112,203,1) 100%);
    .top-title{padding-top: 0;}
}
.topimg{display: block; width: 5.92rem; height: 2.68rem; margin: 0 auto;}
.nav-wrap{
    height: 4.2rem; flex-wrap: wrap;
    .nav-content{
        width: 2.5rem;
        span{ color: #666; margin-top: 0.24rem;}
    }
}
.notice-wrap{
    span{ background: #fff; color: #FFA72B; font-size: 0.28rem;}
}
.question{
    height: 2.56rem; background: #fff; padding: 0.22rem 0.5rem 0.22rem 0.68rem;
    p{color: #333; font-size: 0.48rem; font-weight: bold;}
    span{color: #333; font-size: 0.36rem; margin-top: 0.5rem;}
    img{ width: 3.24rem; height: 2.56rem;}
}
</style>
