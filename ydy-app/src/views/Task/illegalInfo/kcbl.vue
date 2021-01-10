<template>
  <div>
    <van-form @submit="save">
      <van-field
        :value="form.checkStarTime"
        label="选择检查开始时间:"
        placeholder="请输入"
        input-align="right"
        readonly
        required
        :rules="[{ required: true, message: '请选择检查时间' }]"
        @click="clickTime(1);selectDate=1;"
        :disabled="true"
      />
      <van-field
        :value="form.checkEndTime"
        label="选择检查结束时间:"
        placeholder="请输入"
        input-align="right"
        readonly
        required
        :rules="[{ required: true, message: '请选择检查时间' }]"
        @click="clickTime(2);selectDate=2;"
        :disabled="isDone"
      />

      <!-- 日期组件 -->
      <van-popup v-model="showDatePicker" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          @confirm="confirmDatePicker"
          @cancel="cancelDatePicker"
        />
      </van-popup>

      <van-field
        label="检查地点:"
        v-model.trim="form.checkAddress"
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入检查地点' }]"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="被检查单位名称:"
        v-model.trim="form.checkedCompanyname"
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入被检查单位名称' }]"
        :disabled="isDone"
      ></van-field>

      <van-field 
        label="法定代表人:" 
        v-model.trim="form.legalPerson" 
        placeholder="请输入" 
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入法定代表人' }]"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="被检查人姓名:"
        v-model.trim="form.checkedPersonName"
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入被检查人姓名' }]"
        :disabled="isDone"
      ></van-field>

      <van-field
        v-model="form.genderName"
        label="性别:"
        placeholder="请输入"
        input-align="right"
        is-link
        readonly
        required
        :rules="[{ required: true, message: '请选择性别' }]"
        @click="show_gender"
        :disabled="isDone"
      ></van-field>
      <!-- 性别组件 -->
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />

      <van-field
        label="职业:"
        v-model.trim="form.job"
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入被检查人职业' }]"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="身份证号:"
        v-model.trim="form.checkedIdcard"
        placeholder="请输入"
        input-align="right"
        required
        name="pattern"
        :rules="[{ required: true, message: '请输入被检查人身份证号', pattern}]"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="工作单位:"
        v-model.trim="form.companyForChecked"
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入被检查人工作单位' }]"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="电话:"
        v-model.trim="form.phoneForChecked"
        placeholder="请输入"
        name="validator"
        :rules="[{ validator, message: '请输入正确格式' }]"
        input-align="right"
        required
        :disabled="isDone"
      ></van-field>

      <van-field
        label="地址:"
        v-model.trim="form.addressForChecked"
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入地址' }]"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="邮编:"
        v-model.trim="form.zipCode"
        placeholder="请输入"
        type="digit"
        input-align="right"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="检查人:"
        v-model="form.checkerName"
        placeholder="请选择"
        input-align="right"
   
        required
        readonly
        :rules="[{ required: true, message: '请输入检查人' }]"
        @click="handleClick('jcr1')"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="执法证号:"
        v-model="form.legalNum"
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入检查人执法证号' }]"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="检查人:"
        v-model="form.checkerTwoName"
        placeholder="请输入"
        input-align="right"
        required
        readonly
        :rules="[{ required: true, message: '请输入检查人' }]"
        :disabled="isDone"
        @click="handleClick('jcr2')"
      ></van-field>

      <van-field
        label="执法证号:"
        v-model="form.legalNumTwo"
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入检查人执法证号' }]"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="记录人:"
        v-model="form.recorder"
        placeholder="请输入"
        input-align="right"
        required
        readonly
        :rules="[{ required: true, message: '请输入记录人' }]"
        @click="handleClick('jlr')"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="记录人执法证号:"
        v-model="form.recorderLegalNum"
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入记录人执法证号' }]"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="见证人:"
        v-model="form.witness"
        placeholder="请输入"
        input-align="right"
        required
        readonly
        :rules="[{ required: true, message: '请输入见证人' }]"
        :disabled="isDone"
        @click="handleClick('jzr')"
      ></van-field>

      <van-field
        label="见证人身份证号:"
        v-model="form.witnessIdcard"
        placeholder="请输入"
        input-align="right"
        required
        name="pattern"
        :rules="[{ required: true, message: '请输入见证人身份证号', pattern }]"
        :disabled="isDone"
      ></van-field>

      <van-field
        label="勘察内容:"
        type="textarea"
        v-model.trim="form.checkComment"
        placeholder="请输入"
        :rows="4"
        input-align="right"
        required
        :rules="[{ required: true, message: '请输入勘察内容' }]"
        :disabled="isDone"
      ></van-field>

      <div class="btns-change" v-if="!isDone">
        <van-button class="prev" type="default" @click="toPrev">上一项</van-button>
        <van-button class="next" type="info" native-type="submit">保存</van-button>
      </div>
    </van-form>
    <!-- 检查人、被检查人弹窗组件 -->
    <van-action-sheet v-model="showOptions" :actions="options" @select="onSelect1" v-if="showOptions"/>

  </div>
