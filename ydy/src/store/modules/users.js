const state = {
    user: {},
    isWh: false
  };
  const mutations = {
   set_username(state, v) {
     state.user = v;
   },
    set_isWh(state, v) {
      state.isWh = v;
    }
  };
  const actions = {

  };
  const getters = {

  };

  // 不要忘记把state, mutations等暴露出去。
  export default {
    state,
    mutations,
    actions,
    getters
  }
