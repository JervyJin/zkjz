<template>
  <div>
    <!-- 图片上传组件辅助 -->
    <van-uploader
      class="avatar-uploader quill-img"
      :after-read="afterRead"
      name="file"
      accept='.jpg,.jpeg,.png,.gif'
    ></van-uploader>

    <!-- 富文本组件 -->
    <quill-editor
      class="editor"
      v-model="content"
      ref="quillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
import api from "@/service/config.js";
import axios from "axios";

// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],       // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"],                    // 引用  代码块
  [{ list: "ordered" }, { list: "bullet" }],       // 有序、无序列表
  [{ indent: "-1" }, { indent: "+1" }],            // 缩进
  [{ size: ["small", false, "large", "huge"] }],   // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }],         // 标题
  [{ color: [] }, { background: [] }],             // 字体颜色、字体背景颜色
  [{ align: [] }],                                 // 对齐方式
  ["clean"],                                       // 清除文本格式
  // ["link", "image", "video"]                       // 链接、图片、视频
];

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
let userinfo = JSON.parse(window.localStorage.getItem("userinfo"));

export default {
  props: {
    /* 编辑器的内容 */
    value: {
      type: String
    },
    /* 图片大小 */
    maxSize: {
      type: Number,
      default: 4000 //kb
    },
    disabled:{
      type: Number,
      default:1  
    }
  },
  components: { quillEditor },
  data() {
    return {
      content: this.value,
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        placeholder: "请输入内容",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".quill-img input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
     
    };
  },
  watch: {
    value: function() {
      this.content = this.value;
    }
  },
  computed: {
    guid() {
      return this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4() + this.S4();
    },
  },
  methods: {
    /* 用于生成uuid */
    S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

    

    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus(event) {
      //获得焦点事件
      if (this.disabled==0) {
          event.enable(false);
      }
    },
    onEditorChange() {
      //内容改变事件
      this.$emit("input", this.content);
    },

   /**文件上传 */
    afterRead(file) {
      // console.log(file);
      // if (!/image\/[a-zA-z]+/.test(file.file.type)) {
      //   this.$toast("请上传图片");
      //   return false;
      // }
      let that = this;
      let params = new FormData();
      params.append("files", file.file);
      params.append("userid", userinfo.userId || '061665335038032920');
      params.append("filePid", this.guid);
      params.append("typeCode", 6201);
      let config = {
        headers: {
          //添加请求头
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(api.api_base + "/party/uploadFiles", params, config)
        .then(({ data }) => {
          // console.log(data, "vvvv");
          
          if (this.isPicture) {
            data.data[0].isImage = true;
            that.fileList = [data.data];

          } else {
            console.log(data.data[0])
            data.data[0].url = data.data[0].filename;
            that.fileList = [data.data];
            
          }
          this.$emit('showguid', this.guid);
        });
    },
  }
};
</script> 

<style>
.editor {
  line-height: normal !important;
  /* height: 192px; */
  background: #fff;
}
.quill-img {
  display: none;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>