/**
 * 系统管理  问题管理
 */
<template>
  <div class="pages">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>问题管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">

      <el-form-item label="问题名称：">
        <el-input v-model="formInline.question" placeholder="输入问题名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleEdit()">新增</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <div class="tableWrap">
      <el-table :data="listData" height="100%" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
        <el-table-column align="center" type="index" width="60" label="序号">
        </el-table-column>
        <el-table-column prop="question" label="问题名称" min-width="160" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="isDefaultDisplay" label="是否默认展示">
          <template slot-scope="scope">
            {{scope.row.isdefaultdisplay == "Y" ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column prop="isActive" label="是否可用">
          <template slot-scope="scope">
            {{scope.row.isactive == "Y" ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="created" label="建立时间" min-width="160" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createbyName" label="建立人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column sortable prop="updated" label="上次更新时间" min-width="160" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="updatebyName" label="上次更新人" show-overflow-tooltip>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template slot-scope="scope">
            <!-- <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button v-if="scope.row.isactive === 'Y'" type="danger" @click="deleteUser(scope.$index, scope.row)">禁用</el-button>
            <el-button v-if="scope.row.isactive === 'N'" type="primary" @click="startUse(scope.row)">启用</el-button>
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
        <el-form-item label="问题名称" prop="question">
          <el-input v-model="editForm.question" auto-complete="off" placeholder="请输入问题名称"></el-input>
        </el-form-item>
        <el-form-item label="是否默认展示" prop="isDefaultDisplay">
          <el-select v-model="editForm.isDefaultDisplay">
            <el-option label="是" value="Y"></el-option>
            <el-option label="否" value="N"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="orderBy">
          <el-input-number v-model.number="editForm.orderBy" :min="0" :max="999" controls-position="right" style="width: 178px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click='closeDialog("edit")'>取消</el-button>
        <el-button type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
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
      title: '添加',
      editForm: {
        question: '',
        orderBy: 1,
        isDefaultDisplay: 'N'
      },
      // rules 表单验证
      rules: {
        question: [
          { required: true, message: '请输入问题名称', trigger: 'blur' }
        ],
        orderBy: [
          { required: true, message: '请输入问题排序', trigger: 'blur' }
        ],
        isDefaultDisplay: [
          { required: true, message: '请选择是否展示', trigger: 'change' }
        ]
      },
      formInline: {
        question: '',
        pageIndex: 1,
        pageSize: 10
      },
      listData: [], //用户数据
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
        question: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.getdata(this.formInline)
    },
    // 获取问题列表
    getdata(parameter) {
      this.loading = true;
      this.$ajax(url.getQuestion, parameter).then(res => {
        this.loading = false
        this.listData = res.list || []
        // 分页赋值
        this.pageparm.currentPage = this.formInline.pageIndex
        this.pageparm.pageSize = this.formInline.pageSize
        this.pageparm.total = res.total
      })
    },
    // 分页插件事件
    handleCurrentChange(val) {
      this.formInline.pageIndex = val;
      this.getdata(this.formInline)
    },
    handleSizeChange(size) {
      this.formInline.pageSize = size;
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
          question : row.question,
          orderBy: row.orderBy
        }
      } else {
        this.title = '添加'
        this.editForm = {
          question : '',
          orderBy: 1
        }
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          let currentUrl = this.title == '添加' ? url.addQuestion : url.updateQuestion;
          this.$ajax(currentUrl, this.editForm).then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '问题保存成功！'
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
              this.$message.error('问题保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除问题
    deleteUser(index, row) {
      console.log(row);
      this.$confirm('确定要禁用吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(url.deleteQuestion, {id: row.id})
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '问题已禁用！'
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
              this.$message.error('问题禁用失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          })
        })
    },
    startUse (row) {
      this.$ajax(url.resumeQuestion, {id: row.id})
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '问题已启用！'
            })
            this.getdata(this.formInline)
          }
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      }
    }
  }
}
</script>

<style scoped>
.pages {
  overflow-x: hidden;;
}
.userRole {
  width: 100%;
}
.tableWrap {
  height: calc(100vh - 255px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
