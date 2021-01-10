<template>
  <div style="overflow: auto;height: 100%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index/page1' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="isShowBreadcrumb" :to="{ path: '/zfxt/ycyd' }">一车一档</el-breadcrumb-item>
      <el-breadcrumb-item>机动车档案库</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="menuList" style="width: 1100px;margin: 30px 0 15px;height: 80px;">
      <ul style="margin: 0 0 10px;">
        <li
          class="icon-li"
          v-for="(item,index) in carTypeList"
          :key="index"
          :class="{iconActive: queryNumber==index}"
          @click="getQueryNum(index)"
        >{{item}}</li>
      </ul>
      <ul style="margin: 0 0 10px;">
        <li
          class="icon-li"
          v-for="(item,index) in carTypeList2"
          :key="index + 7"
          :class="{iconActive: queryNumber==(index + 7)}"
          @click="getQueryNum(index + 7)"
        >{{item}}</li>
      </ul>
    </div>
    <el-form :inline="true">
      <el-form-item label="号码号牌：">
        <el-input placeholder="请输入号码号牌" clearable v-model.trim="query"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchData()">查询</el-button>
      </el-form-item>
    </el-form>
    <div :hidden="isHiddenTabs">
      <!-- 选项卡 -->
      <el-tabs v-if="carInfoTab.lisence" v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="车辆信息" name="first">
          <span class="title">车辆基本信息:</span>
          <el-row>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">号码号牌:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple-light">{{carInfoTab.lisence || '-'}}</div>
            </el-col>
            <div v-if="carInfoTab.lisenceColor">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">车牌颜色:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.lisenceColor || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.clys">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">车辆颜色:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple-light">{{carInfoTab.clys || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.xszh">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">行驶证号:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple-light">{{carInfoTab.xszh || '-'}}</div>
              </el-col>
            </div>
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">企业ID:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple-light">{{carInfoTab.qyid || '-'}}</div>
            </el-col>-->
            <div v-if="carInfoTab.quality">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">基准质量(kg):</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple-light">{{carInfoTab.quality || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.lisenceType">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">号牌种类:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.lisenceType || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.carModel">
              <el-col :md="6" :lg="4">
                <div class="grid-content bg-purple">车辆型号:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.carModel || '-'}}</div>
              </el-col>
            </div>
            <!-- <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">是否有燃料蒸发控制装置:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.fuelControSet || '-'}}</div>
            </el-col> -->
            <div v-if="carInfoTab.ownerName">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">车主姓名:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.ownerName || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.ownerPhone">
              <el-col :md="6" :lg="4">
                <div class="grid-content bg-purple">车主电话:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.ownerPhone || '-'}}</div>
              </el-col>
            </div>
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">后处理种类:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.handleType || '-'}}</div>
            </el-col>-->
            <div v-if="carInfoTab.carIdentifyNum">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">车辆识别代号:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.carIdentifyNum || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.ownerAddress">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">车主地址:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.ownerAddress || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.odometerNum">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">里程表读数:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.odometerNum || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.firstRegisteDate">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">初次登记日期:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.firstRegisteDate || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.makeDate">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">制造日期:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.makeDate || '-'}}</div>
              </el-col>
            </div>
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">是否有OBD:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.obdFlag || '-'}}</div>
            </el-col>-->
            <div v-if="carInfoTab.carType">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">车辆类型:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.carType || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.tradeMark">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">商标:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.tradeMark || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.vehicleStatus">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">机动车状态:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.vehicleStatus || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.carProductCompany">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">车辆生产厂:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.carProductCompany || '-'}}</div>
              </el-col>
            </div>
            <!-- <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">发动机生产厂:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.engineProductCompany || '-'}}</div>
            </el-col> -->
            <!-- <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">是否有EGR:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.egrFlag || '-'}}</div>
            </el-col> -->
            <div v-if="carInfoTab.engineModel">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">发动机型号:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.engineModel || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.engineNumber">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">发动机编号:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.engineNumber || '-'}}</div>
              </el-col>
            </div>
            <!-- <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">是否有后处理装置:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.handleSet || '-'}}</div>
            </el-col> -->
            <div v-if="carInfoTab.engineDisplacement">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">发动机排量(L):</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.engineDisplacement || '-'}}</div>
              </el-col>
            </div>
            <div v-if="carInfoTab.enginePower">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">发动机额定功率(Kw):</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.enginePower || '-'}}</div>
              </el-col>
            </div>
            <!-- <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">是否电控:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.isElectirc || '-'}}</div>
            </el-col> -->
            <!-- <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">发动机额定转速(r/min):</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.engineSpeed || '-'}}</div>
            </el-col> -->
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">排放标准阶段:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.dischargeStage || '-'}}</div>
            </el-col>-->
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">气缸数:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.cylinderNum || '-'}}</div>
            </el-col>-->
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">变速器形式:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.transmissionShape || '-'}}</div>
            </el-col>-->
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">进气方式:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.inletType || '-'}}</div>
            </el-col>-->
            <!-- <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">是否有关闭车身稳定(如ESP):</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.isClosestable || '-'}}</div>
            </el-col> -->
            <div v-if="carInfoTab.fuelType">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">燃料种类:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.fuelType || '-'}}</div>
              </el-col>
            </div>
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">燃料供给系统形式:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.fuelSupplyType || '-'}}</div>
            </el-col>-->
            <div v-if="carInfoTab.carNo">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">机动车序号:</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.carNo || '-'}}</div>
              </el-col>
            </div>
            <!--<el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">驱动方式:</div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="6" :lg="4">
              <div class="grid-content bg-purple">{{carInfoTab.driveType || '-'}}</div>
            </el-col>-->
            <div v-if="carInfoTab.maxMass">
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">最大重质量(Kg):</div>
              </el-col>
              <el-col :xs="24" :sm="12" :md="6" :lg="4">
                <div class="grid-content bg-purple">{{carInfoTab.maxMass || '-'}}</div>
              </el-col>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="所属公司信息" name="second">
          <span class="title">所属公司信息</span>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content bg-purple">企业名称:</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">{{companyInfoTab.qymc || '-'}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">注册地址:</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{companyInfoTab.zcdz || '-'}}</div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content bg-purple">法人姓名:</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">{{companyInfoTab.frxm || '-'}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">法人联系方式:</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{companyInfoTab.lxfs || '-'}}</div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content bg-purple">社会信用代码:</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">{{companyInfoTab.shxydm || '-'}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">联系人:</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{companyInfoTab.lxr || '-'}}</div>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content bg-purple">联系人机构:</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">{{companyInfoTab.lxrjg || '-'}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">联系方式-机构:</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">{{companyInfoTab.lxfsjg || '-'}}</div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="当前状态" name="third">
          <span class="title">当前状态</span>
          <el-table :data="statusTableData" :header-row-style="rowClass" border stripe style="width: 100%">
            <el-table-column prop="date" label="状态名" style="width:50%"></el-table-column>
            <el-table-column prop="name" label="状态详情" style="width:50%"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="监测信息" name="fourth">
          <div class="menuList">
            <ul>
              <li
                v-for="(item,index) in list"
                style="flex: 1;"
                :key="index"
                :class="{active:num==index}"
                @click="getNum(index)"
              >{{item}}</li>
            </ul>
          </div>
          <span v-show="num==0" class="title">最后一次遥感信息记录:</span>
          <span v-show="num==1" class="title">最后一次车检信息记录:</span>
          <span v-show="num==2" class="title">最后一次路检信息记录:</span>
          <span v-show="num==3" class="title">M站治理:</span>
          <span v-show="num==4" class="title">预警处罚清单:</span>
          <span class="history-record" @click="openHistoryRecord()">查看历史记录</span>
          <div class="tabCon">
            <!-- 遥感 -->
            <div v-show="num==0">
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">点位编号:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.remote.dwbh || '-'}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">点位名称:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.remote.dwmc || '-'}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">超标时间:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.remote.cbsj || '-'}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">污染物:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.remote.wrw || '-'}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">超标次数:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.remote.cbcs || '-'}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">处理状态:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.remote.clzt || '-'}}</div>
                </el-col>
              </el-row>
              <el-row class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">处理结果:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.remote.cljg || '-'}}</div>
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
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.yearCheck.monitorOrg}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">点位编号:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.yearCheck.code}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">检测方法:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.yearCheck.method}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">检测时间:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.yearCheck.time}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">是否初检:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.yearCheck.isFirst}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">判定结果:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.yearCheck.result}}</div>
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
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.rote.monitorOrg}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">检测编号:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.rote.code}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">车牌号码:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.rote.cph}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">车牌类型:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.rote.cpType}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">检测时间:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.rote.time}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">检测结果:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.rote.result}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">是否处罚:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.rote.isPunish}}</div>
                </el-col>
              </el-row>
            </div>
            <!-- IM站治理 -->
            <div v-show="num==3">
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">故障来源:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.IMStation.gzlymc || '-'}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">燃油类型:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.IMStation.rylxmc || '-'}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">监测站名称:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.IMStation.jczmc || '-'}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">检测方法:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.IMStation.jcff || '-'}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">不合格说明:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.IMStation.bhgsm || '-'}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">点位类型:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.IMStation.dwlx || '-'}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">是否反馈:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.IMStation.sffkmc || '-'}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">创建时间:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.IMStation.cjsj || '-'}}</div>
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
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.warn.time}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">预警地点:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.warn.adress}}</div>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <div class="grid-content bg-purple">预警内容:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple-light">{{monitorInfoTab.warn.comment}}</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">处理结果:</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">{{monitorInfoTab.warn.result}}</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <div v-else>请输入查询内容</div> -->
    <el-dialog title="历史记录" :visible.sync="isShowHistory" width="65%">
      <div style="min-height: 400px">
        <el-table class="table"
          :data="historyGridData"
          height="350"
          border>
          <el-table-column label="序号" type="index" align="center"></el-table-column>
          <el-table-column v-for="(item, i) of gridConfigColumn" :prop="item.prop" :key="i"
            :label="item.label" :width="item.width">
          </el-table-column>
          <!--<el-table-column prop="taskName" label="任务名称"></el-table-column>-->
          <!--<el-table-column prop="created" label="时间"></el-table-column>-->

        </el-table>
        <el-pagination v-if="historyGridData.length"
          background
          layout="total, sizes, prev, pager, next"
          :current-page="pagePram.currentPage"
          :page-size="pagePram.pageSize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :total="pagePram.total">
        </el-pagination>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import url from '@/servers/url-config.js';
