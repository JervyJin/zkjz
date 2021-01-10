import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// task 模块
import task from "./modules/task"

export default new Vuex.Store({
  state: {
    token: null,
    avatar: '',
    user:''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setAvatar(state, avatar) {
      state.avatar = avatar
      localStorage.setItem('avatar', avatar)
    },
    userinfo(state,user) {
      state.user = user;
    }
  },
  actions: {

  },
  modules: {
    task
  }
});
