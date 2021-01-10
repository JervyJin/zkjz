<template>
  <div class="page">
    <el-form :inline="true" :model="searchQuery">
      <el-form-item label="日期：">
        <el-date-picker
          v-model="searchQuery.date"
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
     <!--<el-row class="points">
      <el-col :span="6" class="point first">
        <div class="key">任务完成率统计</div>
        <div class="val">64%</div>
      </el-col>
       <el-col :span="6" class="point second">
         <div class="key">任务完成情况统计</div>
         <div class="val">37件</div>
       </el-col>
    </el-row>-->
    <!-- 双随机任务数量 -->
    <el-card>
      <div slot="header" class="clearfix">
        <span>双随机任务数量</span>
      </div>
      <vChart class="chart3" :options="barOptions_status" auto-resize />
    </el-card>

    <!-- 双随机人员分布 -->
    <el-card>
      <div slot="header" class="clearfix">
        <span>双随机人员分布</span>
      </div>
      <vChart class="chart3" :options="bar2Options" auto-resize />
    </el-card>

    <!-- 双随机执法对象数量 -->
    <el-card>
      <div slot="header" class="clearfix">
        <span>双随机执法对象数量</span>
      </div>
      <vChart class="chart3" :options="barOptions" auto-resize />
    </el-card>
  </div>
</template>

<script>
import url from "@/servers/url-config.js";
import { formatDateToStr } from "@/utility/utility.js";

export default {
  data() {
    return {
      points: [
        { key: "任务完成率统计", val: 0 },
        { key: "任务完成情况统计", val: 0 },
      ],

      barOptions_status: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "25%",
          bottom: "25%",
          right: "5%",
          left: "10%",
        },
        // title: {
        //   text: "双随机任务数量",
        //   left: "5%",
        //   top: "5%",
        //   textStyle: {
        //     fontSize: "14",
        //     color: "#000",
        //     fontStyle: "normal"
        //   }
        // },
        tooltip: {},
        legend: {
          data: ["待办", "已办"],
          top: 0,
        },
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 15,
          },
          data: [],
        },
        yAxis: {
          name: '单位(条)',
          nameLocation: 'end',
          type: "value",
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "待办",
            type: "bar",
            // barWidth: "20%",
            data: [],
          },
          {
            name: "已办",
            type: "bar",
            data: [],
          },
          // {
          //   name: "延期",
          //   type: "bar",
          //   data: [420, 332, 291, 654, 590, 330, 810,930, 490,893,485,698]
          // },
        ],
      },

      bar2Options: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "25%",
          bottom: "25%",
          right: "5%",
          left: "10%",
        },
        // title: {
        //   text: "双随机人员分布",
        //   left: "5%",
        //   top: "5",
        //   textStyle: {
        //     fontSize: "14",
        //     color: "#000",
        //     fontStyle: "normal"
        //   }
        // },
        tooltip: {},
        legend: {
          data: ["人员分布"],
          top: "5%",
        },
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 15,
          },
          data: [],
        },
        yAxis: {
          name: '单位(人)',
          nameLocation: 'end',
          type: "value",
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "人员分布",
            type: "bar",
            barWidth: "30%",
            data: [],
          },
        ],
      },
      barOptions: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "25%",
          bottom: "25%",
          right: "5%",
          left: "10%",
        },
        // title: {
        //   text: "双随机执法对象数量",
        //   left: "5%",
        //   top: "5%",
        //   textStyle: {
        //     fontSize: "14",
        //     color: "#000",
        //     fontStyle: "normal"
        //   }
        // },
        tooltip: {},
        legend: {
          data: ["执法对象数量"],
          top: "5%",
        },
        xAxis: {
          type: "category",
          axisLabel: {
            rotate: 15,
          },
          data: [],
        },
        yAxis: {
          name: '单位(个)',
          nameLocation: 'end',
          type: "value",
          // nameTextStyle: {
          //   fontSize: '0.072917rem',
          //   color: '#999999'
          // }
        },
        series: [
          {
            name: "执法对象数量",
            type: "bar",
            barWidth: "30%",
            data: [120, 432, 641, 854, 970, 830, 810],
          },
        ],
      },

      searchQuery: {
        district: "",
        date: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)],
      },
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
  },
  methods: {
    getData() {
      let data = {
        startDate: (this.searchQuery.date && this.searchQuery.date.length) ? formatDateToStr(this.searchQuery.date[0]) : '',
        endDate: (this.searchQuery.date && this.searchQuery.date.length) ? formatDateToStr(this.searchQuery.date[1]) : '',
      };
      this.$ajax(url.getDoubleRandomData, data).then((res) => {
        if (res.success) {
          this.points[0].val = res.data.rwwcl || 0;
          this.points[1].val = res.data.rwwjzs || 0;
        }
      });
      this.$ajax(url.getLegalObjectNum, data).then((res) => {
        if (res.success) {
          this.barOptions_status.xAxis.data = res.data.map((v) => v.NAME);
          this.barOptions_status.series[0].data = res.data.map((v) => v.num);
        }
      });
      this.$ajax(url.getPersonDistribution, data).then((res) => {
        if (res.success) {
          this.bar2Options.xAxis.data = res.data.map((v) => v.NAME);
          this.bar2Options.series[0].data = res.data.map((v) => v.num);
        }
      });
      this.$ajax(url.getTaskNum, data).then((res) => {
        if (res.success) {
          this.barOptions.xAxis.data = res.data.map((v) => v.NAME);
          this.barOptions.series[0].data = res.data.map((v) => v.dbnum);
          this.barOptions.series[1].data = res.data.map((v) => v.ybnum);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 60px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .title {
    color: #333333;
    font-weight: 700;
    line-height: 20px;
    margin: 20px 0;
  }
  .flexData {
    //   display: flex;
    //   justify-content: space-around;
    margin-bottom: 40px;
    padding-left: 40px;
  }
  .points {
    margin: 15px 0;
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
  .card1 {
    margin-top: 40px;
  }
  .el-card {
    margin-bottom: 20px;
  }
}
</style>
