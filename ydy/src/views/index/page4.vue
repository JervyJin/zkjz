<template>
  <div>
    <!-- 路检 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="路检路查" name="first">
        <span style="color: #606266;">截止日期：</span>
        <div class="lujian-time">
          <!--<span>日期：</span>-->
          <el-date-picker
            type="date"
            placeholder="选择截止日期"
            v-model="luJianDate"
          ></el-date-picker>
        </div>
        <el-button type="primary" icon="el-icon-search" class="query-button" @click="onQuery('lujian')">查询</el-button>

        <!-- 表格部分 -->
        <h1 class="title">郑州市路检路查统计</h1>
        <div class="tableWrap">
          <el-table :data="tableData" height="100%" v-loading="loading" border element-loading-text="拼命加载中">
            <el-table-column prop="tjdw" label="点位名称">
              <template slot-scope="scope">
                <span @click="clickDwName(scope.row.tjdw)" class="view-Detail">{{scope.row.tjdw}}</span>
              </template>
            </el-table-column>
            <!-- 多级表头 -->
            <el-table-column :label=item align="center" v-for="(item,index) in this.arr" :key="index">
              <el-table-column prop="zs" label="总数" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div v-for="(item2,index2) in scope.row.data" :key="index2">
                    <span v-if="item2.cjsj == item">{{item2.zs}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="tgs" label="通过数" :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                  <div v-for="(item2,index2) in scope.row.data" :key="index2">
                    <span v-if="item2.cjsj == item">{{item2.tgs}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="btgs" label="不通过数" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div v-for="(item2,index2) in scope.row.data" :key="index2">
                    <span v-if="item2.cjsj == item">{{item2.btgs}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          v-if="pageparm.total"
          background
          layout="total, prev, pager, next"
          :current-page="pageparm.currentPage"
          :page-size="pageparm.pageSize"
          :total="pageparm.total"
          @current-change="handleCurrentChange"
        ></el-pagination>



      </el-tab-pane>
      <el-tab-pane label="入户检测" name="second">
        <span style="color: #606266;">截止日期：</span>
        <div class="lujian-time">
          <!--<span>日期：</span>-->
          <el-date-picker
            type="date"
            placeholder="选择截止日期"
            v-model="ruKuDate"
          ></el-date-picker>
        </div>
        <el-button type="primary" icon="el-icon-search" class="query-button" @click="onQuery('ruhu')">查询</el-button>
        <!-- 入户 -->
        <h1 class="title">郑州市入户统计</h1>
        <!-- 表格部分 -->
        <div class="tableWrap">
          <el-table :data="tableData2" height="100%" v-loading="loading" border element-loading-text="拼命加载中">
            <el-table-column prop="tjdw" label="点位名称"></el-table-column>
            <!-- 多级表头 -->
            <el-table-column :label=item align="center" v-for="(item,index) in this.arr1" :key="index">
              <el-table-column prop="zs" label="总数" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div v-for="(item2,index2) in scope.row.data" :key="index2">
                    <span v-if="item2.cjsj == item" @click="clickClName(item, scope.row.tjdw, '')" class="view-Detail">{{item2.zs}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="tgs" label="通过数"  :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                  <div v-for="(item2,index2) in scope.row.data" :key="index2">
                    <span v-if="item2.cjsj == item" @click="clickClName(item, scope.row.tjdw, '通过')" class="view-Detail">{{item2.tgs}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="btgs" label="不通过数" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <div v-for="(item2,index2) in scope.row.data" :key="index2">
                    <span v-if="item2.cjsj == item" @click="clickClName(item, scope.row.tjdw, '不通过')">{{item2.btgs}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <!--<el-pagination
        v-if="this.activeName=='second' && pageparm.total2"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="pageparm.currentPage"
          :page-size="pageparm.pageSize"
          :total="pageparm.total2"
        ></el-pagination>-->
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="点位详情" :visible.sync="isShowQyDetail" width="65%">
      <div style="min-height: 400px">
        <el-table :data="tableXwData1" height="350" v-loading="loading2" border element-loading-text="拼命加载中">
          <el-table-column prop="ljdw" label="点位名称">
            <template slot-scope="scope">
              <span>{{scope.row.ljdw}}</span>
            </template>
          </el-table-column>
          <!-- 多级表头 -->
          <el-table-column :label=item align="center" v-for="(item,index) in this.arr" :key="index">
            <el-table-column prop="zs" label="总数" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-for="(item2,index2) in scope.row.data" :key="index2">
                  <span v-if="item2.cjsj == item" @click="clickClName(item, scope.row.ljdw, '')" class="view-Detail">{{item2.zs}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="tgs" label="通过数" :show-overflow-tooltip="true" >
              <template slot-scope="scope">
                <div v-for="(item2,index2) in scope.row.data" :key="index2">
                  <span v-if="item2.cjsj == item" @click="clickClName(item, scope.row.ljdw, '通过')" class="view-Detail">{{item2.tgs}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="btgs" label="不通过数" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <div v-for="(item2,index2) in scope.row.data" :key="index2">
                  <span v-if="item2.cjsj == item" @click="clickClName(item, scope.row.ljdw, '不通过')" class="view-Detail">{{item2.btgs}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

    </el-dialog>

    <el-dialog title="车辆详情" :visible.sync="isShowClDetail" width="65%">
      <div style="min-height: 400px">
        <el-table :data="tableXwData2" height="350" v-loading="loading3" border element-loading-text="拼命加载中">
          <!--<el-table-column prop="ljdw" label="车牌号">
            <template slot-scope="scope">
              <span>{{scope.row.ljdw}}</span>
            </template>
          </el-table-column>-->
          <el-table-column prop="cph" label="车牌号"></el-table-column>
          <el-table-column prop="bgbh" label="报告编号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="hplx" label="号牌类型"></el-table-column>
          <el-table-column prop="jcff" label="检测方法"></el-table-column>
          <el-table-column prop="jcjgou" label="检测机构"></el-table-column>
          <el-table-column prop="pfjd" label="排放阶段"></el-table-column>
          <el-table-column prop="rylx" label="燃油类型"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" plain>打印</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="clPagePram.dataTotal"
          background
          layout="total, sizes, prev, pager, next"
          :current-page="clPagePram.page"
          :page-size="clPagePram.pageSize"
          @current-change="handleCurrentChange2"
          @size-change="handleSizeChange2"
          :total="clPagePram.dataTotal">
        </el-pagination>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import url from "@/servers/url-config.js";
import { formatDateToStr } from "@/utility/utility.js";
export default {
  data() {
    return {
      activeName: "first",
      loading: false,
      loading2: false,
      loading3: false,
      tableData: [

      ],
      // 区域下挖的表格数据
      tableXwData1: [],
      // 车辆下挖的表格数据
      tableXwData2: [],
      arr: [],
      arr1: [],
      tableData2:[],
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        total2: 0,
      },
      // 车辆详情下挖的分页参数
      clPagePram: {
        page: 1,
        pageSize: 10,
        dataTotal: 0,
      },
      // 是否展示区域下挖表格
      isShowQyDetail: false,
      // 是否展示车辆下挖表格
      isShowClDetail: false,
      ljdw: '',
      state: '',
      endDate: '',
      luJianDate: new Date(new Date().getTime() - 24*60*60*1000),
      ruKuDate: new Date(new Date().getTime() - 24*60*60*1000),
    };
  },
  created() {
    /*let lujianLuchaParams = {
      /!*startDate: formatDateToStr(this.luJianDate[0]),
      endDate: formatDateToStr(this.luJianDate[1]),*!/
      pageNum: 1,
      pageSize: 2,
    };*/
    this.lujianLucha();
    this.ruHu();
  },
  methods: {


    toDetail(row) {
      console.log(row);
      this.$router.push("page4_detail");
    },
    rowClass() {
      return "background: #fff;color: #909399;font-weight: 600;";
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
    },
    onQuery (ev) {
      if (ev === 'ruhu') {
        this.ruHu();
      } else {
        this.lujianLucha();
      }
    },
    // 点击路检路查点位名称
    clickDwName (v) {
      this.isShowQyDetail = true;
      let query = {
        tjdw: v,
        endDate: this.luJianDate ? formatDateToStr(this.luJianDate).slice(0, 10) : '',
      }
      this.loading2 = true;
      this.$ajax(url.ljlcQyxw, query).then((res) => {
        if (res.success) {
          this.tableXwData1 = res.data;
          this.arr.forEach((item) => {
            // 循环遍历每条记录
            this.tableXwData1.forEach(item2 => {
              // 拿到每条实体记录，将他的data中的时间cjsj封装成一个新数组
              let arr = item2.data.map(item3 => {
                return item3.cjsj
              })
              // 判断每条记录的时间数组中包不包括这七天，可能有的只有两三天。
              // 如果不包括，添加上时间，数据都为0.好在表格上显示
              if (arr.indexOf(item) == -1) {
                item2.data.push({cjsj: item, zs: 0, btgs: 0, tgs: 0})
              }
            })
          })
          this.loading2 = false;
        }
      });
    },
    // 点击路检路查车辆信息
    clickClName (endDate, ljdw, state) {
      this.isShowClDetail = true;
      this.clPagePram.page = 1;
      this.clPagePram.pageSize = 10;
      this.ljdw = ljdw;
      this.endDate = endDate;
      this.state = state;
      this.clSearch();
    },
    // 分页查询车辆列表
    clSearch () {
      let query = {
        ljdw: this.ljdw,
        state: this.state,
        endDate: this.endDate,
        pageNum: this.clPagePram.page,
        pageSize: this.clPagePram.pageSize
      }
      console.log(this.activeName, '111111111111')
      this.loading3 = true;
      let urls;
      if (this.activeName === 'first') {
        urls = url.ljlcClxw
      } else {
        urls = url.ljlcRkClxw
      }
      this.$ajax(urls, query).then((res) => {
        this.loading3 = false;
        this.tableXwData2 = res.data.list;
        this.clPagePram.dataTotal = res.data.total;
      });
    },
    handleCurrentChange (val) {
      this.pageparm.currentPage = val;
      this.lujianLucha();
    },
    handleCurrentChange2 (val) {
      this.clPagePram.page = val;
      this.clSearch();
    },
    handleSizeChange2 (size) {
      this.clPagePram.pageSize = size;
      this.clSearch();
    },

    // 路检路查
    lujianLucha () {
      // 将前七天的日期放在数组中
      this.arr = [];
      if (!this.luJianDate) {
        this.luJianDate = new Date(new Date().getTime() - 24*60*60*1000)
      }
      this.arr.push(formatDateToStr(this.luJianDate).slice(0, 10));
      [1, 2, 3, 4, 5, 6].forEach((item) => {
        this.arr.unshift(formatDateToStr(new Date(this.luJianDate.getTime() - item * 24 * 60 * 60 * 1000)).slice(0, 10))
      });
      this.loading = true;
      this.$ajax(url.queryListByRoadtrafficstopcheck, {page: this.pageparm.currentPage, endDate: this.arr[6]}).then((res) => {
        this.pageparm.total = res.count || 0;
        this.tableData = res.data;
        // 循环这七天
        this.arr.forEach((item) => {
          // 循环遍历每条记录
          this.tableData.forEach(item2 => {
            // 拿到每条实体记录，将他的data中的时间cjsj封装成一个新数组
            let arr = item2.data.map(item3 => {
              return item3.cjsj
            })
            // 判断每条记录的时间数组中包不包括这七天，可能有的只有两三天。
            // 如果不包括，添加上时间，数据都为0.好在表格上显示
            if (arr.indexOf(item) == -1) {
              item2.data.push({cjsj: item, zs: 0, btgs: 0, tgs: 0})
            }
          })
        })
        this.loading = false;
      });
    },
    // 入户
    ruHu () {
      // 将前七天的日期放在数组中
      this.arr1 = [];
      if (!this.ruKuDate) {
        this.ruKuDate = new Date(new Date().getTime() - 24*60*60*1000)
      }
      this.arr1.push(formatDateToStr(this.ruKuDate).slice(0, 10));
      [1, 2, 3, 4, 5, 6].forEach((item) => {
        this.arr1.unshift(formatDateToStr(new Date(this.ruKuDate.getTime() - item * 24 * 60 * 60 * 1000)).slice(0, 10))
      });
      this.loading = true;
      this.$ajax(url.queryListByRuKu, {endDate: this.arr1[6]}).then((res) => {
        this.tableData2 = res.data;
        // 循环这七天
        this.arr1.forEach((item) => {
          // 循环遍历每条记录
          this.tableData2.forEach(item2 => {
            // 拿到每条实体记录，将他的data中的时间cjsj封装成一个新数组
            let arr = item2.data.map(item3 => {
              return item3.cjsj
            })
            // 判断每条记录的时间数组中包不包括这七天，可能有的只有两三天。
            // 如果不包括，添加上时间，数据都为0.好在表格上显示
            if (arr.indexOf(item) == -1) {
              item2.data.push({cjsj: item, zs: 0, btgs: 0, tgs: 0})
            }
          })
        })
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  margin: 10px auto;
  text-align: center;
  color: #333333;
  font-size: 14px;
  font-weight: 600;
}
.lujian-time {
  display: inline-block;
  .el-date-editor {
    width: 170px;
  }
}
.query-button {
  /*float: right;*/
  margin-left: 20px;
}
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
.el-textarea__inner {
  width: 500px;
}
.tableWrap {
  height: calc(100vh - 335px);
  /*overflow-x: hidden;
  overflow-y: auto;
  .table {
    overflow-x: hidden;
  }*/
}
  .view-Detail {
    color: rgb(24, 144, 255);
    cursor: pointer
  }
</style>