export default {
  data() {
    return {
      query: '',
      queryNumber: 0,
      activeName: "first",
      carInfoTab: {},
      companyInfoTab: {},
      statusInfoTab: {},
      monitorInfoTab: {
        remote: {},
        yearCheck: {},
        rote: {},
        IMStation: {},
        warn: {}
      },
      tab1: {},
      statusTableData: [
        {date: '海拔', name: ''},
        {date: '定位状态', name: ''},
        {date: '经度', name: ''},
        {date: '维度', name: ''},
        {date: '速度', name: ''},
        {date: '定位时间', name: ''},
        {date: '方向', name: ''},
      ],
      num: 0,
      list: ["遥感", "年检", "路检", "M站治理", "预警处罚清单"],
      carTypeList: ['交警支队车辆', '城建局_水泥罐车', '城管局_渣土车', '交通局_两客一危', '教育局_校车', '公交车', '邮政车'],
      carTypeList2: ['门禁管控车辆', '遥感监测车辆', '重型柴油车', '非道路机械'],
      tabContents: ["dhiiheddddddss"],
      isShowHistory: false,
      historyGridData: [],
      gridConfigColumn: [],
      remoteColumnList: [{prop: "wrw", label: "超标污染物"}, {prop: "clzt", label: "处理状态"},
        {prop: "cljg", label: "处理结果"}, {prop: "cbsj", label: "超标时间"}],
      yearCheckColumnList: [{prop: "time", label: "时间"}, {prop: "monitorOrg", label: "监测机构"},
        {prop: "code", label: "点位编号"}, {prop: "method", label: "检测方法"},
        {prop: "isFirst", label: "是否初检", width: 200}, {prop: "result", label: "判定结果"}],
      RoteCheckColumnList: [{prop: "time", label: "时间"}, {prop: "monitorOrg", label: "监测机构"},
        {prop: "code", label: "点位编号"}, {prop: "cph", label: "车牌号码"},
        {prop: "cpType", label: "车牌类型", width: 200},
        {prop: "result", label: "判定结果"},{prop: "isPunish", label: "是否处罚"}],
      iMColumnList: [{prop: "jczmc", label: "监测站名称"}, {prop: "gzlymc", label: "故障来源"},
        {prop: "rylxmc", label: "燃油类型"}, {prop: "sffkmc", label: "是否反馈"},
        {prop: "cjsj", label: "创建时间"}],
      warnColumnList: [{prop: "time", label: "时间"}, {prop: "adress", label: "预警地点"},
        {prop: "comment", label: "预警内容"}, {prop: "result", label: "处理结果"}],
      // 分页参数
      pagePram: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      isHiddenTabs: false,
      // 记录上次查到车辆的车型
      recordLastType: 0,
      // 记录上次查到车辆的车牌号
      recordLastLisence: '',
      cph: '',
      // 是否从一车一档跳转过来的
      isShowBreadcrumb: false,
    };
  },
  created() {
    if (this.$route.query.lisence) {
      this.isShowBreadcrumb = true;
      this.query = this.$route.query.lisence;
      this.queryNumber = Number(this.$route.query.num);
    }
    this.getData();
  },
  methods: {
    getData() {
      this.isHiddenTabs = false;
      let lisence = this.$route.query.lisence ? this.$route.query.lisence : this.query;
      if (this.query) {
        lisence = this.query;
      }
      if(!lisence) return;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.cph = lisence;
      let urls;
      // 根据queryNumber判断是哪种车型的详情
      switch (this.queryNumber) {
        case 0:
          urls = url.getJjzdListDetail;
          break;
        case 1:
          urls = url.getSngcListDetail;
          break;
        case 2:
          urls = url.getZtcListDetail;
          break;
        case 3:
          urls = url.getLkywListDetail;
          break;
        case 4:
          urls = url.getXcListDetail;
          break;
        case 5:
          urls = url.getGjcListDetail;
          break;
        case 6:
          urls = url.getSngcListDetail;
          break;
        case 7:
          urls = url.getMjclListDetail;
          break;
        case 8:
          urls = url.getYgjcListDetail;
          break;
        case 9:
          urls = url.getZxcycListDetail;
          break;
        case 10:
          urls = url.getFdljxListDetail;
          break;
      }
      // 获取车辆信息
      this.$ajax(urls, {cph: lisence}).then(res => {
        if (res.success) {
          if(!res.data) {
            this.$message({
              type: 'info',
              message: '查无数据！'
            })
          } else {
            this.carInfoTab = res.data.clxx ? res.data.clxx : {};
            this.companyInfoTab = res.data.qyxx ? res.data.qyxx : {};
            this.statusInfoTab = res.data.status ? res.data.status : {};
            this.monitorInfoTab.remote = res.data.ygxx ? res.data.ygxx : {};
            if (res.data.status) {
              this.getStatusByType();
            }
            if (this.carInfoTab.lisence) {
              // 记录是哪种车型
              this.recordLastType = this.queryNumber;
              this.recordLastLisence = this.query;
            }
          }

        } else {
          this.carInfoTab = {}
        }
        loading.close();
      });
      // 获取所属公司信息
      /*this.$ajax(url.getCompanyInfo, {cph: lisence}).then(res => {
        if (res.success) {
          this.companyInfoTab = res.data;
        }
      });*/
      // 获取状态信息
      /*this.$ajax(url.getStateInfo, {cph: lisence}).then(res => {
        if (res.success) {
          this.statusInfoTab = res.data;
          this.statusTableData[0].name = this.statusInfoTab.urea;
          this.statusTableData[1].name = `${this.statusInfoTab.NOPotency}(ppm)`;
          this.statusTableData[2].name = this.statusInfoTab.adress;
          this.statusTableData[3].name = this.statusInfoTab.lastDate;
          this.statusTableData[4].name = `${this.statusInfoTab.lastNum}L`;
        }
      });*/
      // 获取监测信息
      this.$ajax(url.getMSiteLastInfo, {lisence: this.cph}).then(res => {
        if (res.success && res.data) {
          this.monitorInfoTab.IMStation = res.data;
        } else {
          this.monitorInfoTab.IMStation = {};
        }
      });
    },
    handleClick(tab, event) {
    },
    rowClass() {
      return "background: #fff;color: #909399;font-weight: 600;";
    },
    getNum(index) {
      this.num = index;
    },
    getQueryNum (index) {
      if (this.queryNumber !== index) {
        this.queryNumber = index;
        this.query = '';
        this.isHiddenTabs = true;
        if (index === this.recordLastType) {
          this.isHiddenTabs = false;
          this.query = this.recordLastLisence
        }
      }
    },
    // 打开历史记录弹框
    openHistoryRecord () {
      this.isShowHistory = true;
      this.pagePram.pageSize = 10;
      this.pagePram.currentPage = 1;
      this.getHistoryData();
    },
    // 分页插件事件
    handleCurrentChange (val) {
      this.pagePram.currentPage = val;
      this.getHistoryData();
    },
    handleSizeChange(size) {
      this.pagePram.pageSize = size;
      this.getHistoryData();
    },
    // 根据不同的车型显示不同的状态信息
    getStatusByType () {
      switch (this.queryNumber) {
        case 1: case 2:
        case 10:
          this.statusTableData = [
            {date: '海拔', name: this.statusInfoTab.hb || ''},
            {date: '定位状态', name: this.statusInfoTab.dwzt || ''},
            {date: '经度', name: this.statusInfoTab.jd || ''},
            {date: '维度', name: this.statusInfoTab.wd || ''},
            {date: '速度', name: this.statusInfoTab.sd || ''},
            {date: '定位时间', name: this.statusInfoTab.dwsj || ''},
            {date: '方向', name: this.statusInfoTab.fx || ''},
          ];
          break;
      }
    },
    searchData () {
      if (!this.query) {
        this.$message({
          type: 'error',
          message: '请输入车牌号！'
        })
        return false;
      }
      this.getData();
    },
    // 根据不同的tab页获取相应历史记录表格数据
    getHistoryData () {
      let queryParam = {
        lisence: this.cph,
        pageIndex: this.pagePram.currentPage,
        pageSize: this.pagePram.pageSize
      };
      switch (this.num) {
        case 0:
          this.gridConfigColumn = this.remoteColumnList;
          this.$ajax(url.getYgjcYgLsListDetail, queryParam).then(res => {
            this.historyGridData = res.data.list;
            this.pagePram.total = res.data.total;
          });
          break;
        case 1:
          this.gridConfigColumn = this.yearCheckColumnList;
          this.$ajax(url.getYearCheckHistoryInfo, queryParam).then(res => {
            this.historyGridData = res.list;
            this.pagePram.total = res.total;
          });
          break;
        case 2:
          this.gridConfigColumn = this.RoteCheckColumnList;
          this.$ajax(url.getRoteCheckHistoryInfo, queryParam).then(res => {
            this.historyGridData = res.list;
            this.pagePram.total = res.total;
          });
          break;
        case 3:
          this.gridConfigColumn = this.iMColumnList;
          this.$ajax(url.getMSiteLsList, queryParam).then(res => {
            this.historyGridData = res.data.list;
            this.pagePram.total = res.data.total;
          });
          break;
        case 4:
          this.gridConfigColumn = this.warnColumnList;
          this.$ajax(url.getWarningHistoryInfo, queryParam).then(res => {
            this.historyGridData = res.list;
            this.pagePram.total = res.total;
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.el-tabs {
  border: none;
  .el-tabs__header {
    .is-active{color: #333;font-family: PingFangSC-Medium;border-top: 3px solid #1890FF;}
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
    .el-tab-pane > .history-record {
      margin-left: 20px;
      color: rgb(24, 144, 255);
      font-family: PingFangSC-Semibold;
      cursor: pointer;
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
  color: #909399;
  font-size: 16px;
  line-height: 32px;
}

ul li {
  /*flex: 1;*/
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
  .icon-li{
    width: 13%;
    text-align: center;
    cursor: pointer;
    border: none;
    border-radius: 3px;
    margin-right: 12px;
    background: url('~@/assets/image/short.png');
    background-size: cover;
    &:hover {
      color: #fff;
      background: url('~@/assets/image/short-selected.png');
      background-size: cover;
    }
  }
  .iconActive {
    color: #fff;
    background: url('~@/assets/image/short-selected.png');
    background-size: cover;
  }
</style>
