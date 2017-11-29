import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import NProgress from 'nProgress'

Vue.use(Vuex)
const state = {
    all:'',
    conton: '1',
    contentl: '',
    tab: 'all',
    className: 'all',
    num: 1,
    // usertoken: 'ba178155-5adf-471a-a5fb-9a1b394b47bc',
    usercont: {},
    // 收藏
    collshow: '',
    // textarea
    val: '',
    // 回复某人
    valticel: '',
    lotshw: '',
    // 发表文章
    titles: '',
    centont: '',
    seltiv: 'dev',
    menu: false,
    // 个人中心
    persName: {coll:''},
    // 个人文章详情
    tionCont: '',
    // 个人消息
    messCont:''
}

const mutations = {
    refr(state,type){
        console.log(type)
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
    // 收藏
    coll(state,type){
        if(!state.usercont){
            console.log('请登录')
        }else{
            NProgress.start();
            axios.post('https://cnodejs.org/api/v1/topic_collect/collect',{
                accesstoken: state.usercont.token,
                topic_id: state.contentl.id
            })
            .then(response => {
                state.usercont.is_collect = response.data
                state.contentl.is_collect = true
                NProgress.done()
            })
        }
    },
    // 取消收藏
    collrs(state,type){
        if(!state.usercont){
            console.log('请登录')
        }else{
            NProgress.start();
            axios.post('https://cnodejs.org/api/v1/topic_collect/collect',{
                accesstoken: state.usercont.token,
                topic_id: state.contentl.id
            })
            .then(response => {
                state.usercont.is_collect = response.data
                state.contentl.is_collect = false
                NProgress.done()
            })
        }
    },
    // cont
    cont(state,type){
        state.urlid = type
        axios.get('https://cnodejs.org/api/v1/topic/' + type)
        .then(response => {
           state.contentl = response.data.data
           NProgress.done()
        })
        .catch(err => {
            console.log(err)
        })
    },
    // login
    login(state,type){
        NProgress.start();
        axios.post('https://cnodejs.org/api/v1/accesstoken',{
            accesstoken: type
        })
        .then(response => {
           state.usercont = {
                username:response.data.loginname,
                userurl:response.data.avatar_url,
                userid:response.data.id,
                token:type
           }
           sessionStorage.user = JSON.stringify(state.usercont)
           NProgress.done()

           axios.get('https://cnodejs.org/api/v1/user/' + state.usercont.username)
           .then(res => {
               state.persName = res.data.data
           })
           .catch(err => {
               console.log(err)
           })

           
        })
        .catch(err => {
            console.log(err)
        })

        
    },
    // 个人中心
    pers(state){
        NProgress.start()
        function per(){
            return axios.get('https://cnodejs.org/api/v1/user/' + state.usercont.username)
        } 
        function res(){
            return axios.get('https://cnodejs.org/api/v1/topic_collect/' + state.usercont.username)
        }

        axios.all([per(),res()])
        .then(axios.spread( (response,pseon) => {
            state.persName = response.data.data
            state.persName.coll = pseon.data
            NProgress.done()
        } ))
    },
    session(state,type){
        state.usercont = type
    },
    clear(state){
        sessionStorage.clear()
        window.location.reload()
    },
    // 回复帖子
    push(state,type){
        NProgress.start();
        axios.post('https://cnodejs.org/api/v1//topic/' + state.contentl.id + '/replies',{
            accesstoken: state.usercont.token,
            content: type
        })
        .then(response => {
            state.val = ''
            axios.get('https://cnodejs.org/api/v1/topic/' + state.contentl.id)
            .then(response => {
                state.contentl.replies = response.data.data.replies
                NProgress.done()
            })
            .catch(err => {
                console.log(err)
            })
        })
    },
    // 回复某人
    valtice(state,type){
        state.valticel = '@' + type
    },
    lowshow(state,type){
        let index = type[1] 
            if(type[0] === state.contentl.replies[index].author.loginname){
                state.lotshw = state.contentl.replies[index].id
            }
        NProgress.start();
        axios.post('https://cnodejs.org/api/v1//topic/' + state.contentl.id + '/replies',{
            accesstoken: state.usertoken,
            content: state.valticel,
            reply_id: state.lotshw
        })
        // 显示403表示拒绝访问，而不是代码问题
        .then(response => {
            NProgress.done()
        })
        .catch(err => {
            console.log('ok')
        })
    },
    // 发表文章
    pushtab(state,type){
        NProgress.start()
        axios.post('https://cnodejs.org/api/v1/topics',{
            accesstoken: state.usercont.token,
            title:state.titles,
            tab: state.seltiv,
            content: state.centont
        })
        .then(response => {
            state.titles = state.centont = ''
            NProgress.done()
        })
        .catch(err => {
            console.log(err)
        })
    },
    tions(state,type){
        switch(type){
            case 'lies':
            state.tionCont = state.persName.recent_replies
            break;

            case 'topics':
            state.tionCont = state.persName.recent_topics
            break;

            case 'coll':
            state.tionCont = state.persName.coll.data
            console.log(state.tionCont)
            break;
        }
    },
    message(state){
        NProgress.start()
        axios.get('https://cnodejs.org/api/v1/messages',{
            params:{
                accesstoken:state.usercont.token
            }
        })
        .then(res => {
            state.messCont = res.data.data
            NProgress.done()
        })
        .catch(err => {
            console.log(err)
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
    login({commit},type,state){
        commit('login',type)
    },
    push({commit},type){
        if(type == ''){
            console.log('不能为空哦')
        }else{
            commit('push',type)
        }
    },
    valtice({commit},type){
        commit('valtice',type)
    },
    collrs({commit},type){
        commit('collrs',type)
    },
    pushtab({commit}){
        commit('pushtab')
    },
    session({commit},type){
        commit('session',type)
    },
    clear({commit}){
        commit('clear')
    },
    pers({commit}){
        commit('pers')
    },
    tions({commit},type){
        commit('tions',type)
    },
    message({commit}){
        commit('message')
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