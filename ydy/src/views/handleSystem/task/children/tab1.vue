<template>
  <div class="page1">
    <div class="title">任务信息:</div>
    <el-form label-position="left" :model="selectRow" label-width="160px">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="任务类型:">
            <div class="val">{{selectRow.taskTypeName}}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="派发日期:">
            <div class="val">{{selectRow.dispatchDate}}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="任务名称:">
            <div class="val">{{selectRow.taskName}}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="主要内容:">
            <div class="val">{{selectRow.taskComment}}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="紧急程度:">
            <div class="val">{{selectRow.urgencyName}}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="要求完成时间:">
            <div class="val">{{selectRow.requireFinishTime}}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="案件来源:">
            <div class="val">{{selectRow.caseSourceName}}</div>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <div class="title">执法对象信息:</div>
    <el-form label-position="left" ref="form" :model="form" label-width="160px">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法对象类型:">
            <div class="val">{{selectRow.legalobjTypeName}}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="执法对象名称:">
            <div class="val">{{selectRow.legalObjName}}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="地址(住址):" prop="address">
            <div class="val">{{form.address}}</div>
            <!--<div class="val" v-if="isYb">{{form.address}}</div>
            <el-input v-else v-model="form.address" placeholder="详细地址" ></el-input>-->
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="邮政编码:" prop="zipCode">
            <div class="val">{{form.zipCode}}</div>
            <!--<div class="val" v-if="isYb">{{form.zipCode}}</div>
            <el-input v-else v-model="form.zipCode" placeholder="邮政编码" ></el-input>-->
          </el-form-item>
        </el-col>
        <div v-if="selectRow.legalobjType === '6'">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="公民身份证号:" prop="businessNo">
              <div class="val">{{form.businessNo}}</div>
              <!--<div class="val" v-if="isYb">{{form.businessNo}}</div>
              <el-input v-else v-model="form.businessNo" placeholder="公民身份证号"></el-input>-->
            </el-form-item>
          </el-col>
        </div>
        <!--<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="组织机构代码（行业）:" prop="organizationCode">
            <div class="val" v-if="isYb">{{form.organizationCode}}</div>
            <el-input v-else v-model="form.organizationCode" placeholder="组织机构代码（行业）"></el-input>
          </el-form-item>
        </el-col>-->
        <div v-if="selectRow.legalobjType && selectRow.legalobjType !== '6'">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="社会信用代码:" prop="creditCode">
              <div class="val">{{form.creditCode}}</div>
              <!--<div class="val" v-if="isYb">{{form.creditCode}}</div>
              <el-input v-else v-model="form.creditCode" placeholder="社会信用代码"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="法定代表人:" prop="legalPerson">
              <div class="val">{{form.legalPerson}}</div>
              <!--<div class="val" v-if="isYb">{{form.legalPerson}}</div>
              <el-input v-else v-model="form.legalPerson" placeholder="法定代表人"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="职务:" prop="duty">
              <div class="val">{{form.duty}}</div>
              <!--<div class="val" v-if="isYb">{{form.duty}}</div>
              <el-input v-else v-model="form.duty" placeholder="职务"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <el-form-item label="联系电话:" prop="phone">
              <div class="val">{{form.phone}}</div>
              <!--<div class="val" v-if="isYb">{{form.phone}}</div>
              <el-input v-else v-model.number="form.phone" placeholder="联系电话"></el-input>-->
            </el-form-item>
          </el-col>
        </div>
      </el-row>

      <!--<el-form-item style="margin:48px 0 40px" v-if="!isYb">
        <el-button type="primary" @click="saveForm" >保存</el-button>
        <el-button type="default" @click="reset">重置</el-button>
      </el-form-item>-->

    </el-form>

  </div>
</template>

<script>
import url from '@/servers/url-config.js';
export default {
  props: ['selectRow'],
  computed: {
    isYb() {
      return (this.$route.path.indexOf('ybrw') > -1) || (this.$route.path.indexOf('rwcx') > -1 && this.selectRow.isHandle === 'Y')
    }
  },
  data() {
    return {
      form: {
        zipCode: '',
        address: '',
        businessNo: '',
        organizationCode: '',
        creditCode: '',
        legalPerson: '',
        duty: '',
        phone: '',
        source: '',
        objectName: '',
        objectType: '',
        id: ''
      },
      /*rules: {
        address: [{ required: true, message: '地址（住址）不存在', trigger: 'blur'}],
        zipCode: [{ required: true, message: '邮政编码不存在', trigger: 'blur'}],
        businessNo: [{ required: true, message: '公民身份证号不存在', trigger: 'blur'}],
        organizationCode: [{ required: true, message: '组织机构代码（行业）不存在', trigger: 'blur'}],
        creditCode: [{ required: true, message: '社会信用代码不存在', trigger: 'blur'}],
        legalPerson: [{ required: true, message: '法定代表人不存在', trigger: 'blur'}],
        duty: [{ required: true, message: '职务不存在', trigger: 'blur'}],
        phone: [
          {required: true, message: '请填写联系电话',trigger: 'blur'},
        ]
      }*/
    }
  },
  created() {
    // this.getLegalObject();
    // if(this.isYb) { // 已办回显
      this.getPreInfo();
    // }
  },
  methods: {
    getPreInfo() {
      this.$ajax(url.getDoneLegalObject, {taskId: this.selectRow.id}).then(res => {
        if(res.success) {
          if(!res.data) return;
          let data = res.data;
          if(!data.id) return;
          this.form = {...this.form, ...data};
          this.selectRow.address = this.form.address || '';
          this.selectRow.zipCode = this.form.zipCode || '';
          this.selectRow.legalPerson = this.form.legalPerson || '';
        }
      })
    },
    getLegalObject() {
      this.$ajax(url.getLegalObject, {taskId: this.selectRow.id}).then(res => {
        this.form.source = res.source;
        this.form.id = res.id;
        this.form.objectName = res.objectName;
        this.form.objectType = res.objectType;
      })
    },
    reset() {
      this.$refs.form.resetFields();
    },
    saveForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.id = this.selectRow.legalObjId;
          this.$ajax(url.saveLegalObject, this.form).then(res => {
            if(res.success) {
              this.$message({
                type: 'success',
                message: res.message
              });
              this.$emit('saveTab', 'second')
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
  .title{
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 14px;
    color: #333333;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
  }
  .val {
    color: #666;
  }
</style>
