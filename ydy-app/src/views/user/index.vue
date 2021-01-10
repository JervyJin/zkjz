<template>
  <div class="page">
    <van-form @submit="submit">
      <van-field
        label="账户名:"
        :readonly="true"
        input-align="right"
        v-model="name"
      ></van-field>

      <van-field
        label="用户姓名:"
        :readonly="true"
        input-align="right"
        v-model="userName"
      ></van-field>
      <van-field
        label="单位:"
        :readonly="true"
        input-align="right"
        v-model="tenantName"
      ></van-field>

      <!-- <van-field
        label="执法证号:"
        :readonly="true"
        input-align="right"
        v-model="userInfoForm.enforceNum"
      ></van-field> -->
      <van-field name="radio" label="性别:">
        <template #input>
          <van-radio-group v-model="userInfoForm.gender" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        label="职务:"
        :readonly="false"
        input-align="right"
        v-model="userInfoForm.duty"
      ></van-field>
      <van-field
        v-model="userInfoForm.birthDay"
        label="出生年月:"
        input-align="right"
        is-link
        :readonly="false"
        @click="dateClick(1)"
        placeholder="请选择"
      ></van-field>

      <!-- <van-field
        v-model="userInfoForm.issueDate"
        label="发证日期:"
        input-align="right"
        is-link
        readonly
        @click="dateClick(2)"
        placeholder="请选择"
      ></van-field> -->
      <van-field
        label="邮箱:"
        :readonly="false"
        input-align="right"
        v-model="userInfoForm.email"
      ></van-field>
      <van-field
        label="工作联系方式:"
        :readonly="false"
        input-align="right"
        v-model="userInfoForm.workTelphone"
      ></van-field>
      <van-field
        label="个人联系方式:"
        :readonly="false"
        input-align="right"
        v-model="userInfoForm.telPhone"
      ></van-field>
      <!-- <van-field
        v-model="userInfoForm.expiryDate"
        label="有效日期至:"
        input-align="right"
        is-link
        readonly
        @click="dateClick(3)"
        placeholder="请选择"
      ></van-field> -->
      <!-- <van-field
              label="执法区域:"
              :readonly="false"
              input-align="right"
              v-model="userInfoForm.enforceAreacode"
      ></van-field>
      <van-field
              label="用户所属区域:"
              :readonly="false"
              input-align="right"
              v-model="userInfoForm.areaCode"
      ></van-field> -->
    </van-form>
    <van-button
      class="btn-submit"
      type="primary"
      block
      color="#1890FF"
      @click="submit"
      >保存</van-button
    >
    <van-popup
      v-model="showDatePicker"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @click="showDatePicker = true"
        @confirm="confirmDatePicker"
        @cancel="cancelDatePicker"
      />
    </van-popup>
  </div>
</template>

<script>
import url from "@/service/url-config.js";
import { Toast } from "vant";

