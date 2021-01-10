<template>
  <div>
    <van-cell-group>
      <van-field v-model="userInfo.NAME_" label="姓名：" readonly input-align="right" />
      <van-field v-model="userInfo.IDNUMBER_" label="身份证号：" readonly input-align="right" />
      <van-field v-model="userInfo.SEX_" label="性别：" readonly input-align="right" />
      <van-field v-model="userInfo.NATION_" label="民族：" readonly input-align="right" />
      <van-field v-model="userInfo.BIRTHDAY_" label="出生年月：" readonly input-align="right" />
      <van-field v-model="userInfo.EDUCATION_" label="学历：" readonly input-align="right" />
      <van-field v-model="userInfo.USERTYPEBYPARTY_" label="人员类别：" readonly input-align="right" />
      <van-field v-model="userInfo.JOINTHEPARTYDATE_" label="加入党组织日期：" readonly input-align="right" />
      <van-field v-model="userInfo.BECOMEWORKDATE_" label="转为正式党员日期：" readonly input-align="right" />
      <van-field v-model="userInfo.PHONE_" label="手机号：" readonly input-align="right" />
      <van-field v-model="userInfo.PARTYORGNAME" label="所属党组织：" readonly input-align="right" />
    </van-cell-group>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import url from "@/service/url-config.js";
import * as dd from "dingtalk-jsapi";
export default {
  name:'infoDetail',
  data() {
    return {
      userInfo:{}
    }
  },
  created() {
    this.getPartyUserInfoById();
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "党组织人员信息" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
  methods: {
    getPartyUserInfoById(){
      this.$http.post(url.getPartyUserInfoById,{userId:this.$route.query.id}).then(res=>{
        this.userInfo = res.data[0];
      })
    }
  },
}
</script>