<template>
  <div>
    <van-form @submit="submit" v-if="type == 1">
      <van-field
        v-model.trim="form.title"
        rows="1"
        autosize
        input-align="right"
        label="标题："
        type="textarea"
        placeholder="请输入"
        required
        :readonly="type != 1"
        :rules="[{ required: true, message: '请输入会议地点' }]"
      />
      <!-- <van-field
        v-model.trim="form.createName"
        rows="1"
        autosize
        input-align="right"
        label="上传人："
        type="textarea"
        placeholder="请输入"
        required
        :readonly="type!=1"
        :rules="[{ required: true, message: '请输入上传人' }]"
      /> -->
      <!-- <van-field
        v-model.trim="form.updated"
        rows="1"
        autosize
        input-align="right"
        label="上传时间："
        type="textarea"
        placeholder="请输入"
        required
        readonly
        @click="IsshowDatePicker"
        :rules="[{ required: true, message: '请输入上传人' }]"
      /> -->
      <!-- <van-field
        v-model.trim="form.linkurl"
        rows="1"
        autosize
        input-align="right"
        label="来源："
        type="textarea"
        placeholder="请输入"
        required
        :readonly="type!=1"
        :rules="[{ required: true, message: '请输入来源' }]"
      /> -->

      <!-- <van-field
        v-model.trim="form.content"
        rows="1"
        autosize
        input-align="right"
        label="内容："
        type="textarea"
        placeholder="请输入"
        required
        :readonly="type!=1"
        :rules="[{ required: true, message: '请输入内容' }]"
      /> -->
      <van-field name="uploader" label="相关附件：">
        <template #input>
          <uploader
            :id="userid"
            :disabled="1"
            :fileUrl="fileUrl"
            :fileId="guid"
            @showguid="toShowguid"
            :type="6201"
            :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
          />
        </template>
      </van-field>

      <van-button
        class="btn-submit"
        native-type="submit"
        type="danger"
        block
        v-if="type == 1"
        style="position: fixed; bottom: 0"
        >保存</van-button
      >
    </van-form>
    <div v-else class="box">
      <h2>{{ form.title }}</h2>
      <div class="up">
        <span class="upUser">上传人：{{ form.createName }}</span>
        <span class="upTime">{{ form.updated }}</span>
      </div>
      <div class="link">
        <a :href="form.linkurl" target="_blank">{{ form.linkurl }}</a>
      </div>
      <!-- <div class="content">{{form.content}}</div> -->
      <uploader
        :disabled="type"
        :id="form.userid"
        :fileUrl="fileUrl"
        @showguid="toShowguid"
        :type="6201"
        :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
      />
    </div>
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
import dayjs from "dayjs";
import * as dd from "dingtalk-jsapi";
import uploader from "@/components/common/uploader";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
export default {
  components: {
    uploader,
  },
  data() {
    return {
      fileUrl: [],
      showDatePicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),

filePid:'',
      form: {
        title: "",
        // filePid:"",
        // createName: "",
        // content: "",
        // linkurl: "",
        // updated: "",
        columntype: 2,
        userid: userinfo.userId ||'061665335038032920',
        // userid:this.$store.state.user.userId
      },
    };
  },
  computed: {
    type() {
      return this.$route.query.type;
    },
    userid(){
      return userinfo.userId
    },
    guid() {
      return this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4();
    },
  },
  methods: {
    /* 用于生成guid */

    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

    // toShowguid(v){
    //   this.form.filePid = v;
    // },
    // 日期选择确定
    confirmDatePicker(v) {
      v = dayjs(v).format("YYYY-MM-DD HH:mm");
      this.form.updated = v;

      this.showDatePicker = false;
    },
    // 日期选择取消
    cancelDatePicker() {
      this.showDatePicker = false;
    },
    IsshowDatePicker() {
      if (this.type == 1) this.showDatePicker = true;
      else this.showDatePicker = false;
    },
    getLearningcolumnInfo() {
      this.$http
        .post(url.getLearningcolumnInfo, {
          learningcolumnId: this.$route.query.id,
        })
        .then((res) => {
          console.log(res)
          this.form = res.data;
          this.form.updated = dayjs(res.data.updated).format(
            "YYYY-MM-DD HH:mm"
          );
          this.fileUrl = res.data.DJDTGLXGFJ;
          this.filePid = res.data.id;
        });
    },
    
    /* 提交按钮 */
    submit() {
      this.$router.push("/dangjian");
      delete this.form.linkurl
      delete this.form.content

      this.$http.post(url.saveLearningcolumn, {...this.form,filePid:this.guid}).then((res) => {});
    },
  },
  created() {
    // console.log(this.$store.state.user)
    this.getLearningcolumnInfo();
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "党建动态详情", // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
};
</script>
<style lang="less" scoped>
.box {
  background: #fff;
  padding: 15px;
  h2 {
    font-size: 22px;
  }
  .up {
    display: flex;
    justify-content: space-between;
  }
  .link {
    padding: 10px 0;
  }
  .content {
    color: #504e4e;
  }
}
</style>