
/** 导航栏的顺序 */
const SortBtn = [
  '项目管理', '项目进展', '数据规划', '统计分析', '日志管理', '消息中心', '账号管理'
]
/** 导航栏的图标列表 */
const IconList = [
  'el-icon-menu',
  'el-icon-setting',
  'el-icon-picture-outline',
  'el-icon-edit-outline',
  'el-icon-document',
  'el-icon-bell',
  'el-icon-mobile-phone'
]

/** 进展信息的跳转路由 */
const TurnPageFlag = {
  '0': '/memInfo', // 项目新增
  '1': '/progress/lxsx', // 立项手续
  '2': '/progress/ztb', // 招投标
  '3': '/progress/xmbg', // 项目变更
  '4': '/progress/htgl', // 项目合同
  '5': '/progress/hyjd', // 项目会议决定
  '6': '/progress/ysps' // 项目验收评审
}
/** 导出项目管理页面的按钮 */
const ProjectBtnList = [
  {
    methods: 'openAddPage',
    buttonId: 'XMGL-XZ',
    modelName: '新增',
    modelIndex: 1
  },
  {
    methods: 'confirmProject',
    buttonId: 'XMGL-QR',
    modelName: '确认',
    modelIndex: 5
  },
  {
    methods: 'cancleProject',
    buttonId: 'XMGL-QXQR',
    modelName: '取消确认',
    modelIndex: 6
  },
  {
    methods: 'progressUpload',
    buttonId: 'XMGL-XMJDDJ',
    modelName: '项目进度登记',
    modelIndex: 2
  },
  {
    methods: 'addProgressMeth',
    buttonId: 'XMGL-TZ',
    modelName: '台账',
    modelIndex: 4
  },
  {
    methods: 'lookProgress',
    buttonId: 'XMGL-CKJD',
    modelName: '查看进度',
    modelIndex: 3
  },
  {
    methods: 'importFile',
    buttonId: 'XMGL-DR',
    modelName: '导入',
    modelIndex: 7
  },
  {
    methods: 'exportFile',
    buttonId: 'XMGL-DC',
    modelName: '导出',
    modelIndex: 8
  },
  {
    methods: 'exportTemplate',
    buttonId: 'XMGL-MBXZ',
    modelName: '模板下载',
    modelIndex: 9
  }
]
/** 数据规划按钮 */
const DataPlaneBtn = [
  {
    methods: 'handleAdd',
    buttonId: 'SJGH-SJGHSC',
    modelName: '数据规划上传'
  },
  {
    methods: 'exportDataPlan',
    buttonId: 'SJGH-DC',
    modelName: '导出'
  }
]
/** 统计分析按钮 */
const StaticPlaneBtn = [
  {
    methods: 'register',
    buttonId: 'TJFX-TJFXSB',
    modelName: '统计分析上报'
  }
]

export {
  IconList,
  SortBtn,
  StaticPlaneBtn,
  DataPlaneBtn,
  ProjectBtnList,
  TurnPageFlag
}
