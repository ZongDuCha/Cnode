import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import NProgress from 'nprogress'

Vue.use(Vuex)
const state = {
    all:'',
    conton: '1',
    contentl: '',
    tab: 'all',
    className: 'all',
    num: 1,
    usertoken: 'ba178155-5adf-471a-a5fb-9a1b394b47bc',
    usercont: {},
    // 收藏
    collshow: '',
    // textarea
    val: ''
}

const mutations = {
    refr(state,type){
        NProgress.start();
        state.tab = state.className = type;
        axios.get('http://cnodejs.org/api/v1/topics' + '?tab=' + type)
        .then(response => {
            state.conton = response .data
            NProgress.done()
        })
        .catch(err => {
            console.log(err)
        })
    },
    prev(state){
        if(state.num <= 1){
            alert('不能在上一页了')
        }else{
            NProgress.start();
            state.num --;
            axios.get('http://cnodejs.org/api/v1/topics',{
                params:{
                    tab: state.tab,
                    page:state.num
                }
            })
            .then(response => {
                state.conton = response .data
                NProgress.done()
            })
            .catch(err => {
                console.log(err)
            })
            window.scrollTo(0,0)
        }
    },
    next(state){
        if(state.num >= 40){
            alert('不能在下一页了')
        }else{
            NProgress.start();
            state.num ++;
            axios.get('http://cnodejs.org/api/v1/topics',{
                params:{
                    tab: state.tab,
                    page:state.num
                }
            })
            .then(response => {
                state.conton = response .data
                NProgress.done()
                window.scrollTo(0,0)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    coll(state,type){
        if(!state.usercont){
            console.log('请登录')
        }else{
            axios.post('https://cnodejs.org/api/v1/topic_collect/collect',{
                accesstoken: state.usercont.token,
                topic_id: state.contentl.id
            })
            .then(response => {
                state.usercont.is_collect = response.data
                state.contentl.is_collect = true
                console.log(state.usercont)
            })
        }
    },
    // cont
    cont(state,type){
        axios.get('https://cnodejs.org/api/v1/topic/' + type)
        .then(response => {
           state.contentl = response.data.data
        })
        .catch(err => {
            console.log(err)
        })
    },
    // login
    login(state){
        // ba178155-5adf-471a-a5fb-9a1b394b47bc
        axios.post('https://cnodejs.org/api/v1/accesstoken',{
            accesstoken: state.usertoken
        })
        .then(response => {
           state.usercont = {
                username:response.data.loginname,
                userurl:response.data.avatar_url,
                userid:response.data.id,
                token:state.usertoken
           }
           sessionStorage.user = JSON.stringify(state.usercont)
        })
        .catch(err => {
            console.log(err)
        })
    },
    // 发表
    push(state,type){
        axios.post('https://cnodejs.org/api/v1//topic/' + state.contentl.id + '/replies',{
            accesstoken: state.usertoken,
            content: type
        })
        .then(response => {
            state.val = ''
            axios.post('')
        })
    }
}

const actions = {
    refr ({commit},type){
        commit('refr', type)
    },
    prev({commit}){
        commit('prev')
    },
    next({commit}){
        commit('next')
    },
    // coll
    coll({commit},type){
        commit('coll',type)
    },
    // cont
    cont({commit},type){
        commit('cont',type)
    },
    // login
    login({commit}){
        commit('login')
    },
    push({commit},type){
        if(type == ''){
            console.log('不能为空哦')
        }else{
            commit('push',type)
        }
    }
}

const getters = {
    contentl(state){
        return state.contentl
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})