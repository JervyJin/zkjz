/**
 * 系统管理  角色管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">

      <el-form-item label="角色名称：">
        <el-input v-model="formInline.name" placeholder="输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="formInline.describe" placeholder="输入角色描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleEdit">新增</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <div class="tableWrap">
      <el-table
        :data="listData"
        highlight-current-row
        @current-change="rowClick"
        height="100%"
        v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
        <el-table-column align="center" type="index" width="60" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="角色名称">
        </el-table-column>
        <el-table-column prop="describe" label="角色描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="isActive" label="是否可用">
          <template slot-scope="scope">
            {{scope.row.isActive == "Y" ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="created" label="建立时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createBy" label="建立人" width="100">
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" v-if="scope.row.name !== 'admin'" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
            <el-button type="danger" disabled v-if="scope.row.name === 'admin'">删除</el-button>
            <el-button type="success" plain @click="menuAccess(scope.row)">菜单权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <el-pagination
      v-if="listData.length"
      background
      layout="total, sizes, prev, pager, next"
      :current-page="pageparm.currentPage"
      :page-size="pageparm.pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :total="pageparm.total">
    </el-pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="120px" :model="editForm" ref="editForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="describe">
          <el-input v-model="editForm.describe" auto-complete="off" placeholder="请输入角色代码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click='closeDialog("edit")'>取消</el-button>
        <el-button type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 菜单权限 -->
    <el-dialog title="菜单权限" :visible.sync="menuAccessshow" width="30%" @click='closeDialog("perm")'>
      <el-tree ref="tree" default-expand-all="" :data="RoleRight" :props="RoleRightProps" check-strictly="true" :default-checked-keys="checkmenu" node-key="id" show-checkbox>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click='closeDialog("perm")'>取消</el-button>
        <el-button type="primary" :loading="loading" class="title" @click="menuPermSave">保存</el-button>
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
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      title: '添加',
      editForm: {
        name: '',
        describe: ''
      },
      // rules 表单验证
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        describe: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      formInline: {
        page: 1,
        rows: 10,
        name: '',
        describe: ''
      },
      // 删除
      seletedata: {
        ids: ''
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 数据权限
      RoleRight: [],
      RoleRightProps: {
        children: 'children',
        label: 'funName'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  // 注册组件
  components: {
    // Pagination
  },
  /**
   * 数据发生改变
   */

  watch: {},

  /**
   * 创建完毕
   */

  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    onReset() {
      this.formInline = {
        page: 1,
        rows: 10,
        name: '',
        describe: ''
      }
      this.getdata(this.formInline);
    },
    // 获取角色列表
    getdata(parameter) {
      this.loading = true;
      this.$ajax(url.getRoles, parameter).then(res => {
        res = res.data;
        this.loading = false
        this.listData = res.list || []
        // 分页赋值
        this.pageparm.currentPage = this.formInline.page
        this.pageparm.pageSize = this.formInline.limit
        this.pageparm.total = res.total
      })
    },
    // 分页插件事件
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.getdata(this.formInline);
    },
    handleSizeChange(size) {
      this.formInline.rows = size;
      this.getdata(this.formInline);
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline)
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm = {
          id: row.id,
          name : row.name,
          describe: row.describe
        };
      } else {
        this.title = '添加'
        this.editForm = {
          name : '',
          describe: ''
        }
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          let currentUrl = this.title == '添加' ? url.addRole : url.updateRole
          this.$ajax(currentUrl, this.editForm).then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '角色保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.message
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('角色保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除角色
    deleteUser(index, row) {
      this.$confirm(`确定要删除${row.name}角色吗?`, '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(url.deleteRole, {id: row.id})
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '角色已删除！'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.message
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('角色删除失败，请稍后再试！')
            })
        })
    },
    getRoleRight(row) {
      this.$ajax(url.getRoleRight, {roleid: row.id}).then(res => {
        if(!res.data) {
          this.checkmenu = [];
          return;
        }
        let data = res.data.split(',');
        this.checkmenu = data;
      })
    },
    // 数据权限
    menuAccess: function(row) {
      this.menuAccessshow = true;
      this.saveroleId = row.id;
      this.$ajax(url.getMenuTree, {}).then(res => {
        if(res.success) {
          this.RoleRight = res.data;
          this.getRoleRight(row);
          // this.changemenu(res);
        }
      })
    },
    rowClick(row) {
      this.checkmenu = [];
    },
    // 选中菜单
    changemenu(arr) {
      let change = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id)
        }
      }
      this.checkmenu = change
    },
    // tree 递归
    changeArr(list) {
      var temptree = [],
        tree = [],
        items = []
      for (var i in list) {
        if (!temptree[list[i].id]) {
          var trow = {
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          }
          temptree[list[i].id] = trow
          items.push(trow)
        }
        if (list[i].uid > 0) {
          temptree[list[i].id]['children'].push({
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          })
        }
      }

      for (var j in items) {
        if (temptree[items[j].pId]) {
          temptree[items[j].pId]['children'].push(temptree[items[j].id])
        } else {
          tree.push(temptree[items[j].id])
        }
      }
      temptree = null
      items = null
      return tree
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        roleid: this.saveroleId,  // 角色id
        funcArr: ''
      }
      // 拿到勾选的节点和其父节点，但是不需要根节点
      let node = this.$refs.tree.getCheckedNodes(false , true).filter((item) => {
        return item.pid !== '0';
      });
      let moduleIds = []
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id)
        }
        parm.funcArr = moduleIds.join();
      }
      this.$ajax(url.setRoleMenu, parm).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '权限保存成功'
          })
          this.menuAccessshow = false
          this.getdata(this.formInline)
        } else {
          this.$message({
            type: 'info',
            message: res.msg
          })
        }
      }).catch(err => {
        this.loading = false
        this.$message.error('权限保存失败，请稍后再试！')
      })
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.menuAccessshow = false
      }
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
  .table-container{
    height: 65vh;
  }
.tableWrap {
  height: calc(100vh - 255px);
  overflow: auto;
}
</style>
