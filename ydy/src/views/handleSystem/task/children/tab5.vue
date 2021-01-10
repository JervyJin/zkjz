<template>
  <div>
    <el-form :rules="rules" ref="form" :model="form" label-width="110px" label-position="left">
      <div class="title">询问笔录基本信息:</div>
      <el-row :gutter="20">
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="询问时间:" prop="checkTime">
            <div class="val" v-if="isYb">{{form.checkTime.length && form.checkTime.join(' ~ ')}}</div>
            <el-date-picker v-else type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="form.checkTime"
              style="width: 100%"
             >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="询问地点:" prop="askAddress">
            <div class="val" v-if="isYb">{{form.askAddress}}</div>
            <el-input v-else v-model="form.askAddress" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="询问人:" prop="askerName">
            <div class="val" v-if="isYb">{{form.askerName}}</div>
            <el-input v-else v-model="form.askerName" placeholder="请输入" @focus="showuserModel(1)" ></el-input>
          </el-form-item>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法证号:" prop="askLegalNum">
            <div class="val" v-if="isYb">{{form.askLegalNum}}</div>
            <el-input v-else v-model="form.askLegalNum" placeholder="请输入" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="记录人:" prop="recorder">
            <div class="val" v-if="isYb">{{form.recorder}}</div>
            <el-input v-else v-model="form.recorder" placeholder="请输入" @focus="showuserModel(2)" ></el-input>
          </el-form-item>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法证号:" prop="recorderLegalNum">
            <div class="val" v-if="isYb">{{form.recorderLegalNum}}</div>
            <el-input v-else v-model="form.recorderLegalNum" placeholder="请输入" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="被检查人姓名:" prop="checkedPersonName">
            <div class="val" v-if="isYb">{{form.checkedPersonName}}</div>
            <el-input v-else v-model="form.checkedPersonName" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="身份证号:" prop="checkedIdcard">
            <div class="val" v-if="isYb">{{form.checkedIdcard}}</div>
            <el-input v-else v-model="form.checkedIdcard" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="住址:" prop="askedAdress">
            <div class="val" v-if="isYb">{{form.askedAdress}}</div>
            <el-input v-else v-model="form.askedAdress" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="性别:" prop="gender">
            <!-- <div class="val" v-if="isYb">{{form.gender}}</div> -->
            <el-select v-model="form.gender" placeholder="请选择" :disabled="isYb" >
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="民族:" prop="nation">
            <!-- <div class="val" v-if="isYb">{{form.nation}}</div> -->
            <el-select v-model="form.nation" placeholder="请选择" :disabled="isYb" ref="selectNation">
              <el-option :label="v.name" :value="v.code" v-for="v in dicts.nations" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="电话:" prop="askedPhone">
            <div class="val" v-if="isYb">{{form.askedPhone}}</div>
            <el-input v-else v-model="form.askedPhone" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="与本案关系:" prop="askedCaseRelation">
            <div class="val" v-if="isYb">{{form.askedCaseRelation}}</div>
            <el-input v-else v-model="form.askedCaseRelation" placeholder="请输入" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="案件主办人:">
            <div>{{form.sponsorName}}</div>
          </el-form-item>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法证号:">
            <div>{{form.sponsorNum}}</div>
            <!-- <el-input v-model="form.sponsorNum" placeholder="请输入"></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="案件协办人:">
            <div>{{form.cosponsorName}}</div>
          </el-form-item>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法证号:">
            <div>{{form.cosponsorNum}}</div>
            <!-- <el-input v-model="form.cosponsorNum" placeholder="请输入"></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>




      <div class="title">询问内容:
        <!--<span :class="form.recordType==2 ? 'active' : ''" @click="form.recordType=2">问答形式</span>-->
        <!--<span :class="form.recordType==1 ? 'active' : ''" @click="form.recordType=1">总结形式</span>-->
      </div>

      <template v-if="form.recordType==2">
        <div class="info">
          我们是 <span class="box">{{askOrgName}}</span>
          的执法人员： <span class="box">{{form.askerName}}<em v-if="form.askerName && form.recorder">、</em>{{form.recorder}}</span>
          ，这是我们的执法证件，号码是： <span class="box">{{form.askLegalNum}}<em v-if="form.askLegalNum && form.recorder">、</em>{{form.recorderLegalNum}}</span>
          请确认（出示证件）。
        </div>
        <div class="btns" v-if="!isYb">
          <el-button type="text" @click="addAsk(1)">追加固定问题</el-button>
          <el-button type="text" @click="addAsk(2)">追加不固定问题</el-button>
        </div>
        <template v-for="(v,i) in form.askResponseFixList">
          <div class="ask" :key="v.questionId">问：
            {{v.questionName}}

            <!--<div class="btns" v-if="!isYb && i == 0">
              <el-button type="text" @click="addAsk(1)">追加固定问题</el-button>
              <el-button type="text" @click="addAsk(2)">追加不固定问题</el-button>
            </div>-->
            <el-button type="text" class="del" v-if="!isYb && i > 0" @click="delQuestion(i, 1)">删除</el-button>
          </div>
          <div class="ans" :key="v.questionId+i">
            <span>答：</span>
            <el-input v-model="v.response" :rows="4" type="textarea" maxlength="2000" show-word-limit placeholder="请输入内容" :readonly="isYb" ></el-input>
          </div>
        </template>
        <template v-for="(v, i) in form.askResponseNoFixList">
          <div class="ask ask1" :key="i">问：
            <el-input v-model="v.askInfo" type="textarea" maxlength="2000" show-word-limit :rows="4" placeholder="请输入" style="width: 98%;vertical-align:middle;" :readonly="isYb" ></el-input>
            <el-button type="text" class="del" v-if="!isYb" @click="delQuestion(i, 2)">删除</el-button>
          </div>
          <div class="ans" :key="`${i}-${i}`">答：
            <el-input v-model="v.responseInfo" type="textarea" maxlength="2000" show-word-limit :rows="4" placeholder="请输入内容" style="width: 98%;vertical-align:middle;" :readonly="isYb" ></el-input>
          </div>
        </template>
      </template>

      <!--<template v-if="form.recordType==1">
        <el-input type="textarea" v-model="form.recordInfo" maxlength="2000" show-word-limit :rows="4" placeholder="请输入内容" :readonly="isYb" ></el-input>
      </template>-->



      <el-row style="margin:48px 0 40px" v-if="!isYb">
        <el-col :span="24">
          <el-form-item>
            <el-button type="success" @click="save" >提交</el-button>
            <el-button @click="reset">重置</el-button>
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
        <el-table :data="dicts.userData" ref="userSingleTable5" highlight-current-row v-loading="dicts.loading" border element-loading-text="拼命加载中" style="width: 100%;" @current-change="selectUser">
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

     <el-dialog title="选择问题" :visible.sync="questionsVisible" width="40%" @click='questionsVisible=false'>
       <el-table :data="questions.questionsAll" highlight-current-row v-loading="questions.loading" border
        element-loading-text="拼命加载中"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
        >
        <el-table-column align="center" type="selection" width="60">
        </el-table-column>
        <el-table-column prop="question" label="问题名称">
        </el-table-column>
        <!--<el-table-column prop="isDefaultDisplay" label="是否默认展示">
          <template slot-scope="scope">
            {{scope.row.isDefaultDisplay == "Y" ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column prop="isActive" label="是否可用">
          <template slot-scope="scope">
            {{scope.row.isActive == "Y" ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column sortable prop="created" label="建立时间">
        </el-table-column>
        <el-table-column prop="createBy" label="建立人">
        </el-table-column>
        <el-table-column sortable prop="updated" label="上次更新时间">
        </el-table-column>
        <el-table-column prop="updateBy" label="上次更新人">
        </el-table-column>-->
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="questionsVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseQuestions">确 定</el-button>
      </span>
     </el-dialog>
    <div hidden="true">
      <div id="printContent" ref="print">
        <div class="printContent">
          <div class="title">
            郑州市生态环境局调查询问笔录
          </div>
          <div class="print-item">
            <span>询问时间：</span>
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
            <span>询问地点：</span>
            <input style="flex: 1" :value="form.askAddress"/>
          </div>
          <div class="print-item">
            <span>询问人：</span>
            <input style="" :value="form.askerName"/>
            <span>执法证件号：</span>
            <input style="flex: 2" :value="form.askLegalNum"/>
          </div>
          <div class="print-item">
            <span>记录人：</span>
            <input style="" :value="form.recorder"/>
            <span>执法证件号：</span>
            <input style="flex: 2" :value="form.recorderLegalNum"/>
          </div>
          <div class="print-item">
            <span>被询问人：</span>
            <input style="flex: 2" :value="form.checkedPersonName"/>
            <span>性别：</span>
            <input style="" :value="form.gender === '1' ? '男' : '女'"/>
            <span>年龄：</span>
            <input style=""/>
            <span>民族：</span>
            <!--获取当前选中民族的名称-->
            <input style="" :value="$refs.selectNation ? $refs.selectNation.selected.currentLabel : ''"/>
          </div>
          <div class="print-item">
            <span>电话：</span>
            <input style="" :value="form.askedPhone"/>
            <span>身份证号码：</span>
            <input style="flex: 2" :value="form.checkedIdcard"/>
          </div>
          <div class="print-item">
            <span>住址：</span>
            <input style="flex: 1" :value="form.askedAdress"/>
          </div>
          <div class="print-item">
            <span>与本案关系：</span>
            <input style="flex: 1" :value="form.askedCaseRelation"/>
          </div>
          <div class="print-item">
            <span>询问内容：</span>
          </div>
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
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <span>被询问人：</span>
            <input style="flex: 3"/>&nbsp;&nbsp;&nbsp;
            <input style=""/>
            <span>年</span>
            <input style=""/>
            <span>月</span>
            <input style=""/>
            <span>日</span>
          </div>
          <div class="print-item">
            <span>询问人：</span>
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
          <div class="title" style="line-height: 120px">
            郑州市环境保护局现场调查询问笔录（续页）
          </div>
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
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
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
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <input style="line-height: 40px;text-align: left;" />
          </div>
          <div class="print-item">
            <span>被询问人签字：</span>
            <input style="flex: 1" />
          </div>
          <div class="print-item">
            <span>备注：被询问人在询问笔录上逐页签字，在修改处签字或按指纹，在笔录终了处注明对笔录真实性的意见</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
import {validEmptySpace, validPhone, validIdCard} from '@/utility/limitFrom';
export default {
  props: ['selectRow', 'askOrgName', 'askOrgId'],
  computed: {
    isYb() {
      return (this.$route.path.indexOf('ybrw') > -1) || (this.$route.path.indexOf('rwcx') > -1 && this.selectRow.isHandle === 'Y')
    },
    allQuestionList () {
      return this.form.askResponseFixList.concat(this.form.askResponseNoFixList);
    }
  },
  data() {
    return {
      form: {
        id: '',
        taskId: '',
        checkTime: '',
        askTimeStart: '',
        askTimeEnd: '',
        askAddress: '',
        askerId: '',
        askerName: '',
        askLegalNum: '',
        recorderId: '',
        recorder: '',
        recorderLegalNum: '',
        checkedPersonName: '',
        checkedIdcard: '',
        askedAdress: '',
        gender: '',
        nation: '',
        askedPhone: '',
        askedCaseRelation: '',
        askOrgId: '',
        askOrgName: '',
        sponsorId: '',
        sponsorName: '',
        sponsorNum: '',
        cosponsorId: '',
        cosponsorName: '',
        cosponsorNum: '',
        recordType: 2,
        askResponseFixList: [],
        askResponseNoFixList: [],
        recordInfo: ''
      },
      dicts: {
        loading: false,
        orgs: [],
        defaultMenusProps: {
          children: 'children',
          label: 'name'
        },
        checkmenu: [],
        userData: [],
        nations: []
      },
      showUsers: false,
      selectInput: 0,
      selectedUser: null,
      questionsVisible: false,
      questions : {
        loading: false,
        questionsAll: []
      },
      // allQuestionList: [],
      rules: {
        checkTime: [
          { required: true, message: '询问时间不存在', trigger: 'change'}
        ],
        askAddress: [{ required: true, message: '询问地点不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '询问地点(最多100字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        askerName: [{ required: true, message: '询问人不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '法定代表人(最多100字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        askLegalNum: [{ required: true, message: '执法证号不存在', trigger: 'change'},
          { type: 'string', max: 12, message: '执法证号(最多12字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        recorder: [{ required: true, message: '记录人不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '记录人(最多100字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        recorderLegalNum: [{ required: true, message: '执法证号不存在', trigger: 'change'},
          { type: 'string', max: 12, message: '执法证号(最多12字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        checkedPersonName: [{ required: true, message: '被检查人姓名不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '被检查人姓名(最多100字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        checkedIdcard: [{ required: true, message: '身份证号不存在', trigger: 'change'},
          { validator: validIdCard, trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        askedAdress: [{ required: true, message: '住址不存在', trigger: 'change'},
          { type: 'string', max: 100, message: '住址(最多100字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        gender: [
          { required: true, message: '性别不存在', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        nation: [
          { required: true, message: '民族不存在', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        askedPhone: [{ required: true, message: '电话不存在', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' },
          { validator: validPhone, trigger: 'change' }
        ],
        askedCaseRelation: [{ required: true, message: '与本案关系不存在', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        /*askOrgName: [{ required: true, message: '所属机构不存在', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],*/
        sponsorName: [{ required: true, message: '案件主办人不存在', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        // sponsorNum: [{ required: true, message: '案件来源不存在', trigger: 'change'}],
        cosponsorName: [{ required: true, message: '案件协办人不存在', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        // cosponsorNum: [{ required: true, message: '案件来源不存在', trigger: 'change'}],
        recordType: [{ required: true, message: '询问方式不存在', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
        recordInfo: [{ required: true, message: '总结内容不存在', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ]
      }

    }
  },
  created() {
    if(this.selectRow) {
      this.form.taskId = this.selectRow.id;
      this.form.sponsorId = this.selectRow.sponsor;
      this.form.sponsorName = this.selectRow.sponsorName;
      this.form.cosponsorId = this.selectRow.cosponsor;
      this.form.cosponsorName = this.selectRow.cosponsorName;
      this.getEnforcenum(this.form.sponsorId, 'sponsorNum');
      this.getEnforcenum(this.form.cosponsorId, 'cosponsorNum');
    }

    this.getUserData();
    this.getListDisplay();
    this.getDictData(7, 'nations')
    // if(this.isYb) { // 已办回显
      this.getPreInfo();
    // }
  },
  methods: {
    // 回显数据
    getPreInfo() {
      this.$ajax(url.queryAskRecord, {taskId: this.selectRow.id}).then(res => {
        if(res.success) {
          let data = res.data;
          if(!data.askTimeStart) return;
          data.askResponseFixList = data.askResponseFixList && JSON.parse(data.askResponseFixList) || '';
          data.askResponseNoFixList = data.askResponseNoFixList && JSON.parse(data.askResponseNoFixList) || '';
          data.checkTime = [data.askTimeStart, data.askTimeEnd]
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
    // 获取字典树
    getDictData(type, arr) {
      this.$ajax(url.getDictOption, {
        type: type
      }).then(res => {
        this.dicts[arr] = res;
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
    // 获取固定展示问题
    getListDisplay() {
      this.$ajax(url.getListDisplay, {}).then(res => {
        if(res.success) {
          this.form.askResponseFixList = res.data.map(v => {
            return {
              questionName: v.question,
              questionId: v.id,
              response: ""
            }
          })
        }
      })
    },
    // 获取不固定展示问题
    getListNoDisplay() {
      this.questions.loading = true;
      this.$ajax(url.getListNoDisplay, {}).then(res => {
        this.questions.loading = false;
        if(res.success) {
          this.questions.questionsAll = res.data;
        }
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
        this.form.askerId = this.selectedUser.id;
        this.form.askerName = this.selectedUser.name;
        this.getEnforcenum(this.form.askerId, 'askLegalNum');
      }
      if(this.selectInput == 2) {
        this.form.recorderId = this.selectedUser.id;
        this.form.recorder = this.selectedUser.name;
        this.getEnforcenum(this.form.recorderId, 'recorderLegalNum');
      }
      this.selectedUser = null;
      this.$refs.userSingleTable5.setCurrentRow();
      this.showUsers = false;
    },
    addAsk(v) {
      if(v == 1) {
        // this.form.askResponseFixList.push({
        //   questionId: '',
        //   questionName: '11111',
        //   response: ''
        // })
        this.questionsVisible = true;
        this.getListNoDisplay();
      }
      if(v == 2) {
        this.form.askResponseNoFixList.push({
          askInfo: "",
          responseInfo: ""
        })
      }
    },
    delQuestion(i, v) {
      this.$confirm(`确定要删除该问题吗?`, '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(v == 2) {
          this.form.askResponseNoFixList.splice(i, 1);
        }
        if(v == 1) {
          this.form.askResponseFixList.splice(i, 1);
        }
      })
    },
    handleSelectionChange(rows) {
      this.selectQuestions = rows;
    },
    chooseQuestions() {
      if(!this.selectQuestions.length) return;
      this.form.askResponseFixList = this.form.askResponseFixList.concat(this.selectQuestions.map(v => {
        return {
          questionId: v.id,
          questionName: v.question,
          response: ""
        }
      }))
      this.questionsVisible = false;
    },
    reset() {
      this.$refs.form.resetFields();
    },
    handlePrint () {
      this.$print(this.$refs.print);
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.askTimeStart = formatDateToStr(this.form.checkTime[0]);
          this.form.askTimeEnd = formatDateToStr(this.form.checkTime[1]);
          this.form.askOrgName = this.askOrgName;
          this.form.askOrgId = this.askOrgId;
          let form = JSON.parse(JSON.stringify(this.form))

          if(form.recordType == 1) {
            delete form.askResponseFixList;
            delete form.askResponseNoFixList;
          } else {
            delete form.askInfo;
            form.askResponseFixList = JSON.stringify(form.askResponseFixList)
            form.askResponseNoFixList = JSON.stringify(form.askResponseNoFixList)
          }

          delete form.checkTime;
          this.$ajax(url.saveAskRecord, form).then(res => {
            if(res.success) {
              this.form.id = res.data;
              this.$message({
                type: 'success',
                message: res.message
              })
              if (res.code === '601') {
                this.$emit('saveTab', 'third');
              } else {
                this.$confirm('是否立即上传调查取证的附件?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'info'
                }).then(() => {
                  this.$emit('saveTab', 'sixth');
                }).catch(() => {
                  this.$router.push('/zfxt/ybrw');
                });
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
    span {
      cursor: pointer;
      font-weight: 400;
      margin-left: 20px;
      &.active {
        color: #1890FF;
      }
    }
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
      width: 100%
    }
  }
  .box {
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #ddd;
    border-radius: 3px;
    min-width: 100px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
  }

  .info{
    line-height: 20px;
    margin-top: 24px;
  }
  .btns {
    margin-top: 10px;
  }
  .ask{
    line-height: 20px;
    margin: 24px 0 16px;
    padding-right: 6%;
    position: relative;
    &.ask1{
      display: flex;
    }
    /*.btns {
      position: absolute;
      top: 0;
      right: 0;
    }*/
    .del{
      color: red;
      position: absolute;
      right: 0;
      top: 0;
      padding: 0;
    }
  }
  .ans {
    display: flex;
  }
</style>
