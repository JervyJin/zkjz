<template>
  <div class="page">
    <el-form ref="form" :rules="rules" :model="form" label-width="110px" label-position="left">
      <div class="title">现场检查信息:</div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="检查单位:" prop="orgName">
            <div class="val" v-if="isYb">{{form.orgName}}</div>
            <el-input v-else v-model="form.orgName" placeholder="请输入" @focus="showOrg=true;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法人:" prop="legalUserName">
            <div class="val" v-if="isYb">{{form.legalUserName}}</div>
            <el-input v-else v-model="form.legalUserName" placeholder="请输入" @focus="showuserModel(1)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法证号:" prop="legalNumber">
            <div class="val" v-if="isYb">{{form.legalNumber}}</div>
            <el-input v-else v-model="form.legalNumber" placeholder="请输入" disabled></el-input>          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="记录人:" prop="recordUserName">
            <div class="val" v-if="isYb">{{form.recordUserName}}</div>
            <el-input v-else v-model="form.recordUserName" placeholder="请输入" @focus="showuserModel(2)"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法证号:" prop="recordNumber">
            <div class="val" v-if="isYb">{{form.recordNumber}}</div>
            <el-input v-else v-model="form.recordNumber" placeholder="请输入" disabled></el-input>
		</el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="检查开始时间:" prop="checkStarTime">
            <div class="val" v-if="isYb">{{form.checkStarTime}}</div>
            <el-date-picker v-else v-model.trim="form.checkStarTime" type="date" placeholder="开始时间"
              :picker-options="pickerOptions" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="检查结束时间:" prop="checkEndTime">
            <div class="val" v-if="isYb">{{form.checkEndTime}}</div>
            <el-date-picker v-else v-model.trim="form.checkEndTime" type="date" placeholder="结束时间"
              :picker-options="pickerOptions" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="案由:" prop="caseCause">
            <div class="val" v-if="isYb">{{form.caseCause}}</div>
            <el-input v-else type="textarea" v-model.trim="form.caseCause" placeholder="请输入" :rows="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="案件来源:" prop="caseSource">
            &lt;!&ndash; <div class="val" v-if="isYb">{{form.caseSource}}</div> &ndash;&gt;
            <el-select v-model="form.caseSource" :disabled="isYb">
              &lt;!&ndash;<el-option label="案件来源" value="1"></el-option>&ndash;&gt;
              <el-option :label="v.name" :value="v.code" v-for="v in caseSourceList" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="案件简要情况:" prop="checkConclusion">
            <div class="val" v-if="isYb">{{form.checkConclusion}}</div>
            <el-input v-else type="textarea" v-model.trim="form.checkConclusion" placeholder="请输入" :rows="4"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <!--<el-form-item label="检查结果:" prop="checkResult">
            &lt;!&ndash; <div class="val" v-if="isYb">{{form.checkResult}}</div> &ndash;&gt;
            <el-select v-model="form.checkResult" :disabled="isYb">
              <el-option label="未发现问题终止检查并向监管对象告知检查结果" value="1"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="检查结果:" prop="checkResult">
            <!-- <div class="val" v-if="isYb">{{form.caseSource}}</div> -->
            <el-select v-model="form.checkResult" :disabled="isYb">
              <!--<el-option label="案件来源" value="1"></el-option>-->
              <el-option :label="v.name" :value="v.code" v-for="v in resultSourceList" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="是否发现涉嫌环境违法行为:" prop="issuspected" label-width="200px">
            <!-- <div class="val" v-if="isYb">{{form.checkResult}}</div> -->
            <el-radio-group v-model="form.issuspected" :disabled="isYb" @change="changeResult">
              <el-radio :label="'1'">是</el-radio>
              <el-radio :label="'0'">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin:48px 0 40px"  :gutter="20" v-if="!isYb">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item>
            <el-button type="success" @click="save('1')" v-if="form.issuspected=='0'">提交</el-button>
            <el-button type="primary" @click="save('0')" v-else>保存</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog :width="'40%'" title="选择机构" :visible.sync="showOrg" @click='showOrg=false;'>
      <!-- show-checkbox  -->
      <el-tree ref="tree" :data="dicts.orgs" :props="dicts.defaultMenusProps" :default-checked-keys="dicts.checkmenu" node-key="id" @node-click="handleNodeClick"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showOrg = false">取 消</el-button>
        <el-button type="primary" @click="handleUsersEnsure(1)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :width="'50%'" title="选择人员" :visible.sync="showUsers" @click='showUsers=false;'>
      <div class="flexbox">
        <!--<div class="left">
          &lt;!&ndash; show-checkbox  &ndash;&gt;
          <el-tree ref="tree" :data="dicts.orgs" :props="dicts.defaultMenusProps" :default-checked-keys="dicts.checkmenu" node-key="id" @node-click="handleNodeClick"></el-tree>
        </div>-->
        <div class="right">
          <!--列表-->
        <el-table :data="dicts.userData" ref="userSingleTable" highlight-current-row v-loading="dicts.loading" border element-loading-text="拼命加载中" style="width: 100%;" @current-change="selectUser">
          <el-table-column align="center" type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column align="center" min-width="150" sortable prop="username" label="用户名" >
          </el-table-column>
          <el-table-column align="center" min-width="150" sortable prop="name" label="姓名">
          </el-table-column>
          <!--<el-table-column align="center" sortable prop="orgId" label="部门" width="120">
          </el-table-column>
          <el-table-column align="center" sortable prop="workTelphone" label="手机号" width="120">
          </el-table-column>
          <el-table-column align="center" sortable prop="gender" label="性别" min-width="50">
          </el-table-column>-->
          <!--<el-table-column align="center" sortable prop="email" label="邮件" min-width="120">
          </el-table-column>-->
        </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUsers = false">取 消</el-button>
        <el-button type="primary" @click="handleUsersEnsure(2)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
