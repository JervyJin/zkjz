<template>
  <div class="page" style="font-size: 18px">
    系统待建。。。
  </div>
  <!--<div class="page">
    <div class="searchBox">
      <el-form :inline="true" :model="query" class="user-search">
        <el-form-item label="区域：">
          <el-select v-model="query.area">
            <el-option :label="v.name" :value="v.id" v-for="v in dicts.areaOptions" :key="v.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询时间段：">
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
    </div>

    <el-row :gutter="20" class="points">
      <el-col :span="6" v-for="(v, i) in points" :key="i">
        <div :class="['point', i == 0 ? 'first' : i == 1 ? 'second' : i == 2 ? 'third': 'fourth']">
          <div class="key">{{v.key}}</div>
          <div class="val">{{v.val}}<span>条</span></div>
        </div>
      </el-col>
    </el-row>

    <div class="title">合格率统计</div>
    <el-card>
      &lt;!&ndash; <el-date-picker

        v-model="searchQuery.date"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-search">查询</el-button> &ndash;&gt;

      <vChart class="chart3" :options="barOptions" auto-resize />
    </el-card>

    <el-card class="card1">
      <el-table
        :data="listData"
        highlight-current-row
        v-loading="loading"
        border
        element-loading-text="拼命加载中"
      >
        <el-table-column align="center" type="index" width="60">
        </el-table-column>
        <el-table-column prop="name" label="4S店名称" width="160">
        </el-table-column>
        <el-table-column prop="sum" label="抽查总数" width="160">
        </el-table-column>
        <el-table-column prop="qualified" label="合格数" width="160">
        </el-table-column>
        <el-table-column prop="unqualified" label="不合格数" width="160">
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="160">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    &lt;!&ndash; 详情 &ndash;&gt;
    <el-dialog
      title="详情"
      :visible.sync="showDetail"
      width="30%">
      <el-form ref="form" :model="menuForm" label-width="80px">
        <el-form-item label="4S店名称:" prop="name">
          <el-input v-model="menuForm.name" placeholder="4S店名称" readonly/>
        </el-form-item>
        <el-form-item label="所属区域:" prop="areaName">
          <el-input v-model="menuForm.areaName" placeholder="所属区域" readonly />
        </el-form-item>
        <el-form-item label="地址:" prop="adress">
          <el-input v-model="menuForm.adress" placeholder="地址" readonly />
        </el-form-item>
        <el-form-item label="4S店名称:" prop="name">
          <el-input v-model="menuForm.name" placeholder="4S店名称" readonly />
        </el-form-item>
        <el-form-item label="法人:" prop="fr">
          <el-input v-model="menuForm.fr" placeholder="法人" readonly />
        </el-form-item>
        <el-form-item label="联系人:" prop="lxr">
          <el-input v-model="menuForm.lxr" placeholder="联系人" readonly />
        </el-form-item>
        <el-form-item label="联系人电话:" prop="lxrPhones">
          <el-input v-model="menuForm.lxrPhones" placeholder="联系人电话" readonly />
        </el-form-item>
        <el-form-item label="抽查总数:" prop="sum">
          <el-input v-model="menuForm.sum" placeholder="抽查总数" readonly />
        </el-form-item>
        <el-form-item label="合格数:" prop="qualified">
          <el-input v-model="menuForm.qualified" placeholder="合格数" readonly />
        </el-form-item>
        <el-form-item label="不合格数:" prop="unqualified">
          <el-input v-model="menuForm.unqualified" placeholder="不合格数" readonly />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDetail = false">取 消</el-button>
        <el-button type="primary" @click="showDetail = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>-->
</template>

<script>
import url from '@/servers/url-config.js';
import {formatDateToStr} from '@/utility/utility.js';

export default {
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
  .page{
  }
</style>
