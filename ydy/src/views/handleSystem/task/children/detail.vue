<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(tab, i) in tabs" :key="i" :label="tab.label" :name="tab.name">
        <Tab1 v-if="tab.name==='first'" :selectRow="selectRow" @saveTab="saveTab"/>
        <Tab3 v-if="tab.name==='second'" :selectRow="selectRow" @askOrgInfo="askOrgInfo" @saveTab="saveTab"/>
        <Tab4 v-if="tab.name==='third'" :selectRow="selectRow" @saveTab="saveTab"/>
        <Tab5 v-if="tab.name==='fourth'" :selectRow="selectRow" @saveTab="saveTab" :askOrgId="askOrgId" :askOrgName="askOrgName" />
        <Tab2 v-if="tab.name==='fiveth'" :selectRow="selectRow" />
        <Tab6 v-if="tab.name==='sixth'" :selectRow="selectRow" />
      </el-tab-pane>
    </el-tabs>
    <div class="close-icon" @click="goBack()">
      <i class="el-icon-close"></i>
    </div>
    <!-- <div class="right">
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
          <el-radio label="复核"></el-radio>
        </el-radio-group>
        <el-button type="text" icon="el-icon-plus" style="float: right">选择办理人</el-button>
      </div>
      <div class="title">意见
        <el-button type="text" icon="el-icon-plus" style="float: right">常用意见</el-button>
      </div>
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
    </div> -->
  </div>
</template>

<script>
import Tab1 from './tab1.vue'
import Tab2 from './tab2.vue'
import Tab3 from './tab3.vue'
import Tab4 from './tab4.vue'
import Tab5 from './tab5.vue'
import Tab6 from './tab6.vue'
export default {
  props: ['isYb', 'selectRow'],
  components: {
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    Tab5,
    Tab6
  },
  computed: {
    isWF () {
      return this.$store.state.task.isWF == 1
    },
    tabs () {
      // debugger;
      if (this.isWF) {
        if (!this.isYb) {
          return [
            {
              label: '任务基础信息',
              name: 'first'
            },
            {
              label: '现场检查情况',
              name: 'second'
            },
            {
              label: '勘查笔录',
              name: 'third'
            },
            {
              label: '询问笔录',
              name: 'fourth'
            },
            // {
            //   label: '行政处罚',
            //   name: 'fiveth'
            // },
            {
              label: '调查取证',
              name: 'sixth'
            }
          ]
        } else {
          return [
            {
              label: '任务基础信息',
              name: 'first'
            },
            {
              label: '现场检查情况',
              name: 'second'
            },
            {
              label: '勘查笔录',
              name: 'third'
            },
            {
              label: '询问笔录',
              name: 'fourth'
            },
            {
              label: '行政处罚',
              name: 'fiveth'
            },
            {
              label: '调查取证',
              name: 'sixth'
            }
          ]
        }
      } else {
        return [
          {
            label: '任务基础信息',
            name: 'first'
          },
          {
            label: '现场检查情况',
            name: 'second'
          },
          {
            label: '调查取证',
            name: 'sixth'
          }
        ]
      }
    }
  },
  data () {
    return {
      // tabs: [
      //   {
      //     label: '任务基础信息',
      //     name: 'first'
      //   },
      //   {
      //     label: '现场检查情况',
      //     name: 'second'
      //   },
      //   {
      //     label: '勘查笔录',
      //     name: 'third'
      //   },
      //   {
      //     label: '询问笔录',
      //     name: 'fourth'
      //   },
      // ],
      activeName: 'first',
      askOrgName: '',
      askOrgId: '',
    }
  },
  methods: {
    handleClick (tab, event) {
    },
    saveTab (v) {
      this.activeName = v;
    },
    goBack () {
      this.$emit('goBack', this.selectRow.taskType);
    },
    askOrgInfo (v) {
      this.askOrgName = v.askOrgName;
      this.askOrgId = v.askOrgId;
    }
  },
  created() {
    // alert(this.isYB)
  },
  watch: {
    activeName () {
      // document.getElementsByClassName('el-tabs__content')[1].scrollIntoView()
      document.getElementsByClassName('el-tabs__content')[1].scrollTop = 0;
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    height: calc(100% - 15px);
    overflow-y: hidden;
    position: relative;
    .close-icon{
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 0;
      font-size: 22px;
      cursor: pointer;
      i{
        font-weight: 700;
      }
      &:hover{
        color: #409EFF;
      }
    }
    .el-tabs{
      width: 100%;
      height: 100%;
      /deep/ .el-tabs__header{
        margin: 0;
      }
      /deep/ .el-tabs__content {
        height: 100%;
        overflow-y: auto;
        padding-bottom: 60px;
      }
    }
    .right{
      width: 20.6%;
      border-left: 1px solid #F6F6F6;
      .title{
        background: #F6F6F6;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #4C4C4C;
        padding-left: 16px;
      }
      .content{
        padding: 16px 16px 0;
        &.content1{
          height: 185px;
          .el-col{
            line-height: 20px;
            margin-bottom: 16px;
            font-size: 14px;
            &.key{
              color: #999999;
            }
            &.val{
              color: #333333;
            }
          }
        }
        &.content2{
          height: 203px;
        }
        &.content3{
          height: 204px;
          padding: 16px;
          /deep/.el-textarea.el-input--mini,/deep/ textarea{
            height: 100%;
          }
        }
        &.content4{
          .tips{
            font-size: 14px;
            color: #333333;
            line-height: 20px;
            margin-bottom: 16px;
          }
          .btns{
            margin-top: 112px;
            padding-top: 12px;
            height: 56px;
            border-top: 1px solid #F6F6F6;
          }
        }
      }
    }
  }
</style>
