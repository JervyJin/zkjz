<template>
  <div>
    <van-form @submit="submit" res="form" v-if="type==1">
      <van-field
        v-model.trim="form.title"
        rows="1"
        autosize
        input-align="right"
        label="新闻标题："
        type="textarea"
        placeholder="请输入"
        required
        :readonly="type!=1"
        :rules="[{ required: true, message: '请输入会议地点' }]"
      />
      <!-- <van-field
        v-model.trim="form.createName"
        v-if="type==0"
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
        v-if="type==0"
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
      <van-field
        v-model.trim="form.linkurl"
        rows="1"
        autosize
        input-align="right"
        label="原网址："
        type="textarea"
        placeholder="请输入"
        required
        :readonly="type!=1"
        :rules="[{ required: true, message: '请输入原网址' }]"
      />

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
      <Editor v-model="form.content" :disabled="type" />
      <van-button class="btn-submit" native-type="submit" type="danger" block v-if="type==1" style="position: fixed; bottom: 0"
        >保存</van-button
      >
    </van-form>
    <div v-else class="box">
      <h2>{{form.title}}</h2>
      <div class="up">
        <span class="upUser">上传人：{{form.createName}}</span>
        <span class="upTime">{{form.updated}}</span>
      </div>
      <div class="content">{{form.content}}</div>
      <div class="link">
        <a :href="form.linkurl" target="_blank">{{form.linkurl}}</a>
      </div>
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
import Editor from '@/components/common/Editor';
import url from "@/service/url-config.js";
import dayjs from "dayjs";
import * as dd from "dingtalk-jsapi";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
export default {
  components: {
        Editor
    },
  data() {
    return {
      showDatePicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),

      form: {
        title: "",
        content: "",
        linkurl: "",
        columntype:1,
        userid:userinfo.userId || '061665335038032920'
      },
    };
  },
  computed: {
    type() {
      return this.$route.query.type;
    },
  },
  methods: {
    ToText(HTML)
  {
      var input = HTML;
      return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
  },
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
          this.form = res.data;
          this.form.updated = dayjs(res.data.updated).format(
            "YYYY-MM-DD HH:mm"
          );
          this.form.content = this.ToText(res.data.content)
        });
    },
    /* 提交按钮 */
    submit() {
      if (this.form.content == ""){
        this.$toast('请编辑文章内容！');
        return;
      }
      this.$router.push("/news");
      this.$http.post(url.saveLearningcolumn,this.form).then(res=>{
        
      })
    },
  },
  created() {
    this.getLearningcolumnInfo();
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "时事要闻详情" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
};
</script>

<style lang="less" scoped>
    .box{
      background: #fff;
      padding: 15px;
      h2{font-size: 22px;}
      .up{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      .link{padding: 10px 0;}
      .content{color: #504e4e;}
    }

</style>