<template>
  <div class="page">
    <el-form :inline="true" :model="query">
      <!--<el-form-item label="区域：">
        <el-select v-model="query.area">
          <el-option :label="v.name" :value="v.id" v-for="v in dicts.areaOptions" :key="v.id"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="日期：">
        <el-date-picker
          v-model="query.date"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
      </el-form-item>
    </el-form>

    <el-row class="points" :gutter="15">
      <el-col
        :span="6"
        v-for="(v, i) in points"
        :key="i"
      >
        <div class="points-container"
          :class="['point', i == 0 ? 'first' : i == 1 ? 'second' : i == 2 ? 'third': 'fourth']">
          <div class="key">{{v.key}}</div>
          <div class="val">{{v.val}}</div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <!-- 检测人员分布 -->
      <!--<el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>检测人员分布</span>
          </div>
          <vChart class="chart3" :options="bar2Options" auto-resize />
        </el-card>
      </el-col>-->
      <!-- 检测机构分布 -->
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>检测机构分布</span>
          </div>
          <vChart class="chart3" :options="barOptions" auto-resize />
        </el-card>
      </el-col>

      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>检测车辆的通过率</span>
          </div>
          <vChart class="chart3" :options="bar3Options" auto-resize />
        </el-card>
      </el-col>
      <!--<el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>检测车辆的超标率</span>
          </div>
          <vChart class="chart3" :options="bar4Options" auto-resize />
        </el-card>
      </el-col>-->
      <el-col :span="24">
        <el-card style="padding-bottom:15px;">
          <div slot="header" class="clearfix">
            <span>检测机构综合排名情况</span>
          </div>
          <div class="chart1">
            <el-form :inline="true">
              <el-form-item label="机构名称：">
                <el-input v-model="jiGouName" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="searchByJgMc">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              height="400"
              class="table"
              :data="tableTopData"
              border
              stripe
            >
              <el-table-column type="index" prop="index" label="排名"></el-table-column>
              <el-table-column prop="jcjgou" label="名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="zs" label="车辆总数"></el-table-column>
              <el-table-column prop="g1zs" label="国一总数"></el-table-column>
              <el-table-column prop="g2zs" label="国二总数"></el-table-column>
              <el-table-column prop="g3zs" label="国三总数"></el-table-column>
              <el-table-column prop="g4zs" label="国四总数"></el-table-column>
              <el-table-column prop="g5zs" label="国五总数"></el-table-column>
              <el-table-column prop="g6zs" label="国六总数"></el-table-column>
            </el-table>
            <el-pagination
              v-if="dataTotal"
              background
              layout="total, sizes, prev, pager, next"
              :current-page="pagePram.page"
              :page-size="pagePram.pageSize"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :total="dataTotal">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="10" class="card1"> -->
      <!-- 检测状态分布 -->
      <!-- <el-col :span="12">
        <vChart class="chart3" :options="barOptions_status" />
      </el-col> -->
      <!-- 检测量分布 -->
      <!-- <el-col :span="12">
        <vChart class="chart3" :options="barOptions_num" />
      </el-col>
    </el-row> -->




  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';

