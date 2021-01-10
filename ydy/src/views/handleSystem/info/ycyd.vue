<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>一车一档</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="menuList">
      <ul>
        <li
          v-for="(item,index) in list"
          :key="index"
          :class="{active:num==index}"
          @click="getNum(index)"
        >{{item}}</li>
      </ul>
      <ul>
        <li
          v-for="(item,index) in list2"
          :key="index + 7"
          :class="{active:num==(index + 7)}"
          @click="getNum(index + 7)"
        >{{item}}</li>
      </ul>
    </div>
    <el-form :inline="true" :model="formInline" ref="queryForm">
      <el-form-item label="号码号牌:">
        <el-input v-model="formInline.lisence" placeholder="请输入号码号牌" clearable></el-input>
      </el-form-item>
      <!-- <el-form-item label="生产状态">
        <el-select v-model="formInline.status" placeholder="请选择">
          <el-option label="投产" value="quyu1"></el-option>
          <el-option label="停产" value="quyu2"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item class="btns">
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        <!--<el-button icon="el-icon-delete" @click="resetForm('queryForm')">重置</el-button>-->
        <!--<el-button icon="el-icon-download" @click="onSubmit">导出</el-button>-->
      </el-form-item>
    </el-form>
    <!-- 表格部分 -->
    <div class="tableWrap">
      <el-table class="table"
                :data="tableData"
                height="100%"
                v-loading="loading" element-loading-text="拼命加载中"
                border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column v-for="(item, i) of gridConfigColumn" :prop="item.prop" :key="i"
                         :label="item.label" :width="item.width">
          <template slot-scope="scope">
            <span v-if="item.prop === 'lisence'" @click="toDetail(scope.row)" style="color:#1890FF;cursor: pointer;">
              {{scope.row.lisence}}
            </span>
            <span v-else>{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="toDetail(scope.row)">一车一档信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <!--<el-table
        class="table"
        :data="tableData"
        border
        height="100%"
        v-loading="loading" element-loading-text="拼命加载中"
      >
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="lisence" label="号码号牌" width="120">
          <template slot-scope="scope">
          <span
            @click="toDetail(scope.row)"
            style="color:#1890FF;cursor: pointer;"
          >{{scope.row.lisence}}</span>
          </template>
        </el-table-column>
        &lt;!&ndash; 0:蓝牌，1：黄牌，2：白牌，3：黑牌 &ndash;&gt;
        <el-table-column prop="lisencecolor" label="车牌颜色">
          <template slot-scope="scope">
            {{scope.row.lisencecolor == 0 ? '蓝牌' : scope.row.lisencecolor == 1 ? '黄牌' : scope.row.lisencecolor == 2 ? '白牌' : scope.row.lisencecolor == 3 ? '黑牌' : ''}}
          </template>
        </el-table-column>
        <el-table-column prop="quality" label="基准质量(Kg)"></el-table-column>
        <el-table-column label="初次登记日期" prop="firstregistedate"></el-table-column>
        <el-table-column label="创建日期" prop="created"></el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="toDetail(scope.row)">一车一档信息</el-button>
            &lt;!&ndash; <el-button size="mini" type="text" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
            >删除</el-button> &ndash;&gt;
          </template>
        </el-table-column>
      </el-table>-->
    </div>
    <el-pagination
      v-if="pageparm.total"
      background
      layout="total, sizes, prev, pager, next"
      :current-page="formInline.currentPage"
      :page-size="formInline.pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :total="pageparm.total">
    </el-pagination>

    <!-- dialog -->
    <!-- <el-dialog title="这是执法对象名称" :visible.sync="dialogFormVisible" width="800px" append-to-body>
      <el-form :inline="true" :model="form" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码:">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="组织机构代码:">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="污染源名称:">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="污染源地址:">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="污染源类别:">
              <el-select v-model="form.region" placeholder="请选择污染源类别:">
                <el-option label="一般工业企业" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="环保监管级别:">
              <el-select v-model="form.region" placeholder="请选择污染监管级别:">
                <el-option label="一般工业企业" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行业">
              <el-select v-model="form.region" placeholder="请选择行业:">
                <el-option label="一般工业企业" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行业代码">
              <el-select v-model="form.region" placeholder="请选择行业代码:">
                <el-option label="一般工业企业" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="污染源介绍:">
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import {formatDateToStr} from '@/utility/utility.js'
import url from '@/servers/url-config.js';
export default {
  data() {
    return {
      formInline: {
        lisence: '',
        // user: "",
        // obj: "",
        // area: "",
        // status: ""
        currentPage: 1,
        pageSize: 10
      },
      loading: false,
      pageparm: {
        total: 0
      },
      tableData: [],
      list: ['交警支队车辆', '城建局_水泥罐车', '城管局_渣土车', '交通局_两客一危', '教育局_校车', '公交车', '邮政车'],
      list2: ['门禁管控车辆', '遥感监测车辆', '重型柴油车', '非道路机械'],
      num: 0,
      gridConfigColumn: [],
      SngcList: [
        {prop: 'lisence', label: '号码号牌', width: '120'},
        {prop: 'lisencecolor', label: '车牌颜色'},
        {prop: 'quality', label: '基准质量(Kg)'},
        {prop: 'firstregistedate', label: '初次登记日期'},
        {prop: 'created', label: '创建日期'},
      ],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
      //   formLabelWidth: "120px"
    };
  },
  created() {
    this.gridConfigColumn = this.SngcList;
    this.getData();
  },
  watch: {
    num () {
      this.formInline.currentPage = 1;
      this.formInline.pageSize = 10;
      this.formInline.lisence = '';
      this.getData();
    }
  },
  methods: {
    getData() {
      this.loading = true;
      let urls;
      switch (this.num) {
        case 0:
          urls = url.getJjzdList;
          break;
        case 1:
          urls = url.getSngcList;
          break;
        case 2:
          urls = url.getZtcList;
          break;
        case 3:
          urls = url.getLkywList;
          break;
        case 4:
          urls = url.getXcList
          break;
        case 5:
          urls = url.getGjcList
          break;
        case 6:
          this.tableData = [];
          this.pageparm.total = 0;
          break;
        case 7:
          urls = url.getMjclList
          break;
        case 8:
          urls = url.getYgjcList
          break;
        case 9:
          urls = url.getZxcycList
          break;
        case 10:
          urls = url.getFdljxList
          break;
      }
      if (this.num !== 6) {
        this.$ajax(urls, {
          pageIndex: this.formInline.currentPage,
          pageSize: this.formInline.pageSize,
          lisence: this.formInline.lisence,
        }).then(res => {
          this.loading = false;
          this.tableData = res.data.list;
          /*this.tableData.forEach(v => {
            v.created = formatDateToStr(new Date(v.created)).split(' ')[0];
            v.firstregistedate = formatDateToStr(new Date(v.firstregistedate)).split(' ')[0];
          })*/
          this.pageparm.total = res.data.total;
        });
      }
      this.loading = false;
    },
    // 分页插件事件
    handleCurrentChange(val) {
      this.formInline.currentPage = val;
      this.getData();
    },
    handleSizeChange(size) {
      this.formInline.pageSize = size;
      this.getData();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toDetail (row) {
      this.$router.push({path: "/archives", query: {lisence: row.lisence, num: this.num}});
    },
    rowClass() {
      return "background: #fff;color: #909399;font-weight: 600;";
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
    },
    handleDelete(row) {

    },
    onSubmit() {
      this.getData();
    },
    getNum (index) {
      this.num = index;
      switch (this.num) {
        case 0:
          this.gridConfigColumn = this.SngcList;
          break;
        case 1:
          this.gridConfigColumn = this.SngcList;
          break;
        case 2:
          this.gridConfigColumn = this.SngcList;
          break;
        case 3:
          this.gridConfigColumn = this.SngcList;
          break;
        case 4:
          this.gridConfigColumn = this.SngcList;
          break;
        case 5:
          this.gridConfigColumn = this.SngcList;
          break;
      }
    },
  }
};
</script>

<style lang="less" scoped>
.el-select--mini {
  width: 135px;
}
/deep/.table tbody > td:nth-of-type(3) {
  color: #1890ff;
  cursor: pointer;
}
.el-select .el-input {
    width: 218px;
  }
  .el-textarea__inner{width: 500px;}
.tableWrap {
  height: calc(100vh - 350px);
  /*overflow: auto;*/
}
.menuList {
  width: 1100px;
  height: 80px;
  background-color: #fff;
  margin: 30px 0 15px;
}

ul {
  width: 100%;
  border-radius: 3px;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0 0 10px;
  color: #909399;
  font-size: 16px;
  line-height: 32px;
}

ul li {
  /*flex: 1;*/
  width: 13%;
  text-align: center;
  cursor: pointer;
  /*border: 1px solid #dbdbdb;*/
  border-radius: 3px;
  margin-right: 12px;
  background: url('~@/assets/image/short.png');
  background-size: cover;
  &:hover {
    color: #fff;
    background: url('~@/assets/image/short-selected.png');
    background-size: cover;
  }
}
.active {
  color: #fff;
  background: url('~@/assets/image/short-selected.png');
  background-size: cover;
}
</style>
