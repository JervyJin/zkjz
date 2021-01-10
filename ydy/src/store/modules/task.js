const state = {
  isWF: 0, // 是否违法
  set_rwpfRow:{}
};
const mutations = {
 setIsWF(state, v) {
   state.isWF = v;
 },
 set_rwpfRow(state, v) {
  state.set_rwpfRow = v;
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