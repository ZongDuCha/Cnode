<template>
  <div class="container">
      <div class="top">
          <div class="titles"><img src="../assets/logo.png" alt=""> Cnode</div>
          <div class="page">
              <li>全部</li>
              <li>分享</li>
              <li>问答</li>
              <li>招聘</li>
          </div>
      </div>
      <!-- //top -->

      <!-- conter -->
      <div class="conter">
            <li v-for="(list,key) in conton.data" :key="key">
                <img :src="list.author.avatar_url" alt="">
                <div class="time">{{list.create_at | formatDate}}</div>
            </li>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name:'Home',
    data(){
        return {
            conton: ''
        }
    },
    methods:{
    },
    created(){
        axios.get('https://cnodejs.org/api/v1/topics')
            .then((response) => {
                this.conton = response.data
                console.log(this.conton)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    filters:{
        formatDate(data){
            var data  = new Date(data);
            var year = data.getFullYear();
            console.log(time)
            var moth = data.getMonth()+1;
            var time = data.getDate();
            return `${year}-${moth}-${time}`;
        }
    }
}
</script>

<style lang="scss">
body{
    margin:0;padding:0;
    width:100%;height:auto;
}

.container{
    .conter{

        li{
                width: 98%;
                height: 5.5rem;
                position: relative;
                border-bottom: 1px solid #ddd;
                margin: 0 auto;

            img{
                    border-radius: 50%;
                    width:2.7rem;
                    position: absolute;
                    top: 0.8rem;
                    left: 0.8rem;
                    box-shadow: 0 1px 4px #ccc;
            }

            .time{
                    font-size: 0.8rem;
                    position: absolute;
                    right: 0.7rem;
                    bottom: 0.7rem;
            }
        }
    }

    .top{
        width: 100%;
        height:auto;
        background: #579ffb;

        .titles{
                   text-align: center;
                    height: 3.2rem;
                    color: #fff;
                    line-height: 2.5rem;
                    font-size: 1.5rem;

                img{
                    vertical-align:middle;
                    max-height:60%;
                }
        }

        // page
        .page{
            width:100%;
            height: auto;
            padding-bottom:0.5rem;
            overflow: hidden;

            li{
                float: left;color:#fff;list-style: none;
                width: 25%;text-align: center;
            }
        }
    }
}
</style>
