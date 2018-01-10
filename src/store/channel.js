import api from '@/api/potato'
import Vue from 'vue'
import { SET_DOMAINS, USER_NAME_CHANGE } from '@/store/about-me'

const state = {}

// mutations
export const SET_MESSAGES = 'setMessages'
export const SET_LOADING_CHANNEL = 'setLoadingChannel'
export const SET_TYPING_IN_CHANNEL = 'setChannelTyping'
export const SET_WEBSOCKET = 'setWebSocket'
export const ADD_NEW_MESSAGE = 'addNewMessage'
export const SET_CHANNEL_DETAILS = 'setChannelDetails'

const mutations = {
  [SET_DOMAINS] (state, domains) {
    for (let domain of domains) {
      for (let channel of domain.channels) {
        Vue.set(state, 'channel_' + channel.id, {...channel, web_domain: domain.id})
      }
    }
  },
  [SET_MESSAGES] (state, payload) {
    Vue.set(state, 'msg_' + payload.channelId, payload.messages)
  },
  [ADD_NEW_MESSAGE] (state, message) {
    let channelKey = 'msg_' + message.channel
    if (state[channelKey]) {
      state[channelKey].push(message)
    } else { // initialise?
      Vue.set(state, channelKey, [message])
    }
  },
  [SET_LOADING_CHANNEL] (state, payload) {
    Vue.set(state, 'loading_' + payload.channelId, payload.loading)
  },
  [SET_CHANNEL_DETAILS] (state, payload) {
    let channelKey = 'channel_' + payload.id
    let details = state[channelKey]
    Object.assign(details, payload) // shallow merge of new details
    Vue.set(state, channelKey, details)
  },
  [SET_TYPING_IN_CHANNEL] (state, message) {
    let stateKey = 'typing_' + message.channel
    let typing = state[stateKey] || []
    let indexOf = typing.indexOf(message.user)
    if (message['add-type'] === 'begin' && indexOf === -1) {
      typing.push(message.user)
    } else if (message['add-type'] === 'end' && indexOf !== -1) {
      typing.splice(indexOf, 1)
    }
    Vue.set(state, stateKey, typing)
  },
  [SET_WEBSOCKET] (state, payload) {
    state.websocket = new WebSocket(payload.websocket_url + '/' + payload.channelId)
    state.websocket.onmessage = (m) => payload.websocket_onmessage(m)
  }
}

const getters = {
  getChannelById: (state) => (id) => { return state['channel_' + id] },
  getChannelLoadingState: (state) => (id) => { return state['loading_' + id] },
  getMessagesFromChannelId: (state) => (id) => { return state['msg_' + id] || [] },
  getChannelTypingState: (state) => (id) => state['typing_' + id]
}

// actions
export const SUBSCRIBE_TO_CHANNEL_MESSAGES = 'subscribeToChannelMessages'
export const FETCH_CHANNEL_MESSAGES = 'fetchChannelMessages'
export const WEBSOCKET_MESSAGE = 'webSocketMessage'
export const FETCH_CHANNEL_DETAILS = 'fetchChannelDetails'

const actions = {
  [FETCH_CHANNEL_DETAILS] (context, channelId) {
    return api.potato('channel/' + channelId)
      .then((response) => response.json())
      .then((data) => context.commit(SET_CHANNEL_DETAILS, data))
  },
  [FETCH_CHANNEL_MESSAGES] (context, channelId) {
    context.commit(SET_LOADING_CHANNEL, { channelId: channelId, loading: true })
    return api.potato('channel/' + channelId + '/history')
      .then((response) => response.json())
      .then((data) => context.commit(SET_MESSAGES, { channelId: channelId, messages: data.messages }))
      .then(() => context.commit(SET_LOADING_CHANNEL, { channelId: channelId, loading: false }))
  },
  [SUBSCRIBE_TO_CHANNEL_MESSAGES] (context, channelId) {
    context.commit(SET_WEBSOCKET, {
      channelId: channelId,
      websocket_url: context.rootState.aboutMeStore.technical.websocket_url,
      websocket_onmessage: (m) => context.dispatch(WEBSOCKET_MESSAGE, m)
    })
  },
  [WEBSOCKET_MESSAGE] (context, payload) {
    let msg = JSON.parse(payload.data)
    if (msg && msg['type']) {
      switch (msg.type) {
        case 'm': // new message, add to the store
          context.commit(ADD_NEW_MESSAGE, msg.c)
          break
        case 'type': // typing notification
          context.commit(SET_TYPING_IN_CHANNEL, msg)
          break
        case 'unread': // handle unread messages
          break
        case 'cu': // channel user updates
          break
        case 'usernot': // user notifications
          break
        case 'user-name-change':
          context.commit(USER_NAME_CHANGE, msg.c)
          break
        case 'channel-change': // channel metadata change
          break
        case 'update-star':
          break
        case 'update-hidden':
          break
        case 'option':
          break
        default:
          console.log('websocket message: ', msg)
      }
    }
  }
}

export default {
  state, mutations, actions, getters
}
