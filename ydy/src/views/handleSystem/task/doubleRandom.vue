<template>
  <div class="page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>双随机任务</el-breadcrumb-item>
    </el-breadcrumb>


    <el-form :inline="true" :model="formInline">
      <el-form-item label="任务名称:">
        <el-input v-model="formInline.taskname" placeholder="任务名称"></el-input>
      </el-form-item>
      <el-form-item label="执法对象:">
        <el-input v-model="formInline.legalobjname" placeholder="执法对象"></el-input>
      </el-form-item>
      <el-form-item label="派发日期:" prop="finishTime">
        <el-date-picker type="daterange" range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="formInline.finishTime"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item class="btns">
        <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
        <el-button icon="el-icon-delete" @click="onReset">重置</el-button>
        <!--<el-button icon="el-icon-download" @click="onExport">导出</el-button>-->
      </el-form-item>
    </el-form>
    <div class="tableWrap">
      <el-table class="table"
                :data="data.tableData"
                border
                height="100%"
                v-loading="data.loading" element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="taskname" label="任务名称" show-overflow-tooltip>
          <template slot-scope="scope">
          <span>
            {{`${scope.row.deliveryTime}-${scope.row.taskname}`}}
          </span>
          </template>
        </el-table-column>
        <el-table-column prop="legalobjname" label="执法对象" show-overflow-tooltip></el-table-column>
        <el-table-column prop="requirefinishtime" label="要求完成日期"></el-table-column>
        <el-table-column prop="sponsorName" label="主办人"></el-table-column>
        <el-table-column prop="cosponsorName" label="协办人"></el-table-column>
        <el-table-column prop="deliveryTime" label="派发日期"></el-table-column>
        <el-table-column prop="urgency" label="紧急程度">
          <template slot-scope="scope">
            {{scope.row.urgency == '1' ? '一般' : '紧急'}}
          </template>
        </el-table-column>
        <!-- 1未办理，2办理中， 3已办理 -->
        <el-table-column prop="status" label="任务状态"></el-table-column>
        <el-table-column prop="status" label="操作" min-width="140">
          <template slot-scope="scope">
            <el-button type="primary" :disabled="scope.row.status !== '未办理'" @click="editForm(scope.row)">修改</el-button>
            <el-button type="success"  @click="toDetail(scope.row)">办理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      v-if="page.total"
      layout="total, sizes, prev, pager, next"
      :total="page.total"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
    </el-pagination>

    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible">
      <el-form :model="formEdit" ref="form" label-width="100px" :rules="rules">
        <el-form-item label="任务名称:" prop="taskname">
          <el-input readonly v-model="formEdit.taskname" placeholder="任务名称"></el-input>
        </el-form-item>
        <el-form-item label="执法对象:" prop="legalobjname">
          <el-input readonly v-model="formEdit.legalobjname" placeholder="执法对象"></el-input>
        </el-form-item>
        <el-form-item label="要求完成日期:" prop="requirefinishtime">
          <el-date-picker readonly type="date" placeholder="要求完成日期"
            v-model="formEdit.requirefinishtime"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="主办人:" prop="sponsor">
          <el-select v-model="formEdit.sponsor" placeholder="主办人">
            <el-option :label="v.title" :value="v.value" v-for="v in dicts.dataPers" :key="v.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协办人:" prop="cosponsor">
          <el-select v-model="formEdit.cosponsor" placeholder="协办人">
            <el-option :label="v.title" :value="v.value" v-for="v in dicts.dataPers" :key="v.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="派发日期:" prop="dispatchdate">
          <el-date-picker readonly type="date" placeholder="派发日期"
            v-model="formEdit.dispatchdate"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="紧急程度:" prop="urgency">
          <el-input readonly v-model="formEdit.urgency" placeholder="紧急程度"></el-input>
        </el-form-item>
        <el-form-item label="任务状态:" prop="ishandle">
          <el-input readonly v-model="formEdit.ishandle" placeholder="任务状态"></el-input>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ensureForm">确认</el-button>
        <el-button type="default" @click="editFormVisible=false;">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js'
