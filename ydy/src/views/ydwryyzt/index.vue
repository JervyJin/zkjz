<template>
  <div class="page">
    <el-form :inline="true" :model="query">
      <!-- <el-form-item label="区域：">
        <el-input v-model="query.area" placeholder="请输入"></el-input>
      </el-form-item> -->
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
    <div style="margin-bottom: 24px">
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="point first">
            <div class="key">遥感监测点位总数</div>
            <div class="val">{{numsData.dwzs}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="point second">
            <div class="key">抓拍车总数</div>
            <div class="val">{{numsData.zpcbzs}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="point third">
            <div class="key">林格曼总数</div>
            <div class="val">{{numsData.lgmzs}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="point fourth">
            <div class="key">汽油车总数</div>
            <div class="val">{{numsData.qyzs}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="point fiveth">
            <div class="key">柴油车总数</div>
            <div class="val">{{numsData.cyzs}}</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="point sixth">
            <div class="key">超标两次总数</div>
            <div class="val">{{numsData.cblczs || 0}}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-row class="charts" :gutter="15">
      <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>监测黑烟车辆统计</span>
          </div>
          <vChart class="chart1" :options="piesOptions" auto-resize />
        </el-card>
      </el-col>
      <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>监测超标车辆统计</span>
          </div>
          <vChart class="chart1" :options="piesOptions1" auto-resize />
        </el-card>
      </el-col>
    </el-row>

    <el-row class="charts" :gutter="15">

      <el-col style="margin-top: 16px;">
        <el-card>
          <div slot="header" class="clearfix">
            <span>车辆处理结果统计</span>
          </div>
          <vChart class="chart1" :options="bar2Options" auto-resize />
        </el-card>
      </el-col>

      <el-col style="margin-top: 16px;">
        <el-card>
          <div slot="header" class="clearfix">
            <span>超标污染物统计</span>
          </div>
          <vChart class="chart1" :options="bar3Options" auto-resize />
        </el-card>
      </el-col>

      <el-col>
        <el-card style="margin-top: 16px;padding-bottom:10px;">
          <div slot="header" class="clearfix">
            <span>用车大户超标统计</span>
          </div>
          <div class="chart1">
            <el-form :inline="true" :model="orgForm">
              <el-form-item label="公司名：">
                <el-input v-model="orgForm.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="年份：">
                <!-- <el-select v-model="orgForm.year">
                  <el-option :label="v.name" :value="v.name" v-for="v in years" :key="v.id"></el-option>
                </el-select> -->
                <el-date-picker
                v-model="orgForm.year"
                type="year"
                format="yyyy 年"
                value-format="yyyy"
                placeholder="选择年">
              </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="getTable">查询</el-button>
                <el-button type="primary" icon="el-icon-delete" @click="reset">重置</el-button>
              </el-form-item>
            </el-form>
            <el-table
              height="400"
              class="table"
              :data="table"
              border
              stripe
            >
              <el-table-column type="index" prop="index" label="序号"></el-table-column>
              <el-table-column prop="xm" label="公司名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="dz" label="地址" show-overflow-tooltip></el-table-column>
              <el-table-column prop="syycls" label="车辆总数" show-overflow-tooltip></el-table-column>
              <el-table-column prop="cbcls" label="超标车辆数" show-overflow-tooltip></el-table-column>
              <el-table-column prop="cbdcs" label="超标次数"></el-table-column>
              <el-table-column prop="cbl" label="超标率(%)"></el-table-column>
              <el-table-column prop="year" label="年份"></el-table-column>
            </el-table>
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
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';

export default {
  data() {
    return {
      numsData:{},
      query: {
        date: [new Date(new Date().getTime() - 24*60*60*1000), new Date(new Date().getTime() - 24*60*60*1000)]
      },

      orgForm: {
        name:'',
        year:'',
        pageIndex: 1,
        pageSize: 10,
      },
      pageparm: {
        total: null
      },
      table: [],
      points: [
        {key: '点位个数', val: 152},
        {key: '点位垂直式个数', val: 34},
        {key: '点位水平式个数', val: 56},
        {key: '点位移动式个数', val: 52}
      ],
      bar3Options: {
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
          /*data: ['人员数', '比率'],
          top: "0"*/
        },
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          name: '污染物数量(毫克)',
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
            barWidth: "15%",
            data: []
          }
        ]
      },

      bar2Options: {
        color: ["#5094FF", "#64DAAC", "#FAC84A"],
        grid: {
          top: "25%",
          bottom: "20%",
          right: "5%",
          left: "10%"
        },
        // title: {
        //   text: "总量统计",
        //   left: "3%",
        //   top: "10%",
        //   textStyle: {
        //     fontSize: "0.072917rem",
        //     color: "#000",
        //     fontStyle: "normal"
        //   }
        // },
        tooltip: {},
        legend: {
          data: ["待处理", "已处理", "黑名单"],
          top: "0"
        },
        xAxis: {
          type: "category",
          axisLabel: { //字体倾斜
            rotate: 15
          },
          data: ['中原路', '秦岭路', '桐柏路']
        },
        yAxis: {
          type: "value",
          name: '车辆数(辆)',
          nameLocation: 'end',
          nameTextStyle: {
            fontSize: '10px',
            color: '#999999'
          }
        },
        series: [
          {
            name: "待处理",
            type: "bar",
            // barWidth: "15%",
            data: [12,34,56]
          },
          {
            name: "已处理",
            type: "bar",
            // barWidth: "15%",
            data: [12,34,56]
          },
          {
            name: "黑名单",
            type: "bar",
            // barWidth: "15%",
            data: [12,34,56]
          }
        ]
      },

      barOptions: {
        color: ['#5094FF', '#64DAAC', '#FAC84A'],
        grid: {
          top: '15%',
          bottom: '20%',
          right: '5%',
          left: '5%'
        },
        tooltip: {},
        legend: {
          data: ['合格数', '超标数', '合格率', '超标率'],
          top: '0'
        },
        xAxis: {
          type: 'category',
          data: ['04-13', '04-14', '04-15', '04-16', '04-17', '04-18', '04-19']
        },
        yAxis: [{
          name: '合格率(%)',
          nameLocation: 'end',
          type: 'value',
          nameTextStyle: {
            fontSize: '0.072917rem',
            color: '#999999'
          },
          min: 0,
          max: 1000,
          interval: 100
        }, {
          name: '比率(%)',
          nameLocation: 'end',
          type: 'value',
          nameTextStyle: {
            fontSize: '0.072917rem',
            color: '#999999'
          },
          min: 0,
          max: 100,
          interval: 10
        }],
        series: [
            {
                name: '合格数',
                type: 'bar',
                barWidth: '15%',
                barGap: '5%',
                data: [20, 232, 441, 654, 770, 530, 410]
            },
            {
                name: '超标数',
                type: 'bar',
                barWidth: '15%',
                data: [120, 482, 791, 834, 590, 930, 710]
            },
            {
                name: '合格率',
                type: 'line',
                yAxisIndex: 1,
                data: [13, 15, 13, 15, 13, 25, 22]
            },
            {
                name: '超标率',
                type: 'line',
                yAxisIndex: 1,
                data: [38, 27, 69, 25, 39, 75, 82]
            }
        ]
      },
      piesOptions: {
        color: ['#5094FF', '#64DAAC', '#FAC84A'],
        xAxis: {
          type: 'category',
          data: ['蓝牌', '黄牌', '白牌', '黑牌']
        },
        yAxis: [{
          name: '车辆数(辆)',
          nameLocation: 'end',
          type: 'value',
          nameTextStyle: {
            fontSize: '0.072917rem',
            color: '#999999'
          },
          min: 0,
          // max: 1000,
          // interval: 100
        }],
        legend: {
          data: ['车辆数'],
          top: '0'
        },
        grid: {
          top: '15%',
          bottom: '15%',
          right: '15%',
          left: '15%'
        },
        tooltip: {
          // trigger: 'item',
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '车辆数',
            type: 'bar',
            data: [100, 200, 300, 500],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      piesOptions1: {
        color: ['#5094FF', '#64DAAC', '#FAC84A'],
        xAxis: {
          type: 'category',
          data: ['蓝牌', '黄牌', '白牌', '黑牌']
        },
        yAxis: [{
          name: '车辆数(辆)',
          nameLocation: 'end',
          type: 'value',
          nameTextStyle: {
            fontSize: '0.072917rem',
            color: '#999999'
          },
          min: 0,
          // max: 1000,
          // interval: 100
        }],
        legend: {
          data: ['车辆数'],
          top: '0'
        },
        grid: {
          top: '15%',
          bottom: '15%',
          right: '15%',
          left: '15%'
        },
        tooltip: {
          // trigger: 'item',
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '车辆数',
            type: 'bar',
            data: [100, 200, 300, 500],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  created() {
    this.getData();
    this.getTable();
  },
  methods: {
    getData() {
      let query = {
        dateStart: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[0]) : '',
        dateEnd: (this.query.date && this.query.date.length) ? formatDateToStr(this.query.date[1]) : ''
      }
      this.$ajax(url.getData, query).then(res => {
        if (res.success) {
          this.numsData = res.data;
        }
      });
      /*let query = {
        dateStart: this.query.date.length && formatDateToStr(this.query.date[0]) || '',
        dateEnd: this.query.date.length && formatDateToStr(this.query.date[1]) || ''
      }*/
      // 车辆处理结果统计
      this.$ajax(url.getCarHandle, query).then(res => {
        if(res.success) {
          this.bar2Options.xAxis.data = res.data.map(v => v.jzmc);
          this.bar2Options.series[0].data = res.data.map(v =>v.dclzs)
          this.bar2Options.series[1].data = res.data.map(v =>v.yclzs)
          this.bar2Options.series[2].data = res.data.map(v =>v.hmd)

          // this.bar2Options.legend = {
          //   bottom: '10%',
          //   data: res.data.map(v => v.jzmc)
          // }
          // this.barOptions.title.text = '不合格站点分布';
          // this.finishRatio = res.data;
        }
      });
      // 监测超标车辆统计
      this.$ajax(url.getCbcl, query).then(res => {

        if(res.success) {
          this.piesOptions1.series[0].data = res.data.map((item,index)=>{
            return {value: item.cls, name: item.hpysName}
          })
        }
      });
      // 监测黑烟车辆统计
      this.$ajax(url.blackSmokeCar, query).then(res => {
        if(res.success) {
          this.piesOptions.series[0].data = res.data.map((item,index)=>{
            return {value: item.cls, name: item.hpysName}
          })

        }
      });
      // 超标污染物统计
      this.$ajax(url.totalByQiti, {}).then(res => {
        if(res.success) {
          this.bar3Options.xAxis.data = res.data.map((item,index)=>{
            return item.name
          })
          this.bar3Options.series[0].data = res.data.map((item,index)=>{
            return item.value
          })
          /*this.bar3Options.series[1].data = res.data.map((item,index)=>{
            return item.value
          })*/
        }
      });
    },


    getTable(){
      // 用车大户超标排名
      this.$ajax(url.getBigFamilyTop20, this.orgForm).then(res => {
        if(res.success) {
          this.table = res.data.list;
          this.pageparm.total = res.data.total;
          // 不四舍五入保留3位小数
          // this.table.forEach(v => v.cbl = Math.floor(v.cbl * 1000) / 1000);
        }
      });
    },
    reset(){
      this.orgForm={};
      this.getTable();
    },
    // 分页事件
    handleCurrentChange(page) {
      this.orgForm.pageIndex = page;
      this.getTable()
    },
    handleSizeChange(size) {
      this.orgForm.pageSize = size;
      this.getTable()
    },
  }
};
</script>

<style lang="less" scoped>
  .page{
    font-size: 14px;
    padding-bottom: 60px;
    // height: calc(100% - 100px);
    overflow-x: hidden;
    height: 100%;
    overflow-y: auto;
    .searchBox{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .el-input{
        width: 150px;
      }
      .el-range-editor--mini.el-input__inner{
        width: 280px;
      }
    }
    .title{
      color: #333333;
      font-weight: 700;
      line-height: 20px;
      margin: 20px 0;
    }
    .point{
      color: #fff;
      // width: 24%;
      // width: 392px;
      height: 120px;
      border-radius: 6px;
      padding: 16px 24px;
      box-sizing: border-box;
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
      &.fiveth{
        background-image: linear-gradient(161deg, #72e655 0%, #92e08e 100%);
      }
      &.sixth{
        background-image: linear-gradient(161deg, #c3eb15 0%, #b2df4a 100%);
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
    .charts{
      width: 100%;
      margin-top: 16px;
      .chart1{
        width: 100%;
        height: 368px;
      }
    }

    .chart3{
      width: 100%;
      height: 237px;
    }

    .chart4{
      width: 100%;
      height: 259px;
      .chart4_1{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
