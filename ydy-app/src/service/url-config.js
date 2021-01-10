
// http://192.168.0.63:8086/gifsp-web-projectManagement/swagger-ui.html
const root = ''

const url = {
  // 登录
  getJsapiToken: root + '/system/login/getJsapiToken',  // 获取token

  /****个人信息****/
  getUser: root + '/system/userinfo/get', // 获取后台数据库个人信息
  insertUserinfo: root + '/system/userinfo/insert', // 保存个人信息
  getUserInfo: root + '/system/login/getUserInfo', //根据code获取政钉个人信息

  // *****************系统管理****************************
  // -----------------字典
  getDicts: root + '/system/dict/selectAllType', // 获取所有字典
  getDictOption: root + '/system/dict/getCodeListByType', // 获取字典选项
  addDict: root + '/system/dict/add', // 添加字典
  updateDict: root + '/system/dict/update', // 更新字典
  deleteDict: root + '/system/dict/delete', // 删除字典
  // -----------------角色
  getRoles: root + '/system/role/list', // 获取所有角色
  addRole: root + '/system/role/add', // 添加角色
  updateRole: root + '/system/role/update', // 更新角色
  deleteRole: root + '/system/role/delete', // 删除角色
  setRoleMenu: root + '/system/role/grantAuthority', // 设置角色权限
  getRoleRight: root + '/system/role/selectFuncByPrimaryKey',  // 获取权限
  // -----------------公告
  getNotice: root + '/system/notice/list', // 获取所有公告
  addNotice: root + '/system/notice/add', // 添加公告
  updateNotice: root + '/system/notice/update', // 更新公告
  deleteNotice: root + '/system/notice/delete', // 删除公告
  selectByPrimaryKey: root + '/system/notice/selectByPrimaryKey',  // 详情
  // -----------------问题管理
  getQuestion: root + '/api/question/queryList', // 获取所有问题
  getListDisplay: root + '/api/question/getListDisplay', // 获取
  getListNoDisplay: root + '/api/question/getListNoDisplay', // 获取
  getQuestionDetail: root + '/api/question/get', // 获取问题详情
  addQuestion: root + '/api/question/add', // 添加公告
  updateQuestion: root + '/api/question/update', // 更新公告
  deleteQuestion: root + '/api/question/delete', // 删除公告
  // -----------------菜单
  getMenus: root + '/system/resources/list', // 获取所有菜单
  getMenuTree: root + '/system/resources/tree', // 添加菜单
  addMenu: root + '/system/resources/add', // 添加菜单
  updateMenu: root + '/system/resources/update', // 更新菜单
  deleteMenu: root + '/system/resources/delete', // 删除菜单
  // -----------------机构树
  getOrgTree: root + '/system/org/orgTree',  //机构树
  getUserByOrgid: root + '/system/user/getUserByOrgid', // 根据组织获取人员信息
  getUserAndEnforcenumIsNotNull: root + '/system/user/getUserAndEnforcenumIsNotNull', // 查询有执法证号人员的信息
  // ----------------人员
  getUsersAll: root + '/api/task/getAll',  //获取执法人
  getUsers: root + '/api/task/getDispatchUserBytaskId',  //根据任务ID获取执法人
  getUsersRole: root + '/system/user/getUserAndRole',  //获取角色
  setUsersRole: root + '/system/user/grant',  // 设置角色

  // ------------------文件上传
  uploadFile: root + '/system/file/uploadFile',
  deleteFile: root + '/system/file/deleteFile',

  // ------------------区域
  getArea: root + '/system/area/getAll',
  
  // *****************执法系统****************************
  // ---------------------------------数据展示
  thisMonthTask: root + '/api/dataDisplay/thisMonthTask', // 本月任务概况
  thisYearTask: root + '/api/dataDisplay/thisYearTask', // 年度任务概况
  todoTask: root + '/api/dataDisplay/todoTask', // 待办
  finishRatio: root + '/api/dataDisplay/finishRatio', // 办结率
  taskTypeRatio: root + '/api/dataDisplay/taskTypeRatio', // 任务类型
  legalUser: root + '/api/dataDisplay/legalUser', // 双随机
  taskByArea: root + '/api/dataDisplay/taskByArea', // 双随机
  douRandom: root + '/api/dataDisplay/douRandom', // 双随机
  dispatchMonthCount:  root + '/api/dataDisplay/dispatchMonthCount',  // 按月统计
  analysisStatistics:  root + '/api/dataDisplay/analysisStatistics',  // 执法分析统计
  // ---------------------------------双随机任务
  addDoubleRandom: root + '/web/fire/add',  // 选择执法对象
  selectByAreacode: root + '/web/fire/selectByAreacode',  // 选择执法对象
  selectUserInfoByAreacode: root + '/web/fire/selectUserInfoByAreacode',
  getListByIdDoubleRandom: root + '/web/fire/getListById',  // 查询双随机  // 选择执法人员

  // -------------------------信息查询
  // ---------------------------------环保手册
  getHandbook: root + '/api/handbook/queryList', // 环保手册 
  getHandbookDetail: root + '/api/handbook/get', // 环保手册 详情
  addHandbook: root + '/api/handbook/add', // 环保手册 添加
  updateHandbook: root + '/api/handbook/update', // 环保手册 更新
  deleteHandbook: root + '/api/handbook/delete', // 环保手册 删除
  // ---------------------------------遥感监测数据查询
  MonitoringListApp: root + '/api/remotesensingmonitoring/MonitoringListApp', // 遥感监测数据查询
  // ---------------------------------一车一档
  getCarGearList: root + '/api/onecaronegear/carGearList',
  getCarDetail: root + '/api/onecaronegear/carGearInfo',

  // -------------------------执法任务
  // ---------------------------------任务列表
  getTaskList: root + '/api/task/getTaskListApp', // 任务列表
  getLegalObject: root + '/api/task/getLegalObjectApp', // 获取执法对象详情
  addTask: root + '/api/task/addApp', // 添加任务
  saveLegalObject: root + '/api/task/saveLegalObjectApp', // 基础信息
  saveCheckResult: root + '/api/task/saveCheckResultApp', // 现场检查情况
  saveSurveyRecord: root + '/api/task/saveSurveyRecordApp', // 勘查笔录
  saveAskRecord: root + '/api/task/saveAskRecordApp', // 询问笔录
  getEnforcenum: root + '/api/task/getEnforcenumApp', // 根据用户id获取用户执法证号
  getDoneLegalObject: root + '/api/task/getDoneLegalObjectApp', // 基础信息
  getCheckResultInfo: root + '/api/task/getCheckResultInfoApp', // 获取现场检查情况详情
  getSurveyRecordInfo : root + '/api/task/getSurveyRecordInfoApp',  // 勘查笔录
  queryAskRecord: root + '/api/task/queryAskRecordApp', // 询问笔录回显
  audioDownload: root + '/system/file/audioDownload', // 询问笔录-语音
  getLegalObjectLikeName: root + '/api/task/getLegalObjectLikeNameApp',  // 模糊匹配执法对象
  // --------------------------------行政处罚
  getResult: root + '/api/task/getResult',  // 获取案件结果
  saveResult: root + '/api/task/saveResult',  // 保存案件结果
  selectFileListByPid: root + '/system/file/selectFileListByPid',  // 获取文件列表
  selectFileListByPidAndType:root + 'system/file/selectFileListByPidAndType', //附件列表根据PID和附件类型
  // ---------------------------------工作考核
  workDonePC: root + '/api/assess/workDonePC',  // PC端任务完成率
  carryOutTask: root + '/api/assess/carryOutTask',  // 人员执行任务数
  userJoinRatio: root + '/api/assess/userJoinRatio', // 人员参与率
  workDoneApp: root + '/api/assess/workDone',  // PC端任务完成率
  selectFileListByPid:root + 'system/file/selectFileListByPid', //附件列表

  getTaskDetailById: root + '/api/task/get',//获取双随机任务详情
}

export default url;
