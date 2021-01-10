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
      <van-field
        v-model="newsInfo.linkurl"
        name="原网址："
        label="原网址："
        placeholder="请输入"
        required
        :rules="[{ required: true, message: '请填写原网址' }]"
        input-align="right"
      />
      <!-- <p>文章内容：</p> -->
      <!-- <van-field
        style="height: 60px"
        v-html="newsInfo.content"
        v-model="newsInfo.content"
        name="内容："
        label="内容："
        placeholder="请输入"
        required
        readonly
        :rules="[{ required: true, message: '请填写内容' }]"
        input-align="right"
      >
      </van-field> -->
      <!-- <quill-editor
            style="margin-top:10px;" 
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor> -->
      <Editor v-model="newsInfo.content" />

      <van-button block type="danger" native-type="submit" style="position: fixed; bottom: 0"> 保存 </van-button>
    </van-form>
  </div>
</template>

<script>
import Editor from '@/components/common/Editor';
import url from "@/service/url-config.js";
import * as dd from "dingtalk-jsapi";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  components: {
        Editor
    },
  data() {
    return {
      newsInfo: {
        userid:userinfo.userId || '061665335038032920',
        title: "",
        linkurl: "",
        content: "",
        columntype: 1,
      },
      editorOption: {placeholder: '编辑文章内容'}
    };
  },
 
  methods: {
    
    onEditorReady(editor) { // 准备编辑器
 
        },
    onEditorChange({ editor, html, text }) {
            this.newsInfo.content = html;
        }, //内容改变事件
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件

    onSubmit() {
      if (this.newsInfo.content == ""){
        this.$toast('请编辑文章内容！');
        return;
      }
      this.$http.post(url.saveLearningcolumn, this.newsInfo).then((res) => {});
      this.$toast({
        message: "保存成功",
        duration: 2000,
      });
      this.$router.push("/news");
    },
  },
  created() {
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "发布要闻" // 控制标题文本，空字符串表示显示默认文本
      });
    });
  },
};
</script>