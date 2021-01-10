<template>
  <div class="page">
    <!--<van-cell title="选择年份：" size="large">
      <template #default>
        <span>2020年</span><van-icon name="arrow" />
      </template>
    </van-cell>-->
    <van-cell title="选择年份" :value="year" @click="show = true" isLink/>

    <vChart class="chart" :options="options" />
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import echarts from 'echarts'
import url from '@/service/url-config.js';
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      year: new Date().getFullYear(),
      nowYear: new Date().getFullYear(),
      actions: [],
      options: {
        color: ['#1890FF', '#9070F5'],
        grid: {
          left: '5%',
          right: '5%',
          bottom: '62%',
        },
        legend: {
          top: '5%',
          left: 'center',
          itemGap: 40,
          data: ['检查家次', '出动人次'],
          icon: 'circle'
        },
        xAxis:{
          axisLabel: {
            rotate: 55,
            color: '#333'
          },
          axisLine:{
            lineStyle:{
              color: '#E7E7E7'
            }
          },
          axisTick: {
            show: false  // 刻度
          },
          type: 'category',
          data: []
        },
        yAxis: {
          position: 'right',
          type: 'value',
          min: 0,
          max: 30,
          axisTick: {
            show: false  // 刻度
          },
          axisLine:{
            show: false,
          },
          axisLabel: {
            inside: true,
            margin: 0,
            padding: [0, 0, 10, 0],
            color: function(value, index) {
              return index == 0 ? '#1890FF' : index == 1 ? '#44B236': '#F5CB4B';
            },
            formatter: function(value, index) {
              if(value == 0) return ''
              return value / 1 + '';
            }
          },
          splitNumber: 3,
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: ['transparent', '#F5CB4B', '#44B236', '#1890FF']
            }
          }
        },
        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },
        series: [
          {
            name: '检查家次',
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#1890FF'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#1890FF'
              }, {
                offset: 1,
                color: '#67B6FF'
              }])
            },
            data: []
          },
          {
            name: '出动人次',
            type: 'line',
            itemStyle: {
              color: '#9070F5'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#9070F5'
              }, {
                offset: 1,
                color: '#B593FF'
              }])
            },
            data: []
          }
        ]
      },
    }
  },
  created () {
    this.actions = [
      {name: this.nowYear},
      {name: this.nowYear - 1},
      {name: this.nowYear - 2}
      ];
    // 拿到统计图数据
    this.getData();
  },
  methods: {
    getData () {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
      this.$http.post(url.analysisStatistics, {year: this.year}).then(res => {
        toast.clear();
        if(res.success) {
          // 给表格配置项赋值
          this.options.xAxis.data = res.data.xaxis;
          this.options.series[0].data = res.data.taskCount.map((item, i) => {
            return {value: item, name: this.options.xAxis.data[i]};
          });
          this.options.series[1].data = res.data.userCount.map((item, i) => {
            return {value: item, name: this.options.xAxis.data[i]};
          });
        }
      })
    },
    // 时间改变查询数据
    onSelect(value, index) {
      this.actions[index].color = '#3686e7';
      this.year = value.name;
      this.show = false;
      setTimeout(_ => delete this.actions[index].color, 500);
      this.getData();
    },
  }
}
</script>

<style lang="less" scoped>
  .chart {
    width: 100%;
    height: 420px;
  }
</style>