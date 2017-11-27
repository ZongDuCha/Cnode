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
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store,
  template: '<App/>',
  components: { App }
})
