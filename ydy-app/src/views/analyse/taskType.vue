<template>
  <div class="page">
    <!-- <van-cell title="选择年份：" size="large">
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
        // title: {
        //   text: '汽油柴油分布',
        //   top: '5%',
        //   left: '5%',
        //   textStyle: {
        //     fontSize: '0.072917rem',
        //     color: '#333333',
        //     fontStyle: 'normal'
        //   }
        // },
        legend: {
          top: '5%',
          left: '7%',
          icon: 'roundRect',
          itemGap: 20,
          data: ['双随机任务', '专项行动', '后督察', '临时任务', '问题线索任务', '案件调查任务', '其他']
        },
        grid: {
          top: '15%',
          bottom: '15%',
          right: '15%',
          left: '15%'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '任务类型',
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '60%'],
            data: [
              // {value: 500, name: '双随机任务'},
              // {value: 400, name: '专项行动'},
              // {value: 260, name: '后督察'},
              // {value: 250, name: '临时任务'},
              // {value: 240, name: '问题线索任务'},
              // {value: 230, name: '案件调查任务'},
              // {value: 280, name: '其他'},
            ],
            label: {
              position: 'inside',
              formatter: '{c}'
            },
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
      this.$http.post(url.taskTypeRatio, {year: this.year}).then(res => {
        toast.clear();
        if(res.success) {
          if(!res.data.length) {
            Toast('暂无数据');
          }
          this.options.series[0].data = res.data;
          this.options.legend.data = res.data.map(v => v.name)
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
    height: 500px;
  }
</style>