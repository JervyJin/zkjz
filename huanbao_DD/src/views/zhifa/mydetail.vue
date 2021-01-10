<template>
  <div class="lxzfPage">
    <van-form @submit="onSubmit">
      <van-field
        v-model="params.xzqy"
        required
        label="行政区域："
        placeholder="行政区域"
        readonly
        input-align="right"
        is-link
        @click="showAddress"
      />
      <!-- 地区弹窗 -->
      <van-popup v-model="showAddr" position="bottom" :style="{ height: '40%' }">
        <van-area
          :area-list="areaList"
          :columns-num="3"
          value="410120"
          @confirm="addrConfirm"
          @cancel="addrleCancel"
        />
      </van-popup>
      <van-field
        v-model="params.qymc"
        required
        label="企业名称："
        placeholder="请输入"
        input-align="right"
        :rules="[{ required: true, message: '请填写企业名称！！' }]"
      />
      <van-field name="radio" label="企业类型：" required label-width="80">
        <template #input>
          <van-radio-group v-model="params.qylx" direction="horizontal">
            <van-radio name="0">{{qiyeType1}}</van-radio>
            <van-radio name="1">{{qiyeType2}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="污染类型：" required>
        <template #input>
          <van-checkbox-group v-model="params.wrlx" direction="horizontal">
            <van-checkbox name="0">{{wuranType1}}</van-checkbox>
            <van-checkbox name="1">{{wuranType2}}</van-checkbox>
          </van-checkbox-group>

        </template>
      </van-field>
    
      <van-field
        v-model="params.jcrq"
        required
        is-link
        readonly
        label="日期："
        @click="showPopup"
        placeholder="请选择"
        input-align="right"
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          item-height="40"
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </van-popup>

      <div v-for="(item,index) in zfrlists" :key="index">
        <p>
          <span>主要执法人明细</span>
          <span></span>
        </p>
        <van-field
          clickable
          label="执法人员："
          placeholder="选择执法人员"
          input-align="right"
          @click="getTXL"
          v-model="item.zfrname"
        />

        <p>
          <span>协助执法人明细</span>
          <span @click="del()" style="color:#037afc;">删除</span>
        </p>
        <van-field
          clickable
          is-link
          label="执法人员："
          placeholder="选择执法人员"
          input-align="right"
          @click="showPicker = true"
        />
      </div>

      <p class="add" @click="add">添加执法人员</p>

      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-field
        v-model="params.jcqk"
        required
        rows="1"
        autosize
        label="检查情况："
        label-width
        type="textarea"
        placeholder="请输入"
        input-align="right"
        :rules="[{ required: true, message: '请输入检查情况！！' }]"
      />
      <!-- 附件图片 -->
      <div class="photo">
        <p>相关附件</p>
        <van-uploader v-model="params.zxfxfiles" multiple :after-read="afterRead" />
      </div>
      <div>
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import dayjs from "dayjs";
import areaListInfo from "../../components/common/area";
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
// import { userInfo } from 'os';

let userinfos = JSON.parse(window.localStorage.getItem("userinfo"));
export default {
  components: {
    areaListInfo
  },
  data() {
    return {
      params: {
        xzqy: "河南省-郑州市-金水区",
        qymc: "", //企业名称
        qylx: "",
        wrlx: [],
        // jcrq: dayjs(new Date()).format("YYYY-MM-DD") ,
        jcrq: "",
        // userid:userinfos.userId,
        zfrlist:"",
        jcqk: "",
        zxfxfiles: []
        
      },
      zfrlists: [
          {
            // zfrname:userinfos.userName,
            // zfr:userinfos.userId,
            status:"1"
          }
        ],
      wrType: [],
      showAddr: false,
      areaList: areaListInfo,
      valArr: [],
      show: false,
      date: "",
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      showPicker: false,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      value1: "张三",
      qiyeType1: "",
      qiyeType2: "",
      wuranType1: "",
      wuranType2: "",
     
    };
  },
  methods: {
   



    showAddress() {
      this.showAddr = true;
    },
    addrConfirm(val) {
      // console.log(val)
      this.valArr = val;
      this.params.area = val[0].name + "-" + val[1].name + "-" + val[2].name;
      this.showAddr = false;
    },
    addrleCancel() {
      this.showAddr = false;
    },
    showPopup() {
      this.show = true;
    },
    handleConfirm(value) {
      this.params.jcrq = value;
      this.date = dayjs(value).format("YYYY-MM-DD");
      this.params.jcrq = this.date;
      this.show = false;
    },
    handleCancel() {
      this.params.jcrq = "";
      this.show = false;
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    add() {
      // this.params.zfrlist.push(1);
    },
    // del(index) {
    //   this.items.splice(index, 1);
    // },
    afterRead(file) {
      console.log(zxfxfiles);
      // this.zxfxfiles.push(file)
    },
    // 提交按钮
    onSubmit() {
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: '提交中',
        loadingType: 'spinner',
        selector: '#custom-selector',
      });
      let data = this.params;
      data.wrlx = data.wrlx.join(",");
      data.zfrlist = JSON.stringify(this.zfrlists)
      // console.log(data)
      this.http.post("saveLxzf", data).then(res => {
        console.log(res);
        toast.clear();
      });

      // this.$router.push("/")
    },
    /* 获取企业类型 */
    getQiye() {
      this.http.post("getDicListByType", { type: 49 }).then(res => {
        console.log(res);
        this.qiyeType1 = res.data[0].NAME;
        this.qiyeType2 = res.data[1].NAME;
      });
    },
    /* 获取污染类型 */
    getWuran() {
      this.http.post("getDicListByType", { type: 50 }).then(res => {
        console.log(res);
        this.wuranType1 = res.data[0].NAME;
        this.wuranType2 = res.data[1].NAME;
      });
    }
  },
  created() {
    this.getWuran();
    this.getQiye();
   
  }
};
</script>
<style lang="scss" scoped>
/deep/.van-field__error-message {
  text-align: right;
}
.zhifarenList {
  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px 0;
    color: #908f94;
    font-size: 12px;
  }
}
.add {
  font-size: 16px;
  color: #037afc;
  text-align: right;
  padding: 10px 20px;
}
.photo {
  padding: 10px 20px;
  background: #fff;
  p {
    font-size: 14px;
    padding-bottom: 10px;
  }
}
</style>