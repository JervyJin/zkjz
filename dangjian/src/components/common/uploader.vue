<template>
  <div>
    <div v-if="isPicture">
      <van-uploader
        :after-read="afterRead"
        :before-delete="beforeDelete"
        :max-size="10 * 1024 * 1024"
        @oversize="onOversize"
        @click-preview="seeImg"
        :max-count="1"
        :accept="fileType"
        :disabled="disabled==0"
        v-model="fileList"
        :deletable="disabled==1"
      >
        <!-- <template>
          <van-button type="primary">点击上传</van-button>
        </template> -->
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
        :disabled="disabled==0"
        v-model="fileList"
        :deletable="disabled==1"
      >
        <template>
          <van-button icon="plus" size="small" type="primary">点击上传</van-button>
        </template>
      </van-uploader>
    </div>
  </div>
</template>
<script>
// import url from "@/service/url-config.js";
import api from "@/service/config.js";
import axios from "axios";
import { ImagePreview } from 'vant';
export default {
  created() {
    // console.log(this.id,8888)
  },
  props: {
    id: String,
    fileUrl: Array, //已经上传的文件
    type: Number,
    disabled: {
      type:Number,
      default:0
    },
    fileType: String,
    fileId:String
  },
  data() {
    return {
      fileList: [],
    };
  },
  watch: {
    fileUrl: {
      deep: true,
      immediate: true,
      handler() {
        this.fileList = this.fileUrl;
      },
    },
    id:{
      deep: true,
      immediate: true,
      handler(newName) {
        this.id = newName;
      },
    }
  },
  computed: {
    isPicture() {
      return this.type == 6103;
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
      // let that = this;
      let params = new FormData();
      params.append("files", file.file);
      params.append("userid", this.id);
      params.append("filePid", this.fileId);
      params.append("typeCode", this.type);
      let config = {
        headers: {
          //添加请求头
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .post(api.api_base + "/party/uploadFiles", params, config)
        .then(({ data }) => {
          console.log(data, "vvvv");
          
          if (this.isPicture) {
            data.data[0].isImage = true;
            this.fileList = [data.data];

          } else {
            console.log(data.data[0])
            data.data[0].url = data.data[0].filename;
            this.fileList = [data.data];
            
          }
        });
        // console.log(that.guid,'2222222')
          this.$emit('showguid', this.guid);
    },
    /**文件删除 */
    beforeDelete(file, detail) {
      let that = this;
      console.log(file, detail);
     

      this.$http
        .post(api.api_base + "/party/deleteFile", {
          // id: file[detail.index].fileid,
          id: file instanceof Array ? file[detail.index].fileid : file.fileid,
        })
        .then((res) => {
          // console.log(res,'删除成功')
          that.fileList.splice(detail.index, 1);
          this.$toast({
            message: res.message || res.msg,
          });
        });
    },
    /* 文件下载 */
    click_preview(file) {
      console.log(file,'下载')
      if (file instanceof Array) {
        // 第一次上传，预览下载
        window.open(
          `${api.api_base}/party/download?id=${file[0].fileid}`
        );
      } else {
        window.open(`${api.api_base}/party/download?id=${file.fileid}`);
      }
    },
    /* 图片预览 */
        seeImg(file){
          console.log(file,99999)
         window.open(
          `${api.api_base}/party/previewFile?id=${file.fileid}`
        );
        }
  },
};
</script>

