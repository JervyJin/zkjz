<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>双随机任务</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :inline="true" :model="formInline" ref="form" :rules="rules">
      <el-form-item label="对象所属区域：" prop="areacode">
        <el-select v-model="formInline.areacode" @change="handleChange">
          <el-option :label="v.name" :value="v.id" v-for="v in dicts.areaOptions" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执法任务类型：">
        <el-input v-model="formInline.tasktype" placeholder="执法任务类型" readonly></el-input>
      </el-form-item>
      <el-form-item label="紧急程度:" prop="urgency">
        <el-select v-model="formInline.urgency" placeholder="紧急程度">
          <el-option :label="v.name" :value="v.code" v-for="v in dicts.urgency" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="要求完成日期：" prop="requirefinishtime">
        <el-date-picker type="datetime" placeholder="完成日期"
          v-model="formInline.requirefinishtime"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>

    <el-row :gutter="20">
      <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-transfer 
          v-model="formInline.ids" 
          :data="data"
          :props="{
            key: 'value',
            label: 'title'
          }"
          filterable
          :titles="['待选执法对象', '已选执法对象']"
        ></el-transfer>
      </el-col>
      <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-transfer 
          v-model="formInline.userInfo" 
          :data="dataPers" 
          :props="{
            key: 'value',
            label: 'title'
          }"
          filterable
          :titles="['待选执法人员', '已选执法人员']"
        ></el-transfer>
      </el-col>
    </el-row>

    <div class="btns">
      <el-button type="primary" @click="create">立即创建双随机任务</el-button>
      <el-button type="default" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
export default {
  data() {
    return {
      formInline: {
        areacode: '',
        tasktype: '双随机',
        urgency: '1',
        requirefinishtime: '',
        ids: [],
        userInfo: []
      },
      dicts: {
        areaOptions: [],
        urgency: []
      },

      data: [],
      dataPers: [],

      rules: {
        areacode: [{ required: true, message: '区域不存在', trigger: 'blur'}],
        urgency: [{ required: true, message: '紧急程度不存在', trigger: 'blur'}],
        requirefinishtime: [{ required: true, message: '要求完成时间不存在', trigger: 'blur'}]
      }
    }
  },
  created() {
    this.getDictData(5, 'urgency');
    this.getArea();
  },
  methods: {
    // 获取字典树
    getDictData(type, arr) {
      this.$ajax(url.getDictOption, {
        type: type
      }).then(res => {
        this.dicts[arr] = res;
      })
    },
    // 获取区域
    getArea() {
      this.$ajax(url.getArea, {}).then(res => {
        if(res.success) {
          this.dicts.areaOptions = res.data;
        }
      })
    },
    // 选择执法对象
    selectByAreacode(v) {
      this.$ajax(url.selectByAreacode, {areacode: v}).then(res => {
        if(res.success) {
          this.data = res.data || [];
        }
      })
    },
    // 选择人员
    selectUserInfoByAreacode(v) {
      this.$ajax(url.selectUserInfoByAreacode, {areacode: v}).then(res => {
        if(res.success) {
          this.dataPers = res.data || [];
        }
      })
    },
    handleChange(v) {
      this.selectByAreacode(v);
      this.selectUserInfoByAreacode(v);
    },
    // 重置
    reset() {
      this.formInline = {
        areacode: '',
        tasktype: '双随机',
        urgency: '1',
        requirefinishtime: '',
        ids: [],
        userInfo: []
      };
    },
    // 立即创建
    create() {
      this.$refs.form.validate((valid) => {
        console.log(valid, '000')
        if(valid) {
          if(!this.formInline.ids.length || !this.formInline.userInfo.length) {
            this.$message({
              type: 'info',
              message: '选择执法对象及执法人员！'
            })
            return;
          }
          let form = JSON.parse(JSON.stringify(this.formInline));
          form.ids = form.ids.join();
          form.userInfo = form.userInfo.join();
          form.requirefinishtime = formatDateToStr(form.requirefinishtime);
          form.tasktype = 2;
          this.$ajax(url.addDoubleRandom, form).then(res => {
            if(res.code == '200') {
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
              this.$router.push('/zfxt/dbrw');
            }
          })
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .page {
    max-height: 100vh;
    overflow-y: auto;
    /deep/ .el-col-xs-24{
      margin-top: 20px;
    }
    /deep/ .el-transfer-panel {
      width: 35%;
    }
    /deep/ .el-transfer-panel__body{
      height: 500px;
    }
    /deep/ .el-transfer-panel__list.is-filterable{
      height: 440px;
    }
  }
  .btns{
    margin-top: 80px;
    text-align: center;
  }
</style>