<template>
  <div class="page">
    <div class="container">
      <van-tabs v-model="currentStep">
        <van-tab title="基础信息">
          <van-form @submit="toNext">
            <van-cell class="stepName" value="任务信息" />
            <van-field
              v-model="selectRow.taskTypeName"
              label="任务类型:"
              placeholder="请输入"
              input-align="right"
              readonly
            />
            <van-field
              v-model="selectRow.dispatchDate"
              label="派发日期:"
              input-align="right"
              readonly
            />
            <van-field
              v-model="selectRow.taskName"
              label="任务名称："
              placeholder="请输入"
              input-align="right"
              readonly
            />
            <van-field
              v-model="selectRow.taskComment"
              autosize
              type="textarea"
              label="主要内容："
              placeholder="请输入"
              input-align="right"
              readonly
            />
            <van-field
              v-model="selectRow.urgencyName"
              label="紧急程度："
              placeholder="请输入"
              input-align="right"
              readonly
            />
            <van-field
              v-model="selectRow.requireFinishTime"
              label="要求完成时间："
              placeholder="请输入"
              input-align="right"
              readonly
            />

            <!-- <div class="stepName stepName1">执法对象信息</div> -->
            <van-cell class="stepName stepName1" value="执法对象信息" />
            <van-field
              v-model="selectRow.legalobjTypeName"
              label="执法对象类型："
              placeholder="请输入"
              input-align="right"
              readonly
            />
            <van-field
              v-model="selectRow.legalObjName"
              label="执法对象名称："
              placeholder="请输入"
              input-align="right"
              readonly
            />
            <van-field
              v-model.trim="form.address"
              label="地址（住址）:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入地址' }]"
              readonly
              :disabled="isDone"
            />
            <van-field
              v-model.trim="form.zipCode"
              label="邮政编码:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入邮编' }]"
              readonly
              :disabled="isDone"
            />
            <!-- <van-field
              v-model="form.businessNo"
              label="营业执照注册号（公民身份证号）:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入营业执照注册号（公民身份证号）' }]"
              :disabled="isDone"
            />
            <van-field
              v-model="form.organizationCode"
              label="组织机构代码（行业）:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入组织机构代码（行业）' }]"
              :disabled="isDone"
            /> -->
            <van-field
              v-model.trim="form.creditCode"
              label="社会信用代码:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入社会信用代码' }]"
              readonly
              :disabled="isDone"
            />
            <van-field
              v-model.trim="form.legalPerson"
              label="法定代表人:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入法定代表人' }]"
              readonly
              :disabled="isDone"
            />
            <van-field
              v-model.trim="form.duty"
              label="职务:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入职务' }]"
              readonly
              :disabled="isDone"
            />
            <van-field
              v-model.trim="form.phone"
              label="联系电话:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入联系电话' }]"
              readonly
              :disabled="isDone"
            />

            <div class="btns-change" v-if="!isDone">
              <van-button
                class="prev"
                type="default"
                v-if="currentStep == 1"
                @click="toPrev"
                >上一项</van-button
              >
              <!-- <van-button
                class="next"
                type="info"
                native-type="submit"
              >保存</van-button> -->
            </div>
          </van-form>
        </van-tab>

        <van-tab title="现场检查">
          <van-form @submit="toNext">
            <!-- <van-field
              v-model="form.orgName"
              label="检查单位:"
              placeholder="请输入"
              input-align="right"
              readonly
              required
              @click="clickHandle('org')"
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            /> -->
            <!-- <van-action-sheet v-model="showOrgs">
              <TreeSelect
                :items="options"
                :active-id.sync="activeId"
                :main-active-index.sync="activeIndex"
                @click-item="onSelect"
              />
            </van-action-sheet> -->
            <van-field
              label="检查单位:"
              placeholder="请选择"
              input-align="right"
              readonly
              required
              @click="clickHandle('org')"
              :disabled="isDone"
            >
              <template #input>
                <treeselect
                  v-model="form.orgName"
                  :options="dicts.orgs"
                  :normalizer="normalizer"
                  
                  placeholder="选择组织"
                  :disabled="isDone"
                />
              </template>
            </van-field>

            <van-field
              v-model="form.legalUserName"
              label="执法人:"
              placeholder="请输入"
              input-align="right"
              required
              readonly
              @click="clickHandle('user1')"
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            />
            <van-field
              v-model="form.legalNumber"
              label="执法证号:"
              placeholder="请输入"
              input-align="right"
              required
              readonly
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            />
            <van-field
              v-model="form.recordUserName"
              label="记录人:"
              placeholder="请输入"
              input-align="right"
              required
              readonly
              @click="clickHandle('user2')"
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            />
            <van-field
              v-model="form.recordNumber"
              label="执法证号:"
              placeholder="请输入"
              input-align="right"
              required
              readonly
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            />
            <van-field
              v-model="form.checkStarTime"
              label="检查开始时间:"
              placeholder="请输入"
              input-align="right"
              is-link
              required
              readonly
              @click="clickTime(1)"
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            />
            <van-field
              v-model="form.checkEndTime"
              label="检查结束时间:"
              placeholder="请输入"
              input-align="right"
              is-link
              required
              readonly
              @click="clickTime(2)"
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            />
            <van-field
              v-model.trim="form.caseCause"
              label="案由:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            />
            <!-- <van-field
              v-model="form.caseSource"
              label="案件来源:"
              placeholder="请输入"
              input-align="right"
              required
              readonly
              @click="clickHandle('from')"
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            /> -->
            <van-field
              v-model.trim="form.checkConclusion"
              label="案件简要情况:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            />
            <van-field
              v-model="form.checkResultName"
              label="检查结果:"
              placeholder="请输入"
              input-align="right"
              required
              readonly
              @click="clickHandle('result')"
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            />

            <van-field
              v-model.trim="form.issuspected"
              label="是否发现涉嫌环境违法行为:"
              placeholder="请输入"
              input-align="right"
              required
              :rules="[{ required: true, message: '请输入' }]"
              :disabled="isDone"
            >
              <template #input>
                <van-radio-group
                  v-model="form.issuspected"
                  direction="horizontal"
                  @change="changeIssuspected"
                  :disabled="isDone"
                >
                  <van-radio name="1">是</van-radio>
                  <van-radio name="0">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <!-- 附件 -->
            <div class="area">
              <div class="label">附件列表：</div>
              文档<uploader
                :id="form.taskId"
                :fileUrl="fileUrl9"
                :isDone="isDone"
                :type="9"
                :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
              />
              图片<uploader
                :id="form.taskId"
                :fileUrl="fileUrl10"
                :type="10"
                :isDone="isDone"
                :fileType="'image/*'"
              />
              视频<uploader
                :id="form.taskId"
                :fileUrl="fileUrl11"
                :type="11"
                :isDone="isDone"
                :fileType="'audio/*,video/*'"
              />
            </div>

            <div class="btns-change" v-if="!isDone">
              <van-button
                class="prev"
                type="default"
                v-if="currentStep == 1"
                @click="toPrev"
                >上一项</van-button
              >
              <van-button class="next" type="info" native-type="submit">{{
                showIllegal ? "保存" : "提交"
              }}</van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab
          title="勘查笔录"
          v-if="show_currentStep || (isDone && form.issuspected == 1)"
        >
          <kcbl
            :isDone="isDone"
            @toNext="currentStep++"
            @toPrev="
              currentStep--;
              form.issuspected = 1;
            "
          />
        </van-tab>
        <!-- <van-tab title="勘查笔录" v-if="form.issuspected == 1">
          <kcbl :isDone="isDone" @toNext="currentStep++;" @toPrev="currentStep--;form.issuspected = 1;"/>
        </van-tab> -->
        <van-tab
          title="询问笔录"
          v-if="show_currentStep || (isDone && form.issuspected == 1)"
        >
          <xwbl
            :isDone="isDone"
            @toPrev="
              currentStep--;
              form.issuspected = 1;
            "
            @toNext="currentStep++;"
          />
        </van-tab>
        <!-- <van-tab title="询问笔录" v-if="form.issuspected == 1">
          <xwbl :isDone="isDone" @toPrev="currentStep--;form.issuspected = 1;"/>
        </van-tab> -->
        <van-tab title="行政处罚" v-if="show_currentStep || (isDone && form.issuspected == 1)">
          <xzcf :isDone="isDone" :xzcfId="xzcfId" @toPrev="currentStep--;form.issuspected = 1;"/>
        </van-tab>
      </van-tabs>
    </div>

    <van-action-sheet
      v-model="showOptions"
      :actions="options"
      @select="onSelect"
    />

    <!-- 日期组件 -->
    <van-popup
      v-model="showDatePicker"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择年月日"
        @confirm="confirmDatePicker"
        @cancel="cancelDatePicker"
      />
    </van-popup>
  </div>
