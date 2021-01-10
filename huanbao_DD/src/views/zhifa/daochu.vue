<template>
  <div class="daochuPage">
    <!-- title:导出案件调度表 -->
    <van-field
      v-model="start"
      required
      is-link
      readonly
      label="开始时间："
      @click="start_showPopup"
      placeholder="请选择"
      input-align="right"
    />

    <van-field
      v-model="end"
      required
      is-link
      readonly
      label="结束时间："
      @click="end_showPopup"
      placeholder="请选择"
      input-align="right"
    />

    <!-- 开始弹窗 -->
    <van-popup v-model="startShow" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        item-height="40"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="begin_handleConfirm"
        @cancel="begin_handleCancel"
      />
    </van-popup>
    <!-- 结束弹窗 -->
    <van-popup v-model="endShow" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        item-height="40"
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="over_handleConfirm"
        @cancel="over_handleCancel"
      />
    </van-popup>
    <!-- 按钮 -->
    <div @click="submit">
      <van-button block type="info">导出</van-button>
      <p class="tips">导出文件将发送到「工作通知」</p>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import dayjs from "dayjs";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载

export default {
  data() {
    return {
      start: "",
      end: "",
      date: "",
      startShow: false,
      endShow: false,
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1)
    };
  },
  created() {
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "导出案件调度" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
  methods: {
    start_showPopup() {
      this.startShow = true;
    },
    end_showPopup() {
      this.endShow = true;
    },
    begin_handleConfirm(value) {
      this.start = value;
      this.date = dayjs(value).format("YYYY-MM-DD");
      this.start = this.date;
      this.startShow = false;
    },
    begin_handleCancel() {
      this.start = "";
      this.startShow = false;
    },
    over_handleConfirm(value) {
      this.end = value;
      this.date = dayjs(value).format("YYYY-MM-DD");
      this.end = this.date;
      this.endShow = false;
    },
    over_handleCancel() {
      this.end = "";
      this.endShow = false;
    },
    submit() {
        console.log(userinfo.userId);
      if (!this.start) {
        this.$toast({
          message: "请选择开始时间!!",
          duration: 2000
        });
        return;
      }
      if (!this.end) {
        this.$toast({
          message: "请选择结束时间!!",
          duration: 2000
        });
        return;
      } 
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '提交中',
        loadingType: 'spinner',
        selector: '#custom-selector',
      });
      // console.log(this.start);
      // console.log(this.end);
      // console.log(userinfo.userId);
      this.http
        .post("exportDdWord", {
          startDate: this.start,
          endDate: this.end,
          userid: userinfo.userId
        })
        .then(res => {
          console.log(res);
            if (res.data != null) {
              this.exportWorkNotice(res.data.fileId)
            }
            toast.clear();
        });
      // this.$router.push("/zhifaJilu")
    },
    exportWorkNotice(fileId) {
        this.http
          .post("exportGztz", {
            fileId: fileId,
            type: '1',
          })
          .then(res => {
            Dialog.alert({
              title: '提示',
              message: '导出成功',
            }).then(() => {
              this.$router.push("/");
            })
          });
      }
  }
};
</script>
<style lang="scss" scoped>
.daochuPage{
  padding-bottom: 50px;

}
.tips{
  padding: 15px;
  text-align: center;
  color: #666;
  font-size: 16px;
}
</style>