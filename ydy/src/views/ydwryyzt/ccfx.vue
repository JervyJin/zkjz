<template>
  <div class="page">

    <div class="searchBox">
      <el-form :inline="true" :model="query" class="user-search">
        <!--<el-form-item label="区域：">
          <el-select v-model="query.area">
            <el-option :label="v.name" :value="v.id" v-for="v in dicts.areaOptions" :key="v.id"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="查询时间段：">
          <el-date-picker
            v-model="query.date"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-row class="points" :gutter="15">
      <el-col :span="6" v-for="(v, i) in points" :key="i">
        <div :class="['point', i == 0 ? 'first' : i == 1 ? 'second' : i == 2 ? 'third': 'fourth']">
          <div class="key">{{v.key}}</div>
          <div class="val">{{v.val}}</div>
        </div>
      </el-col>
      <!--<el-col :span="6">
        <div class="point first">
          <div class="key">检测不合格数</div>
          <div class="val">4%</div>
        </div>
      </el-col>-->
    </el-row>


    <el-card class="chart1">
      <div slot="header" class="clearfix">
        <span>入户检查统计</span>
      </div>
      <vChart class="chart" :options="barOptions" auto-resize />
    </el-card>
    <el-card class="chart1">
      <div slot="header" class="clearfix">
        <span>路检路查统计</span>
      </div>
      <div>
        <div class="right-time">
          <el-input style="width: 300px;margin: 0 20px 20px 0;" v-model="searchName" placeholder="请输入检测机构名称"></el-input>
          <el-button type="primary" @click="searchByJgMc">查询</el-button>
        </div>
        <el-table
          :data="tableData1"
          border
          stripe
        >
          <el-table-column prop="jcjgou" label="检测机构名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="dwlx" label="点位类型"></el-table-column>
          <el-table-column prop="zs" label="车辆总数"></el-table-column>
          <el-table-column prop="tgs" label="车辆通过数"></el-table-column>
          <el-table-column prop="btgs" label="车辆不通过数"></el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- <div class="title">遥感数据统计</div>
    <el-card>
      <el-form :inline="true" :model="searchQuery">
        <el-form-item label="日期">
          <el-date-picker
            v-model="searchQuery.date"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>

      <vChart class="chart" :options="barOptions1" />
      <vChart class="chart" :options="barOptions1" />
      <vChart class="chart" :options="barOptions1" />
    </el-card> -->

  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';
