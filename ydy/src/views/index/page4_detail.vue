<template >
  <div>
    <div class="query-content">
      <span>日期：</span>
      <div class="lujian-time">
        <!--<span>日期：</span>-->
        <el-date-picker type="daterange" range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        v-model="statisticsDate"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" class="query-button" @click="onQuery">查询</el-button>
    </div>
    <h1 class="title">郑州市路检统计</h1>
      <el-table :data="tableData" style="width: 99.9%" height="420">
      <el-table-column
        prop="city"
        label="点位名称"
        width="150"
      >
      </el-table-column>
      <!-- 多级表头 -->
      <el-table-column label="7月1日" align="center">
          <el-table-column
            prop="sum"
            label="总数"
          >
          </el-table-column>
          <el-table-column
            prop="buhege"
            label="不合格数"
          >
          </el-table-column>
          <el-table-column
            prop="ziru"
            label="直入数"
          >
          </el-table-column>
      </el-table-column>
      <el-table-column label="7月2日" align="center">
          <el-table-column
            prop="sum"
            label="总数"
          >
          </el-table-column>
          <el-table-column
          prop="buhege"
          label="不合格数"
          width="80">
          </el-table-column>
          <el-table-column
              prop="ziru"
              label="直入数"
          >
          </el-table-column>
      </el-table-column>

    </el-table>
    <el-pagination background
      layout="total, sizes, prev, pager, next"
                   :current-page="pageparm.currentPage"
                   :page-size="pageparm.pageSize"
                   :total="pageparm.total">
    </el-pagination>

  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          city: "新密市",
          sum: "123",
          buhege: "983",
          ziru: "837",
        },
        {
          city: "中牟县",
          sum: "456",
          buhege: "983",
          ziru: "837",
        },
      ],
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 12
      },
      statisticsDate: [new Date(), new Date()]
    }
  },
}
</script>

<style lang="less" scoped>
  .query-content {
    margin-top: 20px;
    .lujian-time {
      display: inline-block;
    }
    .query-button {
      float: right;
      margin-right: 20px;
    }
  }

.title {
  margin: 10px auto;
  text-align: center;
  color: #333333;
  font-size: 14px;
  font-weight: 600;
}
</style>
