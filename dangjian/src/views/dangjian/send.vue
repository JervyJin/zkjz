<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="newsInfo.title"
        name="标题："
        label="标题："
        placeholder="请输入"
        required
        :rules="[{ required: true, message: '请填写标题' }]"
        input-align="right"
      />
      <!-- <van-field
        v-model="newsInfo.linkurl"
        name="连接新闻网址："
        label="连接新闻网址："
        placeholder="请输入"
        :rules="[{ required: true, message: '请填写连接新闻网址' }]"
        input-align="right"
      /> -->
      <!-- <van-field
        v-model="newsInfo.content"
        name="内容："
        label="内容："
        placeholder="请输入"
        required
        :rules="[{ required: true, message: '请填写内容' }]"
        input-align="right"
      /> -->
      <van-field name="uploader" label="相关附件：">
        <template #input>
          <uploader
            :id="newsInfo.userid"
            :disabled="1"
            :fileUrl="fileUrl"
            @showguid="toShowguid"
            :fileId="guid"
            :type="6201"
            :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
          />
        </template>
      </van-field>
    
        <van-button block type="danger" style="position: fixed; bottom: 0" native-type="submit">
          保存
        </van-button>

    </van-form>
  </div>
</template>

<script>
import url from "@/service/url-config.js";
import uploader from "@/components/common/uploader";
import * as dd from "dingtalk-jsapi";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));
export default {
  components: {
    uploader,
  },
    data() {
        return {
          fileUrl:[],
            newsInfo:{
              userid: userinfo.userId ||'061665335038032920',
              title:'',
              // linkurl:'',
              // content:'',
              columntype:2,
              // filePid:this.guid,
            }
        }
    },
    computed: {
    guid() {
      return this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4();
    },
  },
    methods: {
      /* 用于生成guid */

    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

      toShowguid(v){
      this.newsInfo.filePid = v;
    },
    onSubmit() {
      this.$http.post(url.saveLearningcolumn,{...this.newsInfo,filePid:this.guid}).then(res=>{
      })
      this.$toast({
              message: '保存成功',
              duration: 1000
            });
      this.$router.push('/dangjian')
    },
  },
  created() {
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "发布动态" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
}
</script>