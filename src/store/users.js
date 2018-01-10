import api from '@/api/potato'

const state = {}

export const ADD_USER = 'addUser'

const mutations = {
  [ADD_USER] (context, user) {
    context[user.id] = user
  }
}

const getters = {
  getUserById: (state) => (id) => { return state[id] }
}

export const FETCH_CHANNEL_USERS = 'fetchChannelUsers'

const actions = {
  [FETCH_CHANNEL_USERS] (context, channelId) {
    api.potato('channel/' + channelId + '/users')
      .then((response) => response.json())
      .then((data) => {
        data.members.forEach((u) => {
          context.commit(ADD_USER, u)
        })
      })
  }
}

export default {
  state, actions, mutations, getters
}
