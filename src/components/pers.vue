<template>
  <div class="pers">
      <!-- 登录 -->
      <div class="admin">
          <img src="../assets/logo.png" alt="">
          <input type="text" placeholder="请在node获取access Token 并输入" v-model="token">
          <button @click="admin(token)">登录</button>
      </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
    name: 'Pers',
    data(){
        return{
            token: '1'
        }
    },
    computed:{
        ...mapState([
            'contentl'
        ])
    },
    methods:{
        ...mapActions([
            'admin'
        ])
    }
}
</script>

<style lang="scss">
.pers{
    width:95%;margin:0 auto;
    margin-top: 3rem;

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
                color: #579ffb;
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
