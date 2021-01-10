<template>
  <div class="page">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>环保手册查询</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" ref="queryForm">
      <el-form-item label="法规名称:">
        <el-input v-model="formInline.name" placeholder="法规名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="onQuery">查询</el-button>
        <el-button icon="el-icon-delete" @click="resetForm('queryForm')">重置</el-button>
        <!-- <el-button @click="onSubmit">导出</el-button> -->
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <div class="tableWrap">
      <el-table
        class="table"
        v-loading="loading"
        :data="tableData"
        border
        height="100%"
        element-loading-text="拼命加载中"
      >
        <el-table-column align="center" type="index" width="45" label="序号">
        </el-table-column>
        <el-table-column prop="name" label="法规名称">
          <template slot-scope="scope">
            <span @click="toDetail(scope.row)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="carryOrg" label="执行机构">
        </el-table-column>
        <el-table-column prop="reviseDate" label="修订日期"></el-table-column>
        <el-table-column prop="carryDate" label="实施日期"></el-table-column>
        <el-table-column prop="file" label="附件" min-width="160" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="handleDownload(scope.row)">
              {{scope.row.file.map(v => v.name).join(',')}}
            </el-button>
          </template>
        </el-table-column>

        <!-- <el-table-column align="center" label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <el-pagination
      v-if="page.total"
      background
      layout="total, sizes, prev, pager, next"
      :pageSize="formInline.pageSize"
      :total="page.total"
      @current-change="currentChange"
      @size-change="sizeChange">
    </el-pagination>

    <!-- dialog区域 -->
    <el-dialog
      :title="title"
      :visible.sync="isDialog"
      width="600px"
      append-to-body
    >
      <el-form ref="form" :model="menuForm" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="法规名称:" prop="name">
              <el-input v-model="menuForm.name" placeholder="法规名称" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行机构:" prop="carryOrg">
              <el-input v-model="menuForm.carryOrg" placeholder="执行机构" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="修订日期:" prop="reviseDate">
              <el-input v-model="menuForm.reviseDate" placeholder="修订日期" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实施日期:" prop="carryDate">
              <el-input v-model="menuForm.carryDate" placeholder="实施日期" readonly />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件:">
              <el-button type="text" @click="handleDownload(menuForm)" v-if="menuForm.file && menuForm.file.length">
                {{menuForm.file && menuForm.file.length && menuForm.file.map(v => v.name).join(',')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatDateToStr, downloadFile} from '@/utility/utility.js'
import url from '@/servers/url-config.js'
import {root} from '@/servers/url-config.js'
export default {
  data() {
    return {
      formInline: {
        // legalType: "",
        // industryType: "",
        // businessType: "",
        name: "",
        pageIndex: 1,
        pageSize: 10
      },
      loading: false,
      tableData: [],
      // 弹框详情
      title: '',
      menuForm : {},
      isDialog:false,
      options: [],
      page: {
        total: 0
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.$ajax(url.getHandbook, this.formInline).then(res => {
        this.loading = false;
        this.tableData = res.data.list;
        this.tableData.forEach(v => {
          v.carryDate = formatDateToStr(new Date(v.carryDate)).split(' ')[0];
          v.reviseDate = formatDateToStr(new Date(v.reviseDate)).split(' ')[0];
        })
        this.page.total = res.data.total;
      })
    },
    onQuery() {
      this.getData();
    },
    // 下载附件
    handleDownload(row) {
      window.open(`${root}/system/file/downloadFile?id=${row.file[0].id}`)
      // window.open('http://10.41.41.186:9877/system/file/downloadFile?id=18c4a5debaa4492e939e58c0556734fb')
      // return;
      // this.$ajax(url.downloadFile, {id: row.file[0].id}).then(res => {
      //   window.open(res);
      // })

      // downloadFile({id: row.file[0].id}, url.downloadFile, row.file[0].name)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toDetail(row) {
      this.isDialog = true;
      this.menuForm = row;
      this.title = row.name;
    },
    cancel() {
      this.isDialog = false;
    },
    submitForm() {
      this.isDialog = false;
    },
    currentChange(page) {
      this.formInline.pageIndex = page;
      this.getData();
    },
    sizeChange(size) {
      this.formInline.pageSize = size;
      this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  /deep/ .table {
    tbody {
      td:nth-of-type(2) {
        color: #1890ff;
        cursor: pointer;
      }
    }
  }
  .el-pagination {
    float: right;
    margin-top: 24px;
  }
}
.tableWrap {
  height: calc(100vh - 255px);
  /*overflow: auto;*/
}
</style>
