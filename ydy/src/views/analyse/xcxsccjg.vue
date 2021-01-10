<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>移动污染源新车销售抽测监管</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="searchBox">
      <div class="query">
        <el-form inline :model="query">
          <el-form-item label="抽检环节:">
            <el-input v-model="query.spotLink" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="生产厂商:">
            <el-input v-model="query.manufacturer" placeholder="请输入"></el-input>
          </el-form-item>
          <!-- <el-form-item label="抽查结果:">
            <el-select v-model="query.result" placeholder="请输入">
              <el-option>步骤一</el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="日期：">
            <el-date-picker
                v-model="query.date"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <div class="btns">
        <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <!--todo 添加抽检记录具体功能需求需要和客户商定-->
        <el-button icon="el-icon-plus" @click="addRecord">添加抽检记录</el-button>
      </div>
    </div>
    <div class="tableWrap">
      <el-table
        :data="tableData"
        border
        stripe
        height="100%"
        v-loading="loading" element-loading-text="拼命加载中"
      >
        <!--<el-table-column type="selection" width="55"></el-table-column>-->
        <el-table-column type="index" width="55" label="序号"></el-table-column>
        <el-table-column prop="spotLink" label="抽检环节" show-overflow-tooltip></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂商" show-overflow-tooltip></el-table-column>
        <el-table-column prop="batch" label="抽查批次"></el-table-column>
        <el-table-column prop="isOBD" label="是否有OBD">
          <template slot-scope="scope">
            {{scope.row.isOBD == 1 ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column prop="isControlSet" label="是否有污染控制装置">
          <template slot-scope="scope">
            {{scope.row.isControlSet == 1 ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column prop="isDataList" label="是否有环保信息随车清单">
          <template slot-scope="scope">
            {{scope.row.isDataList == 1 ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column prop="actualDischarge" label="实际排放(L)"></el-table-column>
        <el-table-column prop="checkTime" label="抽查时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="result" label="抽查结果">
          <template slot-scope="scope">
            {{scope.row.result == 1 ? '合格' : '不合格'}}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-if="page.total"
      background
      layout="total, sizes, prev, pager, next"
      :total="page.total"
      @current-change="currentChange"
      @size-change="sizeChange">
    </el-pagination>

    <!-- dialog区域 -->
    <el-dialog
      title="添加抽检记录"
      :visible.sync="showDialog"
      width="600px"
      append-to-body
    >
      <el-form ref="form" :model="menuForm" :rules="rules" label-width="120px">
        <el-form-item label="抽检环节:" prop="spotLink">
          <el-input v-model="menuForm.spotLink" placeholder="抽检环节" />
        </el-form-item>
        <el-form-item label="生产厂商:" prop="manufacturer">
          <el-input v-model="menuForm.manufacturer" placeholder="生产厂商" />
        </el-form-item>
        <el-form-item label="抽查批次:" prop="batch">
          <el-input-number v-model="menuForm.batch" :min="1" :max="100" label="抽查批次"></el-input-number>
          <!--<el-input v-model="menuForm.batch" placeholder="抽查批次" />-->
        </el-form-item>
        <el-form-item label="是否有OBD:" prop="isOBD">
          <el-select v-model="menuForm.isOBD" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有污染控制装置:" prop="isControlSet">
          <el-select v-model="menuForm.isControlSet" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有环保信息随车清单:" prop="isDataList">
          <el-select v-model="menuForm.isDataList" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实际排放:" prop="actualDischarge">
          <el-input v-model="menuForm.actualDischarge" placeholder="实际排放" />
        </el-form-item>
        <el-form-item label="抽查时间:" prop="checkTime">
          <el-date-picker type="date" placeholder="选择日期" v-model="menuForm.checkTime"
                          value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          <!--<el-input v-model="menuForm.checkTime" placeholder="抽查时间" />-->
        </el-form-item>
        <el-form-item label="抽查结果:" prop="result">
          <el-select v-model="menuForm.result" placeholder="请选择">
            <el-option label="合格" value="1"></el-option>
            <el-option label="不合格" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="showDialog=false;">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';

export default {
  data() {
    return {
      query: {
        spotLink: '',
        manufacturer: '',
        batch: '',
        isOBD: '',
        isControlSet: '',
        isDataList: '',
        actualDischarge: '',
        manufacturer: '',
        date: []
      },
      rules: {
        spotLink: [
          { required: true, message: '请输入抽检环节', trigger: 'change' },
        ],
      },
      page: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      loading: false,
      tableData: [],

      showDialog: false,
      menuForm: {
        spotLink: '',
        manufacturer: '',
        batch: '',
        isOBD: '',
        isControlSet: '',
        isDataList: '',
        actualDischarge: '',
        checkTime: '',
        result: ''
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    onReset() {
      this.query = {
        spotLink: '',
        manufacturer: '',
        batch: '',
        isOBD: '',
        isControlSet: '',
        isDataList: '',
        actualDischarge: '',
        manufacturer: '',
        date: []
      }
      this.page.pageSize = 10;
      this.page.pageIndex = 1;
      this.getData();
    },
    getData() {
      this.loading = true;
      let data = {
        spotLink: this.query.spotLink,
        manufacturer: this.query.manufacturer,
        // batch: this.query.batch,
        // isOBD: this.query.isOBD,
        // isControlSet: this.query.isControlSet,
        // isDataList: this.query.isDataList,
        // actualDischarge: this.query.actualDischarge,
        // manufacturer: this.query.manufacturer,
        startTime: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        endTime: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : '',
        pageSize: this.page.pageSize,
        pageIndex: this.page.pageIndex
      }
      this.$ajax(url.getDataSpotcheck, data).then(res => {
        this.loading = false;
        if(res.success) {
          this.tableData = res.data.list;
          this.page.total = res.data.total;
        }
      });
    },
    search() {
      this.getData();
    },
    currentChange(page) {
      this.page.pageIndex = page;
      this.getData();
    },
    sizeChange(size) {
      this.page.pageSize = size;
      this.getData();
    },
    addRecord () {
      this.menuForm = {
        spotLink: '',
        manufacturer: '',
        batch: '',
        isOBD: '',
        isControlSet: '',
        isDataList: '',
        actualDischarge: '',
        checkTime: '',
        result: ''
      };
      this.showDialog = true
    },
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$ajax(url.saveSpotcheck, this.menuForm).then(res => {
            if(res.success) {
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
              this.showDialog = false;
              this.getData();
            }
          });
        } else {
          return false;
        }
      })

    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    // height: calc(100vh - 100px);
    height: 100%;

    .el-table{
      margin-top: 15px;
    }
    .el-pagination{
      margin-top: 15px;
      float: right;
    }
  }
  .tableWrap {
    height: calc(100vh - 300px);
    /*overflow: auto;*/
  }
</style>
