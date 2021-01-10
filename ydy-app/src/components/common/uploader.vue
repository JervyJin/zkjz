<template>
  <div>
    <div v-if="isPicture" >
      <van-uploader
        :after-read="afterRead"
        :before-delete="beforeDelete"
        :max-size="10 * 1024 * 1024"
        @oversize="onOversize"
        :max-count="1"
        :accept="fileType"
        :disabled="isDone"
        v-model="fileList"
        
      >
        <template>
          <van-button type="primary">点击上传</van-button>
        </template>
      </van-uploader>
    </div>
    <div v-else>
      <van-uploader
        :after-read="afterRead"
        :before-delete="beforeDelete"
        :max-size="10 * 1024 * 1024"
        @oversize="onOversize"
        @click-preview="click_preview"
        :max-count="1"
        :accept="fileType"
        :disabled="isDone"
        v-model="fileList"
      >
        <template>
          <van-button type="primary">点击上传</van-button>
        </template>
      </van-uploader>
    </div>
    
  </div>
</template>
<script>
// import url from "@/service/url-config.js";
import api from "@/service/config.js";
import axios from "axios";
// import { ImagePreview } from 'vant';
export default {
  created() {
    
  },
  props: {
    id: String,
    fileUrl: Array,
    type: Number,
    isDone: Boolean,
    fileType: String
  },
  data() {
    return {
      fileList: []
    };
  },
  watch: {
    fileUrl: {
      deep: true,
      immediate: true,
      handler() {
        this.fileList = this.fileUrl;
      }
    }
  },
  computed: {
    isPicture() {
      return this.type == 10;
    }
  },
  methods: {
    // 文件超过大小
    onOversize(file) {
      console.log(file);
      this.$toast("文件大小不能超过 10M");
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
      params.append("file", file.file);
      params.append("id", this.id);
      params.append("type", this.type);
      let config = {
        headers: {
          //添加请求头
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post(api.api_base + "/system/file/uploadFile", params, config)
        .then(({ data }) => {
          console.log(data, "vvvv");
          // var newData = data;
          // alert(this.isPicture)
          if(this.isPicture){
            data.data.isImage=true;
            console.log(data)
            that.fileList = [data.data];
          }else{
            that.fileList = [data.data];
             data.data.url=data.data.name
          }
          
        });
    },
    /**文件删除 */
    beforeDelete(file, detail) {
      let that = this;
      console.log(file, detail);

      this.$http
        .post(api.api_base + "/system/file/deleteFile", {
          ids: file.fileid || file.id
        })
        .then(res => {
          // console.log(res,'删除成功')
          that.fileList.splice(detail.index, 1);
          this.$toast({
            message: res.message
          });
        });
    },
    /* 文件下载 */
    click_preview(file) {
      if (file.fileid) {
        // 第一次上传，预览下载
        window.open(
          `${api.api_base}/system/file/downloadFile?id=${file.fileid}`
        );
      } else {
        window.open(`${api.api_base}/system/file/downloadFile?id=${file.id}`);
      }
    },
    /* 图片预览 */
//     seeImg(){
//       alert(1111)
//       ImagePreview([
//   'https://img.yzcdn.cn/1.jpg',
//   'https://img.yzcdn.cn/2.jpg'
// ]);
//     }
  }
};
</script>

