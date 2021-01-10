/**
 * 系统管理  公告管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">

      <el-form-item label="搜索：">
        <el-input v-model="formInline.title" placeholder="输入公告名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="formInline.content" placeholder="输入公告内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleEdit">新增</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <div class="tableWrap">
      <el-table :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" height="100%">
        <el-table-column align="center" type="index" width="60" label="序号">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="title" label="公告名称">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="content" label="公告内容">
        </el-table-column>
        <el-table-column sortable prop="created" label="建立时间">
        </el-table-column>
        <el-table-column prop="createBy" label="建立人" width="160">
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
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
      <el-form label-width="80px" :model="editForm" ref="editForm" :rules="rules">
        <el-form-item label="公告名称" prop="title">
          <el-input v-model.trim="editForm.title" auto-complete="off" placeholder="请输入公告名称"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input type="textarea" :rows="4" v-model.trim="editForm.content" placeholder="请输入公告内容"></el-input>
        </el-form-item>
        <el-form-item label="附件">
          <upload v-if="editFormVisible" :id="editForm.id" :type="'1'" :fileUrl="fileUrl" @loadSuccess="loadSuccess" @delSuccess="delSuccess"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click='closeDialog("edit")'>取消</el-button>
        <el-button type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- <tips /> -->
  </div>
</template>

<script>
import upload from '@/components/upload.vue'
import tips from '@/components/tips.vue'
import url from '@/servers/url-config.js'
export default {
  components: {
    tips, upload
  },
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
        title: '',
        content: '',
        id: ''
      },
      fileUrl: [],
      // rules 表单验证
      rules: {
        title: [
          { required: true, message: '请输入公告名称', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ]
      },
      formInline: {
        page: 1,
        rows: 10,
        title: '',
        content: ''
      },
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      fileObj: null
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
        title: '',
        content: ''
      }
      this.getdata(this.formInline);
    },
    // 获取公告列表
    getdata(parameter) {
      this.loading = true;
      this.$ajax(url.getNotice, parameter).then(res => {
        res = res.data;
        this.loading = false
        this.listData = res.list || []
        // 分页赋值
        this.pageparm.currentPage = this.formInline.page
        this.pageparm.pageSize = this.formInline.rows
        this.pageparm.total = res.total
      })
    },
    // 分页插件事件
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.getdata(this.formInline)
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
      this.fileUrl = [];
      if (row != undefined && row != 'undefined') {
        this.$ajax(url.selectByPrimaryKey, {id: row.id}).then(res => {
          if(res.success) {
            this.title = '修改';
            this.fileUrl = res.data.fileUrl || [];
            this.editForm = {
              id: row.id,
              title : row.title,
              content: row.content
            }
            this.editFormVisible = true;
          }
        })
      } else {
        this.title = '添加'
        this.fileUrl = [];
        this.editForm = {
          id: '',
          title : '',
          content: ''
        }
        this.editFormVisible = true;
      }
    },
    handleChange() {

    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          let currentUrl = this.title == '添加' ? url.addNotice : url.updateNotice
          this.$ajax(currentUrl, this.editForm).then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '公告保存成功！'
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
              this.$message.error('公告保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除公告
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(url.deleteNotice, {id: row.id})
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '公告已删除！'
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
              this.$message.error('公告删除失败，请稍后再试！')
            })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.fileUrl = [];
        this.fileObj = null;
        this.editFormVisible = false
      }
    },
    // 上传成功获取参数 v: {fileid, id}
    loadSuccess(v) {
      this.fileObj = v;
      this.editForm.id = v.id;
    },
    delSuccess(v) {
      this.fileObj = null
    }
  }
}
</script>

<style scoped lang="less">
/* .user-search {
  margin-top: 20px;
} */
.userRole {
  width: 100%;
}
.tableWrap {
  height: calc(100vh - 255px);
  overflow: auto;
}

</style>
