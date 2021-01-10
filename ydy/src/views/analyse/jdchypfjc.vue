<template>
  <div class="home">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机动车黑烟排放检测</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bot">
      <div class="left">
        <el-row :gutter="15">
          <el-col :span="12">
            <el-select placeholder="请选择" v-model="searchQuery.district" clearable>
              <el-option
                style="width: 100%"
                v-for="district in districts"
                :key="district.value"
                :label="district.label"
                :value="district.value"
              />
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-select placeholder="请选择" v-model="searchQuery.areaId" clearable>
              <el-option
                style="width: 100%"
                v-for="city in citys"
                :key="city.areaId"
                :label="city.areaName"
                :value="city.areaId"
                @change="changeQuery"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row class="date">
          <el-col :span="24">
            <el-date-picker
              v-model="searchQuery.date"
              type="daterange"
              unlink-panels
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              @change="changeQuery"
            ></el-date-picker>
          </el-col>
        </el-row>
        <div class="name">
          市区已覆盖
          <span>街道{{streetCount}}、探头{{cameraCount}}个</span>
        </div>
        <div class="title">郑州市区域机动车黑烟排名</div>
        <!-- <vChart class="chart0" :options="barOptions1" /> -->
        <div class="chart0">
          <!-- <div class="item" v-for="(v, i) in barOptions1" :key="i">
            <el-tooltip :content="v.areaName" placement="top" class="area">
              <span>{{v.areaName}}</span>
            </el-tooltip>
            <span class="bar">
              <span
                class="bar-in"
                :style="{width: v.smogCount / barOptions1[0].smogCount * 100 + '%'}"
              ></span>
            </span>
            <span>{{v.smogCount}}</span>
          </div> -->
          <div class="item">
            <span class="area_index">序号</span>
            <span class="area">区域</span>
            <span class="count">黑烟个数</span>
          </div>
          <div class="item item-nodata" v-if="!barOptions1.length">暂无数据</div>
          <div class="item" v-else v-for="(v, i) in barOptions1" :key="i">
            <span class="area_index">{{i+1}}</span>
            <el-tooltip :content="v.areaName" placement="top" class="area">
              <span :class="searchQuery.cameraId==v.cameraId ?'active' : ''">{{v.areaName}}</span>
            </el-tooltip>
            <span class="count">{{v.smogCount}}</span>
            <!-- <span class="count">{{v.vehicleCount}}</span> -->
          </div>
        </div>
        <div class="title" v-if="barOptions2.length">郑州市街道机动车黑烟排名</div>
        <div class="chart0" v-if="barOptions2.length">
          <!-- <div class="item" v-for="(v, i) in barOptions2" :key="i">
            <el-tooltip :content="v.streetName" placement="top" class="area">
              <span>{{v.streetName}}</span>
            </el-tooltip>
            <span class="bar">
              <span
                class="bar-in"
                :style="{width: v.smogCount / barOptions2[0].smogCount * 100 + '%'}"
              ></span>
            </span>
            <span>{{v.smogCount}}</span>
          </div> -->

          <div class="item">
            <span class="area_index">序号</span>
            <span class="area">街道</span>
            <span class="count">黑烟个数</span>
          </div>
          <div class="item item-nodata" v-if="!barOptions2.length">暂无数据</div>
          <div class="item" v-else v-for="(v, i) in barOptions2" :key="i" @click="selectCamera(v)">
            <span class="area_index">{{i+1}}</span>
            <el-tooltip :content="v.streetName" placement="top" class="area">
              <span :class="searchQuery.cameraId==v.cameraId ?'active' : ''">{{v.streetName}}</span>
            </el-tooltip>
            <span class="count">{{v.smogCount}}</span>
          </div>
        </div>
      </div>
      <div class="right" :class="currentTab == 2 ? 'right1' : ''">
        <div class="tabs">
          <span :class="currentTab == 1 ? 'active' : ''" @click="currentTab = 1">地图</span>
          <span :class="currentTab == 2 ? 'active' : ''" @click="currentTab = 2">列表</span>
        </div>

        <template v-if="currentTab == 1">
          <div class="pics" v-if="pics.length">
            <div class="arrow arrow-left" v-if="pics.length > 4" @click="showMore('down')"></div>
            <div class="pic-container">
              <div class="pic-box" ref="picContainer">
                <div class="pic" v-for="(v, i) in pics" :key="i">
                  <div class="info" :style="{'background-image': 'url(' + v.cropImage+')'}">
                    <!-- <img src="@/assets/image/pic.jpg" alt="" width="100%"> -->
                    <div class="infos">
                      <div>{{v.time.split('.')[0]}}</div>
                      <div>车牌:{{v.plateResult}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="arrow arrow-right" v-if="pics.length > 4" @click="showMore('up')"></div>
          </div>
          <div class="myMap">
            <!-- <el-amap class="amap-box"
              :amap-manager="map.amapManager"
              :vid="'amap-vue'"
              :zoom="map.zoom"
              :plugin="map.plugin"
              :center="map.center"
              :events="map.events"
            >
            </el-amap>-->
            <SMap :allPoints="allPoints" :type="2" :cameraId="searchQuery.cameraId"/>
          </div>
        </template>

        <template v-if="currentTab == 2">
          <div class="tips">
            <span :class="currentTip == 1 ? 'active' : ''" @click="currentTip = 1">所有探头</span>
            <span :class="currentTip == 2 ? 'active' : ''" @click="currentTip = 2">违规车辆</span>
          </div>
          <!-- <div class="query" v-if="currentTip == 2">
            拍到次数:
            <input
              type="number"
              min="0"
              placeholder="请输入"
              onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
              onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
            />
          </div> -->

          <div v-if="currentTip == 1">
            <template >
            <el-table border :data="tableData"
              height="322">
              <el-table-column type="index" width="40"></el-table-column>
              <el-table-column label="设备编号" prop="cameraId"></el-table-column>
              <!-- <el-table-column label="设备类型" prop="plateResult"></el-table-column> -->
              <el-table-column
                sortable
                width="142"
                show-overflow-tooltip
                label="第一次拍到的时间"
                prop="firstTime"
              ></el-table-column>
              <el-table-column
                sortable
                width="154"
                show-overflow-tooltip
                label="最后一次拍到的时间"
                prop="endTime"
              ></el-table-column>
              <el-table-column sortable width="122" label="车辆经过个数" prop="vehiclCount"></el-table-column>
              <el-table-column sortable width="122" label="有黑烟的个数" prop="smogCount"></el-table-column>
              <el-table-column label="所属街道" prop="streetName" width="154" show-overflow-tooltip v-if="currentTip == 1"></el-table-column>
              
            </el-table>
          </template>
          </div>
          <template v-if="currentTip == 2">
            <el-table border :data="tableData1"
              height="322">
              <el-table-column type="index" width="40"></el-table-column>
              <!-- <el-table-column label="车型" prop="carType"></el-table-column> -->
              <el-table-column label="车牌" prop="plateResult"></el-table-column>
              <el-table-column
                sortable
                :sort-method="sortMethod"
                width="142"
                show-overflow-tooltip
                label="第一次拍到的时间"
                prop="firstTime"
              ></el-table-column>
              <el-table-column
                sortable
                width="154"
                show-overflow-tooltip
                label="最后一次拍到的时间"
                prop="lastTime"
              ></el-table-column>
              <el-table-column sortable label="拍到次数" prop="smogCount"></el-table-column>
              <el-table-column label="所属街道" prop="streetName" width="154" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="getRow(scope.row)">发送短信提醒</el-button>
                  <!-- 发短信弹窗 -->
                  <el-dialog
                      title="提示"
                      :visible.sync="dialogVisible"
                      width="30%"
                      >
                      <span>确认给车牌号为<i style="color:blue;">{{row.plateResult}}</i>的车主发送短信通知？</span>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sendMessage(row)">确 定</el-button>
                      </span>
                </el-dialog>
                </template>
              </el-table-column>
            </el-table>
          </template>

          <el-pagination
            v-if="page.total"
            background
            layout="total, sizes, prev, pager, next"
            :total="page.total"
            @current-change="currentChange"
            @size-change="sizeChange"
          ></el-pagination>
        </template>

        
      </div>
    </div>
  </div>
</template>

<script>
import SMap from "../offGas/map.vue";
// import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import pic from "@/assets/image/pic.jpg";
import url from "@/servers/url-config";
import { formatDateToStr } from "@/utility/utility.js";

export default {
  data() {
    function getPastDate() {
      let nowDate = new Date();
      let date = new Date(nowDate);
      date.setMonth(date.getMonth() - 3)
      // date.setFullYear(date.getMonth()-3600 * 1000 * 24)
      // date.setTime(date.getDate() - 3600 * 1000 * 24 * 90);
      return date;
    }
    function getNowDate() {
      let nowDate = new Date();
      let date = new Date(nowDate);
      date.setDate(date.getDate());
      return date;
    }
    return {
       pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      
      dialogVisible: false,
      pic,
      row:{},
      currentTab: 1, // 1 地图 2 列表
      currentTip: 1, //
      searchQuery: {
        district: 0,
        areaId: 0,
        date: [getPastDate(), getNowDate()],
      },
      districts: [
        {
          label: "郑州",
          value: 0,
        },
      ],
      citys: [],
      streetCount: 0,
      cameraCount: 0,
      barOptions1: [],
      barOptions2: [],
      tableData: [],
      tableData1: [],
      pics: [],
      active: 0, // 当前图片序号
      photoPageIndex: 0,  // 当前图片页数
      picTotal: 0,  // 照片总数
      allPoints: [],
      cameraId: '',  // 当前摄像头id
      page: {
        limit: 10,
        offset: 1,
        total: 0,
      },
    };
  },
  components: {
    SMap,
  },
  watch: {
    currentTab(v) {
      if (v == 2) {
        this.getTable1();
        this.getTable1Count();
      } else {
        this.getPoints();
      }
    },
    currentTip(v) {
      // alert(v)
      this.page.offset = 0;
      if (v == 2) {
        this.getTable2();
        this.getTable2Count();
      } else if(v == 1){
        this.getTable1();
        this.getTable1Count();
      }
    },
  },
  created() {
    this.getArea();
    this.getData();
    
  },
  methods: {
    // 选中某个摄像头点
    selectCamera(v) {
      this.searchQuery.cameraId = v.cameraId;
      this.getBar();
      this.getPoints(1);
    },

    // 城市与区域接口
    getArea() {
      let data = {
        // requireTotalCount: true,
      };
      // let data={
      //   data:data1
      // }
      this.$ajax( url.HYWQXT_HYCSQY, data ).then((res) => {
        res = JSON.parse(res)
        if (res.resultCode == 200) {
          this.citys = res.result || [];
          this.searchQuery.areaId = this.citys[0].areaId;

          this.changeQuery();
        }
      });
    },
    // 根据条件获取数据
    changeQuery() {
      this.getData();
      this.getChart1();
      this.getChart2();
      this.getPoints();
      this.getPhotos();
      this.getPhotosCount();
    },
    // 街道和探头数量查询
    getData() {

      let data = {
        // requireTotalCount: true,
        // queryValues: {
          areaId: this.searchQuery.areaId,
          startTime: this.searchQuery.date.length && formatDateToStr(this.searchQuery.date[0]).split(' ')[0],
          endTime: this.searchQuery.date.length && formatDateToStr(this.searchQuery.date[1]).split(' ')[0]
        // },
      };
      this.$ajax(url.HYWQXT_HYSXTHJDSL, data).then(res => {

          res = JSON.parse(res)
          if(res.resultCode == 200) {
              this.cameraCount = res.result[0].cameraCount || 0;
              this.streetCount = res.result[0].streetCount || 0;
          }

      });
    },
    // 区域内机动车黑烟排放量
    getChart1() {
      let data = {

          areaId: this.searchQuery.areaId,
          startTime: formatDateToStr(this.searchQuery.date[0]).split(' ')[0],
          endTime: formatDateToStr(this.searchQuery.date[1]).split(' ')[0],

      };
      this.$ajax(url.getProbeNum, data).then((res) => {
        res = JSON.parse(res)
        // console.log(res)
        if (res.resultCode == 200) {
          this.barOptions1 = res.result;
        }
      });
    },
    // 黑烟排放街道排名top5
    getChart2() {
      let data = {
        areaId: this.searchQuery.areaId,
        startTime: formatDateToStr(this.searchQuery.date[0]).split(' ')[0],
        endTime: formatDateToStr(this.searchQuery.date[1]).split(' ')[0]
      };
      this.$ajax(url.HYWQXT_HYJDPMTOP5, data).then((res) => {
        res = JSON.parse(res)
        console.log(res,22222222)
        if (res.resultCode == 200) {
          if(res.result.length) {
            this.barOptions2 = res.result;
            // if(res.result.length > 4) {
            //   this.barOptions2 = res.result.slice(0, 5);
            // }
          }
        }
      });
    },
    // 列表-所有探头
    getTable1Count() {
      let data = {
        areaId: this.searchQuery.areaId,
        startTime: formatDateToStr(this.searchQuery.date[0]).split(' ')[0],
        endTime: formatDateToStr(this.searchQuery.date[1]).split(' ')[0],
      };
      this.$ajax(url.HYWQXT_HYSYTTLBZS, data).then((res) => {
        res = JSON.parse(res)
        if (res.resultCode == 200) {
          console.log(res)
          this.page.total = res.result[0].total;
        }
      });
    },
    getTable1() {
      let data = {
        // requireTotalCount: true,
        offset: this.page.offset,
        limit: this.page.limit,
          areaId: this.searchQuery.areaId,
          startTime: formatDateToStr(this.searchQuery.date[0]).split(' ')[0],
          endTime: formatDateToStr(this.searchQuery.date[1]).split(' ')[0],

      };
      // 所有探头 table
      this.$ajax(url.HYWQXT_HYSYTTLB, data).then((res) => {
        res = JSON.parse(res)
        console.log(res,666)
        if (res.resultCode == 200) {
          this.tableData = res.result;
          // this.page.total = res.totalCount;
        }
      });
    },
    // 列表-违规车辆
    getTable2Count() {
      let data = {

          areaId: this.searchQuery.areaId,
          startTime: formatDateToStr(this.searchQuery.date[0]).split(' ')[0],
          endTime: formatDateToStr(this.searchQuery.date[1]).split(' ')[0],

      };
      this.$ajax(url.HYWQXT_HYWGCLLBZS, data).then((res) => {
        res = JSON.parse(res)
        console.log(res, '000')
        if (res.resultCode == 200) {
          this.page.total = res.result[0].total;
        }
      });
    },
    // 违规车辆 table
    getTable2() {
      let data = {
        offset: this.page.offset,
        limit: this.page.limit,

          areaId: this.searchQuery.areaId,
          startTime: formatDateToStr(this.searchQuery.date[0]).split(' ')[0],
          endTime: formatDateToStr(this.searchQuery.date[1]).split(' ')[0],

      };
      this.$ajax(url.HYWQXT_HYWGCLLB, data).then((res) => {
        res = JSON.parse(res)
        // console.log(res,777)
        if (res.resultCode == 200) {
          this.tableData1 = res.result;
        }
      });
    },
    // 坐标地图
    getPoints() {
      let data = {
        areaId: this.searchQuery.areaId,
        startTime: formatDateToStr(this.searchQuery.date[0]).split(' ')[0],
        endTime: formatDateToStr(this.searchQuery.date[1]).split(' ')[0]
      };
      this.$ajax(url.HYWQXT_HYDTZB, data).then((res) => {
        res = JSON.parse(res)
        console.log(res,444444)
        if (res.resultCode == 200) {
          this.allPoints = res.result;
        }
      });
    },
    // 黑烟照片数组
    getPhotosCount() {
      let data = {
        areaId: this.searchQuery.areaId,
        startTime: formatDateToStr(this.searchQuery.date[0]).split(' ')[0],
        endTime: formatDateToStr(this.searchQuery.date[1]).split(' ')[0],
        cameraId: this.cameraId
      };
      this.$ajax(url.HYWQXT_HYZPSZZS, data).then(res => {
        res = JSON.parse(res)
        if (res.resultCode == 200) {
          this.picTotal = res.totalCount;
        }
      });
    },

    getPhotos(cameraId = "", photoPageIndex = 0, isAdd = 0) {
      let data = {
        areaId: this.searchQuery.areaId,
        startTime: formatDateToStr(this.searchQuery.date[0]).split(' ')[0],
        endTime: formatDateToStr(this.searchQuery.date[1]).split(' ')[0],
        cameraId: cameraId,
        offset: photoPageIndex * 12,
        limit: 12
      };
      this.$ajax(url.HYWQXT_HYZPSZ, data).then((res) => {
        res = JSON.parse(res)
        if (res.resultCode == 200) {
          if(this.photoPageIndex == 0) {
            this.pics = [];
          }
          this.pics = [...this.pics, ...res.result];
          this.$nextTick(() => {
            let el = this.$refs.picContainer;
            if(el) {
              el.style.width = el.scrollWidth + 'px';
              if(isAdd) {
                el.style.transform = "translateX(-" + (this.active / this.pics.length) * 100 + "%)";
              }
            }
          })
        }
      });
    },
    // 点击摄像头坐标点
    clickPoint(cameraId) {
      this.cameraId = cameraId;
      this.photoPageIndex = 0;
      this.getPhotos(cameraId);
      this.getPhotosCount();
    },
    // 点击左右按钮显示更多
    showMore(v) {
      let el = this.$refs.picContainer;
      let percent = (this.active / this.pics.length) * 100;
      if (v == "up") {
        this.active++;
        if (this.active >= this.picTotal - 3) {  // 最后4张图
          this.active = this.pics.length - 3;
          return;
        }
        if (this.pics.length - 3 == this.active && this.pics.length < this.picTotal) {
          this.photoPageIndex++;
          this.getPhotos(this.cameraId, this.photoPageIndex, 1);
          return;
        }
      } else {
        this.active--;
        if (this.active < 0) this.active = 0;
      }
      el.style.transform = "translateX(-" + (this.active / this.pics.length) * 100 + "%)";
    },
    // 切换分页
    currentChange(page) {
      this.page.offset = (page - 1) * this.page.limit;
      if (this.currentTip == 2) {
        this.getTable2();
      }
      if (this.currentTip == 1) {
        this.getTable1();
      }
    },
    sizeChange(size) {
      this.page.limit = size;
      if (this.currentTip == 2) {
        this.getTable2();
      }
      if (this.currentTip == 1) {
        this.getTable1();
      }
    },
    getRow(row){
      this.dialogVisible = true;
      this.row = row
    },
    sendMessage(row) {
      
      alert(2222)
      row.firstTime = row.firstTime.slice(0,10),
      row.lastTime = row.lastTime.slice(0,10),
      this.$ajax(url.putBlacksmokeMsg, row).then(res => {
        // res = JSON.parse(res)
        // console.log(res,999)
        if (res.success) {
          this.getData();
          this.$message({
            type: 'success',
            message: res.message,
          })
        }
      });
    },
    sortMethod(a, b) {},
    handleSelectionChange() {},
  },
};
</script>

<style lang="less" scoped>
.home {
  // height: calc(100% - 60px);
  // padding-bottom: 60px;
  height: 100%;
  overflow-y: auto;
  .bot {
    display: flex;
    // height: calc(100% - 140px);
    .tab {
      height: 28px;
      font-size: 12px;
      color: #333333;
    }
    .left {
      width: 17%;
      // height: 100%;
      .district {
        // margin-right: 16px;
      }
      .date {
        margin-top: 8px;
        /deep/ .el-range-editor.el-input__inner {
          width: 100%;
        }
      }
      .name {
        font-size: 14px;
        color: #333333;
        margin: 20px 0;
        span {
          color: #1890ff;
        }
      }
      .title {
        margin-top: 20px;
      }
      .chart0 {
        width: 100%;
        height: 235px;
        overflow-y: auto;
        border: 1px solid #DCDFE6;
        border-top: none;
        margin-top: 15px;
        font-size: 12px;
        //height: 165px;
        .item {
          padding: 7px 10px;
          border-top: 1px solid #DCDFE6;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .area {
            display: inline-block;
            width: 100px;
            overflow: hidden;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            border-right: 1px solid #DCDFE6;
            border-left: 1px solid #DCDFE6;
            &.active{
              color: #1890ff;
            }
          }
          .area_index{
            width: 20px;
            // border-right: 1px solid #DCDFE6;
          }
          .count {
            width: 77px;
            text-align: center;
          }
          .bar {
            display: inline-block;
            vertical-align: middle;
            height: 20px;
            width: 160px;
            margin-right: 5px;
            .bar-in {
              display: inline-block;
              height: 100%;
              vertical-align: middle;
              background: #2f7fe3;
            }
          }
        }
        .item-nodata {
          justify-content: center;
          color: #909399;
        }
      }
    }
    .right {
      width: 83%;
      // height: 100%;
      position: relative;
      padding-top: 65px;
      padding-left: 25px;
      &.right1 {
        padding-top: 90px;
      }
      .tabs {
        position: absolute;
        top: 0;
        right: 24px;
        display: flex;
        cursor: pointer;
        span {
          width: 112px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          color: #dbdbdb;
          border: 1px solid #dbdbdb;
          &.active {
            color: #fff;
            background-image: linear-gradient(270deg, #3396FF 2%, #04D298 100%);
            border: 1px solid #1890ff;
          }
        }
      }
      .pics {
        width: 100%;
        overflow: hidden;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .arrow {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-image: url("~@/assets/image/left.png");
          background-repeat: no-repeat;
          background-size: contain;
          &.arrow-right {
            transform: rotate(180deg);
          }
        }
        .pic-container {
          // width: 1180px;
          width: calc(100% - 30px);
          height: 114px;
          margin: 0 auto;
          overflow: hidden;
          .pic-box {
            height: 100%;
            // min-width: 1180px;
            min-width: calc(100% - 30px);
            transition: all 0.5s linear;
            display: flex;
            flex-wrap: nowrap;
          }
          .pic {
            float: left;
            border: 1px solid #ccc;
            box-sizing: border-box;
            margin-right: 10px;
            width: 185px;
            height: 114px;
            .info {
              width: 183px;
              height: 100%;
              background-size: 100%;
              background-repeat: no-repeat;
              background-position: center;
              position: relative;
              &:hover {
                .infos {
                  display: block;
                }
              }
              .infos {
                width: 100%;
                // height: 76px;
                position: absolute;
                bottom: 0;
                left: 0;
                opacity: 0.6;
                background: #000000;
                color: #fff;
                padding: 4px 8px;
                line-height: 20px;
                display: none;
              }
            }
          }
        }
      }
      .myMap {
        width: 100%;
        height: 481px;
        overflow: hidden;
      }

      .tips {
        position: absolute;
        top: 30px;
        left: 24px;
        display: flex;
        cursor: pointer;
        span {
          width: 112px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          color: #dbdbdb;
          border: 1px solid #dbdbdb;
          &.active {
            color: #fff;
            background-image: linear-gradient(270deg, #3396FF 2%, #04D298 100%);
            border: 1px solid #1890ff;
          }
        }
      }
      .query {
        position: absolute;
        top: 30px;
        left: 272px;
      }

      .el-pagination {
        margin-top: 15px;
        float: right;
      }
    }
  }
}
</style>
