
const root = ''

const url = {
  getUser: root + 'partyindex/getUser',//获取当前用户信息
  getJSAPI: root + 'partyindex/getJSAPI',//JSAPI鉴权
  sign: root + 'partyindex/sign',//计算签名信息
  getDicListByType: root + 'party/getDicListByType',//根据type查询字典
  getOrgUserTree: root + 'partyorg/getOrgUserTree',//查询所有党组织和党员 树型结构
  getIsPartyMemberByUserid: root + 'party/getIsPartyMemberByUserid',//根据当前登录用户判断是否党员
  getPartyUserInfoById: root + 'partyorg/getPartyUserInfoById',//根据用户id获取党员详情
  
  // ---------------------------------------------------------
  getMeetingList: root + 'partymeeting/getMeetingList',//查询党建会议列表
  getMeetingInfo: root + 'partymeeting/getMeetingInfo',//查询党建会议详情
  saveMeeting: root + 'partymeeting/saveMeeting',//查询党建会议保存
  // ---------------------------------------------------------
  getLearningcolumnList: root + 'partylearningcolumn/getLearningcolumnList',//查询时事要闻、党建动态列表
  getLearningcolumnInfo: root + 'partylearningcolumn/getLearningcolumnInfo',//查询时事要闻、党建动态详情
  saveLearningcolumn: root + 'partylearningcolumn/saveLearningcolumn',//时事要闻、党建动态保存

  getTopPartyOrgList: root + 'partyorg/getTopPartyOrgList',//查询所有顶级党组织
  getLowerPartyOrgListById: root + 'partyorg/getLowerPartyOrgListById',//根据党组织id查询下级党组织列表
  getLowerPartyUserListByOrgId: root + 'partyorg/getLowerPartyUserListByOrgId',//根据党组织id查询下级党员列表

  
}

export default url;
