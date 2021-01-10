<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(tab, i) in tabs" :key="i" :label="tab.label" :name="tab.name">
        <Tab1 v-if="tab.name==='first'" />
        <Tab2 v-if="tab.name==='second'" />
        <Tab3 v-if="tab.name==='third'" />
      </el-tab-pane>
      <el-tab-pane label="询问笔录" name="fourth" v-if="isShow">
        <Tab4 />
      </el-tab-pane>
      <el-tab-pane label="勘察笔录" name="fifth" v-if="isShow">
        <Tab5 />
      </el-tab-pane>
    </el-tabs>
    <div class="right">
      <div class="title">办理状态</div>
      <div class="content content1">
        <el-row>
          <el-col :span="12" class="key">业务类型:</el-col>
          <el-col :span="12" class="val">任务派发</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="key">当前环节:</el-col>
          <el-col :span="12" class="val">登记</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="key">办理人员:</el-col>
          <el-col :span="12" class="val">阿辉</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="key">环节开始时间:</el-col>
          <el-col :span="12" class="val">2020-03-09 10：41</el-col>
        </el-row>
      </div>
      <div class="title">下一环节办理人</div>
      <div class="content content2">
        <el-radio-group>
          <el-radio label="线上品牌商赞助"></el-radio>
        </el-radio-group>
      </div>
      <div class="title">意见</div>
      <div class="content content3">
        <el-input type="textarea" placeholder="请输入意见，字数限制在500字以内。"></el-input>
      </div>
      <div class="title">短信</div>
      <div class="content content4">
        <div class="tips">系统默认通过钉钉与短信通知办理人，您若不发短信可以取消勾选。</div>
        <el-checkbox-group>
          <el-checkbox label="发送短信通知" name="type" checked></el-checkbox>
        </el-checkbox-group>
        <div class="btns">
          <el-button type="primary">提交</el-button>
          <el-button>作废</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tab1 from "./tab1.vue";
import Tab2 from "./tab2.vue";
import Tab3 from "./tab3.vue";
import Tab4 from "./tab4.vue";
import Tab5 from "./tab5.vue";
export default {
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    Tab5
  },
  data() {
    return {
      tabs: [
        {
          label: "任务基础信息",
          name: "first"
        },
        {
          label: "现场检查情况",
          name: "second"
        },
        {
          label: "检查结论",
          name: "third"
        }
      ],
      activeName: "first",
      isShow: false
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === "third") {
        this.isShow = true;
      } else if (tab.name === "first" || tab.name === "second") {
        this.isShow = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  display: flex;
  width: 100%;
  padding-bottom: 60px;
  height: 100%;
  overflow-y: auto;
  .el-tabs {
    width: 79.4%;
    /deep/ .el-tabs__header {
      margin: 0;
    }
  }
  .right {
    width: 20.6%;
    border-left: 1px solid #f6f6f6;
    .title {
      background: #f6f6f6;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #4c4c4c;
      padding-left: 16px;
    }
    .content {
      padding: 16px 16px 0;
      &.content1 {
        height: 185px;
        .el-col {
          line-height: 20px;
          margin-bottom: 16px;
          font-size: 14px;
          &.key {
            color: #999999;
          }
          &.val {
            color: #333333;
          }
        }
      }
      &.content2 {
        height: 203px;
      }
      &.content3 {
        height: 204px;
        padding: 16px;
        /deep/.el-textarea.el-input--mini,
        /deep/ textarea {
          height: 100%;
        }
      }
      &.content4 {
        .tips {
          font-size: 14px;
          color: #333333;
          line-height: 20px;
          margin-bottom: 16px;
        }
        .btns {
          margin-top: 112px;
          padding-top: 12px;
          height: 56px;
          border-top: 1px solid #f6f6f6;
        }
      }
    }
  }
}
</style>