<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>执法对象管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="legalObjectForm">
      <el-form-item label="执法对象名称：">
        <el-input v-model="legalObjectForm.objectName" placeholder="请输入执法对象名称"></el-input>
      </el-form-item>
      <el-form-item label="执法对象类型:" prop="legalobjType">
        <el-select v-model="legalObjectForm.objectType" placeholder="请选择执法对象类型">
          <el-option :label="v.name" :value="v.code" v-for="v in dicts.legalobjType" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域:" prop="areaCode">
        <el-select v-model="legalObjectForm.areaCode">
          <el-option :label="v.name" :value="v.id" v-for="v in dicts.areaOptions" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleEdit('add')">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="tableWrap">
      <el-table
        :data="tableData"
        border
        stripe
        height="100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
      >
        <el-table-column type="index" width="55" label="序号"></el-table-column>
        <el-table-column prop="objectName" label="执法对象名称"></el-table-column>
        <el-table-column prop="objectTypeName" label="执法对象类型"></el-table-column>
        <el-table-column prop="areaName" label="所属区域"></el-table-column>
        <el-table-column prop="creditCode" label="社会信用代码"></el-table-column>
        <el-table-column prop="businessNo" label="公民身份证号码"></el-table-column>
        <el-table-column align="center" label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button type="primary" plain @click="handleView(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-if="dataTotal"
      background
      layout="total, sizes, prev, pager, next"
      :current-page="pagePram.page"
      :page-size="pagePram.pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :total="dataTotal">
    </el-pagination>
    <el-dialog append-to-body @close='closeDialog()' :visible.sync="showDialog" :title="title" width="40%">
      <div class="form-wrapper">
        <el-form label-width="140px" :model="editForm" ref="editForm" :rules="rules">
          <el-form-item label="执法对象名称:" prop="objectName">
            <el-input v-model="editForm.objectName" auto-complete="off" placeholder="请输入执法对象名称"></el-input>
          </el-form-item>
          <el-form-item label="地址:" prop="address">
            <el-input v-model="editForm.address" auto-complete="off" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="所属区域:" prop="areaCode">
            <el-select v-model="editForm.areaCode">
              <el-option :label="v.name" :value="v.id" v-for="v in dicts.areaOptions" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执法对象类型:" prop="objectType">
            <el-select v-model="editForm.objectType" placeholder="请选择执法对象类型">
              <el-option :label="v.name" :value="v.code" v-for="v in dicts.legalobjType" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
          <!--选择的执法对象类型是“个人”-->
          <div v-if="editForm.objectType === '6'">
            <el-form-item label="公民身份证号码:" prop="businessNo">
              <el-input v-model="editForm.businessNo" auto-complete="off" placeholder="请输入公民身份证号码"></el-input>
            </el-form-item>
          </div>
          <!--选择的执法对象类型非“个人”-->
          <div v-if="editForm.objectType && editForm.objectType !== '6'">
            <el-form-item label="社会统一信用代码:" prop="creditCode">
              <el-input v-model="editForm.creditCode" auto-complete="off" placeholder="请输入社会统一信用代码"></el-input>
            </el-form-item>
            <el-form-item label="法定代表人（负责人）:" prop="legalPerson">
              <el-input v-model="editForm.legalPerson" auto-complete="off" placeholder="法定代表人（负责人）"></el-input>
            </el-form-item>
            <el-form-item label="职务:" prop="duty">
              <el-input v-model="editForm.duty" auto-complete="off" placeholder="请输入职务"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="phone">
              <el-input v-model="editForm.phone" auto-complete="off" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码:" prop="zipCode">
              <el-input v-model="editForm.zipCode" auto-complete="off" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click='closeDialog("edit")'>取消</el-button>
        <el-button type="primary" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看详情信息" :visible.sync="isShowDetail" width="60%">
      <div style="min-height: 200px">
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">执法对象名称:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">{{legalObjectDetail.objectName || '无'}}</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">地址:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">{{legalObjectDetail.address || '无'}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">所属区域:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">{{legalObjectDetail.areaName || '无'}}</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">执法对象类型:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">{{legalObjectDetail.objectTypeName || '无'}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">社会统一信用代码:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">{{legalObjectDetail.creditCode || '无'}}</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">公民身份证号码:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">{{legalObjectDetail.businessNo || '无'}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" v-if="legalObjectDetail.legalPerson">
            <div class="info-content">法定代表人（负责人）:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" v-if="legalObjectDetail.legalPerson">
            <div class="info-content">{{legalObjectDetail.legalPerson || '无'}}</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" v-if="legalObjectDetail.duty">
            <div class="info-content">职务:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" v-if="legalObjectDetail.duty">
            <div class="info-content">{{legalObjectDetail.duty || '无'}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" v-if="legalObjectDetail.phone">
            <div class="info-content">联系电话:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" v-if="legalObjectDetail.phone">
            <div class="info-content">{{legalObjectDetail.phone || '无'}}</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" v-if="legalObjectDetail.zipCode">
            <div class="info-content">邮政编码:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" v-if="legalObjectDetail.zipCode">
            <div class="info-content">{{legalObjectDetail.zipCode || '无'}}</div>
          </el-col>
        </el-row>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {validEmptySpace, validYouBian, validPhone, validNoHanZi, validIdCard} from '@/utility/limitFrom';
export default {
  data () {
    return {
      // 查询表单模型对象
      legalObjectForm: {
        objectName: '',
        objectType: '',
        areaCode: ''
      },
      // 执法对象类型和区域下拉框内容
      dicts: {
        legalobjType: [],
        areaOptions: []
      },
      // 表格数据
      loading: false,
      tableData: [],
      // 是否显示编辑、新增弹框
      showDialog: false,
      // 是否展示详情
      isShowDetail: false,
      title: '添加',
      // 新增、编辑的表单模型对象
      editForm: {
        objectName: '',
        address: '',
        areaCode: '',
        objectType: '',
        creditCode: '',
        businessNo: '',
        legalPerson: '',
        duty: '',
        phone: '',
        zipCode: ''
      },
      // 分页参数
      pagePram: {
        page: 1,
        pageSize: 10,
      },
      dataTotal: 0,
      // 表单校验
      rules: {
        objectName: [
          { required: true, message: '请输入执法对象名称', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        areaCode: [
          { required: true, message: '请输入所属区域', trigger: 'change' }
        ],
        objectType: [
          { required: true, message: '请输入执法对象类型', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        businessNo: [
          { required: true, message: '请输入公民身份证号码', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' },
          { validator: validIdCard, trigger: 'change' }
        ],
        creditCode: [
          { required: true, message: '请输入社会统一信用代码', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' },
          { validator: validNoHanZi, trigger: 'change' }
        ],
        legalPerson: [
          { required: true, message: '请输入法定负责人', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        duty: [
          { required: true, message: '请输入职务', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' },
          { validator: validPhone, trigger: 'change' }
        ],
        zipCode: [
          { required: true, message: '请输入邮政编码', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' },
          { validator: validYouBian, trigger: 'change' }
        ],
      },
      legalObjectId: '',
      // 执法对象详情数据
      legalObjectDetail: {},
    }
  },
  created () {
    // 获取执法对象列表
    this.getList();
    // 获取执法对象类型集合
    this.getLegalTypeData(4, 'legalobjType');
    // 获取区域集合
    this.getArea();
  },
  methods: {
    onReset() {
      this.legalObjectForm = {
        objectName: '',
        objectType: '',
        areaCode: ''
      }
      this.pagePram.page = 1;
      this.pagePram.pageSize = 10;
      this.getList();
    },
    // 分页获取表格数据
    getList () {
      this.loading = true;
      let queryPram = {
        objectName: this.legalObjectForm.objectName,
        areaCode: this.legalObjectForm.areaCode,
        objectType: this.legalObjectForm.objectType,
        pageIndex: this.pagePram.page,
        pageSize: this.pagePram.pageSize
      };
      this.$ajax(url.queryLegalList, queryPram).then(res => {
        this.loading = false;
        this.tableData = res.list;
        this.dataTotal = res.total;
      });
    },
    // 分页参数变动触发
    handleCurrentChange (val) {
      this.pagePram.page = val;
      this.getList();
    },
    handleSizeChange (size) {
      this.pagePram.pageSize = size;
      this.getList();
    },
    // 打开编辑/新增弹框触发
    handleEdit (ev) {
      // this.showDialog = true;
      if (ev === 'add') {
        // 添加执法对象
        this.title = '添加';
        this.legalObjectId = '';
        this.editForm = {
          objectName: '',
          address: '',
          areaCode: '',
          objectType: '',
          creditCode: '',
          businessNo: '',
          legalPerson: '',
          duty: '',
          phone: '',
          zipCode: ''
        }
      } else {
        // 编辑执法对象
        this.title = '编辑';
        this.legalObjectId = ev.id;
        let legalDetail;
        this.$ajax(url.getLegalDetail, {id: ev.id}).then(res => {
          if (res.success) {
            legalDetail = res.data;
            this.editForm = {
              objectName: legalDetail.objectName || '',
              address: legalDetail.address || '',
              areaCode: legalDetail.areaCode || '',
              objectType: legalDetail.objectType || '',
              creditCode: legalDetail.creditCode || '',
              businessNo: legalDetail.businessNo || '',
              legalPerson: legalDetail.legalPerson || '',
              duty: legalDetail.duty || '',
              phone: legalDetail.phone || '',
              zipCode: legalDetail.zipCode || ''
            }
          }
        });
      }
      this.showDialog = true;
    },
    // 删除执法对象
    handleDelete (index, row) {
      this.$confirm(`确定要删除${row.objectName}吗?`, '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$ajax(url.delLegalRecord, {id: row.id}).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '角色已删除！'
              })
              this.getList();
            } else {
              this.$message({
                type: 'info',
                message: res.message
              })
            }
          })
        })
    },
    handleView (ev) {
      this.isShowDetail = true;
      this.$ajax(url.getLegalDetail, {id: ev.id}).then(res => {
        if (res.success) {
          this.legalObjectDetail = res.data;
        }
      });
    },
    // 获取字典树
    getLegalTypeData (type, arr) {
      this.$ajax(url.getDictOption, {
        type: type
      }).then(res => {
        this.dicts[arr] = res;
      })
    },
    // 拿到区域
    getArea () {
      this.$ajax(url.getArea, {}).then(res => {
        if (res.success) {
          this.dicts.areaOptions = res.data;
        }
      })
    },
    closeDialog () {
      this.showDialog = false;
      if (this.$refs['editForm']) {
        this.$refs['editForm'].resetFields();
      }
    },
    // 保存表单方法
    submitForm (editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          let queryPram;
          if (this.editForm.objectType === '6') {
            // 选择的是 “个人”
            queryPram = {
              id: this.legalObjectId || '',
              objectName: this.editForm.objectName,
              address: this.editForm.address,
              areaCode: this.editForm.areaCode,
              objectType: this.editForm.objectType,
              businessNo: this.editForm.businessNo,
            };
          } else {
            // 选择的非“个人”
            queryPram = {
              id: this.legalObjectId || '',
              objectName: this.editForm.objectName,
              address: this.editForm.address,
              areaCode: this.editForm.areaCode,
              objectType: this.editForm.objectType,
              creditCode: this.editForm.creditCode,
              legalPerson: this.editForm.legalPerson,
              duty: this.editForm.duty,
              phone: this.editForm.phone,
              zipCode: this.editForm.zipCode
            };
          }
          this.$ajax(url.saveLegalData, queryPram).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '保存成功！'
              })
              this.showDialog = false;
              this.getList();
            }
          });
        } else {
          return false
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
  .page{
    .searchBox{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .el-input{
        width: 150px;
      }
      .el-range-editor--mini.el-input__inner{
        width: 280px;
      }
    }
    .el-table{
      margin-top: 15px;
    }
    .el-pagination{
      margin-top: 15px;
      float: right;
    }
  }
  .handle-advice{
    margin-top: 20px;
  }
  .form-wrapper {
    max-height: 500px;
    overflow: auto;
  }
  .info-content {
    line-height: 38px;
    font-size: 13px;
  }
  .tableWrap {
    height: calc(100vh - 300px);
    /*overflow: auto;*/
  }
</style>
