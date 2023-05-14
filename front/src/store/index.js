import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    authToken: null,
    authenticationData: null,
    loading: false,
    data: null,
    kontakt: null,
    success: false,
  },
  getters: {
    kontakt(state) {
      return state.kontakt
    },
    prospekti(state) {
      return state.data?.prospekti
    },
    temata(state) {
      return state.data?.temata || []
    },
    temaById: (state) => (id) => {
      return state.data?.temata.find(tema => tema.id === id)
    },
    slajdyById: (state) => (id) => {
      return state.data?.slajdy.filter(s => s.tema_id === id)
    },
    bulletsByTemaId: (state) => (id) => {
      const slajdyId = state.data?.slajdy.filter(s => s.tema_id === id).map(s => s.id)
      return state.data?.bullets.filter(b => slajdyId.some(id => id === b.slajd_id))
    },
    bulletsBySlajdId: (state) => (id) => {
      return state.data?.bullets.filter(b => b.slajd_id === id)
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
    deleteTema(state, id) {
      const index = state.data.temata.findIndex(t => t.id === id)
      state.data.temata.splice(index, 1)
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
      localStorage.setItem('networking-authToken', authToken)
    },
    setAll(state, data) {
      state.data = data
    },
    logout(state) {
      state.authToken = null
      state.data = null
      localStorage.removeItem('networking-authToken')
    },

    addTema(state, data) {
      state.data.temata.push(data)
    },
    updateTema(state, data) {
      const tema = state.data.temata.find(x => x.id === data.id)
      if (tema) {
        tema.tema = data.tema
        tema.popis = data.popis
        tema.video = data.video
        tema.reel = data.reel
      }
    },

    addSlajd(state, data) {
      state.data.slajdy.push(data)
    },
    
    updateSlajd(state, data) {
      const slajd = state.data.slajdy.find(o => o.id === data.id)
      if (slajd) {
        slajd.nadpis = data.nadpis
        slajd.video = data.video
      }
    },
    
    removeSlajd(state, slajdId) {
      const index = state.data.slajdy.findIndex(o => o.id === slajdId)
      if (index !== -1) {
        state.data.slajdy.splice(index, 1)
      }
    },

    addBullet(state, data) {
      state.data.bullets.push(data)
    },

    updateBullet(state, data) {
      const bullet = state.data.bullets.find(b => b.id === data.id)
      if (bullet) {
        bullet.class_name = data.class_name
        bullet.obsah = data.obsah
      }
    },
    removeBullet(state, bulletId) {
      const index = state.data.bullets.findIndex(b => b.id === bulletId)
      if (index !== -1) {
        state.data.bullets.splice(index, 1)
      }
    },

    nacistKontakt(state, kontakt) {
      state.kontakt = kontakt
    },
  },
  actions: {
    nacistKontakt({commit, state }, id) {
      commit('setLoading', true)
      commit("nacistKontakt", null)
      return axios
        .get(window.API_URL + '/osoby/' + id, {
          headers: { Authorization: `Bearer ${state.authToken}` }
        })
        .then(response => {
          commit("nacistKontakt", response.data)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          commit("setError", error.response.data)
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
      const authToken = localStorage.getItem('networking-authToken')
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
          commit('setAll', response.data)
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

    createTema({ commit, state }, tema) {
      commit('setLoading', true)
      return axios
        .post(window.API_URL + '/temata', { tema }, {
          headers: { Authorization: `Bearer ${state.authToken}` }
        })
        .then((response) => {
          commit("addTema", response.data)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          commit("setError", error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    
    saveTema({ commit, state }, tema) {
      commit('setLoading', true)
      return axios
        .put(window.API_URL + '/temata', tema, {
          headers: { Authorization: `Bearer ${state.authToken}` }
        })
        .then(() => {
          commit("updateTema", tema)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          commit("setError", error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    

    deleteTema({ commit, state }, id) {
      commit('setLoading', true)
      return axios
        .delete(window.API_URL + '/temata/' + id, {
          headers: { Authorization: `Bearer ${state.authToken}` }
        })
        .then(() => {
          commit("deleteTema", id)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          commit("setError", error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    

    createSlajd({ commit, state }, slajd) {
      commit('setLoading', true)
      return axios
        .post(window.API_URL + '/odstavce', slajd, {
          headers: { Authorization: `Bearer ${state.authToken}` }
        })
        .then((response) => {
          commit("addSlajd", response.data)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          commit("setError", error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    
    saveSlajd({ commit, state }, slajd) {
      commit('setLoading', true)
      return axios
        .put(window.API_URL + '/odstavce', slajd, {
          headers: { Authorization: `Bearer ${state.authToken}` }
        })
        .then(() => {
          commit("updateSlajd", slajd)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          commit("setError", error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    
    deleteSlajd({ commit, state }, id) {
      commit('setLoading', true)
      return axios
        .delete(window.API_URL + '/odstavce/' + id, {
          headers: { Authorization: `Bearer ${state.authToken}` }
        })
        .then(() => {
          commit("success")
          commit("removeSlajd", id)
        })
        .catch((error) => {
          console.error(error)
          commit("setError", error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },

    createBullet({ commit, state }, bullet) {
      commit('setLoading', true)
      return axios
        .post(window.API_URL + '/bullets', bullet, {
          headers: { Authorization: `Bearer ${state.authToken}` }
        })
        .then((response) => {
          commit("addBullet", response.data)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          commit("setError", error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    
    updateBullet({ commit, state }, bullet) {
      commit('setLoading', true)
      return axios
        .put(window.API_URL + '/bullets', bullet, {
          headers: { Authorization: `Bearer ${state.authToken}` }
        })
        .then(() => {
          commit("updateBullet", bullet)
          commit("success")
        })
        .catch((error) => {
          console.error(error)
          commit("setError", error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },
    
    deleteBullet({ commit, state }, bullet) {
      commit('setLoading', true)
      return axios
        .delete(window.API_URL + '/bullets/' + bullet.id, {
          headers: { Authorization: `Bearer ${state.authToken}` }
        })
        .then(() => {
          commit("success")
          commit("removeBullet", bullet.id)
        })
        .catch((error) => {
          console.error(error)
          commit("setError", error.response.data)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    }
    

  },
  modules: {
  }
})