</template>

<script>
import url from "@/service/url-config.js";
// import {formatDateToStr} from '@/utility/utility.js'
export default {
  props: ["isDone"],
  computed: {
    selectRow() {
      return this.$store.state.task.selectRow;
    },
    isYb() {
      return this.$route.path.indexOf("ybrw") > -1;
    }
  },
  data() {
    return {
      // 身份证校验
      pattern:/(^\d{15}$)|(^\d{17}(\d|X|x)$)/,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      show: false, //性别弹窗
      actions: [
        { name: "男", index: "0" },
        { name: "女", index: "1" }
      ],
      showDatePicker: false, //日期弹窗
      date: "", //日历区间
      showOptions: false,
      options: [],
      selectType: '',
      userData:[],
      
      selectType: '',
      showOptions: false,
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

      form: {
        taskId: "",
        checkStarTime: "",
        checkEndTime: "",
        checkAddress: "",
        checkedCompanyname: "",
        legalPerson: "",
        checkedPersonName: "",
        checkedIdcard: "",
        addressForChecked: "",
        phoneForChecked: "",
        gender: "",
        // genderName:"",
        job: "",
        zipCode: "",
        companyForChecked: "",
        checkerId: "", //检查人ID
        checkerName: "",
        legalNum: "",
        checkerTwoId: "",
        checkerTwoName: "",
        legalNumTwo: "",
        recorderId: "", //记录人ID
        recorder: "",
        recorderLegalNum: "",
        witness: "", 
        // witnessId:"",//见证人ID
        witnessIdcard: "",
        checkComment: "",
      }
    };
  },
  created() {
    this.getUsers();
    this.form.taskId = this.selectRow.id;
    this.getSurveyRecordInfo();

  },
  methods: {
 
   // 获取人员数据方法
    getUsers(){
      this.$http.post(url.getUsers, {taskId:this.$route.query.id}).then(res => {
        this.userData = res.data.length ? res.data : [];
      })
    },
    // 获取执法证号
    getEnforcenum(userId, k) {
      this.$http.post(url.getEnforcenum, {userId}).then(res => {
        console.log(res)
        if(res.success) {
          this.form[k] = res.data;
        }
      })
    },
    // 勘查笔录回显
    getSurveyRecordInfo(){
      this.$http.post(url.getSurveyRecordInfo, {taskId: this.selectRow.id}).then(res => {
        if(res.success) {
          
          this.form = res.data;
          res.data.genderName == '0'? this.form.gender='男' : this.form.genderName='女'
        }
      })
    },
    
    clickTime(v) {
      if(this.isDone) return;
      this.showDatePicker = true;
      // this.selectDate = v;
    },
    // 日期选择确定
    confirmDatePicker(v) {
      let d = v.getDate();
      d = d < 10 ? ('0' + d) : d;
      let m = v.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      v = v.getFullYear() + "-" + (v.getMonth() + 1) + "-" + d + " " + v.getHours() + ":" + m;
      this.selectDate == 1
        ? (this.form.checkStarTime = v)
        : this.selectDate == 2
        ? (this.form.checkEndTime = v)
        : "";
      this.showDatePicker = false;
    },
    // 日期选择取消
    cancelDatePicker() {
      this.showDatePicker = false;
    },

    show_gender(){
      if(this.isDone) return;
      this.show=true;
    },
    // 性别选择
    onSelect(item) {
     
      this.form.gender = item.index;
      this.form.genderName = item.name;
      this.show = false;
    },
    
    handleClick(i){
      if(this.isDone) return;
      this.showOptions = true;
      this.selectType=i

      this.options = this.userData
    },
    onSelect1(item) {
      switch (this.selectType) {
        case 'jcr1':
          this.form.checkerName=item.name;
          this.form.checkerId=item.id;
          this.getEnforcenum(this.form.checkerId, 'legalNum')
          break;
      
        case 'jcr2':
          this.form.checkerTwoName=item.name;
          this.form.checkerTwoId=item.id;
          this.getEnforcenum(this.form.checkerTwoId, 'legalNumTwo')
          break;

          case 'jlr':
          this.form.recorder=item.name;
          this.form.recorderId=item.id;
          this.getEnforcenum(this.form.recorderId, 'recorderLegalNum')
          break;

          case 'jzr':
          this.form.witness=item.name;
          this.form.witnessId=item.id;
          break;
      }
      this.showOptions = false;
    },
    // 手机号校验
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 身份证校验
    // validatorId(val) {
    //   return /(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(val);
    // },
 


    toPrev() {
      this.$emit("toPrev");
    },

    // 保存
    save() {
      this.$http.post(url.saveSurveyRecord, this.form).then(res => {
        console.log(res);
        this.$emit('toNext');
        if (res.success) {
          this.$toast({
            type: "success",
            message: res.message
          });
        } else {
          this.$toast({
            type: "info",
            message: res.message
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
</style>