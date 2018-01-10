import Vue from 'vue'

import Potato from './Potato'

import { sync } from 'vuex-router-sync'
import router from './router'
import store from './store'

import Message from '@/components/Message'
import InputBox from '@/components/InputBox'

Vue.component('Message', Message)
Vue.component('InputBox', InputBox)

Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#potato-root',
  router,
  store,
  template: '<Potato/>',
  components: { Potato }
})
