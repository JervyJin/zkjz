<template>
  <div>
    <el-form
      :rules="rules"
      ref="form"
      :model="form"
      label-width="110px"
      label-position="left"
    >
      <div class="title">行政处罚基本信息:</div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

          <el-form-item  label="立案时间:" prop="registerDate">
            <!-- <div class="val" >{{ form.registerDate }}</div> -->
            <el-date-picker

              type="date"
              placeholder="选择日期"
              v-model="form.registerDate"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="办结时间:" prop="finishDate">
            <!-- <div class="val" >{{ form.finishDate }}</div> -->
            <el-date-picker

              type="date"
              placeholder="选择日期"
              v-model="form.finishDate"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="处罚结论:" prop="conclusion">
            <!-- <div class="val" >{{ form.conclusion }}</div> -->
            <el-input
              type="textarea"

              v-model="form.conclusion"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>



      <!-- 附件 -->
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="案件结果检测报告:">
            <upload
              :id="editForm.id"
              :type="'4'"
              :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
              :fileUrl="fileUrl4"
              @loadSuccess="loadSuccess"
              @delSuccess="delSuccess"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="案件调查终结报告:">
            <upload
              :id="editForm.id"
              :type="'5'"
              :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
              :fileUrl="fileUrl5"
              @loadSuccess="loadSuccess"
              @delSuccess="delSuccess"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="行政处罚相关报告:">
            <upload
              :id="editForm.id"
              :type="'6'"
              :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
              :fileUrl="fileUrl6"
              @loadSuccess="loadSuccess"
              @delSuccess="delSuccess"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="缴费通知报告:">
            <upload
              :id="editForm.id"
              :type="'7'"
              :fileType="'application/msexcel,application/msword,application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain'"
              :fileUrl="fileUrl7"
              @loadSuccess="loadSuccess"
              @delSuccess="delSuccess"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin: 48px 0 40px">
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="save">提交</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import upload from '@/components/upload.vue'
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
import {validEmptySpace, validPhone, validIdCard} from '@/utility/limitFrom';
export default {
  components: {
    upload
    // Pagination
  },
  props: ['selectRow'],
  computed: {
    isYb() {
      return (this.$route.path.indexOf('ybrw') > -1) || (this.$route.path.indexOf('rwcx') > -1 && this.selectRow.isHandle === 'Y')
    }
  },
  data() {
    return {
      form:{
        registerDate:'',
        finishDate:'',
        conclusion:'',
        taskId:this.selectRow.id
      },
      editForm:{
        id:'',
      },
      fileObj: {},
      fileUrl4: [],
      fileUrl5: [],
      fileUrl6: [],
      fileUrl7: [],
      rules: {
        registerDate: [
          { required: true, message: '立案时间不存在', trigger: 'change'}
        ],
        finishDate: [
          { required: true, message: '办结时间不存在', trigger: 'change'}
        ],
        conclusion: [{ required: true, message: '处罚结论不存在', trigger: 'change'},
          { type: 'string', max: 200, message: '处罚结论(最多200字)', trigger: 'change'},
          { validator: validEmptySpace, trigger: 'change' }
        ],


      }

    }
  },
  created() {
    this.getResult()

  },
  methods: {
    // 获取案件结果
    getResult() {
      this.$ajax(url.getResult, {taskId: this.selectRow.id}).then(res => {
        if(res.success) {
          if (res.data) {
            this.form=res.data;
            this.editForm.id = res.data.id;
            // 获取附件列表
            this.$ajax(url.selectFileListByPidAndType, {pid: this.editForm.id,fileType:4}).then(res => {
              console.log(res);
              this.fileUrl4 = res.data;
            })
            this.$ajax(url.selectFileListByPidAndType, {pid: this.editForm.id,fileType:5}).then(res => {
              console.log(res);
              this.fileUrl5 = res.data;
            })
            this.$ajax(url.selectFileListByPidAndType, {pid: this.editForm.id,fileType:6}).then(res => {
              console.log(res);
              this.fileUrl6 = res.data;
            })
            this.$ajax(url.selectFileListByPidAndType, {pid: this.editForm.id,fileType:7}).then(res => {
              console.log(res);
              this.fileUrl7 = res.data;
            })
          }
        }
      })
    },
    // 保存案件结果
    saveResult() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.registerDate = formatDateToStr(this.form.registerDate);
          this.form.finishDate = formatDateToStr(this.form.finishDate);
          this.form.id = this.editForm.id;
            this.$ajax(url.saveResult, this.form).then(res => {
        if(res.success) {
          this.$message({
                type: 'success',
                message: res.message
              })
              this.$router.push('/zfxt/dbrw');
            } else {
              this.$message({
                type: 'info',
                message: res.message
              })
        }
      })
          } else {
            return false;
          }
      })

    },
    save(){
      this.saveResult()
    },
    reset() {
      this.$refs.form.resetFields();
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
  margin-bottom: 12px;
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
</style>
