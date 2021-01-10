<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务派发</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="side">
    <el-form label-position="left" ref="form" :rules="rules" :model="form" label-width="110px">
      <!-- <el-form-item label="任务编码:" prop="code">
        <el-input v-model="form.code" readonly></el-input>
      </el-form-item> -->
      <el-form-item label="案件所属区域:" prop="areaCode">
        <el-select v-model="form.areaCode" @change="handleChange" ref="areaCode">
          <el-option :label="v.name" :value="v.id" v-for="v in dicts.areaOptions" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执法对象类型:" prop="legalobjType">
        <el-select v-model="form.legalobjType" placeholder="请选择执法对象类型">
          <el-option :label="v.name" :value="v.code" v-for="v in dicts.legalobjType" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="执法对象:" prop="legalObjName">
        <div style="display: flex">
          <el-autocomplete
            v-model="form.legalObjName"
            :fetch-suggestions="getLegalObjectLikeName"
            placeholder="请输入内容"
            @select="handleSelect"
            style="width: 100%"
          ></el-autocomplete>
          <el-button type="primary" v-if="isShowButton" @click="addLegalObject()" style="margin-left: 20px">新增执法对象</el-button>
        </div>
      </el-form-item>
      <el-form-item label="任务类型:" prop="taskType">
        <el-select v-model="form.taskType" placeholder="请选择任务类型">
          <el-option :label="v.name" :value="v.code" v-for="v in dicts.taskType" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="派发日期:" prop="dispatchDate">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.dispatchDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="任务名称:" prop="taskName">
        <el-input v-model="form.taskName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="主要内容:" prop="taskComment">
        <el-input type="textarea" v-model="form.taskComment" placeholder="请输入内容" :rows="4" maxlength="500"
  show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="案件来源:" prop="caseSource">
        <el-select v-model="form.caseSource" placeholder="请选择案件来源">
          <el-option :label="v.name" :value="v.code" v-for="v in dicts.caseSourceList" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="紧急程度:" prop="urgency">
        <el-select v-model="form.urgency" placeholder="请选择紧急程度">
          <el-option :label="v.name" :value="v.code" v-for="v in dicts.urgency" :key="v.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="要求完成日期:" prop="requireFinishTime">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.requireFinishTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
          <el-form-item label="主办人:" prop="sponsor">
            <el-input placeholder="选择主办人" v-model="form.sponsor.name" @focus="showUsers(1);"></el-input>
          </el-form-item>
        <el-form-item label="协办人:" prop="cosponsor">
          <el-input placeholder="选择协办人" v-model="form.cosponsor.name" @focus="showUsers(2);"></el-input>
        </el-form-item>
        <!-- <el-col :span="2">
          <el-button type="text" icon="el-icon-plus">新增协办人</el-button>
        </el-col> -->
      <el-form-item style="margin:10px 0 140px" >
        <el-button type="primary" @click="submitForm('form')">派发</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>

    <el-dialog :width="'70%'" :title="title" :visible.sync="showUsersVisible" @click='showUsersVisible=false;'>
      <div class="flexbox">
        <div class="left">
          <!-- show-checkbox  -->
          <el-tree ref="tree" :data="user.orgs" :props="user.defaultMenusProps" :default-checked-keys="user.checkmenu" node-key="id" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="right">
          <!--列表-->
          <el-table :data="user.userData" ref="userTable" highlight-current-row v-loading="user.loading" border element-loading-text="拼命加载中" style="width: 100%;" @selection-change="handleSelectionChange" @current-change="selectUser">
            <el-table-column align="center" type="selection" width="50" v-if="isSponsor == 2">
            </el-table-column>
            <el-table-column align="center" sortable prop="username" label="用户名" width="120" >
            </el-table-column>
            <el-table-column align="center" sortable prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="orgId" label="部门" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="workTelphone" label="手机号" width="120">
            </el-table-column>
            <el-table-column align="center" sortable prop="gender" label="性别" min-width="50">
            </el-table-column>
            <el-table-column align="center" sortable prop="email" label="邮件" min-width="120">
            </el-table-column>
          </el-table>
        </div>

      </div>

      <div slot="footer" class="dialog-footer">
        <!-- 分页组件 -->
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :current-page="orgForm.pageIndex"
        :page-size="orgForm.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :total="pageparm.total">
      </el-pagination>
        <div class="buttons">
          <el-button @click="showUsersVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleUsersEnsure">确 定</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="showLegalObjDialog" title="新增" width="35%">
      <div class="form-wrapper">
        <el-form label-width="133px" :model="editForm" ref="editForm" :rules="legalFormRules">
          <el-form-item label="执法对象类型:" prop="objectType">
            <el-select v-model="editForm.objectType" placeholder="请选择执法对象类型">
              <el-option :label="v.name" :value="v.code" v-for="v in dicts.legalobjType" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="addObjectName" prop="objectName">
            <el-input v-model="editForm.objectName" auto-complete="off" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="地址:" prop="address">
            <el-input v-model="editForm.address" auto-complete="off" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="区域:" prop="areaCode">
            <el-select v-model="editForm.areaCode">
              <el-option :label="v.name" :value="v.id" v-for="v in dicts.areaOptions" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="执法对象类型:" prop="objectType">
            <el-select v-model="editForm.objectType" placeholder="请选择执法对象类型">
              <el-option :label="v.name" :value="v.code" v-for="v in dicts.legalobjType" :key="v.id"></el-option>
            </el-select>
          </el-form-item>-->
          <div v-if="editForm.objectType === '6'">
            <el-form-item label="公民身份证号码:" prop="businessNo">
              <el-input v-model="editForm.businessNo" auto-complete="off" placeholder="请输入公民身份证号码"></el-input>
            </el-form-item>
          </div>
          <div v-if="editForm.objectType && editForm.objectType !== '6'">
            <el-form-item label="社会统一信用代码:" prop="creditCode">
              <el-input v-model="editForm.creditCode" auto-complete="off" placeholder="请输入社会统一信用代码"></el-input>
            </el-form-item>
            <el-form-item label="法定代表人（负责人）:" prop="legalPerson">
              <el-input v-model="editForm.legalPerson" auto-complete="off" placeholder="法定代表人（负责人）"></el-input>
            </el-form-item>
            <el-form-item label="职务:" prop="duty">
              <el-input v-model="editForm.duty" auto-complete="off" placeholder="请输入职务"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" prop="phone">
              <el-input v-model="editForm.phone" auto-complete="off" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码:" prop="zipCode">
              <el-input v-model="editForm.zipCode" auto-complete="off" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click='closeDialog("edit")'>取消</el-button>
        <el-button type="primary" class="title" @click="submitLegalForm('editForm')">保存</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
