<template>
  <div>
    title:案件派发详情
    <van-form @submit="onSubmit">
      <!-- <div class="van-cell van-field drop-container">
        <label>
          <i style="margin-left: -5px;color: #ee0a24;">*</i>案件来源：
        </label>
        <van-dropdown-menu>
          <van-dropdown-item v-model="userInfo.laiyuan" :options="laiyuanList" />
          <i class></i>
        </van-dropdown-menu>
      </div>-->
      <van-field v-model="userInfo.laiyuan" label="案件来源：" input-align="right" readonly />
      <van-field v-model="userInfo.area" readonly label="行政区域：" input-align="right" />
      <!-- 地区弹窗 -->
      <!-- <van-popup v-model="showAddr" position="bottom" :style="{ height: '40%' }">
        <van-area
          :area-list="areaList"
          :columns-num="3"
          value="410120"
          @confirm="addrConfirm"
          @cancel="addrleCancel"
        />
      </van-popup>-->
      <van-field v-model="userInfo.compName" readonly label="企业名称：" input-align="right" />
      <van-field name="radio" label="企业类型：">
        <template #input>
          <van-radio-group v-model="userInfo.compType" direction="horizontal">
            <van-radio name="1">企业类型 1</van-radio>
            <van-radio name="2">企业类型 2</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="污染类型：">
        <template #input>
          <van-radio-group v-model="userInfo.wuranType" direction="horizontal">
            <van-radio name="1" shape="square">污染类型 1</van-radio>
            <van-radio name="2" shape="square">污染类型 2</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="userInfo.date" label="执法期限：" readonly input-align="right" />
      <!-- <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </van-popup>-->

      <van-field
        v-model="userInfo.msg"
        readonly
        rows="1"
        autosize
        label="异常现象描述："
        label-width="120"
        type="textarea"
        input-align="left"
        style="display: inline-block;"
      />

      <p class="jiesoukeshi">
        <span>接收科室（1）</span>
      </p>
      <van-cell-group class="zhifarenList">
        <van-field
          readonly
          clickable
          required
          is-link
          label="接收科室"
          :value="value1"
          placeholder="选择接收科室"
          input-align="right"
          :rules="[{ required: true, message: '请选择科室！！' }]"
          @click="showPicker = true"
        />
      </van-cell-group>

      <p class="jiesoukeshi">
        <span>接收科室（2）</span>
      </p>
      <van-cell-group class="zhifarenList">
        <van-field
          readonly
          clickable
          required
          is-link
          label="接收科室"
          :value="value2"
          placeholder="选择接收科室"
          input-align="right"
          :rules="[{ required: true, message: '请选择科室！！' }]"
          @click="showPicker = true"
        />
      </van-cell-group>

      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>

      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">办理</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import dayjs from "dayjs";
import areaListInfo from "@/components/common/area";

export default {
  components: {
    areaListInfo
  },
  data() {
    return {
      userInfo: {
        area: "河南省-郑州市-金水区",
        compName: "刚刚好",
        compType: "1",
        wuranType: "1",
        date: "2020-2-14",
        zhifaRen: "",
        msg: "关于古怪",
        laiyuan: "上级督办"
      },
      // laiyuanList: [
      //   { text: "上级督办",  value: 0 },
      //   { text: "举报投诉", value: 1 },
      //   { text: "其他机构发现", value: 2 },
      //   { text: "其他渠道发现", value: 3 }
      // ],

      // showAddr: false,
      // areaList: areaListInfo,
      // valArr: [],
      // show: false,
      // date: "",
      // currentDate: new Date(),
      // minDate: new Date(2020, 0, 1),
      // maxDate: new Date(2025, 10, 1),
      showPicker: false,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      value1: "a",
      value2: "b"
    };
  },
  methods: {
    // showAddress() {
    //   this.showAddr = true;
    // },
    // addrConfirm(val) {
    //   // console.log(val)
    //   this.valArr = val;
    //   this.userInfo.area = val[0].name + "-" + val[1].name + "-" + val[2].name;
    //   this.showAddr = false;
    // },
    // addrleCancel() {
    //   this.showAddr = false;
    // },
    // showPopup() {
    //   this.show = true;
    // },
    handleConfirm(value) {
      this.userInfo.date = value;
      this.date = dayjs(value).format("YYYY-MM-DD");
      this.userInfo.date = this.date;
      this.show = false;
    },
    handleCancel() {
      this.userInfo.date = "";
      this.show = false;
    },
    onConfirm(value) {
      this.value1 = value;
      this.showPicker = false;
    },
    /** 获取案件调度详情
     * @comid 主业务id
     */
    getDiaodu() {
      this.http
        .post("getAjddInfo", {
          comid: ""
        })
        .then(res => {
          console.log("调度详情" + ":" + res);
        });
    },

    onSubmit(values) {
      console.log("submit", values);
      this.$router.push("/daiban");
    }
  },
  created() {
    this.getDiaodu();
  }
};
</script>
<style lang="scss" scoped>
/deep/.van-field__error-message {
  text-align: right;
}

.jiesoukeshi {
  padding: 10px;
  color: #908f94;
  font-size: 12px;
}

.add {
  font-size: 16px;
  color: #037afc;
  text-align: right;
  padding: 10px 20px;
}
</style>