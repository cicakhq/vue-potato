import Vue from 'vue'
import Vuex from 'vuex'

import aboutMeStore from './about-me'
import channelStore from './channel'
import timeStore from './time'
import usersStore from './users'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export const SET_TITLE = 'setTitle'
export const SET_SUBTITLE = 'setSubtitle'

export default new Vuex.Store({
  modules: {
    aboutMeStore, channelStore, timeStore, usersStore
  },
  state: {
    title: 'The Potato',
    subtitle: undefined
  },
  getters: {
    title: state => state.title,
    subtitle: state => state.subtitle
  },
  mutations: {
    [SET_TITLE]: (state, title) => { state.title = title },
    [SET_SUBTITLE]: (state, subtitle) => { state.subtitle = subtitle }
  },
  actions: {
    [SET_TITLE]: (context, title) => context.commit(SET_TITLE, title),
    [SET_SUBTITLE]: (context, subtitle) => context.commit(SET_SUBTITLE, subtitle)
  },
  strict: debug
})
