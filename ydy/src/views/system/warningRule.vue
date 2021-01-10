<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预警规则设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :inline="true" :model="warningQueryForm">
      <el-form-item label="预警规则名称：">
        <el-input v-model="warningQueryForm.name" placeholder="请输入预警规则名称"></el-input>
      </el-form-item>
      <el-form-item label="预警规则类型:" prop="warnType">
        <el-select v-model="warningQueryForm.warnType" placeholder="请选择预警规则类型">
          <el-option :label="v.name" :value="v.code" v-for="v in dicts.warningTypeList" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否长期有效:" prop="isLongActive">
        <el-select v-model="warningQueryForm.isLongActive" placeholder="请选择">
          <el-option :label="v.name" :value="v.code" v-for="v in dicts.IsEffectiveData" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleEdit('add')">新增</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
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
        <el-table-column prop="name" label="预警规则名称"></el-table-column>
        <el-table-column prop="warningTypeName" label="预警类型"></el-table-column>
        <el-table-column prop="isLongActiveName" label="是否长期有效"></el-table-column>
        <el-table-column prop="startDate" label="规则有效期始"></el-table-column>
        <el-table-column prop="endDate" label="规则有效期止"></el-table-column>
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
    <el-dialog @close='closeDialog()' :visible.sync="showDialog" :title="title" width="65%">
      <el-form :model="formInline" ref="form" :rules="rules" label-width="140px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="预警规则名称：" prop="name">
              <el-input v-model="formInline.name" placeholder="请输入预警规则名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警规则类型：" prop="warningType">
              <el-select v-model="formInline.warningType" placeholder="请选择预警规则类型" @change="warningTypeChange">
                <el-option :label="v.name" :value="v.code" v-for="v in dicts.warningTypeList" :key="v.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否长期有效：" prop="isLongActive">
              <el-select v-model="formInline.isLongActive" placeholder="请选择" @change="isEffectiveChange">
                <el-option :label="v.name" :value="v.code" v-for="v in dicts.IsEffectiveData" :key="v.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预警执行频率：" prop="rate">
              <el-select v-model="formInline.rate" placeholder="请选择">
                <el-option :label="v.name" :value="v.code" v-for="v in dicts.warningRateList" :key="v.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <div v-if="formInline.isLongActive === '2'">
            <el-col :span="12">
              <el-form-item label="预警有效期开始：" prop="startDate">
                <el-date-picker type="date" placeholder="预警有效期始"
                                v-model="formInline.startDate"
                                style="width: 100%"
                                value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预警有效期截止：" prop="endDate">
                <el-date-picker type="date" placeholder="预警有效期止"
                                v-model="formInline.endDate"
                                style="width: 100%"
                                value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </el-form>
      <div style="width: 70%" v-if="targetTableData.length">
        <el-table :data="targetTableData" border stripe>
          <el-table-column prop="name" label="指标名称"></el-table-column>
          <el-table-column prop="bjtj" label="比较条件"></el-table-column>
          <el-table-column label="阈值">
            <template slot-scope="scope">
              <el-input-number v-model="warningRuleIndex[Number(scope.row.code) - 1].indexThreshold" controls-position="right"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click='closeDialog("edit")'>取消</el-button>
        <el-button type="primary" class="title" @click="submitForm('form')">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看详情信息" :visible.sync="isShowDetail" width="60%">
      <div style="min-height: 200px">
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">预警规则名称:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">{{warningRuleDetail.name || '无'}}</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">预警规则类型:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">{{warningRuleDetail.warningTypeName || '无'}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">是否长期有效:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">{{warningRuleDetail.isLongActiveName || '无'}}</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">预警执行频率:</div>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6">
            <div class="info-content">{{warningRuleDetail.rateName || '无'}}</div>
          </el-col>
        </el-row>
        <div v-if="warningRuleDetail.isLongActive === '2'">
          <el-row :gutter="10">
            <el-col :xs="6" :sm="6" :md="6" :lg="6">
              <div class="info-content">预警有效期开始:</div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6">
              <div class="info-content">{{warningRuleDetail.startDate || '无'}}</div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6">
              <div class="info-content">预警有效期截止:</div>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="6">
              <div class="info-content">{{warningRuleDetail.endDate || '无'}}</div>
            </el-col>
          </el-row>
        </div>
        <div style="width: 70%" v-if="detailTargetTableData.length">
          <el-table :data="detailTargetTableData" border stripe>
            <el-table-column prop="name" label="指标名称"></el-table-column>
            <el-table-column prop="bjtj" label="比较条件"></el-table-column>
            <el-table-column label="阈值" prop="yuzhi">
            </el-table-column>
          </el-table>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {validEmptySpace} from '@/utility/limitFrom';
export default {
  data () {
    return {
      // 查询表单模型对象
      warningQueryForm: {
        name: '',
        warnType: '',
        isLongActive: ''
      },
      // 字典表内容
      dicts: {
        // 预警类型
        warningTypeList: [],
        // 是否有效
        IsEffectiveData: [],
        // 执行频率
        warningRateList: []
      },
      loading: false,
      // 表格数据
      tableData: [],
      // 指标名称表格数据
      targetTableData: [],
      // 查看详情的表格数据
      detailTargetTableData: [],
      // 维护指标名称表格中的阈值数据
      warningRuleIndex: [],
      // 分页参数
      pagePram: {
        page: 1,
        pageSize: 10,
      },
      dataTotal: 0,
      // 是否显示编辑、新增弹框
      showDialog: false,
      title: '添加',
      // 创建或修改预警规则的表单模型
      formInline: {
        name: '',
        warningType: '',
        isLongActive: '',
        startDate: '',
        endDate: '',
        rate: '',
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: '请输入执法对象名称', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        warningType: [
          { required: true, message: '请选择预警规则类型', trigger: 'change' }
        ],
        isLongActive: [
          { required: true, message: '请选择是否长期有效', trigger: 'change' }
        ],
        rate: [
          { required: true, message: '请选择预警执行频率', trigger: 'change' }
        ],
        startDate: [
          { required: true, message: '请选择预警有效期开始时间', trigger: 'change' },
        ],
        endDate: [
          { required: true, message: '请选择预警有效期截止时间', trigger: 'change' },
        ]
      },
      // 预警规则id
      warnRuleId: '',
      // 是否展示详情
      isShowDetail: false,
      // 预警规则详情数据
      warningRuleDetail: {},
    }
  },
  created () {
    // 获取预警规则列表
    this.getList();
    // 获取预警类型类型集合
    this.getWarningTypeData(9, 'warningTypeList');
    // 获取是否有效
    this.getWarningTypeData(1, 'IsEffectiveData');
    // 获取预警执行频率下拉框
    this.getWarningTypeData(12, 'warningRateList');
  },
  methods: {
    // 重置条件
    onReset () {
      this.warningQueryForm = {
        name: '',
        warnType: '',
        isLongActive: ''
      };
    },
    // 分页获取表格数据
    getList () {
      this.loading = true;
      let queryPram = {
        name: this.warningQueryForm.name,
        warnType: this.warningQueryForm.warnType,
        isLongActive: this.warningQueryForm.isLongActive,
        pageIndex: this.pagePram.page,
        pageSize: this.pagePram.pageSize
      };
      this.$ajax(url.queryWarningList, queryPram).then(res => {
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
    // 选择是否长期有效下拉框触发
    isEffectiveChange () {
      this.formInline.startDate = '';
      this.formInline.endDate = '';
    },
    // 选择预警类型下拉框触发
    warningTypeChange () {
      this.$ajax(url.getTargetByWarnType, {warnType: this.formInline.warningType}).then(res => {
        this.targetTableData = res.data ? res.data : [];
        // this.targetTableData只有code和name字段，这里需要维护一个{indexCode,indexThreshold}对象，indexThreshold是阈值
        this.warningRuleIndex = this.targetTableData.map((item) => {
          return {indexCode: item.code, indexThreshold: 0, indexName: item.name}
        })
      });
    },
    // 打开编辑/新增弹框触发
    handleEdit (ev) {
      if (ev === 'add') {
        // 添加执法对象
        this.title = '添加';
        this.warnRuleId = '';
        this.targetTableData = [];
        this.formInline = {
          name: '',
          warningType: '',
          isLongActive: '',
          startDate: '',
          endDate: '',
          rate: '',
        };
      } else {
        // 编辑执法对象
        this.title = '编辑';
        this.warnRuleId = ev.id;
        this.$ajax(url.getWarningDetail, {id: ev.id}).then(res => {
          if (res.success) {
            this.formInline = {
              name: res.data.name,
              warningType: res.data.warningType,
              isLongActive: res.data.isLongActive,
              startDate: res.data.startDate || '',
              endDate: res.data.endDate || '',
              rate: res.data.rate,
            };
            // 拿到该预警相应指标的阈值
            let warningRuleIndex = JSON.parse(res.data.warningRuleIndex);
            this.$ajax(url.getTargetByWarnType, {warnType: this.formInline.warningType}).then(res => {
              this.targetTableData = res.data ? res.data : [];
              this.warningRuleIndex = this.targetTableData.map((item) => {
                return {indexCode: item.code, indexThreshold: 0, indexName: item.name}
              })
              // 将拿到的阈值赋值给this.warningRuleIndex，来回显阈值
              warningRuleIndex.forEach((item) => {
                this.warningRuleIndex.forEach((data) => {
                  if (item.indexCode === data.indexCode) {
                    data.indexThreshold = item.indexThreshold;
                    data.id = item.id;
                  }
                });
              });
            });
          }
        });
      }
      this.showDialog = true;
    },
    // 删除执法对象
    handleDelete (index, row) {
      this.$confirm(`确定要删除吗?`, '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax(url.delWarningRecord, {id: row.id}).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功！'
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
    // 查看详情
    handleView (ev) {
      this.isShowDetail = true;
      this.$ajax(url.getWarningDetail, {id: ev.id}).then(res => {
        if (res.success) {
          this.warningRuleDetail = res.data;
          this.$ajax(url.getTargetByWarnType, {warnType: this.warningRuleDetail.warningType}).then(res => {
            this.detailTargetTableData = res.data ? res.data : [];
            // 双层for循环，将拿到详情数据的阈值根据code，赋值给详情表格数据detailTargetTableData
            this.detailTargetTableData.forEach((item) => {
              JSON.parse(this.warningRuleDetail.warningRuleIndex).forEach((data) => {
                if (item.code === data.indexCode) {
                  item.yuzhi = data.indexThreshold;
                }
              })
            })
          });
        }
      });
    },
    // 获取字典树
    getWarningTypeData (type, arr) {
      this.$ajax(url.getDictOption, {
        type: type
      }).then(res => {
        this.dicts[arr] = res;
      })
    },
    closeDialog () {
      this.showDialog = false;
      if (this.$refs['form']) {
        this.$refs['form'].resetFields();
      }
    },
    // 保存表单方法
    submitForm (editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          let queryPram;
          queryPram = {
            id: this.warnRuleId || '',
            name: this.formInline.name,
            warningType: this.formInline.warningType,
            isLongActive: this.formInline.isLongActive,
            startDate: this.formInline.startDate,
            endDate: this.formInline.endDate,
            rate: this.formInline.rate,
            warningRuleIndex: JSON.stringify(this.warningRuleIndex)
          };
          if (!this.warnRuleId) {
            // 调用新增接口
            this.$ajax(url.saveWarningData, queryPram).then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '新增成功！'
                })
                this.showDialog = false;
                this.getList();
              }
            });
          } else {
            // 调用修改接口
            this.$ajax(url.updateWarningData, queryPram).then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.showDialog = false;
                this.getList();
              }
            });
          }
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
