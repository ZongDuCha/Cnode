<template>
  <div class="dope">
      <div class="content">
          <div class="dope-top">未读消息</div>
          <div class="dope-conten">
              <router-link :to="{path: 'Content', query:{id: list.topic.id}}" v-for="(list,key) in messCont.has_read_messages" v-if="messCont.has_read_messages.length !== 0" :key="key">
                  <img :src="list.author.avatar_url" :alt="list.author.loginname">
                  <p>来自: <span>{{list.author.loginname}}</span> <b>{{list.topic.last_reply_at | formatDate}}</b> </p>
                  <div v-html="list.reply.content" class="content">
                      {{list.reply.content}}
                  </div>
              </router-link>

              <div v-if="messCont.has_read_messages.length === 0" class="msggErr">没有消息。。</div>
          </div>
      </div>
      
      <div class="content">
          <div class="dope-top">已读消息</div>
          <div class="dope-conten">
              <router-link :to="{path: 'Content', query:{id: list.topic.id}}" v-for="(list,key) in messCont.hasnot_read_messages" v-if="messCont.hasnot_read_messages.length !== 0" :key="key">
                  <img :src="list.author.avatar_url" :alt="list.author.loginname">
                  <p>来自: <span>{{list.author.loginname}}</span> <b>{{list.topic.last_reply_at | formatDate}}</b> </p>
                  <div v-html="list.reply.content" class="content">
                      {{list.reply.content}}
                  </div>
              </router-link>

              <div v-if="messCont.hasnot_read_messages.length === 0" class="msggErr">没有消息。。</div>
          </div>
      </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState,mapActive } from 'vuex'
export default {
    name: 'dope',
    computed:{
        ...mapState([
            'messCont'
        ])
    },
    created(){
        this.$store.dispatch('message')
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
.dope{
    width:100%;padding-top: 3rem;overflow: hidden;
    height: 100%;background: #f1f1f1;

    .content{
        width: 100%;

        .dope-top{
            width: 100%;height: 2rem;background: #eff1f0;border-left:3px solid #ddd;
            padding-left:15px;line-height: 2rem;
        }

        .dope-conten{
            width: 100%;background: #fff;padding:10px 0;

            .msggErr{
                text-align:center;font-weight:bold;
            }

            >a{
                color:#000;padding-top:1px;
                display:block;width:100%;
                font-size: 0.9rem;border-bottom:1px dashed #ccc;padding-bottom:0.6rem;

                img{
                    height: 2.3rem;margin:0.3rem 0.8rem;float: left;
                    border-radius: 0.3rem;
                }

                >p{
                    margin:0.9rem;

                    span{
                        font-weight: bold;
                    }

                    b{
                        float: right;color:#387cd2;
                    }
                }

                .content{
                        margin-top: 0.5rem;
                        display: inline-block;
                        box-sizing:border-box;padding:0 1rem;

                        a{
                            color:#000;font-weight: bold;
                        }
                }
            }
        }
    }
}
</style>
