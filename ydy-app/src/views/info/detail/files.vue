<template>
  <van-cell-group>
    <van-cell title="车辆基本信息" style="font-size: 20px;font-weight: 700"/>
    <van-cell title="号码号牌:" :value="form.lisence" />
    <van-cell title="车牌颜色:" :value="form.lisenceColor" />
    <van-cell title="基准质量(kg):" :value="form.quality" />
    <van-cell title="号牌种类:" :value="form.lisenceType" />
    <van-cell title="车辆型号:" :value="form.carModel" />
    <van-cell title="是否有燃料蒸发控制装置:" :value="form.fuelControSet" />
    <van-cell title="车主姓名:" :value="form.ownername" />
    <van-cell title="车主电话:" :value="form.ownerphone" />
    <van-cell title="车辆识别代号:" :value="form.carIdentifyNum" />
    <van-cell title="车主地址:" :value="form.owneraddress" />
    <van-cell title="里程表读数:" :value="form.odometernum" />
    <van-cell title="初次登记日期:" :value="form.firstRegisteDate" />
    <van-cell title="制造日期:" :value="form.makeDate" />
    <van-cell title="是否有OBD:" :value="form.obdflag" />
    <van-cell title="商标:" :value="form.trademark" />
    <van-cell title="机动车状态:" :value="form.vehiclestatus" />
    <van-cell title="车辆生产厂:" :value="form.carProductCompany" />
    <van-cell title="发动机生产厂:" :value="form.engineProductCompany" />
    <van-cell title="是否有EGR:" :value="form.egrFlag" />
    <van-cell title="发动机型号:" :value="form.engineModel" />
    <van-cell title="发动机编号:" :value="form.engineNumber" />
    <van-cell title="是否有后处理装置:" :value="form.handleSet" />
    <van-cell title="发动机排量(L):" :value="form.engineDisplacement" />
    <van-cell title="发动机额定功率(Kw):" :value="form.enginePower" />
    <van-cell title="是否电控:" :value="form.isElectirc" />
    <van-cell title="发动机额定转速(r/min):" :value="form.engineSpeed" />
    <van-cell title="排放标准阶段:" :value="form.dischargeStage" />
    <van-cell title="气缸数:" :value="form.cylinderNum" />
    <van-cell title="变速器形式:" :value="form.transmissionshape" />
    <van-cell title="进气方式:" :value="form.inletType" />
    <van-cell title="是否有关闭车身稳定(如ESP):" :value="form.isClosestable" />
    <van-cell title="燃料种类:" :value="form.fuelType" />
    <van-cell title="燃料供给系统形式:" :value="form.fuelSupplyType" />
    <van-cell title="机动车序号:" :value="form.carNo" />
    <van-cell title="驱动方式:" :value="form.driveType" />
    <van-cell title="最大重质量(Kg):" :value="form.maxMass" />
  </van-cell-group>
</template>

<script>
import url from '@/service/url-config.js';
import { Toast } from "vant";
export default {
  data() {
    return {
      form: {}
    }
  },
  created() {
    let lisence = this.$route.query.lisence;
    this.getData(lisence);
  },
  methods: {
    getData(lisence) {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
      this.$http.post(url.getCarDetail, {lisence}).then(res => {
        toast.clear();
        this.form = res.data;
      })
    },
  }
}
</script>

