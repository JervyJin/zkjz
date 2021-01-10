const state = {
  isWF: 0,
  selectRow: null, // 当前选中项
  selectQuestions: [],
  showIllegal: false,
  userId: 'GE_eed7f582c0334030a0d52fce95e82622'
};
const mutations = {
 setIsWF(state, v) {
   state.isWF = v;
 },
 setSelectRow(state, v) {
   state.selectRow = v;
 },
 setSelectQuestions(state, arr) {
   this.selectQuestions = arr;
 },
 setShowIllegal(state, v) {
  state.showIllegal = v
 },
  setUserId(state, v) {
    state.userId = v
  },
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