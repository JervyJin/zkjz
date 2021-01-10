<template>
  <div>
    <el-form :rules="rules" ref="form" :model="form" label-width="130px" label-position="left">
      <div class="title">勘察笔录基本信息:</div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="检查时间:" prop="checkTime">
            <div class="val" v-if="isYb">{{form.checkTime.join(' ~ ')}}</div>
            <el-date-picker v-else type="datetimerange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" v-model="form.checkTime" style="width: 100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="检查地点:" prop="checkAddress">
            <div class="val" v-if="isYb">{{form.checkAddress}}</div>
            <el-input v-else v-model="form.checkAddress" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="被检查单位名称:" prop="checkedCompanyname">
            <div class="val" v-if="isYb">{{form.checkedCompanyname}}</div>
            <el-input v-else v-model="form.checkedCompanyname" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="法定代表人:" prop="legalPerson">
            <div class="val" v-if="isYb">{{form.legalPerson}}</div>
            <el-input v-else v-model="form.legalPerson" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="被检查人姓名:" prop="checkedPersonName">
            <div class="val" v-if="isYb">{{form.checkedPersonName}}</div>
            <el-input v-else v-model="form.checkedPersonName" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="性别:" prop="gender">
            <!-- <div class="val" v-if="isYb">{{form.gender}}</div> -->
            <el-select v-model="form.gender" placeholder="请选择" :disabled="isYb" >
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="职业:" prop="job">
            <div class="val" v-if="isYb">{{form.job}}</div>
            <el-input v-else v-model="form.job" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="身份证号:" prop="checkedIdcard">
            <div class="val" v-if="isYb">{{form.checkedIdcard}}</div>
            <el-input v-else v-model="form.checkedIdcard" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="工作单位:" prop="companyForChecked">
            <div class="val" v-if="isYb">{{form.companyForChecked}}</div>
            <el-input v-else v-model="form.companyForChecked" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="电话:" prop="phoneForChecked">
            <div class="val" v-if="isYb">{{form.phoneForChecked}}</div>
            <el-input v-else v-model="form.phoneForChecked" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="地址:" prop="addressForChecked">
            <div class="val" v-if="isYb">{{form.addressForChecked}}</div>
            <el-input v-else v-model="form.addressForChecked" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="邮编:" prop="zipCode">
            <div class="val" v-if="isYb">{{form.zipCode}}</div>
            <el-input v-else v-model="form.zipCode" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="检查人:" prop="checkerName">
            <div class="val" v-if="isYb">{{form.checkerName}}</div>
            <el-input v-else v-model="form.checkerName" placeholder="请输入" @focus="showuserModel(1)" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法证号:" prop="legalNum">
            <div class="val" v-if="isYb">{{form.legalNum}}</div>
            <el-input v-else v-model="form.legalNum" placeholder="请输入" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="检查人:" prop="checkerTwoName">
            <div class="val" v-if="isYb">{{form.checkerTwoName}}</div>
            <el-input v-else v-model="form.checkerTwoName" placeholder="请输入" @focus="showuserModel(2)" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法证号:" prop="legalNumTwo">
            <div class="val" v-if="isYb">{{form.legalNumTwo}}</div>
            <el-input v-else v-model="form.legalNumTwo" placeholder="请输入" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="记录人:" prop="recorder">
            <div class="val" v-if="isYb">{{form.recorder}}</div>
            <el-input v-else v-model="form.recorder" placeholder="请输入" @focus="showuserModel(3)" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法证号:" prop="recorderLegalNum">
            <div class="val" v-if="isYb">{{form.recorderLegalNum}}</div>
            <el-input v-else v-model="form.recorderLegalNum" placeholder="请输入" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="见证人:" prop="witness">
            <div class="val" v-if="isYb">{{form.witness}}</div>
            <el-input v-else v-model="form.witness" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="身份证号:" prop="witnessIdcard">
            <div class="val" v-if="isYb">{{form.witnessIdcard}}</div>
            <el-input v-else v-model="form.witnessIdcard" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="勘察内容:" prop="checkComment">
            <div class="val" v-if="isYb">{{form.checkComment}}</div>
            <el-input v-else type="textarea" v-model="form.checkComment" placeholder="请输入" :rows="4" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin:48px 0 40px" v-if="!isYb">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="save" >保存</el-button>
            <el-button @click="reset">重置</el-button>
            <!--<el-button v-print="printObj">打印</el-button>-->
            <el-button @click="handlePrint">打印</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin:48px 0 40px" v-if="isYb">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="handlePrint">打印</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-dialog :width="'50%'" title="选择人员" :visible.sync="showUsers" @click='showUsers=false;'>
      <div class="flexbox">
        <!--<div class="left">
          &lt;!&ndash; show-checkbox  &ndash;&gt;
          <el-tree ref="tree" :data="dicts.orgs" :props="dicts.defaultMenusProps" :default-checked-keys="dicts.checkmenu" node-key="id" @node-click="handleNodeClick"></el-tree>
        </div>-->
        <div class="right">
          <!--列表-->
        <el-table :data="dicts.userData" ref="userSingleTable4" highlight-current-row v-loading="dicts.loading" border element-loading-text="拼命加载中" style="width: 100%;" @current-change="selectUser">
          <el-table-column align="center" type="index" width="50" label="序号">
          </el-table-column>
          <el-table-column align="center" sortable prop="username" label="用户名" min-width="150">
          </el-table-column>
          <el-table-column align="center" sortable prop="name" label="姓名" min-width="150">
          </el-table-column>
          <!--<el-table-column align="center" sortable prop="orgId" label="部门" width="120">
          </el-table-column>
          <el-table-column align="center" sortable prop="workTelphone" label="手机号" width="120">
          </el-table-column>
          <el-table-column align="center" sortable prop="gender" label="性别" min-width="50">
          </el-table-column>
          <el-table-column align="center" sortable prop="email" label="邮件" min-width="120">
          </el-table-column>-->
        </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUsers = false">取 消</el-button>
        <el-button type="primary" @click="handleUsersEnsure">确 定</el-button>
      </span>
    </el-dialog>
    <div hidden="true">
      <div id="printContent" ref="print">
        <div class="printContent">
          <div class="title">
            郑州市生态环境局现场检查（勘察）笔录
          </div>
          <div class="print-item">
            <span>检查（勘验）时间：</span>
            <input style="" :value="form.checkTime.length ? new Date(form.checkTime[0]).getFullYear() : ''"/>
            <span>年</span>
            <input  style="" :value="form.checkTime.length ? new Date(form.checkTime[0]).getMonth() + 1 : ''"/>
            <span>月</span>
            <input style="" :value="form.checkTime.length ? new Date(form.checkTime[0]).getDate() : ''"/>
            <span>日</span>
            <input style="" :value="form.checkTime.length ? new Date(form.checkTime[0]).getHours() : ''"/>
            <span>时</span>
            <input style="" :value="form.checkTime.length ? new Date(form.checkTime[0]).getMinutes() : ''"/>
            <span>分至</span>
            <input style="" :value="form.checkTime.length ? new Date(form.checkTime[1]).getDate() : ''"/>
            <span>日</span>
            <input style="" :value="form.checkTime.length ? new Date(form.checkTime[1]).getHours() : ''"/>
            <span>时</span>
            <input style="" :value="form.checkTime.length ? new Date(form.checkTime[1]).getMinutes() : ''"/>
            <span>分</span>
          </div>
          <div class="print-item">
            <span>检查（勘验）地点：</span>
            <input style="flex: 1" :value="form.checkAddress"/>
          </div>
          <div class="print-item">
            <span>被检查（勘验）单位名称：</span>
            <input style="flex: 3" :value="form.checkedCompanyname"/>
            <span>法定代表人（负责人）：</span>
            <input style="" :value="form.legalPerson"/>
          </div>
          <div class="print-item">
            <span>被检查（勘验）人姓名：</span>
            <input style="flex: 2" :value="form.checkedPersonName"/>
            <span>性别：</span>
            <input style="" :value="form.gender === '1' ? '男' : '女'"/>
            <span>职业：</span>
            <input style="flex: 2" :value="form.job"/>
          </div>
          <div class="print-item">
            <span>身份证号码：</span>
            <input style="" :value="form.checkedIdcard"/>
            <span>工作单位：</span>
            <input style="" :value="form.companyForChecked"/>
          </div>
          <div class="print-item">
            <span>电话：</span>
            <input style="" :value="form.phoneForChecked"/>
            <span>住址：</span>
            <input style="flex: 2" :value="form.addressForChecked"/>
          </div>
          <div class="print-item">
            <span>邮编：</span>
            <input style="" :value="form.zipCode"/>
          </div>
          <div class="print-item">
            <span>检查（勘验）人姓名：</span>
            <input style="" :value="form.checkerName"/>
            <span>执法证件号：</span>
            <input style="flex: 2" :value="form.legalNum"/>
          </div>
          <div class="print-item">
            <span>检查（勘验）人姓名：</span>
            <input style="" :value="form.checkerTwoName"/>
            <span>执法证件号：</span>
            <input style="flex: 2" :value="form.legalNumTwo"/>
          </div>
          <div class="print-item">
            <span>记录人姓名：</span>
            <input style="" :value="form.recorder"/>
            <span>执法证件号：</span>
            <input style="flex: 2" :value="form.recorderLegalNum"/>
          </div>
          <div class="print-item">
            <span>检查（勘验）记录：我们是</span>
            <input style=""/>
            <span>的执</span>
          </div>
          <div class="print-item">
            <span>
              法人员，这是我们的执法证件，请确认（出示证件）。今天我们依法进行检查，你必须如实回答问题和提供材料。如果认为我们依法进行检查，你必须如实回答问题和提供材料。如果认为我们与本案有利害关系，可能影响公正办案，可以申请我们回避，并说明理由。（暗查等无法告知的除外）
            </span>
          </div>
          <div v-if="!form.checkComment">
            <div class="print-item">
              <input style="line-height: 40px;text-align: left" />
            </div>
            <div class="print-item">
              <input style="line-height: 40px;text-align: left" />
            </div>
            <div class="print-item">
              <input style="line-height: 40px;text-align: left;" />
            </div>
            <div class="print-item">
              <input style="line-height: 40px;text-align: left;" />
            </div>
          </div>
          <div class="print-item" style="display: inline" v-if="form.checkComment">
            <span style="" class="words">
              {{form.checkComment}}
            </span>
          </div>
          <div class="print-item">
            <span>被检查（勘验）人：</span>
            <input style="flex: 3"/>&nbsp;&nbsp;&nbsp;
            <input style=""/>
            <span>年</span>
            <input style=""/>
            <span>月</span>
            <input style=""/>
            <span>日</span>
          </div>
          <div class="print-item">
            <span>检查（勘验）人：</span>
            <input style="flex: 3"/>&nbsp;&nbsp;&nbsp;
            <input style=""/>
            <span>年</span>
            <input style=""/>
            <span>月</span>
            <input style=""/>
            <span>日</span>
          </div>
          <div class="print-item">
            <span>见证人：</span>
            <input style="flex: 3"/>&nbsp;&nbsp;&nbsp;
            <input style=""/>
            <span>年</span>
            <input style=""/>
            <span>月</span>
            <input style=""/>
            <span>日</span>
          </div>
          <div class="print-item">
            <span>记录人：</span>
            <input style="flex: 3"/>&nbsp;&nbsp;&nbsp;
            <input style=""/>
            <span>年</span>
            <input style=""/>
            <span>月</span>
            <input style=""/>
            <span>日</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
