<template>
  <div class="top">
        <div class="titles"><img src="../assets/logo.png" alt=""> Cnode</div>
        <div class="page">
            <li @click="refr('all')" :class="{'active': className === 'all'}">全部</li>
            <li @click="refr('good')" :class="{'active': className === 'good'}">精华</li>
            <li @click="refr('share')" :class="{'active': className === 'share'}">分享</li>
            <li @click="refr('ask')" :class="{'active' : className === 'ask'}">问答</li>
            <li @click="refr('job')" :class="{'active': className === 'job'}">招聘</li>
        </div>
    </div>
    <!-- //top -->
</template>

<script>
import store from '@/vuex/store'
import { mapState,mapMutations,mapActions } from 'vuex'
export default {
    name: 'Top',
    methods:{
        ...mapMutations([
            // 'refr'
        ]),
        ...mapActions([
            'refr'
        ])
    },
    computed:{
        ...mapState([
            'className'
        ])
    }
}
</script>

<style lang='scss'>
.top{
    width: 100%;
    height:auto;
    background: #579ffb;
    position: fixed;
    top:0;left:0;
    z-index: 2;
    box-shadow: 0 2px 5px #d8d6d6;

    .titles{
                text-align: center;
                height: 2.5rem;
                color: #fff;
                line-height: 2.5rem;
                font-size: 1.5rem;

            img{
                vertical-align:middle;
                max-height:90%;
            }
    }

    // page
    .page{
        width:100%;
        height: auto;
        padding: 0.5rem 0;
        overflow: hidden;

        li{
            float: left;color:#fff;list-style: none;
            width: 20%;text-align: center;
            transition:0.2s;
        }

        .active{
            position: relative;
            color: #fff;
            text-shadow: 0 1px 1px #1f1b1b;

            &:before{
                content: '';
                position: absolute;
                background: #fff;
                width: 2.2rem;
                height: 0.085rem;
                left: 0;
                right: 0;
                margin: auto;
                bottom: -0.3rem;
                box-shadow: 0 1px 1px #676767;
            }
        }
    }
}
</style>
