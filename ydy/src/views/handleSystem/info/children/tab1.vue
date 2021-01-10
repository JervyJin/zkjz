<template>
  <div>
    <div class="title">任务信息:</div>
    <div class="line" v-for="i in 4" :key="i">
      <div class="col">
        <div class="label">任务编码:</div>
        <div class="val">rw159735489</div>
      </div>
      <div class="col">
        <div class="label">任务类型:</div>
        <div class="val">双随机任务 </div>
      </div>
    </div>
    <div class="title">执法对象信息:</div>
    <div class="line" v-for="i in 6" :key="i">
      <div class="col">
        <div class="label">执法对象类型:</div>
        <div class="val">执法对象类型:</div>
      </div>
      <div class="col">
        <div class="label">执法对象名称:</div>
        <div class="val">始祖山</div>
      </div>
    </div>
    <div class="line">
      <div class="col">
        <div class="label">执法对象名称:</div>
        <div class="val">
          <el-checkbox-group v-model="type">
            <el-checkbox label="污水" name="type"></el-checkbox>
            <el-checkbox label="废气" name="type"></el-checkbox>
            <el-checkbox label="噪声" name="type"></el-checkbox>
            <el-checkbox label="固体废物" name="type"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="file_type"
        label="附件类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="file_name"
        label="附件名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="file_size"
        label="附件大小">
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: [],
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
        width: 120px;
      }
      .val{
        min-width: 112px;
      }
    }
  }
</style>