<template>
  <div class="content-fluid">
      <div class="back">
          <router-link to="/"><img src="../assets/4.png" alt=""></router-link>
          <div class="logo"><img src="../assets/logo.png" alt=""></div>
    </div>

      <div class="titles">
          <div class="label">
              <h2>{{contonsl.title}}</h2>
              <!-- <a href="###">{{contonsl.author.loginname}}</a> -->
              <span v-if="contonsl.top">置顶</span>
              <span v-if="contonsl.good">精华</span>
              <span v-if="contonsl.tab === 'share'">分享</span>
              <span v-if="contonsl.tab === 'ask'">回答</span>
              <span v-if="contonsl.tab === 'job'">招聘</span>
              
          </div>
          
          <!-- namelogo -->
          <div class="namelogo">
              <img :src="contonsl.author.avatar_url" >
              <!-- 日期 -->
              <span>{{contonsl.create_at | formtime}}</span>

              <!-- 回复数 -->
              <span><img src="../assets/1.png" alt="">{{contonsl.visit_count}}</span>

              <!-- 访问数 -->
              <span><img src="../assets/2.png" alt="">{{contonsl.reply_count}}</span>

                <!-- 收藏 -->
              <div class="coll">收藏</div>
          </div>
      </div>

      <div class="namecon" v-html="contonsl.content">
          {{contonsl.content}}
      </div>

        <!-- 评价 -->
        <div class="evea">
          <h4>评价（{{Info.length}}）</h4>
          <li v-for="(infor,key) in Info" :key="key">
                <img :src="infor.author.avatar_url" :alt="infor.author.loginname">

                <!-- 名字 -->
                <div class="inname" style="color: #076def;">{{infor.author.loginname}}</div>

                <!-- 时间 -->
                <div class="intime">{{infor.create_at | formtime}}</div>

                <!-- 楼层 -->
                <div class="lou">{{key+1}} 楼</div>

                <!-- 回复 -->
                <div class="inda"><div>回复　</div>赞：{{infor.ups.length}}</div>

                <!-- 内容 -->
                <div class="incont" v-html="infor.content">{{infor.content}}</div>
          </li>
        </div>

  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
    name: 'content',
    data(){
      return{
        contonsl: {
            author:{}
        },
        Info: ''
      }
    },
    created(){
        // this.$store.dispatch('content',this.$route.query.id)
        axios.get('https://cnodejs.org/api/v1/topic/' + this.$route.query.id)
          .then(response => {
             this.Info = response.data.data.replies
             this.contonsl = response.data.data
          })
          .catch(err => {
              console.log(err)
          })
    },
    filters:{
        formtime(data){
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
    },
    computed:{
        ...mapState([
          'contentl'
        ])
    }
}
</script>

<style lang='scss'>

.content-fluid{
        background: #fff;
    position: absolute;
    z-index: 2;
    width: 100%;
    overflow: hidden;

    // 评价
    .evea{
            padding-top: 1rem;
            border-top: 1px solid #ddd;
            padding: 0.2rem;
            margin-top: 2rem;  

            li{
                margin: 3rem 1rem;
                height: auto;
                display: flow-root;
                border-radius: 0.3rem;
                box-shadow: 0 1px 2px #ddd;
                box-sizing: border-box;
                padding: 0.5rem;


                img{
                    width:3rem;
                    border-radius: 50%;
                    vertical-align: middle;
                    float:left;
                }

                div{
                    float: left;
                }

                .inda{
                        font-size: 0.9rem;
                        margin-top: 2rem;
                        margin-bottom: -1.15rem;
                        float: right;
                }

                .inname,.intime,.lou{
                    margin-left: 1rem;
                    font-size: 0.9rem;
                }

                .incont{
                    margin-top: 1.3rem;
                    min-width: 80%;

                    p{
                        font-size:0.9rem;margin-bottom:0.3rem;
                    }
                }
            }
    }

    // 头
    .back{
            height: 3rem;
            box-sizing: border-box;
            position: relative;
            background: #579ffb;
            box-shadow: 0 1px 1px #d8d6d6;
            color: #fff;
            line-height: 3rem;
            position: fixed;
            width: 100%;
            top: 0;
            padding: 0.5rem;
            text-align: center;

            a{
                height:100%;
                float: left;
                line-height: 2rem;
            }

            .logo{
                height: 100%;
                position: absolute;z-index:3;
                left: 0;right:0;top:0;bottom:0;margin: auto;display: none;
            }

            img{
                max-height: 100%;
                vertical-align: middle;
            }
    }


    // title
    .titles{
        padding: 0 0.5rem;
        margin-top:4rem;

        .label{
            margin: 0.5rem 0;

            h2{
                    font-size: 1.3rem;
                    font-weight: bolder;
                    color: #3d3c3c;
                    border-bottom: 1px solid #eceaea;
                    padding-bottom: 0.5rem;
                    margin-bottom: 0.5rem;
            }

            span{
                    img{
                        vertical-align: middle;
                    }

                   font-size: 0.7rem;
                    background: #1c74e2;
                    padding: 0.1rem 0.5rem;
                    color: #fff;
                    border-radius: 0.3rem;
                    margin: 0 0.3rem;
            }
        }

        .namelogo{

            span{
                    font-size: 0.9rem;
                    margin-left: 1rem;

                    img{
                        width: 0.9rem;
                        border-radius: 0;
                        vertical-align: middle;
                        margin-right: 0.2rem;
                    }
            }

            .coll{
                float: right;
                margin-right: 0.7rem;
                background: #0cbb0b;
                font-size: 0.9rem;
                padding: 0.2rem 0.6rem;
                border-radius: 0.3rem;
                color: #fff;
                margin-top: 0.5rem;
            }

            >img{
                border-radius: 50%;
                box-shadow: 0 1px 3px #ddd;
                width: 3rem;
                vertical-align: middle;
            }
        }
    }

    // 内容
    .namecon{
            padding: 0 0.5rem;
            margin-top: 2rem;

      *{
        max-width: 100%;
        // margin-bottom: 1rem;
        letter-spacing: 0.05rem;
        font-size: 0.9rem;
        line-height: 1.5rem;
      }

      h1,h2,h3,img,table,p{
        display: block;
        margin:0.8rem 0;
      }

      blockquote{
        border-left: 5px solid #eee;
         text-indent: 0em;

         p{
             padding-left: 1rem;
         }
      }
      
      p,li{
        list-style-type:circle;
      }

      li{
              list-style-type: disc;
              margin-left: 1.5rem;
      }

      hr{
        margin: 1rem 0;
      }

      h2{
            font-size: 1.3rem;
            font-weight: bolder;
            color: #3d3c3c;
      }

      table{
            display: block;
            overflow: auto;
            word-break: normal;
            word-break: keep-all;

            thead{
                    display: table-header-group;
                    vertical-align: middle;
                    border-color: inherit;
                    width:ato;
            }

            tr{
                    background-color: #fff;
                     border-top: 1px solid #ccc;
            }

            td{
                padding: 6px 13px;
                border: 1px solid #ddd;
            }

            tbody{
                    display: table-row-group;
                    vertical-align: middle;
                    border-color: inherit;
            }
      }
    }
    a{
        color:#4487dc;    font-size: 0.9rem;display:inline-block;
      }
}
</style>
