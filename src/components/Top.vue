<template>
    <div>
        <div class="top">
            <div class="logotitle">
                <div class="childe" @click="menu = !menu"></div>
                <img src="../assets/logo.png" alt=""> Cnode
                <router-link to='/slishow'><div class="slidepu"></div></router-link>
            </div>
        </div>
        
        <transition name="left">
            <div class="top-left" v-if="menu">
                <div class="tokenlogo">
                    <img :src="usercont.userurl" alt="" v-if="usercont.userurl">
                    {{usercont.username || '请登录'}}
                </div>
                <div class="listname" @click="menu = false">
                    <router-link :to="listn.path" v-for="(listn,key) in listname" :key="key">{{listn.name}}</router-link>
                </div>
            </div>
        </transition>
        <!-- //top -->
    </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState,mapMutations,mapActions } from 'vuex'
export default {
    name: 'Top',
    data(){
        return {
            menu: this.$store.state.menu,
            maxshow: true,
            listname:[
                {
                    'name': '首页',
                    'path': '/'
                },
                {
                    'name': '发表文章',
                    'path': 'Slishow'
                },
                {
                    'name': '消息',
                    'path': '/Dope'
                },
                {
                    'name': '个人中心',
                    'path': '/Pers'
                },
                {
                    'name': '关于',
                    'path': '/About'
                }
            ]
        }
    },
    computed:{
        ...mapState([
            'contentl',
            'usercont'
        ])
    }
}
</script>

<style lang='scss'>
.left-enter-active{
    transition: all .3s ease;
}
.left-leave-active{
    transition: all .8s cubic-bezier(-0.4, -0.5, 0.8, 1.0);
}
.left-enter,.left-leave-to{
    transform: translateX(-30%);
    opacity: 0; 
}

.fixed{
    position: fixed;width:100%;height:100%;z-index: 9;
}
.top-left{
    opacity: 1;
    width: 12rem;
    height: 100%;
    background: #579ffb;
    z-index: 9;
    position: fixed;
    top: 2.31rem;
    left: 0;
    text-align: center;
    box-sizing: border-box;
    color:#fff;
    padding: 15px 0;

    .listname{
            
        a{
                color: #fff;
                display: block;
                padding: 0.7rem 0;
                margin: 0.7rem 0;
                letter-spacing:0.1rem;
        }
    }

    .tokenlogo{
        border-bottom: 1px solid #fff;
        width:100%;
        padding-bottom: 15px;

        img{
            background: #fff;
            border-radius: 50%;
            width: 65%;
        }
    }
}

.top{
    width: 100%;
    height:auto;
    background: #579ffb;
    position: fixed;
    top:0;left:0;
    z-index: 2;
    overflow: hidden;

    .logotitle{
                text-align: center;
                height: 2.5rem;
                color: #fff;
                line-height: 2.5rem;
                font-size: 1.5rem;
                position: relative;
                padding-bottom: 0.2rem;

            img{
                vertical-align:middle;
                max-height:90%;
            }

            .slidepu{
                    position: absolute;
                    right: 1.3rem;
                    border: 1.5px solid #fff;
                    width: 1.5rem;
                    border-radius: 0.2rem;
                    top: 50%;
                    z-index:10;

                    &:after{
                            content: '';
                            position: absolute;
                            width: 1px;
                            border: 1px solid #fff;
                            height: 1.5rem;
                            border-radius: 0.2rem;
                            top: -0.8rem;
                            left: 0.65rem;
                            background: #fff;
                    }
            }


            .childe{
                padding: 0.85rem 1rem;
                border: 1px solid #fff;
                border-radius: 0.2rem;
                display: inline-block;
                position: relative;
                position: absolute;
                left: 1.2rem;
                top: 0.5rem;
                box-sizing: border-box;;

                &:after{
                    content: '';
                    position: absolute;
                    border-top: 2px solid #fff;
                    width: 72%;
                    left: 0.3rem;
                    top: 0.3rem;
                    height: 0.4rem;
                    border-bottom: 2px solid #fff;
                }

                &:before{
                       content: '';
                        position: absolute;
                        width: 66%;
                        border: 1px solid #fff;
                        left: 0.3rem;
                        bottom: 0.3rem;
                }
            }
    }

    
}
</style>
