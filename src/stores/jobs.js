import VuexPersist from 'vuex-persist'

const local = new VuexPersist({
  storage: window.localStorage
})

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  plugins: [local.plugin]
}