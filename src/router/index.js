import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Content from '@/components/Content'
import Slishow from '@/components/Slishow'
import About from '@/components/About'
import Pers from '@/components/Pers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Content',
      name: 'Content',
      component: Content
    },
    {
      path: '/Slishow',
      name: 'Slishow',
      component: Slishow
    },
    {
      path:'/About',
      name:'About',
      component: About
    },
    {
      path:'/Pers',
      name:'Pers',
      component:Pers
    }
  ]
})
