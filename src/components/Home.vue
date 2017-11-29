<template>
  <div class="container">
    <div class="page">
        <li @click="refr('all')" :class="{'active': className === 'all'}">全部</li>
        <li @click="refr('good')" :class="{'active': className === 'good'}">精华</li>
        <li @click="refr('share')" :class="{'active': className === 'share'}">分享</li>
        <li @click="refr('ask')" :class="{'active' : className === 'ask'}">问答</li>
        <li @click="refr('job')" :class="{'active': className === 'job'}">招聘</li>
    </div>
    
      <!-- conter -->
      <div class="conter">
            <li v-for="(list,key) in conton.data" :key="key">
                <img :src="list.author.avatar_url" :alt="list.author.loginname" title="list.author.loginame">
                <div class="good" v-show="list.good">精华</div>
                <div class="tops" v-show="list.top">置顶</div>
                <div @click="show = false">
                    <router-link :to="{ path: 'Content', query: {id:list.id}}" class="title" :title="list.title">{{list.title}}</router-link>
                </div>
                <div class="time">{{list.create_at | formatDate}}更新</div>
            </li>
      </div>
      <div class="pagetions">
          <a href="javascript:void(0)" @click="prev()">上一页</a>
          <a href="javascript:void(0)" @click="next()">下一页</a>
      </div>
      <div class="scrolltop" @click="scrolltop">Top</div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState,mapActions } from 'vuex'
export default {
    name:'Home',
    data(){
        return {
            _thisroll: 0,
            show:true
        }
    },
    methods:{
        scrolltop(){
            var i = this._thisroll
            var setl = setInterval(() => {
                i-= 60;
                window.scrollTo(i,i)
                i <= 0 ? clearInterval(setl) : '';
            },0)
        },
        ...mapActions([
            'prev',
            'next',
            'refr'
        ])
    },
    computed:{
        ...mapState([
            'conton',
            'className'
        ])
    },
    created(){
        this.$store.dispatch('refr','all')
        window.onscroll = () => {
            let _thists = document.querySelector('.top .titles')
            let _thistop = document.querySelector('.scrolltop')
            if(document.documentElement && document.documentElement.scrollTop){
                this._thisroll = document.documentElement.scrollTop
            }else{
                this._thisroll = document.body.scrollTop
            }
            
            // if(this.show){
            //     if(this._thisroll > 100 || _thists == true){
            //         _thists.style.display = 'none';_thistop.style.right = '10%'
            //     }else{
            //         _thists.style.display = 'block';_thistop.style.right = '-10%'
            //     }
            // }
        }
    },
    filters:{
        formatDate(data){
            var data  = new Date(data);
            var time = new Date().getTime() - data.getTime()
            if (time < 0) {
            return ''
          } else if ((time / 1000 < 30)) {
            return '刚刚'

          } else if (time / 1000 < 60) {
            return parseInt((time / 1000)) + '秒前'

          } else if ((time / 60000) < 60) {
            return parseInt((time / 60000)) + '分钟前'

          } else if ((time / 3600000) < 24) {
            return parseInt(time / 3600000) + '小时前'

          } else if ((time / 86400000) < 31) {
            return parseInt(time / 86400000) + '天前'

          } else if ((time / 2592000000) < 12) {
            return parseInt(time / 2592000000) + '月前'

          } else {
            return parseInt(time / 31536000000) + '年前'

          }
        }
    }
}
</script>

<style lang="scss">
body{
    margin:0;padding:0;
    width:100%;height:auto;
}
// page
.page{
    width: 100%;
    height: auto;
    padding: 0.5rem 0;
    overflow: hidden;
    margin-top: 2.5rem;
    background: #579ffb;
    box-shadow: 0 2px 5px #d8d6d6;

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
@mixin postion(){
    font-size: 0.07rem;
    padding: 0.1rem 0.3rem;
    bottom: 0.4rem;
    position: absolute;
    color: #fff;
    border-radius: 0.2rem;
}

.container{
    .pagetions{
        padding: 0.7rem;
        
        a{
        font-size: 0.9rem;
        background: #4487dc;
        color: #fff;
        padding: 0.3rem 0.7rem;
        border-radius: 0.3rem;
        margin-left: 5%;

            &:nth-child(2){
                float: right;
                margin-right:5%;
            }
        }
    }

    .scrolltop{
        position: fixed;
        right: -10%;
        bottom: 8%;
        border-radius: 50%;
        border: 1px solid #01d483;
        width: 1.6rem;
        height: 1.6rem;
        padding: 0.3rem;
        font-size: 0.8rem;
        font-weight: bold;
        line-height: 1.6rem;
        color: #01d483;
        z-index: 2;
        background: #fff;
        text-shadow: 0 1px 1px #afaaaae3;
    }
    .conter{
        margin-top:0.5rem;

        li{
                width: 98%;
                height: 5.5rem;
                position: relative;
                border-bottom: 1px dashed #ddddddba;
                margin: 0 auto;

            .good{
                    @include postion();
                    background: #38d044;
                    width: 1.5rem;
                    right: 6.5rem;
            }

            .tops{
                    @include postion();
                    background: #38d044;
                    width: 1.5rem;
                    right: 9.5rem;
            }

            .title{
                    position: absolute;
                    font-size: 0.85rem;
                    width: 81%;
                    top: 0.5rem;
                    left: 4.3rem;
                    letter-spacing: 0.05rem;
                    color:#000;
            }

            img{
                        border-radius: 10%;
                        width: 3.5rem;
                        position: absolute;
                        top: 1rem;
                        left: 0.2rem;
                        -webkit-box-shadow: 0 1px 4px #ccc;
                        box-shadow: 0 1px 4px #ccc;
            }

            .time{
                    @include postion();
                    right: 0.7rem;
                    background: #4e81f7;
            }
        }
    }
}
</style>