export default {
  data() {
    return {
      formInline: {
        taskname: '',
        legalobjname: '',
        // taskType: '双随机',
        // dispatchTimeStart: '',
        // dispatchTimeEnd: '',
        finishTime: [],
        // userId: '',
        // dbType: 0,
        pageIndex: 1,
        pageSize: 10,
        recordId: '',
      },
      data: {
        loading: false,
        tableData: []
      },
      page: {
        total: 0
      },
      dicts: {
        taskType: [],
        // legalobjType: [],
        urgency: [],
        dataPers: []
      },
      title: '修改配置',
      editFormVisible: false,
      formEdit: {},
      rules: {
        sponsor:  [{ required: true, message: '主办人不存在', trigger: 'blur'}],
        cosponsor: [{ required: true, message: '协办人不存在', trigger: 'blur'}]
      }
    }
  },
  watch: {
    isChangeId () {
      if (this.$route.query.id) {
        this.data.loading = true;
        this.$ajax(url.getListByIdDoubleRandom, {taskId: this.$route.query.id}).then(res => {
          this.data.loading = false;
          this.data.tableData = res.list;
          this.page.total = res.total;
        })
      } else {
        this.getData()
      }
    }
  },
  computed: {
    isChangeId () {
      return this.$route.query.id ? this.$route.query.id : '';
    }
  },
  created() {
    this.formInline.recordId = this.$route.query.recordId || '';
    // this.getData();
    this.getDictData(3, 'taskType');
    this.getDictData(5, 'urgency');
    // if (this.$route.params.id) {
    if (this.$route.query.id) {
      this.data.loading = true;
      this.$ajax(url.getListByIdDoubleRandom, {taskId: this.$route.query.id}).then(res => {
        this.data.loading = false;
        this.data.tableData = res.list;
        this.page.total = res.total;
      })
    } else {
      this.getData()
    }
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
    // 获取列表
    getData() {
      this.data.loading = true;
      let data = {
        // dbType: 2, // 0-待办 1-已办 2-查询全部
        taskname: this.formInline.taskname,
        legalobjname: this.formInline.legalobjname,
        // // taskType: this.formInline.taskType,
        startTime: this.formInline.finishTime && formatDateToStr(this.formInline.finishTime[0]) || '',
        endTime: this.formInline.finishTime && formatDateToStr(this.formInline.finishTime[1]) || '',
        pageIndex: this.formInline.pageIndex,
        pageSize: this.formInline.pageSize,
        recordId: this.formInline.recordId
      }
      this.$ajax(url.getListByIdDoubleRandom, data).then(res => {
        this.data.loading = false;
        this.data.tableData = res.list;
        this.page.total = res.total;
      })
    },
    // 重置
    onReset() {
      this.formInline = {
        taskname: '',
        legalobjname: '',
        // taskType: '',
        // dispatchTimeStart: '',
        // dispatchTimeEnd: '',
        finishTime: [],
        // userId: '',
        // dbType: 0,
        pageIndex: 1,
        pageSize: 10,
        recordId: ''
      }
    },
    // 导出
    onExport() {
      console.log('submit!');
    },
    // 修改配置
    editForm(row) {
      row.urgency = row.urgency == 1 ? '一般' : '紧急';
      row.ishandle = row.ishandle == 'Y' ? '办理中' : '未办理';
      this.formEdit = row;
      this.$ajax(url.selectUserInfoByAreacode, {areacode: row.areacode}).then(res => {
        if(res.success) {
          this.dicts.dataPers = res.data || [];
          this.editFormVisible = true;
        } else {
          this.$message({
            type: 'info',
            message: res.message
          })
        }
      })
    },
    // 提交修改
    ensureForm() {
      this.$refs.form.validate((valid) => {
        if(valid) {
          this.$ajax(url.updateDouRandomTask, {
            id: this.formEdit.id,
            sponsor: this.formEdit.sponsor,
            cosponsor: this.formEdit.cosponsor
          }).then(res => {
            if(res.code == '200') {
              this.$message({
                type: 'success',
                message: '修改成功！'
              });
              this.editFormVisible = false;
              this.getData();
            }
          })
        } else {
          return false;
        }
      })
    },
    // 去待办
    doForm(row) {
      this.$ajax(url.updateRandomTaskByStatus, {id: row.id}).then(res => {
        this.$router.push({
          path: '/zfxt/dbrw',
          query: {
            taskId: row.id
          }
        })
      })
    },
    // 切换页数
    currentChange(page) {
      this.formInline.pageIndex = page;
      this.getData();
    },
    // 切换size
    sizeChange(size) {
      this.formInline.pageSize = size;
      this.getData();
    },
    // 跳转到待办任务
    toDetail (row) {
      // this.$router.push({path: '/zfxt/dbrw', query: {ssjDetail: row}});
      this.$router.push({
        name: 'dbrw',
        params: {
          detail: row.id
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
  .tableWrap {
    height: calc(100vh - 300px);
    /*overflow: auto;*/
  }
</style>
