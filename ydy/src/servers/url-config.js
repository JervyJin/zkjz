
// http://192.168.0.63:8086/gifsp-web-projectManagement/swagger-ui.html
export const root = process.env.NODE_ENV === "development" ? '/api' : 'http://59.207.61.15:11361';  // 本地地址
const outApi = process.env.NODE_ENV === "development" ? '/outApi' : 'http://172.17.225.124:8086/CSB';  // 外部联调地址
const mapApi = process.env.NODE_ENV === "development" ? '/mapApi' : 'http://222.143.52.40:8080/iserver/services';  //

const url = {
  // 地图服务器
  mapApi: mapApi,

  /****个人信息****/
  logout: root + '/web/system/ssoLogout',  // 退出
  login: root + '/web/system/login', // 获取个人信息
  getUserinfo: root + '/system/userinfo/get', // 获取个人信息
  insertUserinfo: root + '/system/userinfo/insert', // 保存个人信息

  // *****************系统管理****************************
  // -----------------字典
  getDicts: root + '/system/dict/selectAllType', // 获取所有字典
  getDictOption: root + '/system/dict/getCodeListByType', // 获取字典选项
  getCodeListByType: root + '/system/dict/getCodeListByType',
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
  deleteQuestion: root + '/api/question/delete', // 禁用问题
  resumeQuestion: root + '/api/question/resume', // 启用问题
  // -----------------菜单
  getMenus: root + '/system/resources/list', // 获取所有菜单
  getMenuTree: root + '/system/resources/tree', // 添加菜单
  addMenu: root + '/system/resources/add', // 添加菜单
  updateMenu: root + '/system/resources/update', // 更新菜单
  deleteMenu: root + '/system/resources/delete', // 删除菜单
  // -----------------机构树
  getOrgTree: root + '/system/org/orgTree',  //机构树
  // ----------------人员
  getUsers: root + '/system/user/getAll',  //获取list
  getUsersRole: root + '/system/user/getUserAndRole',  //获取角色
  setUsersRole: root + '/system/user/grant',  // 设置角色
  getUserByOrgid: root + '/system/user/getUserByOrgid', // 根据组织获取人员信息
  getUserAndEnforcenumIsNotNull: root + '/system/user/getUserAndEnforcenumIsNotNull', // 查询有执法证号人员的信息
  userIsWh: root + '/system/userinfo/isWh', // 根据组织获取人员信息

  // ------------------文件上传
  uploadFile: root + '/system/file/uploadFile',
  deleteFile: root + '/system/file/deleteFile',
  downloadFile: root + '/system/file/downloadFile',
  // ------------------区域
  getArea: root + '/system/area/getAll',

  // ------------------执法对象管理
  queryLegalList: root + '/api/legalObject/queryList', // 获取所有执法对象
  getLegalDetail: root + '/api/legalObject/get', // 获取详情
  saveLegalData: root + '/api/legalObject/save', // 保存
  delLegalRecord: root + '/api/legalObject/del', // 删除

  // ------------------预警规则设置
  queryWarningList: root + '/system/warn/getList', // 获取所有执法对象
  getWarningDetail: root + '/system/warn/get', // 获取详情
  saveWarningData: root + '/system/warn/add', // 新增
  delWarningRecord: root + '/system/warn/delete', // 删除
  getTargetByWarnType: root + '/system/warn/getIndex', // 获取指标
  updateWarningData: root + '/system/warn/update', // 修改

  // *****************执法系统****************************
  // -------------------------信息查询
  // ---------------------------------环保手册
  getHandbook: root + '/api/handbook/queryList', // 环保手册
  getHandbookDetail: root + '/api/handbook/get', // 环保手册 详情
  addHandbook: root + '/api/handbook/add', // 环保手册 添加
  updateHandbook: root + '/api/handbook/update', // 环保手册 更新
  deleteHandbook: root + '/api/handbook/delete', // 环保手册 删除
  // ---------------------------------一车一档
  getCarGearList: root + '/api/onecaronegear/carGearList',
  getCarDetail: root + '/api/onecaronegear/carGearInfo',
  getSngcList: root + '/api/onecaronegear/sngcList', // 获取水泥罐车列表
  getZtcList: root + '/api/onecaronegear/ztcList', // 获取渣土车列表
  getJjzdList: root + '/api/onecaronegear/jjzdList', // 获取交警支队车辆列表
  getSngcListDetail: root + '/api/onecaronegear/sngcInfo', // 获取水泥罐车详情
  getZtcListDetail: root + '/api/onecaronegear/ztcInfo', // 获取渣土车详情
  getJjzdListDetail: root + '/api/onecaronegear/jjzdInfo', // 获取交警支队车辆详情
  getGjcList: root + '/api/onecaronegear/gjcList', // 获取公交车列表
  getGjcListDetail: root + '/api/onecaronegear/gjcInfo', // 获取公交车详情
  getLkywList: root + '/api/onecaronegear/lkywList', // 获取两客一危车辆列表
  getLkywListDetail: root + '/api/onecaronegear/lkywInfo', // 获取两客一危车辆详情
  getXcList: root + '/api/onecaronegear/xcList', // 获取交警校车车辆列表
  getXcListDetail: root + '/api/onecaronegear/xcInfo', // 获取校车车辆详情

  getYgjcList: root + '/api/onecaronegear/ygjcList', // 获取遥感监测车辆列表
  getYgjcListDetail: root + '/api/onecaronegear/ygcjInfo', // 获取遥感监测车辆详情
  getMjclList: root + '/api/onecaronegear/mjclList', // 获取门禁车辆列表
  getMjclListDetail: root + '/api/onecaronegear/mjclInfo', // 获取门禁车辆详情
  getZxcycList: root + '/api/onecaronegear/zxcycList', // 获取重型柴油车车辆列表
  getZxcycListDetail: root + '/api/onecaronegear/zxcycInfo', // 获取重型柴油车车辆详情
  getFdljxList: root + '/api/onecaronegear/fdljxList', // 获取非道路移动机械车辆列表
  getFdljxListDetail: root + '/api/onecaronegear/fdljxInfo', // 获取非道路移动机械车辆详情
  getYgjcYgLsListDetail: root + '/api/onecaronegear/ygjcYglsList', // 获取监测信息遥感的历史记录详情
  getMSiteLastInfo: root + '/api/onecaronegear/mSiteLastInfo', // 获取车辆监测——M站的数据
  getMSiteLsList: root + '/api/onecaronegear/mSiteLsList', // 获取监测信息M站的历史记录详情

  // -------------------------执法任务
  // ---------------------------------数据展示
  thisMonthTask: root + '/api/dataDisplay/thisMonthTask', // 本月任务概况
  thisYearTask: root + '/api/dataDisplay/thisYearTask', // 年度任务概况
  todoTask: root + '/api/dataDisplay/todoTask', // 待办
  finishRatio: root + '/api/dataDisplay/finishRatio', // 办结率
  taskTypeRatio: root + '/api/dataDisplay/taskTypeRatio', // 任务类型
  legalUser: root + '/api/dataDisplay/legalUser', // 双随机
  taskByArea: root + '/api/dataDisplay/taskByArea', // 双随机
  douRandom: root + '/api/dataDisplay/douRandom', // 双随机
  // ---------------------------------双随机任务
  getAllRecordDouRandom: root + '/web/fire/getAllRecord', // 双随机列表
  getAllRecordByRecordDouRandom: root + '/web/fire/getAllRecordByRecord',  // 双随机创建任务修改前查询
  delDouRandom: root + '/web/fire/delete',  // 删除双随机方案
  deliveryDouRandom: root +  '/web/fire/update',  // 派发
  updateDeliveryDouRandom: root +  '/web/fire/updateRecord',  // 修改双随机方案
  updateDouRandomTask: root +  '/web/fire/updateRandomTask',  // 双随机具体任务人员修改
  updateRandomTaskByStatus: root + '/web/fire/updateRandomTaskByStatus',  // 双随机改变任务状态
  addDoubleRandom: root + '/web/fire/add',  // 选择执法对象
  getListByIdDoubleRandom: root + '/web/fire/getListById',  // 查询双随机
  selectByAreacode: root + '/web/fire/selectByAreacode',  // 选择执法对象
  selectUserInfoByAreacode: root + '/web/fire/selectUserInfoByAreacode',  // 选择执法人员
  // ---------------------------------任务列表
  getTaskList: root + '/api/task/getTaskList', // 任务列表
  getLegalObject: root + '/api/task/getLegalObject', // 获取执法对象详情
  addTask: root + '/api/task/add', // 添加任务
  saveLegalObject: root + '/api/legalObject/save', // 基础信息
  saveCheckResult: root + '/api/task/saveCheckResult', // 现场检查情况
  saveSurveyRecord: root + '/api/task/saveSurveyRecord', // 勘查笔录
  saveAskRecord: root + '/api/task/saveAskRecord', // 询问笔录
  getEnforcenum: root + '/api/task/getEnforcenum', // 根据用户id获取用户执法证号
  getDoneLegalObject: root + '/api/task/getDoneLegalObject', // 基础信息
  getCheckResultInfo: root + '/api/task/getCheckResultInfo', // 获取现场检查情况详情
  getSurveyRecordInfo : root + '/api/task/getSurveyRecordInfo',  // 勘查笔录
  queryAskRecord: root + '/api/task/queryAskRecord', // 询问笔录
  getLegalObjectLikeName: root + '/api/task/getLegalObjectLikeName',  // 模糊匹配执法对象
  getDispatchUserBytaskId: root + '/api/task/getDispatchUserBytaskId',  // 根据任务id获取主办人协办人
  getResult: root + '/api/task/getResult',  // 获取案件结果
  saveResult: root + '/api/task/saveResult',  // 保存案件结果
  selectFileListByPid: root + '/system/file/selectFileListByPid',  // 获取文件列表
  selectFileListByPidAndType: root + '/system/file/selectFileListByPidAndType',  // 获取文件列表（根据type）
  getTaskDetailById: root + '/api/task/get',  // 获取任务详情（根据id）
  getTaskListForMessage: root + '/api/task/getTaskListForMessage',  // 获取某个人的待办任务列表
  // ---------------------------------工作考核
  workDonePC: root + '/api/assess/workDonePC',  // PC端任务完成率
  carryOutTask: root + '/api/assess/carryOutTask',  // 人员执行任务数
  userJoinRatio: root + '/api/assess/userJoinRatio', // 人员参与率
  workDoneApp: root + '/api/assess/workDone',  // PC端任务完成率
  // ---------------------------------定时任务
  addWarn: root + '/system/warn/add', //新增
  updateWarn:root+ '/system/warn/update', //编辑

  /*************************门户****************************/
  // ----------------------路检路查统计
  queryListByRoadtrafficstopcheck:root +  '/web/homePage/queryListByRoadtrafficstopcheck', //路检路查
  queryListByRuKu:root + '/web/homePage/queryListByRuKu',  //路检路查统计-入户
  ljlcQyxw: root + '/web/homePage/ljlcQyxw',  //路检路查统计-区域下挖
  ljlcClxw: root + '/web/homePage/ljlcClxw',  //路检路查统计-车辆下挖
  ljlcRkClxw: root + '/web/homePage/ljlcRkClxw',  //入户统计-车辆下挖
  // ----------------------机动车排放检验机构右边列表
  queryListByJidongcheJiance:root + '/web/homePage/queryListByJidongcheJiance',
  queryJdcPfjgxx:root + '/web/homePage/queryJdcPfjgxx',
  queryListByjiance:root + '/web/homePage/queryListByjiance', //机构经纬度
  queryListByjiancejigouId:root + '/web/homePage/queryListByjiancejigouId', //机构详情
  queryListByOBD:root + '/web/homePage/queryListByOBD', //OBD右侧列表
  queryOBDMapData:root + '/web/homePage/queryOBDMapData', //OBD地图

  // ----------------------遥感监测点位
  getClfb: root + '/web/homePage/getClfb', //遥感监测地点分布
  queryListByDetection: root + '/web/homePage/queryListByDetection', //遥感监测点位
  totalByQiti: root + '/web/homePage/totalByQiti',  //点位气体总值

  /*************************一张图****************************/
    // -------------------------一张图-遥感监测综合分析(老接口已废弃)
    // getCarYg: root +  '/api/remote/getCar',  // 获取监测车辆信息
    // getMinitorYg: root +  '/api/remote/getMinitor',  // 获取监测统计信息
    // getOilDistributionYg: root +  '/api/remote/getOilDistribution',  // 获取汽油柴油分布情况
    // getPassRateYg: root +  '/api/remote/getPassRate', // 获取合格率
  // -------------------------一张图-遥感检测综合分析
  getData: root + '/api/remote/getData',
  blackSmokeCar: root + '/api/remote/blackSmokeCar', //监测黑烟车辆统计
  getCbcl: root + '/api/remote/getCbcl', //监测超标车辆统计
  getBigFamilyTop20: root + '/api/remote/getBigFamilyTop20', //用车大户超标排名
  getCarHandle: root + '/api/remote/getCarHandle', //车辆处理结果统计

  // -------------------------一张图-机动车排放检验机构分析
  getCar: root + '/api/vehicle/getCar',  // 监测车辆总数
  getIntoNum: root + '/api/vehicle/getIntoNum',  // 入户检查总数
  getOrganization: root + '/api/vehicle/getOrganization',  // 监测机构总数
  getRote: root + '/api/vehicle/getRote',  // 路检路查车次
  getApprove: root + '/api/vehicle/getApprove',  // 审验车辆数据
  getType: root + '/api/vehicle/getType',  // 检查类型统计
  getJcjgTj: root + '/api/vehicle/getJcjgTj',  // 检查类型统计
  getBtgCar: root + '/api/vehicle/getBtgCar',  // 拿到不通过数
  // -------------------------一张图-新车销售抽测监管分析
  getCheckNum: root + '/api/newcar/getCheckNum',  // 抽查总数
  getProtecteCarNum: root + '/api/newcar/getProtecteCarNum',  // 环保达标车辆总数
  getOBDCarNum: root + '/api/newcar/getOBDCarNum',  // obd车辆抽查总数
  getSetNum: root + '/api/newcar/getSetNum',  // 污染控制装置总数
  getStatisticsIno: root + '/api/newcar/getStatisticsIno',  // 合格率统计
  get4SInfo: root + '/api/newcar/get4SInfo',  // 抽测4S点信息
  get4SInfoById: root + '/api/newcar/get4SInfoById',  // 4S店详情信息
  // -------------------------一张图-路检路查综合分析
  getBlackListLJ: root + '/api/rote/getBlackList',  // 当日直入黑名单数量
  getMinitorLJ: root + '/api/rote/getMinitor',  // 当日监测数量
  getBtgs: root + '/api/rote/getBtgs',  // 不通过数量
  getNnqualifiedPointLJ: root + '/api/rote/getNnqualifiedPoint',  // 不合格站点分布
  getRyjctj: root + '/api/rote/getRyjctj',  // 入户检查统计
  getLjlctj: root + '/api/rote/getLjlctj',  // 路检路查统计
  getOnlinePointLJ: root + '/api/rote/getOnlinePoint',  // 当日上线点位数量
  getPointLJ: root + '/api/rote/getPoint',  // 点位数量
  // -------------------------一张图-重型柴油车改造治理
  getJczxx: root + '/api/dieselcar/getJczxx',  //检测站点位图
  getPfbztjxx: root + '/api/dieselcar/getPfbztjxx',  // 排放标准统计
  getSltj: root + '/api/dieselcar/getSltj',  // 数量统计
  getAzcltj: root + '/api/dieselcar/getAzcltj',  // 车辆情况统计
  getGztj: root + '/api/dieselcar/getGztj',  // 过载情况统计
  getSjcstj: root + '/api/dieselcar/getSjcstj',  // 数据传输情况统计
  companyInfoTj: root + '/api/dieselcar/companyInfoTj',  // 数据、车辆和过载情况统计
  // -------------------------一张图-obd在线监控
  getList: root + '/api/obd/getList',  //右侧列表
  getMap: root + '/api/obd/getMap',  // 地图
  getObdPfbz: root + '/api/obd/getPfbz',  // 柱状图
  getObdSum: root + '/api/obd/getSum',  // 获取所有总数
  getGsclzs: root + '/api/obd/getGsclzs',  // 获取公司/个人车辆信息
  getPftj: root + '/api/obd/getPftj',  // 获取排放统计
  // -------------------------一张图-M站数据分析
  getDataMZ: root + '/api/msitedataanalysis/getDataAll',  // 图表数据展示
  // --------------------------一张图-门禁系统综合分析
  getDataMJ: root + '/api/doorimprison/getDataAll',  // 门禁系统综合分析
  getEarlyWarning: root + '/api/doorimprison/getEarlyWarning',  // 门禁预警等级
  getMjqygk: root + '/api/doorimprison/getMjqygk',  // 门禁企业管控
  getMapList: root + '/api/doorimprison/getMapList',  // 门禁点位地图
  getQxjctj: root + '/api/doorimprison/getQxjctj',  // 区县进出统计
  getDygksl: root + '/api/doorimprison/getDygksl',  // 区县进出统计
  // --------------------------一张图-非道路移动机械分析
  // getDataNonRoad: root + '/api/nonroad/getDataAll',  // 图表数据展示(老接口)
  getAreaMachine:root + '/api/nonroad/getAreaMachine', //区域机械检测情况
  getDataAll:root + '/api/nonroad/getDataAll', //地图点位坐标
  getMachineType:root + '/api/nonroad/getMachineType', //机械类型统计
  getPfbz:root + '/api/nonroad/getPfbz', //排放阶段统计
  areaCarTj:root + '/api/nonroad/areaCarTj', //区域车辆统计

  // --------------------------一张图-双随机任务统计分析
  getLegalObjectNum: root + '/api/doubleRandom/getLegalObjectNum',  // 获取执法对象数量
  getPersonDistribution: root + '/api/doubleRandom/getPersonDistribution',  // 获取人员分布统计
  getTaskNum: root + '/api/doubleRandom/getTaskNum',  // 获取双随机任务数量统计
  getDoubleRandomData: root + '/api/doubleRandom/getData',  // 获取双随机任务相关数据

  // *****************移动污染源案件推送****************************
  casePushList: root + '/api/pushcase/casePushList',  //案件推送列表
  handlingCases: root + '/api/pushcase/handlingCases',  //处理案件

  // *****************移动污染源车主批量告知 ****************************
  setNotify: root + '/api/notify/notify',  // 批量告知
  getNotifyData: root + '/api/notify/query',  // 批量告知
  queryNeedList: root + '/api/notify/queryNeedList',  // 待发短信列表
  sendMassage: root + '/api/notify/sendMassage',  // 发短信

  // *****************机动车档案库****************************
  getCarInfo: root + '/api/archives/getCarInfo',  //获取车辆信息
  getCompanyInfo: root + '/api/archives/getCompanyInfo',  //获取车辆所属公司信息
  getMStationHistoryInfo: root + '/api/archives/getMStationHistoryInfo',  //获取IM站历史信息
  getMinitorInfo: root + '/api/archives/getMinitorInfo',  //获取监测信息
  getRemotHistoryInfo: root + '/api/archives/getRemotHistoryInfo',  //获取遥感监测历史信息
  getRoteCheckHistoryInfo: root + '/api/archives/getRoteCheckHistoryInfo',  //获取路检历史信息
  getStateInfo: root + '/api/archives/getStateInfo',  //获取状态信息
  getWarningHistoryInfo: root + '/api/archives/getWarningHistoryInfo',  //获取预警处罚清单历史信息
  getYearCheckHistoryInfo: root + '/api/archives/getYearCheckHistoryInfo',  //获取年检历史信息

  // *****************移动污染源车主批量告知 ****************************
  saveSpotcheck: root + '/api/spotcheck/save',  // 批量告知
  getDataSpotcheck: root + '/api/spotcheck/query',  // 批量告知




  // ****************************** 机动车黑烟排放检测 *******************************
  // HYWQXT_HYCSQY: outApi + '?_api_name=HYWQXT_HYCSQY&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=',  // 区域
  HYWQXT_HYCSQY: root + '/api/blacksmoke/getArea',
  // HYWQXT_HYSXTHJDSL: outApi + '?_api_name=HYWQXT_HYSXTHJDSL&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=',  // 街道和探头数量查询
  HYWQXT_HYSXTHJDSL: root + '/api/blacksmoke/getProbe',
  // HYWQXT_HYQYJDCHYGSPM: outApi + '?_api_name=HYWQXT_HYQYJDCHYGSPM&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=',  // 区域内机动车黑烟排放个数排名
  getProbeNum: root + '/api/blacksmoke/getProbeNum', //排放个数
  getQypflpm: root + '/api/blacksmoke/getQypflpm', //排放量


  // HYWQXT_HYJDPMTOP5: outApi + '?_api_name=HYWQXT_HYJDPMTOP5&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=',  // 黑烟排放街道排名
  HYWQXT_HYJDPMTOP5: root + '/api/blacksmoke/getTop5',

  // HYWQXT_HYSYTTLB: outApi + '?_api_name=HYWQXT_HYSYTTLB&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=',  // 列表-所有探头
  HYWQXT_HYSYTTLB: root + '/api/blacksmoke/getAllProbe',

  // HYWQXT_HYSYTTLBZS: outApi + '?_api_name=HYWQXT_HYSYTTLBZS&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=',  // 列表-所有探头-总数 <= 50000
  HYWQXT_HYSYTTLBZS: root + '/api/blacksmoke/getAllProbeNum',

  // HYWQXT_HYWGCLLB: outApi + '?_api_name=HYWQXT_HYWGCLLB&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=',  // 列表-违规车辆
  HYWQXT_HYWGCLLB: root + '/api/blacksmoke/getCarList',

  // HYWQXT_HYWGCLLBZS: outApi + '?_api_name=HYWQXT_HYWGCLLBZS&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=',  // 列表-违规车辆-总数
  HYWQXT_HYWGCLLBZS: root + '/api/blacksmoke/getCarNum',

  // HYWQXT_HYDTZB: outApi + '?_api_name=HYWQXT_HYDTZB&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=',  // 坐标地图
  HYWQXT_HYDTZB: root + '/api/blacksmoke/getMap',

  // HYWQXT_HYZPSZ : outApi + '?_api_name=HYWQXT_HYZPSZ&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=',  // 黑烟照片数组
  HYWQXT_HYZPSZ: root + '/api/blacksmoke/getCamera',
  HYWQXT_HYZPSZZS: root + '/api/blacksmoke/getCameraCount',
  putBlacksmokeMsg: root + '/api/blacksmoke/putBlacksmokeMsg', //黑烟短信


  // ****************************** 机动车尾气影响分析 *******************************
  // HYWQXT_WQCSQY : outApi + '?_api_name=HYWQXT_WQCSQY&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=', //城市与区域接口
  HYWQXT_WQCSQY : root +  '/api/tailgas/urbanAndRegion',
  // HYWQXT_WQSXTHJDSL : outApi + '?_api_name=HYWQXT_WQSXTHJDSL&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=', //探头数量
  HYWQXT_WQSXTHJDSL : root +  '/api/tailgas/streetsAndProbes',
  // HYWQXT_WQJDJDCSLPM : outApi + '?_api_name=HYWQXT_WQJDJDCSLPM&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=', //街道机动车数量排名
  HYWQXT_WQJDJDCSLPM :  root + '/api/tailgas/streetMotorVehicles',
  // HYWQXT_WQZZT : outApi + '?_api_name=HYWQXT_WQZZT&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=', //柱状图
  HYWQXT_WQZZT : root +  '/api/tailgas/barChart',
  // HYWQXT_WQDTZB : outApi + '?_api_name=HYWQXT_WQDTZB&_api_version=1.0.0&_api_access_key=7e354da17b824fc0a72fab1d9d67cdd8&_api_secret_key=v2P0Dqukax7rUsICKZ4d8KUTsLE=', //坐标地图
  HYWQXT_WQDTZB : root +  '/api/tailgas/coordinateMap',

}

export default url;
