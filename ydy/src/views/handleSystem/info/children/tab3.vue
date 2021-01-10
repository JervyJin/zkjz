<template>
  <div>
    <el-form :model="form" label-width="110px">
      <div class="title">现场检查信息:</div>
      <el-row>
        <el-col :span="11">
          <el-form-item label="检查单位:">
            <el-select v-model="form.resource">
              <el-option label="郑州市生态环境综合行政执法支队"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="执法人:">
            <el-select v-model="form.resource">
              <el-option label="郑州市生态环境综合行政执法支队"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="执法证号:">
            <el-col :span="11">
              <el-input v-model="form.products" placeholder="请输入"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="记录人:">
            <el-select v-model="form.resource">
              <el-option label="郑州市生态环境综合行政执法支队"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="13">
          <el-form-item label="执法证号:">
            <el-col :span="11">
              <el-input v-model="form.products" placeholder="请输入"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="检查开始时间:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="检查结束时间:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="现场检查结论:">
            <el-input type="textarea" v-model="form.resource"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="检查结果:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="是否发现涉嫌环境违法行为:">
            <el-radio-group v-model="form.resource">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      
      <div class="title">现场检查信息:</div>
      <el-row>
        <el-col :span="11">
          <el-form-item label="立案登记时间:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="立案登记号:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="涉嫌违法行为类型:">
            <el-radio-group v-model="form.resource">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="案件名称:">
            XXX有限公司违法行为类型案件
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="案件来源:">
            <el-select v-model="form.resource">
              <el-option label="正常" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="案件简要情况:">
            <el-input type="textarea" v-model="form.resource"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="上传附件:">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList" v-model="form.file" style="width: 100%;">
              <el-button size="small" type="text">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <el-button type="primary">暂存</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: [],
        resource: '',
        products: ''
      },
      tableData: [{
        file_type: 'exc',
        file_name: '',
        file_size: ''
      }, {
        file_type: 'exc',
        file_name: '',
        file_size: ''
      }, {
        file_type: 'exc',
        file_name: '',
        file_size: ''
      }]
    }
  },
  methods: {
    // 上传文件操作
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
  }
}
</script>

<style lang="less" scoped>
  .title{
    margin-top: 24px;
    font-size: 14px;
    color: #333333;
    font-weight: 700;
    line-height: 20px;
  }
  .line{
    display: flex;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    margin-top: 24px;
    .col{
      display: flex;
      margin-right: 310px;
      .label{
        width: 110px;
      }
      .val{
        min-width: 111px;
      }
    }
  }
</style>