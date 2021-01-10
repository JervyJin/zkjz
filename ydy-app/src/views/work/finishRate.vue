<template>
  <div class="page">
    <van-cell title="要求完成时限：" size="large" is-link :value="date" @click="show = true">
      
    </van-cell>
    <van-calendar v-model="show" type="range" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate"/>
    <!-- <div class="query van-hairline--top-bottom">
      <div>
        <span>下达次数<van-icon name="arrow-down" /></span>
        <span class="iconfont icon-zu3-copy"></span>
      </div>
      <div class="second">
        <span>完成次数<van-icon name="arrow-down" /></span>
        <span class="iconfont icon-zu3-copy"></span>
      </div>
      <div>
        <span>完成率<van-icon name="arrow-down" /></span>
        <span class="iconfont icon-zu3-copy"></span>
      </div>
    </div> -->
    <div class="table">
      <table>
        <tr class="th">
          <td>区域名称</td>
          <td>下达次数</td>
          <td>完成次数</td>
          <td>完成率(%)</td>
        </tr>
        <tr v-for="(v, i) in tableData" :key="i">
          <td>{{v.name}}</td>
          <td>{{v.count}}</td>
          <td>{{v.doneCount}}</td>
          <td>{{v.ratio}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import url from "@/service/url-config.js";
export default {
  data() {
    return {
      query: '',
      date: '请选择时间段',
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      startTime:'',
      endTime:'',
      tableData: [
        // {
        //   name: '中原区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '二七区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '管城回族区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '金水区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '上街区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '中原区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '二七区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '管城回族区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '金水区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '上街区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '惠济区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '中牟县',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '经开区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '高新区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '航空港区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '巩义区',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '荥阳市',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '新密市',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '新郑市',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
        // {
        //   name: '登封市',
        //   count: '280',
        //   doneCount: '275',
        //   ratio: '98.21%'
        // },
      ]
    }
  },
  created() {
    this.getData();
  },
  methods: {
    onConfirm(date) {
      console.log(date)
      this.startTime = date[0].getFullYear() + "-" + (date[0].getMonth() + 1) + "-" + date[0].getDate();
      this.endTime = date[1].getFullYear() + "-" + (date[1].getMonth() + 1) + "-" + date[1].getDate();
      this.date = `${this.startTime}~${this.endTime}`;
      this.show=false;
      this.getData();
    },
    getData() {
      // let startTime = this.query.length && formatDateToStr(this.formInline.finishTime[0]) || '';
      // let endTime = this.query.length && formatDateToStr(this.formInline.finishTime[1]) || '';
      this.$http.post(url.workDoneApp, {
        startTime: this.startTime,
        endTime: this.endTime,
      }).then(res => {
        if(res.success) {
          this.tableData = res.data;
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
  .page{
    height: calc(100vh - 52px);
    overflow: hidden;
    .query {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 40px;
      width: 100%;
      // border-top: .5px solid #E7E7E7;
      // border-bottom: .5px solid #E7E7E7;
      background: #fff;
      div {
        flex-grow: 1;
        text-align: center;
      }
      .second{
        border-left: .5px solid #E7E7E7;
        border-right: .5px solid #E7E7E7;
      }
    }
    .table {
      padding: 15px;
      height: calc(100% - 103px);
      overflow-y: auto;
      table {
        width: 100%;
        border-collapse: collapse;
        .th {
          td {
            height: 40px;
          }
        }
        td {
          height: 32px;
          border: .5px solid #ccc;
          text-align: center;
          vertical-align: middle;
          font-size: 13px;
          color: #333333;
        }
      }
    }
  }
</style>