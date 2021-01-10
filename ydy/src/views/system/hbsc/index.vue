
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>环保手册</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">

      <el-form-item label="法规名称：">
        <el-input v-model="formInline.name" placeholder="输入法规名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-input v-model="formInline.legalType" placeholder="输入关键字"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleEdit()">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="tableWrap">
      <!--列表-->
      <el-table
        :data="listData"
        highlight-current-row
        @current-change="rowClick"
        height="100%"
        v-loading="loading" border element-loading-text="拼命加载中">
        <el-table-column align="center" type="index" width="60" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="法规名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="carryOrg" label="执行机构" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="reviseDate" label="修订日期"></el-table-column>
        <el-table-column prop="carryDate" label="实施日期"></el-table-column>
        <el-table-column prop="file" label="附件" width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="handleDownload(scope.row,scope.$index)">
              {{scope.row.file.map(v => v.name).join(',')}}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" min-width="160">
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
    <el-dialog :title="title" :visible.sync="editFormVisible" width="480px" @close='closeDialog("edit")'>
      <el-form label-width="120px" :model="editForm" ref="editForm" :rules="rules">
        <el-form-item label="法规名称：" prop="name">
          <el-input v-model.trim="editForm.name" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="执行机构：" prop="carryOrg">
          <el-input v-model.trim="editForm.carryOrg" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="修订日期：" prop="reviseDate">
          <el-date-picker
            v-model="editForm.reviseDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实施日期：" prop="carryDate">
          <el-date-picker
            v-model="editForm.carryDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="附件：">
          <upload :id="editForm.id" :type="'2'" :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'" :fileUrl="fileUrl" @loadSuccess="loadSuccess" @delSuccess="delSuccess" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible=false;">取消</el-button>
        <el-button type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import upload from '@/components/upload.vue'
import url from '@/servers/url-config.js'
import {root} from '@/servers/url-config.js'
import {formatDateToStr, downloadFile} from '@/utility/utility.js'
export default {
  data() {
    return {
      fileObj: {},
      fileUrl: [],

      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      editForm: {
        name: '',
        carryOrg: '',
        reviseDate :'',
        carryDate:''
      },
      // rules 表单验证
      rules: {
        name: [
          { required: true, message: '法规名称不能为空', trigger: 'blur' }
        ],
        carryOrg: [
          { required: true, message: '执行机构不能为空', trigger: 'blur' }
        ],
        reviseDate: [
          { required: true, message: '请选择修订日期', trigger: 'blur' }
        ],
        carryDate: [
          { required: true, message: '请选择实施日期', trigger: 'blur' }
        ],
      },
      formInline: {
        pageIndex: 1,
        pageSize: 10,
        name: '',
        // carryOrg: '',
        // reviseDate :'',
        // carryDate:''
      },

      userparm: [], //搜索权限
      listData: [], //用户数据


      // 选中
      checkmenu: [],

      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: ''
      }
    }
  },
  // 注册组件
  components: {
    upload
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
    // 下载附件
    handleDownload(row,index) {
      console.log(row,index)
      // window.open('http://10.41.41.190:9877/system/file/downloadFile?id='+row.file[0].id)
      window.open(`${root}/system/file/downloadFile?id=${row.file[0].id}`)
      // return;
      // this.$ajax(url.downloadFile,{id: row.file[0].id}).then(res => {
      //   alert(JSON.stringify(res))

      //   //获取自定义文件名
      // var fileName = res.headers.map["attachment-name"][0];
      // //生成Blob对象，通过创建的a标签点击下载
      // let blob = new Blob([res], {'type': 'application/octet-stream;charset=UTF-8'})
      // var link = document.createElement("a");//创建a标签
      // link.download = fileName//a标签添加属性
      // link.href = URL.createObjectURL(blob);

      // document.body.appendChild(link)
      // link.click();

      // })
      // downloadFile(JSON.stringify({id: row.file[0].id}), url.downloadFile, row.file[0].name)
    },
    onReset() {
      this.formInline = {
        pageIndex: 1,
        pageSize: 10,
        name: ''
      },
      this.getdata(this.formInline)
    },
    // 获取列表
    getdata(parameter) {
      this.loading = true;
      this.$ajax(url.getHandbook, parameter).then(res => {
        res = res.data;
        this.loading = false
        this.listData = res.list || []
        this.listData.forEach(v => {
          v.carryDate = formatDateToStr(new Date(v.carryDate)).split(' ')[0];
          v.reviseDate = formatDateToStr(new Date(v.reviseDate)).split(' ')[0];
        })
        // 分页赋值
        this.pageparm.currentPage = this.formInline.pageIndex
        this.pageparm.pageSize = this.formInline.pageSize
        this.pageparm.total = res.total
      })
    },
    // 分页插件事件
    handleCurrentChange(val) {
      this.formInline.pageIndex = val;
      this.getdata(this.formInline);
    },
    handleSizeChange(size) {
      this.formInline.pageSize = size;
      this.getdata(this.formInline);
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline);
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      if (row != undefined && row != 'undefined') {
        this.title = '编辑';
        this.editForm = {
          id: row.id,
          name : row.name,
          carryOrg: row.carryOrg,
          reviseDate :row.reviseDate,
          carryDate:row.carryDate
        };
        this.fileUrl = row.file;
      } else {
        this.title = '添加';
        this.editForm = {
          name : '',
          carryOrg: '',
          reviseDate :'',
          carryDate:''
        };
        this.fileUrl = [];
      }
      this.editFormVisible = true;
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          let data = {...this.editForm};
          data.reviseDate = formatDateToStr(data.reviseDate);
          data.carryDate = formatDateToStr(data.carryDate);

          let currentUrl = this.title == '添加' ? url.addHandbook : url.updateHandbook
          this.$ajax(currentUrl, data).then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '保存成功！'
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
    // 删除
    deleteUser(index, row) {
      this.$confirm(`确定要删除${row.name}吗?`, '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(url.deleteHandbook, {ids: row.id})
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '已删除！'
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
              this.$message.error('删除失败，请稍后再试！')
            })
        })
    },


    rowClick(row) {
      this.checkmenu = [];
    },

    closeDialog(){
        // 点击关闭 数据重置
        this.$refs['editForm'].resetFields();
    },

    // 上传成功获取参数 v: {fileid, id}
    loadSuccess(v) {
      this.fileObj = v;
      this.editForm.id = v.id;
    },
    delSuccess(v) {
      this.fileObj = null
    },

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
.tableWrap {
  height: calc(100vh - 255px);
  overflow: auto;
}
</style>
