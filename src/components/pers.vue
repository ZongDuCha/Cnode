<template>
  <div class="pers">
      <!-- 登录 -->
      <div class="admin" v-if="!usercont.userid">
          <img src="../assets/logo.png" alt="">
          <input type="text" placeholder="请在node获取access Token 并输入" v-model="token">
          <button @click="login(token)">登录</button>
      </div>
      <div v-if="usercont.userid" class="content">
          <div class="title">
              <img :src="persName.avatar_url" alt="">
              <p>Name:{{persName.loginname}}</p>
              <p>ID:{{usercont.token}}</p>
          </div>
        <div class="parit" v-if="persName.recent_replies">
            <router-link :to="{path: 'userTion', query:{id:'coll'}}">我收藏的话题<span>{{persName.coll.data.length}}</span> </router-link>
            <router-link :to="{ path: 'userTion', query: {id:'lies'}}">我参与的话题<span>{{persName.recent_replies.length}}</span> </router-link>
            <router-link :to="{path:'userTion', query:{id:'topics'}}">我创建的话题<span>{{persName.recent_topics.length}}</span> </router-link>
        </div>
        <p class="clear" @click="clear">退出</p>
      </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState,mapActions } from 'vuex'
export default {
    name: 'Per',
    data(){
        return{
            token: 'ba178155-5adf-471a-a5fb-9a1b394b47bc'
        }
    },
    computed:{
        ...mapState([
            'usercont',
            'contentl',
            'persName'
        ])
    },
    methods:{
        ...mapActions([
            'login',
            'clear'
        ])
    },
    created(){
        this.$store.dispatch('pers')
        // this.$store.dispatch('login',this.token)
    }
}
</script>

<style lang="scss">
html,body{
    width: 100%;height: 100%;
}
.pers{
    width:100%;margin:0 auto;height: 100%;
    padding-top: 3rem;background:#f1f4f7;

    .content{
        width:100%;position: relative;
        
        .parit{
            width: 100%;border-top:1px solid #dce3e4;border-bottom: 1px solid #dce3e4;
            margin-bottom: 1rem;background: #fff;box-sizing:border-box;padding-left: 1rem;

            a{
                display:block;color:#000;background: #fff;outline:none;
                border-bottom:1px solid #dce3e4;padding: 0.6rem 0;font-size:0.95rem;

                span{
                        border-radius: 50%;
                        margin-left: 1rem;
                        background: #dce3e4;
                        line-height: 1.45rem;
                        height: 1.4rem;
                        width: 1.4rem;
                        display: inline-block;
                        text-align: center;
                        font-size: 0.8rem;
                        color: #1e5188;
                }

                &:nth-child(3){
                    border:none;
                }
            }
        }

        >p{
            width:100%;padding:0.5rem 0;
            border-top:1px solid #dce3e4;border-bottom:1px solid #dce3e4;
            background:#fff;text-align: center;font-size: 0.95rem;
        }

        .title{
                    position: relative;
                    width: 100%;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;    overflow: hidden;
                    margin: 1rem 0;
                    border-top: 1px solid #dce3e4;
                    border-bottom: 1px solid #dce3e4;
                    background: #fff;
                    box-shadow: 0 0px 2px #fdfafa29;

            p{
                display: block;margin:0.6rem;font-size: 0.8rem;margin-bottom: 0.5rem;
                margin-left: 0.5rem;
            }

            img{
                    vertical-align: middle;
                    border: 1px solid #dce3e4;
                    height: 3rem;
                    float: left;
                    margin: 0.5rem;
                    border-radius: 0.5rem;
            }
        }
    }

    .admin{
        width:100%;
        text-align: center;

        img{
            width:5rem;
        }

        input{
                border: none;
                border-bottom: 2px solid #579ffb;
                width: 100%;
                height: 2rem;outline: none;
                color: #579ffb;text-align: center;
        }

        button{
                margin-top: 1rem;
                border: 1px solid #579ffb;
                background: #579ffb;
                color: #fff;
                padding: 0.5rem 1rem;
                border-radius: 0.4rem;
        }
    }
}
</style>