export default {
  name: "send",
  data() {
    return {
      name: "",
      userName: "",
      tenantName:"",
      userinfo: {},
      userInfoForm: {
      },
      showDatePicker: false,
      currentDate: new Date(1990, 0, 1),
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      selectDate: 0, // 选中第几个日期
      id: "",
    };
  },
  created() {
    const toast = Toast.loading({
        // duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
   
    // this.getData();
    // 获取个人信息数据
   this.getUserData();
    
  },
  methods: {
    // getData() {
    //   let userId = this.$store.state.task.userId;
    //   // let userId = JSON.parse(sessionStorage.getItem("userinfo")).openid || this.$store.state.task.userId;
    //   this.$http.post(url.getUserInfo).then(res => {
    //     console.log(res,888)
    //     if (res.success) {
    //       this.userInfoForm = {
    //         gender: res.data.gender,
    //         duty: res.data.duty,
    //         birthDay: res.data.birthDay,
    //         enforceNum: res.data.enforceNum,
    //         issueDate: res.data.issueDate,
    //         email: res.data.email,
    //         workTelphone: res.data.workTelphone,
    //         telPhone: res.data.telPhone,
    //         expiryDate: res.data.expiryDate,
    //         enforceAreacode: res.data.enforceAreacode,
    //         areaCode: res.data.areaCode
    //       };
    //       this.id = res.data.id;

    //     }
    //   });
    // },

    /* 根据 getUserInfo 接口获取账户名、用户名和 userId */
    getUserData() {
      dd.getAuthCode({ corpId: "3" }).then(res => {
        // alert(res.code)
      if (res.code) {
      this.$http.post(url.getUserInfo,{"code": res.code}).then((res) => {
        // alert(JSON.stringify(res));
        if (res.success) {
          this.name = res.data.content.data.account; //账号名
          this.userName = res.data.content.data.lastName; //用户名
          this.tenantName = res.data.content.data.tenantName; //单位名
          // this.$store.commit("userId", res.data.content.data.employeeCode);
          // sessionStorage.setItem(
          //   "userId",
          //   JSON.stringify(res.data.content.data.employeeCode)
          // );


          this.getUser();
        }
      });
      }
      })
    },
    /* 获取除账户名、用户名 以外的数据 */
    getUser(){
      let userId = 
       this.$store.state.task.userId || sessionStorage.getItem("userId");
        //  alert(userId)
        this.$http.post(url.getUser,{userId}).then((res)=>{
          //  alert(JSON.stringify(res))
          if(res.success){
              //返回的数据填到列表
          this.userInfoForm = res.data
          }else{
            alert(res.message)
          }
        })

    },
    // 保存
    submit() {
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);

      let userId =
        this.$store.state.task.userId || sessionStorage.getItem("userId");
        // alert(userId);
      let queryParam = {
        // id: this.id,
        userId,
        gender: this.userInfoForm.gender,
        duty: this.userInfoForm.duty,
        birthDay: this.userInfoForm.birthDay,
        enforceNum: this.userInfoForm.enforceNum,
        // issueDate: this.userInfoForm.issueDate,
        email: this.userInfoForm.email,
        workTelphone: this.userInfoForm.workTelphone,
        telPhone: this.userInfoForm.telPhone,
        // expiryDate: this.userInfoForm.expiryDate,
        // enforceAreacode: this.userInfoForm.enforceAreacode,
        // areaCode: this.userInfoForm.areaCode
      };
      this.$http.post(url.insertUserinfo, this.userInfoForm).then((res) => {
        // toast.clear();
        if (res.success) {
          this.$toast.success(res.message);
        }
      });
    },

    // 选择日期
    confirmDatePicker(v) {
      console.log(v);
      let year = v.getFullYear();
      let month = v.getMonth() + 1;
      let day = v.getDate();
      let date = `${year}-${month}-${day}`;
      switch (this.selectDate) {
        case 1:
          this.userInfoForm.birthDay = date;
          break;
        case 2:
          this.userInfoForm.issueDate = date;
          break;
        case 3:
          this.userInfoForm.expiryDate = date;
          break;
      }
      this.showDatePicker = false;
    },
    // 日期选择取消
    cancelDatePicker() {
      this.showDatePicker = false;
    },
    // 打开选择日期弹框
    dateClick(val) {
      this.showDatePicker = true;
      switch (val) {
        case 1:
          this.selectDate = 1;
          // this.currentDate = this.userInfoForm.birthDay;
          break;
        case 2:
          this.selectDate = 2;
          // this.currentDate = this.userInfoForm.issueDate;
          break;
        case 3:
          this.selectDate = 3;
          // this.currentDate = this.userInfoForm.expiryDate;
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  padding: 3px 15px 20px;
  .van-cell {
    font-size: 16px;
    /deep/ .van-field__label {
      width: 130px;
    }
    /deep/ .van-field__control--custom {
      position: relative;
      .van-radio-group--horizontal {
        position: absolute;
        right: 0;
        .van-radio[tabindex="0"] {
          margin-right: 0;
        }
      }
    }
  }

  .btn-submit {
    border-radius: 2px;
    margin-top: 10px;
  }
}
</style>