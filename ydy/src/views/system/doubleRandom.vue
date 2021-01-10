/**
 * 系统管理 双随机设置
 */
<template>
  <div class="page">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>双随机设置</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="flexbox">
      <div class="left">
        <el-tree ref="tree" default-expand-all :data="orgs" :props="defaultMenusProps" node-key="id" @node-click="handleNodeClick"></el-tree>
      </div>
      <div class="right">
        <!-- 搜索筛选 -->
        <el-form :inline="true" >
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="toEdit()">新增</el-button>
          </el-form-item>
        </el-form>
        <!--列表-->
        <div class="tableWrap">
          <el-table height="100%" @selection-change="selectChange" :data="tableData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中">
            <el-table-column align="center" type="index" width="45" label="序号">
            </el-table-column>
            <el-table-column align="center" prop="name" label="方案" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.ispayout!=1">
                  {{`${scope.row.name}`}}
                </span>
                <span v-else class="case" @click="getDetail(scope.row)">
                  {{`${scope.row.name}`}}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="tasknum" label="任务数">
            </el-table-column>
            <el-table-column align="center" prop="peoplenum" label="参与人员数">
            </el-table-column>
            <el-table-column align="center" prop="createname" label="发起单位" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" prop="createtime" label="发起时间" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" prop="ispayout" label="是否派发">
              <template slot-scope="scope">
                {{scope.row.ispayout ? '已派发' : '未派发'}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="240" align="center" fixed="right">
              <template slot-scope="scope">
                <!--<el-button type="primary" plain :disabled="scope.row.ispayout==1" @click="toEdit(scope.row)">修改</el-button>-->
                <el-button type="success" plain :disabled="scope.row.ispayout==1" @click="toDelivery(scope.row)">派发</el-button>
                <el-button type="danger" :disabled="scope.row.ispayout==1" @click="toDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页组件 -->
        <el-pagination
          v-if="tableData.length"
          background
          layout="total, sizes, prev, pager, next"
          :current-page="form.pageIndex"
          :page-size="form.pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :total="pageparm.total">
        </el-pagination>

      </div>
    </div>

    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="90%" @click='closeDialog("edit")'>
      <el-form :model="formInline" ref="form" :rules="rules" label-width="140px">
        <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="执法区域：" prop="areacode">
            <el-select v-model="formInline.areacode" @change="handleChange">
              <el-option :label="v.name" :value="v.id" v-for="v in dicts.areaOptions" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="执法对象类型：" prop="legalobjtype">
            <el-select v-model="formInline.legalobjtype" @change="handleChange1">
              <el-option :label="v.name" :value="v.code" v-for="v in dicts.legalobjTypes" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急程度：" prop="urgency">
            <el-select v-model="formInline.urgency" placeholder="紧急程度" style="width: 100%">
              <el-option :label="v.name" :value="v.code" v-for="v in dicts.urgency" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发起单位：">
            <el-input v-model="formInline.createName" placeholder="发起单位" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="派发日期：" prop="deliveryTime">
            <el-date-picker type="date" placeholder="派发日期"
              v-model="formInline.deliveryTime"
              style="width: 100%"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="要求完成日期：" prop="requirefinishtime">
            <el-date-picker type="date" placeholder="完成日期"
              v-model="formInline.requirefinishtime"
              style="width: 100%"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
          <el-col :span="8">
            <el-form-item label="案件来源：" prop="caseSource">
              <!--<el-select v-model="formInline.legalobjtype" @change="handleChange1">
                <el-option :label="v.name" :value="v.code" v-for="v in dicts.legalobjTypes" :key="v.id"></el-option>
              </el-select>-->
              <el-select v-model="formInline.caseSource" placeholder="请选择案件来源">
                <el-option :label="v.name" :value="v.code" v-for="v in dicts.caseSourceList" :key="v.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="方案名称：" prop="name">
              <el-input v-model="formInline.name" auto-complete="off" placeholder="方案名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-row :gutter="20" class="transfer">
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
            @left-check-change="changeLegalObj"
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

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="create">{{formInline.recordId ? '修改双随机任务' : '创建双随机任务'}}</el-button>
        <el-button type="default" @click="reset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
import {validEmptySpace} from '@/utility/limitFrom';
export default {
  data() {
    return {
      loading: false, //是显示加载
      title: '新增设置',
      editFormVisible: false, //控制编辑页面显示与隐藏

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 3600 * 1000 * 24;
        },
      },

      // list分页
      form: {
        orgaid: '',
        pageIndex: 1,
        pageSize: 10,
      },
      tableData: [],
      pageparm: {
        total: 0
      },

      // 机构树
      orgs: [],
      defaultMenusProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],

      // 新增
      formInline: {
        createName: '',
        orgaid: '',
        areacode: '',
        legalobjname: '',
        legalobjtype: '',
        tasktype: '2',
        urgency: '',
        deliveryTime: '',
        requirefinishtime: '',
        caseSource: '',
        ids: [],
        userInfo: [],
        recordId: '',
        name: ''
      },
      dicts: {
        areaOptions: [],
        urgency: [],
        legalobjTypes: [],  // 执法对象类型
        // 案件来源
        caseSourceList: [],
      },

      data: [],
      dataPers: [],

      rules: {
        areacode: [{ required: true, message: '区域不存在', trigger: 'blur'}],
        legalobjtype: [{ required: true, message: '执法对象类型不存在', trigger: 'blur'}],
        caseSource: [{ required: true, message: '案件来源不存在', trigger: 'blur'}],
        urgency: [{ required: true, message: '紧急程度不存在', trigger: 'blur'}],
        deliveryTime:  [{ required: true, message: '派发时间不存在', trigger: 'blur'}],
        requirefinishtime: [{ required: true, message: '要求完成时间不存在', trigger: 'blur'}],
        name: [
          { required: true, message: '方案名称不存在', trigger: 'blur'},
          { validator: validEmptySpace, trigger: 'change' }
        ],
      }

    }
  },

  /**
   * 数据发生改变
   */
  watch: {
    'formInline.areacode'(code) {
      this.selectByAreacode();
      this.selectUserInfoByAreacode(code);
    },
    'formInline.legalobjtype'(code) {
      this.dicts.legalobjTypes.forEach(v => {
        if(code == v.code) {
          this.legalobjname = v.name;
        }
      })
      this.selectByAreacode();
    }
  },

  /**
   * 创建完毕
   */
  created() {
    this.getOrgTree();
    this.getdata();

    this.getDictData(5, 'urgency');
    this.getDictData(4, 'legalobjTypes');
    this.getDictData(13, 'caseSourceList');
    this.getArea();
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 详情
    getDetail(row) {
      let recordId = row.id;
      this.$router.push({
        path: '/zfxt/doubleRandom',
        query: {
          recordId
        }
      })
    },
    // 机构树
    getOrgTree() {
      this.$ajax(url.getOrgTree, {}).then(res => {
        this.orgs = res.data;
      })
    },
    // 加载菜单
    handleNodeClick(data) {
      this.formInline.createName = data.name;
      this.formInline.orgaid = data.id;

      this.form.orgaid = data.id;
      this.getdata()
    },
    // 获取数据方法
    getdata() {
      this.loading = true;
      this.$ajax(url.getAllRecordDouRandom, this.form).then(res => {
        this.loading = false;
        // if(res.success) {
          this.tableData = res.list && res.list.length ? res.list : [];
          // // 分页赋值
          // this.form.pageIndex = res.pageNum;
          // this.form.pageSize = res.pageSize;
          this.pageparm.total = res.total;
        // } else {
        //   this.tableData = []
        // }

      })
    },
    // 切换页数
    handleCurrentChange(page) {
      this.form.pageIndex = page;
      this.getdata()
    },
    // 切换size
    handleSizeChange(size) {
      this.form.pageSize = size;
      this.getdata()
    },

    //显示添加及编辑界面
    toEdit: function(row) {
      if (row != undefined && row != 'undefined') {
        this.title = '修改双随机设置';
        this.formInline.recordId = row.id;
        this.formInline.createName = row.createname;
        this.$ajax(url.getAllRecordByRecordDouRandom, {
          pageNum: 1,
          pageSize: 1,
          recordId: row.id
        }).then(res => {
          if(res.success) {
            this.editFormVisible = true;
            this.formInline.ids = res.data.legObject;
            this.formInline.userInfo = res.data.user;
            this.formInline.areacode = res.data.record.areacode;
            this.formInline.legalobjtype = res.data.record.legalobjtype + '';
            this.formInline.legalobjname = res.data.record.legalobjname;
            this.formInline.urgency = res.data.record.urgency + '';
            this.formInline.requirefinishtime = res.data.record.requirefinishtime;
            this.formInline.legalobjid = res.data.record.legalobjid;
            this.formInline.deliveryTime = res.data.record.deliveryTime;

          }
        })
      } else {
        if(!this.formInline.orgaid) {
          this.$message({
            type: 'info',
            message: '请选择机构！'
          })
          return;
        }
        this.title = '新增双随机设置';
        // this.reset();
        this.formInline.areacode = '';
        this.formInline.legalobjtype = '';
        this.formInline.urgency = '';
        this.formInline.deliveryTime = '';
        this.formInline.requirefinishtime = '';
        this.formInline.ids = [];
        this.formInline.userInfo = [];
        this.formInline.recordId = '';
        this.formInline.caseSource = '';
        this.formInline.name = '';
        this.data = [];
        this.dataPers = [];
        this.editFormVisible = true;
      }
    },
    // 派发
    toDelivery(row) {
      this.$confirm('确定要派发该条方案么？', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$ajax(url.deliveryDouRandom, {id: row.id}).then(res => {
          if(res.success) {
            this.$message({
              type: 'success',
              message: '派发成功！'
            });
            this.getdata();
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 删除
    toDel(row) {
      this.$confirm('确定要删除该条方案么？', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        this.$ajax(url.delDouRandom, {id: row.id}).then(res => {
          if(res.success) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            });
            this.getdata();
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // table选择复选框事件
    selectChange(val) {
      this.selectdata = val;
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      this.editFormVisible = false;
    },
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
    selectByAreacode() {
      let obj = {
        areacode: this.formInline.areacode,
        objecttype: this.formInline.legalobjtype
      }
      this.$ajax(url.selectByAreacode, obj).then(res => {
        if(res.success) {
          this.data = res.data || [];
          // this.data.forEach(v => v.disabled = false);
        }
      })
    },
    // 选择人员
    selectUserInfoByAreacode(v) {
      this.$ajax(url.selectUserInfoByAreacode, {pageIndex: 1, pageSize: 100, areacode: v}).then(res => {
        if(res.success) {
          this.dataPers = res.data || [];
        }
      })
    },
    // 切换区域
    handleChange(v) {
      // this.selectByAreacode();
      // this.selectUserInfoByAreacode(v);
    },
    handleChange1(code) {
      // this.dicts.legalobjTypes.forEach(v => {
      //   if(code == v.code) {
      //     this.legalobjname = v.name;
      //   }
      // })
      // this.selectByAreacode();
    },
    // 选中执法对象
    changeLegalObj(keys, cur) {
      // console.log(keys)
      // if(keys.length == 2) {
      //   this.data.forEach(v => {
      //     for(let i = 0; i < keys.length; i++) {
      //       if(v.id == keys[i]) {
      //         v.disabled = false;
      //         break;
      //       }
      //       if(i == keys.length - 1 && v.id !== keys[i]) {
      //         v.disabled = true;
      //       }
      //     }
      //   })
      // } else {
      //   this.data.forEach(v => {
      //     v.disabled = false;
      //   })
      // }
    },
    // 重置
    reset() {
      this.formInline.areacode = '';
        this.formInline.legalobjtype = '';
        this.formInline.urgency = '';
        this.formInline.deliveryTime = '';
        this.formInline.requirefinishtime = '';
        this.formInline.ids = [];
        this.formInline.userInfo = [];
        this.formInline.recordId = '';
        this.formInline.caseSource = '';
        this.formInline.name = '';
        this.data = [];
        this.dataPers = [];
    },
    // 立即创建双随机任务
    create() {
      this.$refs.form.validate((valid) => {
        if(valid) {
          if(!this.formInline.ids.length) {
            this.$message({
              type: 'error',
              message: '请选择执法对象！'
            })
            return;
          }
          if(!this.formInline.userInfo.length) {
            this.$message({
              type: 'error',
              message: '请选择执法人员！'
            })
            return;
          }
          if (this.formInline.userInfo.length === 1) {
            this.$message({
              type: 'error',
              message: '执法人员至少选择两位！'
            })
            return;
          }
          if(this.formInline.ids.length > 9) {
            this.$message({
              type: 'error',
              message: '执法对象数量不能超过10条！'
            })
            return;
          }
          let form = JSON.parse(JSON.stringify(this.formInline));
          form.tasknum = this.formInline.ids.length;
          form.peoplenum = this.formInline.userInfo.length;
          form.ids = form.ids.join();
          form.userInfo = form.userInfo.join();
          form.requirefinishtime = form.requirefinishtime;
          form.deliveryTime = form.deliveryTime;
          form.tasktype = 2;
          let urls = url.addDoubleRandom;
          let message = '添加成功！'
          if(form.recordId) {
            urls = url.updateDeliveryDouRandom;
            message = '修改成功！'
          } else {
            delete form.recordId;
          }
          this.$ajax(url.addDoubleRandom, form, 'POST', 0).then(res => {
            if(res.code == '200') {
              this.$message({
                type: 'success',
                message: message
              });
              this.editFormVisible = false;
              this.getdata();
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
  height: calc(100vh - 68px);
}
.flexbox{
  display: flex;
  height: 100%;
  .left {
    width: 184px;
    margin-right: 16px;
    padding-bottom: 120px;
    height: 100%;
    overflow: auto;
  }
  .right {
    width: calc(100% - 200px);
    height: calc(100% - 100px);
    .case{
      cursor: pointer;
      color: #2F7FE3;
    }
  }
}

.dialog-footer {
  text-align: center;
  margin-bottom: 30px;
}
.transfer {
  margin-top: 20px;
  margin-bottom: 40px;
  .el-col {
    margin-top: 20px;
  }
  /deep/ .el-transfer{
    width: 100%;
    // height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.tableWrap {
  height: calc(100vh - 255px);
  overflow: auto;
}
</style>