import {validEmptySpace, validYouBian, validPhone, validIdCard} from '@/utility/limitFrom';
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
        checkTime: [],
        checkStarTime: '',
        checkEndTime: '',
        checkAddress: '',
        checkedCompanyname: this.selectRow.legalObjName || '',
        legalPerson: this.selectRow.legalPerson || '',
        checkedPersonName: '',
        checkedIdcard: '',
        addressForChecked: this.selectRow.address || '',
        phoneForChecked: '',
        gender: '',
        job: '',
        zipCode: this.selectRow.zipCode || '',
        companyForChecked: '',
        checkerId: '',
        checkerName: '',
        legalNum: '',
        checkerTwoId: '',
        checkerTwoName: '',
        legalNumTwo: '',
        recorderId: '',
        recorder: '',
        recorderLegalNum: '',
        witness: '',
        witnessIdcard: '',
        checkComment: '',
        taskId: 1
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
      showUsers: false,
      selectInput: 0,
      selectedUser: null,
      rules: {
        checkTime: [{ required: true, message: '检查时间不存在', trigger: 'change'}],
        checkAddress: [
          { required: true, message: '检查地点不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '检查地点(最多100字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        checkedCompanyname: [
          { required: true, message: '被检查单位名称不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '被检查单位名称(最多100字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        legalPerson: [
          { required: true, message: '法定代表人不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '法定代表人(最多100字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        checkedPersonName: [
          { required: true, message: '被检查人姓名不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '被检查人姓名(最多100字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        checkedIdcard: [
          { required: true, message: '身份证号不存在', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' },
          { validator: validIdCard, trigger: 'change' }
        ],
        addressForChecked: [{ required: true, message: '地址不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '被检查人地址(最多100位)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        phoneForChecked: [{ required: true, message: '电话不存在', trigger: 'change'},
          { validator: validPhone, trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        gender: [{ required: true, message: '性别不存在', trigger: 'change'}],
        job: [{ required: true, message: '职业不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '被检查人职业(最多100位)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        zipCode: [
          { required: true, message: '邮政编码不存在', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' },
          { validator: validYouBian, trigger: 'change' }
        ],
        companyForChecked: [{ required: true, message: '工作单位不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '被检查人工作单位(最多100位)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        checkerName: [{ required: true, message: '检查人不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '检查人(最多100位)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        legalNum: [{ required: true, message: '检查人执法证号存在', trigger: 'change'},
          { type: 'string', max: 12, message: '检查人执法证号(最多12位)', trigger: 'change'},
        ],
        checkerTwoName: [{ required: true, message: '检查人不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '检查人(最多100位)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        legalNumTwo: [{ required: true, message: '检查人执法证号不存在', trigger: 'change'},
          { type: 'string', max: 12, message: '检查人执法证号(最多12位)', trigger: 'change'},
        ],
        recorder: [{ required: true, message: '记录人不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '检查人(最多100位)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        recorderLegalNum: [{ required: true, message: '记录人执法证号不存在', trigger: 'change'},
          { type: 'string', max: 12, message: '检查人执法证号(最多12位)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        /*witness: [{ required: true, message: '见证人不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '见证人(最多100位)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        witnessIdcard: [{ required: true, message: '见证人身份证号不存在', trigger: 'change'},
          { type: 'string', max: 18, message: '见证人身份证号(最多18位)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],*/
        witnessIdcard: [
          { validator: validIdCard, trigger: 'change' }
        ],
        checkComment: [{ required: true, message: '勘察内容不存在', trigger: 'change'},
          { type: 'string', max: 2000, message: '勘察内容(最多2000字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
      },
      printObj: {
        id: 'printContent',
        popTitle: 'good print',
      }
    }
  },
  created() {
    this.form.taskId = this.selectRow.id;
    this.getUserData();
    // if(this.isYb) { // 已办回显
      this.getPreInfo();
    // }
  },
  methods: {
     // 已办回显
    getPreInfo() {
      this.$ajax(url.getSurveyRecordInfo, {taskId: this.selectRow.id}).then(res => {
        if(res.success) {
          let data = res.data;
          if(!data.checkStarTime) return;
          data.checkTime = [data.checkStarTime, data.checkEndTime]
          this.form = data;
          this.form.id = data.id;
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
    selectUser(row) {
      this.selectedUser = row;
    },
    handleUsersEnsure() {
      if(!this.selectedUser) {
        return;
      }
      if(this.selectInput == 1) {
        this.form.checkerId = this.selectedUser.id;
        this.form.checkerName = this.selectedUser.name;
        this.getEnforcenum(this.form.checkerId, 'legalNum')
      }
      if(this.selectInput == 2) {
        this.form.checkerTwoId = this.selectedUser.id;
        this.form.checkerTwoName = this.selectedUser.name;
        this.getEnforcenum(this.form.checkerTwoId, 'legalNumTwo')
      }
      if(this.selectInput == 3) {
        this.form.recorderId = this.selectedUser.id;
        this.form.recorder = this.selectedUser.name;
        this.getEnforcenum(this.form.recorderId, 'recorderLegalNum')
      }
      this.selectedUser = null;
      this.$refs.userSingleTable4.setCurrentRow();
      this.showUsers = false;
    },
    reset() {
      this.$refs.form.resetFields();
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.checkStarTime = formatDateToStr(this.form.checkTime[0]);
          this.form.checkEndTime = formatDateToStr(this.form.checkTime[1]);
          this.$ajax(url.saveSurveyRecord, this.form).then(res => {
            if(res.success) {
              this.form.id = res.data;
              this.$message({
                type: 'success',
                message: res.message
              })
              this.$emit('saveTab', 'fourth');
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
    handlePrint () {
      this.$print(this.$refs.print);
    }
  }
}
</script>

<style lang="less" scoped>
  .printContent {
    width: 100%;
    padding: 0 30px;
    font-size: 20px;
    line-height: 40px;
    .print-item {
      /*width: 80%;*/
      /*text-align: center;*/
      display: flex;
      input {
        border-bottom: 1px solid #000;
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        font-size: 20px;
        flex: 1;
        width: 30px;
        text-align: center;
      }
    }
    .title {
      color:#333333;
      font-weight: 700;
      font-size: 30px;
      line-height: 60px;
      text-align: center
    }

  }
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
  .words {
    display: inline;
    border-bottom: 1px solid #000;
  }
</style>