export default {
  props: ['selectRow'],
  computed: {
    isYb() {
      return (this.$route.path.indexOf('ybrw') > -1) || (this.$route.path.indexOf('rwcx') > -1 && this.selectRow.isHandle === 'Y')
    }
  },
  data() {
    return {
      form: {
        id: '',
        taskId: '',
        orgId: '',
        orgName: '',
        legalUserId: '',
        legalUserName: '',
        legalNumber: '',
        recordUserId: '',
        recordUserName: '',
        recordNumber: '',
        checkStarTime: '',
        checkEndTime: '',
        checkConclusion: '',
        checkResult: '',
        caseCause: '',
        issuspected: '0',
        type: 0
      },
      dicts: {
        loading: false,
        orgs: [],
        defaultMenusProps: {
          children: 'children',
          label: 'name'
        },
        checkmenu: [],
        userData: []
      },
      // 日期选择范围
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 3600 * 1000 * 24;
        },
      },
      showOrg: false,
      showUsers: false,
      selectInput: 0,
      selectedUser: null,
      selectedOrg: null,
      resultSourceList: [],
      rules: {
        orgName: [
          { required: true, message: '检查单位名称不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '检查单位名称(最多100字)', trigger: 'change'}
        ],
        legalUserName: [{ required: true, message: '执法人不存在', trigger: 'change'}],
        legalNumber: [{ required: true, message: '执法证号不存在', trigger: 'change'},
          { type: 'string', max: 12, message: '执法证号(最多12字)', trigger: 'blur'}],
        recordUserName: [{ required: true, message: '记录人不存在', trigger: 'change'}],
        recordNumber: [{ required: true, message: '执法证号不存在', trigger: 'blur'},
          { type: 'string', max: 12, message: '执法证号(最多12字)', trigger: 'change'}],
        checkStarTime: [{ required: true, message: '检查开始时间不存在', trigger: 'change'}],
        checkEndTime: [{ required: true, message: '检查结束时间不存在', trigger: 'change'}],
        checkConclusion: [{ required: true, message: '案件简要情况不存在', trigger: 'blur'},
          { type: 'string', max: 1000, message: '案件简要情况(最多1000字)', trigger: 'blur'}
        ],
        checkResult: [{ required: true, message: '检查结果不存在', trigger: 'change'}],
        caseCause: [{ required: true, message: '案由不存在', trigger: 'change'},
          { type: 'string', max: 1000, message: '案由(最多1000字)', trigger: 'blur'}
        ],
        issuspected: [{ required: true, message: '是否违法不存在', trigger: 'change'}]
      }
    }
  },
  created() {
    this.getCaseSource();
    this.form.taskId = this.selectRow.id;
    this.getUserData();
    // if(this.isYb) { // 已办回显
    this.getPreInfo();
    // }
  },
  methods: {
     // 已办回显
    getPreInfo() {
      this.$ajax(url.getCheckResultInfo, {taskId: this.selectRow.id}).then(res => {
        if(res.success) {
          let data = res.data;
          if(!data.orgName) return;
          if(data.issuspected) {
            this.$store.commit('setIsWF', data.issuspected);
          }
          this.form = data;
          this.form.id = data.id;
          this.$emit('askOrgInfo', {askOrgName: data.orgName, askOrgId: data.orgId});
          if (!this.isYb) {
            this.form.checkStarTime = new Date(this.form.checkStarTime);
            this.form.checkEndTime = new Date(this.form.checkEndTime);
          }
        }
      })
    },
    // 获取执法证号
    getEnforcenum(userId, k) {
      this.$ajax(url.getEnforcenum, {userId}).then(res => {
        if(res.success) {
          this.form[k] = res.data;
        }
      })
    },
    // 获取数据方法
    getUserData() {
      this.$ajax(url.getOrgTree, {}).then(res => {
        this.dicts.orgs = res.data;
      })
      this.$ajax(url.getDispatchUserBytaskId, {taskId: this.selectRow.id}).then(res => {
        this.dicts.userData = res.data.length ? res.data : [];
      })
    },
    handleNodeClick(row) {
      this.selectedOrg = row;
    },
    showuserModel(v) {
      this.selectInput = v;
      this.showUsers = true;
    },
    changeResult(v) {
      // this.$store.commit('setIsWF', v);
    },
    selectUser(row) {
      this.selectedUser = row;
    },
    handleUsersEnsure(v) {
      if(v == 1) {
        if(!this.selectedOrg) {
          return;
        }
        this.form.orgId = this.selectedOrg.id;
        this.form.orgName = this.selectedOrg.name;
        this.showOrg = false;
        this.selectedOrg = null;
        return;
      }
      if(!this.selectedUser) {
        return;
      }
      if(this.selectInput == 1) {
        this.form.legalUserId = this.selectedUser.id;
        this.form.legalUserName = this.selectedUser.name;
        this.getEnforcenum(this.form.legalUserId, 'legalNumber')
      }
      if(this.selectInput == 2) {
        this.form.recordUserId = this.selectedUser.id;
        this.form.recordUserName = this.selectedUser.name;
        this.getEnforcenum(this.form.recordUserId, 'recordNumber')
      }
      this.selectedUser = null;
      this.$refs.userSingleTable.setCurrentRow();
      this.showUsers = false;
    },
    reset() {
      this.$refs.form.resetFields();
    },
    // 获取案件来源
    getCaseSource () {
      this.$ajax(url.getDictOption, {
        type: 14
      }).then(res => {
        this.resultSourceList = res;
      })
    },
    save(v) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.checkStarTime = formatDateToStr(new Date(this.form.checkStarTime));
          this.form.checkEndTime = formatDateToStr(new Date(this.form.checkEndTime));
          this.form.type = v;
          this.$ajax(url.saveCheckResult, this.form).then(res => {
            if(res.success) {
              this.$store.commit('setIsWF', this.form.issuspected);
              this.form.id = res.data;
              this.$emit('askOrgInfo', {askOrgName: this.form.orgName, askOrgId: this.form.orgId});
              this.$message({
                type: 'success',
                message: res.message
              })
              if(v == '1') {
                this.$confirm('是否立即上传调查取证的附件?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'info'
                }).then(() => {
                  this.$emit('saveTab', 'sixth');
                }).catch(() => {
                  this.$router.push('/zfxt/ybrw')
                });
              } else {
                this.$emit('saveTab', 'third');
              }
            } else {
              this.$message({
                type: 'info',
                message: res.message
              })
            }
          })
        } else {
          return false;
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>

  .title{
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 14px;
    color: #333333;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
  }
  .flexbox{
    display: flex;
    height: 100%;
    justify-content: center;
    /*.left {
      width: 250px;
      height: calc(100% - 100px);
    }*/
    .right {
      width: 100%;
    }
  }
</style>
