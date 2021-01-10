<template>
  <div class="page">
    <!-- <van-cell title="选择时间段：" size="large">
      <template #default>
        <span>2020年</span><van-icon name="arrow" />
      </template>
    </van-cell> -->
    <van-cell title="选择年份" :value="year" @click="show = true" isLink/>

    <vChart class="chart" :options="options" />

    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import url from '@/service/url-config.js';
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      year: 2020,
      actions: [
        {name: 2020},
        {name: 2019}
      ],
      options: {
        color: ['#28A1FF', '#DF93FE', ' #FCA297', '#FFE06A', '#A0E89B', '#6BE7FD', '#7FF9DC'],
        title: {
          text: '执法量统计',
          top: '5%',
          left: '5%',
          textStyle: {
            fontSize: 13,
            color: '#333333',
            fontStyle: 'normal'
          }
        },
        grid: {
          left: '5%',
          right: '12%'
        },
        xAxis: {
          type: 'category',
          axisLabel: {
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
          data: []
          // data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value',
          position: 'right',
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
              return index == 0 ? 'transparent' : index == 1 ? '#4BB3F5' : index == 2 ? '#44B236': '#F5CB4B';
            },
            formatter: function(value, index) {
              if(value == 0) return ''
              return value;
            }
          },
          splitNumber: 3,
          splitLine:{
            show: true,
            lineStyle:{
              type: 'dashed',
              color: ['transparent', '#4BB3F5', '#44B236', '#F5CB4B']
            }
          }
        },
        series: [
          {
            name: '气体值',
            type: 'bar',
            itemStyle: {
              barBorderRadius: [15, 15, 0, 0]
            },
            barWidth: '35%',
            data: [
              // {value: 500, name: '1'},
              // {value: 400, name: '2'},
              // {value: 260, name: '3'},
              // {value: 250, name: '4'},
              // {value: 240, name: '5'},
              // {value: 230, name: '6'},
              // {value: 280, name: '7'},
              // {value: 260, name: '8'},
              // {value: 250, name: '9'},
              // {value: 240, name: '10'},
              // {value: 230, name: '11'},
              // {value: 280, name: '12'}
            ]
          }
        ]
      },
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
      this.$http.post(url.dispatchMonthCount, {year: this.year}).then(res => {
        toast.clear();
        if(res.success) {
          this.options.series[0].data = res.data.count;
          this.options.xAxis.data = res.data.xaxis;
        }
      })
    },
    onSelect(value, index) {
      this.actions[index].color = '#3686e7';
      this.year = value.name;
      this.show = false;
      setTimeout(_ => delete this.actions[index].color, 500);
      this.getData();
    },
  },
}
</script>

<style lang="less" scoped>
  .chart {
    width: 100%;
    height: 300px;
  }
</style>