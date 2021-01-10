/**
 * 系统管理 用户管理
 */
<template>
  <div class="page">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="flexbox">
      <div class="left">
        <!-- show-checkbox  -->
        <el-tree ref="tree" default-expand-all :data="orgs" :props="defaultMenusProps" :default-checked-keys="checkmenu" node-key="id" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="right">
        <!-- 搜索筛选 -->
        <el-form :inline="true" :model="form" class="user-search">
          <!-- <el-form-item label="搜索：">
            <el-select v-model="form.isLock" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="正常" value="N"></el-option>
              <el-option label="已锁定" value="Y"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="用户名: ">
            <el-input v-model="form.userName" placeholder="输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="姓名: ">
            <el-input v-model="form.name" placeholder="输入姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item label="">
            <el-input v-model="form.userMobile" placeholder="输入手机号"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
            <!-- <el-button type="primary" @click="handleunit()">部门设置</el-button> -->
          </el-form-item>
        </el-form>
        <!--列表-->
        <div class="tableWrap">
          <el-table height="100%" @selection-change="selectChange" :data="userData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
            <el-table-column align="center" type="index" width="45" label="序号">
            </el-table-column>
            <el-table-column align="center" sortable prop="userName" label="用户名">
            </el-table-column>
            <el-table-column align="center" sortable prop="name" label="姓名">
            </el-table-column>
            <el-table-column align="center" sortable prop="orgName" label="部门" show-overflow-tooltip min-width="120">
            </el-table-column>
            <!-- <el-table-column align="center" sortable prop="workTelphone" label="手机号">
            </el-table-column>
            <el-table-column align="center" sortable prop="gender" label="性别">
            </el-table-column>
            <el-table-column align="center" sortable prop="email" label="邮件">
            </el-table-column>
            <el-table-column align="center" sortable prop="updated" label="修改时间" width="120">
              <template slot-scope="scope">
                <div>{{scope.row.updated}}</div>
              </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" sortable prop="isLock" label="状态" min-width="50">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isLock=='N' ? nshow : fshow" active-color="#13ce66" inactive-color="#ff4949" @change="editType(scope.$index, scope.row)">
                </el-switch>
              </template>
            </el-table-column> -->
            <el-table-column label="操作" align="center" min-width="150" fixed="right">
              <template slot-scope="scope">
                <el-button type="primary" plain @click="handleEdit(scope.$index, scope.row)">角色</el-button>
                <el-button type="primary" plain @click="viewUser(scope.$index, scope.row)">查看</el-button>
                <!-- <el-button type="success" @click="resetpwd(scope.$index, scope.row)">重置密码</el-button>
                <el-button type="success" @click="dataAccess(scope.$index, scope.row)">数据权限</el-button>
                <el-button type="success" @click="offlineUser(scope.$index, scope.row)">下线</el-button>
                <el-button type="success" @click="refreshCache(scope.$index, scope.row)">刷新缓存</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页组件 -->
        <el-pagination
          v-if="userData.length"
          background
          layout="total, sizes, prev, pager, next"
          :current-page="form.pageIndex"
          :page-size="form.pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :total="pageparm.total">
        </el-pagination>

      </div>
    </div>

    <!-- 分页组件 -->
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input readonly v-model="editForm.userName" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!--<el-form-item label="姓名" prop="name">
          <el-input readonly v-model="editForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="密码" prop="userPassword">
          <el-input v-model="editForm.userPassword" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item> -->
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="editForm.roleIds" multiple placeholder="请选择" class="userRole">
            <el-option :label="v.name" :value="v.id" v-for="v in rolesOptions" :key="v.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="部门" prop="deptId">
          <el-select readonly v-model="editForm.deptId" placeholder="请选择" class="userRole">
            <el-option label="环保局" value="1"></el-option>
            <el-option label="执法部" value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <!--<el-form-item label="手机号" prop="workTelphone">
          <el-input readonly v-model="editForm.workTelphone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input readonly v-model="editForm.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio readonly v-model="editForm.gender" label="男">男</el-radio>
          <el-radio readonly v-model="editForm.gender" label="女">女</el-radio>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click='closeDialog("edit")'>取消</el-button>
        <el-button type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 数据权限 -->
    <el-dialog title="数据权限" :visible.sync="dataAccessshow" width="30%" @click='closeDialog("perm")'>
      <el-tree ref="tree" default-expand-all="" :data="UserDept" :props="defaultProps" :default-checked-keys="checkmenu" node-key="id" show-checkbox>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click='closeDialog("perm")'>取消</el-button>
        <el-button type="primary" :loading="loading" class="title" @click="menuPermSave">保存</el-button>
      </div>
    </el-dialog>
    <!-- 所属单位 -->
    <el-dialog title="所属单位" :visible.sync="unitAccessshow" width="30%" @click='closeDialog("unit")'>
      <el-tree ref="tree" default-expand-all="" :data="UserDept" :props="defaultProps" @check-change="handleClick" :default-checked-keys="checkmenu" node-key="id" show-checkbox check-strictly>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click='closeDialog("unit")'>取消</el-button>
        <el-button type="primary" :loading="loading" class="title" @click="unitPermSave">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看详情信息" :visible.sync="isShowDetail" width="65%">
      <div style="min-height: 300px">
        <el-tabs v-model="activeName" @tab-click="clickTab">
          <el-tab-pane label="用户信息" name="userInfo">
            <el-row>
              <el-col :span="6"><div class="info-content">用户名:</div></el-col>
              <el-col :span="6"><div class="info-content">{{userInfoDetail.userName || '无'}}</div></el-col>
              <el-col :span="6"><div class="info-content">姓名:</div></el-col>
              <el-col :span="6"><div class="info-content">{{userInfoDetail.name || '无'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info-content">部门:</div></el-col>
              <el-col :span="6"><div class="info-content">{{userInfoDetail.orgName || '无'}}</div></el-col>
              <el-col :span="6"><div class="info-content">手机号:</div></el-col>
              <el-col :span="6"><div class="info-content">{{userInfoDetail.telPhone || '无'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info-content">性别:</div></el-col>
              <el-col :span="6"><div class="info-content">{{userInfoDetail.gender || '无'}}</div></el-col>
              <el-col :span="6"><div class="info-content">邮件:</div></el-col>
              <el-col :span="6"><div class="info-content">{{userInfoDetail.email || '无'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info-content">修改时间:</div></el-col>
              <el-col :span="6"><div class="info-content">{{userInfoDetail.updated || '无'}}</div></el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="个人信息" name="personInfo">
            <el-row>
              <el-col :span="6"><div class="info-content">账户名:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.name || '无'}}</div></el-col>
              <el-col :span="6"><div class="info-content">用户姓名:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.userName || '无'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info-content">性别:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.gender | genderFormat}}</div></el-col>
              <el-col :span="6"><div class="info-content">职务:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.duty || '无'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info-content">出生年月:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.birthDay || '无'}}</div></el-col>
              <el-col :span="6"><div class="info-content">执法证号:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.enforceNum || '无'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info-content">发证日期:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.issueDate || '无'}}</div></el-col>
              <el-col :span="6"><div class="info-content">邮箱:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.email || '无'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info-content">工作联系方式:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.workTelphone || '无'}}</div></el-col>
              <el-col :span="6"><div class="info-content">个人联系方式:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.telPhone || '无'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info-content">有效日期至:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.expiryDate || '无'}}</div></el-col>
              <el-col :span="6"><div class="info-content">执法区域:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.enforceAreacode || '无'}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"><div class="info-content">用户所属区域:</div></el-col>
              <el-col :span="6"><div class="info-content">{{personInfoDetail.areaCode || '无'}}</div></el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import url from '@/servers/url-config.js'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      title: '添加用户',
      editFormVisible: false, //控制编辑页面显示与隐藏
      dataAccessshow: false, //控制数据权限显示与隐藏
      unitAccessshow: false, //控制所属单位隐藏与显示
      // 编辑与添加
      editForm: {
        userId: '',
        userName: '',
        name: '',
        roleIds: [],
        deptId: '',
        userMobile: '',
        userEmail: '',
        userSex: ''
      },
      // 部门参数
      unitparm: {
        userIds: '',
        deptId: '',
        deptName: ''
      },
      // 选择数据
      selectdata: [],
      // rules表单验证
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        roleIds: [
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ],
        userRealName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        roleId: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        deptId: [{ required: true, message: '请选择部门', trigger: 'blur' }],
        userMobile: [
          { message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        userEmail: [
          { message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        userSex: [{ required: true, message: '请选择性别', trigger: 'blur' }]
      },
      // 删除用户
      seletedata: {
        ids: '',
      },
      // 重置密码
      resetpsd: {
        userId: ''
      },
      // 用户下线
      offline: {
      },
      // 请求数据参数
      form: {
        pageIndex: 1,
        pageSize: 10,
        orgId: '',
        userName: '',
        name:'',
        // userMobile: '',
        // isLock: '',
        // pid: 0,
      },
      // 机构树
      orgs: [],
      defaultMenusProps: {
        children: 'children',
        label: 'name'
      },
      // 角色选项
      rolesOptions: [],
      //用户数据
      userData: [],
      // 数据权限
      UserDept: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
      // 分页参数
      pageparm: {
        total: 10
      },
      // 是否展示详情信息弹框
      isShowDetail: false,
      activeName: 'userInfo',
      // 用户详情信息数据
      userInfoDetail: {},
      // 个人详情信息数据
      personInfoDetail: {},
    }
  },

  /**
   * 数据发生改变
   */
  watch: {},

  /**
   * 创建完毕
   */
  created() {
    this.getOrgTree();
    this.getdata()
  },
  filters: {
    genderFormat (v) {
      if (v === '1') {
        return '男';
      } else if (v === '2'){
        return '女';
      } else {
        return '无';
      }
    }
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    getOrgTree() {
      this.$ajax(url.getOrgTree, {}).then(res => {
        this.orgs = res.data;
      })
    },
    // 加载菜单
    handleNodeClick(data) {
      this.form.orgId = data.id;
      this.getdata();
    },
    onReset() {
      this.form = {
        pageIndex: 1,
        pageSize: 10,
        orgId: '',
        userName: '',
      }
      this.getdata();
    },
    // 获取数据方法
    getdata() {
      this.loading = true
      this.$ajax(url.getUserByOrgid, this.form).then(res => {
        this.loading = false;
        this.userData = res.data.list;
        // 分页赋值
        /*this.form.pageIndex = res.pageNum;
        this.form.pageSize = res.pageSize;*/
        this.pageparm.total = res.data.total;
      })
    },
    handleCurrentChange(page) {
      this.form.pageIndex = page;
      this.getdata()
    },
    handleSizeChange(size) {
      this.form.pageSize = size;
      this.getdata()
    },
    //搜索事件
    search() {
      this.form.orgId = '';
      this.getdata()
    },
    // 修改type
    editType: function(index, row) {
      this.loading = true
      let parm = {
        lock: '',
        userId: ''
      }
      parm.userId = row.userId
      let lock = row.isLock
      if (lock == 'N') {
        parm.lock = 'Y'
      } else {
        parm.lock = 'N'
      }
      // 修改状态
      userLock(parm).then(res => {
        this.loading = false
        if (res.success == false) {
          this.$message({
            type: 'info',
            message: res.msg
          })
        } else {
          this.$message({
            type: 'success',
            message: '状态修改成功'
          })
          this.getdata()
        }
      })
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改用户'
        this.editForm.userId = row.id
        this.editForm.userName = row.userName
        this.editForm.name = row.name
        // this.editForm.roleIds = row.roleIds
        this.editForm.workTelphone = row.workTelphone
        this.editForm.email = row.email
        this.editForm.gender = row.gender
        this.getRoles();
        this.$ajax(url.getUsersRole, {userId: row.id}).then(res => {
          if(res.userRole.length) {
            this.editForm.roleIds = res.userRole.map(v => v.id);
          } else {
            this.editForm.roleIds = [];
          }
        })
      } else {
        this.title = '添加用户'
        this.editForm.userId = ''
        this.editForm.userName = ''
        this.editForm.userRealName = ''
        this.editForm.roleIds = []
        this.editForm.userMobile = ''
        this.editForm.userEmail = ''
        this.editForm.userSex = ''
      }
    },
    // 获取全部角色
    getRoles() {
      this.$ajax(url.getRoles, {}).then(res => {
        res = res.data;
        this.rolesOptions = res.list || []
      })
    },
    // 编辑、添加提交方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          this.loading = true;
          let data = {
            userId: this.editForm.userId,
            roleIds: this.editForm.roleIds.join(',')
          }
          this.$ajax(url.setUsersRole, data).then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata()
                this.$message({
                  type: 'success',
                  message: '设置成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.message
                })
              }
            })
            // .catch(err => {
            //   this.editFormVisible = false
            //   this.loading = false
            //   this.$message.error('保存失败，请稍后再试！')
            // })
        } else {
          return false
        }
      })
    },
    // 显示部门设置
    handleunit: function(index, row) {
      this.unitAccessshow = true
      let parms = 0
      UserDeptdeptTree(parms)
        .then(res => {
          if (res.data.success) {
            this.UserDept = this.changeArr(res.data.data)
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('配置权限失败,请稍后再试！')
        })
    },
    handleClick(data, checked, node) {
      if (checked) {
        this.$refs.tree.setCheckedNodes([])
        this.$refs.tree.setCheckedNodes([data])
        this.unitparm.deptId = data.id
        this.unitparm.deptName = data.name
        //交叉点击节点
      } else {
      }
    },
    // 保存部门
    unitPermSave() {
      let len = this.selectdata
      let ids = []
      if (len != 0) {
        for (let i = 0; i < len.length; i++) {
          ids.push(len[i].userId)
        }
      }
      this.unitparm.userIds = ids.join(',')
      UserChangeDept(this.unitparm)
        .then(res => {
          this.unitAccessshow = false
          if (res.success) {
            this.$message({
              type: 'success',
              message: '部门设置成功！'
            })
            this.getdata()
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('部门设置失败,请稍后再试！')
        })
    },
    // 选择复选框事件
    selectChange(val) {
      this.selectdata = val
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
    },
    // 查看用户
    viewUser(index, row) {
      this.isShowDetail = true;
      this.userInfoDetail = row;
      this.getUserInfo(row.id);
      /*this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          userDelete(row.id)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '数据已删除!'
                })
                this.getdata()
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('数据删除失败，请稍后再试！')
            })
        })*/
    },
    // 重置密码
    resetpwd(index, row) {
      this.resetpsd.userId = row.userId
      this.$confirm('确定要重置密码吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          userPwd(this.resetpsd)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '重置密码成功！'
                })
                this.getdata()
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('重置密码失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消重置密码！'
          })
        })
    },
    // 数据权限
    dataAccess: function(index, row) {
      this.dataAccessshow = true
      this.saveroleId = row.userId
      UserDeptTree(row.userId)
        .then(res => {
          if (res.data.success) {
            this.checkmenu = this.changemenu(res.data.data)
            this.UserDept = this.changeArr(res.data.data)
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('获取权限失败，请稍后再试！')
        })
    },
    //数据格式化
    changeArr(data) {
      var pos = {}
      var tree = []
      var i = 0
      while (data.length != 0) {
        if (data[i].pId == 0) {
          tree.push({
            id: data[i].id,
            name: data[i].name,
            pId: data[i].pId,
            open: data[i].open,
            checked: data[i].checked,
            children: []
          })
          pos[data[i].id] = [tree.length - 1]
          data.splice(i, 1)
          i--
        } else {
          var posArr = pos[data[i].pId]
          if (posArr != undefined) {
            var obj = tree[posArr[0]]
            for (var j = 1; j < posArr.length; j++) {
              obj = obj.children[posArr[j]]
            }

            obj.children.push({
              id: data[i].id,
              name: data[i].name,
              pId: data[i].pId,
              open: data[i].open,
              checked: data[i].checked,
              children: []
            })
            pos[data[i].id] = posArr.concat([obj.children.length - 1])
            data.splice(i, 1)
            i--
          }
        }
        i++
        if (i > data.length - 1) {
          i = 0
        }
      }
      return tree
    },
    // 选中菜单
    changemenu(arr) {
      let change = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id)
        }
      }
      return change
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        userId: this.saveroleId,
        deptIds: ''
      }
      let node = this.$refs.tree.getCheckedNodes()
      let moduleIds = []
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id)
        }
        parm.deptIds = JSON.stringify(moduleIds)
      }
      UserDeptSave(parm)
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '权限保存成功'
            })
            this.dataAccessshow = false
            this.getdata()
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('权限保存失败，请稍后再试！')
        })
    },
    // 下线用户
    offlineUser(index, row) {
      this.$confirm('确定要让' + row.userName + '用户下线吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          userExpireToken(row.userName)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '用户' + row.userName + '强制下线成功！'
                })
                this.getdata()
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('用户下线失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // 刷新缓存
    refreshCache(index, row) {
      userFlashCache(row.userName)
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '刷新成功！'
            })
            this.getdata()
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('刷新失败，请稍后再试！')
        })
    },
    clickTab (ev) {
    },
    getUserInfo (id) {
      this.$ajax(url.getUserinfo, {userId: id}).then(res => {
        if (res.success) {
          this.personInfoDetail = res.data;
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
.page {
  height: 100vh;
}
.flexbox{
  display: flex;
  height: 100%;
  .left {
    width: 200px;
    height: calc(100% - 100px);
    overflow: auto;
  }
  .right {
    width: calc(100% - 250px);
    height: calc(100% - 100px);
    margin-left: 20px;
    .tableContainer {
      height: calc(100% - 200px);
      overflow: auto;
    }
  }
}
/deep/.el-tabs {
  border: none;
  .el-tabs__content {
    line-height: 38px;
    .el-tabs__item {
      color: #333;
    }
  }
}
  .info-content {
    /*text-align: center;*/
  }
.tableWrap {
  height: calc(100vh - 255px);
  overflow: auto;
}
</style>
