import Vue from 'vue'
import Router from 'vue-router'

import Channel from '@/components/Channel'
import Welcome from '@/components/Welcome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/channel/:id',
      name: 'channel',
      component: Channel
    },
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    }
  ]
})