import {validEmptySpace, validYouBian, validPhone} from '@/utility/limitFrom';
export default {
  data() {
    // 对空格字符做校验
    let checkContent = (rule, value, callback) => {
      if (value.replace(/\s*/g, '').length === 0) {
        callback(new Error('内容不能为空'));
      } else {
        callback();
      }
    };
    return {
      fileList: [],
      form: {
        legalobjType: '',
        legalObjName: '',
        legalObjId: '',
        taskType: '',
        dispatchDate: new Date(),
        taskName: '',
        taskComment: '',
        caseSource: '',
        urgency: '',
        requireFinishTime: '',
        sponsor: '',
        cosponsor: '',
        areaCode: '',
        areaName: '',
        // file: ''
      },
      rules: {
        sponsor: [{ required: true, message: '主办人不存在', trigger: 'change'}],
        cosponsor: [{ required: true, message: '协办人不存在', trigger: 'change'}],
        areaCode: [{ required: true, message: '所属区域不存在', trigger: 'change'}],
        legalobjType: [{ required: true, message: '执法对象类型不存在', trigger: 'change'}],
        legalObjName: [
          { required: true, message: '执法对象不存在', trigger: 'change'},
          { validator: checkContent, trigger: 'change' }
        ],
        taskType: [{ required: true, message: '任务类型不存在', trigger: 'change'}],
        dispatchDate: [{ type: 'date', required: true, message: '派发日期不存在', trigger: 'change'}],
        taskName: [
          { required: true, message: '任务名称不存在', trigger: 'change'},
          { validator: checkContent, trigger: 'change' },
          { type: 'string', max: 30, message: '最多30字', trigger: 'change'}
        ],
        taskComment: [
          { required: true, message: '主要内容不存在', trigger: 'change'},
          { validator: checkContent, trigger: 'change' }
        ],
        urgency: [{ required: true, message: '紧急程度不存在', trigger: 'change'}],
        caseSource: [{ required: true, message: '案件来源不存在', trigger: 'change'}],
        requireFinishTime: [{ type: 'date', required: true, message: '要求完成时间不存在', trigger: 'change'}]
      },
      dicts: {
        taskType: [],
        legalobjType: [],
        urgency: [],
        areaOptions: [],
        caseSourceList: [],
      },
      isSponsor: 0,
      showUsersVisible: false,
      title: '选择用户',
      selectedUser: null,
      user: {
        loading: false,
        orgs: [],
        defaultMenusProps: {
          children: 'children',
          label: 'name'
        },
        checkmenu: [],
        userData: [],

      },
      orgForm: {
        pageIndex: 1,
        pageSize: 10,
        orgId: '',
      },
      pageparm: {
        total: 10
      },
      // 是否显示新增执法对象管理按钮
      isShowButton: false,
      // 控制显示新增弹框
      showLegalObjDialog: false,
      // 维护新增执法对象管理表单信息
      editForm: {
        objectName: '',
        address: '',
        areaCode: '',
        objectType: '',
        creditCode: '',
        businessNo: '',
        legalPerson: '',
        duty: '',
        phone: '',
        zipCode: ''
      },
      // 表单校验
      legalFormRules: {
        objectName: [
          { required: true, message: '请输入姓名', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        areaCode: [
          { required: true, message: '请输入区域', trigger: 'change' }
        ],
        objectType: [
          { required: true, message: '请输入执法对象类型', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        businessNo: [
          { required: true, message: '请输入公民身份证号码', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        creditCode: [
          { required: true, message: '请输入社会统一信用代码', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        legalPerson: [
          { required: true, message: '请输入法定负责人', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        duty: [
          { required: true, message: '请输入职务', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' },
          { validator: validPhone, trigger: 'change' }
        ],
        zipCode: [
          { required: true, message: '请输入邮政编码', trigger: 'change' },
          { validator: validEmptySpace, trigger: 'change' },
          { validator: validYouBian, trigger: 'change' }
        ],
      },
    }
  },
  computed: {
    addObjectName () {
      if (this.editForm.objectType === '6') {
        return '姓名:';
      } else {
        return '名称:'
      }
    },
    set_rwpfRow(){
      return this.$store.state.task.set_rwpfRow;
    }
  },
  created() {
    console.log(this.set_rwpfRow,55555)
    this.$router.beforeEach((to,from,next)=>{
  // console.log(to);
  // console.log(from);
  let fullPath = from.fullPath
  if(fullPath=='/analyse/ydwryajts') {
    this.form.areaName = this.set_rwpfRow.ssqymc
  }
  next();
})
    this.getUserData();
    this.getOrgTree();
    this.getDictData(3, 'taskType');
    this.getDictData(4, 'legalobjType');
    this.getDictData(5, 'urgency');
    this.getDictData(13, 'caseSourceList');
    this.getArea();
  },
  methods: {
    showUsers(v) {
      this.showUsersVisible = true;
      this.isSponsor = v;
    },
    // 模糊匹配
    getLegalObjectLikeName(queryString, cb) {
      // 必选先选择执法对象类型
      if (!this.form.legalobjType) {
        this.$message({
          type: 'warning',
          message: '请先选择执法对象类型'
        })
        return false;
      }
      this.$ajax(url.getLegalObjectLikeName, {objectName: queryString, objectType: this.form.legalobjType}).then(res => {
        if(res.success) {
          if (!res.data.length) {
            this.isShowButton = true;
          } else {
            this.isShowButton = false;
          }
          let data = []
          res.data.forEach(v => {
            let o = {};
            o.value = v.objectName;
            o.id = v.id;
            data.push(o);
          })
          cb(data);
        }
      })
    },
    handleSelect(v) {
      this.form.legalObjId = v.id;
    },
    getArea() {
      this.$ajax(url.getArea, {}).then(res => {
        if(res.success) {
          this.dicts.areaOptions = res.data;
        }
      })
    },
    // 获取字典树
    getDictData(type, arr) {
      this.$ajax(url.getDictOption, {
        type: type
      }).then(res => {
        // 任务类型去掉双随机任务
        if (type === 3) {
          this.dicts[arr] = res.filter((item) => {
            return item.code !== '2';
          })
        } else {
          this.dicts[arr] = res;
        }
      })
    },
    //获取组织树
    getOrgTree() {
      this.$ajax(url.getOrgTree, {}).then(res => {
        this.user.orgs = res.data;
      })
    },
    // 获取数据方法
    getUserData() {
      this.user.loading = true;
      this.$ajax(url.getUserAndEnforcenumIsNotNull, this.orgForm).then(res => {
        this.user.loading = false;
        this.user.userData = res.data.list;
        this.pageparm.total = res.data.total;
      })
      // this.$ajax(url.getUsers, {}).then(res => {
      //   this.user.loading = false;
      //   this.user.userData = res.data.list.length ? res.data.list : [];
      // })
    },
    handleChange(v) {
      this.form.areaName = this.dicts.areaOptions.find(val => val.id == v).name;
    },
    handleNodeClick(row) {
      this.orgForm.orgId = row.id;
      this.getUserData();
    },
    handleUsersEnsure() {
      if(!this.selectedUser) {
        this.$message({
          type: 'info',
          message: '请选择人员！'
        })
        return;
      }
      if(this.isSponsor == 1) {
        this.form.sponsor = this.selectedUser;
      }
      if(this.isSponsor == 2) {
        this.form.cosponsor = {
          name: this.selectedUser.length && this.selectedUser.map(v => v.name).join() || '',
          id: this.selectedUser.length && this.selectedUser.map(v => v.id).join() || ''
        }
      }
      this.showUsersVisible = false;
      this.selectedUser = null;
      this.$refs.userTable.setCurrentRow();
      this.$refs.userTable.clearSelection();
      // 这个地方是解决：去勾选协办人时，表单没有校验出错误。
      if (this.form.cosponsor.id === '') {
        this.form.cosponsor = '';
      }
    },
    // 单选
    selectUser(row) {
      this.selectedUser = row;
    },
    // 多选
    handleSelectionChange(rows) {
      this.selectedUser = rows;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.form.cosponsor.id.indexOf(this.form.sponsor.id) !== -1) {
            this.$message({
              type: 'warning',
              message: '主办人、协办人不能是同一个人'
            })
            return;
          }
          if (!this.form.legalObjId) {
            let legalObjectList = [];
            let legalObjectData;
            this.$ajax(url.getLegalObjectLikeName, {objectName: '', objectType: this.form.legalobjType}).then(res => {
              if (res.success) {
                legalObjectList = res.data;
                legalObjectData = legalObjectList.find((item) => {
                  return item.objectName === this.form.legalObjName
                });
                if (!legalObjectData) {
                  this.$message({
                    type: 'warning',
                    message: '执法对象不存在，请添加'
                  })
                  return false;
                } else {
                  this.form.legalObjId = legalObjectData.id;
                  this.submitData();
                }
              }
            });
          } else {
            this.submitData();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.form.dispatchDate = new Date();
    },
    addLegalObject () {
      this.showLegalObjDialog = true;
      setTimeout(() => {
        this.$refs['editForm'].resetFields();
      }, 10);
    },
    closeDialog () {
      this.showLegalObjDialog = false;
    },
    submitData () {
      let data = {...this.form};
      data.dispatchDate = formatDateToStr(data.dispatchDate);
      data.requireFinishTime = formatDateToStr(data.requireFinishTime);
      // data.areaCode = data.areaCode[1]
      // data.areaName = this.$refs.areaCode.presentText.split(' / ')[1];

      data.sponsor = data.sponsor.id;
      data.cosponsor = data.cosponsor.id;
      this.$ajax(url.addTask, data).then(res => {
        if(res.success) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.$router.push('/zfxt/dbrw')
        } else {
          this.$message({
            type: 'info',
            message: res.message
          })
        }
      })
    },
    // 保存新增的执法对象管理
    submitLegalForm (editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          let queryPram;
          // 选择的是 “个人”
          if (this.editForm.objectType === '6') {
            queryPram = {
              objectName: this.editForm.objectName,
              address: this.editForm.address,
              areaCode: this.editForm.areaCode,
              objectType: this.editForm.objectType,
              businessNo: this.editForm.businessNo,
            };
          } else {
            // 选择的非“个人”
            queryPram = {
              objectName: this.editForm.objectName,
              address: this.editForm.address,
              areaCode: this.editForm.areaCode,
              objectType: this.editForm.objectType,
              creditCode: this.editForm.creditCode,
              legalPerson: this.editForm.legalPerson,
              duty: this.editForm.duty,
              phone: this.editForm.phone,
              zipCode: this.editForm.zipCode
            };
          }
          this.$ajax(url.saveLegalData, queryPram).then(res => {
            if (res.success) {
              this.showLegalObjDialog = false;
              this.$message({
                type: 'success',
                message: '保存成功'
              })
            }
          });
        } else {
          return false
        }
      });
    },

    // 分页事件
    handleCurrentChange(page) {
      this.orgForm.pageIndex = page;
      this.getUserData()
    },
    handleSizeChange(size) {
      this.orgForm.pageSize = size;
      this.getUserData()
    },
  }
}
</script>

<style lang="less" scoped>
.page {
  height: 100%;
  overflow-y: hidden;
  .side {
    // width: 50%;
    padding-right: 50%;
    height: calc(100% - 15px);
    padding-bottom: 60px;
    overflow: auto;
  }
}
.flexbox{
  display: flex;
  height: 100%;
  .left {
    width: 250px;
    height: calc(100% - 100px);
  }
  .right {
    width: calc(100% - 250px);
    height: calc(100% - 100px);
    /deep/.el-table__row{
      cursor: pointer;
    }
  }
}
  .form-wrapper {
    max-height: 500px;
    overflow: auto;
  }
  .dialog-footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  .buttons{margin-top: 15px;}
}
</style>
