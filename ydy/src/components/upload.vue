<template>
  <div>
    <div v-if="!isPicture">
      <el-upload
        action
        class="upload-demo"
        :limit="limit"
        :file-list="formFileList"
        :list-type="isPicture ? 'picture-card' : 'text'"
        :on-change="handleUploadForm"
        :on-exceed="formHandleExceed"
        :before-upload="beforeUploadForm"
        :on-remove="formHandleRemove"
        :on-preview="handlePreview"
        :accept="fileType"
        :auto-upload="false"
      >
        <!--  :show-file-list="false"-->
        <i class="el-icon-plus" v-if="isPicture"></i>
        <template v-else>
          <el-button type="primary" :disabled="disabled">点击上传</el-button>
          <i class="tips" >只能上传文档，且大小不能超过{{formMaxSize}}M</i>
        </template>
        <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>
    </div>
    <!--图片上传组件（带有缩略图）。这里分离了出来，如果和非图片组件写在一起有问题。-->
    <div v-else>
      <el-upload
        action="#"
        class="upload-demo"
        :limit="limit"
        list-type="picture-card"
        :file-list="formFileList"
        :on-change="handleUploadForm"
        :on-exceed="formHandleExceed"
        :before-upload="beforeUploadForm"
        :accept="fileType"
        :auto-upload="false"
        >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="formHandleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
        </div>
      </el-upload>
    </div>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="图片">
    </el-dialog>
  </div>
</template>
<script>
import url from '@/servers/url-config.js'
import {root} from '@/servers/url-config.js'
import Vue from 'vue'
export default {
  props: {
    id: {  // 业务id
      default: '',
      type: String
    },
    type: {  // 文件code
      default: 'GG',
      type: String
    },
    fileUrl: {  // 文件数组
      default: [],
      type: Array
    },
    fileType: {  // 限制文件类型
      default: 'image/*',
      type: String
    },
    limit: {  // 限制文件个数
      default: 1,
      type: Number
    },
    formMaxSize: {
      default: 10,
      type: Number
    },
  },
  computed: {
    user() {
      return this.$store.state.users.user || JSON.parse(sessionStorage.getItem('user'));
    },
    isYb() {
      return this.$route.path.indexOf('ybrw') > -1
    },
    isPicture () {
      return (this.type == 1 || this.type == 10 || this.type == 3);
    }
  },
  created() {
    // this.$emit('disabled', this.disabled)
  },
  data() {
    return {
      formFileList: [], // 显示上传文件
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      data: null,
    };
  },
  watch: {
    fileUrl: {
      deep: true,
      immediate: true,
      handler () {
        this.formFileList = this.fileUrl;
      }
    }
  },
  methods: {

    handlePreview(file) {
      console.log(file,999999)
      if (this.isPicture){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      } else {
        this.dialogVisible = false; //文件不许预览
        // 文件允许下载
        if (file.fileid) {
          // 第一次上传，预览下载
          window.open(`${root}/system/file/downloadFile?id=${file.fileid}`)
        } else {
          window.open(`${root}/system/file/downloadFile?id=${file.id}`)
        }
      }
    },

    // 开始上传前验证
    beforeUploadForm(file) {
      // 验证文件大小
      if (file.size / 1024 / 1024 > this.formMaxSize) {
        this.$message({
          message: `上传文件大小不能超过${this.formMaxSize}M!`,
          type: "warning"
        });
        return false;
      }
      // 中文乱码处理
      // if (file.raw) {
      //   let reader = new FileReader(); // 读取文件内容
      //   reader.readAsText(file.raw, "gb2312"); // 防止中文乱码问题，不加reader.onload方法都不会触发
      //   reader.onload = function(e) {
      //     this.contentHtml = e.target.result; // txt文本内容，接下来就可以对其进行校验处理了
      //   };
      // }
      // // 验证文件类型
      // var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      // const extension =
      //   testmsg === "xlsx" || testmsg === "xls" || testmsg === "csv";
      // if (!extension) {
      //   this.$message({
      //     message: "上传文件只能是xlsx/xls/csv格式!",
      //     type: "warning"
      //   });
      // }
      // return extension;
    },
    // 移除上传列表中文件
    formHandleRemove(file, formFileList) {
      if(!this.id) {  // 新增
        return;
      };
      let that = this;
      this.$ajax(url.deleteFile, {ids: file.fileid || file.id}).then(res => {
        if (res.success) {
          that.$message({
            type: 'success',
            message: res.message
          });
          this.$emit('delSuccess', this.data)
          this.data = null;
          that.formFileList.splice(that.formFileList.indexOf(file), 1)
          /*for (let i = 0; i < that.formFileList.length; i++) {
            if (that.formFileList[i].pname === file.name) {
              that.formFileList.splice(i, 1);
              break;
            }
          }*/
          // that.formFileList.splice(formFileList.indexOf(file), 1);
        } else {
          // that.formFileList = [];
          that.$message({
            type: 'info',
            message: res.message
          });
        }
      });
    },
    // 允许上传文件个数验证
    formHandleExceed(files, formFileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + formFileList.length} 个文件`
      );
    },
    // 图片点击下载
    handleDownload(file) {
      this.dialogVisible = false; //文件不许预览
      // 文件允许下载
      if (file.fileid) {
        // 第一次上传，预览下载
        window.open(`${root}/system/file/downloadFile?id=${file.fileid}`)
      } else {
        window.open(`${root}/system/file/downloadFile?id=${file.id}`)
      }
    },
    // 上传文件
    handleUploadForm(file) {
      // 验证文件大小
      if (file.size / 1024 / 1024 > this.formMaxSize) {
        this.formFileList = [];
        this.$message({
          message: `上传文件大小不能超过${this.formMaxSize}M!`,
          type: "warning"
        });
        return false;
      }
      let that = this;
      let formData = new FormData();
      formData.append("userId", this.user.id || '123'); // 用户id
      formData.append("id", this.id); // 业务id
      formData.append("type", this.type); // 业务id
      formData.append("file", file.raw);
      let loading = that.$loading({
        lock: true,
        text: "上传中，请稍候...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      Vue.http.post(url.uploadFile, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then(({data}) => {
          if (data.success) {
            that.$message({
              type: 'success',
              message:"上传文件成功，" + data.message
            });

            that.formFileList = that.formFileList.push(data.data);
            console.log(this.formFileList, 'this.formFileList')
            that.$emit('loadSuccess', data.data)
            // that.formFileList = [];
          } else {
            that.formFileList = that.formFileList;
            that.$message({
              type: 'info',
              message:"上传文件失败，" + data.message
            });
          }
          loading.close();
        });
    }
  }
};
</script>

<style lang="less" scoped>
  .avatar-uploader,.el-upload {
    width: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .tips {
    font-size: 10px;
    color: #F56C6C;
  }
</style>
