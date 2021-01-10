<template>
  <div class="lxzfPage" ref="page">    <van-form @submit="onSubmit">
      <van-field
        v-model="params.xzqy"
        required
        label="行政区域："
        placeholder="行政区域"
        readonly
        input-align="right"
        is-link
        @click="showAddress"
        :rules="[{ required: true, message: '请选择行政区域！！' }]"
      />
      <!-- 地区弹窗 -->
      <van-popup v-model="showAddr" position="bottom" :style="{ height: '40%' }">
        <van-area
          :area-list="areaList"
          :columns-num="3"
          item-height="40"
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
      <van-field
        v-model="params.xxdz"
        label="详细地址："
        placeholder="请输入"
        input-align="right"
        required
        :rules="[{ required: true, message: '请填写详细地址！' }]"
      />
      <van-field
        name="radio"
        label="企业类型："
        required
        label-width="150"
        :rules="[{ required: true, message: '请填写企业类型！！' }]"
      >
        <template #input>
          <!-- <van-radio-group v-model="params.qylx" direction="horizontal">
            <van-radio name="0">{{qiyeType1}}</van-radio>
            <van-radio name="1">{{qiyeType2}}</van-radio>
          </van-radio-group>-->
          <van-radio-group v-model="params.qylx" direction="horizontal">
            <!-- <van-radio name="0">{{qiyeType1}}</van-radio>
            <van-radio name="1">{{qiyeType2}}</van-radio>-->
            <van-radio :name="v.CODE" v-for="v in qiyeType" :key="v.ID">{{v.NAME}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        name="radio"
        label="污染类型："
        required
        label-width="160"
        :rules="[{ required: true, message: '请选择污染类型！！' }]"
      >
        <template #input>
          <van-checkbox-group v-model="params.wrlx" direction="horizontal">
            <van-checkbox :name="v.CODE"  shape="square" v-for="v in wuranTypes" :key="v.CODE">{{v.NAME}}</van-checkbox>
            <!-- <van-checkbox name="0" shape="square">{{wuranType1}}</van-checkbox>
            <van-checkbox name="1" shape="square">{{wuranType2}}</van-checkbox> -->
          </van-checkbox-group>
        </template>
      </van-field>
      <van-field
        v-model="params.jcrq"
        required
        is-link
        readonly
        label="检查日期："
        @click="showPopup"
        placeholder="请选择"
        input-align="right"
        :rules="[{ required: true, message: '请选择检查日期！！' }]"
      />
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          item-height="40"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </van-popup>

      <!-- <van-cell-group class="zhifarenList">
        
      </van-cell-group>-->
      <div class="zhifarenList">
        <p>
          <span>主办执法人明细</span>
          <span></span>
        </p>
        <van-field
          readonly
          label="执法人员："
          placeholder="选择执法人员"
          input-align="right"
          v-model="mainRen.name"
        />
      </div>

      <div v-for="(item,index) in zfrlists" :key="index" class="zhifarenList">
        <p>
          <span>协办执法人明细</span>
          <span @click="del(index)" style="color:#037afc;">删除</span>
        </p>
        <van-field
          readonly
          is-link
          required
          label="协办执法人员："
          label-width="160"
          placeholder="选择执法人员"
          input-align="right"
          v-model="item.name"
          @click="getTXL(index)"
          :rules="[{ required: true, message: '请输入协办执法人员！！' }]"
        />
      </div>

      <p class="add" @click="add">添加执法人员</p>

      <!-- <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>-->
      <van-field
        class="field_flort"
        v-model="params.jcqk"
        required
        rows="1"
        autosize
        label="检查情况："
        label-width="200"
        type="textarea"
        maxlength="2000"
        show-word-limit
        placeholder="请输入（2000字内）"
        input-align="left"
        style="display: inline-block;"
        :rules="[{ required: true, message: '请输入检查情况！！' }]"
      />
      <!-- 附件图片 -->
      <div class="photo">
        <p>
          <e style="color:#ee0a24;">*</e>相关附件
        </p>
        <!-- <van-uploader v-model="params.zxfxfiles" multiple :after-read="afterRead" /> -->
        <van-uploader
          :after-read="afterRead"
          v-model="files"
          multiple
         @close-preview="closePrevew"
          :before-delete="delImg"
          @click-preview="click_preview"
          :max-size="10 * 1024*1024"
          @oversize="onOversize"
        >
        </van-uploader>
        <!-- <div v-for="(item,index) in files" :key="index" style="height: 80px;width: 80px;background: #00f;    ">{{item.filename}}</div> -->
      </div>
      
      <div>
        <van-button
          block
          type="info"
          native-type="submit"
          style="position: fixed;
    bottom: 0;"
        >提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import config1 from '../../config'
import axios from "axios";
import dayjs from "dayjs";
// import areaListInfo from "../../components/common/area";
import * as dd from "dingtalk-jsapi"; // 此方式为整体加载，也可按需进行加载
// import { getjianquan } from "../../util/jianquan";
import { guid, upLoaderImg } from "@/util/upLoaderImg";
import config from "../../../src/config";

let userinfos = JSON.parse(window.localStorage.getItem("userinfo"));
export default {
  // components: {
  //   areaListInfo
  // },
  data() {
    return {
      params: {
        xzqy: "",
        xzqyname: "",
        xxdz: "",
        qymc: "", //企业名称
        qylx: "0",
        wrlx: [],
        jcrq: dayjs(new Date()).format("YYYY-MM-DD"),
        // jcrq: "",
        userid: userinfos.userId,
        username: userinfos.userName,
        zfrlist: "",
        jcqk: ""
      },
      files: [], //附件图片
      mainRen: {
        name: userinfos.userName,
        emplId: userinfos.userId,
        status: "1"
      },

      zfrlists: [],
      showAddr: false,

      /*********************/
      areaList: {}, //把后台请求来的数据赋值到这

      /************************/
      show: false,
      date: "",
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      showPicker: false,
      value1: "张三",
      qiyeType: [],
      qiyeType1: "",
      qiyeType2: "",
      wuranTypes: [],
      wuranType1: "",
      wuranType2: "",
      ticket: "", //签名
      signInfo: {}, //签名时间戳
      uuid: guid(),
      img_data: []
    };
  },
  methods: {
    // 点击预览事件
    click_preview(file) {
      this.scrollTop = this.$refs.page.scrollTop
      console.log(file);
      if (file.fileType != 1) {
        window.location.href = file.url;
      }
    },
    // 文件超过大小
    onOversize(file) {
      console.log(file);
      this.$toast("文件大小不能超过 10M");
    },
    closePrevew() {
      this.$refs.page.scrollTop = this.scrollTop;
    },

    
    // 地区数据
    getArea() {
      this.http.post("getAreaListByType", {}).then(res => {
        console.log(res.data);
        this.areaList = res.data;
      });
    },
    // 图片上传
    async afterRead(e) {
      console.log(e)
      //文件读取完成后的回调函数
      await upLoaderImg(e, 9, this.uuid).then(data => {
        data.forEach(v => {
          if(v.fileType==1) {
            v.isImage = true
          }
          });
        this.files = data;
        // console.log(this.files)
      });
    },

    // 图片删除
    delImg(file, detail) {
      // console.log(file);
      // 删除方法
      // let str = JSON.stringify()
      let fileid = this.files[detail.index].fileid;
      return this.http
        .post(config.api_base + "/deleteFile", { fileid })
        .then(res => {
          console.log(res);
          this.files.splice(detail.index, 1);
          this.$toast({
            message: res.msg
          });
          return true;
        });

      // delImg(this.img_data).then(res => {
      //   console.log(res);
      // });
    },

    // 获取通讯录
    getTXL(index) {
      dd.ready(() => {
        let _this = this;
        dd.biz.contact.complexPicker({
          title: "选择执法人员", //标题
          corpId: config1.corpId, //企业的corpId
          multiple: true, //是否多选
          limitTips: "超出了", //超过限定人数返回提示
          maxUsers: 1000, //最大可选人数
          pickedUsers: [], //已选用户
          pickedDepartments: [], //已选部门
          disabledUsers: [], //不可选用户
          disabledDepartments: [], //不可选部门
          requiredUsers: [], //必选用户（不可取消选中状态）
          requiredDepartments: [], //必选部门（不可取消选中状态）
          appId: config1.appId, //微应用Id，企业内部应用查看AgentId
          responseUserOnly: false, //返回人，或者返回人和部门
          startWithDepartmentId: 0, //仅支持0和-1
          onSuccess: function(res) {
            //  console.log(JSON.stringify(_this.zfrlists))
            _this.zfrlists.splice(_this.zfrlists.length - 1, 1);
            //  console.log(JSON.stringify(res.users))
            //  console.log(JSON.stringify(_this.zfrlists))
            _this.zfrlists.push(res.users[0]);
            console.log(index);
            //  _this.zfrlists[index] = res.users[0];
            //  console.log(JSON.stringify(_this.zfrlists))
          },
          onFail: function(err) {}
        });
      });
      dd.error(error => {
        alert(`error: corpId=${config1.corpId},appId=${config1.appId}`);
        alert(`dd error: ${JSON.stringify(error)}`);
      });
    },

    showAddress() {
      this.showAddr = true;
    },
    addrConfirm(val) {
      console.log(val);
      this.params.xzqy = val[1].name + "-" + val[2].name;
      // console.log(val[1].code)
      this.params.xzqyname = val[1].code + "," + val[2].code;
      console.log(this.params.xzqyname);
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
    // onConfirm(value) {
    //   this.value = value;
    //   this.showPicker = false;
    // },
    add() {
      var a = { emplId: "", name: "" };
      this.zfrlists.push(a);
    },
    del(index) {
      this.zfrlists.splice(index, 1);
    },

    // 提交按钮
    onSubmit() {
      if (!this.files.length) {
        this.$toast({
          message: "请上传附件！"
        });
        return;
      }
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        message: "提交中",
        loadingType: "spinner",
        selector: "#custom-selector"
      });
      let data = this.params;
      data.wrlx = data.wrlx.join(",");

      this.zfrlists.push(this.mainRen);
      data.zfrlist = JSON.stringify(this.zfrlists);
      data.uuid = this.uuid;
      this.http.post("saveLxzf", data).then(res => {
        console.log(res);
        if (res.state == "1") {
          this.$toast({
            message: res.msg
          });
          this.$router.push("/");
          toast.clear();
        }
      });

      this.$router.push("/");
    },
    /* 获取企业类型 */
    getQiye() {
      this.http.post("getDicListByType", { type: 49 }).then(res => {
        console.log(res);
        // this.qiyeType1 = res.data[0].NAME;
        // this.qiyeType2 = res.data[1].NAME;
        this.qiyeType = res.data;
      });
    },
    /* 获取污染类型 */
    getWuran() {
      this.http.post("getDicListByType", { type: 50 }).then(res => {
        console.log(res);
        this.wuranTypes = res.data;
        this.wuranType1 = res.data[0].NAME;
        this.wuranType2 = res.data[1].NAME;
      });
    }
  },
  created() {
    this.getArea();
    this.getWuran();
    this.getQiye();
    // getjianquan(); //鉴权
    /* 设置导航栏标题 */
    dd.ready(() => {
      dd.biz.navigation.setTitle({
        title: "自行发现" // 控制标题文本，空字符串表示显示默认文本
      });
    });
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
    font-size: 15px;
  }
}
.add {
  font-size: 16px;
  color: #037afc;
  text-align: right;
  padding: 10px 20px;
}
.photo {
  padding: 10px;
  background: #fff;
  p {
    font-size: 16px;
    padding-bottom: 10px;
  }
}
.lxzfPage {
  // min-height: 100%;
  padding-bottom: 40px;
}
/deep/.van-picker-column__item {
  height: 44px;
}

.preview-cover {
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>