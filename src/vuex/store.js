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
    num: 1
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
    // Content
    content(state, type){
        NProgress.start()
        // axios.get('https://cnodejs.org/api/v1/topic/' + type)
        // .then(response => {
        //     state.contentl = response.data
        //     console.log(11)
        //     NProgress.done()
        // })
        // .catch(err => {
        //     console.log(err)
        // })
    }
}

const actions = {
    refr ({commit},type){
        commit('refr', type)
    },
    prev({commit},type){
        commit('prev')
    },
    next({commit}){
        commit('next')
    },
    // content
    content({commit},type){
        commit('content',type)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})