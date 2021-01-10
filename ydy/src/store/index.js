import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// task 模块
import task from "./modules/task"
import users from "./modules/users"
import menus from "./modules/menus"

export default new Vuex.Store({
  state: {
    isLoading: false  // 菜单加载中
  },
  mutations: {
    setIsLoading(state, v) {
      state.isLoading = v;
    }
  },
  actions: {},
  modules: {
    task: task,
    users:users,
    menus
  }
});