</template>

<script>
import url from "@/service/url-config.js";
import kcbl from "./illegalInfo/kcbl";
import xwbl from "./illegalInfo/xwbl";
import xzcf from "./illegalInfo/xzcf";
import uploader from "@/components/common/uploader";
// import { TreeSelect } from 'vant';

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "taskDetail",
  components: {
    Treeselect,
    kcbl,
    xwbl,
    xzcf,
    uploader,
  },
  data() {
    return {
      currentStep: 0,
      show_currentStep: false,
      selectDate: 0,
      showDatePicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      form: {},
      fileUrl9: [],
      fileUrl10: [],
      fileUrl11: [],
      fileObj: {},

      caseSource_options: [],
      // showIllegal: false,

      showOptions: false,
      showOrgs: false,
      options: [],
      activeId: 1,
      activeIndex: 0,
      dicts: {
        orgs: [],
        defaultMenusProps: {
          children: "children",
          label: "name",
        },
        checkmenu: [],
        userData: [],
        resultData: [],
      },
    };
  },

  computed: {
    showIllegal() {
      return this.$store.state.task.showIllegal;
    },
    selectRow() {
      return this.$store.state.task.selectRow;
    },
    isDone() {
      return this.$route.query.isDone || false;
    },
    xzcfId(){
      return this.$route.query.id
    }
  },
  watch: {
    currentStep: {
      immediate: true,
      deep: true,
      handler(v) {
        if (v == 0) {
          this.form = {
            zipCode: "",
            address: "",
            businessNo: "",
            organizationCode: "",
            creditCode: "",
            legalPerson: "",
            duty: "",
            phone: "",
            source: "",
            objectName: "",
            objectType: "",
            id: this.selectRow.legalObjId,
          };
          this.getDetail(0);
        }
        if (v == 1) {
          this.form = {
            taskId: this.selectRow.id,
            orgId: "",
            orgName: null,
            legalUserId: "",
            legalUserName: "",
            legalNumber: "",
            recordUserId: "",
            recordUserName: "",
            recordNumber: "",
            checkStarTime: "",
            checkEndTime: "",
            checkConclusion: "",
            checkResult: "",
            checkResultName: "",
            caseCause: "",
            // caseSource: "",
            // caseSourceName: "",

            issuspected: this.showIllegal ? 1 : 0,
            type: 0,
          };
          this.getDetail(1);
        }
      },
    },
  },

  created() {
    this.getDictOption();
    this.getFileList();
  },
  methods: {
    // 获取已经上传的文件
    getFileList() {
      this.$http
        .post(url.selectFileListByPidAndType, {
          pid: this.$route.query.id,
          fileType: 9,
        })
        .then((res) => {
          console.log(res, "9");
          this.fileUrl9 = res.data;
          res.data.forEach(v => {

            v.url=v.name
          })
        });
      this.$http
        .post(url.selectFileListByPidAndType, {
          pid: this.$route.query.id,
          fileType: 10,
        })
        .then((res) => {
          console.log(res, "10");
          res.data.forEach(element => {
            element.isImage=true;
          });
          this.fileUrl10 = res.data;
        });
      this.$http
        .post(url.selectFileListByPidAndType, {
          pid: this.$route.query.id,
          fileType: 11,
        })
        .then((res) => {
          console.log(res, "11");
          this.fileUrl11 = res.data;
          res.data.forEach(v => {
            v.url=v.name
          })
        });
    },

    // 获取当前任务详情
    getDetail(v) {
      // console.log(v,'aaa')
      let id = this.$route.query.id;
      if (v == 0) {
        this.$http.post(url.getDoneLegalObject, { taskId: id }).then((res) => {
          if (res.success) {
            if (!res.data) return;
            let data = res.data;
            // if (!data.address) return;
            this.form = data;
          }
        });
      }
      if (v == 1) {
        this.$http.post(url.getCheckResultInfo, { taskId: id }).then((res) => {
          console.log(res);
          if (res.success) {
            if (!res.data) return;
            let data = res.data;
            if (!data.orgName) return;
            this.form = data;
          }
        });
        this.getUserData();
      }
    },
    // 获取数据方法
    getUserData() {
      this.$http.post(url.getOrgTree, {}).then((res) => {
        this.dicts.orgs = res.data;
        // console.log(this.dicts.orgs,9999)
        // this.dicts.orgs.forEach((v) => {
        //   v.label = v.name;
        //   if (v.children) {
        //     v.children.forEach((v) => {
        //       v.label = v.name;
        //     });
        //   }
        // });
        // this.activeId = this.dicts.orgs[0].id;
      });
      this.$http
        .post(url.getUsers, { taskId: this.$route.query.id })
        .then((res) => {
          console.log(res, "nnnnn");
          this.dicts.userData = res.data.length ? res.data : [];
        });
    },
    // // 获取检查结果
    getDictOption() {
      this.$http.post(url.getDictOption, { type: 14 }).then((res) => {
        console.log(res, 88888);
        this.dicts.resultData = res;
      });
    },

    clickTime(v) {
      if (this.isDone) return;
      this.showDatePicker = true;
      this.selectDate = v;
    },
    clickHandle(v) {
      if (this.isDone) return;
      this.selectType = v;

      if (v == "org") {
        this.options = this.dicts.orgs;
        this.showOrgs = true;
        return;
      }
      if (v == "user1" || v == "user2") {
        if (this.form.orgName == null) {
        this.$toast("请先选择单位！！");
        return;
      }
        this.options = this.dicts.userData || [];
      }
      if (v == "from") {
        this.options = this.caseSource_options;
      }
      if (v == "result") {
        this.options = this.dicts.resultData || [];
      }
      this.showOptions = true;
    },

    normalizer(node) {
      //去掉children=[]的children属性
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children,
      };
    },
    
    // 保存
    toNext() {
      let currentStep = this.currentStep;
      if (currentStep == 0) {
        // 提交
        this.$http.post(url.saveLegalObject, this.form).then((res) => {
          if (res.success) {
            this.currentStep++;
            window.scrollTo(0, 0);
            this.form = {};
          }
        });
      }
      if (currentStep == 1) {
        // 提交
        this.form.type = this.form.issuspected == 1 ? 0 : 1;
        this.$http.post(url.saveCheckResult, this.form).then((res) => {
          if (res.success) {
            if (this.form.type == 1) {
              // 提交
              // 1 无违法行为点击保存直接跳转到已办，0 有违法行为 this.currentStep++
              this.$router.push("/task/done");
            } else {
              this.show_currentStep = true;
              // this.currentStep++;
              this.currentStep = 2;
              window.scrollTo(0, 0);
            }
            this.form = {};
          }
        });
        return;
      }
    },
    toPrev() {
      this.currentStep--;
      window.scrollTo(0, 0);
    },
    changeIssuspected(v) {
      // this.showIllegal = (v == 1);
      let showIllegal = v == 1;
      this.$store.commit("setShowIllegal", showIllegal);
    },
    // 日期选择确定
    confirmDatePicker(v) {
      // v = new Date(v).toLocaleDateString().replace(/\//g, '-')
      let d = v.getDate();
      d = d < 10 ? "0" + d : d;
      let m = v.getMinutes();
      m = m < 10 ? "0" + m : m;
      v =
        v.getFullYear() +
        "-" +
        (v.getMonth() + 1) +
        "-" +
        d +
        " " +
        v.getHours() +
        ":" +
        m;
      if (this.selectDate == 0) {
        this.form.requireFinishTime = v;
      }
      if (this.selectDate == 1) {
        this.form.checkStarTime = v;
      }
      if (this.selectDate == 2) {
        this.form.checkEndTime = v;
      }
      this.showDatePicker = false;
    },
    // 日期选择取消
    cancelDatePicker() {
      this.showDatePicker = false;
    },

    onSelect(v) {
      console.log(v, 444);
      // if (this.selectType == "org") {
      //   this.showOrgs = false;
      //   this.form.orgName = v.text;
      //   this.form.orgId = v.id;
      //   return;
      // }
      if (this.selectType == "user1") {
        this.showOptions = false;
        this.form.legalUserId = v.id;
        this.form.legalUserName = v.name;
        this.getEnforcenum(this.form.legalUserId, "legalNumber");
      }
      if (this.selectType == "user2") {
        this.showOptions = false;
        this.form.recordUserId = v.id;
        this.form.recordUserName = v.name;
        this.getEnforcenum(this.form.recordUserId, "recordNumber");
      }
      // if(this.selectType == 'from') {
      //   this.showOptions = false;
      //   this.form.caseSourceName = v.code;
      //   this.form.caseSource = v.name;
      // }
      if (this.selectType == "result") {
        this.showOptions = false;
        this.form.checkResultName = v.name;
        this.form.checkResult = v.code;
        // this.form.checkResult = v.name;
      }
    },
    // 获取执法证号
    getEnforcenum(userId, k) {
      this.$http.post(url.getEnforcenum, { userId }).then((res) => {
        if (res.success) {
          this.form[k] = res.data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-field__control:disabled,
/deep/ .van-field--disabled .van-field__label {
  color: #333;
}
.page {
  height: calc(100vh - 44px);
  overflow-y: auto;
}
input {
  border: none;
}
.container {
  padding: 0 15px 20px;
  .van-cell__value--alone {
    color: #28a1ff;
    font-size: 18px;
  }
  .stepName {
    margin-top: 20px;
    font-size: 18px;
    color: #28a1ff;
  }
  .stepName1 {
    margin-top: 50px;
  }
  .stepName-radio {
    display: flex;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
    // border-bottom: .5px solid #f2f2f2;
    &.item1 {
      justify-content: flex-start;
      > span {
        margin-right: 30px;
      }
    }
  }
  .star {
    display: inline;
    color: #f22424;
  }
  .item input {
    text-align: right;
  }
  .item .radio {
    margin-left: 40px;
  }
  .item-addr {
    align-items: flex-start;
    .addr {
      max-width: 221px;
      text-align: right;
    }
  }
  .area {
    padding: 13px 15px;
    border-bottom: 0.5px solid #f2f2f2;
    font-size: 14px;
    color: #646566;
  }
  .area .label {
    margin-bottom: 13px;
  }
  .area textarea {
    display: block;
    border: none;
  }

  .area .checkboxs {
    display: flex;
    justify-content: space-between;
  }

  /deep/ .van-icon-arrow {
    color: #ccc;
    vertical-align: middle;
  }

  .btns-change {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .btns-change .prev {
    width: 100px;
  }
  .btns-change .next {
    width: 100px;
  }
  /deep/ .vue-treeselect__control,
  /deep/ .vue-treeselect__placeholder,
  /deep/ .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
}
</style>