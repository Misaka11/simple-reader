/*<!--
2019/1/4
create by Misaka11
路由文件
-->*/
import Vue from 'vue'
import Router from 'vue-router'
import Novel from '@/views/Novel'
import Chapters from '@/views/Chapters'
import Chapter from '@/views/Chapter'
import Notes from '@/views/Notes'
import Favorite from '@/views/Favorite'
import console from '@/views/console'
import resource from 'vue-resource'

Vue.use(Router)
Vue.use(resource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Novel',
      component: Novel
    },
    {
      path: '/chapters',
      name: 'Chapters',
      component: Chapters
    },
    {
      path: '/chapter',
      name: 'Chapter',
      component: Chapter
    },
    {
      path: '/Notes',
      name: 'Notes',
      component: Notes
    },
    {
      path: '/Favorite',
      name: 'Favorite',
      component: Favorite
    },
    {
      path: '/console',
      name: 'console',
      component: console
    },
  ]
})
