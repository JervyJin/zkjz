<template>
  <div class="page" style="font-size: 18px">
    系统待建。。。
  </div>
</template>

<script>
import url from "@/servers/url-config.js";
import { formatDateToStr } from "@/utility/utility.js";

export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 60px;
  height: 100%;
  overflow-y: auto;
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
    margin-top: 15px;
    .point {
      color: #fff;
      width: 24%;
      margin-right: 15px;
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
