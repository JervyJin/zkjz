<template>
  <div class="app-container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>字典管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--表单组件-->
    <el-dialog append-to-body :close-on-click-modal="false" :visible="showDict" :title="dictTitle" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典" prop="type">
          <el-input v-model="form.type" style="width: 370px;" />
        </el-form-item>
        <el-form-item label="字典名称">
          <el-input v-model="form.typeName" style="width: 370px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="showDict = false">取消</el-button>
        <el-button type="primary" @click="ensureAddOrEdit">确认</el-button>
      </div>
    </el-dialog>
    <!-- 字典列表 -->
    <el-row :gutter="10">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" style="margin-bottom: 10px">
        <el-card class="box-card">
          <!--工具栏-->
          <!-- <div class="head-container">
            <div style="display: flex">
              <el-input v-model="query.blurry" clearable placeholder="输入名称或者描述搜索" class="filter-item" @keyup.enter.native="toQuery" />
              <el-button icon="el-icon-search" style="margin-left:5px" type="primary">查询</el-button>
            </div>
          </div> -->
          <!--表格渲染-->
          <div class="tableWrap">
            <el-table ref="table" border v-loading="crud.loading" :data="crud.data" highlight-current-row
                      @selection-change="selectionChangeHandler"
                      @current-change="handleCurrentChange"
                      height="100%">
              <el-table-column :show-overflow-tooltip="true" prop="typeName" label="字典名称：" />
              <!-- <el-table-column :show-overflow-tooltip="true" prop="type" label="字典" /> -->
              <!-- <el-table-column label="操作" width="130px" align="center" fixed="right">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-edit" @click="toEdit(scope.row)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" @click="toDel(scope.row)"></el-button>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </el-card>
      </el-col>
      <!-- 字典详情列表 -->
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>字典详情</span>
            <el-button
              v-if="selectDict.type"
              class="filter-item"
              style="float: right;margin-left: 10px"
              type="danger"
              icon="el-icon-delete"
              @click="toDelDetail"
            >批量删除</el-button>
            <el-button
              v-if="selectDict.type"
              class="filter-item"
              style="float: right;"
              type="primary"
              icon="el-icon-plus"
              @click="toAddDetail"
            >新增</el-button>
          </div>
          <dictDetail ref="dictDetail" :selectDict="selectDict" :showDictDetail="showDictDetail"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import url from '@/servers/url-config.js'
import dictDetail from './dictDetail'

export default {
  components: {
    dictDetail
  },
  data() {
    return {
      rules: {
        type: [
          { required: true, message: '请输入字典', trigger: 'blur' }
        ],
        typeName: [
          { required: true, message: '请输入字典名称', trigger: 'blur' }
        ]
      },
      showDict: false,
      dictTitle: '新增字典',
      form: {
        type: '',
        typeName: ''
      },
      query:{
        blurry: ''
      },
      crud: {
        loading: false,
        data: [] // tableData
      },
      selectDict: {
        // dictId: 1,
        // type: 'job_status'
      },
      showDictDetail: 0,  // 展示添加选项form
    }
  },
  methods: {
    getData() {
      this.crud.loading = true;
      this.$ajax(url.getDicts, {}).then(res => {
        this.crud.loading = false;
        this.crud.data = res;
        this.selectDict = this.crud.data[0];  // 默认选中第一个
      })
    },
    // 搜索字段
    toQuery() {

    },
    // 重置字典
    resetDict() {
      this.selectDict = {};
      this.query = {};
    },
    // 添加字段
    toAdd() {
      this.dictTitle = '新增字典';
      this.showDict = true;
    },
    // 修改字段
    toEdit(row) {
      this.dictTitle = '修改字典';
      this.showDict = true;
      this.form = row;
    },
    // 删除字段
    toDel() {

    },
    // 确认添加字段
    ensureAddOrEdit() {
      this.$refs.form.validate(valid => {
        if(valid) {
          let dict = this.form;
          this.$ajax(url.addDict, {
            dict
          }).then(res => {
            this.getData();
          })
          this.showDict = false;
        }
      })
    },
    // 点击添加字段选项
    toAddDetail() {
      this.showDictDetail ++;
    },
    // 批量删除
    toDelDetail() {
      this.$refs.dictDetail.delectIds();
    },
    selectionChangeHandler(arr) {
      // console.log(row, '000')
    },
    // 选中一个字段
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selectDict = currentRow;
    }
  },
  created() {
    this.getData();
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-row{
  margin-top: 20px;
}
.head-container {
  margin-bottom: 10px;
}
.tableWrap {
  height: calc(100vh - 200px);
  /*overflow: auto;*/
}
</style>