export default {
  data() {
    return {
      query: {
        // area: '',
        date: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)]
      },
      tableData1: [],
      searchName: '',
      dicts: {
        // areaOptions: []
      },

      points: [
        // {key: '当日直入黑名单数量', val: 0},
        {key: '当日检测数量', val: 0},
        // {key: '当日上线点位数量', val: 0},
        {key: '点位数量', val: 0},
        {key: '检测不通过数量', val: 0}
      ],

      barOptions: {
        color: ['#5094FF', '#64DAAC', '#FAC84A'],
        grid: {
          top: '15%',
          bottom: '10%',
          right: '5%',
          left: '10%'
        },
        // title: {
        //   text:'不合格站点分布',
        //   left: 0,
        //   textStyle: {
        //     fontSize: '0.072917rem',
        //     color: '#333'
        //   }
        // },
        tooltip: {},
        legend: {
          data: ['总数', '通过数', '不通过数'],
          top: '0',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            rotate: 10
          },
          data: ['中原区', '二七区', '管城区']
        },
        yAxis: {
          name: '单位(个)',
          nameLocation: 'end',
          type: 'value',
          // nameTextStyle: {
          //   fontSize: '10px',
          //   color: '#000'
          // }
        },
        series: [
          {
              name: '总数',
              type: 'bar',
              barWidth: '15%',
              data: [1260, 1050, 1680]
          },
          {
              name: '通过数',
              type: 'bar',
              barWidth: '15%',
              data: [1260, 1050, 1680]
          },
          {
              name: '不通过数',
              type: 'bar',
              barWidth: '15%',
              data: [1260, 1050, 1390]
          }
        ]
      },
      barOptions1: {
        color: ['#5094FF', '#64DAAC', '#FAC84A'],
        grid: {
          top: '15%',
          bottom: '20%',
          right: '5%',
          left: '10%'
        },
        title: {
          text:'按时间排序',
          left: 0,
          textStyle: {
            fontSize: '0.072917rem',
            color: '#333'
          }
        },
        tooltip: {},
        legend: {
          data: ['执行次数', '不合格率'],
          top: '0'
        },
        xAxis: {
          type: 'category',
          data: ['二七区', '惠济区', '金水区', '管城区', '中原区', '中牟县', '上街区', '巩义市']
        },
        yAxis: {
          name: '数量',
          nameLocation: 'end',
          type: 'value',
          nameTextStyle: {
            fontSize: '0.072917rem',
            color: '#999999'
          }
        },
        series: [
          {
            name: '合格数',
            type: 'bar',
            barWidth: '20%',
            data: [20, 232, 441, 654, 770, 530, 410, 356]
          },
          {
            name: '超标数',
            type: 'line',
            data: [120, 482, 391, 834, 590, 330, 710, 356]
          }
        ]
      },

      searchQuery: {
        district: [],
        date: ''
      },
      districts: [
        {
          label: '东区',
          value: '410000'
        }
      ]
    }
  },
  created() {
    this.getData();
    // this.getArea();
  },
  methods: {
    search() {
      this.getData();
    },
    searchByJgMc () {
      let query = {
        name: this.searchName,
        dateStart: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        dateEnd: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : ''
      }
      this.$ajax(url.getLjlctj, query).then(res => {
        this.tableData1 = res.data;
      });
    },
    getData() {
      this.searchName = '';
      let query = {
        // areaCode: this.query.area,
        dateStart: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        dateEnd: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : ''
      }
      /*this.$ajax(url.getBlackListLJ, query).then(res => {
        this.points[0].val = res.data;
      });*/
      this.$ajax(url.getMinitorLJ, query).then(res => {
        this.points[0].val = res.data;
      });
      /*this.$ajax(url.getOnlinePointLJ, query).then(res => {
        this.points[2].val = res.data;
      });*/
      this.$ajax(url.getPointLJ, query).then(res => {
        this.points[1].val = res.data;
      });
      this.$ajax(url.getBtgs, query).then(res => {
        this.points[2].val = res.data;
      });
      this.$ajax(url.getRyjctj, query).then(res => {
        this.barOptions.xAxis.data = res.data.map(v => v.jcjgou) || [];
        // this.barOptions.series[0].data = res.data.map(v => v.qualified);
        this.barOptions.series[0].data = res.data.map(v => v.zs) || [];
        // this.barOptions.series[1].data = res.data.map(v => v.unqualified) || [];
        this.barOptions.series[1].data = res.data.map(v => v.tgs) || [];
        // this.barOptions.series[2].data = res.data.map(v => v.monitorNum) || [];
        this.barOptions.series[2].data = res.data.map(v => v.btgs) || [];
        // this.barOptions.legend = {
        //   bottom: '10%',
        //   data: res.data.map(v => v.name)
        // }
        /*this.barOptions.xAxis.data = ['中原区', '二七区', '管城区', '金水区', '郑州高新技术产业开发区', '上街区', '惠济区',
          '郑州市郑东新区', '郑州经济技术开发区',];*/
        // this.barOptions.title.text = '不合格站点分布';
        // this.finishRatio = res.data;
      });
      this.$ajax(url.getLjlctj, query).then(res => {
        this.tableData1 = res.data;
      });
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
  .page{
    padding-bottom: 60px;
    // height: calc(100% - 100px);
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .title{
      color: #333333;
      font-weight: 700;
      line-height: 20px;
      margin: 20px 0;
    }
    .points{
      margin-top: 15px;
      .point{
        color: #fff;
        // width: 24%;
        // margin-right: 15px;
        // width: 392px;
        height: 120px;
        border-radius: 6px;
        padding: 10px 14px;
        &.first{
          background-image: linear-gradient(135deg, #1890FF 0%, #51ABFF 100%);
        }
        &.second{
          background-image: linear-gradient(-45deg, #FFB27B 0%, #FA964E 100%);
        }
        &.third{
          background-image: linear-gradient(135deg, #1890FF 0%, #51ABFF 100%);
        }
        &.fourth{
          background-image: linear-gradient(161deg, #9170F5 0%, #B593FF 100%);
        }
        .key{
          line-height: 22px;
          font-size: 16px;
          text-align: left;
        }
        .val{
          font-size: 28px;
          text-align: center;
          margin-top: 16px;
        }
      }
    }

    .chart{
      width: 100%;
      height: 411px;
    }

    .chart1{
      margin-top: 15px;
    }
  }
</style>
