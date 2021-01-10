<template>
  <van-cell-group>
    <van-cell title="法律法规名称:" :value="form.legalType" />
    <van-cell title="执行机构:" :value="form.carryOrg" />
    <van-cell title="法律法规类型:" :value="form.legalType" />
    <van-cell title="行业分类:" :value="form.industryType" />
    <van-cell title="区域分类:" :value="form.areaType" />
    <van-cell title="业务分类:" :value="form.businessType" />
    <van-cell title="修订日期:" :value="form.reviseDate" />
    <van-cell title="实施日期:" :value="form.carryDate" />
    <van-cell title="法律全文:" :value="form.comment" />
    <van-cell title="关键词:" :value="form.keyWord" />
    <van-cell title="是否启用:" :value="form.isActive" />
    <van-cell title="次序:" :value="form.orderBy" />
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
    let id = this.$route.query.id;
    this.getData(id);
  },
  methods: {
    getData(id) {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
      this.$http.post(url.getHandbookDetail, {id}).then(res => {
        toast.clear();
        this.form = res.data;
      })
    },
  }
}
</script>