export default {
  data() {
    return {
      query: {
        date: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)]
      },
      tableTopData: [
        {index: 1, xm: '河南天茂机动车检测有限公司'}, {index: 2, xm: '河南安吉车享家机动车检测有限公司'}, {index: 3, xm: '蓝天机动车检测有限公司'},
        {index: 4, xm: '郑州速兴机动车检测有限公司'}, {index: 5, xm: '河南金星啤酒厂金星机动车检测中心'}, {index: 6, xm: '郑州市鼎泰机动车检测有限公司'},
        {index: 7, xm: '河南恒通机动车检测中心'}, {index: 8, xm: '河南佳鑫机动车检测有限公司'}, {index: 9, xm: '郑州大承汽车检测有限公司'},
        {index: 10, xm: '郑州大正机动车检测站'}
      ],
      dicts: {
        areaOptions: []
      },
      jiGouName: '',
      pagePram: {
        page: 1,
        pageSize: 10,
      },
      dataTotal: 0,
      points: [
        { key: "检测车辆总数", val: 0 },
        // { key: "入户检查总数", val: 0 },
        { key: "检测机构总数", val: 0 },
        { key: "检测车辆不通过数", val: 0 },
        // { key: "路检路查车次", val: 0 }
      ],

      bar2Options: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        // grid: {
        //   top: "25%",
        //   bottom: "20%",
        //   right: "5%",
        //   left: "10%"
        // },
        // title: {
        //   text: "检测人员分布",
        //   left: "5%",
        //   top: "5",
        //   textStyle: {
        //     fontSize: "0.072917rem",
        //     color: "#000",
        //     fontStyle: "normal"
        //   }
        // },
        tooltip: {},
        legend: {
          data: ['人员数', '比率'],
          top: "0"
        },
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: [{
          name: '单位(人)',
          nameLocation: 'end',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        }, {
          name: '比率(%)',
          nameLocation: 'end',
          type: 'value',
          // min: 0,
          // max: 100,
          // interval: 10
        }],
        series: [
          {
            name: "人员数",
            type: "bar",
            barWidth: "15%",
            data: []
          },
          {
            name: "比率",
            yAxisIndex: 1,
            type: "line",
            data: []
          }
        ]
      },
      barOptions: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        // grid: {
        //   top: "25%",
        //   bottom: "20%",
        //   right: "5%",
        //   left: "10%"
        // },
        // title: {
        //   text: "检测机构分布",
        //   left: "5%",
        //   top: "5%",
        //   textStyle: {
        //     fontSize: "0.072917rem",
        //     color: "#000",
        //     fontStyle: "normal"
        //   }
        // },
        tooltip: {},
        /*legend: {
          data: ['机构数', '比率'],
          top: "0"
        },*/
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 20
          },
          data: []
        },
        yAxis: {
          name: '单位(个)',
          nameLocation: 'end',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "机构数",
            type: "bar",
            barWidth: "20%",
            data: []
          }
        ]
      },
      barOptions_status: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "25%",
          bottom: "20%",
          right: "5%",
          left: "10%"
        },
        title: {
          text: "检测机构状态",
          left: "5%",
          top: "5%",
          textStyle: {
            fontSize: "0.072917rem",
            color: "#000",
            fontStyle: "normal"
          }
        },
        tooltip: {},
        legend: {
          data: ["正常", "停业", "断网", "超标率"],
          top: 0
        },
        xAxis: {
          type: "category",
          data: ["中原", "金水", "二七", "管城", "东区", "新密", "荥阳"]
        },
        yAxis: {
          // name: '合格率(%)',
          // nameLocation: 'middle',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "正常",
            type: "bar",
            // barWidth: "20%",
            data: [20, 232, 441, 654, 770, 530, 410]
          },
          {
            name: "停业",
            type: "bar",
            data: [120, 482, 791, 834, 590, 930, 710]
          },
          {
            name: "断网",
            type: "bar",
            data: [420, 332, 291, 654, 590, 330, 810]
          },
          {
            name: "超标率",
            type: "bar",
            data: [120, 232, 391, 854, 590, 730, 410]
          }
        ]
      },
      barOptions_num: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "25%",
          bottom: "20%",
          right: "5%",
          left: "10%"
        },
        title: {
          text: "检测量分布",
          left: "5%",
          top: "5%",
          textStyle: {
            fontSize: "0.072917rem",
            color: "#000",
            fontStyle: "normal"
          }
        },
        tooltip: {},
        legend: {
          data: ["合格数", "超标数", "合格率", "超标率"],
          top: "0"
        },
        xAxis: {
          type: "category",
          data: ["中原", "金水", "二七", "管城", "东区", "新密", "荥阳"]
        },
        yAxis: {
          // name: '合格率(%)',
          // nameLocation: 'middle',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "合格数",
            type: "bar",
            barWidth: "20%",
            data: [20, 232, 441, 654, 770, 530, 410]
          },
          {
            name: "超标数",
            type: "line",
            data: [120, 482, 791, 834, 590, 930, 710]
          },
          {
            name: "合格率",
            type: "line",
            data: [420, 332, 291, 654, 590, 330, 810]
          },
          {
            name: "超标率",
            type: "line",
            data: [120, 232, 391, 854, 590, 730, 410]
          }
        ]
      },
      bar3Options: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        // grid: {
        //   top: "25%",
        //   bottom: "20%",
        //   right: "5%",
        //   left: "10%"
        // },
        // title: {
        //   text: "检测机构分布",
        //   left: "5%",
        //   top: "5%",
        //   textStyle: {
        //     fontSize: "0.072917rem",
        //     color: "#000",
        //     fontStyle: "normal"
        //   }
        // },
        tooltip: {},
        /*legend: {
          data: ['机构数', '比率'],
          top: "0"
        },*/
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 20
          },
          data: ['二七区', '金水区', '惠济区']
        },
        yAxis: {
          name: '通过率(%)',
          nameLocation: 'end',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            type: "bar",
            barWidth: "20%",
            data: [83, 90, 94]
          }
        ]
      },
      bar4Options: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        // grid: {
        //   top: "25%",
        //   bottom: "20%",
        //   right: "5%",
        //   left: "10%"
        // },
        // title: {
        //   text: "检测机构分布",
        //   left: "5%",
        //   top: "5%",
        //   textStyle: {
        //     fontSize: "0.072917rem",
        //     color: "#000",
        //     fontStyle: "normal"
        //   }
        // },
        tooltip: {},
        /*legend: {
          data: ['机构数', '比率'],
          top: "0"
        },*/
        xAxis: {
          type: "category",
          data: ['二七区', '金水区', '惠济区']
        },
        yAxis: [{
          name: '合格率(%)',
          nameLocation: 'end',
          type: "value"
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        }, {
          name: '合格率(%)',
          nameLocation: 'end',
          type: 'value',
          // min: 0,
          // max: 100,
          // interval: 10
        }],
        series: [
          {
            type: "bar",
            barWidth: "20%",
            data: [17, 10, 6]
          },
          {
            yAxisIndex: 1,
            type: "line",
            data: [17, 10, 6]
          }
        ]
      },

      // searchQuery: {
      //   district: [],
      //   date: ""
      // },
      // districts: [
      //   {
      //     label: "东区",
      //     value: "410000"
      //   }
      // ]
    };
  },
  created() {
    this.getData();
    // this.getArea();
  },
  methods: {
    getData() {
      this.jiGouName = '';
      let query = {
        // areaCode: this.query.area,
        dateStart: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        dateEnd: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : ''
      }
      let query2 = {
        pageNum: 1,
        pageSize: 10,
        name: '',
        dateStart: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        dateEnd: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : ''
      }
      this.$ajax(url.getCar, query).then(res => {
        this.points[0].val = res.data;
      });
      /*this.$ajax(url.getIntoNum, query).then(res => {
        this.points[1].val = res.data;
      });*/
      this.$ajax(url.getOrganization, query).then(res => {
        this.points[1].val = res.data;
      });
      this.$ajax(url.getBtgCar, query).then(res => {
        this.points[2].val = res.data;
      });
      /*this.$ajax(url.getRote, query).then(res => {
        this.points[3].val = res.data;
      });*/
      this.$ajax(url.getApprove, query).then(res => {
        this.barOptions.series[0].data = res.data.map(v => v.jgzs);
        // this.barOptions.series[1].data = res.data.map(v => v.rate);
        this.barOptions.xAxis.data = res.data.map(v => v.ssqy);
        // this.barOptions.title.text = '审验车辆数据';
        // this.finishRatio = res.data;
      });
      this.$ajax(url.getType, query).then(res => {  // 任务类型
        this.bar3Options.series[0].data = res.data.map(v => v.tgl);
        // this.bar3Options.series[1].data = res.data.map(v => v.rate);
        this.bar3Options.xAxis.data = res.data.map(v => v.ssqy);
        // this.bar3Options.title.text = '检查类型统计';
      })
      this.$ajax(url.getJcjgTj, query2).then(res => {  // 检验机构排名统计
        this.tableTopData = res.data.list;
        this.dataTotal = res.data.total;
      })
    },
    // 分页参数变动触发
    handleCurrentChange (val) {
      this.pagePram.page = val;
      this.searchByJgMc();
    },
    handleSizeChange (size) {
      this.pagePram.pageSize = size;
      this.searchByJgMc();
    },
    // 通过机构名称查询机构排名
    searchByJgMc () {
      let query = {
        pageNum: this.pagePram.page,
        pageSize: this.pagePram.pageSize,
        name: this.jiGouName,
        dateStart: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        dateEnd: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : ''
      }
      this.$ajax(url.getJcjgTj, query).then(res => {  // 检验机构排名统计
        this.tableTopData = res.data.list;
        this.dataTotal = res.data.total;
      })
    },
    // 获取区域
    /*getArea() {
      this.$ajax(url.getArea, {}).then(res => {
        if(res.success) {
          this.dicts.areaOptions = res.data;
        }
      })
    },*/
  }
};
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 60px;
  // height: calc(100% - 100px);
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  .title {
    color: #333333;
    font-weight: 700;
    line-height: 20px;
    margin: 20px 0;
  }
  .points {
    margin-top: 15px;
    .point {
      color: #fff;
      // width: 24%;
      // margin-right: 15px;
      // width: 392px;
      height: 120px;
      border-radius: 6px;
      padding: 10px 14px;
      &.first {
        background-image: linear-gradient(135deg, #1890ff 0%, #51abff 100%);
      }
      &.second {
        background-image: linear-gradient(-45deg, #ffb27b 0%, #fa964e 100%);
      }
      &.third {
        background-image: linear-gradient(135deg, #1890ff 0%, #51abff 100%);
      }
      &.fourth {
        background-image: linear-gradient(161deg, #9170f5 0%, #b593ff 100%);
      }
      .key {
        line-height: 22px;
        font-size: 16px;
        text-align: left;
      }
      .val {
        font-size: 28px;
        text-align: center;
        margin-top: 16px;
      }
    }
  }
  // .charts {
  //   width: 100%;
  //   margin-top: 16px;
  //   .charts1 {
  //     width: 66%;
  //   }
  //   .charts2 {
  //     width: 32%;
  //   }
  //   .chart {
  //     width: 100%;
  //     height: 370px;
  //   }
  // }

  .chart3 {
    width: 100%;
    // height: 237px;
    height: 287px;
  }

  // .chart4 {
  //   width: 100%;
  //   height: 259px;
  //   .chart4_1 {
  //     width: 100%;
  //     height: 100%;
  //   }
  // }
  .card1{
    margin-top: 40px;
  }
  .el-card {
    margin-top: 20px;
  }
}
</style>
