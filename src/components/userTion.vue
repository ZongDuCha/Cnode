<template>
  <div class="userTion">
      <router-link :to="{path: 'Content', query:{id: list.id}}" v-for="(list,key) in tionCont" :key="key">
          <!-- {{list}} -->
          <img v-if="list.author.avatar_url" :src="list.author.avatar_url || list.avatar_url" alt="list.author.loginname">
          <p class="titles">{{list.title}}</p>
          <p class="time">{{list.last_reply_at | formatDate}}</p>
      </router-link>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState,mapActions } from 'vuex'
export default {
    name: 'userTion',
    computed:{
        ...mapState([
            'tionCont'
        ])
    },
    methods:{
        ...mapActions([

        ])
    },
    created(){
        this.$store.dispatch('pers')
        console.log(this.$route.query.id)
        this.$store.dispatch('tions',this.$route.query.id)
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
.userTion{
    width:100%;padding-top: 3rem;
    height: 100%;background: #f1f1f1;

    a{
        display: block;
        width: 100%;
        min-height: 3.2rem;
        margin: 0.6rem 0;
        overflow: hidden;
        background: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 1rem;
        color: #000;

     img{
        max-height: 100%;
        float: left;
        height: 3rem;
        border-radius: 0.3rem;
        margin-right: 0.5rem;
     }

     p{
         font-size: 0.85rem;margin-bottom:0.7rem;
     }
    }
}
</style>
