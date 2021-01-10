<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="110px"
      label-position="left"
    >
      <div class="title">调查取证基本信息:</div>
      <!-- 附件 -->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="upload-style">
            <el-form-item label="文档:">
              <upload
                :id="taskId"
                :type="'9'"
                :limit="10"
                :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
                :fileUrl="fileUrl9"
                @loadSuccess="loadSuccess"
                @delSuccess="delSuccess"
              />
            </el-form-item>
          </div>

        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="upload-style">
            <el-form-item label="视频/音频:">
              <upload
                :id="taskId"
                :type="'11'"
                :limit="10"
                :fileType="'audio/*,video/*'"
                :fileUrl="fileUrl11"
                :formMaxSize="500"
                @loadSuccess="loadSuccess"
                @delSuccess="delSuccess"
              />
            </el-form-item>
          </div>

        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="upload-style">
            <el-form-item label="图片:">
              <upload
                :id="taskId"
                :type="'10'"
                :limit="10"
                :fileUrl="fileUrl10"
                @loadSuccess="loadSuccess"
                @delSuccess="delSuccess"
              />
            </el-form-item>
          </div>

        </el-col>
      </el-row>

      <!--<el-row style="">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="save">提交</el-button>
            &lt;!&ndash;<el-button @click="reset">重置</el-button>&ndash;&gt;
          </el-form-item>
        </el-col>
      </el-row>-->
    </el-form>
  </div>
</template>

<script>
import upload from '@/components/upload.vue'
import url from '@/servers/url-config.js';
export default {
  components: {
    upload
    // Pagination
  },
  props: ['selectRow'],
  data () {
    return {
      form:{},
      editForm:{
        id:'',
      },
      fileObj: {},
      fileUrl9: [],
      fileUrl10: [],
      fileUrl11: [],
      taskId: ''
    }
  },
  created () {
    this.taskId = this.selectRow.id;
    this.getResult()

  },
  methods: {
    // 获取案件结果
    getResult () {
      // 获取附件列表
      this.$ajax(url.selectFileListByPidAndType, {pid: this.taskId, fileType: 9}).then(res => {
        this.fileUrl9 = res.data;
      })
      this.$ajax(url.selectFileListByPidAndType, {pid: this.taskId, fileType: 10}).then(res => {
        this.fileUrl10 = res.data;
      })
      this.$ajax(url.selectFileListByPidAndType, {pid: this.taskId, fileType: 11}).then(res => {
        this.fileUrl11 = res.data;
      })
    },
    // 保存案件结果
    saveResult () {
    },
    save () {
      this.saveResult()
    },
    // 上传成功获取参数 v: {fileid, id}
    loadSuccess(v) {
      console.log(v,8888)
      this.fileObj = v;
      this.editForm.id = v.id;
    },
    delSuccess(v) {
      this.fileObj = null
    },
  }
}
</script>

<style lang="less" scoped>
.title {
  margin-top: 24px;
  margin-bottom: 24px;
  font-size: 14px;
  color: #333333;
  font-weight: 700;
  line-height: 20px;
  text-align: left;
  span {
    cursor: pointer;
    font-weight: 400;
    margin-left: 20px;
    &.active {
      color: #1890ff;
    }
  }
}
  .upload-style {
    font-style: normal;
    min-height: 120px;
  }
</style>
