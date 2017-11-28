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
              <p class="name">{{persName.loginname}}</p>
              <p class="clear" @click="clear">退出</p>
          </div>
      </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState,mapActions } from 'vuex'
export default {
    name: 'Pers',
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
        this.$store.dispatch('login',this.token)
    }
}
</script>

<style lang="scss">
.pers{
    width:95%;margin:0 auto;
    margin-top: 3rem;

    .content{
        width:100%;position: relative;
        
        
        .title{
            position: relative;
            width:100%;
            padding:15px;box-sizing:border-box;
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
