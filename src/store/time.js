const state = {
  now: new Date()
}

const getters = {
  now: (state) => state.now
}

const actions = {
  startTimerUpdate ({ commit }, intervalInSeconds = 30) {
    setInterval(() => {
      commit('updateTime')
    }, 1000 * intervalInSeconds)
  }
}

const mutations = {
  updateTime (state) {
    state.now = new Date()
  }
}

export default {
  state, actions, mutations, getters
}
