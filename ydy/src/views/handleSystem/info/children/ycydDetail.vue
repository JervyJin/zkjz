<template>
  <div>
    <!-- 选项卡 -->
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="车辆信息" name="first">
        <span class="title">车辆基本信息:</span>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :md="6" lg="4">
            <div class="grid-content bg-purple">号码号牌:</div>
          </el-col>
          <el-col :md="6" lg="4">
            <div class="grid-content bg-purple-light">冀NX8985</div>
          </el-col>
          <el-col :md="6" lg="4">
            <div class="grid-content bg-purple">车牌颜色:</div>
          </el-col>
          <el-col :md="6" lg="4">
            <div class="grid-content bg-purple">蓝色</div>
          </el-col>
          <el-col :md="6" lg="4">
            <div class="grid-content bg-purple">号码号牌:</div>
          </el-col>
          <el-col :md="6" lg="4">
            <div class="grid-content bg-purple-light">冀NX8985</div>
          </el-col>
          <el-col :md="6" lg="4">
            <div class="grid-content bg-purple">车牌颜色:</div>
          </el-col>
          <el-col :md="6" lg="4">
            <div class="grid-content bg-purple">蓝色</div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="所属公司信息" name="second">
        <span class="title">所属公司信息</span>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <div class="grid-content bg-purple">公司名称:</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">天津菲尔特有限责任公司</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">工商登记号码:</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">THUEF1542121311</div>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <div class="grid-content bg-purple">责任人身份证:</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">22233</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">责任人联系方式:</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">123456723456</div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="当前状态" name="third">
        <span class="title">当前状态</span>
        <el-table :data="tableData" :header-row-style="rowClass" border stripe style="width: 100%">
          <el-table-column prop="date" label="状态" style="width:50%"></el-table-column>
          <el-table-column prop="name" label="达标" style="width:50%"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="执法信息" name="fourth">
        <span class="title">车辆执法信息:</span>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <div class="grid-content bg-purple">检查时间:</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">2017-12-25 13:35:30</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">检查地点:</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">河北省XXXXXXXXX</div>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <div class="grid-content bg-purple">检查人:</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">22233</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">检查内容:</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">123456723456</div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="监测信息" name="fiveth">
        <div class="menuList">
          <ul>
            <li
              v-for="(item,index) in list"
              :key="item.index"
              :class="{active:num==index}"
              @click="getNum(index)"
            >{{item}}</li>
          </ul>
        </div>
        <span class="title">最后一次遥感信息记录:</span>
        <div class="tabCon">
          <!-- 遥感 -->
          <div v-show="num==0">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <div class="grid-content bg-purple">监测机构:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">张店区站点1</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">点位编号:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">THUEF1542121311</div>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <div class="grid-content bg-purple">车道号:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">33</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">通过时间:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">2017-12-25 13:35:30</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple">速度:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">20.11:30</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">判定结果:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">不合格</div>
              </el-col>
            </el-row>
          </div>
          <!-- 年检 -->
          <div v-show="num==1">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <div class="grid-content bg-purple">监测站:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">张店区站点1</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">点位编号:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">THUEF1542121311</div>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <div class="grid-content bg-purple">检测方法:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">稳态工况法</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">检测时间:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">2017-12-25 13:35:30</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple">是否初检:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">是</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">判定结果:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">不合格</div>
              </el-col>
            </el-row>
          </div>
          <!-- 路检 -->
          <div v-show="num==2">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <div class="grid-content bg-purple">监测机构:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">郑州环保局</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">检测编号:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">T542121311</div>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <div class="grid-content bg-purple">车牌号码:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">冀B6XXXXX</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">车牌类型:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">轻型汽油车</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple">检测时间:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">2019、223、</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">检测结果:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">不合格</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">是否处罚:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">是</div>
              </el-col>
            </el-row>
          </div>
          <!-- IM站治理 -->
          <div v-show="num==3">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <div class="grid-content bg-purple">治理原因:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">尾气超标</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">治理站名称:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">郑州祥和汽车维修公司</div>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <div class="grid-content bg-purple">维修内容:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">OBD清洗</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">维修时间:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">2017-12-25 13:35:30</div>
              </el-col>
            </el-row>
          </div>
          <!-- 预警处罚清单 -->
          <div v-show="num==4">
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <div class="grid-content bg-purple">预警时间:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">2019-12-25 15：30：35</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">预警地点:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">郑州市和平大道</div>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="6">
                <div class="grid-content bg-purple">预警内容:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple-light">氮氧化合物超标</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">处理结果:</div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">已处理</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [
        { date: "当前尿素液位", name: "75%" },
        { date: "SCR下游NOx浓度", name: "ssdd" }
      ],
      num: 0,
      list: ["遥感", "年检", "路检", "IM站治理", "预警处罚清单"],
      
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    rowClass() {
      return "background: #fff;color: #909399;font-weight: 600;";
    },
    getNum(index) {
      console.log(index);
      this.num = index;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-tabs {
  border: none;
  .el-tabs__header {
    .is-active {
      color: #333;
      font-family: PingFangSC-Medium;
      border-top: 3px solid #1890ff;
    }
  }
  .el-tabs__content {
    line-height: 38px;
    .el-tabs__item {
      color: #333;
    }
    .el-tab-pane > .title {
      color: #333333;
      font-family: PingFangSC-Semibold;
    }
  }
}

/deep/ .el-form-item__label {
  font-family: PingFangSC-Regular;
  color: #333;
}
.el-row {
  font-family: PingFangSC-Regular;
  color: #606266;
}
.menuList {
  width: 562px;
  height: 40px;
  background-color: #fff;
}

ul {
  width: 100%;
  border-radius: 3px;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  color: #dbdbdb;
  font-size: 16px;
  line-height: 32px;
}

ul li {
  flex: 1;
  text-align: center;
  cursor: pointer;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
}

.tabCon {
  color: #999;
  font-size: 14px;
}
.active {
  color: #fff;
  background: #1890ff;
}
</style>
