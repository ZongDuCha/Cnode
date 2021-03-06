// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import NProgress from 'nprogress'
import store from './vuex/store'
import 'nprogress/nprogress.css'

Vue.use(NProgress,router)
Vue.config.productionTip = false
NProgress.configure({showSpinner: false})

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (sessionStorage.user) {
  store.dispatch('session', JSON.parse(sessionStorage.user))
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  template: '<App/>',
  components: { App }
})
