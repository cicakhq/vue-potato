import api from '@/api/potato'
import Vue from 'vue'

const state = {
  loading: false,
  myself: {},
  technical: {},
  domains: []
}

// mutations
export const SET_LOADING_USER = 'setLoadingUser'
export const SET_MY_USER = 'setMyUser'
export const SET_TECHNICAL_DETAILS = 'setTechnicalDetails'
export const SET_DOMAINS = 'setDomains'
export const SET_MY_USER_DESCRIPTION = 'setUserDescription'

const mutations = {
  [SET_LOADING_USER] (state, loading) {
    state.loading = loading
  },
  [SET_MY_USER] (state, user) {
    state.myself = user
  },
  [SET_MY_USER_DESCRIPTION] (state, description) {
    let newMyself = state.myself
    newMyself.description = description
    Vue.set(state, 'myself', newMyself)
  },
  [SET_TECHNICAL_DETAILS] (state, technical) {
    state.technical = technical
  },
  [SET_DOMAINS] (state, domains) {
    state.domains = domains
  }
}

const getters = {
  myself: (state) => state.myself,
  domains: (state) => state.domains,
  loading: (state) => state.loading,
  technical: (state) => state.technical
}

// actions
export const USER_NAME_CHANGE = 'userNameChange'
export const FETCH_USER_SESSION = 'fetchUserSession'

const actions = {
  [FETCH_USER_SESSION] (context) {
    context.commit(SET_LOADING_USER, true)
    api.potato('user-session')
      .then((response) => response.json())
      .then((data) => {
        context.commit(SET_MY_USER, data.user)
        context.commit(SET_TECHNICAL_DETAILS, {
          websocket_url: data.websocket_url,
          upload_location: data.upload_location
        })
        context.commit(SET_DOMAINS, data.domains)
      })
      .then(() => { context.commit(SET_LOADING_USER, false) })
  },
  [USER_NAME_CHANGE] (context, payload) {
    context.commit(SET_MY_USER_DESCRIPTION, payload)
  }
}

export default {
  state, mutations, actions, getters
}
