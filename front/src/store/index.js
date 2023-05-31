import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    authToken: null,
    authenticationData: null,
    loading: false,
    data: null,
    success: false,
  },
  getters: {
    chatbotByScenar: (state) => (id) => {
      const chatbotZprava = state.data.zpravy_chatboti.find(zc => zc.zprava_id === id)
      if (!chatbotZprava) {
        return null
      }
      return state.data.chatboti.find(c => c.id === chatbotZprava.chatbot_id)
    },
    scenare(state) {
      return state.data.zpravy_chatboti.map(zc => ({
        ...zc,
        jmeno: state.data.chatboti.find(c => c.id === zc.chatbot_id).jmeno,
        zprava: state.data.zpravy.find(z => z.id === zc.zprava_id).zprava
      }))
    },
    zpravy(state) {
      return state.data.zpravy
    },
    chatboti(state) {
      return state.data.chatboti
    },
    loading(state) {
      return state.loading
    },
    success(state) {
      return state.success
    },
    authenticationData(state) {
      return state.authenticationData
    },
    isLoggedIn(state) {
      return !!state.authToken && !!state.data
    },
  },
  mutations: {
    putZpravyChatboti(state, data) {
      const zpravaChatbot = state.data.zpravy_chatboti.find(zc => zc.zprava_id === data.zprava_id)
      zpravaChatbot.titulek = data.titulek
    },
    putZpravy(state, data) {

    },
    postZpravyChatboti(state, data) {
      state.data.zpravy.push(data.zpravy)
      state.data.zpravy_chatboti.push(data.zpravy_chatboti)
    },
    deleteZpravy(state, id) {
      const index = state.data.zpravy.findIndex(z => z.id === id)
      state.data.zpravy.splice(index, 1)
    },
    postZpravy(state, zprava) {
      state.data.zpravy.push(zprava)
    },
    setLoading(state, isLoading) {
      state.loading = isLoading
    },
    success(state) {
      state.success = true
      setTimeout(() => {
        state.success = false
      }, 3000)
    },   
    setAuthenticationData(state, authenticationData) {
      state.authenticationData = authenticationData
    },
    setAuthToken(state, authToken) {
      state.authToken = authToken
      localStorage.setItem('networking_v2-authToken', authToken)
    },
    getAll(state, data) {
      state.data = data
    },
    logout(state) {
      state.authToken = null
      state.data = null
      localStorage.removeItem('networking_v2-authToken')
    },
  },
  actions: {
    postZpravyChatboti({ commit, state }, chatbot_id) {
      commit('setLoading', true)
      return axios
        .post(window.API_URL + '/zpravy-chatboti', { chatbot_id }, { headers: { Authorization: `Bearer ${state.authToken}`} })
        .then((response) => {
          commit('postZpravyChatboti', response.data)
          commit("success")
          return response.data.zpravy.id
        })
        .catch((error) => {
          console.error(error)
          alert(error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    putZpravyChatboti({ commit, state }, { chatbot_id, zprava_id, titulek }) {
      commit('setLoading', true)
      return axios
        .put(window.API_URL + '/zpravy-chatboti', { chatbot_id, zprava_id, titulek }, { headers: { Authorization: `Bearer ${state.authToken}`} })
        .then(() => {
          commit("putZpravyChatboti", { chatbot_id, zprava_id, titulek })
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          alert(error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    deleteZpravy({ commit, state }, zprava) {
      commit('setLoading', true)
      return axios
        .delete(window.API_URL + '/zpravy/' + zprava.id, { headers: { Authorization: `Bearer ${state.authToken}`} })
        .then(() => {
          commit('deleteZpravy', zprava.id)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          alert(error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    putZpravy({ commit, state }, data) {
      commit('setLoading', true)
      return axios
        .put(window.API_URL + '/zpravy', data, { headers: { Authorization: `Bearer ${state.authToken}`} })
        .then(() => {
          commit("putZpravy", data)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          alert(error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    postZpravy({ commit, state }, data) {
      commit('setLoading', true)
      return axios
        .post(window.API_URL + '/zpravy', data, { headers: { Authorization: `Bearer ${state.authToken}`} })
        .then((response) => {
          commit('postZpravy', response.data)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          alert(error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    login({ commit }, { email, password }) {
      commit('setLoading', true)
      return axios
        .post(window.API_URL + '/login', { email, password })
        .then((response) => {
          commit('setAuthenticationData', response.data)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          alert(error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    authenticate({ commit, dispatch, state }, code) {
      commit('setLoading', true)
      return axios
        .post(window.API_URL + '/authenticate', { code, ...state.authenticationData })
        .then((response) => {
          commit('setAuthToken', response.data)
          commit("success")
          dispatch('loadAll')
        })
        .catch((error) => {
          console.error(error)
          alert(error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    loadAuthToken({ commit, dispatch }) {
      const authToken = localStorage.getItem('networking_v2-authToken')
      if (authToken) {
        commit('setAuthToken', authToken)
        dispatch('loadAll')
      }
    },
    loadAll({ commit, state }) {
      commit('setLoading', true)
      return axios
        .get(window.API_URL + '/all', {
          headers: {
            Authorization: `Bearer ${state.authToken}`,
          },
        })
        .then((response) => {
          commit('getAll', response.data)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          alert(error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
  },
  modules: {
  }
})
